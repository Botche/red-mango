import { withAdminAuth } from "../hoc";

function AuthenticationTestAdmin() {
  return <div>This page can be accessed by admin</div>;
}

export default withAdminAuth(AuthenticationTestAdmin);
