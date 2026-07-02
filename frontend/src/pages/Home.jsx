import { useEffect, useState } from "react";

import { getProducts } from "@/services/product.service";

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {
            try {

                setLoading(true);

                const data = await getProducts({});

                setProducts(data.products);

            }
            catch(err){

                setError("Unable to load products");

            }
            finally{

                setLoading(false);

            }
        };

        fetchProducts();

    }, []);

    return (
        <main className="max-w-7xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold mb-6">
                Grocery Products
            </h1>

            <p>
                Total Products: {products.length}
            </p>

        </main>
    );
}

export default Home;