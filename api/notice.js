const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); //주소를 보고 해당데이터를 읽어줌
//node 16버전 -> express에 내장되어있어서 따로 불러주지 않아도 됨
//리액트가 비동기 요청 req.body -> 노드는 이걸 원해. ( = 주문)
//res.data -> 리액트에는 이걸 원해. ( = 응답)

//16버전 : router.use(express.urlendoded({extended : true}))
router.use(bodyParser.urlencoded({ extended : true })) //내가 확장시켜서 쓸게라는 뜻
//axios.get('/notice?type=list&no-10')

router.get('/', (req, res, next) => {
   //리액트에서 사전인터뷰 -> sql테이블생성
   
   /*parse 하는 중_ 풀어헤쳐서보는중*/
    var type = req.query.type; //bodyParser.urlencoded 이후 반드시 실행
    //요청이 목록인지 글쓰기인지 삭제인지 구분해서 처리
    if(type == 'list'){
        //목록요청
        // 노드가 axios.get('/notice?type=list') 노드서버에 요청해야만한다.
        try{
            //DB연결하고 sql문 가져와서 보내주는 모듈_여기가 진짜 작업하는 곳
            const dbcon = require('../db/dbconnect');
            //작업을 보내기 전에 내가 필요한 정보 더!!!! 담아서 보내주기
            //그 정보는 xml에 저장된 구체작인 sql문을 담아서 보내주는 것임
            //기존의 요청 내용에 나의 3가지 변수를 더 추가해서 next메서드로 보내줌
            //개발자가 추가한 요청내역
            req.body.mapper = 'reactSQL';
            req.body.crud = 'select'; // crud중 하나 반드시 선정
            req.body.mapperid = 'interviewList';

            //다음 라우터에 보내라
            router.use('/',dbcon); //router.get('/', (req, res, next) == '/'가 같아야함
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }       
    }
    else if(type == 'write'){
        // 노드가 axios.get('/notice?type=write') 노드서버에 요청해야만한다.
        res.send('sql접속할때 update로 해야되것네')
    }
    else if(type == 'update'){
         // 노드가 axios.get('/notice?type=update&no=5') 노드서버에 요청해야만한다.
        res.send('sql접속할때 update로 해야되것네')
    }
    else{
        // 노드가 axios.get('/notice?type=delete&no=4') 노드서버에 요청해야만한다.
        res.send('sql접속할때 delete로 해야되것네')
    }
})


module.exports = router;