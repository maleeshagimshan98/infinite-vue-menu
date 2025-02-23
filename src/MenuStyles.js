/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu styles
 */

class MenuStyles {
  
  /**
   * Styles for menu item container (Including parent container and children container)
   * 
   * @type {Object}
   * @private
   */
  _container = []

    /**
   * Styles for the menu item
   *
   * @type {Object}
   * @private
   */
    _item = {}

    /**
     * Styles for the menu text
     *
     * @type {Object}
     * @private
     */
    _text = {}
  
  /**
   * constructor
   *
   * @param {Object}
   * @returns {MenuStyles}
   */
  constructor({container, item, text}) {
    this.setStyles(container, item, text)
  }

  /**
   * get the style object
   *
   * @returns {object} styles
   */
  getStyles() {
    return {
      container: this._container,
      item: this._item,
      text: this._text,
    }
  }

  /**
   * Get the dafault style object
   * 
   * @returns {object}
   */
  _getDefaultStyleObj () {
    return {
      base : [], //... styles that do not change based on the component state eg- position, 
      idle: [],
      active: [],
      disable: [],
      children : [],
    }    
  }

  /**
   * Set default styles for the menu item
   *
   * @return {void}
   */
  _setDefaultItemStyles() {    
    return {...this._getDefaultStyleObj(), childrenContainer: []}
  }

  /**
   * Set default styles for the menu item text
   *
   * @return {void}
   */
  _setDefaultTextStyles() {
    return this._getDefaultStyleObj()
  }

  /**
   * 
   * @param {array} state 
   * @param {object} styles
   * @returns {object}
   */
  _setStyleValues (state, styles) {
    let element = {}
    state.forEach (el => {
      if (!styles.hasOwnProperty(el)) {
        console.warn(`Infinite-Vue-Menu : Warning - Cannot set the styles. Styles object does not have a property ${el}`)
      }
      element[el] = styles[el] ?? []
    })
    return element
  }

  /**
   * Assign the style values to the menu items
   * 
   * @param {Object} styles
   * @return {object}
   */
  _assignItemStyleValues (styles) {
    let state = ['base','idle', 'active', 'disable', 'children', 'childrenContainer']
    return this._setStyleValues(state, styles)
  }
  
  /**
   * Assign the style values to the menu item texts
   * 
   * @param {Object} styles
   * @return {object}
   */
  _assignItemTextStyleValues (styles) {
    let state = ['base','idle', 'active', 'disable', 'children']
    return this._setStyleValues(state, styles)
  }

  /**
   * set styles,
   * if any of property is not set, set it to default
   *
   * @param {object} container
   * @param {object} item
   * @param {object} text
   * @returns {void}
   */
  setStyles(container, item, text) {
    this._container = container ? container : ['']
    this._item = item ? this._assignItemStyleValues(item) : this._setDefaultItemStyles()
    this._text = text ? this._assignItemTextStyleValues(text) : this._setDefaultTextStyles()
  }
}

export default MenuStyles
