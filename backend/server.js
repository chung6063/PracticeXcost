const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// cors 사용하는 이유: 로컬에서 포트 번호가 다르면 Cross-Origin 오류가 발생할 수 있어서
app.use(cors());

// json 데이터로 파싱해서 소통할 수 있게 해줌
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.log(err));


    const Board = mongoose.model('board', {
        title: String , 
        content: String
    });

    app.get('/boardList' , async(req , res) => {
        try{
            const boards = await Board.find();
            res.json(boards);
        }
        catch(err){
            console.log('게시글 가져오기 실패' , err);
            res.status(500).send('서버 오류');
            
        }
    });

    app.post('/boardRegister', async (req, res) => {
        const { title, content } = req.body;
        try {
            const newBoard = new Board({ title, content });
            await newBoard.save();
            res.status(201).send('게시글 저장 성공'); 
        } catch (err) {
            console.log('게시글 저장 실패', err);
            res.status(500).send('서버 오류');
        }
    });

    app.delete('/boardDelete/:id', async (req , res) => {
        const { id } = req.params;
        const result = await Board.findByIdAndDelete(id);
    })

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중');
});
