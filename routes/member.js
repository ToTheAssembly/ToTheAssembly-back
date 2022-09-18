const express = require('express');
const axios = require('axios');
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