"use client";

import { Container, Button } from "@/components/ui";
import styles from "@/app/product/page.module.css";
import { useState } from "react";
import type { Product } from "@/lib/shopify";

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

    const imageNode = product.images.nodes[0];

    return (
        <Container className={styles.container}>
            <div className={styles.gallery}>
                {imageNode ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageNode.url}
                        alt={imageNode.altText || product.title}
                        className={styles.imagePlaceholder}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        No Image Available
                    </div>
                )}
            </div>

            <div className={styles.details}>
                <span className={styles.inStock}>In Stock • Ready to Ship</span>
                <h1 className={styles.title}>{product.title}</h1>
                <p className={styles.price}>{price}</p>

                <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

                <div className={styles.actions}>
                    <Button size="lg" onClick={handleAddToCart} disabled={isAdding}>
                        {isAdding ? "Processing..." : "Add to Bag"}
                    </Button>
                </div>

                <div className={styles.meta}>
                    <p>Includes: Device, Charging Dock, Adapter, Manual</p>
                    <p>Warranty: 2 Years</p>
                    <p>Free Shipping within Germany</p>
                </div>
            </div>
        </Container>
    );
}
