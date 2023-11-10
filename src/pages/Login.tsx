import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inputHelper, toastNotify } from "../helpers";
import { ApiResponse, UserModel } from "../types";
import { useLoginUserMutation } from "../apis/authApi";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import { MainLoader } from "../components/page/common";
import { GLOBAL_CONSTANTS, MESSAGES, ROUTES } from "../utility/constants";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const response: ApiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });

    if (response.data) {
      const { token } = response.data.result!;
      localStorage.setItem(GLOBAL_CONSTANTS.tokenKey, token);

      const { fullName, email, id, role }: UserModel = jwtDecode(token);
      dispatch(setLoggedInUser({ fullName, email, id, role }));

      toastNotify(MESSAGES.loggedInSuccessfully);
      navigate(ROUTES.home);
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="container text-center">
      {isLoading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
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

        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
