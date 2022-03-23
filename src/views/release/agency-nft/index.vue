<template>
    <div class="release-agency-nft" style="margin: 10px">
        <div class="top">
            <el-button @click="goAddNft" type="primary" plain
                >发布NFT</el-button
            >
        </div>
        <el-table
            :data="agencyNftList"
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
                <template slot-scope="scope">
                    {{ formatIntDate(scope.row.nftReleaseTime) }}
                </template>
            </el-table-column>

            <el-table-column
                property="registerDate"
                label="发布时间"
                width="180"
            >
                <template slot-scope="scope">
                    {{ formatIntDate(scope.row.registerDate) }}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="
                            showModifyView(
                                parseInt(scope.row.nftStatus),
                                scope.row.nftRecording
                            )
                        "
                        >修改状态</el-button
                    >
                    <el-popconfirm
                        confirm-button-text="删除"
                        cancel-button-text="点错了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除这个动态吗？"
                        @confirm="deleteTrends(scope.row.nftRecording)"
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

        <el-dialog
            title="修改NFT状态"
            :visible.sync="modifyStateVisible"
            width="30%"
            center
        >
            <el-select v-model="defaultState" placeholder="请选择">
                <el-option
                    v-for="item in stateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyStateVisible = false"
                    >取消修改</el-button
                >
                <el-button type="primary" @click="confirmModifyState"
                    >确认修改</el-button
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
import {
    queryNftByUnionId,
    deleteNftByUnionId,
    modifyStateAgency,
} from "@/api/nft";
import { formatIntDate } from "@/utils/index";

export default {
    data() {
        return {
            total: 0,
            pageSize: 1,
            currentPage: 1,
            input: "",
            loading: false,
            trendsView: false,
            trendsViewFile: "",
            trendsViewFileType: 0,
            agencyNftList: [],
            modifyStateVisible: false,
            stateOptions: [
                {
                    value: 0,
                    label: "下架",
                },
                {
                    value: 1,
                    label: "挂售中",
                },
                {
                    value: 4,
                    label: "仅展示",
                },
            ],
            tempInfo: {
                nftStatus: "",
                nftRecording: "",
            },
            defaultState: "",
        };
    },
    created() {
        this.getAgencyNft();
    },
    methods: {
        showModifyView(state, nftRecording) {
            this.defaultState = state;
            this.tempInfo.nftStatus = state;
            this.tempInfo.nftRecording = nftRecording;
            this.modifyStateVisible = true;
        },
        formatIntDate,
        //获取用户机构NFT信息
        getAgencyNft() {
            this.loading = true;
            queryNftByUnionId({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.total = res.data.total;
                    this.agencyNftList = res.data.list;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        //删除动态
        deleteTrends(nftRecording) {
            console.log("删除动态id", nftRecording);
            deleteNftByUnionId({ nftRecording }).then((res) => {
                this.getAgencyNft();
                this.$message({
                    message: "删除成功",
                    type: "success",
                });
            });
        },
        //查看动态文件
        lookTrends(file) {
            this.trendsViewFile = file.nftFilePath;
            this.trendsViewFileType = 0;
            this.trendsView = true;
        },
        handleChange(current) {
            console.log(current);
            this.currentPage = current;
            this.getAgencyNft();
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
                case 4:
                    return "仅展示";
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
                    data,
                },
            });
        },
        //修改状态
        confirmModifyState() {
            if (this.defaultState === this.tempInfo.nftStatus) {
                this.modifyStateVisible = false;
            }
            modifyStateAgency({
                nftRecording: this.tempInfo.nftRecording,
                nftStatus: this.defaultState,
            }).then(res => {
                this.modifyStateVisible = false;
                this.getAgencyNft();
                this.$message({
                    message: "修改成功",
                    type: "success",
                });
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