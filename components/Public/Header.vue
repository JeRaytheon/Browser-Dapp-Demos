<template>
  <div class="content">
    <div class="main_content">
      <div class="more" @click="show_more"> <i class="el-icon-setting"></i> </div>
      <div class="userInfo">
        <ul>
          <li>地址：{{address}}</li>
          <li>公钥：{{public_key}}</li>
          <li>归属余额：{{amount}}XEM</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "header",
    methods: {
      show_more: function(){
        this.$emit('show_more',true)
      }
    },
    data: function(){
      return {
        address:'NBG2QAQZGMWW3DKCVZ43Y7XPDO4ONR64BW62VMLS',
        public_key:'publicKey',
        amount:'0.000000'
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    padding-top: 22px;
    padding-bottom: 22px;
    background-color: #4f7d89;

  }
  .main_content {
    width: 100%;
    margin: 0 auto;
  }
  .more {
    font-size: 25px;
    font-weight: bolder;
    display: block;
    position: relative;
    left: 20px;
    color: white;
    padding: 10px;
  }
  .more:hover {
    color: lightsteelblue;
  }
  /*public css*/
  ul li {
    float: left;
    list-style: none;
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: white;
    padding: 2px;
  }
  ul {
    display: block;
    position: absolute;
    top: 13px;
    left: 60px;
  }
</style>
