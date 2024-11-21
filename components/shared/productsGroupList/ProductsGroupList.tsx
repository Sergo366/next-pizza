import React from 'react';
import {Title} from "@/components/shared/title";
import {ProductCard} from "@/components/shared/productCard";

interface Props {
    title: string;
    items: any[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({ title,listClassName, items, className }) => {
    return (
        <div className={className}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className="grid grid-cols-3 gap-[50px]">
                {items.map((item, i) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        className={listClassName}
                        name="Маргарита"
                        imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
                        price={item}
                    />
                ))}
            </div>
        </div>
    );
};
