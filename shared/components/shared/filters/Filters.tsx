'use client'

import React from 'react';
import {Title} from "@/shared/components/shared/title";
import {Input, RangeSlider} from "@/shared/components/ui";
import {CheckboxFiltersGroup} from "@/shared/components/shared/checkboxFiltersGroup";
import {useFilters, useIngredients, useQueryFilters} from "@/shared/hooks";

export const Filters = () => {
    const { ingredients, loading } = useIngredients()
    const filters = useFilters()
    const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))

    useQueryFilters(filters)

    const handleUpdatePrices = ([priceFrom, priceTo]: number[]) => {
        filters.setPrices('priceFrom', String(priceFrom));
        filters.setPrices('priceTo', String(priceTo));
    }

    return (
        <>
            <Title text="Filters" size={'sm'} className={'mb-5 font-bold'} />

            <CheckboxFiltersGroup
                title={'Pizza type'}
                name={'sizes'}
                className={'mb-5'}
                onClickCheckbox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    { text: 'Thin', value: '1' },
                    { text: 'Traditional', value: '2' },
                ]}
            />
            <CheckboxFiltersGroup
                title={'Sizes'}
                name={'sizes'}
                className={'mb-5'}
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
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
                        value={filters.priceFrom}
                        onChange={(e) => filters.setPrices('priceFrom', e.target.value)}
                    />
                    <Input
                        type={'number'}
                        min={100}
                        max={1000}
                        placeholder={'1000'}
                        value={filters.priceTo}
                        onChange={(e) => filters.setPrices('priceFrom', e.target.value)}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[Number(filters.priceFrom), Number(filters.priceTo)]}
                    onValueChange={handleUpdatePrices}
                />
            </div>

            <CheckboxFiltersGroup
                title={'Ingredients'}
                items={items}
                defaultItems={items.slice(0, 5)}
                className={'mt-5'}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
                name={'ingredients'}
            />
        </>
    );
};