'use client'

import Link from 'next/link';
import React from 'react';
import {useCategoryStore} from "@/shared/store/category";
import {Category} from "@prisma/client";
import {cn} from "@/shared/lib/utils";

interface Props {
    className?: string;
    items: Category[];
}

export const Categories: React.FC<Props> = ({ className, items }) => {
    const activeId = useCategoryStore((state) => state.activeId)

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {items.map((item) => (
                <Link
                    key={item.name}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        activeId === item.id && 'bg-white shadow-md shadow-gray-200 text-primary',
                    )}
                    href={`/#${item.name}`}>
                    {item.name}
                </Link>
            ))}
        </div>
    );
};
