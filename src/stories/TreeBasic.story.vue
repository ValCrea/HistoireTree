<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";
</script>

<template>
  <Story title="Basic tree">
    <TreeView :items="items" />
  </Story>
</template>

<docs lang="md">
# Tree component

As input recives an array of items,
where each item has a **name** and a list of
children items called **nodes**.

### Example:

```
items = [
  {
    name: "Some item name",
    nodes: []
  },
  {
    name: "Another item name",
    nodes: [
      {
        name: "Child item",
        nodes: []
      }
    ]
  }
]
```
</docs>
