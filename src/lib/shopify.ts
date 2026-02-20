const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export type MediaType = 'IMAGE' | 'VIDEO' | 'EXTERNAL_VIDEO';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  altText?: string;
  previewImage?: { url: string };
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

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags = [],
}: {
  query: string;
  variables?: any;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken!,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags.length && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error('Error in Shopify Fetch:', error);
    throw error;
  }
}

const getProductByHandleQuery = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
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
          mediaContentType
          ... on MediaImage {
            id
            image {
              url
              altText
            }
          }
          ... on Video {
            id
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
            embedUrl
            host
          }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!domain || !accessToken) return null;

  try {
    const response = await shopifyFetch<any>({
      query: getProductByHandleQuery,
      variables: { handle },
      tags: ['product', handle]
    });

    const product = response.body.data.productByHandle;

    if (!product) return null;

    // Map media items
    const parsedMedia = product.media.nodes.map((m: any) => {
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
        const source = m.sources?.find((s: any) => s.mimeType === 'video/mp4') || m.sources?.[0];
        url = source?.url;
        previewImage = { url: m.previewImage?.url };
      } else if (m.mediaContentType === 'EXTERNAL_VIDEO') {
        type = 'EXTERNAL_VIDEO';
        url = m.embedUrl;
      }

      return {
        id: m.id || Math.random().toString(),
        type,
        url,
        altText,
        previewImage,
      };
    });

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      descriptionHtml: product.descriptionHtml,
      priceRange: {
        minVariantPrice: {
          amount: product.priceRange.minVariantPrice.amount,
          currencyCode: product.priceRange.minVariantPrice.currencyCode,
        }
      },
      variants: {
        nodes: product.variants.nodes.map((v: any) => ({ id: v.id }))
      },
      media: parsedMedia
    };

  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}
