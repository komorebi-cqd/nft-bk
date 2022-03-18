
<template>
    <div class="edit-agency-nft">
        <NftDetail :isEdit="true" :form="form" />
    </div>
</template>

<script>
import NftDetail from "../components/NftDetail.vue";

export default {
    components: {
        NftDetail,
    },
    data() {
        return {
          form:{}
        };
    },
    created(){
        this.form = this.$route.params && this.$route.params.data;
    },
};
</script>

<style lang="scss" scoped>

</style>>
