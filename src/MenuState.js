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
  constructor(items, { item, text } = {}) {
    this._isMenuActive = false
    this._styles = new MenuStyles(item ?? null, text ?? null)
    this._activeItem
    this._items = this._initialize(items)
  }

  /**
   * Initialize the styles for a particular menu item
   * 
   * @param {object} item 
   * @returns {MenuStyles}
   */
  _initializeItemStyles (item) {
    if (!item.hasOwnProperty('styles')) {
      return this._styles
    }
    return new MenuStyles(
      item.styles.item ?? null,
      item.styles.text
    )
  }

  /**
   * initialize  menu items
   *
   * @param {Object} items
   * @returns {Object}
   */
  _initialize(items, isChild = false) {
    let stateTree = {}
    Object.entries(items).forEach(([key, item]) => {
      if (!item.id) {
        throw new Error(
          `Error in creating a MenuItemState. No id is passed for MenuItem with title named '${item.title}'`
        )
      }
      let menuItem = new MenuItemState({
        id: item.id,
        title: item.title ?? "",
        isChild : isChild,
        isActive: item.isActive ?? false,
        disabled : item.disabled ?? false,
        callback: item.callback ?? null,
        closeOnClick: item.closeOnClick ?? true,
        styles: this._initializeItemStyles(item),
      })
      if (item.children) {
        menuItem.setChildren(this._initialize(item.children, true))
      }
      stateTree[menuItem.id] = menuItem
    })
    return stateTree
  }

  /**
   * get created MenuItemState objects
   *
   * @returns {Object}
   */
  getMenuItems() {
    return this._items
  }

  /**
   * get MenuItemState by it's id
   *
   * @param {String|Number} id
   * @returns {MenuItemState}
   * @throws {Error}
   */
  getMenuItemsById(id) {
    if (!this._items[id]) {
      throw new Error(`Cannot find a MenuItemState with id of ${id}`)
    }
    return this._items[id]
  }

  /**
   * Iterate over the MenuStateItems and call a callback function for each MenuItemState
   *
   * @param {Function} callback
   * @returns {void}
   */
  _iterateOverStates(callback) {
    if (Object.keys(this._items).length <= 0) {
      console.warn(`Trying to iterate over children of ${this._id} but the item has no children`)
    }
    for (let item in this._items) {
      callback(this._items[item])
    }
  }

  /**
   * set active menu item
   *
   * @param {MenuItemState} menuState
   * @returns {void}
   */
  setActiveItemState(menuState) {
    this._activeItem = menuState
    //... mark rest of the items as inactive
    this._iterateOverStates((item) => {
      if (item.id !== menuState.id) {
        item.reset()
      }
    })
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
  closeMenu() {
    this._isMenuActive = false
    this._activeItem = undefined
    //... reset all the states
    this._iterateOverStates((item) => {
      item.reset()
    })
    return this
  }

  /**
   * toggle the menu status
   *
   * @returns {void}
   */
  toggleMenu() {
    if (this._isMenuActive) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  /**
   * check if menu is active
   *
   * @returns {Boolean}
   */
  isMenuActive() {
    return this._isMenuActive
  }

  /**
   * get the state of the active menu item
   *
   * @returns {MenuItemState}
   */
  getActiveItemState() {
    return this._activeItem
  }
}

export default MenuState
