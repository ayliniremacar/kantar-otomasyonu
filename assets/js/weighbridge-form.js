// ── Kantar Ana Formu & Tartım Hesabı ─────────────────────────────────────────

// ── 1. localStorage'dan Cari & Stok dropdown'larını doldur ───────────────────
function populateDropdown(selectId, storageKey, labelField, valueField) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const items = JSON.parse(localStorage.getItem(storageKey) || '[]');

  // Mevcut statik seçenekleri koru (ilk option = "Seç")
  // Dinamik olarak eklenenleri temizle (data-dynamic="true")
  Array.from(select.options).forEach(opt => {
    if (opt.dataset.dynamic === 'true') opt.remove();
  });

  if (items.length === 0) return;

  items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item[valueField] || item.id;
    opt.textContent = item[labelField];
    opt.dataset.dynamic = 'true';
    select.appendChild(opt);
  });
}

function loadDropdowns() {
  // Cari dropdown: şirket adını göster
  populateDropdown('cari', 'kantar_cariler', 'companyName', 'id');
  // Stok dropdown: stok adını göster
  populateDropdown('stok', 'kantar_stoklar', 'stockName', 'id');
  // Sipariş dropdown: sipariş numarası + cari adını göster
  populateDropdown('siparis', 'kantar_siparisler', 'displayLabel', 'id');
}

// ── 2. Net Tartım Otomatik Hesaplama ─────────────────────────────────────────
function calculateNetWeight() {
  const first  = parseFloat(document.getElementById('first-weighing').value)  || 0;
  const second = parseFloat(document.getElementById('second-weighing').value) || 0;

  const netEl = document.getElementById('net-weighing');
  if (!netEl) return;

  if (first > 0 || second > 0) {
    const net = first - second;
    netEl.value = net.toFixed(2);

    // Büyük göstergede anlık güncelle
    const bigWeight = document.getElementById('big-weight');
    if (bigWeight) {
      bigWeight.textContent = net.toFixed(2) + ' kg';
    }
  } else {
    netEl.value = '';
  }
}

// ── 3. Tartım Kaydet butonu ───────────────────────────────────────────────────
const saveWeighingBtn = document.getElementById('save-weighing');
if (saveWeighingBtn) {
  saveWeighingBtn.addEventListener('click', function () {
    const firstWeighing  = document.getElementById('first-weighing').value;
    const secondWeighing = document.getElementById('second-weighing').value;
    const netWeighing    = document.getElementById('net-weighing').value;

    const bigWeightEl = document.getElementById('big-weight');
    if (bigWeightEl) {
      bigWeightEl.innerHTML = `
        <p><strong>1. Tartım:</strong> ${firstWeighing || '—'} kg</p>
        <p><strong>2. Tartım:</strong> ${secondWeighing || '—'} kg</p>
        <p><strong>Net Tartım:</strong> ${netWeighing || '—'} kg</p>
      `;
    }
  });
}

// ── 4. Kantar Bilgi Giriş Formu kaydet ───────────────────────────────────────
const weighbridgeForm = document.getElementById('weighbridge-entry-form');
if (weighbridgeForm) {
  weighbridgeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const cariSelect = document.getElementById('cari');
    const stokSelect = document.getElementById('stok');

    const record = {
      id:          Date.now(),
      plaka:       document.getElementById('plaka').value.trim(),
      cari:        cariSelect.options[cariSelect.selectedIndex]?.text || '',
      stok:        stokSelect.options[stokSelect.selectedIndex]?.text || '',
      siparis:     document.getElementById('siparis').value,
      surucuAdi:   document.getElementById('surucuAdi').value.trim(),
      irsaliyeNo:  document.getElementById('irsaliyeNo').value.trim(),
      tartimTipi:  document.getElementById('tartimTipi').value,
      fiyat:       document.getElementById('fiyat').value.trim(),
      fire:        document.getElementById('fire').value.trim(),
      tcNo:        document.getElementById('tcNo').value.trim(),
      telNo:       document.getElementById('telNo').value.trim(),
      depo:        document.getElementById('depo').value,
      firstWeigh:  document.getElementById('first-weighing').value,
      secondWeigh: document.getElementById('second-weighing').value,
      netWeigh:    document.getElementById('net-weighing').value,
      tarih:       new Date().toLocaleString('tr-TR'),
    };

    // localStorage'a kaydet
    const records = JSON.parse(localStorage.getItem('kantar_tartimlar') || '[]');
    records.push(record);
    localStorage.setItem('kantar_tartimlar', JSON.stringify(records));

    alert(`✅ Tartım kaydedildi!\nPlaka: ${record.plaka} | Net: ${record.netWeigh} kg`);
    weighbridgeForm.reset();
    loadDropdowns(); // dropdown'ları tekrar doldur
  });
}

// ── 5. Event listener'lar: tartım inputları değişince otomatik hesapla ────────
const firstInput  = document.getElementById('first-weighing');
const secondInput = document.getElementById('second-weighing');

if (firstInput)  firstInput.addEventListener('input',  calculateNetWeight);
if (secondInput) secondInput.addEventListener('input',  calculateNetWeight);

// ── 6. Sayfa yüklenince dropdown'ları doldur ─────────────────────────────────
document.addEventListener('DOMContentLoaded', loadDropdowns);

// DOMContentLoaded zaten geçmişse direkt çağır
if (document.readyState !== 'loading') loadDropdowns();