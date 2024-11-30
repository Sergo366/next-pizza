import {Ingredient} from "@prisma/client";
import {axiosInstance} from "@/services/instance";
import {ApiRoutes} from "@/services/const";

export const getAll = async (): Promise<Ingredient[]> => {
    const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)
    return data
}