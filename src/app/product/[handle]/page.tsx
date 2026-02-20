import { getProducts } from "@/lib/shopify";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Container } from "@/components/ui/Container";
import { Navbar, Footer } from "@/components/layout";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { handle: string } }) {
    const products = await getProducts();
    const product = products.find(p => p.handle === params.handle);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-warm-ivory selection:bg-amber-glow/20">
            <Navbar />

            <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Left: Sticky Image Gallery */}
                        <div className="relative">
                            <div className="lg:sticky lg:top-32">
                                <ProductGallery media={product.media} />
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col">
                            <ProductInfo product={product} />
                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </main>
    );
}
