<script setup lang="ts">
import type { Node } from "@/utils/types";
import TreeViewNode from "@/components/TreeViewNode.vue";

const props = defineProps<{
  nodes: Node[];
  dense?: boolean;
  activatable?: boolean;
}>();
</script>

<template>
  <ul class="tree-container">
    <li v-for="node in nodes">
      <TreeViewNode
        :node="node"
        :dense="props.dense"
        :activatable="props.activatable"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tree-container {
  width: 100%;
  height: 100%;

  padding: 1rem;

  list-style-type: none;
}
</style>
