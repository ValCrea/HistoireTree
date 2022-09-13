<script setup lang="ts">
import { ref, isRef, type Ref } from "vue";
import type { Node } from "@/utils/tree-types";
import TreeViewNode from "@/components/TreeViewNode.vue";
import { treeKeysFill } from "@/utils/tree-utils";

const props = defineProps<{
  items: Node[];
  dense?: boolean;
  activatable?: boolean;
}>();

const fullNodes: Ref<Node>[] = treeKeysFill(props.items).map((node) =>
  ref(node)
);

function unselectNode(node: Ref<Node> | Node) {
  if (isRef(node)) {
    node.value.selected = false;
    for (let n of node.value.nodes) unselectNode(n);
  } else {
    node.selected = false;
    for (let n of node.nodes) unselectNode(n);
  }
}

function clearSelected() {
  for (let n of fullNodes) unselectNode(n);
}
</script>

<template>
  <ul class="tree-container">
    <li v-for="node in fullNodes">
      <TreeViewNode
        v-model:node="node.value"
        :dense="props.dense"
        :activatable="props.activatable"
        :nested="0"
        @clearSelect="clearSelected"
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
