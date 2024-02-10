/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu styles
 */

class MenuStyles {
  /**
   * constructor
   *
   * @param {Object}
   * @returns {MenuStyles}
   */
  constructor(item, text) {
    this._item = {
      idle: [],
      active: [],
      disable: [],
    }
    this._text = {
      idle: [],
      active: [],
      disable: [],
    }
    this._setDefaultStyles()
  }

  /**
   * get the style object
   *
   * @returns {object} styles
   */
  getStyles() {
    return {
      item: this._item,
      text: this._text,
    }
  }

  /**
   * Set default styles for the menu item
   *
   * @return {void}
   */
  _setDefaultStyles() {
    let defaultStyles = {
      idle: [],
      active: [],
      disable: [],
    }
    this._item = defaultStyles
    this._text = defaultStyles
  }

  /**
   * Assign the style values to the style elements
   * 
   * @param {Object} styles
   * @return {void}
   */
  _assignStyleValues (styles) {
    let element = {}
    ['idle', 'active', 'disable'].forEach (el => {
        if (!styles.hasOwnProperty(el)) {
        console.warn(`Infinite-Vue-Menu : Warning - Cannot set the styles. Styles object does not have a property ${el}`)
        }
        element[el] = styles[el] ?? []
    })
    return element
  }

  /**
   * set styles,
   * if any of property is not set, set it to default
   *
   * @param {object} item
   * @param {object} text
   * @returns {object}
   */
  setStyles(item, text) {
    this._item = this._assignStyleValues(item)
    this._text = this._assignStyleValues(text)
  }
}

export default MenuStyles
