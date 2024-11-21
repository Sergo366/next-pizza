import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/components/shared/topBar";
import {Filters} from "@/components/shared/filters";
import {ProductsGroupList} from "@/components/shared/productsGroupList";

export default function Home() {
    return (
        <>
            <Container className={'mt-10'}>
                <Title size={'lg'} text={'All pizzas'} className={'font-extrabold'}/>
            </Container>

            <TopBar/>

            <Container className="pb-14 mt-10">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Filters/>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList title="Pizzas" items={[1, 2, 3, 4, 5]}  categoryId={1}/>
                            <ProductsGroupList title="Combo" items={[1, 2, 3, 4, 5]}  categoryId={2}/>
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
