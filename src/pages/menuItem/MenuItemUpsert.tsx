import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { inputHelper, toastNotify } from "../../helpers";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
} from "../../apis/menuItemApi";
import { MainLoader } from "../../components/page/common";

const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};

function MenuItemUpsert() {
  const navigate = useNavigate();
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [isLoading, setIsLoading] = useState(false);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState(
    "https://via.placeholder.com/150"
  );

  const [createMenuItem] = useCreateMenuItemMutation();

  const { id } = useParams();
  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };

      setMenuItemInputs(tempData);
      setImageToDisplay(data.result.imageUrl);
    }
  }, [data]);

  const handleMenuItemInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempData = inputHelper(event, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const imageType = file.type.split("/")[1];
      const validImageTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImageTypes.some(
        (type) => type === imageType
      );

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less than 1 MB", "error");

        return;
      } else if (!isImageTypeValid) {
        setImageToStore("");
        toastNotify("File Must be jpeg, jpg or png", "error");

        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);

      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImageToDisplay(imageUrl);
      };
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!imageToStore) {
      toastNotify("Please upload an image", "error");
      setIsLoading(false);

      return;
    }

    const formData = new FormData();
    formData.append("name", menuItemInputs.name);
    formData.append("description", menuItemInputs.description);
    formData.append("specialTag", menuItemInputs.specialTag);
    formData.append("category", menuItemInputs.category);
    formData.append("price", menuItemInputs.price);
    formData.append("imageFile", imageToStore);

    const response = await createMenuItem(formData);
    if (response) {
      setIsLoading(false);
      navigate("/menuItem/menuItemList");
    }

    setIsLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {isLoading && <MainLoader />}
      <h3 className="px-2 text-success">Add Menu Item</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              rows={10}
              name="description"
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFileChange}
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Submit
                </button>
              </div>
              <div className="col-6">
                <NavLink
                  to="/menuItem/menuItemList"
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt="Uploaded file"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
