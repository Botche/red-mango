import { useState } from "react";
import { inputHelper } from "../helpers";
import { ApiResponse } from "../interfaces";
import { useLoginUserMutation } from "../apis/authApi";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const [loginUser] = useLoginUserMutation();

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response: ApiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });

    if (response.data) {
      console.log(response.data);
    } else if (response.error) {
      console.log(response.error.data.errorMessages);
      setError(response.error.data.errorMessages[0]);
    }

    setIsLoading(false);
  };

  return (
    <div className="container text-center">
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
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
