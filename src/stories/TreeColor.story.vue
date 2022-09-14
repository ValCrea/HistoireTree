<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";
import { items } from "@/utils/tree-examples";

const sourcePrimary = `
<template>
  <TreeView :items="items" activatable color="primary" />
</template>
`;

const sourceSecondary = `
<template>
  <TreeView :items="items" activatable color="secondary" />
</template>
`;

const sourceSucess = `
<template>
  <TreeView :items="items" activatable color="sucess" />
</template>
`;

const sourceWarning = `
<template>
  <TreeView :items="items" activatable color="warning" />
</template>
`;

const sourceDanger = `
<template>
  <TreeView :items="items" activatable color="danger" />
</template>
`;

const sourceInfo = `
<template>
  <TreeView :items="items" activatable color="info" />
</template>
`;

const sourceCustum = `
<template>
  <TreeView :items="items" activatable color="#123456" />
</template>
`;
</script>

<template>
  <Story title="Custom activatable tree">
    <Variant title="Primary color" :source="sourcePrimary">
      <TreeView :items="items" activatable color="primary" />
    </Variant>

    <Variant title="Secondary color" :source="sourceSecondary">
      <TreeView :items="items" activatable color="secondary" />
    </Variant>

    <Variant title="Sucess color" :source="sourceSucess">
      <TreeView :items="items" activatable color="sucess" />
    </Variant>

    <Variant title="Warning color" :source="sourceWarning">
      <TreeView :items="items" activatable color="warning" />
    </Variant>

    <Variant title="Danger color" :source="sourceDanger">
      <TreeView :items="items" activatable color="danger" />
    </Variant>

    <Variant title="Info color" :source="sourceInfo">
      <TreeView :items="items" activatable color="info" />
    </Variant>

    <Variant title="Custum color" :source="sourceCustum">
      <TreeView :items="items" activatable color="#123456" />
    </Variant>
  </Story>
</template>

<docs lang="md">
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
</docs>
