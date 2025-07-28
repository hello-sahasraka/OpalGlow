export default function getCart() {
    let cart  = localStorage.getItem('cart');

    if (cart == null) {
        let cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        return [];
    }

    return JSON.parse(cart);
}

export function addToCart(productData, quantity) {
    const cart = getCart();

    const productIndex = cart.findIndex( product => product.id === productData.productId);

    if (productIndex === -1) {
        const product = {
            id: productData.productId,
            name: productData.name,
            altNames: productData.altNames,
            image: productData.image[0],
            price: productData.price,
            labeledPrice: productData.labeledPrice,
            quantity: quantity || 1,
        }

        cart.push(product);
    } else {
        cart[productIndex].quantity = quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
}

export function removeFromCart(productData) {
    const cart = getCart();
    const updatedCart = cart.filter(product => product.id !== productData.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
}