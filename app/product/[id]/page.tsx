import React from 'react';

type ProductPageProps = {
    params: {
        id: string;
    }
}

const ProductPage = ({ params: { id } }: ProductPageProps) => {
    return (
        <div>
            Product {id}
        </div>
    );
};

export default ProductPage;