
<template>
    <div class="detail-agency-nft">
        <ul class="detail-list">
            <li>
                <div class="left-title">NFT ID</div>
                <div class="right-content">{{ nftDetail.nftId }}</div>
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
                <div class="left-title">媒体文件</div>
                <div class="right-content">{{ nftDetail.file }}</div>
            </li>
              <li>
                <div class="left-title">描述</div>
                <div class="right-content">{{ nftDetail.describe }}</div>
            </li>
            <li>
                <div class="left-title">内容描述图</div>
                <div class="right-content">{{ nftDetail.contentFile }}</div>
            </li>


            <li>
                <div class="left-title">发售数量</div>
                <div class="right-content">{{ nftDetail.saleNums }}</div>
            </li>
            <li>
                <div class="left-title">已售数量</div>
                <div class="right-content">{{ nftDetail.soldNums }}</div>
            </li>
          
            <li>
                <div class="left-title">状态</div>
                <div class="right-content">
                    {{ formatState(nftDetail.state) }}
                </div>
            </li>

            <li>
                <div class="left-title">转赠</div>
                <div class="right-content">支持</div>
            </li>
            <li>
                <div class="left-title">转赠等待</div>
                <div class="right-content">{{ nftDetail.transferWaiting }}</div>
            </li>
            <li>
                <div class="left-title">转卖</div>
                <div class="right-content">支持</div>
            </li>
            <li>
                <div class="left-title">专卖店等待</div>
                <div class="right-content">{{ nftDetail.resellWaiting }}</div>
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
                <div class="left-title">浏览次数</div>
                <div class="right-content">{{ nftDetail.browseNums }}</div>
            </li>
             <li>
                <div class="left-title">发售时间</div>
                <div class="right-content">{{ nftDetail.saleDate }}</div>
            </li>
            <li>
                <div class="left-title">发布时间</div>
                <div class="right-content">{{ nftDetail.releaseDate }}</div>
            </li>
        </ul>
        <el-button type="primary" @click="goBack">返回</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nftDetail: {
                nftId: 1,
                agencyName: "北京博物馆",
                price: 666,
                type: 0, //0图片 1视频
                file: "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
                describe: "人间清醒",
                contentFile: "https://img1.baidu.com/it/u=3944616627,2787035505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=521",
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
        };
    },
    created() {
        // this.nftDetail = this.$route.params.data;
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
            this.$router.push({ name: "Release-Agency-Nft" });
        },
    },
};
</script>

<style lang="scss" scoped>
.detail-agency-nft {
    text-align: center;
    width: 80%;
    margin: 0 auto;
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