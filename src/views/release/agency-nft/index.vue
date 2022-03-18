<template>
    <div class="release-agency-nft" style="margin: 10px">
        <div class="top">
            <el-button @click="goAddNft" type="primary" plain
                >发布NFT</el-button
            >
        </div>
        <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="nftId" label="NFT ID" width="80">
            </el-table-column>
            <el-table-column property="agencyName" label="机构名称" width="120">
            </el-table-column>
            <el-table-column property="price" label="价格" width="120">
            </el-table-column>
            <el-table-column property="type" label="动态类型" width="120">
                <template slot-scope="scope">
                    {{ scope.row.type === 0 ? "图片" : "视频" }}
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
            <el-table-column property="saleNums" label="售卖数量" width="80">
            </el-table-column>
            <el-table-column property="soldNums" label="已售数量" width="80">
            </el-table-column>
            <el-table-column
                property="transferWaiting"
                label="转赠等待"
                width="80"
            >
            </el-table-column>
            <el-table-column
                property="resellWaiting"
                label="转卖等待"
                width="80"
            >
            </el-table-column>
            <el-table-column property="thumbsUp" label="点赞" width="60">
            </el-table-column>
            <el-table-column property="comment" label="评论" width="60">
            </el-table-column>
            <el-table-column property="browseNums" label="浏览次数" width="60">
            </el-table-column>
            <el-table-column property="state" label="状态" width="60">
                <template slot-scope="scope">
                    {{ formatState(scope.row.state) }}
                </template>
            </el-table-column>
            <el-table-column
                property="releaseDate"
                label="发布时间"
                width="180"
            >
            </el-table-column>

            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="goDetail(scope.row)">查看</el-button>
                    <el-button size="mini" @click="goEdit(scope.row)">编辑</el-button>
                    <el-popconfirm
                        confirm-button-text="删除"
                        cancel-button-text="点错了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除这个NFT吗？"
                        @confirm="deleteTrends(scope.row.trendsId)"
                    >
                        <el-button slot="reference" size="mini">删除</el-button>
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
                    nftId: 1,
                    agencyName: "北湖南博物馆",
                    price: 666,
                    type: 0, //0图片 1视频
                    main_img: "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    content_img: "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒人间清醒人间清醒人间清醒",
                    saleNums: 666,
                    soldNums: 222,
                    transferWaiting: 10,
                    resellWaiting: 10,
                    thumbsUp: 666,
                    comment: 9999,
                    browseNums: 5,
                    state: 0,
                    saleDate: "2022-02-21 17:10:42",
                    releaseDate: "2022-02-21 17:10:42",
                },
                {
                    nftId: 1,
                    agencyName: "北京博物馆",
                    price: 666,
                    type: 0, //0图片 1视频
                    main_img: "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    content_img: "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    saleNums: 888,
                    soldNums: 222,
                    transferWaiting: 99,
                    resellWaiting: 1,
                    thumbsUp: 666,
                    comment: 9999,
                    browseNums: 5,
                    state: 0,
                    saleDate: "2022-02-21 17:10:42",
                    releaseDate: "2022-02-21 17:10:42",
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
            this.trendsViewFile = file.file;
            this.trendsViewFileType = file.type;
            this.trendsView = true;
        },
        handleChange(current) {
            console.log(current);
            this.currentPage = current;
        },
        //格式化订单状态
        formatState(state) {
            switch (state) {
                case 0:
                    return "失败";
                case 1:
                    return "成功";
                case 2:
                    return "待支付";
            }
        },
        //添加NFT
        goAddNft() {
            this.$router.push({
                name: "Add-Agency-Nft",
            });
        },
        //查看NFT详情
        goDetail(data) {
            this.$router.push({
                name: "Detail-Agency-Nft",
                params: {
                    data
                }
            });
        },
        //编辑NFT详情
        goEdit(data) {
            console.log(data,'goEdit');
            this.$router.push({
                name: "Edit-Agency-Nft",
                params: {
                    data
                }
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