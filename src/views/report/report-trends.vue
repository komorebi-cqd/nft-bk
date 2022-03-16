
<template>
    <div class="report-trends">
        <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="trendsId" label="动态ID" width="80">
            </el-table-column>
            <el-table-column property="userId" label="用户ID" width="120">
            </el-table-column>
            <el-table-column property="trendsType" label="动态类型" width="120">
                <template slot-scope="scope">
                    {{ scope.row.trendsType === 0 ? "图片" : "视频" }}
                </template>
            </el-table-column>
            <el-table-column property="trendsFile" label="媒体文件" width="80">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        @click="lookTrends(scope.row)"
                        >查看</el-button
                    >
                </template>
            </el-table-column>
            <el-table-column property="describe" label="描述">
            </el-table-column>
            <el-table-column
                property="reportUserId"
                label="举报人ID"
                width="80"
            >
            </el-table-column>

            <el-table-column
                property="reportDate"
                label="举报时间"
                width="180"
            >
            </el-table-column>

            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-popconfirm
                        confirm-button-text="删除"
                        cancel-button-text="点错了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除这个动态吗？"
                        @confirm="deleteTrends(scope.row.trendsId)"
                    >
                        <el-button slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="动态文件"
            :visible.sync="trendsView"
            width="60%"
            center
        >
            <div class="trends-view-img" v-if="!trendsViewFileType">
                <img :src="trendsViewFile" alt="" />
            </div>
            <div class="trends-view-img" v-else>这里是视频</div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="trendsView = false">取 消</el-button>
                <el-button type="primary" @click="trendsView = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>

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
            trendsView: false,
            trendsViewFile: "",
            trendsViewFileType: 0,
            tableData: [
                {
                    trendsId: 1,
                    userId: 2,
                    trendsType: 0, //0图片 1视频
                    trendsFile:
                        "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    reportUserId: 666,
                    reportDate: "2022-02-21 17:10:42",
                },
                {
                    trendsId: 1,
                    userId: 2,
                    trendsType: 1, //0图片 1视频
                    trendsFile:
                        "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    reportUserId: 555,
                    reportDate: "2022-02-21 17:10:42",
                },
            ],
        };
    },
    methods: {
        //删除动态
        deleteTrends(id) {
            console.log("删除动态id", id);

            this.$message({
                message: "删除成功",
                type: "success",
            });
        },
        //查看动态文件
        lookTrends(file) {
            this.trendsViewFile = file.trendsFile;
            this.trendsViewFileType = file.trendsType;
            this.trendsView = true;
        },
        handleChange(current) {
            console.log(current);
            this.currentPage = current;
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
.trends-view-img {
    text-align: center;
    img {
        max-height: 350px;
        width: auto;
    }
}
</style>