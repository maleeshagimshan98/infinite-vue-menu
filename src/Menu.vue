﻿/** 
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98 
 * Menu component
 */

<template>
  <div class="inf-vue-menu" v-click-away="(event) => clickaway && state.isMenuActive() ? state.closeMenu() : null">
    <slot name="activator"></slot>
    <!-- main content -->
    <!-- position absolute z-index-110 ? -->
    <slot v-if="state.isMenuActive()">
      <div class="inf-vue-menu-content">
        <!-- make scrollable, hide scroll bar -->
        <MenuItem v-for="(item, name, index) in state.getMenuItems()" :activateOnHover="activateOnHover" :state="item"
          @menu:isActive="id => activateItem(item)" @menu:toggle="toggleMenu()"
          @menu:mouseover="activateOnMouseOver(item)">
        </MenuItem>
      </div>
    </slot>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue"
import MenuState from "./MenuState.js"

export default {
  name: "infinite-vue-menu",
  data: function () {
    return {
      //state: null
    }
  },
  props: {
    closeOnClick: {
      type: Boolean,
      default: false
    },
    clickaway: {
      type: Boolean,
      default: true
    },
    activated: {
      type: Boolean,
      default: false,
    },
    activateOnHover: {
      type: Boolean,
      default: false
    },
    state: {
      type: MenuState,
      required: true
    },
  },
  methods: {
    toggleMenu() {
      this.state.toggleMenu()
    },
    async activateOnMouseOver(item) {
      if (this.activateOnHover) {
        this.state.setActiveItemState(item)
      }
    },   
    async activateItem(item) {
      //let item = this._state.getMenuItemsById(item)
      //console.log(item)
      this.state.setActiveItemState(item) //... mark other items as inactive
      if (typeof item.getCallback() === 'function') {
        await item.getCallback()()
      }
      if (this.closeOnClick && !item.hasChildren()) {
        this.toggleMenu()
      }      
    },
  },
  computed: {},
  components: {
    MenuItem,
  },
  beforeMount() {
    //this._state = new MenuState(this.items, this.styles)
  },
  mounted() {
    if (this.activated) {
      this.state.toggleMenu()
    }
  },
}
</script>

<style>
.inf-vue-menu {
  position: relative;
  z-index: 120;
}

.inf-vue-menu .inf-vue-menu-content {
  position: absolute;
}
</style>
