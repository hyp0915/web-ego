<template>
  <div class="pagination">
    <el-pagination
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
      pageSize:{
          type:Number,
          default:1
      },
      total:{
          type:Number,
          default:10
      }
  },
  methods:{
      handleCurrentChange(val){
          this.$emit('currentPage',val)
      }
  }
  
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin: 20px 0;
  .el-pagination {
    padding: 0;
  }
}
</style>