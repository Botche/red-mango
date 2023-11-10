import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../storage/redux/store";
import { CartItemModel, UserModel } from "../../types";
import { Fragment } from "react";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../storage/redux/userAuthSlice";
import { Roles } from "../../utility/enums";
import { ROUTES } from "../../utility/constants";

const logo = require("../../assets/images/mango.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: CartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser(emptyUserState));
    navigate(ROUTES.home);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <NavLink className="nav-link" aria-current="page" to={ROUTES.home}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px" }}
            className="m-1"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={ROUTES.home}
              >
                Home
              </NavLink>
            </li>
            {userData.role && userData.role === Roles.ADMIN ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Panel
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      aria-current="page"
                      to={ROUTES.menuItemsList}
                    >
                      Menu Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      aria-current="page"
                      to={ROUTES.myOrders}
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      aria-current="page"
                      to={ROUTES.allOrders}
                    >
                      All Orders
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={ROUTES.myOrders}
                >
                  Orders
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={ROUTES.shoppingCart}
              >
                <i className="bi bi-cart"></i>&nbsp;
                {userData.id && `(${shoppingCartFromStore.length})`}
              </NavLink>
            </li>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              {userData.id ? (
                <Fragment>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      Welcome, {userData.fullName}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{ border: "none", height: "40px", width: "100px" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item text-white">
                    <NavLink className="nav-link" to={ROUTES.register}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white">
                    <NavLink
                      to={ROUTES.login}
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{ border: "none", height: "40px", width: "100px" }}
                    >
                      Login
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
