<template>
    <div class="agency-detail">
        <ul class="detail-list">
            <li>
                <div class="left-title">NFT ID</div>
                <div class="right-content">{{ nftDetail.NftId }}</div>
            </li>
            <li>
                <div class="left-title">机构名称</div>
                <div class="right-content">{{ nftDetail.agencyName }}</div>
            </li>
            <li>
                <div class="left-title">价格</div>
                <div class="right-content">{{ nftDetail.price }}</div>
            </li>

            <li>
                <div class="left-title">NFT类型</div>
                <div class="right-content">
                    {{ nftDetail.trendsType === 0 ? "图片" : "视频" }}
                </div>
            </li>
            <li>
                <div class="left-title">媒体文件</div>
                <div class="right-content">{{ nftDetail.trendsFile }}</div>
            </li>

            <li>
                <div class="left-title">描述</div>
                <div class="right-content">{{ nftDetail.describe }}</div>
            </li>
            <li>
                <div class="left-title">发售数量</div>
                <div class="right-content">{{ nftDetail.saleAmount }}</div>
            </li>
            <li>
                <div class="left-title">已售次数</div>
                <div class="right-content">{{ nftDetail.soldAmount }}</div>
            </li>
            <li>
                <div class="left-title">状态</div>
                <div class="right-content">
                    {{ formatState(nftDetail.state) }}
                </div>
            </li>
            <li>
                <div class="left-title">点赞次数</div>
                <div class="right-content">{{ nftDetail.thumbsUp }}</div>
            </li>
            <li>
                <div class="left-title">评论次数</div>
                <div class="right-content">{{ nftDetail.comment }}</div>
            </li>
            <li>
                <div class="left-title">是否允许评论</div>
                <div class="right-content">否</div>
            </li>
            <li>
                <div class="left-title">浏览次数</div>
                <div class="right-content">{{ nftDetail.browseNums }}</div>
            </li>
            <li>
                <div class="left-title">发布时间</div>
                <div class="right-content">{{ nftDetail.releaseDate }}</div>
            </li>
            <li>
                <div class="left-title">发售时间</div>
                <div class="right-content">{{ nftDetail.saleDate }}</div>
            </li>
        </ul>
        <el-button type="primary" @click="goBack">返回</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nftDetail: {},
        };
    },
    created() {
        this.nftDetail = this.$route.params.data;
    },
    methods: {
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
        goBack() {
            this.$router.push({ name: "Nft-Personal" });
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-detail {
    text-align: center;
}
.detail-list {
    list-style: none;
    padding: 0;
    li {
        display: flex;
        border: 1px solid #ebeef5;
        font-size: 14px;
        text-align: left;
        .left-title {
            flex: 0 0 200px;
            background: #fafafa;
            padding: 10px 12px;
            border-right: 1px solid #ebeef5;
            color: #909399;
        }
        .right-content {
            flex: 0 1 auto;
            padding: 10px 12px;
            font-weight: 400;
            color: #606266;
        }
    }
}
</style>