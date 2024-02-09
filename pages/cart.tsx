import { apiUrl, getToken, getUserInfo } from "@/utils/config";
import { Button, Card, Tabs, TabsProps, Tag, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function cart() {
  const [pending, setPending] = useState<any>([]);
  const [completed, setCompleted] = useState<any>([]);
  const [canceled, setCanceled] = useState<any>([]);
  const { Meta } = Card;

  const userInfo = getUserInfo();
  const token = getToken();

  const completePayment = (bookId: number, quantity: number) => {
    axios({
      method: "post",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      url: `${apiUrl}order/complete`,
      data: {
        userId: userInfo?.id,
        bookId: [bookId],
        quantity: [quantity],
      },
    })
      .then(async (res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
        notification.open({
          message: "Error",
          description: "Couldn't complete Payment",
          type: "error",
        });
      });
  };

  const cancelOrder = (orderId: number) => {
    axios({
      method: "get",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      url: `${apiUrl}order/cancel/${orderId}`,
    })
      .then(async (res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
        notification.open({
          message: "Error",
          description: "Couldn't cancel order",
          type: "error",
        });
      });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Make all requests simultaneously
        const [responsePending, responseCompleted, responseCanceled] =
          await Promise.all([
            axios.get(`${apiUrl}order/list/${userInfo?.id}/pending`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${apiUrl}order/list/${userInfo?.id}/completed`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${apiUrl}order/list/${userInfo?.id}/canceled`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        // Update state with the responses
        setPending(responsePending.data.data);
        setCompleted(responseCompleted.data.data);
        setCanceled(responseCanceled.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // console.log("first --------->", pending, completed, canceled);

  return (
    <div className=" flex flex-col justify-center items-start ">
      <Tabs
        className=" w-full min-h-[500px] md:min-h-[755px] bg-white p-10"
        defaultActiveKey="1"
        // activeKey={"2"}
        items={[
          {
            key: "1",
            label: <h1>Pending Orders</h1>,
            children: (
              <div className="grid md:grid-cols-4">
                {pending[0]?.book.map((value: any, index: number) => {
                  return (
                    <div className=" col-span-1 m-4" key={index}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt="book image"
                            // src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
                            src={value.coverImage}
                          />
                        }
                      >
                        <Meta
                          title={value.title}
                          description={
                            <div className="">
                              <p className=" flex">
                                <span className=" font-bold mr-2">Writer:</span>
                                {value.writer}
                              </p>
                              <p className=" flex">
                                <span className=" font-bold mr-2">price:</span>
                                {value.point}
                              </p>
                              <p className=" flex">
                                <span className=" font-bold mr-2">tag:</span>
                                {value.tags.map((chip: string) => {
                                  return <Tag color="lime">{chip}</Tag>;
                                })}
                              </p>
                              <p className="flex">
                                <span className=" font-bold mr-2">
                                  Quantity:
                                </span>
                                {pending[0]?.quantity[index]}
                              </p>

                              <Button
                                type="primary"
                                className="w-full mt-3 bg-[#1677ff]"
                                onClick={() =>
                                  completePayment(
                                    value.id,
                                    pending[0]?.quantity[index]
                                  )
                                }
                              >
                                Procced to Payment
                              </Button>
                            </div>
                          }
                        />
                      </Card>
                    </div>
                  );
                })}
              </div>
            ),
          },
          {
            key: "2",
            label: <h1>Completed Orders</h1>,
            children: (
              <div className="grid md:grid-cols-4">
                {completed[0]?.book.map((value: any, index: number) => {
                  return (
                    <div className=" col-span-1 m-4" key={index}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt="book image"
                            // src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
                            src={value.coverImage}
                          />
                        }
                      >
                        <Meta
                          title={value.title}
                          description={
                            <div className="">
                              <p className=" flex">
                                <span className=" font-bold mr-2">Writer:</span>
                                {value.writer}
                              </p>
                              <p className=" flex">
                                <span className=" font-bold mr-2">price:</span>
                                {value.point}
                              </p>
                              <p className=" flex">
                                <span className=" font-bold mr-2">tag:</span>
                                {value.tags.map((chip: string) => {
                                  return <Tag color="lime">{chip}</Tag>;
                                })}
                              </p>
                              <p className="flex">
                                <span className=" font-bold mr-2">
                                  Quantity:
                                </span>
                                {completed[0]?.quantity[index]}
                              </p>
                              <Button
                                type="primary"
                                className="w-full mt-3 bg-[#1677ff]"
                                onClick={() => cancelOrder(completed[0].id)}
                              >
                                Cancel Order
                              </Button>
                            </div>
                          }
                        />
                      </Card>
                    </div>
                  );
                })}
              </div>
            ),
          },
          {
            key: "3",
            label: <h1>Canceled Orders</h1>,
            children: (
              <div className="grid md:grid-cols-4">
                {canceled[0]?.book.map((value: any, index: number) => {
                  return (
                    <div className=" col-span-1 m-4" key={index}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt="book image"
                            // src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
                            src={value.coverImage}
                          />
                        }
                      >
                        <Meta
                          title={value.title}
                          description={
                            <div className="">
                              <p className=" flex">
                                <span className=" font-bold mr-2">Writer:</span>
                                {value.writer}
                              </p>
                              <p className=" flex">
                                <span className=" font-bold mr-2">price:</span>
                                {value.point}
                              </p>
                              <p className=" flex">
                                <span className=" font-bold mr-2">tag:</span>
                                {value.tags.map((chip: string) => {
                                  return <Tag color="lime">{chip}</Tag>;
                                })}
                              </p>
                              <p className="flex">
                                <span className=" font-bold mr-2">
                                  Quantity:
                                </span>
                                {canceled[0]?.quantity[index]}
                              </p>
                            </div>
                          }
                        />
                      </Card>
                    </div>
                  );
                })}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default cart;
