/** 
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98 
 * Menu component
 */

<template>
  <div
    class="inf-vue-menu"
    v-click-away="(event) => clickaway && _state.isMenuActive() ? _state.closeMenu() : null">
    <slot name="activator" :state="_state"></slot>
    <!-- main content -->
    <!-- position absolute z-index-110 ? -->
    <slot v-if="_state.isMenuActive()" :state="_state">
      <div class="inf-vue-menu-content">
        <!-- make scrollable, hide scroll bar -->
        <MenuItem
          v-for="(item, name, index) in _state.getMenuItems()"
          :state="item"
          @menu:isActive="id => itemClicked(item)"
          @menu:toggle="toggleMenu()"
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
    toggleMenu () {
      this._state.toggleMenu()
    },
    async itemClicked (item) {
      //let item = this._state.getMenuItemsById(item)
      console.log(item)
      //... TODO - clashing with nested item logic
      this._state.setActiveItemState(item) //... mark other items as inactive
      if (item.closeOnClick && !item.hasChildren()) {
        this.toggleMenu()
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
