'use client'

import {Dialog} from "@/shared/components/ui";
import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {DialogContent} from "@/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ChooseProductForm} from "../chooseProductForm";
import {ProductWithRelations} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choosePizzaForm";

type Props = {
    className?: string;
    product: ProductWithRelations;
}

export const ChooseProductModal:FC<Props> = ({ className, product }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                {
                    isPizzaForm
                        ? <ChoosePizzaForm name={product.name} imageUrl={product.imageUrl} ingredients={[]}/>
                        : <ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
                }
            </DialogContent>
        </Dialog>
    );
};