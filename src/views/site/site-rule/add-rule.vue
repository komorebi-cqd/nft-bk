<template>
    <div class="add-rule" style="padding: 20px">
        <el-form
            label-position="right"
            label-width="120px"
            :model="rule"
            @submit.native.preven
            ref="rule"
        >
            <el-form-item label="标题" prop="title">
                <el-input v-model="rule.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="rule.content"></el-input>
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
            rule: {
                title: "",
                content: "",
            },
        };
    },
    methods: {
        cancel(ele) {
            this.$router.go(-1);
            this.$refs[ele].resetFields();
        },
        onSubmit(ele) {
            console.log("点击保存了", this.rule);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>