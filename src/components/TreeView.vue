<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { Node } from "@/utils/tree-types";
import TreeViewNode from "@/components/TreeViewNode.vue";
import { treeKeysFill } from "@/utils/tree-utils";

const props = defineProps<{
  nodes: Node[];
  dense?: boolean;
  activatable?: boolean;
}>();

const fullNodes: Ref<Node>[] = treeKeysFill(props.nodes).map((node) =>
  ref(node)
);
</script>

<template>
  <ul class="tree-container">
    <li v-for="node in fullNodes">
      <TreeViewNode
        v-model:node="node.value"
        :dense="props.dense"
        :activatable="props.activatable"
        :nested="0"
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
