import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/components/shared/topBar";
import {Filters} from "@/components/shared/filters";
import {ProductsGroupList} from "@/components/shared/productsGroupList";
import {prisma} from "@/prisma/prisma-client";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
               include: {
                   items: true,
                   ingredients: true
               }
            }
        }
    })

    return (
        <>
            <Container className={'mt-10'}>
                <Title size={'lg'} text={'All pizzas'} className={'font-extrabold'}/>
            </Container>

            <TopBar
                categories={categories.filter((el) => el.products.length > 0)}
            />

            <Container className="pb-14 mt-10">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Filters/>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map((cat) => (
                                cat.products.length > 0 && (
                                    <ProductsGroupList
                                        key={cat.id}
                                        categoryId={1}
                                        title={cat.name}
                                        items={cat.products}
                                    />
                                )
                            ))}
                        </div>

                        {/*<div className="flex items-center gap-6 mt-12">*/}
                        {/*    <Pagination pageCount={3} />*/}
                        {/*    <span className="text-sm text-gray-400">5 из 65</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Container>
        </>
    );
}
