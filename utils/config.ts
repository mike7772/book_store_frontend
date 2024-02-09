import jwt_decode from "jwt-decode";
export const apiUrl = "http://localhost:4000/api/";

export const NextUrl = "http://localhost:7000/";

export interface BookResponse {
  id: number;
  title: string;
  writer: string;
  coverImage: string;
  point: string;
  tags: string[];
}

export interface IUserAuthInfo {
  id: number;
  userName: string;
}

// export interface IFilterInfo {
//   title: string;
//   writer: string;
//   tags: string[];
// }
export interface IFilterInfo {
  filterObj: {
    title: string;
    writer: string;
    tags: string[];
  };
}

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("auth_info");
    return userInfo ? (jwt_decode(userInfo) as IUserAuthInfo) : undefined;
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("auth_info");
    return userInfo;
  }
};
