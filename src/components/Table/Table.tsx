import React from 'react';
import {OrdersType} from "../../store/restaurant-reducer";


type TableProps = {
    orders: OrdersType[],
    title: string,
    variant: 'primary' | 'secondary',
    onItemClicked?: (id: number) => void,
}

export const Table: React.FC<TableProps> = ({orders, title, variant, onItemClicked}) => {
    const classes = {
        primary: {
            main: 'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none] bg-accent',
            border: 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_20px_20px] border-solid border-2 p-1 h-[200px] border-[#fe540e]',
            order: 'h-20 p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 ',
            selected: 'font-bold border-[#fe540e]'

        },
        secondary: {
            main: 'flex text-center font-medium justify-center text-[white] overflow-y-scroll p-2.5 rounded-[20px_20px_0_0] border-[none] bg-[green]',
            border: 'flex flex-row border w-80 justify-evenly flex-wrap overflow-y-scroll rounded-[0_0_20px_20px] border-solid border-2 p-1 h-[200px] border-[green]',
            order: 'h-20 font-bold p-2 min-w-[80px] text-[20px] bg-white flex justify-center items-center shadow-[0_2px_5px_0_rgba(0,0,0,0.4)]  m-[5px] px-[5px] rounded-[10px] border-2 border-[green]',
            selected: 'bg-accent t-white font-bold border-none'
        },
    }
    const onClicked = (id: number) => {
        onItemClicked && onItemClicked(id)
    }
    return (
        <div>
            <div
                className={classes[variant].main}>{title}</div>
            <div
                className={classes[variant].border}>
                {orders.map((t) => (
                    <button key={t.id}
                            className={t.isSelected ? `${classes[variant].order} ${classes[variant].selected}` : `${classes[variant].order}`}
                            onClick={() => onClicked(t.id)}>
                        {t.key}
                    </button>
                ))}</div>
        </div>
    );
};