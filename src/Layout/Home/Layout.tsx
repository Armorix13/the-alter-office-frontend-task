import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSideBar from "../../components/Sidebar/RightSideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUserDetail } from "../../Redux/reducers/userSlice";
import { useGetUserDetailsQuery } from "../../api";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: userData, isError } = useGetUserDetailsQuery();
  useEffect(() => {
    if (isError) {
      console.log("here", isError);
      navigate("/");
      dispatch(setAuthenticated(false));
    }
    if (userData) {
      console.log("user data", userData);
      dispatch(setAuthenticated(true));
      dispatch(setUserDetail(userData?.userExists));
    }
  }, [userData]);

  return (
    <div className="h-screen w-screen overflow-hidden flex gap-2 p-2">
      <div className="hidden lg:w-[20%] lg:block w-full">
        <Sidebar />
      </div>
      <div className="w-full lg:w-[65%] bg-[#ffffff] p-4 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <div className="hidden lg:w-[25%] lg:block w-full">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Layout;
