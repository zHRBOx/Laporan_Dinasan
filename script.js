// =================================================================================
// DATA & KONFIGURASI
// =================================================================================
const DROPBOX_BACKUP_FILENAME = '/Backup-Laporan-Lengkap.json'; // Nama file backup tunggal
// ... (sisa kode konfigurasi tidak berubah) ...
const penyeliaData = {
    'Y': { nama: 'YADI SUPRIADI', nipp: '44662' },
    'R': { nama: 'ROFI NOVIYANUS', nipp: '54706' },
    'A': { nama: 'ARIEF KURNIAWAN', nipp: '42003' },
    'S': { nama: 'SUHADI ASMARA', nipp: '44726' },
    'F': { nama: 'FAZHAR SEPTIA ILLHAM', nipp: '48552' },
    'M': { nama: 'MUHAMAD FITRA', nipp: '65933' }
};
const crewData = [
    { nama: 'ROFI NOVIYANUS', upt: 'PWK' }, { nama: 'ARIEF KURNIAWAN', upt: 'PWK' },
    { nama: 'SUHADI ASMARA', upt: 'PWK' }, { nama: 'FAZHAR SEPTIA ILLHAM', upt: 'PWK' },
    { nama: 'MUHAMAD FITRA', upt: 'PWK' }, { nama: 'RIYAD FIRDAUS', upt: 'PWK' },
    { nama: 'UJANG SURYA', upt: 'PWK' }, { nama: 'PUTUT RESTU WIBOWO', upt: 'PWK' },
    { nama: 'UNGGUL HENDRA EKA PRATAMA', upt: 'PWK' }, { nama: 'APEP ANDRIANTO', upt: 'PWK' },
    { nama: 'HERI ISKANDAR', upt: 'PWK' }, { nama: 'MURDANI', upt: 'PWK' },
    { nama: 'ALIF SUHARDIMAN', upt: 'PWK' }, { nama: 'NOPIYANA', upt: 'PWK' },
    { nama: 'JUNAEDI', upt: 'PWK' }, { nama: 'ANDRI NURJANA', upt: 'PWK' },
    { nama: 'ANDRIANA', upt: 'PWK' }, { nama: 'ANTO KRISTANTO', upt: 'PWK' },
    { nama: 'CECEP ARI NUGRAHA', upt: 'PWK' }, { nama: 'ARIS SETIAWAN', upt: 'PWK' },
    { nama: 'ANTONIUS TRI SETYANTO', upt: 'PWK' }, { nama: 'MAHESA BIMA ADI PANGESTU', upt: 'PWK' },
    { nama: 'FAYZA HAFIZH ARDIANSYAH', upt: 'PWK' }
];
const syncMap = {
    'loko-tabelAkhir-367': ['tabelAwal-R335', 'tabelAwal-327', 'tabelAwal-331', 'tabelAkhir-326', 'tabelAkhir-330', 'tabelAkhir-334'],
    'loko-tabelAkhir-R325': ['tabelAwal-325', 'tabelAwal-329', 'tabelAwal-350', 'tabelAkhir-328', 'tabelAkhir-332'],
    'loko-tabelAkhir-349': ['tabelAwal-333'],
    'loko-nextDay-tabelAkhir-334': ['tabelAwal-348'],
    'loko-nextDay-tabelAkhir-349': ['tabelAkhir-R325'],
    'loko-nextDay-tabelAwal-333': ['tabelAkhir-R325'],
    'kru-tabelAwal-R335': ['tabelAkhir-326'],
    'kru-tabelAwal-348': ['tabelAkhir-349'],
    'kru-tabelAwal-325': ['tabelAkhir-328'],
    'kru-tabelAwal-327': ['tabelAkhir-330'],
    'kru-tabelAwal-329': ['tabelAkhir-332'],
    'kru-tabelAwal-331': ['tabelAkhir-334'],
    'kru-nextDay-tabelAwal-350': ['tabelAkhir-367'],
    'kru-nextDay-tabelAwal-333': ['tabelAkhir-R325'],
};
const scheduledArrivalTimes = { '367':'00:35', 'R325':'04:15', '326':'07:25', '328':'09:36', '330':'13:08', '332':'14:50', '349':'17:35', '334':'20:12' };
const scheduledDepartureTimes = { 'R335': '04:05', '348': '04:25', '325': '05:10', '327': '09:20', '329': '10:45', '331': '13:35', '350': '16:25', '333': '18:05' };
const kejadianDefaultText = { '367':'BD 0 PWK {lambat} MANCARLI 0 TON', 'R325':'CKP 0 PWK {lambat} MANCARLI 0 TON', '326':'CKR 0 PWK {lambat} MANCARLI 0 TON', '328':'CKR 0 PWK {lambat} MANCARLI 0 TON', '330':'CKR 0 PWK {lambat} MANCARLI 0 TON', '332':'CKR 0 PWK {lambat} MANCARLI 0 TON', '349':'BD 0 PWK {lambat} MANCARLI 0 TON', '334':'CKR 0 PWK {lambat} MANCARLI 0 TON' };
const defaultTabelAwalNoKa = ['R335', '348', '325', '327', '329', '331', '350', '333'];
const defaultTabelAkhirNoKa = ['367', 'R325', '326', '328', '330', '332', '349', '334'];
let currentSelectedDate = null;

// =================================================================================
// HELPER & UTILITY FUNCTIONS
// =================================================================================
function formatDate(date) { /* ... (tidak berubah) ... */ return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; }
function getTomorrowDate(currentDateStr) { /* ... (tidak berubah) ... */ if (!currentDateStr) return null; const d = new Date(currentDateStr + 'T00:00:00'); d.setDate(d.getDate() + 1); return formatDate(d); }
function showMessageBox(title, message) { /* ... (tidak berubah) ... */ const e = document.querySelector('.message-box-container'); if(e) e.remove(); const t = document.createElement('div'); t.className = 'message-box-container fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4'; t.innerHTML = `<div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"><h3 class="text-xl font-bold mb-4 text-gray-800">${title}</h3><p class="text-gray-700 mb-6">${message}</p><button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full" onclick="this.closest('.message-box-container').remove()">OK</button></div>`; document.body.appendChild(t); }

// =================================================================================
// LOGIKA PENGATURAN & DROPBOX
// =================================================================================
function promptForSettingsAccess() { /* ... (tidak berubah) ... */ const u=prompt("Masukkan Username:");if(u===null)return;const p=prompt("Masukkan Password:");if(p===null)return;if(u==='zHRBOx'&&p==='zHRBOx')document.getElementById('settingsPanel').classList.toggle('hidden');else showMessageBox("Akses Ditolak","Username atau password yang Anda masukkan salah.");}
function updateDropboxUI() { /* ... (tidak berubah) ... */ const t=localStorage.getItem('dropboxToken');const i=document.getElementById('dropbox-token-input-section');const c=document.getElementById('dropbox-connected-section');if(t){i.classList.add('hidden');c.classList.remove('hidden');}else{i.classList.remove('hidden');c.classList.add('hidden');}}
function saveDropboxToken() { /* ... (tidak berubah) ... */ const t=document.getElementById('dropboxToken').value.trim();if(t){localStorage.setItem('dropboxToken',t);updateDropboxUI();showMessageBox("Sukses","Token Dropbox berhasil disimpan.");}else showMessageBox("Error","Token tidak boleh kosong.");}
function changeDropboxToken() { /* ... (tidak berubah) ... */ localStorage.removeItem('dropboxToken');document.getElementById('dropboxToken').value='';updateDropboxUI();}

/**
 * [DIUBAH] Fungsi untuk mem-backup SEMUA data dari localStorage ke satu file di Dropbox.
 */
async function backupAllDataToDropbox() {
    const token = localStorage.getItem('dropboxToken');
    if (!token) {
        showMessageBox("Info", "Token Dropbox belum diatur.");
        return;
    }

    const allReports = {};
    const dataPrefix = 'laporanDinasData_';
    let reportCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(dataPrefix)) {
            const date = key.substring(dataPrefix.length);
            allReports[date] = JSON.parse(localStorage.getItem(key));
            reportCount++;
        }
    }

    if (reportCount === 0) {
        showMessageBox("Info", "Tidak ada data laporan untuk di-backup.");
        return;
    }

    const args = { path: DROPBOX_BACKUP_FILENAME, mode: 'overwrite', autorename: false, mute: true };
    try {
        const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Dropbox-API-Arg': JSON.stringify(args), 'Content-Type': 'application/octet-stream' },
            body: JSON.stringify(allReports, null, 2)
        });
        if (response.ok) {
            showMessageBox("Backup Sukses", `${reportCount} laporan berhasil di-backup ke Dropbox.`);
        } else {
            const errorData = await response.json();
            showMessageBox("Dropbox Error", `Gagal menyimpan backup. Status: ${errorData.error_summary}`);
        }
    } catch (error) {
        showMessageBox("Network Error", "Gagal terhubung ke Dropbox.");
    }
}

/**
 * [DIUBAH] Fungsi untuk mengambil SEMUA data dari satu file backup di Dropbox dan memulihkannya ke localStorage.
 */
async function fetchAllDataFromDropbox() {
    const token = localStorage.getItem('dropboxToken');
    if (!token) {
        showMessageBox("Info", "Token Dropbox belum diatur.");
        return;
    }

    const args = { path: DROPBOX_BACKUP_FILENAME };
    try {
        const response = await fetch('https://content.dropboxapi.com/2/files/download', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Dropbox-API-Arg': JSON.stringify(args) }
        });

        if (response.ok) {
            const allReports = await response.json();
            let restoredCount = 0;
            Object.keys(allReports).forEach(dateKey => {
                const storageKey = `laporanDinasData_${dateKey}`;
                localStorage.setItem(storageKey, JSON.stringify(allReports[dateKey]));
                restoredCount++;
            });
            showMessageBox("Pemulihan Sukses", `${restoredCount} laporan berhasil dipulihkan dari Dropbox. Silakan pilih tanggal untuk melihatnya.`);
        } else {
            const errorData = await response.json();
            if (response.status === 409) { // File not found
                showMessageBox("Info", "File backup di Dropbox tidak ditemukan.");
            } else {
                showMessageBox("Dropbox Error", `Gagal mengambil backup. Status: ${errorData.error_summary}`);
            }
        }
    } catch (error) {
        showMessageBox("Network Error", "Gagal terhubung ke Dropbox.");
    }
}

// Fungsi saveDataToDropbox dan fetchDataFromDropbox untuk auto-save per tanggal (opsional, bisa dihapus jika tidak ingin auto-save)
async function saveDataToDropbox(dateString, data) { /* ... (tidak berubah) ... */ const t = localStorage.getItem('dropboxToken'); if (!t) return false; const p = `/Laporan Harian/${dateString}.json`; const a = { path: p, mode: 'overwrite' }; try { const r = await fetch('https://content.dropboxapi.com/2/files/upload', { method: 'POST', headers: { 'Authorization': `Bearer ${t}`, 'Dropbox-API-Arg': JSON.stringify(a), 'Content-Type': 'application/octet-stream' }, body: JSON.stringify(data) }); return r.ok; } catch (e) { return false; } }
async function fetchDataFromDropbox(dateString) { /* ... (tidak berubah) ... */ const t = localStorage.getItem('dropboxToken'); if (!t) return null; const p = `/Laporan Harian/${dateString}.json`; const a = { path: p }; try { const r = await fetch('https://content.dropboxapi.com/2/files/download', { method: 'POST', headers: { 'Authorization': `Bearer ${t}`, 'Dropbox-API-Arg': JSON.stringify(a) } }); if (r.ok) return await r.json(); else return null; } catch (e) { return null; } }

// =================================================================================
// LOGIKA SINKRONISASI & UI (Sisa kode tidak berubah)
// =================================================================================
function updateKeteranganAwalDinas(event) { /* ... */ }
function handleSync(event) { /* ... */ }
function triggerSync(triggerKey, data) { /* ... */ }
function updateDataOnCurrentPage(tableId, ka, data) { /* ... */ }
function updateDataForNextDay(tableId, ka, data) { /* ... */ }
function runCascadingSync() { /* ... */ }
function addRow(tableId, rowData = {}) { /* ... */ }
function collectPageData() { /* ... */ }
function deleteRow(buttonElement) { /* ... */ }
function reNumberRows(tableId) { /* ... */ }
function saveToFile() { /* ... */ }
function handlePenyeliaInput(event) { /* ... */ }
function showSuggestions(inputElement, suggestions) { /* ... */ }
function hideSuggestions() { /* ... */ }
function selectSuggestion(selectedName, selectedUpt, targetCell) { /* ... */ }
function handleCrewInput(event) { /* ... */ }
function delayedHideSuggestions() { /* ... */ }
function populatePage(data) { /* ... */ }
function populateTable(tableId, data) { /* ... */ }
function loadFromJson(event) { /* ... */ }
function printReport() { /* ... */ }
function processSignaturesForPrint(clonedSignaturesSection) { /* ... */ }
function processAkhirDinasForPrint(clonedSectionAkhir) { /* ... */ }
function setDynamicDate(elementId, dateString = null) { /* ... */ }
function updateDelayColumn(event) { /* ... */ }
async function handleDateSelection() { /* ... */ }
function exitReport() { /* ... */ }


// =================================================================================
// EVENT LISTENERS INITIALIZATION
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
    updateDropboxUI();

    const lastDate = localStorage.getItem('lastActiveDate');
    if (lastDate) {
        document.getElementById('reportDate').value = lastDate;
        handleDateSelection();
    }

    // --- Tombol & Kontrol Utama ---
    document.getElementById('selectDateBtn').addEventListener('click', handleDateSelection);
    document.getElementById('exitReportBtn').addEventListener('click', exitReport);
    document.getElementById('printReportBtn').addEventListener('click', printReport);
    
    // --- Tombol & Kontrol Pengaturan ---
    document.getElementById('settingsBtn').addEventListener('click', promptForSettingsAccess);
    document.getElementById('saveTokenBtn').addEventListener('click', saveDropboxToken);
    document.getElementById('changeTokenBtn').addEventListener('click', changeDropboxToken);

    // [DIUBAH] Listener untuk tombol manajemen data manual
    document.getElementById('loadFromFileBtn').addEventListener('click', () => document.getElementById('json-input').click());
    document.getElementById('json-input').addEventListener('change', loadFromJson);
    document.getElementById('saveToFileBtn').addEventListener('click', saveToFile);
    document.getElementById('loadFromDropboxBtn').addEventListener('click', fetchAllDataFromDropbox); // Memanggil fungsi baru
    document.getElementById('saveToDropboxBtn').addEventListener('click', backupAllDataToDropbox); // Memanggil fungsi baru

    // --- Sisa Listener (tidak berubah) ---
    document.getElementById('addRowAwalBtn').addEventListener('click', () => addRow('tabelAwal'));
    document.getElementById('addRowAkhirBtn').addEventListener('click', () => addRow('tabelAkhir'));
    document.addEventListener('click', (event) => { if (event.target.closest('.delete-row-btn')) { deleteRow(event.target.closest('.delete-row-btn')); } if (!event.target.closest('#crew-suggestions')) { hideSuggestions(); } });
    const mainContent = document.getElementById('screen-content');
    mainContent.addEventListener('keyup', (event) => { const target = event.target; if (target.isContentEditable) { const cellIndex = target.cellIndex; const tableId = target.closest('table')?.id; const isCrewCell = (tableId === 'tabelAwal' && (cellIndex === 2 || cellIndex === 3)) || (tableId === 'tabelAkhir' && (cellIndex === 5 || cellIndex === 6)); if (isCrewCell) { handleCrewInput(event); } handleSync(event); } });
    document.querySelectorAll('.signature-block .name').forEach(field => { field.addEventListener('keyup', handlePenyeliaInput); });
    window.addEventListener('beforeunload', () => { if (currentSelectedDate) { const dataToSave = collectPageData(); localStorage.setItem(`laporanDinasData_${currentSelectedDate}`, JSON.stringify(dataToSave)); saveDataToDropbox(currentSelectedDate, dataToSave); localStorage.setItem('lastActiveDate', currentSelectedDate); } });
});
