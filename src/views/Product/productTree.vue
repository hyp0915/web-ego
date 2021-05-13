<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click='nodeClick' > </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },

  methods: {
    loadNode(node, resolve) {
    //   console.log(node.level, node);
      if (node.level === 0) {
        this.$api.selectItemCategory({}).then((res) => {
          if (res.status == 200) {
            // console.log(res);
            return resolve(res.result);
          } else {
            console.log("shibai");
          }
        });
      }
      if (node.level >= 1) {
        
        this.$api
          .selectItemCategory({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
    nodeClick(data){
        // console.log(data.name);
        this.$emit('nodeClick',data)
    }
  },
};
</script>

<style>
</style>