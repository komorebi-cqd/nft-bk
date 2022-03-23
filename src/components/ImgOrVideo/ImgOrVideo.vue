<template>
    <div class="img-or-video">
        <div class="file-wrap" v-if="isImg">
            <img class="preview-img" :src="fileLink" alt="" />
        </div>
        <div class="file-wrap" v-else>
            <video :src="fileLink" class="video" controls="controls">
                您的浏览器不支持视频播放
            </video>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImgOrVideo",
    props: {
        fileLink: String,
    },
    computed: {
        isImg() {
            let imgList = ["jpeg", "jpg", "png"];
            const imgs = imgList.filter((item) => this.fileLink.endsWith(item));
            return imgs.length > 0;
        },
    },
};
</script>

<style scoped>
.file-wrap {
    width: 530px;
    max-height: 300px;
}
.preview-img,.video {
    width: 100%;
    max-height: 300px;
}
</style>