import React , {useState, useEffect} from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectItems, removeCart } from "../../feature/cartSlice";
import { selectUser, removeUser } from "../../feature/userSlice";
import {navLiks} from "./NavList"



const Navbar : React.FC = () => {
  const userDetails = useSelector(selectUser);
  const cartItem = useSelector(selectItems);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState<Boolean>(false);


  useEffect(() => {
    handlerNavbar();
  }, [location.pathname]);

  const handlerNavbar = () => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handlerLogOut = (e : any ) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(
      removeUser({
        name: "",
        email: "",
      })
    );

    dispatch(
      removeCart({
        items: [],
      })
    );

    navigate("/");
  };


  return (
<>
      <div className={`z-50 fixed top-0 left-0 right-0 ${navbar && "hidden"}`}>
        <div
          className="flex justify-between bg-amazon_blue w-full
        px-3 py-2 "
        >
          <div className="w-24 ">
            <Link to="/">
              <img
                src="https://links.papareact.com/f90"
                alt=""
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          {/* center */}
          <div className="px-3 flex-grow ">
            <div
              className="flex bg-yellow-400 rounded-sm overflow-hidden
            items-center cursor-pointer hover:bg-yellow-500"
            >
              <input
                type="text"
                placeholder="Search product name..."
                className="w-full outline-none placeholder:text-gray-500 p-2
                px-3
                "
              />
              <MagnifyingGlassIcon className="h-6 w-14" />
            </div>
          </div>

          {/* right */}

          <div className="flex justify-between text-white space-x-6 whitespace-nowrap text-xs">
            <div className="link relative group">
              <p className="text-xs">
                Hello, 
                {userDetails.name ? userDetails?.name : "sign in"}
              </p>
              <p className="md:text-sm font-extrabold">Account & Lists</p>

              <div className="absolute top-10 bg-white group-hover:opacity-100 opacity-0 p-3 w-fit rounded-sm">
                {!userDetails?.name ? (
                  <button className="button">
                    <Link to="/register" className="text-black">
                      Sign in
                    </Link>
                  </button>
                ) : (
                  <button className="button text-black" onClick={handlerLogOut}>
                    Log Out
                  </button>
                )}

              </div>
            </div>

            <div>
              <Link to="/orders-history" className="link">
                <p>Returns</p>
                <p className="md:text-sm font-extrabold">& Orders</p>
              </Link>
            </div>

            <div className="link">
              <span
                className="absolute top-2 bg-yellow-400 text-black text-center
            font-bold w-4 h-4 rounded-full right-10 z-10"
              >
                {cartItem?.length}
              </span>

              <Link to="/cart" className="flex items-end relative">
                <ShoppingCartIcon className="h-9 w-9" />
                <p className="hidden md:inline md:text-sm font-extrabold ">
                  Cart
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div
          className="flex bg-amazon_blue-light w-full
        px-3 text-white space-x-6 py-2"
        >
          <div className="flex space-x-1 items-center link">
            <Bars3Icon className="h-6 w-6" />
            <p className="">All</p>
          </div>

          {navLiks.map((link, index) => (
            <p className="navlinks" key={index}>
              {link.title}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
