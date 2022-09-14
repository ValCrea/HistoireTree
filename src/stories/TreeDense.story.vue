<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";

const source = `
<template>
  <TreeView :items="items" dense />
</template>
`;
</script>

<template>
  <Story title="Dense tree" :source="source">
    <TreeView :items="items" dense />
  </Story>
</template>

<docs lang="md">
## Props: dense

We can pass an **dense** attribute to the
component, which display tree items closer together.
</docs>
