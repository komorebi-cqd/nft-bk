<template>
    <div class="add-agency-container">
        <CreateAgency />
    </div>
</template>

<script>
import CreateAgency from './components/CreateAgency.vue'

export default {
    components:{
        CreateAgency
    },
};
</script>

<style lang="scss" scoped>
.add-agency-container {
    width: 90%;
    margin: 0 auto;
}
.all-item {
    display: flex;
    .enter-time {
        width: 200px;
        margin-left: 20px;
    }
}
</style>>
