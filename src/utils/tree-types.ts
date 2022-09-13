export type Node = {
  name: String;
  nodes: Node[];

  expand?: boolean;
  selected?: boolean;
};
