<template>
    <div class="nft-agency" style="padding: 20px">
        <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="NftId" label="NFT ID" width="80">
            </el-table-column>
            <el-table-column property="moldId" label="铸造者ID" width="80">
            </el-table-column>
            <el-table-column property="sellerId" label="卖家/转赠者ID" width="80">
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
            <el-table-column property="buyerId" label="买家ID" width="80">
            </el-table-column>
            <el-table-column property="orderType" label="订单类型" width="80">
                <template slot-scope="scope">
                    {{ formatOrderType(scope.row.payMethod) }}
                </template>
            </el-table-column>
            <el-table-column property="payMethod" label="支付方式" width="80">
                <template slot-scope="scope">
                    {{ formatPayMethod(scope.row.payMethod) }}
                </template>
            </el-table-column>
            <el-table-column property="orderState" label="订单状态" width="80">
                <template slot-scope="scope">
                    {{ formatState(scope.row.orderState) }}
                </template>
            </el-table-column>

            <el-table-column property="createDate" label="创建时间" width="180">
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
                    moldId: 666, //铸造ID
                    sellerId: 0, //卖家/转赠者ID
                    trendsType: 0, //0图片 1视频
                    price: 99,
                    royalty: '10%',
                    tradeNums: 10,
                    trendsFile:
                        "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    buyerId: 666,
                    orderType: 0,
                    payMethod: 0,
                    orderState: 0,
                    createDate: "2022-02-21 17:10:42",
                },
                {
                    NftId: 1,
                    moldId: 666, //铸造ID
                    sellerId: 0, //卖家/转赠者ID
                    trendsType: 0, //0图片 1视频
                    price: 99,
                    royalty: '10%',
                    tradeNums: 10,
                    trendsFile:
                        "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                    describe: "人间清醒",
                    buyerId: 666,
                    orderType: 0,
                    payMethod: 0,
                    orderState: 0,
                    createDate: "2022-02-21 17:10:42",
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
        //格式订单类型
        formatOrderType(state){
            switch (state) {
                case 0:
                    return "购买";
                case 1:
                    return "转赠";
                case 2:
                    return "活动所得";
            }
        },
        //格式支付类型
        formatPayMethod(state) {
            switch (state) {
                case 0:
                    return "微信";
                case 1:
                    return "支付宝";
                case 2:
                    return "其他";
            }
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