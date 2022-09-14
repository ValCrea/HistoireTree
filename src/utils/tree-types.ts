export type Node = {
  name: String;
  nodes: Node[];

  expand?: boolean;
  selected?: boolean;
};

/*type hex = number | "a" | "b" | "c" | "d" | "e";

export type Color =
  | `#${hex}${hex}${hex}${hex}${hex}${hex}`
  | "primary"
  | "secondary"
  | "sucess"
  | "warning"
  | "danger"
  | "info";

export type isColor<S> = S extends Color ? Color : String;*/
