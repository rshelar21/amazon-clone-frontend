import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { selectItems, totalPrice } from "../feature/cartSlice";
import CartProdocts from "../components/Cart/CartProdocts";
import axios from "../axios";
import { selectUser } from "../feature/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import {addToCart} from "../feature/cartSlice"
import {toastWarning} from "../components/common/Toastify"
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

interface IProduct {
  category : string,
  description : string,
  id : number,
  image : string,
  price : number,
  title : string
  rating : {
      rate : number,
      count : number
  }
}

const Cart = () => {
  const cartItem : IProduct[] = useSelector(selectItems);
  const productTotal = useSelector(totalPrice);
  const userDetails = useSelector(selectUser);
  const navigate = useNavigate()
  const dispatch = useDispatch();



  const handlerBuy = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const stripe : any = await stripePromise;
      if (cartItem.length === 0) {
        return;
      }

      const res = await axios.post(
        "/create-checkout-session",
        {
          items: cartItem,
          email: userDetails.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
      console.log(result);
      console.log('caaaaaaaaa');
      dispatch(addToCart({
        items : []
      }))

      
    } catch (error : any) {
      console.log(error);
      if(error?.response?.data?.message === "token expired"){
        toastWarning("Please login again")
        localStorage.removeItem("token")
        navigate("/login")
      }
    }
  };

  return (
    <>
      <div className="relative top-16 mt-8 p-3">
        <div className="grid grid-cols-10 gap-4">
          <div className="bg-white px-4 py-5 col-span-7">
            <div className="pb-2 border-b">
              <h2 className="text-3xl">Shopping Cart</h2>
              <span className="text-amazon_blue-blue text-sm hover:underline cursor-pointer">
                Deselect all items
              </span>
            </div>

            <div>
              {cartItem.map((item, index) => (
                <CartProdocts product={item} key={index} />
              ))}
            </div>
          </div>

          <div className="px-4 py-5 col-span-3 bg-white h-fit sticky top-28">
            <div>
              <h3 className="text-lg">
                Subtotal ({cartItem?.length} items){" "}
                <span className="text-black font-medium">
                  Rs. : {productTotal.toFixed(2)}
                </span>
              </h3>

              <button className="button w-full mt-2" onClick={handlerBuy}>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
