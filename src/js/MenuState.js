/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu State
 */

import MenuItemState from "./MenuItemState.js"

/**
 * manages the all menu item's data, children, styles
 */
class MenuState {
  /**
   * constructor
   *
   * @param {Object} items - items (menu item names),
   * @param {MenuStyles} styles (global styling data)
   */
  constructor(items, styles = null) {
    this.items = {}   
    this._styles = styles
    this.activeItem
    this._initialize(this.items, items)
  }

  /**
   * initialize  menu items
   *
   * @param {Object} items
   * @returns {Array}
   */
  _initialize(ctx, items) {
    for (let item in items) {
      let menuItem = new MenuItemState({
        key: items[item].key,
        title: items[item].title ?? item,
        path: items[item].path,
        routeName: items[item].routeName,
        params: items[item].params,
        isActive: items[item].isActive,
        children: items[item].children,
        styles: items[item].styles ?? this._styles,
      })
      if (items[item].children) {
        menuItem.setChildren(
          this._initialize(menuItem.getChildren(), items[item].children)
        )
      }
      ctx[items[item].key ?? item] = menuItem
    }
    return ctx
  }

  /**
   * get created MenuItemState objects
   *
   * @returns Array
   */
  getMenuItems() {
    return this.items
  }

  /**
   * set active menu item
   *
   * @param {MenuItemState} item
   * @returns {void}
   */
  setActiveItem(item) {
    this.activeItem = item
  }
}

export default MenuState
