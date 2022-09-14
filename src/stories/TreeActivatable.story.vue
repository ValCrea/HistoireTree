<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";

const source = `
<template>
  <TreeView :items="items" activatable />
</template>
`;
</script>

<template>
  <Story title="Activatable tree" :source="source">
    <TreeView :items="items" activatable />
  </Story>
</template>

<docs lang="md">
## Props: activatable

We can pass an **activatable** attribute to the
component, marking the item we last clicked on.
</docs>
