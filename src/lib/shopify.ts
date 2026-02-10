import { GraphQLClient } from 'graphql-request';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Ensure we are on the server
if (typeof window !== "undefined") {
    throw new Error("This module can only be used on the server");
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        'X-Shopify-Storefront-Access-Token': accessToken || '',
        'Content-Type': 'application/json',
    },
});

export interface Product {
    id: string;
    title: string;
    handle: string;
    descriptionHtml: string;
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    variants: {
        nodes: {
            id: string;
        }[];
    };
    images: {
        nodes: {
            url: string;
            altText: string;
        }[];
    };
}

const productsQuery = `
  query Products {
    products(first: 5) {
      nodes {
        id
        title
        handle
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
          }
        }
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<Product[]> {
    if (!domain || !accessToken) {
        console.warn("Missing Shopify credentials. Returning mock data.");
        return [];
    }

    try {
        const data: any = await graphQLClient.request(productsQuery);
        return data.products.nodes.map((node: any) => ({
            id: node.id,
            title: node.title,
            handle: node.handle,
            descriptionHtml: node.descriptionHtml,
            priceRange: {
                minVariantPrice: {
                    amount: node.priceRange.minVariantPrice.amount,
                    currencyCode: node.priceRange.minVariantPrice.currencyCode,
                },
            },
            variants: {
                nodes: node.variants.nodes.map((v: any) => ({
                    id: v.id,
                })),
            },
            images: {
                nodes: node.images.nodes.map((img: any) => ({
                    url: img.url,
                    altText: img.altText,
                })),
            },
        }));
    } catch (error) {
        console.error("Error fetching products from Shopify:", error);
        return [];
    }
}
