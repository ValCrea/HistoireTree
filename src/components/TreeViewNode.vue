<script setup lang="ts">
import { ref, computed } from "vue";
import type { Node } from "@/utils/types";

const props = defineProps<{
  node: Node;
  dense?: boolean;
  activatable?: boolean;
  nested?: number;
}>();

const defNested = computed(() => {
  if (!props.nested) return 0;
  return props.nested;
});

const activate = () => {
  if (!props.activatable) return;

  selected.value = !selected.value;
};

const expand = ref(false);
const selected = ref(false);
</script>

<template>
  <section
    @click="activate"
    :style="{ paddingLeft: `${2 * defNested}rem` }"
    :class="{
      pad015: dense,
      pad03: !dense,
      'node--selected': selected,
    }"
    class="node"
  >
    <button
      v-if="node.nodes.length > 0"
      @click.stop="expand = !expand"
      class="node__expand focus-circle"
    >
      <div class="node__icon">
        <div :class="{ 'arrow-down': expand, 'arrow-left': !expand }"></div>
      </div>
    </button>

    <div v-else class="node__empty"></div>

    <p class="node__name">
      {{ node.name }}
    </p>
  </section>
  <template v-if="expand">
    <TreeViewNode
      v-for="childNode in node.nodes"
      :node="childNode"
      :dense="props.dense"
      :activatable="props.activatable"
      :nested="defNested + 1"
    />
  </template>
</template>

<style scoped lang="scss">
.node {
  display: flex;
  flex-direction: row;
  align-items: center;

  transition: all 0.25s ease;

  &--selected {
    background-color: rgba(51, 103, 192, 0.2);
    color: rgb(51, 103, 192);
  }

  &__name {
    margin: 0;
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

.pad015 {
  padding: 0.15rem;
}

.pad03 {
  padding: 0.3rem;
}

.focus-circle {
  position: relative;
  background: none;

  &:focus::before {
    content: "";
    background-color: rgba(200, 200, 200, 0.5);
    border-radius: 50%;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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