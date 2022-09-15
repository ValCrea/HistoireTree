<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import lodash from "lodash";

import type { Tree, Data } from "@/utils/tree-types";
import { treeFind, treeFindParent, treesDefine } from "@/utils/tree-utils";
import { stringToColor, addHexOpacity } from "@/utils/color-utils";

const props = defineProps<{
  items: Tree[];
  color?: string;
  activatable?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  drag?: boolean;
  rounded?: boolean;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  openAll?: boolean;

  data?: Data;
}>();
const emit = defineEmits([
  "update-item",
  "clear-selected",
  "droped-on",
  "droped-from",
]);

const siblings = ref(
  treesDefine(lodash.cloneDeep(props.items), props.openAll ? true : false)
);
const color = computed(() => stringToColor(props.color));
const colorOpaque = computed(() => addHexOpacity(color.value));
const data = ref(
  props.data
    ? ({ nested: props.data.nested + 1 } as Data)
    : ({ nested: 0 } as Data)
);

function toggleExpand(id?: number) {
  const item = siblings.value.filter((sibling) => sibling.id == id)[0];

  item.expanded = !item.expanded;
  emit("update-item", item);
}

function toggleSelect(id?: number) {
  const item = siblings.value.filter((sibling) => sibling.id == id)[0];

  if (item.selected) {
    item.selected = false;
    emit("update-item", item);
  } else {
    clearSelected();

    nextTick(() => {
      item.selected = !item.selected;
      emit("update-item", item);
    });
  }
}

function clearSelected() {
  clearItems(siblings.value);
  emit("clear-selected");
}

function clearItems(items: Tree[]) {
  for (const item of items) {
    item.selected = false;
    clearItems(item.items);
  }
}

function updateItem(newItem: Tree) {
  if (!newItem.id) return;
  const parent = treeFindParent(siblings.value, newItem.id);

  if (!parent) return;
  for (let i = 0; i < parent.items.length; i++) {
    if (parent.items[i].id == newItem.id) {
      parent.items[i] = newItem;
      break;
    }
  }
  emit("update-item", parent);
}

let dropedOnId = 0;
function dropedOn(id?: number) {
  if (!props.drag) return;

  if (data.value.nested != 0) {
    emit("droped-on", id);
    return;
  }
  dropedOnId = id ? id : 0;
}

let dropedFromId = 0;
function dropedFrom(id?: number) {
  if (!props.drag) return;

  if (data.value.nested != 0) {
    emit("droped-from", id);
    return;
  }
  dropedFromId = id ? id : 0;

  const onId = dropedOnId;
  const fromId = dropedFromId;

  dropedOnId = 0;
  dropedFromId = 0;

  if (onId == fromId) return;

  const treeParent = treeFindParent(siblings.value, fromId);
  const treeFrom = treeFind(
    treeParent ? treeParent.items : siblings.value,
    fromId
  );
  if (!treeFrom) return;

  if (onId) {
    const dropedOnChild = treeFind(treeFrom.items, onId);
    if (dropedOnChild) return;

    const treeOn = treeFind(siblings.value, onId);
    if (!treeOn) return;

    if (treeParent) {
      treeParent.items = treeParent.items.filter((item) => item.id != fromId);
    } else {
      siblings.value = siblings.value.filter((sibling) => sibling.id != fromId);
    }
    treeOn.items.push(treeFrom);
  } else {
    if (treeParent) {
      treeParent.items = treeParent.items.filter((item) => item.id != fromId);
    } else {
      siblings.value = siblings.value.filter((sibling) => sibling.id != fromId);
    }
    siblings.value.push(treeFrom);
  }

  forceUpdate();
}

function forceUpdate() {
  const temp = siblings.value;
  siblings.value = [];
  nextTick(() => (siblings.value = temp));
}
</script>

<template>
  <div v-for="self in siblings" :key="self.label">
    <section
      @click="toggleSelect(self.id)"
      :style="{ paddingLeft: `${1.5 * data.nested}rem` }"
      :class="{
        'pad-wide': !props.dense,
        'pad-dense': props.dense,
        'tree--selected': props.activatable && self.selected,
        'tree--hoverable':
          props.hoverable && (!props.activatable || !self.selected),
        'tree--rounded-left': props.rounded || props.roundedLeft,
        'tree--rounded-right': props.rounded || props.roundedRight,
      }"
      class="tree"
      @drop="dropedOn(self.id)"
      @dragover.prevent
      @dragenter.prevent
    >
      <button
        v-if="self.items.length > 0"
        @click.stop="toggleExpand(self.id)"
        class="button-expand focus-circle"
      >
        <div class="button-expand__icon">
          <div
            :class="{
              'arrow-down': self.expanded,
              'arrow-left': !self.expanded,
            }"
          ></div>
        </div>
      </button>

      <div v-else class="button-expand__empty"></div>

      <p
        @dragend="dropedFrom(self.id)"
        :class="{ 'tree__label--drag': props.drag }"
        class="tree__label"
        :draggable="props.drag ? 'true' : 'false'"
      >
        {{ self.label }}
      </p>
    </section>

    <TreeView
      :items="self.items"
      :color="props.color"
      :activatable="props.activatable"
      :hoverable="props.hoverable"
      :dense="props.dense"
      :drag="props.drag"
      :rounded="props.rounded"
      :roundedLeft="props.roundedLeft"
      :roundedRight="props.roundedRight"
      :openAll="props.openAll"
      :data="data"
      @update-item="updateItem"
      @clear-selected="clearSelected"
      @droped-on="dropedOn"
      @droped-from="dropedFrom"
      v-if="self.expanded"
    />
  </div>
</template>

<style lang="scss">
.tree {
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

  &--rounded-left {
    border-top-left-radius: 9999em;
    border-bottom-left-radius: 9999em;
  }

  &--rounded-right {
    border-top-right-radius: 9999em;
    border-bottom-right-radius: 9999em;
  }

  &__label {
    margin: 0;
    margin-left: 0.3rem;

    &--drag {
      cursor: grab;
    }
  }
}

.button-expand {
  margin: 0;
  padding: 0;

  border: none;
  background-color: inherit;

  cursor: pointer;

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
