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
  <TreeView :items="items" hoverable />
</template>
`;

const sourceDense = `
<template>
  <TreeView :items="items" dense />
</template>
`;

const sourceDrag = `
<template>
  <TreeView :items="items" drag />
</template>
`;

const sourceRounded = `
<template>
  <TreeView :items="items" activatable hoverable color="sucess" rounded />
</template>
`;

const sourceRoundedLeft = `
<template>
  <TreeView :items="items" activatable hoverable color="warning" rounded-left />
</template>
`;

const sourceRoundedRight = `
<template>
  <TreeView :items="items" activatable hoverable color="danger" rounded-right />
</template>
`;

const sourceOpenAll = `
<template>
  <TreeView :items="items" open-all />
</template>
`;
</script>

<template>
  <Story title="TreeView" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Basic" :source="sourceBasic">
      <TreeView :items="items" />
    </Variant>

    <Variant title="Activatable" :source="sourceActivatable">
      <TreeView :items="items" activatable />
    </Variant>

    <Variant title="Activatable custum color" :source="sourceColor">
      <TreeView :items="items" activatable color="#aa55cc" />
    </Variant>

    <Variant title="Hoverable" :hoverable="sourceHoverable">
      <TreeView :items="items" hoverable />
    </Variant>

    <Variant title="Dense" :dense="sourceDense">
      <TreeView :items="items" dense />
    </Variant>

    <Variant title="Draggable" :source="sourceDrag">
      <TreeView :items="items" drag />
    </Variant>

    <Variant title="Rounded" :source="sourceRounded">
      <TreeView :items="items" activatable hoverable color="sucess" rounded />
    </Variant>

    <Variant title="Rounded left" :source="sourceRoundedLeft">
      <TreeView
        :items="items"
        activatable
        hoverable
        color="warning"
        rounded-left
      />
    </Variant>

    <Variant title="Rounded right" :source="sourceRoundedRight">
      <TreeView
        :items="items"
        activatable
        hoverable
        color="danger"
        rounded-right
      />
    </Variant>

    <Variant title="Pre-opened" :source="sourceOpenAll">
      <TreeView :items="items" open-all />
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

## Props: dragable

We can pass an **drag** attribute to the
component which allows us to move items within
the tree.

## Props: rounded

We can pass **rounded**, **rounded-left** and
**rounded-right** attributes to the component
to give it a round shape on activation or highlight.

## Props: open-all

We can pass an **drag** attribute to the
component which open the entire tre on load.
</docs>
