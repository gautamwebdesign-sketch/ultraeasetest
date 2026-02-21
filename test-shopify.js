// test-shopify.js

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

const query = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
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
                variables: { handle: "ultrasound-device-for-home-wireless-warming-physiological-therapy" },
            }),
        });

        const body = await result.json();
        console.log("Response Status:", result.status);
        console.log("Response Body:", JSON.stringify(body, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
