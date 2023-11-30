import MenuState from "../src/MenuState"
import MenuItemState from "../src/MenuItemState"
import MenuStyles from "../src/MenuStyles"

describe("MenuState", () => {
  let items
  let styles

  beforeEach(() => {
    // Set up sample data for testing
    items = {
      item1: { id: "item1", title: "Item 1", callback: jest.fn() },
      item2: {
        id: "item2",
        title: "Item 2",
        children: { subItem1: { id: "subItem1", title: "Sub Item 1" } },
      },
    }

    styles = {
      item: { idle: ["item-idle"], active: ["item-active"], disable: ["item-disable"] },
      text: { idle: ["text-idle"], active: ["text-active"], disable: ["text-disable"] },
    }
  })

  describe("Constructor", () => {
    test("should initialize MenuState with default values", () => {
      const menuState = new MenuState(items)

      expect(menuState.isMenuActive()).toBe(false)
      expect(menuState.getActiveItemState()).toBeUndefined()

      // Ensure items are initialized correctly
      const menuItems = menuState.getMenuItems()
      expect(menuItems).toBeDefined()
      expect(menuItems.item1).toBeInstanceOf(MenuItemState)
      expect(menuItems.item2).toBeInstanceOf(MenuItemState)
    })

    test("should initialize MenuState with styles", () => {
      const menuState = new MenuState(items, styles)

      // Ensure styles are set correctly
      expect(menuState._styles.getStyles()).toEqual(styles)
    })

    test("_initialize() properly creates the stateTree", () => {
      const menuState = new MenuState(items)
      const stateTree = menuState._initialize(items)

      expect(stateTree).toBeDefined()
      expect(stateTree.item1).toBeInstanceOf(MenuItemState)
      expect(stateTree.item2).toBeInstanceOf(MenuItemState)
      expect(stateTree.item2.getChildren().subItem1).toBeInstanceOf(MenuItemState)
    })
  })

  describe("getMenuItemsById", () => {
    test("should return MenuItemState by id", () => {
      const menuState = new MenuState(items)
      const menuItem = menuState.getMenuItemsById("item1")

      expect(menuItem).toBeInstanceOf(MenuItemState)
      expect(menuItem.id).toBe("item1")
    })

    test("should throw an error for non-existing id", () => {
      const menuState = new MenuState(items)

      expect(() => menuState.getMenuItemsById("nonExistingId")).toThrowError()
    })
  })

  describe("setActiveItemState", () => {
    test("should set active item and reset others", () => {
      const menuState = new MenuState(items)
      const activeItem = menuState.getMenuItemsById("item1")
      menuState.setActiveItemState(activeItem)

      expect(menuState.getActiveItemState()).toBe(activeItem)

      // Check if other items are reset
      const menuItems = menuState.getMenuItems()
      Object.values(menuItems).forEach((item) => {
        if (item !== activeItem) {
          expect(item.isActive()).toBe(false)
        }
      })
    })
  })

  describe("openMenu", () => {
    test("should open the menu and set this._isMenuActive to true", () => {
      const menuState = new MenuState(items)
      menuState.openMenu()

      expect(menuState.isMenuActive()).toBe(true)
    })
  })

  describe("closeMenu", () => {
    test("should close the menu, set this._isMenuActive to false, and reset all this._items MenuItemStates", () => {
      const menuState = new MenuState(items)
      menuState.openMenu()
      const activeItem = menuState.getMenuItemsById("item1")
      menuState.setActiveItemState(activeItem)

      menuState.closeMenu()

      expect(menuState.isMenuActive()).toBe(false)
      expect(menuState.getActiveItemState()).toBeUndefined()

      // Check if all items are reset
      const menuItems = menuState.getMenuItems()
      Object.values(menuItems).forEach((item) => {
        expect(item.isActive()).toBe(false)
      })
    })
  })

  describe("toggleMenu", () => {
    test("should toggle the menu status true and false and reset all this._items MenuItemStates when closing", () => {
      const menuState = new MenuState(items)

      // Toggle to open
      menuState.toggleMenu()
      expect(menuState.isMenuActive()).toBe(true)

      // Toggle to close
      menuState.toggleMenu()
      expect(menuState.isMenuActive()).toBe(false)

      // Check if all items are reset when closing
      const menuItems = menuState.getMenuItems()
      Object.values(menuItems).forEach((item) => {
        expect(item.isActive()).toBe(false)
      })
    })
  })

  describe("getActiveItemState", () => {
    test("should return the state of the active menu item", () => {
      const menuState = new MenuState(items)
      const activeItem = menuState.getMenuItemsById("item1")
      menuState.setActiveItemState(activeItem)

      const result = menuState.getActiveItemState()

      expect(result).toBe(activeItem)
    })
  })
})

/**
 * initializing the instance
 * _initialize() properly creates the stateTree
 * getters and setters
 * openMenu() set this._isMenuActive true
 * closeMenu() set this._isMenuActive false, resets all the this._items MenuItemStates
 * toggleMenu() toggle the this._isMenuActive true and false and resets all the this._items MenuItemStates when closing
 */
