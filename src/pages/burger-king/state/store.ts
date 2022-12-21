import {combineReducers, createStore} from "redux";
import {ordersReducer} from "./orders-reducer";

export const rootReducer = combineReducers({
    orders: ordersReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store