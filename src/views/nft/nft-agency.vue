<template>
    <div class="nft-agency">
        <el-table
            :data="recentList"
            highlight-current-row
            border
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column property="nftRecording" label="NFT ID" width="80">
            </el-table-column>
            <el-table-column
                property="institutionName"
                label="机构名称"
                width="80"
            >
            </el-table-column>

            <el-table-column property="nftPrice" label="价格" width="80">
            </el-table-column>

            <el-table-column property="nftQuantity" label="发售次数" width="80">
            </el-table-column>

            <el-table-column
                property="nftSurplusQuantity"
                label="已售次数"
                width="80"
            >
                <template slot-scope="scope">
                    {{ scope.row.nftQuantity - scope.row.nftSurplusQuantity }}
                </template>
            </el-table-column>

            <el-table-column property="trendsType" label="动态类型" width="80">
                <template slot-scope="scope">
                    {{ scope.row.trendsType === 0 ? "待修改" : "待修改" }}
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
            <el-table-column property="nftDetails" label="描述">
            </el-table-column>
            <el-table-column property="likeAmount" label="点赞" width="80">
            </el-table-column>
            <el-table-column property="commentAmount" label="评论" width="80">
            </el-table-column>
            <el-table-column
                property="browseAmount"
                label="浏览次数"
                width="80"
            >
            </el-table-column>
            <el-table-column property="nftStatus" label="状态" width="80">
                <template slot-scope="scope">
                    {{ formatState(parseInt(scope.row.nftStatus)) }}
                </template>
            </el-table-column>

            <el-table-column
                property="nftReleaseTime"
                label="发售时间"
                width="180"
            >
            </el-table-column>

            <el-table-column
                property="registerDate"
                label="发布时间"
                width="180"
            >
            </el-table-column>

            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" @click="goDetail(scope.row)"
                        >查看</el-button
                    >
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
    created() {
        this.getRecentNft();
    },
    methods: {
        //获取机构NFT信息
        getRecentNft() {
            this.loading = true;
            queryRecentNft({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.total = res.data.total;
                    this.recentList = res.data.list;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        //查看动态文件
        lookTrends(file) {
            this.trendsViewFile = file.nftFilePath;
            this.trendsViewFileType = 0;
            this.trendsView = true;
        },
        //格式化状态
        formatState(state) {
            switch (state) {
                case 0:
                    return "下架";
                case 1:
                    return "挂售中";
                case 2:
                    return "待发售";
                case 3:
                    return "售罄";
            }
        },
        //去详情页面
        goDetail(data) {
            this.$router.push({
                name: "Agency-Detail",
                params: {
                    detailId: 666,
                    data,
                },
            });
        },
        handleChange(current) {
            this.currentPage = current;
            this.getRecentNft();
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