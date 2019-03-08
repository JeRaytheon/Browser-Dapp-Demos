<template>
  <div>
    <el-alert
      :key="item"
      v-for="item in infoArray"
      :title="item.tit"
      v-if="item.show"
      :type="item.type"
      center
      show-icon>
    </el-alert>
    <el-radio-group size="small">
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <div class="send_form">
      <el-form label-position="right" ref="formObj" label-width="100px" :model="formObj">
        <el-form-item
          label="地址"
          prop="address"
          :rules="[
              { required: true, message: '地址不能为空'}]"
        >
          <el-input type="address" placeholder="请输入交易地址" v-model="formObj.address"></el-input>
        </el-form-item>
        <el-form-item
          label="交易数量"
          prop="amount"
          :rules="[
              { required: true, message: '交易数量不能为空'},
              { type: 'number', message: '交易数量必须为数字值'}
            ]"
        >
          <el-input type="amount" v-model.number="formObj.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="信息"
          prop="message"
          :rules="[
              { required: true, message: '信息不能为空'}]"
        >
          <el-input
            type="message"
            placeholder="请输入交易信息"
            v-model="formObj.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<!--地址/交易数量（自然数）/message-->

<script>
  export default {
    name: "send",
    data: function () {
      return {
        formObj: {
          address: '',
          amount: 0,
          message: '',
        },
        infoArray: []
      }
    },
    methods:{
      submitForm: function () {
        if(this.formObj.amount < 0){
          this.infoArray.push( {
            tit:'交易数量不能为负',
            type:'error',
            show:true,
          })
        }else if(this.formObj.amount.toString() == '' ||　this.formObj.address == '' || this.formObj.message == ''){
          this.infoArray.push({
            tit:'信息不能为空',
            type:'error',
            show:true,
          })
        }else{
          this.infoArray = []
        }
      },
      resetForm: function () {
        this.$refs['formObj'].resetFields();
      }
    }
  }
</script>

<style scoped>
.send_form {
  position: relative;
  right: 20px;
}
</style>
