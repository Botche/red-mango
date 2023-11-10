import { useState } from "react";

type PaginationOptions = {
  pageNumber: number;
  pageSize: number;
};

type PaginationProps = {
  pageOptions: PaginationOptions;
  setPageOptions: (pageOptions: PaginationOptions) => void;
  totalRecords: number;
};

function Pagination({
  pageOptions,
  setPageOptions,
  totalRecords,
}: PaginationProps) {
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);

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
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber - 1,
      });
    } else if (direction === "next") {
      setPageOptions({
        pageSize: currentPageSize,
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

  return (
    <div className="d-flex mx-5 mb-4 justify-content-end align-items-center">
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
        disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
        className="btn btn-outline-primary px-3 mx-2"
        onClick={() => handlePaginationClick("next")}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
