<template>
    <div class="admin-body">
        <div class="title">
            <div class="titledot">
                <img src="../assets/icon_dot.png">
            </div>
            <h3>배너 관리</h3>
        </div>
        <hr class="tophr">
        <div class="admin-main-content">
            <div>
                <p>
                    등록된 배너
                </p>
                <p>배너는 10개까지만 등록 가능합니다.</p>
            </div>
        </div>
    </div>
</template>
  
<script>
// import axios from 'axios'

export default {
    data() {
        return {
            check: false
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>
/* ---------------------------------------------------기본css */

@font-face {
    /* 프리텐다드 */
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* 드래그 방지 코드 */
    -webkit-moim-select: none;
    -moz-moim-select: none;
    -ms-moim-select: none;
    font-family: 'Pretendard-Regular';

    /* 스크롤바 제거 코드 */
    -ms-overflow-style: none;
    /* 인터넷 익스플로러 */
    scrollbar-width: none;
    /* 파이어폭스 */
}

*::-webkit-scrollbar {
    display: none;
    /* 크롬, 사파리, 오페라, 엣지 */
}

.admin-body {
    padding-left: 1.875rem;
}

/* ---------------------------------------------------title */

.title {
    margin: 1.875rem 0 0 0;
    width: 100%;
}

.titledot img {
    width: 1.5rem;
    float: left;
    margin-right: .25rem;
}

.tophr {
    margin: 1.875rem 1.875rem .625rem 0;
    border: .125rem solid #E1E7F0;
}

.admin-main-content {
    margin-right: 30px;
    display: flex;
    justify-content: space-between;
}

/* --------------------------------------------------- */


</style>