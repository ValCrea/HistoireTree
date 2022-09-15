<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";

const sourceBasic = `
<template>
  <TreeView :items="items" />
</template>
`;

const sourceActivatable = `
<template>
  <TreeView :items="items" activatable />
</template>
`;

const sourceColor = `
<template>
  <TreeView :items="items" activatable color="#aa55cc" />
</template>
`;

const sourceHoverable = `
<template>
  <TreeView :items="items" activatable color="#aa55cc" />
</template>
`;

const sourceDense = `
<template>
  <TreeView :items="items" activatable color="#aa55cc" />
</template>
`;
</script>

<template>
  <Story title="TreeView" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Basic tree" :source="sourceBasic">
      <TreeView :items="items" />
    </Variant>
    <Variant title="Activatable tree" :source="sourceActivatable">
      <TreeView :items="items" activatable />
    </Variant>
    <Variant title="Activatable color tree" :source="sourceColor">
      <TreeView :items="items" activatable color="#aa55cc" />
    </Variant>
    <Variant title="Hoverable tree" :hoverable="sourceHoverable">
      <TreeView :items="items" hoverable />
    </Variant>
    <Variant title="Dense tree" :dense="sourceDense">
      <TreeView :items="items" dense />
    </Variant>
  </Story>
</template>

<docs lang="md">
# Tree component

A custum vue element for displaying
tree structures.

## Props: items

As input recives an array of items,
where each item has a **label** and a list of
children items called **items**.

### Example:

```
items = [
  {
    label: "Some item name",
    items: []
  },
  {
    label: "Another item name",
    items: [
      {
        label: "Child item",
        items: []
      }
    ]
  }
]
```

## Props: activatable

We can pass an **activatable** attribute to the
component, marking the item we last clicked on.

## Props: color

The color of the **activatable** attribute can be
custumized with the **color** attribute.

### Available colors:

- primary
- secondary
- sucess
- warning
- danger
- info
- custum hex color (ex. #123456)

## Props: hoverable

We can pass an **hoverable** attribute to the
component, highlighting items we hover over.

## Props: dense

We can pass an **dense** attribute to the
component, which display tree items closer together.
</docs>
