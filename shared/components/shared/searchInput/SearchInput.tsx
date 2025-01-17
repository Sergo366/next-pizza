'use client';

import { Search } from 'lucide-react';
import React, {useRef, useState} from 'react';
import {useClickAway, useDebounce} from "react-use";
import {cn} from "@/shared/lib/utils";
import Link from "next/link";
import {API} from "@/shared/services/api-client";
import {Product} from "@prisma/client";

export const SearchInput = () => {
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    })

    useDebounce(async () => {
        try {
            const data = await API.products.search(searchQuery)
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }, 300, [searchQuery]);

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    }

    return (
        <div className={'relative'}>
            {focused && <div className={'fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'}/>}

            <div ref={ref} className="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                />
            </div>

            {products.length > 0 && (
                <div className={cn(
                    'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                    focused && 'opacity-100 visible top-[3rem]'
                )}>
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className={'flex items-center gap-3 px-3 py-2 hover:bg-primary/10'}
                            onClick={onClickItem}
                        >
                            <img
                                className={'rounded-sm h-8'}
                                src={product.imageUrl}
                                width={32}
                                height={32}
                                alt={product.name}
                            />
                            <span>{product.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
