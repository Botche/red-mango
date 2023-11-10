import MenuItemModel from "./MenuItemModel";

type CartItemModel = {
  id?: string;
  menuItemId?: string;
  menuItem?: MenuItemModel;
  quantity?: number;
};

export default CartItemModel;
