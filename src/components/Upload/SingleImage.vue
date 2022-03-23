<template>
    <div class="upload-container">
        <el-upload
            :multiple="false"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :http-request="uploadImage"
            :before-upload="beforeAvatarUpload"
            class="image-uploader"
            drag
            action="string"
        >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
            </div>
        </el-upload>
        <div class="image-preview" v-if="!currentFileType">
            <div v-show="prImg" class="image-preview-wrapper">
                <img :src="prImg" />
                <div class="image-preview-action">
                    <i class="el-icon-delete" @click="rmImage" />
                </div>
            </div>
        </div>

        <div class="image-preview" v-else>
            <div v-show="prVideo" class="image-preview-wrapper">
                <video
                    v-if="prVideo"
                    :src="prVideo"
                    class="avatar video-avatar"
                    controls="controls"
                >
                    您的浏览器不支持视频播放
                </video>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SingleImageUpload",
    props: {
        value: {
            type: String | Object,
            default: "",
        },
        //是否允许上传视频
        isAllowVideo: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            tempUrl: "",
            dataObj: { token: "", key: "" },
            prImg: "", //预览图片
            prVideo: "", //预览视频
            currentFileType: 0, //0是图片  1是视频
        };
    },
    computed: {
        imageUrl() {
            return this.value;
        },
    },
    methods: {
        rmImage() {
            this.emitInput("");
            this.prImg = "";
        },
        emitInput(val) {
            this.$emit("input", val);
        },
        beforeAvatarUpload(file) {
            let isMeetfile; //是否是可上传的文件类型
            let isMeetSize; //是否是规定大小
            const allowFile = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "video/mp4",
                "video/ogg",
                "video/flv",
                "video/avi",
                "video/wmv",
                "video/rmvb",
                "video/mov",
            ]; //可上传文件类型列表
            const allowVideoFile = [
                "video/mp4",
                "video/ogg",
                "video/flv",
                "video/avi",
                "video/wmv",
                "video/rmvb",
                "video/mov",
            ];
            if (allowFile.indexOf(file.type) === -1) {
                isMeetfile = false;
                this.$message.error("上传的文件格式不对");
            } else {
                if (
                    allowVideoFile.indexOf(file.type) !== -1
                ) {
                    this.currentFileType = 1; //上传的是视频
                } else {
                    this.currentFileType = 0; //上传的是图片
                }
                isMeetfile = true;
            }
            if(!this.isAllowVideo && allowVideoFile.indexOf(file.type) !== -1){
                this.$message.error("描述图不能为视频");
                isMeetfile = false;
            }
            if (file.size / 1024 / 1024 > 50) {
                isMeetSize = false;
                this.$message.error("文件大小不能超过50M");
            } else {
                isMeetSize = true;
            }
            console.log(file, "beforeAvatarUpload");
            return isMeetSize && isMeetfile;
        },
        handleImageSuccess(file) {
            console.log(file);
            this.emitInput(file.files.file);
        },
        uploadImage(param) {
            console.log(param, "param:::");
            //实时预览图片和视频
            let fr = new FileReader();
            fr.onload = () => {
                console.log(this.currentFileType);
                if (this.currentFileType) {
                    this.prVideo = fr.result;
                } else {
                    this.prImg = fr.result;
                }
            };
            fr.readAsDataURL(param.file);
            //生成图片文件
            this.emitInput(param.file);
        },
        beforeUpload() {
            // const _self = this;
            // return new Promise((resolve, reject) => {
            //     getToken()
            //         .then((response) => {
            //             const key = response.data.qiniu_key;
            //             const token = response.data.qiniu_token;
            //             _self._data.dataObj.token = token;
            //             _self._data.dataObj.key = key;
            //             this.tempUrl = response.data.qiniu_url;
            //             resolve(true);
            //         })
            //         .catch((err) => {
            //             console.log(err);
            //             reject(false);
            //         });
            // });
        },
    },
};
</script>

<style lang="scss" scoped>
.upload-container {
    width: 100%;
    position: relative;
    &:after {
        content: "";
        display: table;
        clear: both;
    }
    .image-uploader {
        width: 200px;
        height: 200px;
        float: left;
        padding-bottom: 20px;
    }
    .image-preview {
        width: 200px;
        height: 200px;
        position: relative;
        border: 1px dashed #d9d9d9;
        float: left;
        margin-left: 50px;
        .image-preview-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .image-preview-action {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            transition: opacity 0.3s;
            cursor: pointer;
            text-align: center;
            line-height: 200px;
            .el-icon-delete {
                font-size: 36px;
            }
        }
        &:hover {
            .image-preview-action {
                opacity: 1;
            }
        }
    }
    .image-app-preview {
        width: 320px;
        height: 180px;
        position: relative;
        border: 1px dashed #d9d9d9;
        float: left;
        margin-left: 50px;
        .app-fake-conver {
            height: 44px;
            position: absolute;
            width: 100%; // background: rgba(0, 0, 0, .1);
            text-align: center;
            line-height: 64px;
            color: #fff;
        }
    }
}
.video-avatar {
    width: 198px;
    max-height: 198px;
}
</style>