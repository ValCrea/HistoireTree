<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";

const source = `
<template>
  <TreeView :items="items" activatable hoverable />
</template>
`;
</script>

<template>
  <Story title="Hoverable tree" :source="source">
    <TreeView :items="items" activatable hoverable />
  </Story>
</template>

<docs lang="md">
## Props: hoverable

We can pass an **hoverable** attribute to the
component, highlighting items we hover over.
</docs>
