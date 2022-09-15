import type { Tree } from "@/utils/tree-types";

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
