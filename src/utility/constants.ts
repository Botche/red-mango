export enum Roles {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export enum OrderStatuses {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  BEING_COOKED = "Being Cooked",
  READY_FOR_PICKUP = "Ready for Pickup",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum Categories {
  APPETIZER = "Appetizer",
  ENTREE = "Entree",
  DESSERT = "Dessert",
  BEVERAGES = "Beverages",
}

export enum SortingTypes {
  PRICE_LOW_HIGH = "Price Low - High",
  PRICE_HIGH_LOW = "Price High - Low",
  NAME_A_Z = "Name A - Z",
  NAME_Z_A = "Name Z - A",
}
