import { type Ref, isRef } from "vue";
import type { Tree } from "@/utils/tree-types";

export const treesUnselect = (trees: Tree[] | Ref<Tree>[]) => {
  for (const tree of trees) {
    if (isRef(tree)) {
      tree.value.selected = false;
      treesUnselect(tree.value.items);
    } else {
      tree.selected = false;
      treesUnselect(tree.items);
    }
  }
};

export const treesDefine = (
  trees: readonly Tree[],
  data?: { id: number }
): Tree[] => {
  const treesDef = [...trees];
  if (!data) data = { id: 1 };

  for (let t = 0; t < trees.length; t++) {
    treesDef[t].id = data.id;
    data.id++;

    if (!treesDef[t].expanded) treesDef[t].expanded = false;
    if (!treesDef[t].selected) treesDef[t].selected = false;

    treesDef[t].items = treesDefine(treesDef[t].items, data);
  }
  return treesDef;
};

export const treeFind = (
  trees: Tree[] | Ref<Tree>[],
  id: number
): Tree | null => {
  for (const tree of trees) {
    if (isRef(tree)) {
      if (tree.value.id && tree.value.id == id) return tree.value;
      const subtree = treeFind(tree.value.items, id);
      if (subtree) return subtree;
    } else {
      if (tree.id && tree.id == id) return tree;
      const subtree = treeFind(tree.items, id);
      if (subtree) return subtree;
    }
  }
  return null;
};
