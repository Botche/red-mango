import { jwtDecode } from "jwt-decode";
import { Roles } from "../utility/constants";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);

      if (decode.role !== Roles.ADMIN) {
        window.location.replace("/accessDenied");
        return null;
      }
    } else {
      window.location.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;