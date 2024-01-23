"use client"

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';
const CHANGE_PASSWORD="CHANGE_PASSWORD";
const FORGOT_PASSWORD = "FORGOT_PASSWORD";
const RESET_PASSWORD = "RESET_PASSWORD";

const AuthReducer = (state: any, action: any) => {
    console.log(action.type, "payload")
    switch (action.type) {
        case INITIALIZE:
            return {
                isAuthenticated: true,
                isInitialized: true,
                user: action.payload.user,
            };
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                otr_id:''
            };
            case CHANGE_PASSWORD:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      case FORGOT_PASSWORD:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case RESET_PASSWORD:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
        default:
            return state;
    }
};

export default AuthReducer;
