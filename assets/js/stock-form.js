// ── Stok Ekle Formu ──────────────────────────────────────────────────────────

/**
 * localStorage'dan kayıtlı stokları döner.
 * @returns {Array}
 */
function getStoredStocks() {
  return JSON.parse(localStorage.getItem('kantar_stoklar') || '[]');
}

/**
 * Stoğu localStorage'a kaydeder.
 * @param {Object} stock
 */
function saveStock(stock) {
  const list = getStoredStocks();
  list.push(stock);
  localStorage.setItem('kantar_stoklar', JSON.stringify(list));
}

// Kaydedilen stokları sayfada göster
function renderSavedStocks() {
  const list = getStoredStocks();
  const container = document.getElementById('saved-data');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '<p class="text-muted">Henüz stok kaydedilmedi.</p>';
    return;
  }

  container.innerHTML = list.map((s, i) => `
    <div class="saved-item">
      <strong>#${i + 1} — [${s.stockCode}] ${s.stockName}</strong>
      <span>${s.description || '—'}</span>
    </div>
  `).join('');
}

// Form submit
const stokForm = document.getElementById('stok-form');
if (stokForm) {
  stokForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const stock = {
      id:          Date.now(),
      stockCode:   document.getElementById('stock-code').value.trim(),
      stockName:   document.getElementById('stock-name').value.trim(),
      description: document.getElementById('description').value.trim(),
    };

    saveStock(stock);
    renderSavedStocks();
    stokForm.reset();

    const msg = document.getElementById('success-msg');
    if (msg) {
      msg.textContent = `✅ "${stock.stockName}" başarıyla kaydedildi.`;
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 3000);
    }
  });
}

// Sil butonu
const deleteBtn = document.getElementById('delete-btn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', function () {
    if (confirm('Tüm stok kayıtlarını silmek istiyor musunuz?')) {
      localStorage.removeItem('kantar_stoklar');
      renderSavedStocks();
    }
  });
}

// Düzenleme butonu — son kaydı forma geri yükle
const editBtn = document.getElementById('edit-btn');
if (editBtn) {
  editBtn.addEventListener('click', function () {
    const list = getStoredStocks();
    if (list.length === 0) return;
    const last = list[list.length - 1];
    document.getElementById('stock-code').value  = last.stockCode;
    document.getElementById('stock-name').value  = last.stockName;
    document.getElementById('description').value = last.description;
  });
}

// Sayfa yüklenince mevcut kayıtları göster
renderSavedStocks();