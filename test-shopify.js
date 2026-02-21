// test-shopify.js

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

const query = `
  query getProducts {
    products(first: 10) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;

async function test() {
  console.log("Domain:", domain);
  console.log("Token length:", accessToken ? accessToken.length : 0);

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken || '',
      },
      body: JSON.stringify({
        query,
      }),
    });

    const body = await result.json();
    console.log("Response Status:", result.status);
    const handles = body.data.products.nodes.map(n => n.handle);
    console.log("Handles:", handles);
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
