<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="val">
          <el-button type="primary" @click="innerDialog">选择类目</el-button>
          <span>{{ ruleForm.val }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="sellPoint">
          <el-button type="primary" @click="innerVisibleImage = true"
            >上传图片</el-button
          >
          <img :src="ruleForm.imgUrl" class="imgUrl" alt="" />
        </el-form-item>
        <el-form-item label="商品描述" prop="sellPoint">
          <Wangeditor ref='Wangeditor' @wangeditorData="wangeditorData" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- 第一种方法  props  传值 -->
        <!-- <el-button @click="changeDialog">取 消</el-button>
        <el-button type="primary" @click="changeDialog">确 定</el-button> -->

        <!-- 第二种方法  ref  传值 -->
        <el-button @click="clearFrom">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>

      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <ProductTree @nodeClick="nodeClick" />
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="(innerVisible = false), nodeClick"
          >确 定</el-button
        >
      </el-dialog>
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImage"
        append-to-body
      >
        <ProductUpLoad @uploadImage="uploadImage" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImage = false">取 消</el-button>
          <el-button type="primary" @click="innerVisibleImage = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import ProductTree from "./productTree";
import ProductUpLoad from "./productUpLoad";
import Wangeditor from "./wangeditor";
export default {
  components: {
    ProductTree,
    ProductUpLoad,
    Wangeditor,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      innerVisibleImage: false,
      ruleForm: {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        imgUrl: "",
        desc: "", //编译信息存储
        val: "",
        cid: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
    };
  },

  // props传值
  // props: {
  //   dialogVisible: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.clearFrom()
        })
        .catch((_) => {});
    },
    nodeClick(val) {
      // console.log(val);
      this.ruleForm.val = val.name;
      this.ruleForm.cid = val.cid;
      // console.log(val.cid);
    },
    // 显示隐藏外部弹框第一种方法 props传值
    // changeDialog() {
    //   this.$emit("change");
    // },
    innerDialog() {
      this.innerVisible = true;
    },
    uploadImage(url) {
      // console.log(url);
      this.ruleForm.imgUrl = url;
    },
    wangeditorData(val) {
      // console.log('1111'+val);
      this.ruleForm.desc = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {
            title,
            price,
            num,
            sellPoint,
            imgUrl,
            desc,
            val,
            cid,
          } = this.ruleForm;
          this.$api
            .insertTbItem({
              title,
              price,
              num,
              sellPoint,
              imgUrl,
              desc,
              val,
              cid,
            })
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                this.$message({
                  message: "恭喜你，这是一条成功消息",
                  type: "success",
                });
                this.$parent.http(1);
                this.clearFrom(formName);
                // this.$refs[formName].resetFields();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearFrom() {
      this.ruleForm = {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        imgUrl: "",
        desc: "", //编译信息存储
        val: "",
        cid: "",
      };
      this.dialogVisible = false;
      this.$refs.Wangeditor.editor.txt.clear()
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  .imgUrl {
    width: 150px;
    vertical-align: top;
    margin: 0 20px;
  }
}
</style>