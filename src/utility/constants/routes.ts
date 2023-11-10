const ROUTES = {
  home: "/",

  shoppingCart: "/shopping-cart",

  login: "/login",
  register: "/register",

  payment: "/payment",

  orderConfirmed: "/order/confirmed/:id",
  orderDetails: "/order/details/:id",
  myOrders: "/order/mine",
  allOrders: "/order/all",
  orderFailed: "order/failed",

  menuItemsList: "/menu-item/list",
  menuItemDetails: "/menu-item/details/:menuItemId",
  createMenuItem: "/menu-item/create",
  updateMenuItem: "/menu-item/update/:id?",

  accessDenied: "/access-denied",

  default: "*",
};

export default ROUTES;
