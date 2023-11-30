/** * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98 * Menu item */

<template>
  <div
    class=""
    v-bind:class="itemStyles"
    :key="id"
    v-on:click="selected(id)">
    <!-- menu item content -->
    <slot>
      <p class="" v-bind:class="textStyles">
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
          @menu:isActive="selected(child.id)">
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
  computed: {
    itemStyles() {
      return {
        [this.styles.item.idle.join(" ")]: !this.isActive,
        [this.styles.item.active.join(" ")]: this.isActive,
        [this.styles.item.disable.join(" ")]: this.disable,
      }
    },
    textStyles() {
      return {
        [this.styles.text.idle.join(" ")]: !this.isActive,
        [this.styles.text.active.join(" ")]: this.isActive,
        [this.styles.text.disable.join(" ")]: this.disable,
      }
    },
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
      type: [String, Number],
    },
    disable: {
      type: Boolean,
      default: false,
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
      this.$emit("menu:isActive", id)
    },
  },
  beforeMount() {
    if (this.disable && this.isActive) {
      throw new Error(
        `Error in component MenuItem with ${this.id}. disable and isActive props cannot be true at the same time`
      )
    }
  },
}
</script>
