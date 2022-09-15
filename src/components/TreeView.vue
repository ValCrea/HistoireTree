<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import type { Tree } from "@/utils/tree-types";
import TreeItem from "@/components/TreeItem.vue";
import { treesUnselect, treesDefine, treeFind } from "@/utils/tree-utils";
import { stringToColor } from "@/utils/color-utils";

const props = defineProps<{
  items: Tree[];
  color?: string;
  activatable?: boolean;
  hoverable?: boolean;
  dense?: boolean;
}>();

const items = treesDefine(props.items).map((tree) => ref(tree));
const color = computed(() => stringToColor(props.color));

function clearSelected() {
  console.log("HERE");
  treesUnselect(items);
}

let dropedOn = 0;
let dropedFrom = 0;
const removeTree = ref(0);
const addTree: Ref<{ tree: Tree | null; to: number }> = ref({
  tree: null,
  to: 0,
});
function reciveDropedOn(id: number) {
  dropedOn = id;
}
function reciveDropedFrom(id: number) {
  dropedFrom = id;

  if (dropedFrom == dropedOn) {
    dropedOn = 0;
    dropedFrom = 0;
    return;
  }

  if (dropedFrom == 0) {
    dropedOn = 0;
    return;
  }

  if (dropedOn == 0) {
    const tree = treeFind(items, dropedFrom);
    if (!tree) {
      dropedFrom = 0;
      return;
    }

    if (items.filter((item) => item.value.id == dropedFrom).length > 0) {
      dropedFrom = 0;
      return;
    }

    removeTree.value = dropedFrom;
    items.push(ref({ ...tree }));
    dropedFrom = 0;
    return;
  }

  const tree = treeFind(items, dropedFrom);
  if (!tree) {
    dropedOn = 0;
    dropedFrom = 0;
    return;
  }

  const isNested = treeFind(tree.items, dropedOn);
  if (isNested) {
    dropedOn = 0;
    dropedFrom = 0;
    return;
  }

  removeTree.value = dropedFrom;
  addTree.value = { tree: tree, to: dropedOn };
  console.log("ADD TREE");
}
</script>

<template>
  <ul class="tree-container">
    <li v-for="item in items" :key="item.value.label">
      <TreeItem
        v-model:tree="item.value"
        :color="color"
        :activatable="props.activatable ? true : false"
        :hoverable="props.hoverable ? true : false"
        :dense="props.dense ? true : false"
        :nested="0"
        :removeTree="removeTree"
        :addTree="addTree"
        @clear-select="clearSelected"
        @droped-on="reciveDropedOn"
        @droped-from="reciveDropedFrom"
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
