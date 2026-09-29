// ── Sipariş Ekle Formu ───────────────────────────────────────────────────────

// Toplam tutarı hesapla
function calculateTotal() {
  const quantity = parseFloat(document.getElementById('quantity').value) || 0;
  const price    = parseFloat(document.getElementById('price').value)    || 0;
  const vat      = parseFloat(document.getElementById('vat').value)      || 0;

  const total = quantity * price * (1 + vat / 100);
  document.getElementById('total-amount').value = total.toFixed(2);
}

// localStorage yardımcıları
function getStoredOrders() {
  return JSON.parse(localStorage.getItem('kantar_siparisler') || '[]');
}

function saveOrder(order) {
  const list = getStoredOrders();
  list.push(order);
  localStorage.setItem('kantar_siparisler', JSON.stringify(list));
}

// Kaydedilen siparişleri sayfada göster
function renderSavedOrders() {
  const list = getStoredOrders();
  const container = document.getElementById('saved-data');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '<p class="text-muted">Henüz sipariş kaydedilmedi.</p>';
    return;
  }

  container.innerHTML = list.map((o, i) => `
    <div class="saved-item">
      <strong>#${i + 1} — Sipariş No: ${o.orderNumber}</strong>
      <span>${o.customerName} | ${o.stockName} | Miktar: ${o.quantity} | Toplam: ${o.totalAmount} ₺</span>
    </div>
  `).join('');
}

// Form submit
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const order = {
      id:           Date.now(),
      orderNumber:  document.getElementById('order-number').value.trim(),
      customerName: document.getElementById('customer-name').value.trim(),
      stockName:    document.getElementById('stock-name').value.trim(),
      quantity:     document.getElementById('quantity').value,
      price:        document.getElementById('price').value,
      vat:          document.getElementById('vat').value,
      totalAmount:  document.getElementById('total-amount').value,
      // Ana sayfada dropdown'da gösterilecek etiket
      displayLabel: `${document.getElementById('order-number').value.trim()} — ${document.getElementById('customer-name').value.trim()}`,
    };

    saveOrder(order);
    renderSavedOrders();
    orderForm.reset();

    const msg = document.getElementById('success-msg');
    if (msg) {
      msg.textContent = `✅ Sipariş #${order.orderNumber} başarıyla kaydedildi.`;
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 3000);
    }
  });
}

// Sil butonu
const deleteBtn = document.getElementById('delete-btn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', function () {
    if (confirm('Tüm sipariş kayıtlarını silmek istiyor musunuz?')) {
      localStorage.removeItem('kantar_siparisler');
      renderSavedOrders();
    }
  });
}

// Düzenleme butonu — son kaydı forma geri yükle
const editBtn = document.getElementById('edit-btn');
if (editBtn) {
  editBtn.addEventListener('click', function () {
    const list = getStoredOrders();
    if (list.length === 0) return;
    const last = list[list.length - 1];
    document.getElementById('order-number').value  = last.orderNumber;
    document.getElementById('customer-name').value = last.customerName;
    document.getElementById('stock-name').value    = last.stockName;
    document.getElementById('quantity').value       = last.quantity;
    document.getElementById('price').value          = last.price;
    document.getElementById('vat').value            = last.vat;
    calculateTotal();
  });
}

// KDV / Miktar / Fiyat değişince toplam tutarı güncelle
document.getElementById('vat')?.addEventListener('change', calculateTotal);
document.getElementById('quantity')?.addEventListener('input', calculateTotal);
document.getElementById('price')?.addEventListener('input', calculateTotal);

// Sayfa yüklenince kayıtları göster
renderSavedOrders();