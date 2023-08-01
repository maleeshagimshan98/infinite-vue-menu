/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu item 
 */

<template>
  <div
    class=""
    v-bind:class="[isActive ? [styles.item.active] : [styles.item.idle]]"
    :key="id"
    v-on:click="selected(id)">
    <!-- menu item content -->
    <slot>
      <p
        class=""
        v-bind:class="[isActive ? [styles.text.active] : [styles.text.idle]]">
        {{ title }}
      </p>

      <!-- children -->
      <div v-if="isActive && children">
        <infinite-vue-menu-item
          v-for="(child, name, index) in children"
          :key="child.id"
          :title="child.title"
          :id="child.id"
          :isActive="child.isActive"
          :children="child.getChildren()"
          :styles="child.getStyles()"
          @menu:isActive="selected(child.id)"          
          >
        </infinite-vue-menu-item>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "infinite-vue-menu-item",
  data: function () {
    return {}
  },
  props: {
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String,Number],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    children: {
      type: Object,
    },
    styles: {
      type: [Object],
    },
  },
  methods: {
    selected(id) {
      this.$emit("menu:isActive",id)
    },
  },
}
</script>
