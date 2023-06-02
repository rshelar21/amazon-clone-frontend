import React from "react";

interface Props {
    productImage: string;
}

const ImageCard : React.FC<Props> = ({ productImage }) => {
  return (
    <>
      <div className="h-[200px] w-[200px]">
        <img
          src={productImage}
          alt="img"
          className="object-contain h-full w-full"
        />
      </div>
    </>
  );
};

export default ImageCard;
