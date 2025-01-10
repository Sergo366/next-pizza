import React from 'react';
import {cn} from "@/shared/lib/utils";
import {Categories} from "@/shared/components/shared/categories";
import {SortPopup} from "@/shared/components/shared/sortPopup";
import {Container} from "@/shared/components/shared/container";
import {Category} from "@prisma/client";

type TopBarProps = {
    categories: Category[]
}

export const TopBar = ({categories}:TopBarProps) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10')}>
            <Container className={'flex items-center justify-between'}>
                <Categories items={categories} />
                <SortPopup/>
            </Container>
        </div>
    );
};