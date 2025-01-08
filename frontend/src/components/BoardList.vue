<template>
  <div class="container mt-4">
    <!-- 게시글 목록 출력 -->
    <div v-for="board in boards" :key="board._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h3 class="card-title">{{ board.title }}</h3>
        <p class="card-text">{{ board.content }}</p>

        <!-- 삭제 버튼 -->
        <button @click="deleteBoard(board._id)" class="btn btn-danger position-absolute top-0 end-0 m-2">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      boards: [], 
    };
  },

  mounted() {
    this.getBoards();
  },

  methods: {
    async getBoards() {
    const response = await axios.get('http://localhost:3000/boardList');
    this.boards = response.data;
    },
    
    deleteBoard(id) {
    axios.delete(`http://localhost:3000/boardDelete/${id}`);
    // 삭제 후 게시글 목록에서 해당 게시글 제거 (오류 처리 없음)
    this.boards = this.boards.filter(board => board._id !== id);
    }
  }
};
</script>
