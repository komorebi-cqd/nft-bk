
<template>
    <div class="dynamic-container" style="margin: 10px">
        <el-table
            :data="recentList"
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
            <el-table-column property="thumbsUp" label="点赞" width="80">
            </el-table-column>
            <el-table-column property="comment" label="评论" width="80">
            </el-table-column>
            <el-table-column property="browseNums" label="浏览次数" width="80">
            </el-table-column>
            <el-table-column
                property="releaseDate"
                label="发布时间"
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
import { queryRecentNft } from "@/api/nft";

export default {
    data() {
        return {
            total: 0,
            pageSize: 1,
            currentPage: 1,
            input: "",
            trendsView: false,
            trendsViewFile: "",
            trendsViewFileType: 0,
            loading: false,
            recentList: [],
        };
    },
    created(){
        // this.getRecentNft();
    },
    methods: {
        getRecentNft(){
            this.loading = true;
            queryRecentNft({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            }).then((res) => {
                this.total = res.data.total;
                this.recentList = res.data.list;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
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