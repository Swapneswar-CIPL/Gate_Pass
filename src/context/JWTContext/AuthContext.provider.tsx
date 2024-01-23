"use client";

import React, { createContext, useEffect, useReducer, useMemo } from "react";

import { useRouter } from "next/navigation";
import axios from "../../config/axios";
import { isValidToken, setSession } from "../../Util/jwt";
import AuthReducer from "./AuthContext.reducer";
import { Alert } from "@mui/material";
import { usePathname } from "next/navigation";
// Note: If you're trying to connect JWT to your own backend, don't forget
// to remove the Axios mocks in the `/src/pages/_app.js` file.

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const FORGOT_PASSWORD = "FORGOT_PASSWORD";
const RESET_PASSWORD = "RESET_PASSWORD";

const illegalStateFunction = (...args: any) => {
  throw new Error("You must wrap your components in <AuthProvider />");
};
// let accessToken:any
// if (typeof window !== "undefined") {
//     accessToken = localStorage.getItem("accessToken") || ""
//   }
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
  signIn: illegalStateFunction,
  signOut: illegalStateFunction,
  signUp: illegalStateFunction,
  resetPassword: illegalStateFunction,
  forgotPassword: illegalStateFunction,
};

export const AuthContext = createContext(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => React.useContext(AuthContext);
export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const router = useRouter();

  const pathname = usePathname();
  useEffect(() => {
    const initialize = async () => {
      try {
        if (localStorage.getItem("login")) {
          const info: any = JSON.parse(localStorage.getItem("login") || "");
          console.log(info, "kkkkkkkkkkkkkkkkkkkkk");
          const user = info;

          dispatch({
            type: INITIALIZE,
            payload: {
              isInitialized: true,
              user: user,
            },
          });
        } else {
          //http://localhost:3000/resetpassword
          // /resetpassword]
          console.log("logout");
          router.push("/");
          dispatch({
            type: INITIALIZE,
            payload: {
              isInitialized: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.log("logout");

        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email: any, password: any) => {
    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });

      console.log(response);
      const user = response.data.user;
      console.log(user.role.name, "asdas");
      localStorage.setItem("login", JSON.stringify(user));

      dispatch({
        type: SIGN_IN,
        payload: {
          user: user,
          isAuthenticated: true,
        },
      });
      user.role.name ? router.push("/admin") : router.push("/home");
      //  response;
    } catch (err: any) {
      //   console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      // alert("Invalid email or invalid password please try again");
      dispatch({
        type: SIGN_IN,
        payload: {
          isAuthenticated: false,
          validationErrors: err.error,
        },
      });
      return err;
    }
  };

  const signOut = async () => {
    console.log("logout");
    router.push("/");
    dispatch({ type: SIGN_OUT });
    localStorage.removeItem("login");

    // router.push("/");
  };

  // const signOut = async () => {
  //   setSession(null);
  //   dispatch({ type: SIGN_OUT });
  // };
  const forgotPassword = async (email: string, type: string) => {
    try {
      const response = await axios.post("/api/user/forgot-password", {
        [type]: email,
        // email
      });
      const {
        token,
        data: { user },
      } = response.data;
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          user,
        },
      });
      //  router.push("/judgement/Forg");
    } catch (err: any) {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          isAuthenticated: false,
          validationErrors: err.error,
        },
      });
      // router.push("/Login/Login");

      return err.error;
    }
  };

  const resetPassword = async (password: string, type: string, option: any) => {
    try {
      const response = await axios.post(
        "/api/user/reset-password",
        {
          [type]: password,
          // email
        },
        option
      );
      const {
        data: { user },
      } = response.data;
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          user,
        },
      });
      router.push("/");
    } catch (err: any) {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          isAuthenticated: false,
          validationErrors: err.error,
        },
      });
      // router.push("/Login/Login");
      return err.error;
    }
  };

  const changePassword = async (
    oldPassword: string,
    password: string,
    type: string,
    option: any
  ) => {
    try {
      const response = await axios.post(
        "/api/user/reset-password",
        {
          oldPassword,
          [type]: password,
          // email
        },
        option
      );
      const {
        data: { user },
      } = response.data;
      dispatch({
        type: CHANGE_PASSWORD,
        payload: {
          user,
        },
      });
      router.push("/");
    } catch (err: any) {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: {
          isAuthenticated: false,
          validationErrors: err.error,
        },
      });
      // router.push("/Login/Login");
      return err.error;
    }
  };

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          ...state,
          method: "jwt",
          signIn,
          signOut,
          forgotPassword,
          resetPassword,
          changePassword,
        }),
        [state]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}
