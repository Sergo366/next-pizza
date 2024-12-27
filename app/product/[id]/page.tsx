import React from 'react';
import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container} from "@/components/shared/container";
import {ProductImage} from "@/components/shared/productImage";
import {Title} from "@/components/shared/title";
import {GroupVariants} from "@/components/shared/groupVariants";

type ProductPageProps = {
    params: {
        id: string;
    }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        }
    })

    if(!product) notFound();

    return (
        <Container className={'flex flex-col my-10'}>
            <div className={'flex flex-1'}>
                <ProductImage size={40} scr={product.imageUrl} alt={product.name} />
                <div className={'w-[490px] bg-[#f7f6f5]'}>
                    <Title text={product.name} size={'md'} className={'font-extrabold mb-1'}/>
                    <p className={'text-gray-400'}>Lorem ipsum dolor sit amet.</p>

                    <GroupVariants
                        selectedValue={'1'}
                        items={[
                        { name: 'Small', value: '1' },
                        { name: 'Middle', value: '2' },
                        { name: 'Big', value: '3' },
                    ]} />
                </div>
            </div>
        </Container>
    );
};

export default ProductPage;