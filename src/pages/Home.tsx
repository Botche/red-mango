import { Banner } from "../components/page/common";
import { MenuItemList } from "../components/page/home";

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
