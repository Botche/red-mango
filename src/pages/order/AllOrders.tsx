import { Fragment, useState, useEffect } from "react";
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
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
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

  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber} - ${
      dataEndNumber < totalRecords ? dataEndNumber : totalRecords
    } of ${totalRecords}`;
  };

  const handlePaginationClick = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setPageOptions({
        pageSize: 5,
        pageNumber: pageOptions.pageNumber - 1,
      });
    } else if (direction === "next") {
      setPageOptions({
        pageSize: 5,
        pageNumber: pageOptions.pageNumber + 1,
      });
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const pageSize = +event.target.value;
    setPageOptions({
      pageSize: pageSize,
      pageNumber: pageOptions.pageNumber,
    });
    setCurrentPageSize(pageSize);
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

      <div className="d-flex mx-5 justify-content-end align-items-center">
        <div>Rows per page:</div>
        <div>
          <select
            className="form-select mx-2"
            onChange={handlePageSizeChange}
            style={{
              width: "80px",
            }}
            value={currentPageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <button
          disabled={pageOptions.pageNumber === 1}
          className="btn btn-outline-primary px-3 mx-2"
          onClick={() => handlePaginationClick("prev")}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="mx-2">{getPageDetails()}</div>
        <button
          disabled={
            pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
          }
          className="btn btn-outline-primary px-3 mx-2"
          onClick={() => handlePaginationClick("next")}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </Fragment>
  );
}

export default withAdminAuth(AllOrders);
