export type Tree = {
  label: string;
  items: Tree[];

  id?: number;
  expanded?: boolean;
  selected?: boolean;
};

export type Data = {
  nested: number;
};
