import { MenuItemModel } from "../../../interfaces";

interface MenuItemCardProps {
  menuItem: MenuItemModel;
}

function MenuItemCard(props: MenuItemCardProps) {
  return <div>{props.menuItem.name}</div>;
}

export default MenuItemCard;
