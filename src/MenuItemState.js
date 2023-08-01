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
   */
  constructor({ id, title, isActive, callback, closeOnClick, styles }) {
    this._id = id
    this._title = title
    this._isActive = isActive

    if (callback && typeof callback !== 'function') {
      throw new Error(`Error in creating MenuItemState - callback must be a function but recieved ${callback}`)
    }

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
  get isActive() {
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
  get closeOnClick () {
    return this._closeOnClick
  }

  /**
   * Check if the item has children
   * 
   * @returns {Boolean}
   */
  hasChildren () {
    return Object.keys(this._children).length > 0
  }

  /**
   * get the children of this item
   *
   * @returns {Object} children
   */
  getChildren() {
    return this._children
  }

  /**
   * set childrens of this item
   *
   * @param {Object} children
   * @returns {MenuItemState}
   */
  setChildren(children) {
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
    this._styles = styles
    return this
  }

  /**
   * Set the MenuItem as active
   *
   * @param {Boolean} status
   * @returns {MenuItemState}
   */
  setActive(status) {
    this._isActive = status
    return this
  }
}

export default MenuItemState
