<template>
    <div class="nft-detail">
        <el-form ref="postForm" :model="postForm" class="form-container">
            <el-row>
                <el-col :span="12">
                    <el-form-item
                        prop="main_img"
                        label-width="60px"
                        label="主图："
                        style="margin-bottom: 30px"
                    >
                        <Upload v-model="postForm.main_img" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        prop="content_img"
                        label-width="100px"
                        label="内容描述图："
                        style="margin-bottom: 30px"
                    >
                        <Upload v-model="postForm.content_img" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item
                prop="describe"
                style="margin-bottom: 40px"
                label-width="70px"
                label="描述："
            >
                <el-input
                    v-model="postForm.describe"
                    :rows="1"
                    type="textarea"
                    class="article-textarea"
                    autosize
                    placeholder="这里是描述的话"
                />
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item
                        prop="saleNums"
                        style="margin-bottom: 40px"
                        label-width="100px"
                        label="发售数量："
                    >
                        <el-input
                            v-model="postForm.saleNums"
                            type="number"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="price"
                        style="margin-bottom: 40px"
                        label-width="100px"
                        label="发售价格："
                    >
                        <el-input
                            v-model="postForm.price"
                            type="number"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        state="state"
                        style="margin-bottom: 40px"
                        label-width="70px"
                        label="状态："
                    >
                        <el-select
                            v-model="postForm.state"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item
                        prop="saleDate"
                        style="margin-bottom: 40px"
                        label-width="100px"
                        label="开售时间："
                    >
                        <el-date-picker
                            v-model="postForm.saleDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            disabled
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="isAdvance"
                        style="margin-bottom: 40px"
                        label-width="100px"
                        label="提前购买："
                    >
                        <el-checkbox v-model="postForm.isAdvance"
                            >支持</el-checkbox
                        >
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="transferWaiting"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="转赠等待天数："
                    >
                        {{ postForm.transferWaiting }}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="resellWaiting"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="转卖等待天数："
                    >
                        {{ postForm.resellWaiting }}
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item class="submit">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submitForm('postForm')"
                    >提交</el-button
                >
                
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Upload from "@/components/Upload/SingleImage.vue";

const defaultForm = {
    nftId: 1,
    agencyName: "", //机构名称
    price: '', //价格
    type: 0, //0图片 1视频
    main_img:"", //主图 可以是视频或图片
    content_img:"", //详情图片 只能是图片
    describe: "", //描述  最多一千个字
    saleNums: "", //发售数量
    transferWaiting: 10, //转赠等待天数
    resellWaiting: 10,  //转卖等待天数
    thumbsUp: '', //点赞数
    comment: '',  //评论数
    browseNums: 5,  //评论数
    isAdvance: false, //是否支持提前购买
    state: 0, // 状态
    saleDate: "",  //售卖时间
    releaseDate: "",  //发布时间
};

export default {
    name: "NftDetail",
    components: {
        Upload,
    },
    props: {
        isEdit: {
            type: Boolean,
            value: false,
        },
        form: {
            type: Object,
            value: defaultForm,
        },
    },
    data() {
        return {
            postForm: Object.assign({}, defaultForm),
            stateOptions: [
                {
                    value: 0,
                    label: "挂售中",
                },
                {
                    value: 1,
                    label: "定时发售",
                },
                {
                    value: 2,
                    label: "只展示",
                },
                {
                    value: 3,
                    label: "下架",
                },
            ],
        };
    },
    created() {
        if (this.isEdit) {
            this.postForm = Object.assign({}, this.form);
        }
    },
    methods: {
        submitForm(formName) {
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert("submit!");
            //     } else {
            //         console.log("error submit!!");
            //         return false;
            //     }
            // });
        },
        cancel() {
            this.$router.push({
                name: 'Release-Agency-Nft'
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.nft-detail {
    padding: 40px 50px 20px 45px;
}
.article-textarea ::v-deep {
    textarea {
        padding-right: 40px;
        padding-top: 0;
        resize: none;
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #bfcbd9;
    }
}
.submit {
    text-align: center;
}
</style>