import {Ingredient} from "@prisma/client";
import {useEffect, useState} from "react";
import {API} from "@/services/api-client";
import {useSet} from "react-use";
import {useSearchParams} from "next/navigation";

type ReturnProps = {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const searchParams = useSearchParams();
    const defaultIngredients = searchParams.get('ingredients')?.split(',') ?? [];

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedIngredients, { toggle }] = useSet(new Set<string>(defaultIngredients))

    const fetchIngredients = async () => {
        try {
            setLoading(true)
            const data = await API.ingredients.getAll();
            setIngredients(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchIngredients()
    }, [])

    return {
        ingredients,
        loading,
        selectedIngredients,
        onAddId: toggle,
    }
};

