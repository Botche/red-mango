import { Banner } from "../components/page/common";
import { MenuItemList } from "../components/page/menuItems";

function Home() {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <MenuItemList />
      </div>
    </div>
  );
}

export default Home;
