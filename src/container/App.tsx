import { useEffect, useState } from "react";
import { Header, Footer } from "../components/layout";
import { MenuItemModel } from "../interfaces";

function App() {
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
    <div className="">
      <Header />
      Main Component
      <Footer />
    </div>
  );
}

export default App;
