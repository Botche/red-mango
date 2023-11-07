import { useEffect, useState } from "react";
import { MenuItemModel } from "../../../interfaces";
import MenuItemCard from "./MenuItemCard";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);

  useEffect(() => {
    fetch("https://redmangoapidotnet.azurewebsites.net/api/MenuItem")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data.result);
      });
  }, []);

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem, index) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
}

export default MenuItemList;
