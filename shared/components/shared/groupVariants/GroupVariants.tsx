'use client'

import React from 'react';
import {cn} from "@/shared/lib/utils";

type Variant = {
    name: string;
    value: string;
    disabled?: string;
}

type Props = {
    items: readonly Variant[];
    onClick?: (value: Variant['value']) => void;
    className?: string;
    selectedValue?: Variant['value'];
}

export const GroupVariants = ({ className, onClick, selectedValue, items }: Props) => {
    return (
        <div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none')}>
            {items.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onClick?.(item.value)}
                    className={cn(
                        'flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                        {
                            'bg-shite shadow': item.value === selectedValue,
                            'text-gray-500 opacity-50 pointer-events-none': item.disabled
                        }
                    )}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};