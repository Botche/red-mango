import { jwtDecode } from "jwt-decode";
import { Roles } from "../utility/enums";
import { GLOBAL_CONSTANTS, ROUTES } from "../utility/constants";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem(GLOBAL_CONSTANTS.tokenKey) ?? "";

    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);

      if (decode.role !== Roles.ADMIN) {
        window.location.replace(ROUTES.accessDenied);
        return null;
      }
    } else {
      window.location.replace(ROUTES.login);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
