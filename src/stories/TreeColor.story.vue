<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";
</script>

<template>
  <Story title="Custom activatable tree">
    <Variant title="Primary color">
      <TreeView :items="items" activatable color="primary" />
    </Variant>

    <Variant title="Secondary color">
      <TreeView :items="items" activatable color="secondary" />
    </Variant>

    <Variant title="Sucess color">
      <TreeView :items="items" activatable color="sucess" />
    </Variant>

    <Variant title="Warning color">
      <TreeView :items="items" activatable color="warning" />
    </Variant>

    <Variant title="Danger color">
      <TreeView :items="items" activatable color="danger" />
    </Variant>

    <Variant title="Info color">
      <TreeView :items="items" activatable color="info" />
    </Variant>

    <Variant title="Custum color">
      <TreeView :items="items" activatable color="#aa33bb" />
    </Variant>
  </Story>
</template>
