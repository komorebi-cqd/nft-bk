<template>
    <div class="add-agency-container">
        <el-form
            label-position="right"
            label-width="120px"
            :model="formAddAgency"
            @submit.native.preven
            ref="formAddAgency"
        >
            <el-form-item label="机构名称" prop="agencyName">
                <el-input v-model="formAddAgency.agencyName"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="account">
                <el-input v-model="formAddAgency.account"></el-input>
            </el-form-item>
            <el-form-item label="登录密码"  prop="password">
                <el-input v-model="formAddAgency.password"></el-input>
            </el-form-item>
            <el-form-item label="重复登录密码"  prop="repeatPassword">
                <el-input v-model="formAddAgency.repeatPassword"></el-input>
            </el-form-item>
            <el-form-item label="运营者名称"  prop="name">
                <el-input v-model="formAddAgency.name"></el-input>
            </el-form-item>
            <el-form-item label="运营者手机号"  prop="phone">
                <el-input v-model="formAddAgency.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel('formAddAgency')">取消</el-button>
                <el-button type="primary" @click="onSubmit('formAddAgency')">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formAddAgency: {
                agencyName: "",
                account: "",
                password: "",
                repeatPassword: "",
                name: "",
                phone: "",
            },
        };
    },
    methods: {
        cancel(formName){
            this.$router.push({
                name: 'Agency'
            })
            this.$refs[formName].resetFields();
        },
        onSubmit(formName){

            //重置表单
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.add-agency-container{
    width: 90%;
    margin: 0 auto;
    padding-top: 60px;
}
</style>>
