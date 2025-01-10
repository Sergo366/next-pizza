import {Product} from "@prisma/client";
import {axiosInstance} from "@/shared/services/instance";
import {ApiRoutes} from "@/shared/services/const";

export const search = async (query: string): Promise<Product[]> => {
    const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })

    return data
}