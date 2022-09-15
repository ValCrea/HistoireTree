<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { Tree } from "@/utils/tree-types";
import { addHexOpacity } from "@/utils/color-utils";

const props = defineProps<{
  tree: Tree;
  color: string;
  activatable: boolean;
  hoverable: boolean;
  dense: boolean;

  nested: number;
  removeTree: number;
  addTree: { tree: Tree | null; to: number };
}>();
const emits = defineEmits<{
  (eventName: "clear-select"): void;
  (eventName: "droped-on", id: number): void;
  (eventName: "droped-from", id: number): void;
}>();

const items = ref(props.tree.items.map((item) => ref(item)));
const colorOpaque = computed(() => addHexOpacity(props.color));

const removeTree = computed(() => props.removeTree);
const addTree = computed(() => props.addTree);
watch(removeTree, () => {
  items.value = items.value.filter((item) => item.value.id != removeTree.value);
});
watch(addTree, () => {
  if (addTree.value.tree && addTree.value.to == props.tree.id) {
    console.log(addTree.value);
    items.value.forEach((item) => console.log(item.value.label));
    items.value.push(ref(addTree.value.tree));
    items.value.forEach((item) => console.log(item.value.label));
    items.value.filter(() => true);
    console.log(props.tree.label);
  }
});

const expandTree = () => {
  props.tree.expanded = !props.tree.expanded;
};

const selectNode = () => {
  if (!props.activatable) return;

  if (props.tree.selected) {
    props.tree.selected = false;
    return;
  }

  emits("clear-select");
  nextTick(() => {
    props.tree.selected = !props.tree.selected;
  });
};

function dropedOn() {
  emits("droped-on", props.tree.id ? props.tree.id : 0);
}
function emitDropedOn(id?: number) {
  const emitId = id ? id : props.tree.id ? props.tree.id : 0;
  emits("droped-on", emitId);
}

function dropedFrom() {
  emits("droped-from", props.tree.id ? props.tree.id : 0);
}
function emitDropedFrom(id?: number) {
  const emitId = id ? id : props.tree.id ? props.tree.id : 0;
  emits("droped-from", emitId);
}
</script>

<template>
  <section
    @click="selectNode"
    :style="{ paddingLeft: `${1.5 * nested}rem` }"
    :class="{
      'pad-wide': !dense,
      'pad-dense': dense,
      'node--selected': props.tree.selected,
      'node--hoverable': props.hoverable && !props.tree.selected,
    }"
    class="node"
    @drop="dropedOn"
    @dragover.prevent
    @dragenter.prevent
  >
    <button
      v-if="tree.items.length > 0"
      @click.stop="expandTree"
      class="node__expand focus-circle"
    >
      <div class="node__icon">
        <div
          :class="{
            'arrow-down': props.tree.expanded,
            'arrow-left': !props.tree.expanded,
          }"
        ></div>
      </div>
    </button>

    <div v-else class="node__empty"></div>

    <p @dragend="dropedFrom" class="node__name" draggable="true">
      {{ tree.label }}
    </p>
  </section>
  <template v-if="props.tree.expanded">
    <template v-for="item in items" :key="item.label">
      <TreeItem
        v-model:tree="item.value"
        :color="color"
        :dense="props.dense"
        :activatable="props.activatable"
        :hoverable="props.hoverable"
        :nested="nested + 1"
        :removeTree="removeTree"
        :addTree="addTree"
        @clear-select="emits('clear-select')"
        @droped-on="emitDropedOn"
        @droped-from="emitDropedFrom"
      />
    </template>
  </template>
</template>

<style scoped lang="scss">
.node {
  display: flex;
  flex-direction: row;
  align-items: center;

  transition: all 0.25s ease;

  &--selected {
    background-color: v-bind(colorOpaque);
    color: v-bind(color);
  }

  &--hoverable {
    &:hover {
      background-color: #eaeaea3a;
    }
  }

  &__name {
    margin: 0;
    margin-left: 0.3rem;
    cursor: grab;
  }

  &__expand {
    margin: 0;
    padding: 0;

    border: none;
    background-color: inherit;

    cursor: pointer;
  }

  &__children {
    padding: 0;
    margin: 0;

    list-style-type: none;
  }

  &__icon {
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__empty {
    width: 2rem;
    height: 2rem;
  }
}

.pad-dense {
  padding: 0.15rem;
}

.pad-wide {
  padding: 0.4rem;
}

.focus-circle {
  position: relative;
  background: none;

  &:focus::before {
    content: "";
    background-color: rgb(240, 240, 240);
    border-radius: 50%;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}

$arrow-size: 0.35rem;
.arrow-down {
  width: 0;
  height: 0;
  border-left: $arrow-size solid transparent;
  border-right: $arrow-size solid transparent;

  border-top: $arrow-size solid rgba(0, 0, 0, 0.7);
}

.arrow-left {
  width: 0;
  height: 0;
  border-top: $arrow-size solid transparent;
  border-bottom: $arrow-size solid transparent;

  border-left: $arrow-size solid rgba(0, 0, 0, 0.7);
}
</style>
