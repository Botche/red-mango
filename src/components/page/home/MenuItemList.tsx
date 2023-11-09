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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const tempMenuArray = handleFilters(selectedCategory, searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue, data]);

  useEffect(() => {
    const tempCategoryList = ["All"];
    data.forEach((item: MenuItemModel) => {
      if (!tempCategoryList.includes(item.category)) {
        tempCategoryList.push(item.category);
      }
    });

    setCategoryList(tempCategoryList);
  }, [data]);

  const handleCategoryClick = (newIndex: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, buttonIndex) => {
      if (buttonIndex === newIndex) {
        button.classList.add("active");

        if (buttonIndex === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[buttonIndex];
        }

        setSelectedCategory(localCategory);

        const filteredMenuItems = handleFilters(localCategory, searchValue);
        setMenuItems(filteredMenuItems);

        return;
      }

      button.classList.remove("active");
    });
  };

  const handleFilters = (category: string, search: string) => {
    let tempMenuItems = [...data];

    if (category && category !== "All") {
      tempMenuItems = data.filter(
        (item: MenuItemModel) => item.category === category
      );
    }

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
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((category: string, index: number) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {menuItems.length > 0 &&
        menuItems.map((menuItem: MenuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
}

export default MenuItemList;
