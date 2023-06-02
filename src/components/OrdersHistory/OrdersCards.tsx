import React from 'react'
import OrdersCard from './OrdersCard'

interface IProduct {
    image : string,
    title : string
}

interface Props {
    products : IProduct[]
}

const OrdersCards : React.FC<Props> = ({products}) => {
  return (
    <>
     <div className='flex p-1 space-x-2'>
     {
        products?.map((item, index) => (
            <OrdersCard product={item} key={index}/>
        ))
     }
     </div> 
    </>
  )
}

export default OrdersCards
