import React, { useState, useEffect } from "react";
import Banner from "../components/Home/Banner";
import ProductsCard from "../components/Home/ProductsCard";

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




const Home = () => {
    const [products, setProducts] = useState<IProduct[]>();
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      };
      fetchProducts();
    }, []);




  return (
    <>
    <>
      <div className="mx-auto max-w-screen-2xl relative top-16 mt-8">
        <Banner />

        <div className="md:-mt-72">
          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products
              ?.map((product , index) => (
                <ProductsCard product={product} key={index}/>
              ))
              .slice(0, 4)}
          </div>

          <div className="w-full h-full">
            <img
              src="https://links.papareact.com/dyz"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-flow-row-dense md:col-span-2">
          {products
            ?.map((product, index) => (
              <ProductsCard product={product} key={product?.id} />
            ))
            .slice(4, 5)}
        </div>

        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products
            ?.map((product, index) => (
              <ProductsCard product={product} key={product?.id} />
            ))
            .slice(5, products?.length)}
        </div>

      </div>
    </>
      
    </>
  )
}

export default Home
