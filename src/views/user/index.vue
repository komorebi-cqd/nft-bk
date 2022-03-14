<template>
    <div class="user-container" style="margin: 10px;">
        <el-table
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            border
            style="width: 100%"
        >
            <el-table-column property="userId" label="用户ID" width="80">
            </el-table-column>
            <el-table-column property="nickName" label="昵称" width="80">
            </el-table-column>
            <el-table-column property="phone" label="手机号" width="120">
            </el-table-column>
            <el-table-column property="wxId" label="微信ID" width="80">
            </el-table-column>
            <el-table-column property="isRealName" label="是否实名" width="80">
                <template slot-scope="scope">
                    {{ scope.row.isRealName ? "否" : "是" }}
                </template>
            </el-table-column>
            <el-table-column property="isTiedCard" label="是否绑卡" width="80">
                <template slot-scope="scope">
                    {{ scope.row.isTiedCard ? "否" : "是" }}
                </template>
            </el-table-column>
            <el-table-column property="userName" label="姓名" width="80">
            </el-table-column>
            <el-table-column property="idCard" label="身份证号码">
            </el-table-column>
            <el-table-column
                property="releasesNum"
                label="发布内容数"
                width="100"
            >
            </el-table-column>
            <el-table-column property="nftNum" label="NFT数" width="80">
            </el-table-column>
            <el-table-column property="balance" label="余额" width="80">
            </el-table-column>
            <el-table-column property="inviteNum" label="邀请人数" width="80">
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
                width="120"
            >
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini">操作</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
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
};
</script>

<style lang="scss" scoped>
</style>