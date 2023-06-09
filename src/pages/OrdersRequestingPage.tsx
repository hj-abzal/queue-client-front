import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {Table, TableSkeleton} from "../components/Table/Table";
import {getOrdersTC, getRestaurantTC, RestaurantType} from "../store/restaurant-reducer";
import {Header} from "../components/Header/Header";
import {authMe} from "../store/app-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ReactSlider} from "../components/Advertisement/ReactSlider";

export const OrdersRequestingPage = () => {
    const {restaurantId, orderIds} = useParams();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate();
    const {title, logo, orders, adds} = useSelector<AppStateType, RestaurantType>(state => state.restaurant)
    const isLoading = useSelector<AppStateType, boolean>((state) => state.app.isLoading)

    const selectedOrders = orderIds?.split(',').map(id => +id)
    const accessToken = useSelector<AppStateType, string>(state => state.app.accessToken)
    const onGoingOrders = orders.filter(order => !order.is_ready && selectedOrders?.includes(order.id))
    const readyOrders = orders.filter(order => order.is_ready && selectedOrders?.includes(order.id))
    const {t} = useTranslation()
    useEffect(() => {
        if (
            Number.isNaN(Number(restaurantId))
            || !Array.isArray(selectedOrders)
            || selectedOrders.some(Number.isNaN)
        ) {
            navigate('/')
        } else {
            dispatch(authMe())
        }
    }, [])

    let intervalId: any;
    useEffect(() => {
        if (accessToken && restaurantId) {
            dispatch(getRestaurantTC(restaurantId))

            intervalId = setInterval(() => {
                dispatch(getOrdersTC(restaurantId))
            }, 3000)
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [accessToken])

    useEffect(() => {
        if (orders.length && (onGoingOrders.length === 0 && readyOrders.length === 0)) {
            navigate('/')
        }
    }, [orders])

    return (
        <div
            className={'w-mobile h-full flex flex-col gap-4 overflow-y-auto justify-between box-border'}>
            <Header title={title} img={logo}/>
            <button className={"rounded-lg bg-gray-200 text-black disabled:opacity-40 min-w-[50px] px-3 py-1"} onClick={() => {
                navigate(`/restaurants/${restaurantId}`)
            }
            }>Смотреть все заказы
            </button>
            {onGoingOrders.length > 0 &&
                <Table orders={onGoingOrders} title={t('ORDERS_PAGE.NOT_READY')} variant={'primary'}/>}
            {readyOrders.length > 0 &&
                <Table orders={readyOrders} title={t('ORDERS_PAGE.READY')} variant={'secondary'}/>}
            {(isLoading && orders.length === 0) && <TableSkeleton/>}
            <ReactSlider img={adds} isLoading={isLoading}/>
            <div className="h-[30px]"/>
        </div>
    );
};

