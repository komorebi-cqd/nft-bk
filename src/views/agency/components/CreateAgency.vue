<template>
    <div class="add-agency-container">
        <el-form
            label-position="right"
            label-width="120px"
            :model="formAddAgency"
            ref="formAddAgency"
            :rules="rules"
        >
            <el-form-item label="机构名称" prop="institutionName">
                <el-input v-model="formAddAgency.institutionName"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="loginId">
                <el-input
                    v-model="formAddAgency.loginId"
                    :disabled="isEdit"
                ></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input
                    v-model="formAddAgency.password"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item label="重复登录密码" prop="repeatPassword">
                <el-input
                    v-model="formAddAgency.repeatPassword"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item label="运营者姓名" prop="operatorName">
                <el-input v-model="formAddAgency.operatorName"></el-input>
            </el-form-item>
            <el-form-item label="运营者手机号" prop="operatorIphone">
                <el-input v-model="formAddAgency.operatorIphone"></el-input>
            </el-form-item>

            <el-form-item label="定时发售" prop="isTimeSale">
                <el-checkbox v-model="formAddAgency.isTimeSale"
                    >支持</el-checkbox
                >
            </el-form-item>
            <el-form-item label="提前购买" prop="isForwardBuying">
                <el-checkbox v-model="formAddAgency.isForwardBuying"
                    >支持</el-checkbox
                >
            </el-form-item>
            <el-form-item label="支持转赠" prop="isDonation">
                <div class="all-item">
                    <el-checkbox v-model="formAddAgency.isDonation"
                        >支持</el-checkbox
                    >
                    <el-input
                        type="text"
                        placeholder="请输入天数"
                        v-model="donationTime"
                        maxlength="3"
                        show-word-limit
                        class="enter-time"
                        :disabled="isDonationDis"
                    >
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="支持转卖" prop="isResell">
                <div class="all-item">
                    <el-checkbox v-model="formAddAgency.isResell"
                        >支持</el-checkbox
                    >
                    <el-input
                        type="text"
                        placeholder="请输入天数"
                        v-model="resellTime"
                        maxlength="3"
                        show-word-limit
                        class="enter-time"
                        :disabled="isResellDis"
                    >
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="评论" prop="isComment">
                <el-checkbox v-model="formAddAgency.isComment"
                    >支持</el-checkbox
                >
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel('formAddAgency')">取消</el-button>
                <el-button type="primary" @click="onSubmit('formAddAgency')">{{
                    isEdit ? "修改" : "添加"
                }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addAgency, reviseAgency } from "../../../api/user";
import {
    validAgencyAccount,
    validAgencyPwd,
    validAgencyPhone,
} from "@/utils/validate";

const defaultForm = {
    institutionName: "", //机构名称
    loginId: "", //登录账号
    password: "", //登录密码
    repeatPassword: "", //重复登录密码
    operatorName: "", //运营者姓名
    operatorIphone: "", //运营者电话
    isTimeSale: false, //是否允许定时发售
    isForwardBuying: false, //是否允许提前购买
    isDonation: false, //是否允许转赠
    isResell: false, //是否允许转卖
    isComment: false, //是否支持评论
};

export default {
    name: "CreateAgency",
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
        const validDonation = (rule, value, callback) => {
            if (value) {
                if (this.donationTime <= 0 || this.donationTime > 365) {
                    callback(
                        new Error("当你支持转赠时,天数是必填项且大于0小于365")
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const validResell = (rule, value, callback) => {
            if (value) {
                if (this.resellTime <= 0 || this.resellTime > 365) {
                    callback(
                        new Error("当你支持转卖时,天数是必填项且大于0小于365")
                    );
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const validAgencyPwd = (rule, value, callback) => {
            const reg = /^[A-Za-z0-9]{6,12}$/g;
            if (this.isEdit) {
                let isAsterisk = new Set(value).has("*");
                console.log(isAsterisk,'isAsterisk');
                if (isAsterisk) {
                    callback();
                } else {
                    if (!reg.test(value.trim())) {
                        callback(new Error("请输入6-12位的密码"));
                    } else {
                        callback();
                    }
                }
            } else {
                if (!reg.test(value.trim())) {
                    callback(new Error("请输入6-12位的密码"));
                } else {
                    callback();
                }
            }
        };
        const validRepeatPassword = (rule, value, callback) => {
            if (value !== this.formAddAgency.password) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };
        return {
            formAddAgency: Object.assign({}, defaultForm),
            donationTime: "", //转赠天数
            resellTime: "", //转卖天数
            rules: {
                institutionName: [
                    {
                        required: true,
                        message: "请输入机构名称",
                        trigger: "blur",
                    },
                ],
                loginId: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validAgencyAccount,
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validAgencyPwd,
                    },
                ],
                repeatPassword: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validRepeatPassword,
                    },
                ],
                operatorName: [
                    {
                        required: true,
                        message: "请输运营者姓名",
                        trigger: "blur",
                    },
                ],
                operatorIphone: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validAgencyPhone,
                    },
                ],
                isTimeSale: [
                    {
                        required: false,
                        trigger: "blur",
                    },
                ],
                isForwardBuying: [
                    {
                        required: false,
                        trigger: "blur",
                    },
                ],
                isComment: [
                    {
                        required: false,
                    },
                ],
                isDonation: [
                    {
                        required: true,
                        trigger: "change",
                        validator: validDonation,
                    },
                ],
                isResell: [
                    {
                        required: true,
                        trigger: "change",
                        validator: validResell,
                    },
                ],
            },
        };
    },
    created() {
        if (this.isEdit) {
            this.formAddAgency = Object.assign({}, this.form);
            this.formAddAgency.isTimeSale = Boolean(
                parseInt(this.form.isTimeSale)
            );
            this.formAddAgency.isForwardBuying = Boolean(
                parseInt(this.form.isForwardBuying)
            );
            this.formAddAgency.isComment = Boolean(
                parseInt(this.form.isComment)
            );
            if (parseInt(this.form.isDonation) !== -1) {
                this.donationTime = this.form.isDonation;
                this.formAddAgency.isDonation = true;
            } else {
                this.formAddAgency.isDonation = false;
            }
            if (parseInt(this.form.isResell) !== -1) {
                this.resellTime = this.form.isResell;
                this.formAddAgency.isResell = true;
            } else {
                this.formAddAgency.isResell = false;
            }
            console.log();
        }
    },
    computed: {
        isDonationDis() {
            return !this.formAddAgency.isDonation;
        },
        isResellDis() {
            return !this.formAddAgency.isResell;
        },
    },
    methods: {
        cancel(formName) {
            this.$router.push({
                name: "Agency",
            });
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) {
            this.$refs["formAddAgency"].validate((valid) => {
                if (valid) {
                    let methods = this.isEdit ? reviseAgency : addAgency;
                    let isAsterisk = new Set(this.formAddAgency.password).has("*");
                    let password = isAsterisk? '' : this.formAddAgency.password;
                    let currentForm = {
                        institutionName: this.formAddAgency.institutionName,
                        loginId: this.formAddAgency.loginId,
                        password,
                        operatorName: this.formAddAgency.operatorName,
                        operatorIphone: this.formAddAgency.operatorIphone,
                        isTimeSale: +this.formAddAgency.isTimeSale,
                        isForwardBuying: +this.formAddAgency.isForwardBuying,
                        isDonation: this.formAddAgency.isDonation,
                        isResell: this.formAddAgency.isResell,
                        isComment: +this.formAddAgency.isForwardBuying,
                    };
                    if (this.formAddAgency.isDonation) {
                        currentForm.isDonation = this.donationTime;
                    } else {
                        currentForm.isDonation = -1;
                    }
                    if (this.formAddAgency.isResell) {
                        currentForm.isResell = this.resellTime;
                    } else {
                        currentForm.isResell = -1;
                    }
                    console.log(currentForm);
                    methods(currentForm).then((res) => {
                        console.log(res);
                        //重置表单
                        this.$refs[formName].resetFields();
                        this.$router.push({
                            name: "Agency",
                        });
                    });
                } else {
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.add-agency-container {
    width: 90%;
    margin: 0 auto;
    padding-top: 60px;
}
.all-item {
    display: flex;
    .enter-time {
        width: 200px;
        margin-left: 20px;
    }
}
</style>>
