<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <!-- 로고 부분 -->
            <a class="navbar-brand" href="#">게시판</a>

            <!-- 토글 버튼 (모바일에서 메뉴 표시) -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- 메뉴 항목 -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link">홈</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">작성하기</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
