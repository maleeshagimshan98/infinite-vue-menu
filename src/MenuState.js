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
   * Indicates if the menu is active
   *
   * @type {Boolean}
   * @private
   */
  _isMenuActive

  /**
   * Styles for the menu
   *
   * @type {MenuStyles}
   * @private
   */
  _styles

  /**
   * Active menu item state
   *
   * @type {MenuItemState}
   * @private
   */
  _activeItem

  /**
   * Menu items
   *
   * @type {Object}
   * @private
   */
  _items

  /**
   * constructor
   *
   * @param {Object} items - items (menu item names),
   * @param {Object} styles (menu-wide styling data)
   */
  constructor(items, { item, text } = {}) {
    this._isMenuActive = false
    this._styles = this._setMenuStyles({item, text})
    this._items = this._initializeState(items)
  }

  /**
   * Sets the menu style instance according to the given parameters
   * 
   * @param {MenuStyles | object} styles
   * @returns {MenuStyles}
   */
  _setMenuStyles (styles) {
    if (styles instanceof MenuStyles) {
      return styles
    }
    else {
      return new MenuStyles(styles.item, styles.text)
    }
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
    if (!(item.styles instanceof MenuStyles)) {
      throw new Error(
        `Error in creating a MenuItemState. The styles should be an instance of MenuStyles`
      )
    }
    return item.styles
  }

  /**
   * initialize  menu items
   *
   * @param {Object} items
   * @returns {Object}
   */
  _initializeState(items, isChild = false) {
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
        callback: item.callback ?? this._getDefaultCallback(),
        closeOnClick: item.closeOnClick ?? true,
        styles: this._initializeItemStyles(item),
      })
      if (item.children) {
        menuItem.setChildren(this._initializeState(item.children, true))
      }
      stateTree[menuItem.id] = menuItem
    })
    return stateTree
  }

  /**
   * Get the sdk default callback for a menu item
   * 
   * @returns {Function}
   */
  _getDefaultCallback () {
    return () => {}
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
      console.warn(`Trying to iterate over empty menu. This menu has no children`)
      return
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
