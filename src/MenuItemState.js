/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu item
 */

import MenuStyles from "./MenuStyles"

class MenuItemState {
  /**
   * constructor
   *
   * @param {Object}
   * @throws {Error}
   */
  constructor({ id, title, isActive = false, callback, closeOnClick = true, styles }) {
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

    this._id = id
    this._title = title
    this._isActive = isActive
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
   * Getter method for retrieving the isActive status.
   *
   * @returns {Boolean} The isActive status
   */
  isActive() {
    return this._isActive
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
   * Getter method for retrieving the callback.
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
   * Reest the component state to ide state (isActive = false)
   *
   * @returns {MenuItemState}
   */
  reset() {
    this._isActive = false
    return this
  }
}

export default MenuItemState
