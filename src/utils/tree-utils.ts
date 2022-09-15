import type { Tree } from "@/utils/tree-types";

/*export const treesUnselect = (trees: Tree[] | Ref<Tree>[]) => {
  for (const tree of trees) {
    if (isRef(tree)) {
      tree.value.selected = false;
      treesUnselect(tree.value.items);
    } else {
      tree.selected = false;
      treesUnselect(tree.items);
    }
  }
};*/

export const treesDefine = (
  trees: readonly Tree[],
  data?: { id: number }
): Tree[] => {
  const treesDef = [...trees];
  if (!data) data = { id: 1 };

  for (let t = 0; t < trees.length; t++) {
    if (treesDef[t].id === undefined) {
      treesDef[t].id = data.id;
      data.id++;
    }

    if (!treesDef[t].expanded) treesDef[t].expanded = false;
    if (!treesDef[t].selected) treesDef[t].selected = false;

    treesDef[t].items = treesDefine(treesDef[t].items, data);
  }
  return treesDef;
};

/*export const treesFill = (
  trees: readonly Tree[] | Ref<Tree[]>
): Ref<Tree[]> => {
  const treesFull: Tree[] = [];

  for (const tree of unref(trees)) {
    const treeFull = { ...tree };
    treeFull.expanded = false;
    treeFull.selected = false;
    tree.items = treesFill(tree.items);
    treesFull.push(treeFull);
  }

  return ref(treesFull);
};*/

export const treeFindParent = (trees: Tree[], id: number): Tree | null => {
  for (const tree of trees) {
    for (const item of tree.items) {
      if (item.id && item.id == id) return tree;
    }
    const subtree = treeFindParent(tree.items, id);
    if (subtree) return subtree;
  }
  return null;
};

export const treeFind = (trees: Tree[], id: number): Tree | null => {
  for (const tree of trees) {
    if (tree.id && tree.id == id) return tree;
    const subtree = treeFind(tree.items, id);
    if (subtree) return subtree;
  }
  return null;
};
