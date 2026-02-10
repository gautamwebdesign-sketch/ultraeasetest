"use client";

import { Container, Button } from "@/components/ui";
import styles from "@/app/product/page.module.css";
import { useState } from "react";
import type { Product } from "@/lib/shopify";

import { Gallery } from "./Gallery";
import { Truck, ShieldCheck, Zap, RotateCcw } from "lucide-react";

interface ProductViewProps {
    product: Product;
}

export function ProductView({ product }: ProductViewProps) {
    const [isAdding, setIsAdding] = useState(false);

    // Format price
    const price = new Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: product.priceRange.minVariantPrice.currencyCode,
    }).format(parseFloat(product.priceRange.minVariantPrice.amount));

    /* 
       We need the store domain for the checkout URL. 
       Since this is a client component, we can't access process.env securely if it's not prefixed with NEXT_PUBLIC_.
       For now, we will hardcode the domain or pass it as a prop. 
       Let's pass it as a prop for cleanliness, but for this iteration, hardcoding the known domain is safer/faster.
    */
    const STORE_DOMAIN = "ultra-ease.myshopify.com";

    const handleAddToCart = () => {
        setIsAdding(true);

        const variantId = product.variants.nodes[0]?.id;
        if (!variantId) {
            alert("Product variant not found");
            setIsAdding(false);
            return;
        }

        // specific logic to handle GID (Global ID) from Shopify to Variant ID number 
        // GID format: gid://shopify/ProductVariant/123456789
        // We can use the whole GID for some APIs, but often the permalink cart url expects the number.
        // However, the standard permalink format /cart/variant_id:1 usually works with the numeric ID.
        // Let's try to extract it.
        const numericId = variantId.split("/").pop();

        // Construct checkout URL
        const checkoutUrl = `https://${STORE_DOMAIN}/cart/${numericId}:1`;

        // Redirect
        window.location.href = checkoutUrl;
    };

    return (
        <Container className={styles.container}>
            <div className={styles.gallery}>
                <Gallery media={product.media} />
            </div>

            <div className={styles.details}>
                <div className={styles.header}>
                    <span className={styles.badge}>New Release</span>
                    <h1 className={styles.title}>{product.title}</h1>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>{price}</span>
                        <span className={styles.shippingBadge}>Free Express Shipping</span>
                    </div>
                </div>

                <div className={styles.actionsBox}>
                    <Button size="lg" onClick={handleAddToCart} disabled={isAdding} className={styles.addToCartBtn}>
                        {isAdding ? "Processing..." : "Add to Bag"}
                    </Button>
                    <p className={styles.guaranteeText}>30-Day Money-Back Guarantee</p>
                </div>

                <div className={styles.featuresGrid}>
                    <div className={styles.featureItem}>
                        <Zap className={styles.featureIcon} size={20} />
                        <div>
                            <h4>Instant Relief</h4>
                            <p>Advanced ultrasound technology</p>
                        </div>
                    </div>
                    <div className={styles.featureItem}>
                        <ShieldCheck className={styles.featureIcon} size={20} />
                        <div>
                            <h4>2-Year Warranty</h4>
                            <p>Full coverage protection</p>
                        </div>
                    </div>
                    <div className={styles.featureItem}>
                        <Truck className={styles.featureIcon} size={20} />
                        <div>
                            <h4>Fast Application</h4>
                            <p>Just 10 mins per session</p>
                        </div>
                    </div>
                    <div className={styles.featureItem}>
                        <RotateCcw className={styles.featureIcon} size={20} />
                        <div>
                            <h4>Risk Free</h4>
                            <p>Try it at home for 30 days</p>
                        </div>
                    </div>
                </div>

                <div className={styles.descriptionSection}>
                    <h3>Product Overview</h3>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                </div>

                <div className={styles.boxContent}>
                    <h3>What's in the Box</h3>
                    <ul className={styles.boxList}>
                        <li>1x Ultraease Device</li>
                        <li>1x Charging Dock</li>
                        <li>1x Power Adapter</li>
                        <li>1x User Manual</li>
                        <li>1x Travel Case</li>
                    </ul>
                </div>
            </div>
        </Container>
    );
}
