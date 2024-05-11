import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineLogout } from "react-icons/hi";

const VerticalNavbar = ({ userName }) => {
  const navigate = useNavigate();
  // LogOut function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
        toast("Sign-out successful.");
      })
      .catch((error) => {
        toast.error("opps ! error occurs ...");
      });
  };
  return (
    <nav className="w-1/6  flex flex-col text-center bg-[#ebf1f1] mr-2">
      <div className=" flex items-center justify-center p-4 w-full bg-[#96002e] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#96200e]">
        {userName}
      </div>

      <div className="border-b-2  border-gray-300">
        <ul className="w-full">
          <li className="flex flex-col w-full p-2">
            <NavLink
              to={"/Admin/Product"}
              className={({ isActive }) =>
                `p-2 mt-4 w-full bg-[#ebf1f1] text-[#96002e] hover:bg-[#ffffff] hover:text-[#96002e] ${
                  isActive ? `bg-[#ffffff] text-[#96002e]` : null
                } `
              }
            >
              Products
            </NavLink>
            {/* <NavLink
              to={"/UsersProfilePage/SavedAddresspage"}
              className={({ isActive }) =>
                `p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e] ${
                  isActive ? `bg-[#ffffff] text-[#96200e]` : null
                } `
              }
            >
              Saved Addresses
            </NavLink> */}
          </li>
        </ul>
      </div>
      <div className="flex items-end h-full">
        <ul className="w-full">
          <li className="flex flex-col w-full p-2">
            <NavLink
              onClick={handleLogout}
              className=" flex items-center justify-center p-2 mt-4 w-full bg-[#96002e] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#96200e]"
            >
              {"Log Out"} <HiOutlineLogout />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { VerticalNavbar };
