import MenuItemModel from "./MenuItemModel";

export default interface CartItemModel {
  id?: string;
  menuItemId?: string;
  menuItem?: MenuItemModel;
  quantity?: number;
}
