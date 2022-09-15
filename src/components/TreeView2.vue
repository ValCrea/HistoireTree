<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

import type { Tree, Data } from "@/utils/tree-types";
import { treesDefine } from "@/utils/tree-utils";
import { stringToColor, addHexOpacity } from "@/utils/color-utils";

const props = defineProps<{
  items: Tree[];
  color?: string;
  activatable?: boolean;
  hoverable?: boolean;
  dense?: boolean;

  data?: Data;
}>();
const emit = defineEmits(["update-item", "clear-selected"]);

const siblings = ref(treesDefine(props.items));
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
  for (const sibling of siblings.value) {
    sibling.selected = false;
  }
  emit("clear-selected");
}

function updateItem(newItem: Tree) {
  const parent = siblings.value.filter(
    (sibling) =>
      sibling.items.filter((item) => item.id == newItem.id).length > 0
  )[0];

  for (let i = 0; i < parent.items.length; i++) {
    if (parent.items[i].id == newItem.id) {
      parent.items[i] = newItem;
      break;
    }
  }

  emit("update-item", parent);
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
          props.hoverable && (props.activatable || !self.selected),
      }"
      class="tree"
      @drop="null"
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

      <p class="tree__label" draggable="true">
        {{ self.label }}
      </p>
    </section>

    <TreeView2
      :items="self.items"
      :color="props.color"
      :activatable="props.activatable"
      :hoverable="props.hoverable"
      :dense="props.dense"
      :data="data"
      @update-item="updateItem"
      @clear-selected="clearSelected"
      v-if="self.expanded"
    />
  </div>
</template>
