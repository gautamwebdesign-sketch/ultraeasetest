const domain = 'ultra-ease.myshopify.com';
const token = 'f5daba78a05cb7f9be69bf9fa8e389a4';

const query = `
query {
  products(first: 5) {
    nodes {
      id
      title
      handle
    }
  }
}
`;

fetch(`https://${domain}/api/2024-01/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
