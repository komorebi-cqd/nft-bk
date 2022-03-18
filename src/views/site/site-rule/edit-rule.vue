<template>
    <div class="edit-rule" style="padding: 20px">
        <el-form
            label-position="right"
            label-width="120px"
            :model="rule"
            @submit.native.preven
        >
            <el-form-item label="标题">
                <el-input v-model="rule.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" v-model="rule.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="onSubmit"
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
                rulesId: 666,
                title: "政策",
                content: "巴拉巴拉",
                createDate: "2022-02-03 11:52:02",
            },
        };
    },
    created() {
        this.rule = this.$route.params.data;
    },
    methods:{
        cancel(){
            this.$router.go(-1);
        },
        onSubmit(){
            console.log('点击保存了');
        }
    }
};
</script>
<style lang="scss" scoped>
</style>