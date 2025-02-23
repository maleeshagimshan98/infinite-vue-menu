import MenuStyles from '../src/MenuStyles';

describe('MenuStyles', () => {
  let menuStyles;

  beforeEach(() => {
    menuStyles = new MenuStyles();
  });

  test('should initialize with default styles', () => {
    const defaultStyles = {
      base: [],
      idle: [],
      active: [],
      disable: [],
      children: [],
    };

    expect(menuStyles.getStyles()).toEqual({
      item: defaultStyles,
      text: defaultStyles,
    });
  });

  test('should set styles correctly', () => {
    const itemStyles = {
      base: ['item-base'],
      idle: ['item-idle'],
      active: ['item-active'],
      disable: ['item-disable'],
      children: ['item-children'],
    };

    const textStyles = {
      base: ['text-base'],
      idle: ['text-idle'],
      active: ['text-active'],
      disable: ['text-disable'],
      children: ['text-children'],
    };

    menuStyles.setStyles(itemStyles, textStyles);

    expect(menuStyles.getStyles()).toEqual({
      item: itemStyles,
      text: textStyles,
    });
  });

  test('should set default styles if any property is not set', () => {
    const itemStyles = {
      base: ['item-base'],
      idle: ['item-idle'],
    };

    const defaultStyles = {
      base: [],
      idle: [],
      active: [],
      disable: [],
      children: [],
    };

    menuStyles.setStyles(itemStyles, null);

    expect(menuStyles.getStyles().item).toEqual({
      ...defaultStyles,
      base: ['item-base'],
      idle: ['item-idle'],
    });

    expect(menuStyles.getStyles().text).toEqual(defaultStyles);
  });

  test('should warn if styles object does not have a required property', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const incompleteStyles = {
      base: ['item-base'],
    };

    menuStyles.setStyles(incompleteStyles, null);

    expect(warnSpy).toHaveBeenCalledWith(
      'Infinite-Vue-Menu : Warning - Cannot set the styles. Styles object does not have a property idle'
    );

    warnSpy.mockRestore();
  });

  test('should assign style values correctly', () => {
    const styles = {
      base: ['base-style'],
      idle: ['idle-style'],
      active: ['active-style'],
      disable: ['disable-style'],
      children: ['children-style'],
    };

    const assignedStyles = menuStyles._assignStyleValues(styles);

    expect(assignedStyles).toEqual(styles);
  });

  test('should return default style object', () => {
    const defaultStyles = {
      base: [],
      idle: [],
      active: [],
      disable: [],
      children: [],
    };

    expect(menuStyles._getDefaultStyleObj()).toEqual(defaultStyles);
  });

  test('should set default styles', () => {
    menuStyles._setDefaultStyles();

    const defaultStyles = {
      base: [],
      idle: [],
      active: [],
      disable: [],
      children: [],
    };

    expect(menuStyles.getStyles()).toEqual({
      item: defaultStyles,
      text: defaultStyles,
    });
  });
});