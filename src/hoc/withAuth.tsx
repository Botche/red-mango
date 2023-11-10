import { ROUTES } from "../utility/constants";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      window.location.replace(ROUTES.login);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
