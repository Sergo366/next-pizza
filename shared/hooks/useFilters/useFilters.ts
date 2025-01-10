import {useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import {useState} from "react";

type PriceProps = {
    priceFrom: string;
    priceTo: string;
}

export type QueryFilters  = PriceProps & {
    pizzaTypes: Set<string>;
    sizes: Set<string>;
    ingredients: string;
}

export type Filters = Omit<QueryFilters, 'ingredients'> & { selectedIngredients: Set<string> }

type ReturnProps = Filters & {
    setPrices:(name: keyof PriceProps, value: string) => void;
    setPizzaTypes:(name: string) => void;
    setSizes:(name: string) => void;
    setSelectedIngredients:(name: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams();
    const defaultIngredients = searchParams.get('ingredients')?.split(',') ?? [];
    const defaultSizes = searchParams.get('sizes')?.split(',') ?? [];
    const defaultPizzaTypes = searchParams.get('pizzaTypes')?.split(',') ?? [];

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(defaultIngredients))
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(defaultPizzaTypes))
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(defaultSizes))
    const [{ priceTo, priceFrom }, setPrices] = useState<PriceProps>({
        priceFrom: searchParams.get('priceFrom') || '0',
        priceTo: searchParams.get('priceTo') || '1000'
    })

    const updatePrice = (name: keyof PriceProps, value: string) => {
        setPrices((prev) => ({ ...prev, [name]: value }))
    }

    return {
        sizes,
        pizzaTypes,
        selectedIngredients,
        priceTo,
        priceFrom,
        setPrices: updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients
    }
}