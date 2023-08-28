<template>
    <body>
      <div class="title">
        <div class="titledot">
          <img src="../assets/icon_dot.png">
        </div>
        <h3 @click="goToDetail()">{{ moim.MOIM_TITLE }}</h3>
      </div>
      <form ref="moimForm" @submit.prevent="onSubmitForm">
  
        <hr class="tophr">
  
        <div class="box">
          <!-- 왼쪽 탭----------------------------------------->
          <div class="left">

            <div class="moim-img">
              <div class="img_box">
                <div class="fakeimg">
                  <img v-if="moim.MOIM_IMG" :src="require(`../../../node-back/uploads/uploadMoim/${moim.MOIM_IMG}`)"
                    alt="..." style="width: 100%;">
                </div>
              </div>
            </div>
            <hr class="cate-nav-hr">
            <div class="moim-question">
              <h3 class="sub-font" style=" padding: 0 0 20px 0;">❔ 모임가입 질문의 답변을 적어주세요</h3>
  
              <div class="moim-questiondiv">
                <h4>Q. {{ QList.MQ1 }}</h4>
                <input class="moim-questioninput" v-model="AList[0]" :placeholder="'모임가입 답변을 입력하세요'">
              </div>
              <div v-if="QList.MQ2" class="moim-questiondiv">
                <h4>Q. {{ QList.MQ2 }}</h4>
                <input class="moim-questioninput" v-model="AList[1]" :placeholder="'모임가입 답변을 입력하세요'">
              </div>
              <div v-if="QList.MQ3" class="moim-questiondiv">
                <h4>Q. {{ QList.MQ3 }}</h4>
                <input class="moim-questioninput" v-model="AList[2]" :placeholder="'모임가입 답변을 입력하세요'">
              </div>
            </div>
          </div>
          <!-- 오른쪽 탭--------------------------------------- -->
          <div class="right">
            <div class="form">
              <div class="master">
                <h5>방장 정보</h5>
                <div class="master-text">
                  <img src="../assets/profile.png" style="width: 24px;">
                  <p>방장 이름</p>
                </div>
              </div>
            </div>
            <div class="creatediv">
              <button type="submit" class="col-xs-1 createbtn">가입 신청하기</button>
            </div>
          </div>
        </div>
      </form>
    </body>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        moim_no: this.$route.params.moim_no,
        moim: {}, //모임 디테일
  
        QList: {},
        AList: {},
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user;
      }
    },
    mounted() {
      this.getMoimDetail();
      this.getMoimQ();
    },
    methods: {
      goToDetail() {  //모임 디테일 홈으로 이동
        window.location.href = `http://localhost:8001/moimdetail/${this.moim_no}`;
      },
      //--------------------------------------------------------------------
      async getMoimDetail() {
        try {
          const response = await axios.get(`http://localhost:4000/moim/moim_detail/${this.moim_no}`);
          this.moim = response.data[0];
        } catch (error) {
          console.error(error);
        }
      },
      //가입질문
      addQInput() {
        if (this.questionCount < 3) {
          this.questionCount++;
        } else {
          this.$swal("가입질문은 3개까지 가능합니다.");
        }
      },
      removeQInput(index) {
        event.preventDefault();
        this.moimForm['mq' + index] = '';
        this.questionCount--;
      },
      validationCheck() {
        if (!this.AList[0]) {
          this.alert("첫 번째 질문의 답을 입력하세요")
          return false
        }
        if (this.QList.MQ2 && !this.AList[1]) {
          this.alert("두 번째 질문의 답을 입력하세요")
          return false
        }
        if (this.QList.MQ3 && !this.AList[2]) {
          this.alert("세 번째 질문의 답을 입력하세요")
          return false
        }
        return true
      },
      async onSubmitForm() {
        if (!this.validationCheck()) {
          return
        }
        axios({
          url: `http://localhost:4000/moim/moim_answer_w`,
          method: `POST`,
          data: {
            question: this.QList.MQ_NO,
            answer: this.AList,
            user_no: this.user,
            moim_no: this.moim_no
          }
        })
          .then((res) => {
            if (res.data.message == 'success') {
              this.alert("가입 신청이 완료되었습니다. \n더모임장이 확인 후 승인해드려요.")
              window.location.href = `http://localhost:8001/moimdetail/${this.moim_no}`
            }
            else {
              this.alert("오류가 발생했습니다.")
            }
          })
      },
      getCate() {
        let cate = '';
        let cate_no = this.moim.CPARENT_NO;
  
        if (!cate_no) {
          return;
        }
        if (cate_no == 100) {
          cate = '✨ 예술'
        }
        else if (cate_no == 200) {
          cate = '🍴 푸드'
        }
        else if (cate_no == 300) {
          cate = '💪 운동'
        }
        else if (cate_no == 400) {
          cate = '✈ 여행'
        }
        else if (cate_no == 500) {
          cate = '💭 기타'
        }
        return cate;
      },
      async getMoimQ() {
        try {
          const response = await axios.get(`http://localhost:4000/moim/moim_question/${this.moim_no}`);
          this.QList = response.data[0];
        } catch (error) {
          console.error(error);
        }
      },
      alert(text) {
        return this.$alert(text)
      },
    }
  }
  </script>
  
  
      
  <style scoped>
  /* ---------------------------------------------------기본css */
  @font-face {
    /* 긱블말랑이 */
    font-family: 'GeekbleMalang2WOFF2';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/GeekbleMalang2WOFF2.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
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
    font-family: 'Pretendard-Regular';
    color: #2b2b2b;
    /* 드래그 방지 코드 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* ---------------------------------------------------title */
  
  .title {
    margin: 30px 0 0 0;
  }
  
  .title h3 {
    cursor: pointer;
  }
  
  .titledot img {
    width: 24px;
    float: left;
    margin-right: 4px;
  }
  
  .tophr {
    margin: 27px 30px 10px 0;
    border: 2px solid #E1E7F0;
  }
  
  /* ---------------------------------------------------box */
  .box {
    margin: 0 30px 0 270px;
    display: flex;
    height: auto;
    /* border: 1px solid red;  */
  }
  
  .left,
  .right {
    float: left;
    padding-top: 10px;
  }
  
  /* ---------------------------------------------------왼쪽 페이지 */
  .left {
    width: 75%;
    height: 100%;
    margin: 0 30px 30px 0;
    float: left;
    /* border: 1px solid #282fff; */
  }
  
  /* ---------------------------------------------------benner */
  .moim-img {
    position: relative;
    width: 100%;
    height: 210px;
    background-color: #f9f9f9;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .img_box {
    position: relative;
  }
  
  .fakeimg {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/image-loading2.png) center center no-repeat;
    background-size: cover;
  }
  
  .fakeimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .sub-font {
    color: #86a8e7;
    height: 30px;
    /* border: 1px solid #282fff; */
  }
  
  /*----------------------------------------------------모임분류*/
  .cate-nav {
    height: 40px;
    display: flex;
    vertical-align: middle;
    /* border: 1px solid #28ff70; */
  }
  
  .cate-nav h3 {
    padding-top: 6px;
  }
  
  .cate-nav .sub-cate {
    list-style: none;
    display: flex;
    margin: 0px 0 0 10px;
    padding-top: 3px;
    margin-right: 8px;
  }
  
  .cate-nav .cate2 {
    display: flex;
    gap: 8px;
    padding-top: 3px;
    /* border: 1px solid #282fff; */
    cursor: pointer;
    list-style: none;
  }
  
  [class|="col"] {
    background: #ffffff;
    width: auto;
    height: 32px;
    float: left;
    padding: 5px 20px 6px;
    font-size: .8em;
    text-align: center;
    vertical-align: text-top;
    color: #2b2b2b;
    border-radius: 30px;
    border: 1.5px solid #E1E7F0;
  }
  
  .active {
    color: #86a8e7;
    border-color: #86a8e7;
    font-weight: 600;
  }
  
  .cate-nav-hr {
    margin: 20px 0px 20px 0;
    border: 1px solid #E1E7F0;
  }
  
  /* ---------------------------------------------------질문 */
  .moim-questiondiv {
    margin: 20px 10px;
  }
  
  .moim-questioninput {
    width: 100%;
    padding: 16px 20px;
    border: none;
    border-radius: 10px;
    background-color: #F9F9F9;
    margin: 16px 0;
  }
  
  .moim-questioninput:focus {
    outline: #86A8E7 solid 2px;
  }
  
  /* ---------------------------------------------------오른쪽 고정페이지 */
  .right {
    float: left;
    width: 25%;
    height: 100%;
  }
  
  .right .form {
    background-color: #F9F9F9;
    border-radius: 16px;
    padding: 10px 20px 30px 30px;
  }
  
  h5 {
    margin: 20px 0;
  }
  
  .master .master-text img {
    float: left;
    margin-right: 10px;
  }
  
  /* ---------------------------------------------------버튼 */
  
  .creatediv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    margin: 5px 0;
  }
  
  .creatediv button:hover {
    cursor: pointer;
  }
  
  .createbtn {
    width: 100%;
    font-size: medium;
    background-color: #86a8e7;
    color: white;
    height: 40px;
  }
  
  
  /* --------------------------------------------------- */
  
  @media screen and (max-width: 992px) {
    .box {
      margin: 0 30px 0 100px;
      display: flex;
      height: auto;
    }
  
    .left {
      min-width: 300px;
      margin: 0;
    }
  
    .moim-img {
      display: none;
    }
  
    .right {
      /* display: none; */
      min-width: 180px;
      margin-left: 30px;
    }
  
  }
  
  @media screen and (max-width: 768px) {
    .box {
      display: block;
    }
  
    .left {
      width: 100%;
      margin: auto;
    }
  
    .right {
      width: 100%;
      margin: auto;
      padding-right: 30px;
    }
  
    .creatediv {
      margin: auto;
      width: 200px;
    }
  
  }
  </style>