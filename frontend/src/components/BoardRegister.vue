<!-- PostForm.vue -->
<template>
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">제목</label>
          <input type="text" class="form-control" id="title" v-model="title" required />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">내용</label>
          <textarea class="form-control" id="content" v-model="content" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">저장</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          const newPost = {
            title: this.title,
            content: this.content,
          };
  
          const response = await axios.post('http://localhost:3000/boardRegister', newPost);
  
          if (response.status === 201) {
            alert('게시글이 성공적으로 등록되었습니다!');
            this.title = '';
            this.content = '';
          }
        } catch (error) {
          console.error('게시글 등록에 실패했습니다.', error);
          alert('게시글 등록에 실패했습니다.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일 추가 */
  </style>
  