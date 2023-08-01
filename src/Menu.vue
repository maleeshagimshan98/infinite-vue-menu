/** 
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98 
 * Menu component
 */

<template>
  <div
    class="inf-vue-menu"
    v-click-away="(event) => (clickaway ? _state.closeMenu() : null)">
    <slot name="activator" :state="_state"></slot>
    <!-- main content -->
    <!-- position absolute z-index-110 ? -->
    <slot v-if="_state.isMenuActive()">
      <div class="inf-vue-menu-content">
        <!-- make scrollable, hide scroll bar -->
        <MenuItem
          v-for="(item, name, index) in _state.getMenuItems()"
          :title="item.title"
          :id="item.id"
          :isActive="item.isActive"
          :children="item.getChildren()"
          @menu:isActive="clicked => itemClicked(clicked)"
          :closeOnClick="item.closeOnClick"
          :styles="item.getStyles()"
          >
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
      _state : null
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
    async itemClicked (id) {
      let item = this._state.getMenuItems(id)
      console.log(id)
      console.log(item)
      item.setActive(true)
      this._state.setActiveItemState(item) //... mark other items as inactive
      if (item.closeOnClick && !item.hasChildren()) {
        this._state.toggleMenu()
      }
      if (typeof item.getCallback() === 'function') {
        await item.getCallback()()
      }

    },
  },
  computed: {},
  components: {
    MenuItem,
  },
  beforeMount () {
    this._state = new MenuState(this.items, this.styles)
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
