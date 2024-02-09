import Header from "@/components/header";
import { BookResponse, apiUrl, getToken, getUserInfo } from "@/utils/config";
import { Button, Card, Checkbox, Tag, notification } from "antd";
import type { CheckboxProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { Meta } = Card;
  const [data, setData] = useState<string[]>([]);
  const [books, setBooks] = useState<BookResponse[]>([]);
  const userInfo = getUserInfo();
  const token = getToken();

  let filterObj = {
    title: "",
    writer: "",
    tags: [""],
  };

  const AddToCart = (id: number) => {
    axios({
      method: "post",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      url: `${apiUrl}order`,
      data: {
        userId: userInfo?.id,
        bookId: [id],
        quantity: [1],
      },
    })
      .then(async (res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
        notification.open({
          message: "Error",
          description: "Couldn't Add Book to the cart",
          type: "error",
        });
      });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await axios.get(`${apiUrl}book/tags`);
        const response = await axios({
          method: "GET",
          headers: {
            "content-type": `application/json`,
            "Access-Control-Allow-Origin": "*",
          },
          url: `${apiUrl}book/tags`,
        })
          .then((res) => res.data)
          .catch((err) => err);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios({
          method: "POST",
          headers: {
            "content-type": `application/json`,
            "Access-Control-Allow-Origin": "*",
          },
          url: `${apiUrl}book/list`,
          data: {
            title: filterObj.title,
            writer: filterObj.writer,
            tags: filterObj.tags.shift(),
          },
        })
          .then((res) => res.data)
          .catch((err) => err);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBooks();
  }, [1000]);

  const onChange: CheckboxProps["onChange"] = (e) => {
    const getIndex = filterObj.tags.findIndex((obj) => {
      return obj === e.target.value;
    });

    if (getIndex != -1) {
      filterObj.tags.splice(getIndex, 1);
    } else {
      filterObj.tags.push(e.target.value);
    }
    console.log("new --------->", filterObj);
  };

  return (
    data && (
      <div className="flex min-h-screen flex-col items-center justify-between bg-white">
        <Header filterObj={filterObj} />
        <div className=" mt-[80px] grid grid-cols-1 md:grid-cols-5 w-full min-h-screen ">
          <div className=" mt-10 pt-32 hidden md:flex flex-col items-center col-span-1 border-r-[1px] border-[#00000050]">
            <h1 className=" w-[50%] text-[25px] mb-3">Category</h1>
            {data.map((tag: string) => {
              return (
                <Checkbox
                  className=" w-[50%] text-[20px]"
                  onChange={onChange}
                  value={tag}
                >
                  {tag}
                </Checkbox>
              );
            })}

            {/* <Checkbox onChange={onChange}>Checkbox</Checkbox> */}
          </div>
          <div className=" md:col-span-4">
            <h1 className=" text-center text-[50px] my-7">
              Books Available in the Store
            </h1>
            <div className=" w-full md:col-span-4 pt-7 grid md:grid-cols-4 ">
              {books.map((value: BookResponse, index: number) => {
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
                              {value.tags.map((chip) => {
                                return <Tag color="lime">{chip}</Tag>;
                              })}
                            </p>
                            <Button
                              className="w-full mt-3"
                              onClick={() => AddToCart(value.id)}
                            >
                              Add to cart
                            </Button>
                          </div>
                        }
                      />
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
