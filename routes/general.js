const express = require('express');
const url = require('url');
const axios = require('axios');

const { Bill, Member, Hashtag } = require('../models');

const router = express.Router();


/** 토픽 트렌드 분석 키워드 가져오기 */
router.get('/trend/:period', (req, res) => {
    axios
        .post(`${process.env.TREND_API_URL}`, {
            period: req.params.period,
        })
        .then( response => {
            return res.status(200).send(response.data);
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({ success: false, message: "Error has occured" });
        });
});


/** 해시태그 해당 의안 가져오기 + pagination 추가*/
router.get('/hashtag/search/:hashtagName', async(req, res, next)=>{
    try{
        const str = req.params.hashtagName;
        const queryData = url.parse(req.url, true).query;
        const pageNum = Number(queryData.page || 1);
        const pageSize = 10;
        const offset = pageSize * (pageNum - 1);
        
        console.log(str);
        if(str != null) {
            const hashidr = await Hashtag.findOne({ where: { name: str } });
            console.log(hashidr);
            const billhashid = await hashidr.getBills({ offset:offset, limit:pageSize });
            return res.status(200).json({ success: true, str: str, bills: billhashid });
        }
    } catch(err) {
        console.log(err);
        return res.status(200).json({ success: false });
    }
});

/** 랜덤으로 해시태그 제안하기 */
router.get('/hashtag/random', async(req, res)=>{
    try{
        let randomhash = [];
            const r = getRandomInt(); //해시태그 총 개수로 후에 변경필요함
            for(let a=0;a<6; a++){
                console.log(r[a]);
                const htf = await Hashtag.findOne({ where: { id: r[a] } });
                console.log(htf);
                randomhash.push(htf.name);
            }
            console.log('fdf', randomhash);
        return res.status(200).json({ success: true, randomhash: randomhash });
    } catch(err){
        console.log(err);
        return res.status(200).json({ success: false, error: err });
    }
});

function getRandomInt() { 
    let a =[];
    let i=1;
    while(i<7){
        let n =Math.floor(Math.random() * (4285)) + 1;
        if(! sameNum(n)){
            a.push(n);
            i++;
        }
    }
    function sameNum(n){
        return a.find((e)=>(e===n));
    }
    console.log(a);
    return a;
};


/** 검색 라우터 */
// req q="검색어"
// post로 보내는거 "검색어"
// 받아오는거 { bills: [], members: [], hashtags: [] }
// res 도 동일
// 한 페이지에 의안 5개, 의원 4개 페이지 네이션에서 20개 목록 전달로 수정
router.get('/search', async(req, res) => {
    const queryData = url.parse(req.url, true).query;
    const searchWord = queryData.q;
    // const pageNum = Number(queryData.page || 1);
    // const MEMBERSIZE = 4;
    // const BILLSIZE = 5;

    if(searchWord) {
        await axios
            .post(`${process.env.SEARCH_API_URL}`, {
                q: searchWord,
            })
            .then(async (response) => {
                let bills = [];
                let members = [];
                    
                for(b of response.data.bills) {
                    bills.push(await Bill.findOne({ where: { id: b } }));
                }
                for(m of response.data.members) {
                    members.push(await Member.findOne({ where: { id: m } }));
                }
                
                return res.status(200).json({ 
                    success: true, 
                    bills: bills, 
                    members: members, 
                    hashtags: response.data.hashtags,
                    });
            })
            .catch(err => {
                console.log(err);
                return res.status(200).json({ success: false, message: "Error has occured", bills: [], members: [], hashtags: [] });
            });
    }
    else {
        return res.status(200).json({ success: false, message: '유효하지 않은 검색어입니다.', bills: [], members: [], hashtags: [] });
    }
});

module.exports = router;