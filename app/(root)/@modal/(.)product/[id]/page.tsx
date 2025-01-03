import React from 'react';
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {ChooseProductModal} from "@/components/shared/modals";

type ProductPageProps = {
    params: {
        id: string;
    }
}

const ProductModalPage = async ({ params: { id } }: ProductPageProps) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            items: true
        }
    })

    if(!product) notFound();

    return (
        <ChooseProductModal product={product} />
    );
};

export default ProductModalPage;