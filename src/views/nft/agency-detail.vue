<template>
    <div class="agency-detail">
        <ul class="detail-list">
            <li>
                <div class="left-title">NFT ID</div>
                <div class="right-content">{{ nftDetail.nftRecording }}</div>
            </li>
            <li>
                <div class="left-title">机构名称</div>
                <div class="right-content">{{ nftDetail.institutionName }}</div>
            </li>
            <li>
                <div class="left-title">价格</div>
                <div class="right-content">{{ nftDetail.nftPrice }}</div>
            </li>

            <li>
                <div class="left-title">NFT类型</div>
                <div class="right-content">
                    {{ nftDetail.trendsType === 0 ? "图片" : "视频" }}
                </div>
            </li>
            <li>
                <div class="left-title">媒体文件</div>
                <div class="right-content">
                    <img class="main-img" :src="nftDetail.nftFilePath" alt="">
                </div>
            </li>

            <li>
                <div class="left-title">描述</div>
                <div class="right-content">{{ nftDetail.nftDetails }}</div>
            </li>
            <li>
                <div class="left-title">发售数量</div>
                <div class="right-content">{{ nftDetail.nftQuantity }}</div>
            </li>
            <li>
                <div class="left-title">已售次数</div>
                <div class="right-content">{{ nftDetail.nftQuantity - nftDetail.nftSurplusQuantity }}</div>
            </li>
            <li>
                <div class="left-title">状态</div>
                <div class="right-content">
                    {{ formatState(parseInt(nftDetail.nftStatus)) }}
                </div>
            </li>
            <li>
                <div class="left-title">点赞次数</div>
                <div class="right-content">{{ nftDetail.likeAmount }}</div>
            </li>
            <li>
                <div class="left-title">评论次数</div>
                <div class="right-content">{{ nftDetail.browseAmount }}</div>
            </li>
            <li>
                <div class="left-title">是否允许评论</div>
                <div class="right-content">{{parseInt(nftDetail.isComment) ? '支持': '不支持'}}</div>
            </li>
            <li>
                <div class="left-title">浏览次数</div>
                <div class="right-content">{{ nftDetail.browseAmount }}</div>
            </li>
            <li>
                <div class="left-title">发布时间</div>
                <div class="right-content">{{ formatIntDate(nftDetail.registerDate) }}</div>
            </li>
            <li>
                <div class="left-title">发售时间</div>
                <div class="right-content">{{ formatIntDate(nftDetail.nftReleaseTime) }}</div>
            </li>
        </ul>
        <el-button type="primary" @click="goBack">返回</el-button>
    </div>
</template>

<script>
import { formatIntDate } from "@/utils/index";
export default {
    data() {
        return {
            nftDetail: {},
        };
    },
    created() {
        this.nftDetail =this.$route.params&& this.$route.params.data;
    },
    methods: {
        formatIntDate,
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
        goBack() {
            this.$router.go(-1);
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
            .main-img{
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>