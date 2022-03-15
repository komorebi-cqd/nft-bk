<template>
    <div class="creators-container" style="margin: 10px">
        <div class="top">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="userId" label="用户ID" width="80">
            </el-table-column>
            <el-table-column property="nickName" label="昵称" width="120">
            </el-table-column>
            <el-table-column property="phone" label="手机号" width="120">
            </el-table-column>
            <el-table-column property="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column
                property="applyName"
                label="申请名称"
                width="120"
            >
            </el-table-column>
            <el-table-column
                property="creatorsType"
                label="创作者类型"
                width="80"
            >
            <template slot-scope="scope">
                    {{ creatorsType(scope.row.creatorsType) }}
                </template>
            </el-table-column>
            <el-table-column property="state" label="状态" width="100">
                <template slot-scope="scope">
                    {{ examineType(scope.row.state) }}
                </template>
            </el-table-column>
            <el-table-column
                property="applyDate"
                label="申请时间"
                width="180"
            >
            </el-table-column>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <template v-if="scope.row.state === 0">
<el-button size="mini" @click="changeState(1,scope.row.userId)">通过</el-button>
                    <el-button size="mini" @click="changeState(2,scope.row.userId)">不通过</el-button>
                    </template>
                    <template v-else>
                        已审核
                    </template>
                    
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
            input: '',
            tableData: [
                {
                    userId: 1,
                    nickName: "桃之助",
                    phone: "12345678912",
                    name: "李四",
                    applyName: "河南博物馆", //没机构名称就是空
                    creatorsType: 0, //0个人，1机构
                    state: 0, //0待审核，1已通过，2不通过
                    applyDate: "2022-02-21 17:10:42",
                },
                {
                    userId: 2,
                    nickName: "灰原哀",
                    phone: "12345678912",
                    name: "李四",
                    applyName: "", //没机构名称就是空
                    creatorsType: 1, //0个人，1机构
                    state: 2, //0待审核，1已通过，2不通过
                    applyDate: "2022-02-21 17:10:42",
                },
                {
                    userId: 1,
                    nickName: "桃之助",
                    phone: "12345678912",
                    name: "李四",
                    applyName: "河南博物馆", //没机构名称就是空
                    creatorsType: 1, //0个人，1机构
                    state: 2, //0待审核，1已通过，2不通过
                    applyDate: "2022-02-21 17:10:42",
                },
            ],
        };
    },
    methods: {
        handleChange(current) {
            console.log(current);
            this.currentPage = current;
        },
        //创作者类型
        creatorsType(type) {
            switch (type) {
                case 0:
                    return "个人";
                    break;
                case 1:
                    return "机构";
                    break;
            }
        },
        //审核状态
        examineType(type) {
            switch (type) {
                case 0:
                    return "待审核";
                    break;
                case 1:
                    return "已通过";
                    break;
                case 2:
                    return "不通过";
                    break;
            }
        },
        changeState(state, id) {
            switch (state) {
                case 1:
                    console.log("点击了通过", id);
                    break;
                case 2:
                    console.log("点击了不通过", id);
                    break;
            }
        },
        handleSearch(){
            console.log(this.input);
        }
    },
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