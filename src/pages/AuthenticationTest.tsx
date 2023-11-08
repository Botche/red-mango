import { withAuth } from "../hoc";

function AuthenticationTest() {
  return <div>This page can be accessed by any logged in user</div>;
}

export default withAuth(AuthenticationTest);
