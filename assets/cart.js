//Functionality for the Add-To-Cart button
function addToCart(variantId, quantity = 1) {
  return fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: variantId,
      quantity: quantity
    })
  }).then(res => res.json());
}

//Function to get the current status of the cart
function fetchCart() {
  return fetch('/cart.js')
    .then(res => res.json())
    .then(cart => {
      updateCartUI(cart);
    });
}

//Updates the Cart-UI-badge 
function updateCartUI(cart) {
  const badge = document.querySelector('#cart-count-badge');
  if (badge) {
    const count = cart.item_count;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.add-to-cart-button');

  fetchCart(); //On siteload, updates the Cart

  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const variantId = button.dataset.variantId;
      if (variantId) {
        addToCart(variantId).then(() => fetchCart());
      }
    });
  }
  //Periodically updates the cart
  setInterval(fetchCart, 30000);
});
