'use client';

import React, {ChangeEvent, useState} from 'react';

import { Input } from '../../ui/input';
import {FilterChecboxProps, FilterCheckbox} from "@/components/shared/filterCheckbox/FilterCheckbox";
import {Skeleton} from "@/components/ui";

type Item = FilterChecboxProps;

interface Props {
    title: string;
    name?: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    className?: string;
    onClickCheckbox: (id: string) => void;
    defaultValue?: string[];
    selected: Set<string>;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
        title,
        name,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder = 'Поиск...',
        className,
        onClickCheckbox,
        selected,
        loading
    }
    ) => {
    const [showAll, setShowAll] = useState(false);
    const [search, setSearch] = useState('');

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const list = showAll
        ? items.filter((el) => el.text.toLowerCase().includes(search.toLowerCase()))
        : (defaultItems || items).slice(0, limit)

    if (loading) {
        return <div>
            <p className={'font-bold mb-3'}>{title}</p>
            {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className={'h-6 mb-4 rounded-[8px]'}/>
            ))}
            <Skeleton className={'w-28 h-6 mb-4 rounded-[8px]'}/>
        </div>
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input onChange={onChangeSearch} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item) => (
                    <FilterCheckbox
                        onCheckedChange={() => onClickCheckbox(item.value)}
                        checked={selected.has(item.value)}
                        key={String(item.value)}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? '- Hide' : '+ Show all'}
                    </button>
                </div>
            )}
        </div>
    );
};
