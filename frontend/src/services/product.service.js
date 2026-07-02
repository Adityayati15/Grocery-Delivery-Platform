import api from "@/lib/axios";

export const getProducts = async ({
    page = 1,
    limit = 20,
    search = "",
    category = "",
    brand = "",
}) => {

    const response = await api.get("/products", {
        params: {
            page,
            limit,
            search,
            category,
            brand,
        },
    });

    return response.data.data;
};