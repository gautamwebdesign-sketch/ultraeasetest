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

export type MediaType = 'IMAGE' | 'VIDEO' | 'EXTERNAL_VIDEO';

export interface MediaItem {
    id: string;
    type: MediaType;
    url: string; // Image URL or Video source URL or Embed URL
    altText?: string;
    previewImage?: {
        url: string;
    };
}

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
    media: MediaItem[];
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
        media(first: 10) {
          nodes {
            ... on MediaImage {
              id
              mediaContentType
              image {
                url
                altText
              }
            }
            ... on Video {
              id
              mediaContentType
              sources {
                url
                mimeType
              }
              previewImage {
                url
              }
            }
            ... on ExternalVideo {
              id
              mediaContentType
              embedUrl
              host
            }
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
            media: node.media.nodes.map((m: any) => {
                let type: MediaType = 'IMAGE';
                let url = '';
                let altText = '';
                let previewImage = undefined;

                if (m.mediaContentType === 'IMAGE') {
                    type = 'IMAGE';
                    url = m.image?.url;
                    altText = m.image?.altText;
                } else if (m.mediaContentType === 'VIDEO') {
                    type = 'VIDEO';
                    // Prefer mp4 or first source
                    const source = m.sources.find((s: any) => s.mimeType === 'video/mp4') || m.sources[0];
                    url = source?.url;
                    previewImage = { url: m.previewImage?.url };
                } else if (m.mediaContentType === 'EXTERNAL_VIDEO') {
                    type = 'EXTERNAL_VIDEO';
                    url = m.embedUrl;
                }

                return {
                    id: m.id,
                    type,
                    url,
                    altText,
                    previewImage,
                };
            }),
        }));
    } catch (error) {
        console.error("Error fetching products from Shopify:", error);
        return [];
    }
}
