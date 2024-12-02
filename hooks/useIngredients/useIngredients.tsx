import {API} from "@/services/api-client";
import {useEffect, useState} from "react";
import {Ingredient} from "@prisma/client";

export const useIngredients = () => {
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

    return {ingredients, loading}
}