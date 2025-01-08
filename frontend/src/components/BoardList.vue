<template>
  <div class="container mt-4">
    <!-- 게시글 목록 출력 -->
    <div v-for="board in boards" :key="board._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <template v-if="editingId === board._id">
          <!-- 수정 모드 -->
          <input
            v-model="board.title"
            class="form-control mb-2"
            placeholder="제목 수정"
          />
          <textarea
            v-model="board.content"
            class="form-control mb-2"
            placeholder="내용 수정"
          ></textarea>
          <button @click="saveEdit(board)" class="btn btn-success me-2">저장</button>
          <button @click="cancelEdit" class="btn btn-secondary">취소</button>
        </template>
        <template v-else>
          <!-- 일반 모드 -->
          <h3 class="card-title">{{ board.title }}</h3>
          <p class="card-text">{{ board.content }}</p>

          <!-- 수정 및 삭제 버튼 -->
          <div class="position-absolute top-0 end-0 m-2 d-flex">
            <button @click="editBoard(board._id)" class="btn btn-primary me-2">수정</button>
            <button @click="deleteBoard(board._id)" class="btn btn-danger">삭제</button>
          </div>
        </template>
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
      editingId: null, // 현재 수정 중인 게시글 ID
      originalData: null, // 원본 데이터
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
      // 삭제 후 게시글 목록에서 해당 게시글 제거
      this.boards = this.boards.filter(board => board._id !== id);
    },

    editBoard(id) {
      this.editingId = id;
      const board = this.boards.find((x) => x._id === id);
      this.originalData = { ...board }; // 수정 전 원본 데이터를 저장
    },

    cancelEdit() {
      const board = this.boards.find((x) => x._id === this.editingId);
      Object.assign(board, this.originalData); // 원래 데이터 복원
      this.editingId = null;
    },

    async saveEdit(board) {
      const response = await axios.put(
        `http://localhost:3000/boardUpdate/${board._id}`,
        { title: board.title, content: board.content }
      );
      if (response.status === 200) {
        alert('수정이 완료되었습니다!');
        this.editingId = null; // 수정 모드 종료
        this.getBoards(); // 게시글 목록 새로고침
      } else {
        alert('수정에 실패했습니다.');
      }
    },
  },
};
</script>
