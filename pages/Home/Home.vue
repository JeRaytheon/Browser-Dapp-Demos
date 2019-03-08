<template>
  <div>
    <!--开场动画-->
    <StartAnime></StartAnime>
    <!--选择网络类型-->
    <el-dropdown v-show="showNetType" class="netType" trigger="click" @command="changeNet">
      <el-button class="netType_more" type="primary">
        {{netType}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="netType_sub">
        <el-dropdown-item :key="item" v-for="item in netTypeArray" :command="item">{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  <div class="auth">
    <div class="current">
      <div class="auth__header">
        <div class="_logo">
          <span>NEM</span>
        </div>
      </div>
      <div class="auth__btngroup">
        <el-dropdown @command="changeType" trigger="click">
          <el-button class="btn_more" type="primary">
            {{type}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="btn_sub">
            <el-dropdown-item command="创建钱包">创建钱包</el-dropdown-item>
            <el-dropdown-item command="导入钱包">导入钱包</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button class="btn_more btn_sure" @click="jump2create" type="primary">确定</el-button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import StartAnime from '../../components/Public/StartAnime'
  export default {
    name: "home",
    components:{
      StartAnime
    },
    data:function(){
      return {
        type:'创建钱包',
        netType: 'Mainnet',
        showNetType: true,
        netTypeArray: ['Mainnet','Mijin','Testnet']
      }
    },
    methods: {
      changeType: function (type) {
        this.type = type;
        if(type == '创建钱包'){
          this.showNetType = true
        }else {
          this.showNetType = false
        }
      },
      changeNet: function(type){
        this.netType = type;
      },
      jump2create:function(){
        this.$router.push('/User/User')
      }
    }
  }
</script>

<style scoped>
  .content {
    margin: 0 auto;
    position: relative;
  }
  .current {
    width:280px;
    height: 361px;
    padding-left: 10px;
    padding-right: 10px;
    margin:auto ;
    position: absolute;
    top: 0 ;
    bottom:0;
    left:0;
    right:0;
  }
  ._logo {
    width: 140px;
    height: 140px;
    margin: 0 auto ;
    background-image: url('/nem_logo_web.png');
    background-size: contain;
    position: relative;
  }
  ._logo span {
    position: absolute;
    top: 120px;
    left: 30px;
    font-size: 35px;
    color: #3B8070;
  }
  .auth__btngroup {
    width: 100%;
    min-width: 240px;
    margin: 0 auto;
    margin-top: 40px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f2f2f2;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.25);
  }
  .btn_more{
    width: 240px ;
    height: 60px ;
    font-size: 20px;
  }
  .btn_sub {
    width: 240px ;
  }
  .btn_sure {
    margin-top: 10px;
  }
  .netType {
    position: absolute;
    right:10px ;
    top: 10px ;
  }

</style>
