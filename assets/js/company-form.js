// Form gönderildiğinde (Kaydet butonuna basıldığında) gerçekleşen işlemler
document.getElementById('company-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini önler

  // Formdaki verileri al
  const companyName = document.getElementById('company-name').value;
  const taxOffice = document.getElementById('tax-office').value;
  const taxNumber = document.getElementById('tax-number').value;
  const companyAddress = document.getElementById('company-address').value;
  const city = document.getElementById('city').value;
  const district = document.getElementById('district').value;
  const phone = document.getElementById('phone').value;
  const fax = document.getElementById('fax').value;
  const email = document.getElementById('email').value;

  // Kaydedilen bilgileri ekranda göster
  document.getElementById('saved-data').innerHTML = `
    <p><strong>Ana Şirket Adı:</strong> ${companyName}</p>
    <p><strong>Vergi Dairesi:</strong> ${taxOffice}</p>
    <p><strong>Vergi No:</strong> ${taxNumber}</p>
    <p><strong>Şirket Adresi:</strong> ${companyAddress}</p>
    <p><strong>İl:</strong> ${city}</p>
    <p><strong>İlçe:</strong> ${district}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Faks:</strong> ${fax}</p>
    <p><strong>E-posta:</strong> ${email}</p>
  `;
});

// Silme Butonu İşlevi
document.querySelector('.btn-danger').addEventListener('click', function() {
  // Formdaki tüm alanları temizler
  document.getElementById('company-form').reset();

  // Kaydedilen veriyi de temizlemek isterseniz:
  document.getElementById('saved-data').innerHTML = '';
});

// Düzenleme Butonu İşlevi
document.querySelector('.btn-warning').addEventListener('click', function() {
  // Örnek olarak mevcut veriyi düzenlemek için form alanlarına geri yazar
  const existingData = {
    companyName: 'Örnek Şirket A.Ş.',
    taxOffice: 'İstanbul',
    taxNumber: '1234567890',
    companyAddress: 'Levent Mahallesi, İstanbul',
    city: 'İstanbul',
    district: 'Beşiktaş',
    phone: '0212 123 45 67',
    fax: '0212 123 45 68',
    email: 'info@ornek.com'
  };

  // Form alanlarını doldurur
  document.getElementById('company-name').value = existingData.companyName;
  document.getElementById('tax-office').value = existingData.taxOffice;
  document.getElementById('tax-number').value = existingData.taxNumber;
  document.getElementById('company-address').value = existingData.companyAddress;
  document.getElementById('city').value = existingData.city;
  document.getElementById('district').value = existingData.district;
  document.getElementById('phone').value = existingData.phone;
  document.getElementById('fax').value = existingData.fax;
  document.getElementById('email').value = existingData.email;
});









// Kantar Formu İşlemleri
document.getElementById('kantar-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

  // Formdaki verileri al
  const kantarName = document.getElementById('kantar-name').value;
  const kantarLocation = document.getElementById('kantar-location').value;

  // Kaydedilen bilgileri ekranda göster
  document.getElementById('big-weight').innerHTML = `
    <p><strong>Kantar Adı:</strong> ${kantarName}</p>
    <p><strong>Kantar Lokasyonu:</strong> ${kantarLocation}</p>
  `;
});

// Tartım Bilgileri Kaydetme
document.getElementById('save-weighing').addEventListener('click', function() {
  // Örnek olarak verileri al
  const firstWeighing = document.getElementById('first-weighing').value;
  const secondWeighing = document.getElementById('second-weighing').value;
  const netWeighing = document.getElementById('net-weighing').value;

  // Kaydedilen bilgileri ekranda göster
  document.getElementById('big-weight').innerHTML = `
    <p><strong>1. Tartım Bilgisi:</strong> ${firstWeighing}</p>
    <p><strong>2. Tartım Bilgisi:</strong> ${secondWeighing}</p>
    <p><strong>Net Tartım:</strong> ${netWeighing}</p>
  `;
});