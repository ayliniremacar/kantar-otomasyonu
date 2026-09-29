document.getElementById('vehicle-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
  
    // Formdaki verileri al
    const driverFirstName = document.getElementById('driver-first-name').value;
    const driverLastName = document.getElementById('driver-last-name').value;
    const tcId = document.getElementById('tc-id').value;
    const vehiclePlate = document.getElementById('vehicle-plate').value;
    const towTruckPlate = document.getElementById('tow-truck-plate').value;
    const towTruckPlate2 = document.getElementById('tow-truck-plate-2').value;
    const registrationNumber = document.getElementById('registration-number').value;
    const companyName = document.getElementById('company-name').value;
    const description = document.getElementById('description').value;
  
    // Kaydedilen bilgileri ekranda göster
    document.getElementById('saved-data').innerHTML = `
      <p><strong>Şoför Adı:</strong> ${driverFirstName}</p>
      <p><strong>Şoför Soyadı:</strong> ${driverLastName}</p>
      <p><strong>TC Kimlik No:</strong> ${tcId}</p>
      <p><strong>Araç Plakası:</strong> ${vehiclePlate}</p>
      <p><strong>Çekici Plakası:</strong> ${towTruckPlate}</p>
      <p><strong>Çekici Plakası 2:</strong> ${towTruckPlate2}</p>
      <p><strong>Ruhsat Numarası:</strong> ${registrationNumber}</p>
      <p><strong>Firma Adı:</strong> ${companyName}</p>
      <p><strong>Açıklama:</strong> ${description}</p>
    `;
  });
  
  // Silme Butonu İşlevi
  document.getElementById('delete-btn').addEventListener('click', function() {
    // Formdaki tüm alanları temizler
    document.getElementById('vehicle-form').reset();
  
    // Kaydedilen veriyi de temizlemek isterseniz:
    document.getElementById('saved-data').innerHTML = '';
  });
  
  // Düzenleme Butonu İşlevi
  document.getElementById('edit-btn').addEventListener('click', function() {
    // Örnek olarak mevcut veriyi düzenlemek için form alanlarına geri yazar
    const existingData = {
      driverFirstName: 'Ali',
      driverLastName: 'Veli',
      tcId: '12345678901',
      vehiclePlate: '34ABC12',
      towTruckPlate: '34XYZ34',
      towTruckPlate2: '34XYZ35',
      registrationNumber: 'RUHSAT123',
      companyName: 'Örnek Firma',
      description: 'Araç açıklaması buraya gelecek.'
    };
  
    // Form alanlarını doldurur
    document.getElementById('driver-first-name').value = existingData.driverFirstName;
    document.getElementById('driver-last-name').value = existingData.driverLastName;
    document.getElementById('tc-id').value = existingData.tcId;
    document.getElementById('vehicle-plate').value = existingData.vehiclePlate;
    document.getElementById('tow-truck-plate').value = existingData.towTruckPlate;
    document.getElementById('tow-truck-plate-2').value = existingData.towTruckPlate2;
    document.getElementById('registration-number').value = existingData.registrationNumber;
    document.getElementById('company-name').value = existingData.companyName;
    document.getElementById('description').value = existingData.description;
  });
  