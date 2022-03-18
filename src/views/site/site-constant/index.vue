<template>
    <div class="site-constant" style="padding: 20px">
        <div class="top">
            <el-button @click="goAddConstant" type="primary" plain
                >添加常量</el-button
            >
        </div>
        <el-table
            :data="rules"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="id" label="ID" width="80">
            </el-table-column>
            <el-table-column property="key" label="常量名" width="120">
            </el-table-column>
            <el-table-column property="value" label="常量值"> </el-table-column>
            <el-table-column property="describe" label="说明">
            </el-table-column>
            <el-table-column property="reviseDate" label="创建时间" width="180">
            </el-table-column>

            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="goEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-popconfirm
                        confirm-button-text="删除"
                        cancel-button-text="点错了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除这个动态吗？"
                        @confirm="deleteConstant(scope.row.id)"
                    >
                        <el-button size="mini" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rules: [
                {
                    id: 666,
                    key: "name_111",
                    value: "6666",
                    describe: "平台服务费用%",
                    reviseDate: "2022-02-03 11:52:02",
                },
                {
                    id: 777,
                    key: "name_111",
                    value: "好",
                    describe: "平台服务费用%",
                    reviseDate: "2022-02-03 11:52:02",
                },
                {
                    id: 888,
                    key: "name_111",
                    value: "你好",
                    describe: "平台服务费用%",
                    reviseDate: "2022-02-03 11:52:02",
                },
            ],
        };
    },
    methods: {
        deleteConstant(id) {
            console.log("删除了规则", id);
        },
        goAddConstant() {
            this.$router.push({ name: "Add-Site-Constant" });
        },
        goEdit(data) {
            this.$router.push({
                name: "Edit-Site-Constant",
                params: {
                    data,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
</style>