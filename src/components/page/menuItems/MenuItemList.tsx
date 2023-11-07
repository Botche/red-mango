import { useEffect, useState } from "react";
import { MenuItemModel } from "../../../interfaces";

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
  
  return <div>MenuItemList</div>;
}

export default MenuItemList;
