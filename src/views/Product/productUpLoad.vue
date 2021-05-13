<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="uploadUrl"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    :on-success='uploadSuccess'
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from '../../api/base'
export default {
    data(){
        return{
            fileList:[],
            uploadUrl:base.baseUrl+base.upload
        }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadSuccess(success){
          console.log(success);
          let imgUrl = base.baseUrl+ "/" + success.url.slice(7);
          this.$emit('uploadImage' ,imgUrl)
          this.fileList=[]
      },
      clearImage(){
          this.$emit('clearImage',this.fileList)
      }
    }
};
</script>

<style>
</style>