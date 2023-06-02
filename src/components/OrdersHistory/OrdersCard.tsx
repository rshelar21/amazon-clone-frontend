import React from "react";
import ImageCard from "../common/ImageCard";

interface IProduct {
    image : string,
    title : string,
}

interface Props {
    product : IProduct
}


const OrdersCard : React.FC<Props> = ({product}) => {
  return (
    <>
      <div className="flex flex-col w-[200px] p-2 border items-center">
        <div className="h-[150px] w-[150px]">
        <img
          src={product.image}
          alt="img"
          className="object-contain h-full w-full"
        />
      </div>
        <div>
            <h3 className="text-black text-base line-clamp-2">
              {product?.title}
            </h3>
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
