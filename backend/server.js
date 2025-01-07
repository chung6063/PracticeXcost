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

// 게시글 스키마 및 모델
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// API 라우트 약간 컨트롤러 같은느낌임
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
});

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중');
});
