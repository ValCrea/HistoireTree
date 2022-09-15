<script setup lang="ts">
import TreeView2 from "@/components/TreeView2.vue";
import { test } from "@/utils/tree-examples";
</script>

<template>
  <Story title="Test">
    <TreeView2 :items="test" />
  </Story>
</template>
