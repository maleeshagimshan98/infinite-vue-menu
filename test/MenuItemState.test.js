import MenuItemState from "../src/MenuItemState"
import MenuStyles from "../src/MenuStyles"

describe("MenuItemState", () => {
  describe("Constructor", () => {
    test("should throw an error if id or title is missing", () => {
      expect(() => new MenuItemState({})).toThrowError()
    })

    test("should throw an error if callback is not a function", () => {
      const invalidCallback = "not a function"
      expect(
        () => new MenuItemState({ id: "1", title: "Item", callback: invalidCallback })
      ).toThrowError()
    })
  })

  describe("Getters", () => {
    test("id should return the correct id", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item" })
      expect(menuItem.id).toBe("1")
    })

    test("title should return the correct title", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item" })
      expect(menuItem.title).toBe("Item")
    })

    test("isActive should return the correct isActive status", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item", isActive: true })
      expect(menuItem.isActive()).toBe(true)
    })

    test("getCallback should return the correct callback function", () => {
      const callbackFunction = () => {}
      const menuItem = new MenuItemState({ id: "1", title: "Item", callback: callbackFunction })
      expect(menuItem.getCallback()).toBe(callbackFunction)
    })

    test("closeOnClick should return the correct closeOnClick status", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item", closeOnClick: false })
      expect(menuItem.closeOnClick).toBe(false)
    })
  })

  describe("Children-related methods", () => {
    test("hasChildren should return true if there are children", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item" })
      menuItem.setChildren({ child1: {}, child2: {} })
      expect(menuItem.hasChildren()).toBe(true)
    })

    test("getChildren should return the correct children object", () => {
      const children = { child1: {}, child2: {} }
      const menuItem = new MenuItemState({ id: "1", title: "Item" })
      menuItem.setChildren(children)
      expect(menuItem.getChildren()).toEqual(children)
    })
  })

  describe("Styles-related methods", () => {
    test("getStyles should return the correct styles object from MenuStyles", () => {
      const itemStyles = { idle: ["item-idle"], active: ["item-active"], disable: ["item-disable"] }
      const textStyles = { idle: ["text-idle"], active: ["text-active"], disable: ["text-disable"] }

      const menuStyles = new MenuStyles(itemStyles, textStyles)
      const menuItem = new MenuItemState({ id: "1", title: "Item", styles: menuStyles })

      expect(menuItem.getStyles()).toEqual({
        item: itemStyles,
        text: textStyles,
      })
    })

    test("setStyles should update the styles object in MenuStyles", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item" })

      const newStyles = new MenuStyles(
        { idle: ["new-item-idle"], active: ["new-item-active"], disable: ["new-item-disable"] },
        { idle: ["new-text-idle"], active: ["new-text-active"], disable: ["new-text-disable"] }
      )
      menuItem.setStyles(newStyles)

      expect(menuItem.getStyles()).toEqual({
        item: newStyles.getStyles().item,
        text: newStyles.getStyles().text,
      })
    })
  })

  describe("State manipulation methods", () => {
    test("setActive should set isActive to true", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item" })
      menuItem.setActive()
      expect(menuItem.isActive()).toBe(true)
    })

    test("reset should set isActive to false", () => {
      const menuItem = new MenuItemState({ id: "1", title: "Item", isActive: true })
      menuItem.reset()
      expect(menuItem.isActive()).toBe(false)
    })
  })
})

/**
 * must throw error if callback is not a function
 * test getters and setters
 * hasChildren()
 *  - this._children.length > 0 should return true
 *  - this._children.length < 0 should return false
 * setChildren(children)
 *  - empty object passed should throw an error
 *  - children with proper object must set the this._children
 * reset() must set this._isActive false
 * getStyles() must return the styles
 */
