<template>
  <div>
    <h1>게시판</h1>
    <!-- 게시글 추가 폼 -->
    <form @submit.prevent="addPost">
      <div>
        <label for="title">제목:</label>
        <input id="title" v-model="title" placeholder="제목을 입력하세요" />
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea id="content" v-model="content" placeholder="내용을 입력하세요"></textarea>
      </div>
      <button type="submit">추가</button>
    </form>

    <!-- 게시글 목록 출력 -->
    <div v-for="post in posts" :key="post._id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
    data() { //필드같은 느낌임임
        return {
            posts : [],
            title:'',
            content: '',
        };
    },

    created() { //생성자 같은 느낌임
        this.fetchPosts();
    },
    
    methods: {//메서드인뎅?

    // 게시글 조회하는 함수수
    async fetchPosts() {
      const response = await axios.get('http://localhost:3000/posts'); //내 서버가 3000으로 만들었는데 여기서 데이터를 ㅏㄱ져옴옴
      this.posts = response.data;  // 받아온 데이터를 posts 배열에 저장
    },

    // 게시글 추가하는 함수수
    async addPost() {
      const newPost = { title: this.title, content: this.content };
      await axios.post('http://localhost:3000/posts', newPost); // 백엔드 게시글 전송송
      this.title = '';  // 입력 필드 초기화
      this.content = '';  // 입력 필드 초기화
      this.fetchPosts();  // 새 게시글을 추가한 후, 게시글 목록을 다시 가져옴
    },
    }
}
</script>