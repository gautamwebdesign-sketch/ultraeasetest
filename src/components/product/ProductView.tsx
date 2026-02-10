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

    const handleAddToCart = () => {
        setIsAdding(true);
        // Simulate API call or redirect to checkout
        // Ideally, we would create a checkout mutation here
        setTimeout(() => {
            setIsAdding(false);
            alert(`Added ${product.title} to cart! (Checkout integration pending)`);
        }, 1000);
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
