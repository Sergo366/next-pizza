import React from 'react';
import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "@/components/shared/filterCheckbox";
import {Input} from "@/components/ui";

export const Filters = () => {
    return (
        <div>
            <Title text="Filters" size={'sm'} className={'mb-5 font-bold'} />

            <div className={'flex flex-col gap-4'}>
                <FilterCheckbox text={'Сan be collected'} value={'1'} />
                <FilterCheckbox text={'New items'} value={'2'} />
            </div>
            <div className={'mt-5 border-y-neutral-100 py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Price from and to:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input type={'number'} placeholder={'0'} min={0} max={1000} defaultValue={0} />
                    <Input type={'number'} min={100} max={1000} placeholder={'1000'} />
                </div>
            </div>
        </div>
    );
};