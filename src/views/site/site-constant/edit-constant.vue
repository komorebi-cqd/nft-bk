<template>
    <div class="edit-constant" style="padding: 20px">
        <el-form
            label-position="right"
            label-width="120px"
            :model="data"
            @submit.native.preven
            ref="data"
        >
            <el-form-item label="常量名" prop="key">
                <el-input v-model="data.key"></el-input>
            </el-form-item>
            <el-form-item label="常量值" prop="value">
                <el-input v-model="data.value"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="describe">
                <el-input type="textarea" v-model="data.describe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel('rule')">取消</el-button>
                <el-button type="primary" @click="onSubmit('rule')"
                    >保存</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {
            },
        };
    },
    created() {
        this.data = this.$route.params.data;
    },
    methods: {
        cancel(ele) {
            this.$router.go(-1);
            this.$refs[ele].resetFields();
        },
        onSubmit(ele) {
            console.log("点击保存了", this.data);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>