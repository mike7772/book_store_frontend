import React from "react";
import { Button, Form, Input, Tabs, Typography, notification } from "antd";
import type { TabsProps } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import { apiUrl } from "@/utils/config";

function auth() {
  const router = useRouter();
  const [loginForm] = Form.useForm();
  const [RegistrationForm] = Form.useForm();

  const onChange = (key: string) => {
    console.log(key);
  };

  const Login = () => {
    const values = loginForm.getFieldsValue();
    axios({
      method: "post",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      url: `${apiUrl}user/login`,
      data: {
        userName: values.userName,
        password: values.password,
      },
    })
      .then(async (res) => {
        localStorage.setItem("auth_info", res.data.data.token);
        notification.open({
          message: "Success",
          description: "Successfully Logged in",
          type: "success",
        });
        router.push("/");
      })
      .catch((err) => {
        // console.log("Error: ", err);
        notification.open({
          message: "Error",
          description: "Couldn't Log in",
          type: "error",
        });
      });
  };

  const Register = () => {
    const values = RegistrationForm.getFieldsValue();
    axios({
      method: "post",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      url: `${apiUrl}user`,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        userName: values.userName,
        password: values.password,
      },
    })
      .then(async (res) => {
        localStorage.setItem("auth_info", res.data.data.token);
        notification.open({
          message: "Success",
          description: "Successfully Registered",
          type: "success",
        });
        router.push("/");
      })
      .catch((err) => {
        // console.log("Error: ", err.response.data.errors);
        notification.open({
          message: "Error",
          description: err.response.data.errors[0],
          type: "error",
        });
      });
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <h1>Sign in</h1>,
      children: (
        <Form
          form={loginForm}
          name="login"
          layout="vertical"
          autoComplete="off"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ width: "100%", minWidth: 300 }}
        >
          <p className={` font-semibold text-theme text-[30px] pb-7`}>
            Sign in
          </p>

          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="my-3">
            <Button
              htmlType="submit"
              className="w-full bg-[#1677ff] mt-7"
              type="primary"
              onClick={() => Login()}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: <h1>Sign up</h1>,
      children: (
        <Form
          onFinish={() => {}}
          form={RegistrationForm}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          style={{ width: "100%", minWidth: 300 }}
        >
          <Typography className="text-[25px] mb-8 text-theme font-normal">
            Sign up
          </Typography>

          <div className="grid md:grid-cols-2 gap-x-3">
            <Form.Item
              label={<span style={{ color: "#757575" }}>First Name</span>}
              name="firstName"
              rules={[
                { required: true, message: "*Please enter your first name" },
              ]}
            >
              <Input placeholder="Eg. Abebe" />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#757575" }}>Last Name</span>}
              name="lastName"
              rules={[
                { required: true, message: "*Please enter your last name" },
              ]}
            >
              <Input placeholder="Eg. Kebede" />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#757575" }}>PHONE NUMBER</span>}
              name="phoneNumber"
              rules={[
                { required: true, message: "*Please enter your phone number" },
                // {
                //   validator: (_, value) => {
                //     if (validatePhoneNumber(value)) {
                //       return Promise.resolve();
                //     } else {
                //       return Promise.reject("*Please enter valid phone number");
                //     }
                //   },
                // },
              ]}
            >
              <Input placeholder="Eg. 0912211221" />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span style={{ color: "#757575" }}>Email</span>}
              rules={[{ required: true, message: "*Please enter email" }]}
            >
              <Input placeholder="Eg. abebe@gmail.com" />
            </Form.Item>

            <Form.Item
              className="col-span-full"
              name="userName"
              label={<span style={{ color: "#757575" }}>Username</span>}
              rules={[
                { required: true, message: "*Please enter your username" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              className="col-span-full"
              label={<span style={{ color: "#757575" }}>Password</span>}
              name="password"
              rules={[
                { required: true, message: "*Please enter your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className="col-span-full"
              label={
                <span
                  style={{ color: "#757575" }}
                  className="whitespace-nowrap"
                >
                  Confirm Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("*Password did not match"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="col-span-full">
              <Button
                htmlType="submit"
                className="w-full bg-[#1677ff] mt-3"
                type="primary"
                onClick={() => Register()}
              >
                Register
              </Button>
            </Form.Item>
          </div>
        </Form>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs
        className=" md:min-h-[500px] md:min-w-[500px] bg-white p-10"
        defaultActiveKey="1"
        // activeKey={"2"}
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

export default auth;
