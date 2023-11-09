import { Fragment, useState } from "react";
import { withAdminAuth } from "../../hoc";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader } from "../../components/page/common";
import { inputHelper } from "../../helpers";
import { OrderStatuses } from "../../utility/constants";

const statusFilterOptions = [
  "All",
  OrderStatuses.CONFIRMED,
  OrderStatuses.BEING_COOKED,
  OrderStatuses.READY_FOR_PICKUP,
  OrderStatuses.CANCELLED,
];

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  const [filters, setFilters] = useState({
    searchString: "",
    status: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(event, filters);
    setFilters(tempValue);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
        <h1 className="text-success">Orders List</h1>

        <div className="d-flex" style={{ width: "40%" }}>
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Search Name, Email or Phone"
            name="searchString"
            value={filters.searchString}
            onChange={handleChange}
          />
          <select
            name="status"
            className="form-select w-50 mx-2"
            onChange={handleChange}
          >
            {statusFilterOptions.map((item, index) => (
              <option value={item === "All" ? "" : item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <button className="btn btn-outline-success">Filter</button>
        </div>
      </div>
      <OrderList orderData={data.result} />
    </Fragment>
  );
}

export default withAdminAuth(AllOrders);
