import { Navbar, Footer } from "@/components/layout";
import { getProducts } from "@/lib/shopify";
import { ProductView } from "@/components/product/ProductView";
import { Container } from "@/components/ui";

// Server Component
export default async function ProductPage() {
    const products = await getProducts();
    const product = products[0]; // For now, just show the first product

    return (
        <main>
            <Navbar />
            {product ? (
                <ProductView product={product} />
            ) : (
                <Container style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
                    <h1>Product Not Found</h1>
                    <p>Could not fetch product data from Shopify store.</p>
                </Container>
            )}
            <Footer />
        </main>
    );
}
