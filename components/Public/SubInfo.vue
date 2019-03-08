<template>
    <div :class="sub_class_name">
      <div class="info_logo">
        <span>NEM</span>
      </div>
     <div  class="back" v-on:click="back">
       <i class="el-icon-close"></i>
     </div>
      <div class="Info">
        <ul>
          <li>version:1.0</li>
          <li>username:</li>
          <li>email:</li>
        </ul>
      </div>
      <div class="sign_out">
        <el-button type="danger" @click="sign_out">退出账户</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sub-info",
      data:function () {
        return {
          sub_class_name: 'display'
        }
      },
      props: ['showSubInfo'],
      methods: {
          back:function(){
              this.$emit("back",false)
            this.sub_class_name = 'subInfo_out'
          },
        sign_out: function () {
          this.$router.push('/Home/Home')
        }
      },
      watch:{
        showSubInfo:function(){
          console.log('......')
          if(this.showSubInfo){
            this.sub_class_name = 'subInfo sub'
          }else {
            this.sub_class_name = 'subInfo_out sub'
          }
        }
      }
    }
</script>

<style scoped>
  .display {
    display: none;
  }
  .sub {
    padding: 10px;
    box-sizing: border-box;
    width: 270px;
    height: 100%;
    position: fixed;
    background-color: white;
    z-index: 999;
    box-shadow: #7f828b 0px 0px 20px;
  }
  .subInfo {
    animation: moveIn 1s ;
  }
  .subInfo_out {
    animation: moveOut 1s ;
    left: -290px;
  }
  .back {
    font-size: 30px;
    font-weight: bolder;
    float: right;
  }
  .back:hover {
    color: red;
  }
  .info_logo {
    position: relative;
    float: left;
    width: 70px;
    height: 70px;
    background-image: url('/nem_logo_web.png');
    background-size: contain;
  }
  .info_logo span {
    position: absolute;
    top: 25px;
    left: 60px;
    font-size: 20px;
  }
  .sign_out {
    position: relative;
    top: 100px;
    left: 75px;
    margin: auto;
  }
  ul {
    position: relative;
    top: 45px;
  }
  ul>li {
    list-style: none;
    border-bottom: 1px solid #3B8070 ;
    padding: 12px;
    font-size: 20px;
    color: gray;
    text-align: left;
  }
  ul:before {
    content: '';
    display: block;
    clear: both;
  }
  /*动画*/
  @keyframes moveIn
  {
    from {left:-270px;}
    to {left: 0px;}
  }

  @keyframes moveOut
  {
    from {left:0px;}
    to {left: -270px;}
  }
</style>
