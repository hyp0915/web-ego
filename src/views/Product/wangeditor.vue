<template>
  <div id="main"></div>
</template>

<script>
import wangeditor from "wangeditor";
export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    this.editor = new wangeditor("#main");
    this.editor.config.focus = false;
    //配置回调函数
    this.editor.config.onchange = (newHtml) => {
      //   console.log("change 之后最新的 html", newHtml);
      this.$emit("wangeditorData", newHtml);
    };
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    this.editor.create();
  },
};
</script>

<style>
</style>