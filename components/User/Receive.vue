<template>
    <div>
      <span>你的钱包地址：</span>
      <el-form :model="formObj" ref="formObj" label-width="0px" class="demo-ruleForm">
        <el-form-item
          prop="address"
          :rules="[{ required: true, message: '地址不能为空'}]">
          <el-input type="address" v-model.number="formObj.address" autocomplete="off" class="address_input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formObj')">提交</el-button>
          <el-button @click="resetForm('formObj')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "receive",
      data() {
        return {
          formObj: {
            address: ''
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('....')
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.address_input {
  width: 290px;
  margin: 20px 0px;
}
</style>
