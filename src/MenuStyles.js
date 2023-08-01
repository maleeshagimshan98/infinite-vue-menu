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
    constructor (item, text)
    {
        this._item = {}
        this._text = {}
        this.setStyles(item, text)        
    }

    /**
     * get the style object
     * 
     * @returns {object} styles
     */
    getStyles ()
    {
        return {
            item : this._item,
            text : this._text
        }
    }

    /**
     * set styles,
     * if any of property is not set, set it to default
     * 
     * @param {Object | null} item
     * @param {Object | null} text
     * @returns {object} 
     */
    setStyles (item, text)
    {
        let defaultStyles =  {
            idle : [],
            active : [],
            disable : [],
        }
        this._item = item ?? defaultStyles
        this._text = text ?? defaultStyles
    }
}

export default MenuStyles;