import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, selectItems } from "../../feature/cartSlice";
import ImageCard from "../common/ImageCard";

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

interface Props {
    product : IProduct
}

const CartProdocts : React.FC<Props> = ({ product }) => {
  const cartItems : IProduct[] = useSelector(selectItems);
  const dispatch = useDispatch();


  const handlerRemoveItem = async (e : React.MouseEvent<HTMLButtonElement>, id : number) => {
    const index = await cartItems.findIndex((item) => item.id === id);
    const newBasket = [...cartItems];
    if (index >= 0) {
      newBasket.splice(index, 1);
    } else {
      console.warn(`Can't remove product (id: ${id}) as its not in basket!`);
    }

    dispatch(
      removeCart({
        items: newBasket,
      })
    );
  };

  return (
    <>
      <div className="py-2 border-b">
        <div className="flex items-start space-x-3">
          <ImageCard productImage={product?.image}/>

          <div className="flex items-start justify-between w-full">
            <div>
              <h3 className="text-black text-xl">{product?.title}</h3>
              <span className="">In stock</span>
              <div className="">
                <StarIcon className="h-5 text-yellow-400" />
              </div>
              <p className="text-xs my-2 line-clamp-3">
                {product?.description}
              </p>
              <h3 className="mb-2 text-lg text-black font-medium">
                Rs. {product?.price}
              </h3>
            </div>

            <div className="">
              <button
                className="whitespace-nowrap button"
                onClick={(e) => handlerRemoveItem(e, product?.id)}
              >
                Remove from cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProdocts;
