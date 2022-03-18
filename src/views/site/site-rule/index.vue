<template>
    <div class="site-rule" style="padding: 20px">
      <div class="top">
            <el-button @click="goAddRule" type="primary" plain
                >添加协议</el-button
            >
        </div>
        <el-table
            :data="rules"
            highlight-current-row
            border
            style="width: 100%"
        >
            <el-table-column property="rulesId" label="ID" width="80">
            </el-table-column>
            <el-table-column property="title" label="标题" width="120">
            </el-table-column>
            <el-table-column property="content" label="内容"> </el-table-column>
            <el-table-column property="createDate" label="创建时间" width="180">
            </el-table-column>

            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="goEdit(scope.row)">编辑</el-button>
                    <el-popconfirm
                        confirm-button-text="删除"
                        cancel-button-text="点错了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除这个动态吗？"
                        @confirm="deleteRule(scope.row.rulesId)"
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
            rules: [
                {
                    rulesId: 666,
                    title: "政策",
                    content: "巴拉巴拉",
                    createDate: "2022-02-03 11:52:02",
                },
                {
                    rulesId: 699966,
                    title: "隐私",
                    content: "巴拉巴拉",
                    createDate: "2022-02-03 11:52:02",
                },
            ],
        };
    },
    methods:{
      deleteRule(id){
        console.log('删除了规则',id);
      },
      goAddRule(){
          this.$router.push({name: 'Add-Site-Rule'});
      },
      goEdit(data){
        this.$router.push({
          name: 'Edit-Site-Rule',
          params: {
            data
          }
        })
      }
    }
    
};
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
</style>