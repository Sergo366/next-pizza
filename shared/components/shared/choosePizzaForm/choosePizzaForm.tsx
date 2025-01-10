import React, {FC} from 'react';

import {PizzaImage} from "../pizzaImage";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {GroupVariants} from "@/shared/components/shared/groupVariants";
import {pizzaSizes} from "@/shared/constants/pizza";

type Props = {
    className?: string;
    imageUrl: string;
    name: string;
    ingredients: any;
    items?: any;
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm:FC<Props> = (
    {
        className,
        imageUrl,
        name,
        ingredients,
        items,
        onClickAdd

    }
) => {
    const textDetails = 'Some Info about Pizza, 30 sm'
    const totalPrice = 350

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage src={imageUrl} alt={name} size={30}  />

            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold m-1'}/>
                <p className={'text-gray-400'}>{textDetails}</p>

                <GroupVariants items={pizzaSizes}/>

                <Button className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}>
                    Add to basket for {totalPrice}
                </Button>
            </div>
        </div>
    );
};