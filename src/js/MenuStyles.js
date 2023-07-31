/**
 * © Maleesha Gimshan - 2021 - github.com/maleeshagimshan98
 * Menu styles
 */

class MenuStyles {
    
    /**
     * constructor
     * 
     * @param {Object}
     * @returns {MenuStyles} 
     */
    constructor ({bgActive="", bgHover="", bgInactive="", textActive="", textHover="", textInactive="" ,font=""})
    {
        this.setStyles({bgActive, bgHover, bgInactive, textActive, textHover, textInactive, font})        
    }

    /**
     * get the style object
     * 
     * @returns {object} styles
     */
    getStyles ()
    {
        return {
            bgActive : this.bgActive,
            bgHover : this.bgHover,
            bgInactive : this.bgInactive,
            textActive : this.textActive,
            textHover : this.textHover,
            textInactive : this.textInactive,
            font : this.font,
          }
    }

    /**
     * set styles,
     * if any of property is not set, set it to default
     * 
     * @param {string} bgActive
     * @param {string} bgInactive
     * @param {string} textActive 
     * @param {string} textInactive 
     * @param {string} font 
     * @returns {object} 
     */
    setStyles ({bgActive,bgHover, bgInactive,textActive, textHover, textInactive,font})
    {         
        this.bgActive = bgActive
        this.bgHover = bgHover
        this.bgInactive = bgInactive
        this.textActive = textActive
        this.textHover = textHover
        this.textInactive = textInactive
        this.font = font
    }
}

export default MenuStyles;