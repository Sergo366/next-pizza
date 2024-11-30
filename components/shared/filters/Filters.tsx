'use client'

import React, {useEffect, useState} from 'react';
import {Title} from "@/components/shared/title";
import {Input, RangeSlider} from "@/components/ui";
import {CheckboxFiltersGroup} from "@/components/shared/checkboxFiltersGroup";
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {useSet} from "react-use";
import qs from "qs";
import {useRouter, useSearchParams} from "next/navigation";

type PriceProps = {
    priceFrom: string;
    priceTo: string;
}

type QueryFilters  = PriceProps & {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters = () => {
    const searchParams = useSearchParams() as unknown as Map< keyof QueryFilters, string>;
    const router = useRouter();
    const { ingredients, loading, selectedIngredients, onAddId } = useFilterIngredients();
    const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))

    const [{ priceTo, priceFrom }, setPrice] = useState<PriceProps>({
        priceFrom: searchParams.get('priceFrom') || '0',
        priceTo: searchParams.get('priceTo') || '1000'
    })

    const defaultSizes = searchParams.get('sizes')?.split(',') ?? [];
    const defaultPizzaTypes = searchParams.get('pizzaTypes')?.split(',') ?? [];

    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(defaultSizes))
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(defaultPizzaTypes))

    const updatePrice = (name: keyof PriceProps, value: string) => {
        setPrice((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        const filters = {
            priceTo,
            priceFrom,
            sizes: Array.from(sizes),
            pizzaTypes: Array.from(pizzaTypes),
            ingredients: Array.from(selectedIngredients)
        }
        const query = qs.stringify(filters, {
            arrayFormat: 'comma'
        })
        router.push(`/?${query}`, { scroll: false })
    }, [selectedIngredients, pizzaTypes, priceFrom, priceTo, sizes]);

    return (
        <>
            <Title text="Filters" size={'sm'} className={'mb-5 font-bold'} />

            <CheckboxFiltersGroup
                title={'Pizza type'}
                name={'sizes'}
                className={'mb-5'}
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
                items={[
                    { text: 'Thin', value: '1' },
                    { text: 'Traditional', value: '2' },
                ]}
            />
            <CheckboxFiltersGroup
                title={'Sizes'}
                name={'sizes'}
                className={'mb-5'}
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    { text: '20 sm', value: '20' },
                    { text: '30 sm', value: '30' },
                    { text: '40 sm', value: '40' },
                ]}
            />

            <div className={'mt-5 border-y-neutral-100 py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Price from and to:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input
                        type={'number'}
                        placeholder={'0'}
                        min={0}
                        max={1000}
                        value={priceFrom}
                        onChange={(e) => updatePrice('priceFrom', e.target.value)}
                    />
                    <Input
                        type={'number'}
                        min={100}
                        max={1000}
                        placeholder={'1000'}
                        value={priceTo}
                        onChange={(e) => updatePrice('priceFrom', e.target.value)}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[Number(priceFrom), Number(priceTo)]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom: String(priceFrom), priceTo: String(priceTo) })}
                />
            </div>

            <CheckboxFiltersGroup
                title={'Ingredients'}
                items={items}
                defaultItems={items.slice(0, 5)}
                className={'mt-5'}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
                name={'ingredients'}
            />
        </>
    );
};