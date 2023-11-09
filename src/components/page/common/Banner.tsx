import { useState } from "react";
import { useDispatch } from "react-redux";

import "./Banner.css";
import { setSearchItem } from "../../../storage/redux/menuItemSlice";

function Banner() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = event.target.value;
    dispatch(setSearchItem(searchInputValue));
    setSearchValue(searchInputValue);
  };

  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{
          width: "400px",
          height: "50vh",
        }}
      >
        <div className="d-flex align-items-center" style={{ width: "100%" }}>
          <input
            type={"text"}
            className="form-control rounded-pill"
            style={{
              width: "100%",
              padding: "20px 20px",
            }}
            placeholder="Search for Food Items!"
            value={searchValue}
            onChange={handleChange}
          />
          <span style={{ position: "relative", left: "-43px" }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
