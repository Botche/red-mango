import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MenuItemModel } from "../../../interfaces";
import MenuItemCard from "./MenuItemCard";
import { RootState } from "../../../storage/redux/store";

function MenuItemList() {
  const { search: searchValue, menuItem: data } = useSelector(
    (state: RootState) => state.menuItemStore
  );
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>(data);

  useEffect(() => {
    if (data) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue, data]);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data];

    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item: MenuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempMenuItems;
  };

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
