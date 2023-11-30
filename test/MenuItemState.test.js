/**
 * © Maleesha Gimshan - 2023 - github.com/maleeshagimshan98
 * Menu Item State Tests
 */

import MenuItemState from "../src/MenuItemState";

describe("MenuItemState", () => {
    let menuItemState = new MenuItemState({callback : () => {}})

    test("Initialization of the class", () => {
        expect(menuItemState).toBeInstanceOf(MenuItemState)
    } )
})