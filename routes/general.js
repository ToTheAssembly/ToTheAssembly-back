const express = require('express');
const url = require('url');
const axios = require('axios');

const { Bill, Member, Hashtag } = require('../models');

const router = express.Router();


/** 해시태그 해당 의안 가져오기 */
router.get('/hashtag/search/:hashtagName', async(req, res, next)=>{
    try{
        const str = req.params.hashtagName;
        console.log(str);
        if(str != null) {
            const hashidr = await Hashtag.findOne({ where: { name: str } });
            const billhashid = await hashidr.getBills();
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
        let n =Math.floor(Math.random() * (7)) + 1;
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
router.get('/search', async(req, res) => {
    const searchWord = url.parse(req.url, true).query.q;
    console.log(searchWord);

    // flask는 아직 공사중~
    return res.status(200).json({ success: true, 
        bills: ['PRC_S2P2C0M9U0Y1I1E7U1R9H2B9P5L6R8', 'PRC_K2D2Y0Y8E1L9S1Z8I3M3B2O5J1Y8T5'], 
        members: ['L2I9861C', 'EMC8812P'], 
        hashtags: ['징계', '공무원', '채용'] 
    });

    // if(searchWord) {
    //     await axios
    //         .post(`${process.env.SEARCH_API_URL}`, {
    //             q: searchWord,
    //         })
    //         .then((response) => {
    //             return res.status(200).send(response.data);
    //         });
    // }
    // else {
    //     return res.status(200).json({ success: false, message: '유효하지 않은 검색어입니다.' });
    // }
    
});

module.exports = router;