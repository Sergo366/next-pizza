import {useEffect} from "react";
import qs from "qs";
import {Filters, QueryFilters} from "@/hooks/useFilters/useFilters";
import {useRouter} from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();
    const { priceTo, priceFrom, sizes, selectedIngredients, pizzaTypes } = filters;

    useEffect(() => {
        const filters = {
            priceTo,
            priceFrom,
            sizes: Array.from(sizes),
            pizzaTypes: Array.from(pizzaTypes),
            ingredients: Array.from(selectedIngredients)
        }
        const query = qs.stringify(filters, {
            arrayFormat: 'comma'
        })
        router.push(`/?${query}`, { scroll: false })
    }, [selectedIngredients, pizzaTypes, priceFrom, priceTo, sizes]);

}