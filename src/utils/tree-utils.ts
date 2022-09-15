import type { Tree } from "@/utils/tree-types";

export const treesDefine = (
  trees: Tree[],
  expandDefault: boolean,
  data?: { id: number }
): Tree[] => {
  if (!data) data = { id: 1 };

  for (const tree of trees) {
    if (tree.id === undefined) {
      tree.id = data.id;
      data.id++;
    }

    if (!tree.expanded) tree.expanded = expandDefault;
    if (!tree.selected) tree.selected = false;

    tree.items = treesDefine(tree.items, expandDefault, data);
  }

  return trees;
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
