import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components/layout";
import { Home, NotFound } from "../pages";

function App() {
  return (
    <div className="">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
