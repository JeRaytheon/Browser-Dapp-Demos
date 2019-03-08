<template>
    <div class="content">
        <SubInfo v-on:back="back" :showSubInfo="showSubInfo" ></SubInfo>
      <MyHeader v-on:show_more="show_more"></MyHeader>
      <div class="btn-content">
        <ul>
          <li v-for="item in funckArray" @click="jump2panel(item.num)">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="function-content">
        <div class="subpanel" v-if="funckArray[0].active">
          <Send></Send>
        </div>
        <div class="subpanel" v-if="funckArray[1].active">
          <Receive></Receive>
        </div>
        <div class="subpanel" v-if="funckArray[2].active">
          <History></History>
        </div>
      </div>
    </div>
</template>


<script>
  import MyHeader from '../../components/Public/Header'
  import SubInfo from '../../components/Public/SubInfo'
  import Send from '../../components/User/Send'
  import Receive from '../../components/User/Receive'
  import History from '../../components/User/History'
    export default {
      name: "user",
      components: {
        MyHeader,
        SubInfo,
        Send,
        Receive,
        History
      },
      data() {
        return {
          activeName: 'first',
          funckArray: [
            {
              name: '发送',
              num: 0,
              active: true
            }, {
              name: '接收',
              num: 1,
              active: false
            }, {
              name: '历史',
              num: 2,
              active: false
            }],
          showSubInfo:false
        };
      },
      methods: {
        jump2panel: function (num) {
          let len = this.funckArray.length;
          for (let i = 0; i < len; i++) {
            this.funckArray[i].active = false;
          }
          this.funckArray[num].active = true
        },
        back: function(e){
          this.showSubInfo = e
          console.log(e)
        },
        show_more: function (e) {
          this.showSubInfo = e
          console.log(e)

        }
      }
    }
</script>

<style scoped>
  .content{
    width: 100%;
  }
.btn-content {
  width: 100%;
  height: 50px;
  background-color: #528cab;
  box-shadow:gray 0px 1px 15px ;
}
.function-content {
  position:relative;
  top: 0px;
  width: 100%;
  height: auto;
}
.subpanel {
  padding: 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position:absolute;
  top:0;
  width: 100%;
  left:0;
}

/*anime*/

/*公共样式*/
ul>li {
  float: left;
  display: block ;
  background-color: #528cab;
  width: 33%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size:16px;
  color: white;
}
* {
  margin: 0;
  padding: 0;
}
</style>
