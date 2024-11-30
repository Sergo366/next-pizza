import {Ingredient} from "@prisma/client";
import {useEffect, useState} from "react";
import {API} from "@/services/api-client";

type ReturnProps = {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(false)

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
        loading
    }
};

