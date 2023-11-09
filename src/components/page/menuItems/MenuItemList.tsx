import { useSelector } from "react-redux";
import { MenuItemModel } from "../../../interfaces";
import MenuItemCard from "./MenuItemCard";
import { RootState } from "../../../storage/redux/store";

function MenuItemList() {
  const menuItems = useSelector(
    (state: RootState) => state.menuItemStore.menuItem
  );

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem: MenuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
}

export default MenuItemList;
