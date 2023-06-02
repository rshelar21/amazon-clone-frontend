import React, {useState} from 'react'
import { StarIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectItems } from "../../feature/cartSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

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

const ProductsCard : React.FC<Props> = ({product}) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(selectItems);
    const [rating] = useState<number>(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
      );
      const [hasPrime] = useState<boolean>(Math.random() < 0.5);
      const handleraAddCart = (e : React.MouseEvent<HTMLButtonElement>) => {
        const productData = [...cartItem, product]
        dispatch(addToCart({
          items : productData
        }));
      }
   ;

  return (
<>
      <div className="relative flex flex-col bg-white p-5 m-5 z-30">
        <p className="text-right pb-1 text-xs italic text-gray-400">
          {product?.category}
        </p>

        <div className="w-[200px] h-[200px] mx-auto">
          <img
            src={product?.image}
            alt="product-img"
            className="w-full h-full object-contain"
          />
        </div>
        <h4 className="my-3">{product?.title}</h4>

        <div className="flex">
          {Array<number>(rating)
            .fill(0) 
            .map((_, i) => (
              <StarIcon className="h-4  text-yellow-400" key={i}/>
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-2">{product?.description}</p>

        <p className="mb-2 text-sm">Rs. {product?.price}</p>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <div className="w-10">
              <img
                src="/assets/prime.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-gray-500 text-xs">FREE Next-Day Delivery</p>
          </div>
        )}

        <button className="button mt-auto" onClick={handleraAddCart}>
          Add to basket
        </button>
      </div>
    </>
  )
}

export default ProductsCard
