import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MenuItemModel } from "../../../types";
import MenuItemCard from "./MenuItemCard";
import { RootState } from "../../../storage/redux/store";
import { SortingTypes } from "../../../utility/enums";

const sortOptions: SortingTypes[] = [
  SortingTypes.NAME_A_Z,
  SortingTypes.NAME_Z_A,
  SortingTypes.PRICE_LOW_HIGH,
  SortingTypes.PRICE_HIGH_LOW,
];

function MenuItemList() {
  const { search: searchValue, menuItem: data } = useSelector(
    (state: RootState) => state.menuItemStore
  );
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>(data);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [sort, setSort] = useState(SortingTypes.NAME_A_Z);

  useEffect(() => {
    if (data) {
      const tempMenuArray = handleFilters(selectedCategory, searchValue, sort);
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

        const tempMenuArray = handleFilters(localCategory, searchValue, sort);
        setMenuItems(tempMenuArray);

        return;
      }

      button.classList.remove("active");
    });
  };

  const handleFilters = (
    category: string,
    search: string,
    sortType: SortingTypes
  ) => {
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

    switch (sortType) {
      case SortingTypes.PRICE_LOW_HIGH:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) => a.price - b.price
        );
        break;
      case SortingTypes.PRICE_HIGH_LOW:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) => b.price - a.price
        );
        break;
      case SortingTypes.NAME_A_Z:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) =>
            a.name.toUpperCase().charCodeAt(0) -
            b.name.toUpperCase().charCodeAt(0)
        );
        break;
      case SortingTypes.NAME_Z_A:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) =>
            b.name.toUpperCase().charCodeAt(0) -
            a.name.toUpperCase().charCodeAt(0)
        );
        break;
    }

    return tempMenuItems;
  };

  const handleSortClick = (sortIndex: number) => {
    setSort(sortOptions[sortIndex]);

    const tempMenuArray = handleFilters(
      selectedCategory,
      searchValue,
      sortOptions[sortIndex]
    );
    setMenuItems(tempMenuArray);
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
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sort}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortOption, index) => (
                <li
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => handleSortClick(index)}
                >
                  {sortOption}
                </li>
              ))}
            </ul>
          </li>
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
