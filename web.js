const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

const notice = require('./api/notice');
//const dbinfo = require('./db/dbtest');



app.use(express.static( path.join(__dirname, 'public')))
//리액트 요청주소
//리액트에선 axios.get('/notice')
app.use('/notice', notice);
//app.use('/db', dbinfo);

app.get('/',function(req, res){
    res.sendFile( path.join(__dirname, 'public/index.html'))
})
//라우터없다면
app.use((req, res) =>{
    res.status(404).sendFile( path.join(__dirname, 'public/nopage.html'))
}) //404 (라우터가 없다면)이면, 퍼블릭의 노페이지 존으로 이동해라

app.listen(PORT, () => {
   console.log( `${PORT} 노드서버구동정상` )
})