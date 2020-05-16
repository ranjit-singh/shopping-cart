export async function getCart() {
const res = await fetch('../mock/cart.json');
return await res.json();
}
