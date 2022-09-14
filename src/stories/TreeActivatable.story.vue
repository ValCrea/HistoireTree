<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";
</script>

<template>
  <Story title="Activatable tree">
    <TreeView :items="items" activatable />
  </Story>
</template>
