/** 
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98 
 * Menu component
 */

<template>
  <div
    class="inf-vue-menu-menu"
    v-click-away="(event) => (clickaway ? close(event) : null)">
    <slot name="activator" :state="state"></slot>
    <!-- main content -->
    <!-- position absolute z-index-110 ? -->
    <slot>
      <div class="inf-vue-menu-content">
        <!-- make scrollable, hide scroll bar -->
        <MenuItem
          v-for="(item, name, index) in state.getMenuItems()"
          :title="item.title"
          :key="item.key"
          :isActive="item.isActive"
          :children="item.children"
          @menu:isActive => itemClicked(item)">
        </MenuItem>
      </div>
    </slot>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue"
import MenuState from "./js/MenuState.js"

export default {
  name: "infinite-vue-menu",
  data: function () {
    return {
      state: new MenuState(this.items),
    }
  },
  props: {
    clickaway : {
        type : Boolean,
        default : true
    },
    items: {
      type: Object,
    },
    styles: {
      type: Object,
    },
  },
  methods: {
    itemClicked(activeItem) {
      this.state.setActiveItem(activeItem) //... mark other items as inactive
      //... call a callback 
    },
  },
  computed: {},
  components: {
    MenuItem,
  },
}
</script>

<style>
.inf-vue-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 120;
  /** this side menu sits above the app bar */
}

.inf-vue-menu .inf-vue-menu-content {
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>
