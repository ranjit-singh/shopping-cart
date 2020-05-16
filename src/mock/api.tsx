export async function getCart() {
const res = await fetch('../mock/cart.json');
return res.json();
}
