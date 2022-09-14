<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";
</script>

<template>
  <Story title="Dense tree">
    <TreeView :items="items" dense />
  </Story>
</template>

<docs lang="md">
## Props: dense

We can pass an **dense** attribute to the
component, which display tree items closer together.
</docs>
