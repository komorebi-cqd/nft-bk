
<template>
    <div class="edit-agency-container">
        <CreateAgency :isEdit="true" :form="form"/>
    </div>
</template>

<script>
import CreateAgency from './components/CreateAgency.vue'

export default {
    components:{
        CreateAgency
    },
    data() {
        return {
            form: {},
        };
    },
    created(){
        let form  = this.$route.params && this.$route.params.data;
        form.repeatPassword = form.password;
        this.form = form;
    },
    methods: {
        cancel(formName){
            this.$router.push({
                name: 'Agency'
            })
        },
        onSubmit(formName){

            //重置表单
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.edit-agency-container{
    width: 90%;
    margin: 0 auto;
}
</style>>
