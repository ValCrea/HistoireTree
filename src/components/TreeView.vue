<script setup lang="ts">
import { ref, computed, isRef, type Ref } from "vue";
import type { Node } from "@/utils/tree-types";
import TreeViewNode from "@/components/TreeViewNode.vue";
import { treeKeysFill } from "@/utils/tree-utils";
import { isHex, isColor, stingToHex } from "@/utils/color-utils";

const props = defineProps<{
  items: Node[];
  dense?: boolean;
  activatable?: boolean;
  color?: string;
}>();

const fullNodes: Ref<Node>[] = treeKeysFill(props.items).map((node) =>
  ref(node)
);

const trueColor = computed(() => {
  if (!props?.color) return stingToHex("primary");

  if (isColor(props.color)) return stingToHex(props.color);

  if (isHex(props.color)) return props.color;

  return stingToHex("primary");
});

console.log(trueColor.value);

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
        :dense="props.dense ? true : false"
        :activatable="props.activatable ? true : false"
        :nested="0"
        :color="trueColor"
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
