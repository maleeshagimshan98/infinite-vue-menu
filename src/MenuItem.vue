/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu item
 */

<template>
  <div class="" v-bind:class="[isActive ? [bgActive] : [bgInactive]]" :key="key" v-on:click="selected()">
    <!-- menu item content -->
    <slot>
      <p class="" v-bind:class="[isActive ? [textActive] : [textInactive]]">
        {{ title }}
      </p>

      <!-- children -->
      <div v-if="isActive && children">
        <infinite-vue-menu-item v-for="(child, name, index) in children" :title="child.title" :key="child.key" :isActive="child.isActive" :children="child.children"
          :bgActive="child.styles.bgActive" :bgHover="child.styles.bgHover" :bgInactive="child.styles.bgInactive"
          :textActive="child.styles.textActive" :textHover="child.styles.textHover" :textInactive="child.styles.textInactive"
          :styles="child.styles.font">
        </infinite-vue-menu-item>>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'infinite-vue-menu-item',
  data: function () {
    return {};
  },
  props: {
    closeOnClick : {
        type : Boolean,
        default : true
    },
    title: {
      type: String,
      default: "",
    },
    styles : {
      type : [Array],
    },
    key: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: false
    },
    children: {
      type: Object
    },
    bgActive: {
      type: String,
      default: "bg-dark"
    },
    bgHover: {
      type: String,
      default: "bg-secondary"
    },
    bgInactive: {
      type: String,
      default: "bg-white"
    },
    textActive: {
      type: String,
      default: "text-white"
    },
    textHover: {
      type: String,
      default: "bg-dark"
    },
    textInactive: {
      type: String,
      default: "text-secondary"
    },
    font: {
      type: String,
      default: ""
    },
  },
  methods: {    
    selected(child) {
      // if (child) {
      //   //... set the child isActive state
      //   child.setActive(true)
      //   this.route({path : child.path, routeName : child.routeName, params : child.params})
      // }
      // else {
      //... set the active state
      this.$emit('sidemenu:isActive')
      this.route({ path: this.path, routeName: this.routeName, params: this.params })
      this.$emit('sidemenu:navigate')
      //}
    }
  },
};
</script>