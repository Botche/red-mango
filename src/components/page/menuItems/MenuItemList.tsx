import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MenuItemModel } from "../../../interfaces";
import { useGetMenuItemsQuery } from "../../../apis/menuItemApi";
import MenuItemCard from "./MenuItemCard";
import { setMenuItem } from "../../../storage/redux/menuItemSlice";
import { MainLoader } from "../common";

function MenuItemList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data?.result));
    }
  }, [isLoading, dispatch, data]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: MenuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
}

export default MenuItemList;
