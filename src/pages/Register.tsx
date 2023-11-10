import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputHelper, toastNotify } from "../helpers";
import { useRegisterUserMutation } from "../apis/authApi";
import { ApiResponse } from "../types";
import { MainLoader } from "../components/page/common";
import { MESSAGES, ROUTES } from "../utility/constants";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const response: ApiResponse = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      password: userInput.password,
    });

    if (response.data) {
      toastNotify(MESSAGES.registrationSuccessfully);
      navigate(ROUTES.login);
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="container text-center">
      {isLoading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
