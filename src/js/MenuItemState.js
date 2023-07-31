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
  constructor({
    key,
    title,
    path,
    routeName,
    params,
    isActive,
    children,
    styles,
  }) {
    if (!path && !routeName) {
      console.error(`path or routeName is required. At ${title} || ${key}`)
      throw new Error(`path or routeName is required.`)
    }
    this.key = key
    this.title = title ?? ""
    this.path = path
    this.routeName = routeName
    this.params = params
    this.isActive = isActive ?? false
    this.children = children ?? {}
    this.styles = new MenuStyles(
      styles ??
        {
          //... pass default class names
        }
    )
  }

  /**
   * get the children of this item
   *
   * @returns {array|boolean} children
   */
  getChildren() {
    return this.children
  }

  /**
   * set childrens of this item
   *
   * @param {Object} children
   * @returns
   */
  setChildren(children) {
    this.children = children
    return this
  }

  /**
   * get the style object
   *
   * @returns {object} styles
   */
  getStyles() {
    return this.styles
  }

  /**
   * set styles,
   * if any of property is not set, set it to default
   *
   *  @param {object} styles - style object
   * @returns
   */
  setStyles(styles) {
    this.styles = styles
    return this
  }

  /**
   * Set the MenuItem as active
   *
   * @param {Boolean} status
   * @returns {void}
   */
  setActive(status) {
    this.isActive = status
  }

  /**
   *
   */
  getRouteLocationObj() {
    if (this.path) {
    }
  }
}

export default MenuItemState
