console.log('JavaScript SIKA aktif');

// ===== 1. Seleksi elemen =====
const formMahasiswa = document.getElementById('formMahasiswa');
const nim = document.getElementById('nim');
const nama = document.getElementById('nama');
const email = document.getElementById('email');
const prodi = document.getElementById('prodi');
const errorNim = document.getElementById('errorNim');
const errorNama = document.getElementById('errorNama');
const errorEmail = document.getElementById('errorEmail');
const errorProdi = document.getElementById('errorProdi');

const btnCek = document.getElementById('btnCek');
const statusAplikasi = document.getElementById('statusAplikasi');
const cari = document.getElementById('cariMahasiswa');
const rows = document.querySelectorAll('#tabelMahasiswa tbody tr');

// ===== 2. Fungsi =====
function setError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = '';
}

function validateNim() {
  const value = nim.value.trim();
  const numeric = /^\d{8}$/;

  if (!numeric.test(value)) {
    setError(errorNim, 'NIM harus terdiri dari 8 digit.');
    nim.classList.add('input-error');
    return false;
  }

  clearError(errorNim);
  nim.classList.remove('input-error');
  return true;
}

function validateNama() {
  const value = nama.value.trim();

  if (value.length < 3) {
    setError(errorNama, 'Nama minimal 3 karakter.');
    return false;
  }

  clearError(errorNama);
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(value)) {
    setError(errorEmail, 'Format email tidak valid.');
    return false;
  }

  clearError(errorEmail);
  return true;
}

function validateProdi() {
  if (prodi.value === '') {
    setError(errorProdi, 'Program studi wajib dipilih.');
    return false;
  }

  clearError(errorProdi);
  return true;
}

// ===== 3. Event: form mahasiswa =====
if (formMahasiswa) {
  nim.addEventListener('blur', validateNim);
  nama.addEventListener('blur', validateNama);
  email.addEventListener('blur', validateEmail);
  prodi.addEventListener('change', validateProdi);

  formMahasiswa.addEventListener('submit', function (event) {
    const nimValid = validateNim();
    const namaValid = validateNama();
    const emailValid = validateEmail();
    const prodiValid = validateProdi();

    if (!nimValid || !namaValid || !emailValid || !prodiValid) {
      event.preventDefault();
      return;
    }

    event.preventDefault(); // Bab 4 belum menyimpan ke database
    alert('Validasi berhasil. Data siap diproses pada tahap PHP.');
  });
}

// ===== Event: tombol cek status =====
if (btnCek && statusAplikasi) {
  btnCek.addEventListener('click', function () {
    statusAplikasi.textContent = 'SIKA aktif dan JavaScript berjalan.';
    statusAplikasi.classList.add('success');
  });
}

// ===== Event: pencarian tabel =====
if (cari) {
  cari.addEventListener('input', function () {
    const keyword = cari.value.trim().toLowerCase();

    rows.forEach(function (row) {
      const text = row.textContent.toLowerCase();
      row.hidden = !text.includes(keyword);
    });
  });
}
