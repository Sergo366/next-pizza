import React, {FC} from 'react';
import Link from "next/link";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {Plus} from "lucide-react";

type Props = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard:FC<Props> = (
    {
        className,
        imageUrl,
        name,
        price,
        id
    }
    ) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt={name}/>
                </div>

                <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold text-white'}/>
                <p className="text-sm text-gray-400">
                    Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                      from <b>{price} $</b>
                    </span>
                    <Button variant="secondary">
                        <Plus size={20} className="mr-1"/>
                            Add
                    </Button>
                </div>
            </Link>
        </div>
    );
};