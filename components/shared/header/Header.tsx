import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container/Container";
import Image from "next/image";
import {Button} from "@/components/ui";
import {ArrowRight, ShoppingCart} from "lucide-react";

export const Header = () => {
    return (
        <header className={cn('border border-b')}>
            <Container className={'flex items-center justify-between py-8'}>
                <div className={'flex items-center gap-4'}>
                    <Image src="/logo.png" alt={'logo'} width={35} height={35} />
                    <div>
                        <h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
                        <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
                    </div>
                </div>
                <div className="mx-10 flex-1">
                    {/*<SearchInput/>*/}
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline">Sign in</Button>

                    {/*<CartDrawer>*/}
                        <Button className="group relative">
                            <b>520 $</b>
                            <span className="h-full w-[1px] bg-white/30 mx-3"/>
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                                <b>3</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                        </Button>
                    {/*</CartDrawer>*/}
                </div>
            </Container>
        </header>
    );
};