'use client'

import React, {useEffect, useRef} from 'react';
import {Title} from "@/components/shared/title";
import {ProductCard} from "@/components/shared/productCard";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/store/category";

interface Props {
    title: string;
    items: any[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({ categoryId, title,listClassName, items, className }) => {
    const setActiveId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if(intersection?.isIntersecting) {
            setActiveId(categoryId)
            console.log(categoryId)
        }
    }, [intersection?.isIntersecting]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div key={'1'} className="grid grid-cols-3 gap-[50px]">
                {items.map((item, i) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        className={listClassName}
                        name="Маргарита"
                        imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
                        price={i}
                    />
                ))}
            </div>
        </div>
    );
};
