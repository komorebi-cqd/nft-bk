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
            :data="agencyList"
            highlight-current-row
            border
            style="width: 100%"
            v-loading="loading"
        >
            <!-- <el-table-column property="userId" label="用户ID" width="80">
            </el-table-column> -->
            <el-table-column property="institutionName" label="机构名称" width="120">
            </el-table-column>
            <el-table-column property="loginId" label="账号" width="80">
            </el-table-column>
            <el-table-column property="operatorName" label="运营者" width="80">
            </el-table-column>
            <el-table-column
                property="operatorIphone"
                label="运营者电话"
                width="120"
            >
            </el-table-column>
            <el-table-column property="nftAmount" label="NFT数" width="80">
            </el-table-column>
            <el-table-column property="remainingSum" label="余额" width="80">
            </el-table-column>
            <el-table-column property="isTimeSale" label="定时发售" width="100">
                <template slot-scope="scope">
                    {{ parseInt(scope.row.isTimeSale) ? '支持': '不支持'  }}
                </template>
            </el-table-column>
            <el-table-column property="isForwardBuying" label="提前购买" width="100">
                <template slot-scope="scope">
                    {{ parseInt(scope.row.isForwardBuying) ? '支持': '不支持'  }}
                </template>
            </el-table-column>
            <el-table-column property="isDonation" label="转赠等待" width="100">
                <template slot-scope="scope">
                    {{parseInt(scope.row.isDonation) === -1 ? '不支持': parseInt(scope.row.isDonation)  }}
                </template>
            </el-table-column>
            <el-table-column property="isResell" label="转卖等待" width="100">
                <template slot-scope="scope">
                    {{parseInt(scope.row.isResell) === -1 ? '不支持': parseInt(scope.row.isDonation)  }}
                </template>
            </el-table-column>
            <el-table-column property="isTimeSale" label="评论" width="100">
                <template slot-scope="scope">
                    {{ parseInt(scope.row.isComment) ? '支持': '不支持'  }}
                </template>
            </el-table-column>
            <el-table-column
                property="registerDate"
                label="注册时间"
            >
            </el-table-column>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="resetPassword(scope.row.loginId)"
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
import { queryInstitutionList, resetPassword } from "@/api/user";

export default {
    data() {
        return {
            total: 0,
            pageSize: 1,
            currentPage: 1,
            input: "",
            agencyList: [],
            loading: false,
        };
    },
    created() {
        this.getAgencyList();
    },
    methods: {
        getAgencyList() {
            this.loading = true;
            queryInstitutionList({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            }).then((res) => {
                this.total = res.data.total;
                this.agencyList = res.data.list;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
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
                    agencyId: data.loginId,
                },
            });
        },
        handleChange(current) {
            this.currentPage = current;
            this.getAgencyList();
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
        resetPassword(loginId) {
            resetPassword({ loginId }).then((res) => {
                this.$alert(`密码：${res.data.password}`, "重置成功", {
                    confirmButtonText: "复制",
                    callback: (action) => {
                        this.$copyText(res.data.password);
                        this.$message({
                            type: "success",
                            message: `复制成功`,
                        });
                    },
                });
            });
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