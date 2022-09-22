const express = require('express');
const url = require('url');
const sequelize = require('sequelize');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const mySQLStore = require('express-mysql-session')(session);
const { Bill, Like, Member } = require('../models');
const axios = require('axios');
const mysql = require("mysql2/promise");
const like = require('../models/like');
const { response } = require('express');
const { appendFile } = require('fs');

require("dotenv").config({ path: ".env" });

const router = express.Router();

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// db connection
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'khr',
    dialect: 'mysql',
    operatorsAlias: 'false',
    timezone: "+09:00",
});


/** 이번주, 이번달, 21대 국회에서 발의한 의안 개수 count */
// 계속 restarting 된다..?
router.get('/count', async (req, res) =>{
    try{
        const today = new Date();

        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();

        // 일주일동안 발의된 의안 count
        const conn = await connection.getConnection();

        const weekQuery = 'SELECT COUNT(*) as weekCounts FROM bills WHERE created_at BETWEEN \''
        + year + '-' + month + '-' + (date-7) + '\' AND \'' + year + '-' + month + '-' + date + '\'';

        const weekQuery2 = 'SELECT COUNT(*) as weekCounts FROM bills WHERE created_at BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW()';

        let [rows, _] = await conn.query(weekQuery);
        const thisWeek = rows[0].weekCounts;
        
        const monthQuery = 'SELECT COUNT(*) as monthCounts FROM bills WHERE MONTH(created_at)=' + month + ' AND YEAR(created_at)=' + year;
        
        // 최근 한 달을 count하는 쿼리
        const monthQuery2 = 'SELECT COUNT(*) as monthCounts FROM bills WHERE created_at BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW()';

        [rows, _] = await conn.query(monthQuery);
        const thisMonth = rows[0].monthCounts;

        const totalQuery = 'SELECT COUNT(*) as totalCounts FROM bills';
        [rows, _] = await conn.query(totalQuery);
        const totalCount = rows[0].totalCounts;

        conn.release();

        return res.status(200).json({ success: true, thisWeek: thisWeek, thisMonth: thisMonth, totalCount: totalCount });
    } 
    catch(e) {
        console.log(e);
        return res.status(200).json({ success: false });
    }
});


/** 3개의 유사한 의안 id를 반환. 의안 텍스트를 보내면 유사한 의안 목록을 반환하는 api에 보내서 결과를 가져옴.*/
router.get('/:billId/similar', async (req, res, next) => {
    const billId = req.params.billId;

    try {
        const bill = await Bill.findOne({ where: { id: billId } });

        if(bill) {
            await axios
                .post(`${process.env.API_URL}`, {
                    billId: billId,
                })
                .then((response) => {
                    const bills = response.data.bills;
                    members = response.data.members;
                    console.log(response.data);
                    return res.status(200).json({ success: true, bills: bills, members: members });
                });
        }
        else {
            return res.status(200).json({ success: false, message: '의안을 찾을 수 없습니다.' });
        }
    }
    catch(err) {
        console.log(err);
        return res.status(200).json({ success: false });
    }
});


/** 이번주에 좋아요 수가 가장 많은 순으로 5개 반환 */
router.get('/thisWeek', async(req, res, next) => {
    try {
        const conn = await connection.getConnection();

        const query = 'SELECT bill_id FROM (SELECT bill_id, COUNT(id) as cnt FROM likes WHERE createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW() GROUP BY bill_id ORDER BY cnt DESC LIMIT 5) as thisWeek';
        let [rows, _] = await connection.query(query);
        let bills = [];

        for (let i = 0; i < rows.length ; i++) {
            console.log(rows[i]);
            bills.push(rows[i].bill_id);
        }
        conn.release();

        return res.status(200).json({ success: true, bills: bills });
    } catch(err) {
        console.log(err);
        return res.status(200).json({ success: false });
    }
});


/** 좋아요 추가 post 라우터 */
router.post('/:billId/like', async(req, res, next) => {
    // req.session.destroy();

    const billId = req.params.billId;

    try {
        // 아직 한 번도 좋아요를 누른적 없을 때
        if (!req.session.billId) {
            req.session.billId = [ billId ];

            // 좋아요 +1
            await Like.create({
                bill_id: billId,
            })
            .then( result => {
                console.log("좋아요 추가 완료", result);

            })
            .catch( err => {
                console.log("좋아요 추가 실패");
                console.log(err);
            });

        } else { // 좋아요를 누른 적 있을 때
            let bill_arr = req.session.billId;
            let flag = true;
            // 반복문으로 현 billId가 있는지 확인
            for (let i = 0; i < bill_arr.length ; i++) {
                console.log(bill_arr[i]);
                if (bill_arr[i] === billId) {
                    flag = false;
                    break;
                }
            }
            // 현 billId가 없다면 추가
            if (flag) {
                req.session.billId.push(billId);
                
                // 좋아요 +1
                await Like.create({
                    bill_id: billId,
                })
                .then( result => {
                    console.log("좋아요 추가 완료");
    
                })
                .catch( err => {
                    console.log("좋아요 추가 실패");
                    console.log(err);
                });
            }
        }
        return res.status(200).json({ success: true });
    } catch(err) {
        console.log(err);
        return res.status(200).json({ success: false });
    }
});


/** 의안 전체 목록 가져오기 - 한 페이지 10개, sort = { 1: 최신순, 2: 인기순 } */
router.get('/list', async(req, res) => {
    const queryData = url.parse(req.url, true).query;
    const pageNum = Number(queryData.page || 1);
    const sort = Number(queryData.sort || 1);
    const pageSize = 10;
    const offset = pageSize * (pageNum - 1);
    
    if (sort == 1) {    // 최신순
        await Bill.findAll({
            offset: offset,
            limit: pageSize,
            order: [[ "created_at", "DESC" ]]
        })
        .then(result => {
            return res.status(200).json({
                success: true,
                bills: result
            });
        })
        .catch( err => {
            console.log(err);
            return res.status(200).json({ success: false });
        });
    }
    else if(sort == 2) {    // 인기순 
        await Bill.findAll({
            // offset: pageSize * (pageNum - 1),
            // limit: pageSize,

            // include : [{
            //     model: Like,
            //     attributes : [[sequelize.fn('count', sequelize.col('id')), 'likeCount']],
            //     // as: 'likes',
            //     group : ['bill_id'],
            //     order : [[sequelize.literal('likeCount'), 'DESC']],
            // }],
            // order: [['likes', "DESC"]],


            include: [{
                    model: Like, 
                    attributes: ['id', 'bill_id'],
                }],
            group: ['likes.bill_id'],
            order: [[sequelize.literal("COUNT(likes.id)"), "DESC"]],

            // order: [[sequelize.literal('COUNT(`likes`.`bill_id`)'), 'DESC']],
            // include: [
            //     {
            //         model: Like,
            //         // as: 'likes',
            //         attributes: [
            //             // [sequelize.literal('SELECT cnt FROM (SELECT bill_id, COUNT(id) AS cnt FROM likes GROUP BY bill_id)'), 'likeCount']
            //             [sequelize.fn('count', sequelize.col(sequelize.literal('SELECT id FROM likes GROUP BY bill_id'))), 'likeCount']
            //         ],
            //     },
            // ],
            // order: [['likes.likeCount', 'DESC']],

            // group: ["likes.bill_id"],            
            // order: [[Like, sequelize.literal("(COUNT(`likes`.`id`)"), "DESC"]],
        })
        .then( result => {
            return res.status(200).json({
                success: true,
                bills: result.slice(offset, offset+pageSize)    // offset과 limit을 쓰면 sequelize 에러 발생
            });
        })
        .catch( err => {
            console.log(err);
            return res.status(200).json({ success: false });
        });
    }
});


/** billId로 의안 전체 내용 가져오기 */
router.get('/:billId', async(req, res) => {
    try{
        const bill = await Bill.findOne({ where: { id: req.params.billId } });
        return res.status(200).json({ success: true, bill: bill });
    } catch(err) {
        console.log(err);
        return res.status(200).json({ success: false });
    }
});


/** memberId로 의원이 발의한 법안 가져오기 - 한 페이지 4개, 최신순 */
router.get('/name/:memberId', async(req, res) => {
    const pageNum = Number(url.parse(req.url, true).query.page || 1);
    const pageSize = 4;
    
    const member = await Member.findOne({   
        where: { id: req.params.memberId }, 
    }); 

    await Bill.findAll({
        offset: pageSize * (pageNum - 1),
        limit: pageSize,
        where: {
            main_proposer: member.name
        },
        order: [[ 'created_at', 'desc' ]],
    })
    .then(result => {
        return res.status(200).json({
            success: true,
            bills: result
        });
    })
});


module.exports = router;