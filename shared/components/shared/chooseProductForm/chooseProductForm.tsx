import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";

type Props = {
    className?: string;
    imageUrl: string;
    name: string;
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm:FC<Props> = (
    {
        className,
        imageUrl,
        name,
        onClickAdd

    }
) => {
    const textDetails = 'Some Info about Pizza, 30 sm'
    const totalPrice = 350

    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className={'flex items-center justify-center flex-1 relative w-full'}>
                <img
                    src={imageUrl}
                    alt={name}
                    className={'relative left-2 top-2 transition-all duration-300 w-[350px] h-[350px]'}
                />
            </div>


            <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
                <Title text={name} size={'md'} className={'font-extrabold m-1'}/>
                <p className={'text-gray-400'}>{textDetails}</p>

                <Button className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}>
                    Add to basket for {totalPrice}
                </Button>
            </div>
        </div>
    );
};