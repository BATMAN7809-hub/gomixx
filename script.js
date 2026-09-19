let cart = [];
let totalOrdersCount = 0;
let totalSalesAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  const adminBtn = document.getElementById('adminBtn');
  const adminModal = document.getElementById('adminModal');
  const closeAdmin = document.getElementById('closeAdmin');

  const orderForm = document.getElementById('orderForm');
  const itemQty = document.getElementById('itemQty');
  const calculatedTotal = document.getElementById('calculatedTotal');

  // MANEJO DEL CARRITO
  cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('active');
    overlay.style.display = 'block';
  });

  const closeCartFunc = () => {
    cartDrawer.classList.remove('active');
    overlay.style.display = 'none';
  };

  closeCart.addEventListener('click', closeCartFunc);
  overlay.addEventListener('click', closeCartFunc);

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.target.dataset.name;
      const price = parseInt(e.target.dataset.price);

      const existing = cart.find(i => i.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCart();
      cartDrawer.classList.add('active');
      overlay.style.display = 'block';
    });
  });

  function updateCart() {
    cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);

    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="color:#666; text-align:center;">El carrito está vacío</p>';
      cartTotal.innerText = '$0 COP';
      return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      const div = document.createElement('div');
      div.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid #222; padding-bottom:8px;';
      div.innerHTML = `
        <div>
          <b style="font-size:0.85rem">${item.name}</b><br>
          <small style="color:#888">$5.000 x ${item.qty}</small>
        </div>
        <b style="color:#a2ff00">$${itemTotal.toLocaleString('es-CO')}</b>
      `;
      cartItems.appendChild(div);
    });

    cartTotal.innerText = `$${total.toLocaleString('es-CO')} COP`;
  }

  // SIMULADOR DE PEDIDO
  itemQty.addEventListener('change', () => {
    const qty = parseInt(itemQty.value) || 1;
    const total = 5000 * qty;
    calculatedTotal.innerText = `$${total.toLocaleString('es-CO')} COP`;
  });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const qty = parseInt(itemQty.value);
    const spicy = document.getElementById('spicyLevel').value;
    const notes = document.getElementById('orderNotes').value;
    const total = 5000 * qty;

    totalOrdersCount++;
    totalSalesAmount += total;

    document.getElementById('totalOrdersCount').innerText = totalOrdersCount;
    document.getElementById('totalSalesAmount').innerText = `$${totalSalesAmount.toLocaleString('es-CO')} COP`;

    const text = `¡Hola Gomix! 👋 Pedido de ${name}:%0A- Vaso Gomix Original x${qty}%0A- Picante: ${spicy}%0A- Nota: ${notes || 'Sin notas'}%0A*Total:* $${total.toLocaleString('es-CO')} COP`;
    window.open(`https://wa.me/573000000000?text=${text}`, '_blank');
  });

  // PANEL ADMIN
  adminBtn.addEventListener('click', () => adminModal.style.display = 'flex');
  closeAdmin.addEventListener('click', () => adminModal.style.display = 'none');
});
