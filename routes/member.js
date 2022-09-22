const express = require('express');
const axios = require('axios');
const url = require('url');
const { Member } = require('../models');

const router = express.Router();

/** 유사한 의원 추천(의원 상세페이지)-4개 */
router.get('/:memberId/similar', async (req, res, next) => {
    const memberId = req.params.memberId;

    try {
        const member = await Member.findOne({ where: { id: memberId } });

        // 아직 flask 서버가 공사중
        return res.status(200).json({ success: true, members: ['L2I9861C', 'EMC8812P'] })

        // if(member) {
        //     await axios
        //         .post(`${process.env.MEMBER_API_URL}`, {
        //             memberId: memberId,
        //         })
        //         .then((response) => {
        //             const members = response.data.members;
        //             console.log(response.data);
        //             return res.status(200).json({ success: true, members: members });
        //         });
        // }
        // else {
        //     return res.status(200).json({ success: false, message: '국회의원을 찾을 수 없습니다.' });
        // }
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({ success: false });
    }
});


/**  국회의원 목록 12개씩 가져오기(페이지네이션) + 정당별검색 */
router.get('/list', async (req, res, next) => {
    const queryData = url.parse(req.url, true).query;
    const pageNum = queryData.page;
    const pageSize = 12;
    let partyName = ["더불어민주당", "국민의힘", "정의당", "기본소득당", "시대전환당", "무소속"];

    if (queryData.party) {
        switch (Number(queryData.party)) {
            case 1:
                partyName = "더불어민주당";
                break;
            case 2:
                partyName = "국민의힘";
                break;
            case 3:
                partyName = "정의당";
                break;
            case 4:
                partyName = "기본소득당";
                break;
            case 5:
                partyName = "시대전환당";
                break;
            case 6:
                partyName = "무소속";
                break;
            }
        }

    await Member.findAll({
        offset: pageSize * (pageNum - 1),
        limit: pageSize,
        where: {
            party: partyName
        }
    })
    .then( result => {
        return res.status(200).json({
            success: true,
            members: result
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(200).json({ success: false });
    });
});


/** memberId로 국회의원 정보 가져오기 */
router.get('/:memberId', async(req, res)=>{
    try{
        const mem = await Member.findOne({ where: { id: req.params.memberId} });
        return res.status(200).json({ success: true, member: mem });
    } catch(err){
        console.log(err);
        return res.status(200).json({ success: false });
    }
});


module.exports = router;