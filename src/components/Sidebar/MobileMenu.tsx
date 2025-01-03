import { FaRegNewspaper, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../Redux/reducers/userSlice";

const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(setAuthenticated(false));
    localStorage.removeItem("token");
    toast.success("Logout successfully");
    navigate("/");
  }
  return (
    <div className="fixed top-[70px] left-[80px] w-auto shadow-md rounded-[8px] bg-red-300 p-2 max-lg:top-[80px] max-md:top-[55px] z-[99] max-720:block hidden">
      <div
        onClick={() => navigate("/home/feeds")}
        className="flex items-center gap-1 cursor-pointer"
      >
        <span>
          <FaRegNewspaper size={22} />
        </span>
        <p className="text-sm">Feed</p>
      </div>
      <div
        onClick={() => navigate("/home/profile")}
        className="flex items-center gap-1 cursor-pointer mt-3"
      >
        <span>
          <FaUserCircle size={22} />
        </span>
        <p className="text-sm">Profile</p>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center gap-1 cursor-pointer mt-3"
      >
        <span>
          <IoIosLogOut size={22} />
        </span>
        <p className="text-sm">Logout</p>
      </div>
    </div>
  );
};

export default MobileMenu;
