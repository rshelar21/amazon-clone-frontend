import React, {useState, useEffect} from "react";
import OrdersCards from "../components/OrdersHistory/OrdersCards";
import {selectUser} from "../feature/userSlice"
import {useSelector} from "react-redux";
import axios from "../axios";

interface IOrders {
  _id : string,
  products : [
    {
      image : string,
      title : string,
    }
  ],
  amount : number,
  address : string,
  paymentType : string,
  paymentStatus : string,
  createdAt : string,
  updatedAt : string
}

const OrdersHistory : React.FC = () => {
  const user = useSelector(selectUser);
  const [ordersData, setOrdersData] = useState<IOrders[]>([]);

  useEffect(() => {
    handlerGetOrders(user.id);
  }, [user])

  const handlerGetOrders = async (id : string) => {

    const res = await axios.post("/orders", {
      id : id
    });
    setOrdersData(res?.data?.product)
  }


  function dateFormat(date : string) {
    const newDate  = new Date(date).toLocaleDateString()
    return newDate;
  }


  return (
    <>
      <div className="relative top-16 mt-8 p-3">
        <div className="bg-white px-4 py-5 w-full max-w-5xl">
          <div className="pb-2 border-b">
            <h2 className="text-3xl">Order History</h2>
          </div>

          <div className="p-2">
          {
            ordersData?.map((item, index) => {
              return (
                <>
                <div key={index} className="border border-gray-300">
                  <div className="bg-gray-200 border border-gray-300 border-collapse
                  flex items-center space-x-3">
                    <div className="border-r border-gray-300 p-3 ">
                      <p>Order Placed</p>
                      <p>{dateFormat(item?.createdAt)}</p>
                    </div>
                    <div className="border-r border-gray-300 p-3">
                      <p>Total Amount</p>
                      <p>Rs.{item?.amount}</p>
                    </div>

                    <div className="border-gray-300 p-3 flex-grow">
                      <p className="text-blue-500 text-right">{item?.products.length} Items</p>
                    </div>
                  </div>

                  <div>
                    <OrdersCards products={item?.products}/>
                  </div>
                  <div className="p-2">
                    <h2 className="text-black text-2xl font-medium">
                      Payment Details :-
                    </h2>
                    <div className="flex ">
                      <div>
                      <p className="payment-details">Amount:- Rs. {item?.amount}</p>
                      <p className="payment-details line-clamp-2">Address:- {item?.address}</p>
                      <p className="payment-details">Payment Type:- {item.paymentType}</p>
                      <p className="payment-details">Payment Status:- {item?.paymentStatus}</p>
                      <p className="payment-details">Purchased Date:- {dateFormat(item?.createdAt)}</p>
                      <button className="button" >
                        Payment Successful !
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )
            })
          }

          {
            ordersData?.length === 0 && (
              <div className="flex justify-center">
                <h2 className="text-black text-lg font-semibold">No Orders Found</h2>
              </div>
            )
          }


          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersHistory;
