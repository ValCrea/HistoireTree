import type { Node } from "@/utils/tree-types";

export const treeKeysFill = (tree: Node[]): Node[] => {
  const newTree = [];

  for (let n = 0; n < tree.length; n++) newTree.push(nodeKeysFill(tree[n]));

  return newTree;
};

export const nodeKeysFill = (node: Node): Node => {
  const newNode = { ...node };

  if (!newNode.expand) newNode.expand = false;
  if (!newNode.selected) newNode.selected = false;

  newNode.nodes = treeKeysFill(newNode.nodes);

  return newNode;
};
