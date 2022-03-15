<template>
    <div class="agency-container" style="margin: 10px">
        <div class="top">
            <el-input
                placeholder="请输入内容"
                v-model="input"
                class="input-with-select"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="handleSearch"
                ></el-button>
            </el-input>
            <el-button @click="goAddAgency" type="primary" plain
                >添加机构</el-button
            >
        </div>
        <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="userId" label="用户ID" width="80">
            </el-table-column>
            <el-table-column property="agencyName" label="机构名称" width="120">
            </el-table-column>
            <el-table-column property="account" label="账号" width="120">
            </el-table-column>
            <el-table-column property="operator" label="运营者" width="80">
            </el-table-column>
            <el-table-column
                property="operatorPhone"
                label="运营者电话"
                width="120"
            >
            </el-table-column>
            <el-table-column
                property="releasesNum"
                label="发布内容数"
                width="80"
            >
            </el-table-column>
            <el-table-column property="nftNum" label="NFT数" width="80">
            </el-table-column>
            <el-table-column property="balance" label="余额" width="80">
            </el-table-column>
            <el-table-column property="authStatus" label="认证状态" width="100">
                <template slot-scope="scope">
                    {{ authStatus(scope.row.authStatus) }}
                </template>
            </el-table-column>
            <el-table-column
                property="registerDate"
                label="注册时间"
                width="180"
            >
            </el-table-column>
            <el-table-column
                property="registerSource"
                label="注册来源"
                width="100"
            >
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="resetPassword(scope.row.userId)"
                        >重置登录密码</el-button
                    >
                    <el-button size="mini" @click="goEditView(scope.row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleChange"
            hide-on-single-page
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            class="pagination"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0,
            pageSize: 10,
            currentPage: 1,
            input: "",
            tableData: [
                {
                    userId: 1,
                    agencyName: "北京博物馆",
                    account: "12345678912",
                    operator: "李四",
                    operatorPhone: "13333333333",
                    releasesNum: 666,
                    nftNum: 5,
                    balance: 100,
                    authStatus: 0,
                    registerDate: "2022-02-21 17:10:42",
                    registerSource: "后台",
                },
                {
                    userId: 66,
                    agencyName: "河南博物馆",
                    account: "12345678912",
                    operator: "李白",
                    operatorPhone: "13333333333",
                    releasesNum: 666,
                    nftNum: 5,
                    balance: 100,
                    authStatus: 1,
                    registerDate: "2022-02-21 17:10:42",
                    registerSource: "后台",
                },
            ],
        };
    },
    methods: {
        goAddAgency() {
            this.$router.push({
                name: "Add-Agency",
            });
        },
        goEditView(data) {
            this.$router.push({
                name: "Edit-Agency",
                params: {
                    data,
                    agencyId: data.userId,
                },
            });
        },
        handleChange(current) {
            console.log(current);
            this.currentPage = current;
        },
        authStatus(auth) {
            switch (auth) {
                case 0:
                    return "待认证";
                    break;
                case 1:
                    return "已认证";
                    break;
            }
        },
        resetPassword(agencyId) {
            console.log(`重置密码,机构ID   ${agencyId}`);
        },
        handleSearch() {
            console.log(this.input);
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
.input-with-select {
    width: 400px;
    margin: 0 15px;
}
</style>