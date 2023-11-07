import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../apis/menuItemApi";
import { useNavigate } from "react-router-dom";

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center w-100">
        <div>Loading&hellip;</div>
      </div>
    );
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{data.result.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {data.result.description}
          </p>
          <span className="h3">${data.result.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
            <span className="h3 mt-3 px-3">XX</span>
            <i
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              <button className="btn btn-success form-control">
                Add to Cart
              </button>
            </div>

            <div className="col-5 ">
              <button
                className="btn btn-secondary form-control"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={data.result.imageUrl}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt={data.result.name}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;
