const express = require('express');
const axios = require('axios');
const { Member } = require('../models');

const router = express.Router();

/* /api/member/:memberId/similarMembers - get
유사한 의원 추천(의원 상세페이지)(미정)-4개
res { 'members' : members } */
router.get('/:memberId/similarMembers', async (req, res, next) => {
    const memberId = req.params.memberId;

    try {
        const member = await Member.findOne({ where: { id: memberId } });

        if(member) {
            await axios
                .post(`${process.env.API_URL_MEMBER}`, {
                    memberId: memberId,
                })
                .then((response) => {
                    members = response.data.members;
                    console.log(response.data);
                    return res.status(200).json({ success: true, members: members });
                });
        }
        else {
            return res.status(200).json({ success: false, message: '국회의원을 찾을 수 없습니다.' });
        }
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({ success: false, error: e });
    }
});

router.get('/:memberId', async(req, res)=>{
    try{
        const mem = await Member.findOne({ where: { id: req.params.memberId} });
        return res.status(200).json({ success: true, mem: mem });
    } catch(err){
        console.log(err);
        return res.status(200).json({ success: false, error: err });
    }
});



module.exports = router;