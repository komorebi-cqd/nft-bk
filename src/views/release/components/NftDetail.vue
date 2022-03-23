<template>
    <div class="nft-detail">
        <el-form ref="postForm" :model="postForm" class="form-container">
            <el-row>
                <el-col :span="12">
                    <el-form-item
                        prop="nft"
                        label-width="110px"
                        label="主图："
                        style="margin-bottom: 30px"
                    >
                        <Upload v-model="postForm.nft" :isAllowVideo="true"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        prop="describe"
                        label-width="110px"
                        label="内容描述图："
                        style="margin-bottom: 30px"
                    >
                        <Upload v-model="postForm.describe"  />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item
                prop="nftDetails"
                style="margin-bottom: 40px"
                label-width="110px"
                label="描述："
            >
                <el-input
                    v-model="postForm.nftDetails"
                    :rows="1"
                    type="textarea"
                    class="article-textarea"
                    autosize
                    placeholder="这里是描述的话"
                />
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item
                        prop="nftQuantity"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="发售数量："
                    >
                        <el-input
                            v-model="postForm.nftQuantity"
                            type="number"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="nftPrice"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="发售价格："
                    >
                        <el-input
                            v-model="postForm.nftPrice"
                            type="number"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        state="nftStatus"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="状态："
                    >
                        <el-select
                            v-model="postForm.nftStatus"
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
                <el-col :span="8">
                    <el-form-item
                        prop="nftReleaseTime"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="定时发售："
                    >
                        <el-date-picker
                            v-model="postForm.nftReleaseTime"
                            type="datetime"
                            value-format="yyyyMMddHHmmss"
                            placeholder="选择日期时间"
                            v-if="parseInt(user.isForwardBuying) !== 0"
                        >
                        </el-date-picker>
                        <div class="not-support" v-else>不支持操作</div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="isForwardBuying"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="提前购买："
                    >
                        <el-checkbox
                            v-model="postForm.isForwardBuying"
                            v-if="parseInt(user.isForwardBuying) !== 0"
                            >支持</el-checkbox
                        >
                        <div class="not-support" v-else>不支持操作</div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="resellWaiting"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="评论："
                    >
                        <div class="not-support">
                            {{
                                parseInt(user.isComment) !== 0
                                    ? "支持"
                                    : "不支持"
                            }}
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="transferWaiting"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="转赠等待天数："
                    >
                        <div class="not-support">
                            {{
                                parseInt(user.isDonation) !== -1
                                    ? user.isDonation
                                    : "不支持"
                            }}
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="resellWaiting"
                        style="margin-bottom: 40px"
                        label-width="110px"
                        label="转卖等待天数："
                    >
                        <div class="not-support">
                            {{
                                parseInt(user.isResell) !== -1
                                    ? user.isDonation
                                    : "不支持"
                            }}
                        </div>
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
import axios from "axios";
import { mapGetters } from "vuex";
import Upload from "@/components/Upload/SingleImage.vue";
import { releaseNft } from "@/api/nft";
import { formatIntDate } from "@/utils/index";
import qs from "qs";

const defaultForm = {
    nft: "", //主图
    nftQuantity: "", //NFT发售数量
    nftPricey: "", // NFT发售价格
    nftStatus: "", // NFT状态
    nftReleaseTime: "", // NFT发售时间
    nftDetails: "", // nft描述
    describe: "", // 描述图
    fileType: 0, //文件类型 0/图片  1/视频
    nftType: 0,
    isForwardBuying: 0, //是否允许提前购买
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
                    label: "下架",
                },
                {
                    value: 1,
                    label: "挂售中",
                },
                {
                    value: 2,
                    label: "待发售",
                },
                {
                    value: 3,
                    label: "售罄",
                },
            ],
        };
    },
    computed: {
        ...mapGetters(["user"]),
        formatDate() {
            return 1;
        },
    },
    created() {
        if (this.isEdit) {
            console.log(this.form,1111);
            this.postForm = Object.assign({}, this.form);
        }
    },
    methods: {
        postAgencyNft() {
            let methods = releaseNft;
            const formData = new FormData();
            for (const key in this.postForm) {
                formData.append(key, this.postForm[key]);
            }
            methods(formData).then(res => {
                this.$router.push({
                    name: 'Release-Agency-Nft'
                })
            });
        },
        submitForm(formName) {
            this.postAgencyNft();
        },
        cancel() {
            this.$router.push({
                name: "Release-Agency-Nft",
            });
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
.not-support {
    color: #606266;
}
</style>