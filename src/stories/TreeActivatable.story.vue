<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";
</script>

<template>
  <Story title="Activatable tree">
    <TreeView :items="items" activatable />
  </Story>
</template>

<docs lang="md">
## Props: activatable

We can pass an **activatable** attribute to the
component, marking the item we last clicked on.
</docs>
