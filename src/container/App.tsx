import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components/layout";
import { Home, MenuItemDetails, NotFound } from "../pages";

function App() {
  return (
    <div className="">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
