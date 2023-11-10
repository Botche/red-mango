import { Fragment, useState, useEffect } from "react";
import { withAdminAuth } from "../../hoc";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import { OrderList } from "../../components/page/order";
import { MainLoader, Pagination } from "../../components/page/common";
import { inputHelper } from "../../helpers";
import { OrderStatuses } from "../../utility/enums";

const statusFilterOptions = [
  "All",
  OrderStatuses.CONFIRMED,
  OrderStatuses.BEING_COOKED,
  OrderStatuses.READY_FOR_PICKUP,
  OrderStatuses.CANCELLED,
];

function AllOrders() {
  const [ordersData, setOrdersData] = useState([]);
  const [filters, setFilters] = useState({
    searchString: "",
    status: "",
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  useEffect(() => {
    if (data) {
      setOrdersData(data.apiResponse.result);

      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(event, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
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

          <button className="btn btn-outline-success" onClick={handleFilters}>
            Filter
          </button>
        </div>
      </div>
      <OrderList orderData={ordersData} />

      <Pagination
        pageOptions={pageOptions}
        setPageOptions={setPageOptions}
        totalRecords={totalRecords}
      />
    </Fragment>
  );
}

export default withAdminAuth(AllOrders);
