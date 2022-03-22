<template>
    <div class="user-container" style="margin: 10px">
        <div class="top">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <el-table
            :data="userList"
            highlight-current-row
            border
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column property="id" label="用户ID" width="80">
            </el-table-column>
            <el-table-column property="nickName" label="昵称" width="80">
            </el-table-column>
            <el-table-column property="iphone" label="手机号" width="120">
            </el-table-column>
            <!-- <el-table-column property="wxId" label="微信ID" width="80">
            </el-table-column> -->
            <el-table-column property="isAuthentication" label="是否实名" width="80">
                <template slot-scope="scope">
                    {{ scope.row.isAuthentication ? "是" : "否" }}
                </template>
            </el-table-column>
            <el-table-column property="isBindingBankCard" label="是否绑卡" width="80">
                <template slot-scope="scope">
                    {{ scope.row.isBindingBankCard ? "是" : "否" }}
                </template>
            </el-table-column>
            <el-table-column property="realName" label="姓名" width="80">
            </el-table-column>
            <el-table-column property="identityCard" label="身份证号码" width="180">
            </el-table-column>
            <el-table-column
                property="dynamicAmount"
                label="发布内容数"
                width="100"
            >
            </el-table-column>
            <el-table-column property="nftAmount" label="NFT数" width="80">
            </el-table-column>
            <el-table-column property="remainingSum" label="余额" width="80">
            </el-table-column>
            <el-table-column property="remainingSum" label="邀请人数" width="80">
            </el-table-column>
            <el-table-column
                property="registerDate"
                label="注册时间"
                width="160"
            >
            </el-table-column>
            <el-table-column
                property="source"
                label="注册来源"
                width="120"
            >
            <template slot-scope="scope">
                    {{ formatSource(parseInt(scope.row.source))}}
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
import { queryUser } from "../../api/user";

export default {
    data() {
        return {
            total: 0,
            pageSize: 1,
            currentPage: 1,
            input: '',
            loading: false,
            userList: [
                {
                    userId: 1,
                    nickName: "k",
                    phone: "12345678912",
                    wxId: "123",
                    isRealName: 0,
                    isTiedCard: 0,
                    userName: "陈桥",
                    idCard: "430523199907111111",
                    releasesNum: 666,
                    nftNum: 5,
                    balance: 100,
                    inviteNum: 0,
                    registerDate: "2022-02-21 17:10:42",
                    registerSource: "H5",
                },
                {
                    userId: 1,
                    nickName: "k",
                    phone: "12345678912",
                    wxId: "123",
                    isRealName: 0,
                    isTiedCard: 0,
                    userName: "灰原哀",
                    idCard: "430523199907111111",
                    releasesNum: 666,
                    nftNum: 5,
                    balance: 100,
                    inviteNum: 0,
                    registerDate: "2022-02-21 17:10:42",
                    registerSource: "微信小程序",
                },
                {
                    userId: 1,
                    nickName: "k",
                    phone: "12345678912",
                    wxId: "123",
                    isRealName: 0,
                    isTiedCard: 0,
                    userName: "桃之助",
                    idCard: "430523199907111111",
                    releasesNum: 666,
                    nftNum: 5,
                    balance: 100,
                    inviteNum: 0,
                    registerDate: "2022-02-21 17:10:42",
                    registerSource: "微信小程序",
                },
            ],
        };
    },
    created(){
        this.queryUser();
    },
    methods:{
        queryUser(){
            this.loading = true;
            queryUser({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            }).then((res) => {
                console.log(res);
                this.total = res.data.total;
                this.userList = res.data.list;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handleChange(current) {
            this.currentPage = current;
            this.queryUser();
        },
        handleSearch(){
            console.log(this.input);
        },
        formatSource(source){
            switch (source) {
                case 1:
                    return '小程序';
                case 2:
                    return 'H5';
                case 3:
                    return '管理界面';
            }
        }

    }
};
</script>

<style lang="scss" scoped>
.top{
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
.input-with-select{
    width: 400px;
}

</style>