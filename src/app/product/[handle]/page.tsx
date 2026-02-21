import { getProductByHandle } from "@/lib/shopify";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Container } from "@/components/ui/Container";
import { Navbar, Footer } from "@/components/layout";
import { notFound } from "next/navigation";

// Optional: If we want Next.js to cache this page for 1 hour, we can export revalidate = 3600;
// export const revalidate = 3600; 

export default async function ProductPage({ params }: { params: { handle: string } }) {
    const product = await getProductByHandle(params.handle);

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 font-mono space-y-4">
                <h1 className="text-3xl text-red-500 font-bold">Debug: Product Not Found</h1>
                <div className="bg-white/10 p-6 rounded-lg w-full max-w-2xl space-y-2">
                    <p><span className="text-blue-400">Requested Handle:</span> {params.handle}</p>
                    <p>
                        <span className="text-blue-400">SHOPIFY_STORE_DOMAIN:</span>{' '}
                        {process.env.SHOPIFY_STORE_DOMAIN ? `Set (${process.env.SHOPIFY_STORE_DOMAIN})` : "Missing or Undefined"}
                    </p>
                    <p>
                        <span className="text-blue-400">SHOPIFY_STOREFRONT_ACCESS_TOKEN:</span>{' '}
                        {process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
                            ? `Set (Length: ${process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN.length})`
                            : "Missing or Undefined"}
                    </p>
                    <p className="text-amber-500 mt-4 text-sm">
                        If the variables above are "Missing", Vercel is not passing them to this Server Component.
                        Check if they are added as Environment Variables in Vercel settings, and ensure you trigger a new deployment AFTER adding them.
                    </p>
                </div>
            </div>
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
