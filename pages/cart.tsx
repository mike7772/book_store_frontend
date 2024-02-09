import { apiUrl, getToken, getUserInfo } from "@/utils/config";
import { Button, Card, Tabs, TabsProps, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function cart() {
  const [pending, setPending] = useState<any>([]);
  const [completed, setCompleted] = useState<any>([]);
  const [canceled, setCanceled] = useState<any>([]);
  const { Meta } = Card;

  const userInfo = getUserInfo();
  const token = getToken();
  const onChange = (key: string) => {
    console.log(key);
  };

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const responsePending = await axios({
  //           method: "GET",
  //           headers: {
  //             "content-type": `application/json`,
  //             "Access-Control-Allow-Origin": "*",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           url: `${apiUrl}order/list/${userInfo?.id}/pending`,
  //         })
  //           .then((res) => res.data)
  //           .catch((err) => err);
  //         setPending(responsePending.data);

  //         const responseCompleted = await axios({
  //           method: "GET",
  //           headers: {
  //             "content-type": `application/json`,
  //             "Access-Control-Allow-Origin": "*",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           url: `${apiUrl}order/list/${userInfo?.id}/completed`,
  //         })
  //           .then((res) => res.data)
  //           .catch((err) => err);
  //         setCompleted(responseCompleted.data);

  //         const responseCanceled = await axios({
  //           method: "GET",
  //           headers: {
  //             "content-type": `application/json`,
  //             "Access-Control-Allow-Origin": "*",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           url: `${apiUrl}order/list/${userInfo?.id}/canceled`,
  //         })
  //           .then((res) => res.data)
  //           .catch((err) => err);
  //         setCanceled(responseCanceled.data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //     fetchData();
  //   }, [pending, completed, canceled]);

  //   console.log("first --------->", pending, completed, canceled);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <h1>Pending Orders</h1>,
      children: pending?.book && (
        <div className="grid grid-cols-4">
          {pending?.book.map((value: any, index: number) => {
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
                          <span className=" font-bold mr-2">Quantity:</span>
                          {pending.quantity[index]}
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
    {
      key: "2",
      label: <h1>Completed Orders</h1>,
      children: <div></div>,
    },
    {
      key: "3",
      label: <h1>Canceled Orders</h1>,
      children: <div></div>,
    },
  ];

  return (
    <div className=" flex min-h-screen flex-col justify-center items-start ">
      <Tabs
        className=" w-full min-h-[500px] md:min-h-[755px] bg-white p-10"
        defaultActiveKey="1"
        // activeKey={"2"}
        items={items}
        // onChange={onChange}
      />
    </div>
  );
}

export default cart;
