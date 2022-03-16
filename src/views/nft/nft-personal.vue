<template>
    <div class="nft-personal">
        <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="NftId" label="NFT ID" width="80">
            </el-table-column>
            <el-table-column property="caster" label="铸造者" width="80">
            </el-table-column>
            <el-table-column property="holder" label="持有者" width="80">
            </el-table-column>

            <el-table-column property="price" label="价格" width="80">
            </el-table-column>

            <el-table-column property="royalty" label="版税" width="80">
            </el-table-column>

            <el-table-column property="tradeNums" label="交易次数" width="80">
            </el-table-column>

            <el-table-column property="trendsType" label="动态类型" width="80">
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
            <el-table-column property="state" label="状态" width="80">
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

            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" @click="goDetail(scope.row)">查看</el-button>
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
                    NftId: 1,
                    caster: 55, //铸造者ID
                    holder: 66, //当前持有者ID
                    trendsType: 0, //0图片 1视频
                    price: 99,
                    royalty: "10%", //版税
                    tradeNums: 3, //交易次数
                    trendsFile:
                        "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    thumbsUp: 666, //点赞次数
                    comment: 9999, //评论次数
                    browseNums: 5, //浏览次数
                    state: 0, //状态
                    releaseDate: "2022-02-21 17:10:42",
                },
                {
                    NftId: 1,
                    caster: 55, //铸造者ID
                    holder: 66, //当前持有者ID
                    trendsType: 0, //0图片 1视频
                    price: 99,
                    royalty: "10%", //版税
                    tradeNums: 3, //交易次数
                    trendsFile:
                        "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    thumbsUp: 666, //点赞次数
                    comment: 9999, //评论次数
                    browseNums: 5, //浏览次数
                    state: 1, //状态
                    releaseDate: "2022-02-21 17:10:42",
                },
            ],
        };
    },
    methods: {
        //查看动态文件
        lookTrends(file) {
            this.trendsViewFile = file.trendsFile;
            this.trendsViewFileType = file.trendsType;
            this.trendsView = true;
        },
        //格式化状态
        formatState(state) {
            switch (state) {
                case 0:
                    return "待出售";
                case 1:
                    return "出售中";
                case 2:
                    return "已售罄";
                case 3:
                    return "已下架";
            }
        },
        //去详情页面
        goDetail(data){
            this.$router.push({
                name: 'Personal-Detail',
                params: {
                    detailId: 666,
                    data
                }
            })
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