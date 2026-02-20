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
        return (
            <main className="min-h-screen bg-warm-ivory selection:bg-amber-glow/20 flex flex-col items-center justify-center p-8 text-center pt-32 pb-32">
                <Navbar />
                <h1 className="text-4xl font-heading mb-4 text-deep-charcoal">Debug: Product Not Found</h1>
                <p className="text-lg mb-2 text-deep-charcoal/80">Looking for handle: <strong className="text-amber-glow">{params?.handle}</strong></p>
                <p className="text-lg mb-2 text-deep-charcoal/80">Products fetched count: <strong>{products.length}</strong></p>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-warm-stone/50 mt-8 text-left max-w-2xl w-full">
                    <h2 className="text-2xl mb-4 font-bold font-heading text-deep-charcoal">Fetched Handles:</h2>
                    <ul className="list-disc pl-6 text-deep-charcoal/70 font-sans mb-6">
                        {products.length > 0 ? products.map(p => (
                            <li key={p.handle}>{p.handle}</li>
                        )) : <li>None.</li>}
                    </ul>

                    {products.length === 0 && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-800 text-sm font-sans space-y-2">
                            <p><strong>Note:</strong> We fetched 0 products.</p>
                            <p>If you are on Vercel, this means your Environment Variables are either misspelled, missing from the "Production" environment, or the GraphQL request is failing to authenticate.</p>
                            <ul className="list-disc pl-4 mt-2">
                                <li><strong>SHOPIFY_STORE_DOMAIN</strong>: {process.env.SHOPIFY_STORE_DOMAIN ? "✅ Set" : "❌ MISSING"}</li>
                                <li><strong>SHOPIFY_STOREFRONT_ACCESS_TOKEN</strong>: {process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? "✅ Set" : "❌ MISSING"}</li>
                            </ul>
                            <p className="text-xs opacity-70 mt-2">Double check that there are no extra spaces or quotes around the token in Vercel.</p>
                        </div>
                    )}
                </div>
                <Footer />
            </main>
        );
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
