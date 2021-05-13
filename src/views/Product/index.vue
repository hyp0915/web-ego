<template>
  <div class="product">
    <div class="input">
      <el-input placeholder="请输入内容" v-model="input" @change="changeInput">
      </el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="addProduct">添加</el-button>
    </div>

    <!-- 弹框 -->
    <!-- 第一种方法  props  传值 -->
    <!-- <Dialog :dialogVisible='dialogVisible' @change='change' /> -->
    <!-- 第二种方法  ref  传值 -->
    <Dialog ref="changeDialog" />

    <!-- 表格数据列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="120">
      </el-table-column>
      <el-table-column prop="category" label="规格类目"> </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      :pageSize="pageSize"
      @currentPage="currentPage"
    />
  </div>
</template>

<script>
import Pagination from "../../components/pagination";
import Dialog from './dialog'
export default {
  data() {
    return {
      tableData: [],
      total: 10,
      pageSize: 1,
      input: "",
      // dialogVisible:false
    };
  },
  components: {
    Pagination,
    Dialog
  },
  methods: {
    handleEdit() {},
    handleDelete(index,rowData) {
      console.log(index,rowData);
      this.$api.deleteItemById({
        id:rowData.id
      }).then(res=>{
        // console.log(res);
         this.$message({
          message: res.msg,
          type: 'success'
        });
        this.http(1)
      })
    },
    currentPage(val) {
      // console.log(val);
      this.http(val);
    },
    //搜索功能
    changeInput(search) {
      // console.log(val);
      if (search) {
        this.$api.search({ search }).then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.tableData = res.result;
            this.pageSize = 8;
            this.total = res.result.length;
          } else {
            this.tableData = [];
            this.total = 1;
          }
        });
      } else {
        this.http(1);
      }
    },
    //添加商品功能
    // <!-- 第一种方法  props  传值 -->
    // addProduct(){
    //   this.dialogVisible=true
    // console.log(this.dialogVisible);
    // },
    // change(){
    //   this.dialogVisible=false
    // },
    addProduct(){
      this.$refs.changeDialog.dialogVisible=true
    },
    

    http(page) {
      this.$api.productList({ page }).then((res) => {
        // console.log("----", res);
        if (res.status === 200) {
          console.log(res.data);
          this.tableData = res.data;
          this.total = res.total;
          this.pageSize = res.pageSize;
        }
      });
    },
  },
  mounted() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.input {
  display: flex;
  margin: 10px 20px;
  .el-button {
    margin-left: 10px;
  }
}
</style>