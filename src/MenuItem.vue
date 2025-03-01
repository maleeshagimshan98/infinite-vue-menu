/** * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98 * Menu item */

<template>
  <div class="" v-bind:class="itemStyles" :key="state.id" v-on:click.stop="selected()">
    <!-- menu item content -->
    <slot>
      <p class="" v-bind:class="textStyles" style="margin: 0;">
        {{ state.title }}
      </p>

      <!-- children -->
      <div class="children-container" v-bind:class="state.getStyles().container" v-if="state.isActive() && state.hasChildren()">
        <infinite-vue-menu-item v-for="(child, name, index) in state.getChildren()" :state="child"
          :styles="child.getStyles()" @menu:isActive="childSelected(child)" @menu:toggle="toggleByChildItem(child)">
        </infinite-vue-menu-item>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "infinite-vue-menu-item",
  data: function () {
    return {
    }
  },
  computed: {
    itemStyles() {
      let {item} = this.state.getStyles()
      return {
        [item.base.join(" ")] : true,
        [item.idle.join(" ")]: !this.state.isSelected() && !this.state.isDisabled(),
        [item.active.join(" ")]: this.state.isSelected(),
        [item.disable.join(" ")]: this.state.isDisabled(),
        [item.children.join(" ")] : this.state.isChild(),
      }
    },
    textStyles() {
      let {text} = this.state.getStyles()
      
      return {
        [text.base.join(" ")] : true,
        [text.idle.join(" ")]: !this.state.isSelected() && !this.state.isDisabled(),
        [text.active.join(" ")]: this.state.isSelected(),
        [text.disable.join(" ")]: this.state.isDisabled(),
        [text.children.join(" ")] : this.state.isChild(),
      }
    },
  },
  props: {
    state: {
      type: Object,
      required: true
    },
    styles: {
      type: [Object],
    },
  },
  methods: {
    selected() {
      if (this.state.isDisabled()) {
        return //...
      }
      //... toggle the child menu if already the menu item is active
      if (this.state.isActive() && this.state.hasChildren()) {
        this.state.reset()
        return
      }
      this.state.setSelected()
      this.$emit('menu:isActive', this.state.id)
    },
    toggleByChildItem() {
      this.state.reset() 
      console.log(this.state)
      this.$emit('menu:toggle')
    },
    async childSelected(child) {
      if (this.state.isDisabled()) {
        return //...
      }
      this.state.unselect()
      child.setActiveChildItemState(child)
      if (child.closeOnClick && !child.hasChildren()) {
        this.toggleByChildItem()
      }
      if (typeof child.getCallback() === 'function') {
        await child.getCallback()({
          router : this.$router,
          store : this.$store
        })
      }
    },
  },
  beforeMount() {
    if (this.state.isDisabled() && this.state.isActive()) {
      throw new Error(
        `Error in component MenuItem with ${this.state.id}. disable and isActive props cannot be true at the same time`
      )
    }
  },
  unmounted() {
    //... TODO - reset all the child states
    this.state.reset()
  },
}
</script>

<style>
 .children-container {
  display: flex;
  flex-direction : column;
  position: absolute;
  left: 100%;
  top: 0;
 }
</style>
