// Estado global de la aplicación
let cart = [];
let totalOrders = 0;
let totalSales = 0;

document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS DEL DOM
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  const adminBtn = document.getElementById('adminBtn');
  const adminModal = document.getElementById('adminModal');
  const closeAdmin = document.getElementById('closeAdmin');

  const orderForm = document.getElementById('orderForm');
  const productSelect = document.getElementById('productSelect');
  const itemQty = document.getElementById('itemQty');
  const calculatedTotal = document.getElementById('calculatedTotal');

  // MANEJO DEL CARRITO
  cartBtn.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartDrawer);
  overlay.addEventListener('click', closeCartDrawer);

  function openCart() {
    cartDrawer.classList.add('active');
    overlay.style.display = 'block';
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    overlay.style.display = 'none';
  }

  // AGREGAR AL CARRITO DESDE LAS TARJETAS
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.target.dataset.name;
      const price = parseInt(e.target.dataset.price);

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCartUI();
      openCart();
    });
  });

  function updateCartUI() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="color:#777; text-align:center;">El carrito está vacío</p>';
      cartTotal.innerText = '$0 COP';
      return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      const div = document.createElement('div');
      div.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #222; padding-bottom:10px;';
      div.innerHTML = `
        <div>
          <b>${item.name}</b><br>
          <small>$${item.price.toLocaleString('es-CO')} x ${item.qty}</small>
        </div>
        <b>$${itemTotal.toLocaleString('es-CO')}</b>
      `;
      cartItems.appendChild(div);
    });

    cartTotal.innerText = `$${total.toLocaleString('es-CO')} COP`;
  }

  // SIMULACIÓN DE FORMULARIO DE PEDIDO
  function updateOrderTotal() {
    const unitPrice = parseInt(productSelect.value);
    const qty = parseInt(itemQty.value) || 1;
    const total = unitPrice * qty;
    calculatedTotal.innerText = `$${total.toLocaleString('es-CO')} COP`;
  }

  productSelect.addEventListener('change', updateOrderTotal);
  itemQty.addEventListener('input', updateOrderTotal);

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const productName = selectedOption.dataset.name;
    const price = parseInt(productSelect.value);
    const qty = parseInt(itemQty.value);
    const spicy = document.getElementById('spicyLevel').value;
    const notes = document.getElementById('orderNotes').value;

    const total = price * qty;

    // Actualizar datos del admin
    totalOrders++;
    totalSales += total;
    document.getElementById('totalOrdersCount').innerText = totalOrders;
    document.getElementById('totalSalesAmount').innerText = `$${totalSales.toLocaleString('es-CO')} COP`;

    // Redirección simulada a WhatsApp
    const message = `¡Hola Gomix! 👋 Quisiera hacer un pedido:%0A%0A- *Cliente:* ${name}%0A- *Producto:* ${productName}%0A- *Cantidad:* ${qty}%0A- *Picante:* ${spicy}%0A- *Notas:* ${notes || 'Ninguna'}%0A- *Total:* $${total.toLocaleString('es-CO')} COP`;
    
    window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return alert('Tu carrito está vacío');
    
    let total = 0;
    let summary = '¡Hola Gomix! 👋 Mi pedido del carrito:%0A%0A';
    
    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      summary += `- ${item.qty}x ${item.name} ($${itemTotal.toLocaleString('es-CO')})%0A`;
    });

    summary += `%0A*Total:* $${total.toLocaleString('es-CO')} COP`;

    totalOrders++;
    totalSales += total;
    document.getElementById('totalOrdersCount').innerText = totalOrders;
    document.getElementById('totalSalesAmount').innerText = `$${totalSales.toLocaleString('es-CO')} COP`;

    window.open(`https://wa.me/573000000000?text=${summary}`, '_blank');
  });

  // PANEL ADMIN
  adminBtn.addEventListener('click', () => adminModal.style.display = 'flex');
  closeAdmin.addEventListener('click', () => adminModal.style.display = 'none');
});


