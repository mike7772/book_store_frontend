import { Button, Input } from "antd";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { IFilterInfo, NextUrl, getUserInfo } from "@/utils/config";

function Header() {
  const { Search } = Input;
  const router = useRouter();
  const userInfo = getUserInfo();

  return (
    <div className=" z-[100] flex justify-between  top-0 w-full min-h-[80px] border-b-[1px] drop-shadow-lg opacity-100 bg-white px-3 md:px-16">
      <h1
        className=" mt-3 text-center cursor-pointer"
        onClick={() => router.push(`${NextUrl}`)}
      >
        <span className=" font-[500] text-[25px]"> Michael's </span> <br />
        Book Store
      </h1>

      <div className=" flex justify-center items-center">
        <a
          className=" cursor-pointer hover:text-[#108ee9] mr-7"
          onClick={() => router.push(`${NextUrl}cart`)}
        >
          cart
        </a>
        {!userInfo ? (
          <Button
            onClick={() => {
              router.push(`${NextUrl}auth?type=signin`);
            }}
          >
            Sign in
          </Button>
        ) : (
          <div className=" flex">
            <p className="hidden md:relative text-[20px] mr-5 border-[1px] py-1 px-5 rounded-[50px] border-[#1677ff] text-[#1677ff]">
              {userInfo.userName}
            </p>
            <Button
              className="h-10"
              onClick={() => {
                localStorage.removeItem("auth_info");
                router.push(`${NextUrl}auth?type=signin`);
              }}
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
