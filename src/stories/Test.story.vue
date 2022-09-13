<script setup lang="ts">
import TreeView from "@/components/TreeView.vue";

const test = [
  {
    name: "Node1",
    nodes: [
      {
        name: "node11",
        nodes: [],
      },
      {
        name: "node12",
        nodes: [
          {
            name: "node121",
            nodes: [],
          },
          {
            name: "node122",
            nodes: [],
          },
          {
            name: "node123",
            nodes: [],
          },
        ],
      },
      {
        name: "node13",
        nodes: [],
      },
    ],
  },
  {
    name: "Node2",
    nodes: [],
  },
  {
    name: "Node3",
    nodes: [
      {
        name: "node31",
        nodes: [],
      },
      {
        name: "node32",
        nodes: [],
      },
    ],
  },
];
</script>

<template>
  <Story>
    <TreeView :nodes="test" activatable />
  </Story>
</template>
