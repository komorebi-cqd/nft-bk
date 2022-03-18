<template>
    <div class="site-pay">
      <div class="top">
            <el-button @click="goAddPay" type="primary" plain>添加</el-button>
        </div>
        <el-table
            :data="paySite"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="id" label="ID" width="80">
            </el-table-column>
            <el-table-column property="payMethods" label="支付方式" width="120">
              <template slot-scope="scope">
                {{formatPay(scope.row.payMethods)}}
              </template>
            </el-table-column>
            <el-table-column property="paramsOne" label="参数一"> </el-table-column>
            <el-table-column property="paramsTwo" label="参数二">
            </el-table-column>
            <el-table-column property="describe" label="说明">
            </el-table-column>
            <el-table-column property="reviseDate" label="创建时间" width="180">
            </el-table-column>

            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="goEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-popconfirm
                        confirm-button-text="删除"
                        cancel-button-text="点错了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除这个动态吗？"
                        @confirm="deletePay(scope.row.id)"
                    >
                        <el-button size="mini" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paySite: [
                {
                    id: 222,
                    payMethods: 0,
                    paramsOne: "323123",
                    paramsTwo: "222",
                    describe: "这里是说明",
                    reviseDate: "2022-02-03 11:52:02",
                },
                {
                    id: 222,
                    payMethods: 1,
                    paramsOne: "112311",
                    paramsTwo: "222",
                    describe: "这里是说明2",
                    reviseDate: "2022-02-03 11:52:02",
                },
            ],
        };
    },
    methods: {
        formatPay(pay) {
            switch (pay) {
                case 0:
                    return "微信支付";
                case 1:
                    return "支付宝支付";
                default:
                    return "其他";
            }
        },
        goAddPay(){
          console.log('添加支付');
        },
        goEdit(){
          console.log('去编辑页面');
        },
        deletePay(id){
          console.log('删除了这个ID',id);
        }
    },
};
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
</style>