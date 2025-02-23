/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu item state
 *
 * This class represents the state of a menu item in a UI component. It includes properties
 * to manage the item's identifier, title, selection status, active status, disabled status,
 * callback function, child items, and styles. The class provides methods to get and set these
 * properties, as well as methods to manage the state of child items and reset the state.
 */

import MenuStyles from "./MenuStyles"

class MenuItemState {
  /**
   * Active child menu item state
   *
   * @type {MenuItemState}
   * @private
   */
  _activeChildItem

  /**
   * Unique identifier for the menu item
   *
   * @type {String}
   * @private
   */
  _id

  /**
   * Title of the menu item
   *
   * @type {String}
   * @private
   */
  _title

  /**
   * Indicates if the menu item is a child of another menu item
   *
   * @type {Boolean}
   * @private
   */
  _isChild

  /**
   * Indicates if the menu item is selected
   *
   * @type {Boolean}
   * @private
   */
  _isSelected

  /**
   * Indicates if the menu item is active
   *
   * @type {Boolean}
   * @private
   */
  _isActive

  /**
   * Indicates if the menu item is disabled
   *
   * @type {Boolean}
   * @private
   */
  _disabled

  /**
   * Callback function for the menu item
   *
   * @type {Function}
   * @private
   */
  _callback

  /**
   * Indicates if the menu should close when clicked on the menu item
   *
   * @type {Boolean}
   * @private
   */
  _closeOnClick

  /**
   * Children of the menu item
   *
   * @type {Object}
   * @private
   */
  _children = {}

  /**
   * Styles for the menu item
   *
   * @type {MenuStyles}
   * @private
   */
  _styles

  /**
   * constructor
   *
   * @param {Object}
   * @throws {Error}
   */
  constructor({
    id,
    title,
    isChild = false,
    isSelected = false,
    isActive = false,
    disabled = false,
    callback,
    closeOnClick = true,
    styles,
  }) {
    if (!id) {
      throw new Error(`MenuItemState constructor requires an 'id' parameter, but it is missing.`)
    }
    if (!title) {
      throw new Error(`MenuItemState constructor requires an 'id' parameter, but it is missing.`)
    }
    if (callback && typeof callback !== "function") {
      throw new Error(
        `MenuItemState constructor requires the callback to be a function but recieved ${callback}`
      )
    }
    if (styles && styles instanceof MenuStyles == false) {
      throw new Error(
        `MenuItemState constructor requires the styles to be an instance of MenuStyles but recieved ${typeof styles}`
      )
    }

    this._id = id
    this._title = title
    this._isChild = isChild
    this._isSelected = isSelected
    this._isActive = isActive
    this._disabled = disabled
    this._callback = callback
    this._closeOnClick = closeOnClick
    this._children = {}
    this._styles = styles
  }

  /**
   * Getter method for retrieving the id.
   *
   * @returns {String} The id
   */
  get id() {
    return this._id
  }

  /**
   * Getter method for retrieving the title.
   *
   * @returns {String} The title
   */
  get title() {
    return this._title
  }

  /**
   * Getter method for checking if the menu item is a child of a parent maenu item
   *
   * @returns {boolean}
   */
  isChild() {
    return this._isChild
  }

  /**
   * Getter method for retrieving the isActive status.
   *
   * @returns {Boolean} The isActive status
   */
  isActive() {
    return this._isActive
  }

  /**
   * Getter method for retrieving the isSelected status.
   *
   * @returns {Boolean}
   */
  isSelected() {
    return this._isSelected
  }

  /**
   *
   */
  unselect() {
    this._isSelected = false
  }

  /**
   * Getter method for retrieving the disabled status
   *
   * @returns {boolean}
   */
  isDisabled() {
    return this._disabled
  }

  /**
   * Set the disabled value to true
   *
   * @return {void}
   */
  setDisabled() {
    this._disabled = true
  }

  /**
   * Getter method for retrieving the callback.
   *
   * @returns {Function} The callback
   */
  getCallback() {
    return this._callback
  }

  /**
   * Getter method for retrieving the closeOnClick status.
   *
   * @returns {Boolean}
   */
  get closeOnClick() {
    return this._closeOnClick
  }

  /**
   * Check if the item has children
   *
   * @returns {Boolean}
   */
  hasChildren() {
    return Object.keys(this._children).length > 0
  }

  /**
   * Get the children of this item
   *
   * @returns {Object} children
   */
  getChildren() {
    return this._children
  }

  /**
   * set children of this item
   *
   * @param {Object} children
   * @returns {MenuItemState}
   */
  setChildren(children) {
    if (Object.keys(children).length <= 0) {
      throw new Error(
        `Error setting the children of ${this._id}. Parameter children must be an object with 1 or more key-value pairs`
      )
    }
    this._children = children
    return this
  }

  /**
   * get the style object
   *
   * @returns {Object} styles
   */
  getStyles() {
    return this._styles.getStyles()
  }

  /**
   * set styles,
   * if any of property is not set, set it to default
   *
   * @param {Object} styles - style object
   * @returns {MenuItemState}
   */
  setStyles(styles) {
    if (styles instanceof MenuStyles == false) {
      throw new Error(
        `Error setting the styles of ${this._id}. Parameter styles must be an object with 1 or more key-value pairs`
      )
    }
    this._styles = styles
    return this
  }

  /**
   * Set the MenuItemState as active
   *
   * @returns {MenuItemState}
   */
  setActive() {
    this._isActive = true
    return this
  }

  /**
   * Set the MenuItemState as selected and active
   *
   * @return {MenuItemState}
   */
  setSelected() {
    this._isSelected = true
    //... in case of child items are in active state, reset them
    this._iterateOverChildStates((item) => {
      item.reset()
    })
    return this.setActive()
  }

  /**
   * Iterate over the MenuStateItems and call a callback function for each MenuItemState
   *
   * @param {Function} callback
   * @returns {void}
   */
  _iterateOverChildStates(callback) {
    if (Object.keys(this._children).length <= 0) {
      console.warn(
        `Warning:Infinite-Vue-Menu - Trying to iterate over children of ${this._id} but the item has no children`
      )
      return
    }
    for (let item in this._children) {
      callback(this._children[item])
    }
  }

  /**
   * set active menu item
   *
   * @param {MenuItemState} childMenuState
   * @returns {void}
   */
  setActiveChildItemState(childMenuState) {
    this._activeChildItem = childMenuState
    //... mark rest of the items as inactive
    this._iterateOverChildStates((item) => {
      if (item.id !== childMenuState.id) {
        item.reset()
      }
    })
  }

  /**
   * Reest the component state to ide state (isActive = false)
   *
   * @returns {MenuItemState}
   */
  reset() {
    this._isActive = false
    this._isSelected = false
    if (this.hasChildren()) {
      this._iterateOverChildStates((child) => {
        child.reset()
      })
    }
    return this
  }
}

export default MenuItemState
