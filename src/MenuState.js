/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu State
 */

import MenuItemState from "./MenuItemState.js"
import MenuStyles from "./MenuStyles.js"

/**
 * manages the all menu item's data, children, styles
 */
class MenuState {
  /**
   * constructor
   *
   * @param {Object} items - items (menu item names),
   * @param {Object} styles (menu-wide styling data)
   */
  constructor(items, styles = null) {
    this._isMenuActive = false
    this._items = {}   
    this._styles = new MenuStyles(styles)
    this._activeItem
    this._initialize(this._items, items)
  }

  /**
   * initialize  menu items
   *
   * @param {Object} items
   * @returns {Object}
   */
  _initialize(ctx, items) {
    for (let item in items) {
      if (!items[item].id) {
        throw new Error(`Error in creating a MenuItemState. No id is passed for MenuItem with title named '${items[item].title}'`)
      }
      let menuItem = new MenuItemState({
        id: items[item].id,
        title: items[item].title ?? "",
        isActive: items[item].isActive ?? false,
        callback : items[item].callback ?? null,
        closeOnClick : items[item].closeOnClick ?? true,
        styles: items[item].styles ?? this._styles,
      })
      if (items[item].children) {
        menuItem.setChildren(
          this._initialize(menuItem.getChildren(), items[item].children)
        )
      }
      ctx[items[item].id] = menuItem
    }
    return ctx
  }

  /**
   * get created MenuItemState objects
   *
   * @param {String} id
   * @returns {Object}
   */
  getMenuItems(id) {
    if (id) {
      return this._items[id]
    }
    return this._items
  }

  /**
   * set active menu item
   *
   * @param {MenuItemState} item
   * @returns {void}
   */
  setActiveItemState(item) {
    this._activeItem = item
    //... mark other items as inactive
  }

  /**
   * Opens the menu
   * 
   * @returns {MenuState}
   */
  openMenu() {
    this._isMenuActive = true
    return this
  }

  /**
   * Close the menu
   * 
   * @returns {MenuState}
   */
  closeMenu () {
    this._isMenuActive = false
    return this
  }

  /**
   * toggle the menu status
   * 
   * @returns {void}
   */
  toggleMenu () {
    if (this._isMenuActive) {
      this._isMenuActive = false
    }
    else {
      this._isMenuActive = true
    }
  }

  /**
   * check if menu is active
   * 
   * @returns {Boolean}
   */
  isMenuActive () {
    return this._isMenuActive
  }

  /**
   * get the state of the active menu item
   * 
   * @returns {MenuItemState}
   */
  getActiveItemState () {
    return this._activeItem
  }
  
}

export default MenuState
