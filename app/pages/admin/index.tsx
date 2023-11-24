import AdminComponent from "../../apps/admin/AdminComponent";
import { Loader, LoaderWrap } from "components/Loader/Loader";
import useAdmin from "hooks/useAdmin";

const Admin = () => {
  const isAdmin = useAdmin();

  if (!isAdmin) {
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    );
  }

  return <AdminComponent />;
};

export default Admin;
