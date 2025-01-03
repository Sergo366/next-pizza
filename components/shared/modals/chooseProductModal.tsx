'use client'

import {Dialog} from "@/components/ui";
import {FC} from "react";
import {Product} from "@prisma/client";
import {cn} from "@/lib/utils";
import {DialogContent} from "@/components/ui/dialog";
import {Title} from "@/components/shared/title";
import {useRouter} from "next/navigation";

type Props = {
    className?: string;
    product: Product;
}

export const ChooseProductModal:FC<Props> = ({ className, product }) => {
    const router = useRouter()
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                <Title text={'Choose product'}/>
                {product.name}
            </DialogContent>
        </Dialog>
    );
};