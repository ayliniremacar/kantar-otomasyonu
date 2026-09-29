// ── Cari Ekle Formu ──────────────────────────────────────────────────────────

/**
 * localStorage'dan kayıtlı carileri döner.
 * @returns {Array} Cari listesi
 */
function getStoredCustomers() {
  return JSON.parse(localStorage.getItem('kantar_cariler') || '[]');
}

/**
 * Cariyi localStorage'a kaydeder.
 * @param {Object} customer
 */
function saveCustomer(customer) {
  const list = getStoredCustomers();
  list.push(customer);
  localStorage.setItem('kantar_cariler', JSON.stringify(list));
}

// Saydedilen carileri sayfada tabloya yaz
function renderSavedCustomers() {
  const list = getStoredCustomers();
  const container = document.getElementById('saved-data');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '<p class="text-muted">Henüz cari kaydedilmedi.</p>';
    return;
  }

  container.innerHTML = list.map((c, i) => `
    <div class="saved-item">
      <strong>#${i + 1} — ${c.companyName}</strong>
      <span>${c.authorizedName} | ${c.phone} | ${c.customerType}</span>
    </div>
  `).join('');
}

// Form submit
const customerForm = document.getElementById('customer-form');
if (customerForm) {
  customerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const customer = {
      id: Date.now(),
      companyName:    document.getElementById('company-name').value.trim(),
      authorizedName: document.getElementById('authorized-name').value.trim(),
      idNumber:       document.getElementById('id-number').value.trim(),
      address:        document.getElementById('address').value.trim(),
      city:           document.getElementById('city').value.trim(),
      district:       document.getElementById('district').value.trim(),
      taxOffice:      document.getElementById('tax-office').value.trim(),
      taxNumber:      document.getElementById('tax-number').value.trim(),
      phone:          document.getElementById('phone').value.trim(),
      fax:            document.getElementById('fax').value.trim(),
      mobile:         document.getElementById('mobile').value.trim(),
      email:          document.getElementById('email').value.trim(),
      customerType:   document.querySelector('input[name="customer-type"]:checked').value,
    };

    saveCustomer(customer);
    renderSavedCustomers();
    customerForm.reset();

    // Kullanıcıya bilgi ver
    const msg = document.getElementById('success-msg');
    if (msg) {
      msg.textContent = `✅ "${customer.companyName}" başarıyla kaydedildi.`;
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 3000);
    }
  });
}

// Sil butonu — seçili kaydı sil (şimdilik tüm listeyi temizler)
const deleteBtn = document.getElementById('delete-btn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', function () {
    if (confirm('Tüm cari kayıtlarını silmek istiyor musunuz?')) {
      localStorage.removeItem('kantar_cariler');
      renderSavedCustomers();
    }
  });
}

// Düzenleme butonu — örnek veri ile form doldurma (demo)
const editBtn = document.getElementById('edit-btn');
if (editBtn) {
  editBtn.addEventListener('click', function () {
    const list = getStoredCustomers();
    if (list.length === 0) return;
    const last = list[list.length - 1];
    document.getElementById('company-name').value    = last.companyName;
    document.getElementById('authorized-name').value = last.authorizedName;
    document.getElementById('id-number').value       = last.idNumber;
    document.getElementById('address').value         = last.address;
    document.getElementById('city').value            = last.city;
    document.getElementById('district').value        = last.district;
    document.getElementById('tax-office').value      = last.taxOffice;
    document.getElementById('tax-number').value      = last.taxNumber;
    document.getElementById('phone').value           = last.phone;
    document.getElementById('fax').value             = last.fax;
    document.getElementById('mobile').value          = last.mobile;
    document.getElementById('email').value           = last.email;
    const radioEl = document.querySelector(`input[name="customer-type"][value="${last.customerType}"]`);
    if (radioEl) radioEl.checked = true;
  });
}

// Sayfa yüklendiğinde kayıtları göster
renderSavedCustomers();