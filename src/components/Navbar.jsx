import { useLocation , useNavigate} from "react-router-dom"

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route) => {
    return location.pathname === route;
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 h-[60px] ">
      <header className="flex justify-between items-center max-w-7xl mx-auto  ">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 ">
            <li
              className={`cursor-pointer py-3 text-sm font-bold text-gray-400 border-b-[3px] border-b-transparent ${isActive("/") && "text-black border-b-red-400 "} `}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={` cursor-pointer py-3 text-sm font-bold text-gray-400 border-b-[3px] border-b-transparent ${isActive("/offers") && "text-black border-b-red-400"} `}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-bold text-gray-400 border-b-[3px] border-b-transparent ${isActive("/signing") && "text-black border-b-red-400   "} `}
              onClick={() => navigate("/signing")}
            >
              SignIn
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};


export default Navbar