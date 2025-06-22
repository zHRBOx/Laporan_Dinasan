// =================================================================================
// DATA & KONFIGURASI
// =================================================================================

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

// --- PEMETAAN SINKRONISASI ---
const syncMap = {
    // === ATURAN LOKOMOTIF ===
    'loko-tabelAkhir-367': [
        'tabelAwal-R335', 'tabelAwal-327', 'tabelAwal-331',
        'tabelAkhir-326', 'tabelAkhir-330', 'tabelAkhir-334'
    ],
    'loko-tabelAkhir-R325': [
        'tabelAwal-325', 'tabelAwal-329', 'tabelAwal-350',
        'tabelAkhir-328', 'tabelAkhir-332'
    ],
    'loko-tabelAkhir-349': ['tabelAwal-333'],
    
    // ATURAN HARI BERIKUTNYA
    'loko-nextDay-tabelAkhir-334': ['tabelAwal-348'],
    'loko-nextDay-tabelAkhir-349': ['tabelAkhir-R325'],
    'loko-nextDay-tabelAwal-333': ['tabelAkhir-R325'],

    // === ATURAN KRU ===
    'kru-tabelAwal-R335': ['tabelAkhir-326'],
    'kru-tabelAwal-348': ['tabelAkhir-349'],
    'kru-tabelAwal-325': ['tabelAkhir-328'],
    'kru-tabelAwal-327': ['tabelAkhir-330'],
    'kru-tabelAwal-329': ['tabelAkhir-332'],
    'kru-tabelAwal-331': ['tabelAkhir-334'],
    'kru-nextDay-tabelAwal-350': ['tabelAkhir-367'],
    'kru-nextDay-tabelAwal-333': ['tabelAkhir-R325'],
};

// --- KONSTANTA WAKTU & TEKS DEFAULT ---
const scheduledArrivalTimes = { '367':'00:35', 'R325':'04:15', '326':'07:25', '328':'09:36', '330':'13:08', '332':'14:50', '349':'17:35', '334':'20:12' };

const scheduledDepartureTimes = {
    'R335': '04:05', '348': '04:25', '325': '05:10', '327': '09:20',
    '329': '10:45', '331': '13:35', '350': '16:25', '333': '18:05'
};

const kejadianDefaultText = { 
    '367':'BD 0 PWK {lambat} MANCARLI 0 TON', 
    'R325':'CKP 0 PWK {lambat} MANCARLI 0 TON', 
    '326':'CKR 0 PWK {lambat} MANCARLI 0 TON', 
    '328':'CKR 0 PWK {lambat} MANCARLI 0 TON', 
    '330':'CKR 0 PWK {lambat} MANCARLI 0 TON', 
    '332':'CKR 0 PWK {lambat} MANCARLI 0 TON', 
    '349':'BD 0 PWK {lambat} MANCARLI 0 TON', 
    '334':'CKR 0 PWK {lambat} MANCARLI 0 TON' 
};
const defaultTabelAwalNoKa = ['R335', '348', '325', '327', '329', '331', '350', '333'];
const defaultTabelAkhirNoKa = ['367', 'R325', '326', '328', '330', '332', '349', '334'];
let currentSelectedDate = null;

// =================================================================================
// HELPER & UTILITY FUNCTIONS
// =================================================================================
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getTomorrowDate(currentDateStr) {
    if (!currentDateStr) return null;
    const tomorrow = new Date(currentDateStr + 'T00:00:00');
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
}

function showMessageBox(title, message) {
    const existingBox = document.querySelector('.message-box-container');
    if(existingBox) existingBox.remove();
    
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box-container fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4';
    messageBox.innerHTML = `<div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"><h3 class="text-xl font-bold mb-4 text-gray-800">${title}</h3><p class="text-gray-700 mb-6">${message}</p><button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full" onclick="this.closest('.message-box-container').remove()">OK</button></div>`;
    document.body.appendChild(messageBox);
}

// =================================================================================
// LOGIKA PENGATURAN & DROPBOX
// =================================================================================

function promptForSettingsAccess() {
    const username = prompt("Masukkan Username:");
    if (username === null) return;
    const password = prompt("Masukkan Password:");
    if (password === null) return;

    if (username === 'zHRBOx' && password === 'zHRBOx') {
        document.getElementById('settingsPanel').classList.toggle('hidden');
    } else {
        showMessageBox("Akses Ditolak", "Username atau password yang Anda masukkan salah.");
    }
}

function updateDropboxUI() {
    const token = localStorage.getItem('dropboxToken');
    const tokenInputSection = document.getElementById('dropbox-token-input-section');
    const connectedSection = document.getElementById('dropbox-connected-section');
    
    if (token) {
        tokenInputSection.classList.add('hidden');
        connectedSection.classList.remove('hidden');
    } else {
        tokenInputSection.classList.remove('hidden');
        connectedSection.classList.add('hidden');
    }
}

function saveDropboxToken() {
    const tokenInput = document.getElementById('dropboxToken');
    const token = tokenInput.value.trim();
    if (token) {
        localStorage.setItem('dropboxToken', token);
        updateDropboxUI();
        showMessageBox("Sukses", "Token Dropbox berhasil disimpan. Penyimpanan otomatis kini aktif.");
    } else {
        showMessageBox("Error", "Token tidak boleh kosong.");
    }
}

function changeDropboxToken() {
    localStorage.removeItem('dropboxToken');
    document.getElementById('dropboxToken').value = '';
    updateDropboxUI();
}

async function saveDataToDropbox(dateString, data) {
    const token = localStorage.getItem('dropboxToken');
    if (!token) {
        console.log("Tidak ada token Dropbox, penyimpanan ke cloud dilewati.");
        return false; // Mengembalikan false jika gagal
    }

    const filePath = `/Laporan Dinas/${dateString}.json`;
    const args = { path: filePath, mode: 'overwrite', autorename: false, mute: true };

    try {
        const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Dropbox-API-Arg': JSON.stringify(args), 'Content-Type': 'application/octet-stream' },
            body: JSON.stringify(data, null, 2)
        });

        if (response.ok) {
            console.log(`Laporan tanggal ${dateString} berhasil disimpan ke Dropbox.`);
            return true; // Sukses
        } else {
            const errorData = await response.json();
            console.error("Gagal menyimpan ke Dropbox:", errorData);
            showMessageBox("Dropbox Error", `Gagal menyimpan data ke Dropbox. Status: ${response.statusText}`);
            return false;
        }
    } catch (error) {
        console.error("Terjadi kesalahan saat menghubungi Dropbox:", error);
        showMessageBox("Network Error", "Tidak dapat terhubung ke Dropbox. Periksa koneksi internet Anda.");
        return false;
    }
}

async function fetchDataFromDropbox(dateString) {
    const token = localStorage.getItem('dropboxToken');
    if (!token) {
        showMessageBox("Info", "Token Dropbox belum diatur. Silakan atur di menu Pengaturan.");
        return null;
    }

    const filePath = `/Laporan Dinas/${dateString}.json`;
    const args = { path: filePath };

    try {
        const response = await fetch('https://content.dropboxapi.com/2/files/download', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Dropbox-API-Arg': JSON.stringify(args) }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`Laporan tanggal ${dateString} berhasil diambil dari Dropbox.`);
            return data;
        } else {
            if (response.status !== 409) {
                 const errorData = await response.json();
                 console.error("Gagal mengambil data dari Dropbox:", errorData);
            }
            return null;
        }
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dari Dropbox:", error);
        return null;
    }
}

/**
 * [BARU] Fungsi untuk mengambil data dari Dropbox secara manual.
 */
async function manualFetchFromDropbox() {
    if (!currentSelectedDate) {
        showMessageBox("Perhatian", "Pilih tanggal laporan terlebih dahulu sebelum mengambil data dari Dropbox.");
        return;
    }
    const data = await fetchDataFromDropbox(currentSelectedDate);
    if (data) {
        populatePage(data);
        localStorage.setItem(`laporanDinasData_${currentSelectedDate}`, JSON.stringify(data));
        showMessageBox("Sukses", `Laporan untuk tanggal ${currentSelectedDate} berhasil diambil dari Dropbox.`);
    } else {
        showMessageBox("Info", `Tidak ada data laporan untuk tanggal ${currentSelectedDate} yang ditemukan di Dropbox.`);
    }
}

/**
 * [BARU] Fungsi untuk mem-backup data ke Dropbox secara manual.
 */
async function manualSaveToDropbox() {
    if (!currentSelectedDate) {
        showMessageBox("Perhatian", "Tidak ada laporan aktif untuk di-backup. Silakan pilih tanggal dan tampilkan laporan.");
        return;
    }
    const dataToSave = collectPageData();
    const success = await saveDataToDropbox(currentSelectedDate, dataToSave);
    if (success) {
        showMessageBox("Backup Sukses", `Laporan untuk tanggal ${currentSelectedDate} berhasil di-backup ke Dropbox.`);
    }
}

// =================================================================================
// LOGIKA SINKRONISASI & PERHITUNGAN (TIDAK BERUBAH)
// =================================================================================
function updateKeteranganAwalDinas(event) {
    const inputElement = event.target;
    const row = inputElement.closest('tr');
    if (!row) return;

    const noKa = row.cells[1]?.innerText.trim();
    const statusSpan = inputElement.nextElementSibling; // Span untuk menampilkan status
    if (!noKa || !statusSpan) return;

    const actualTime = inputElement.value;
    const scheduledTime = scheduledDepartureTimes[noKa];

    if (!actualTime || !scheduledTime) {
        statusSpan.innerHTML = '';
        return;
    }

    const dummyDate = '1970-01-01T';
    const actualDateTime = new Date(dummyDate + actualTime);
    const scheduledDateTime = new Date(dummyDate + scheduledTime);
    const diffMinutes = (actualDateTime - scheduledDateTime) / (1000 * 60);
    const absDiffMinutes = Math.abs(Math.round(diffMinutes));

    let statusText = '';
    let statusColor = 'text-gray-700';
    if (diffMinutes === 0) {
        statusText = 'TEPAT';
        statusColor = 'text-green-600 font-semibold';
    } else if (diffMinutes < 0) {
        statusText = `AWAL ${absDiffMinutes} Menit`;
        statusColor = 'text-blue-600 font-semibold';
    } else {
        statusText = `LAMBAT ${absDiffMinutes} Menit`;
        statusColor = 'text-red-600 font-semibold';
    }

    const clockIcon = `<svg style="display: inline-block; vertical-align: middle; width: 1em; height: 1em; margin-right: 4px;" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>`;
    
    statusSpan.innerHTML = `<span class="${statusColor}">${clockIcon} ${statusText}</span>`;
}

function handleSync(event) {
    const cell = event.target;
    const row = cell.closest('tr');
    if (!row || !row.cells[1]) return; 

    const sourceTableId = row.closest('table').id;
    const sourceKa = row.cells[1].innerText.trim();
    const cellIndex = cell.cellIndex;

    const isLokoColumn = (sourceTableId === 'tabelAwal' && cellIndex === 5) || (sourceTableId === 'tabelAkhir' && cellIndex === 2);
    const isCrewColumn = (sourceTableId === 'tabelAwal' && (cellIndex === 2 || cellIndex === 3)) || (sourceTableId === 'tabelAkhir' && (cellIndex === 5 || cellIndex === 6));
    
    if (isLokoColumn) {
        const lokoValue = row.cells[cellIndex].innerText.trim();
        triggerSync(`loko-${sourceTableId}-${sourceKa}`, { loko: lokoValue });
        triggerSync(`loko-nextDay-${sourceTableId}-${sourceKa}`, { loko: lokoValue });
    }

    if (isCrewColumn) {
        const masinisValue = sourceTableId === 'tabelAwal' ? row.cells[2].innerText.trim() : row.cells[5].innerText.trim();
        const asistenValue = sourceTableId === 'tabelAwal' ? row.cells[3].innerText.trim() : row.cells[6].innerText.trim();
        const uptValue = sourceTableId === 'tabelAwal' ? row.cells[4].innerText.trim() : row.cells[7].innerText.trim();
        const data = { masinis: masinisValue, asisten: asistenValue, upt: uptValue };
        triggerSync(`kru-${sourceTableId}-${sourceKa}`, data);
        triggerSync(`kru-nextDay-${sourceTableId}-${sourceKa}`, data);
    }
}

function triggerSync(triggerKey, data) {
    const targets = syncMap[triggerKey];
    if (!targets) return;

    const isNextDay = triggerKey.includes('nextDay');
    targets.forEach(target => {
        const [targetTableId, targetKa] = target.split('-');
        if (isNextDay) {
            updateDataForNextDay(targetTableId, targetKa, data);
        } else {
            updateDataOnCurrentPage(targetTableId, targetKa, data);
        }
    });
}

function updateDataOnCurrentPage(tableId, ka, data) {
    const table = document.getElementById(tableId);
    if (!table) return;

    for (const row of table.tBodies[0].rows) {
        if (row.cells[1] && row.cells[1].innerText.trim() === ka) {
            if (data.loko !== undefined) {
                const lokoCellIndex = (tableId === 'tabelAwal') ? 5 : 2;
                if (row.cells[lokoCellIndex]) row.cells[lokoCellIndex].innerText = data.loko;
            }
            if (data.masinis !== undefined) {
                const masinisCellIndex = (tableId === 'tabelAwal') ? 2 : 5;
                const asistenCellIndex = (tableId === 'tabelAwal') ? 3 : 6;
                const uptCellIndex = (tableId === 'tabelAwal') ? 4 : 7;
                if (row.cells[masinisCellIndex]) row.cells[masinisCellIndex].innerText = data.masinis;
                if (row.cells[asistenCellIndex]) row.cells[asistenCellIndex].innerText = data.asisten;
                if (row.cells[uptCellIndex]) row.cells[uptCellIndex].innerText = data.upt;
            }
        }
    }
}

function updateDataForNextDay(tableId, ka, data) {
    if (!currentSelectedDate) return;
    const nextDayKey = `laporanDinasData_${getTomorrowDate(currentSelectedDate)}`;
    let nextDayData;
    try {
        nextDayData = JSON.parse(localStorage.getItem(nextDayKey) || '{}');
    } catch (e) {
        nextDayData = {};
    }

    const targetTableName = tableId === 'tabelAwal' ? 'laporanAwalDinas' : 'laporanAkhirDinas';
    if (!nextDayData[targetTableName]?.data) {
        const defaultKaList = tableId === 'tabelAwal' ? defaultTabelAwalNoKa : defaultTabelAkhirNoKa;
        nextDayData[targetTableName] = { info: '', data: defaultKaList.map(noka => ({ NOKA: noka })) };
    }
    
    const targetRow = nextDayData[targetTableName].data.find(row => row.NOKA === ka);
    if (targetRow) {
        if (data.loko !== undefined) targetRow.NOLOKOMOTIF = data.loko;
        if (data.masinis !== undefined) targetRow.MASINIS = data.masinis;
        if (data.asisten !== undefined) targetRow.ASISTENMASINIS = data.asisten;
        if (data.upt !== undefined) targetRow.UPTCREWKA = data.upt;
        localStorage.setItem(nextDayKey, JSON.stringify(nextDayData));
    }
}

function runCascadingSync() {
    const cascadeTriggers = [
        'loko-tabelAkhir-R325',
        'loko-tabelAkhir-367'
    ];

    cascadeTriggers.forEach(baseTriggerKey => {
        const [, tableId, ka] = baseTriggerKey.split('-');
        const table = document.getElementById(tableId);
        if (!table) return;

        for (const row of table.tBodies[0].rows) {
            if (row.cells[1] && row.cells[1].innerText.trim() === ka) {
                const lokoCellIndex = (tableId === 'tabelAwal') ? 5 : 2;
                const lokoCell = row.cells[lokoCellIndex];
                
                if (lokoCell) {
                    const lokoValue = lokoCell.innerText.trim();
                    if (lokoValue && lokoValue !== 'CC20') {
                        triggerSync(baseTriggerKey, { loko: lokoValue });
                    }
                }
                break;
            }
        }
    });
}


// =================================================================================
// DOM & UI MANIPULATION
// =================================================================================

function addRow(tableId, rowData = {}) {
    const tableBody = document.getElementById(tableId).tBodies[0];
    const newRowIndex = tableBody.rows.length;
    const newRow = tableBody.insertRow();
    newRow.className = 'text-center hover:bg-gray-50';

    const cellKeys = (tableId === 'tabelAwal')
        ? ['no', 'NOKA', 'MASINIS', 'ASISTENMASINIS', 'UPTCREWKA', 'NOLOKOMOTIF', 'TONASE', 'KETERANGAN', 'aksi']
        : ['no', 'NOKA', 'NOLOKOMOTIF', 'JAMDATANG', 'LAMBATMenit', 'MASINIS', 'ASISTENMASINIS', 'UPTCREWKA', 'KEJADIANSELAMADALAMPERJALANAN', 'KETERANGAN', 'aksi'];

    cellKeys.forEach((key) => {
        const newCell = newRow.insertCell();
        newCell.className = 'border border-black p-2';
        const value = rowData[key];

        if (key === 'no') {
            newCell.innerText = newRowIndex + 1;
        } else if (key === 'aksi') {
            newCell.classList.add('no-print');
            newCell.innerHTML = `<button class="delete-row-btn text-red-500 hover:text-red-700"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`;
        } else if (key === 'JAMDATANG') { // Untuk Laporan Akhir Dinas
            const input = document.createElement('input');
            input.type = 'time';
            input.className = 'w-full h-full bg-transparent focus:outline-none focus:ring-0 text-center rounded-md';
            input.value = value || '';
            input.addEventListener('change', updateDelayColumn);
            newCell.appendChild(input);
        } else if (key === 'KETERANGAN' && tableId === 'tabelAwal') {
            // Logika dinamis untuk kolom KETERANGAN di Laporan Awal Dinas
            const noKa = rowData.NOKA || (defaultTabelAwalNoKa[newRowIndex] || '');
            const isSpecialTrain = scheduledDepartureTimes.hasOwnProperty(noKa);

            if (isSpecialTrain) {
                newCell.innerHTML = 'SIAP DINAS, BER PWK : ';
                const timeInput = document.createElement('input');
                timeInput.type = 'time';
                timeInput.className = 'w-24 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center rounded-md';
                timeInput.value = rowData.JAMBERANGKAT || ''; 
                timeInput.addEventListener('change', updateKeteranganAwalDinas);

                const statusSpan = document.createElement('span');
                statusSpan.className = 'departure-status ml-2';

                newCell.appendChild(timeInput);
                newCell.appendChild(statusSpan);
            } else {
                newCell.setAttribute('contenteditable', 'true');
                newCell.innerText = value || 'SIAP DINAS';
            }
        } else if (key === 'KETERANGAN' && tableId === 'tabelAkhir') {
            // Dropdown CCTV untuk Laporan Akhir Dinas
            const select = document.createElement('select');
            select.className = 'w-full bg-transparent border-none focus:ring-0 text-center';
            const options = ['CCTV ON', 'CCTV OFF'];
            options.forEach(optText => {
                const option = document.createElement('option');
                option.value = optText;
                option.innerText = optText;
                if (value === optText) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            newCell.appendChild(select);
        } else {
            newCell.setAttribute('contenteditable', 'true');
            if (value !== undefined && value !== null && value !== '') {
                newCell.innerText = value;
            } else {
                if (key === 'NOKA') {
                    const defaultArray = (tableId === 'tabelAwal') ? defaultTabelAwalNoKa : defaultTabelAkhirNoKa;
                    newCell.innerText = defaultArray[newRowIndex] || '';
                } else if (key === 'NOLOKOMOTIF') {
                    newCell.innerText = 'CC20';
                } else if (key === 'TONASE' && tableId === 'tabelAwal') { 
                    newCell.innerText = '325 TON';
                }
            }
        }
    });
}

function collectPageData() {
    const parseTable = (tableId) => {
        const keyToCellIndexMap = (tableId === 'tabelAwal')
            ? { NOKA: 1, MASINIS: 2, ASISTENMASINIS: 3, UPTCREWKA: 4, NOLOKOMOTIF: 5, TONASE: 6, KETERANGAN: 7 }
            : { NOKA: 1, NOLOKOMOTIF: 2, JAMDATANG: 3, LAMBATMenit: 4, MASINIS: 5, ASISTENMASINIS: 6, UPTCREWKA: 7, KEJADIANSELAMADALAMPERJALANAN: 8, KETERANGAN: 9 };

        const dataKeys = Object.keys(keyToCellIndexMap);
        const tableBody = document.getElementById(tableId).tBodies[0];

        return Array.from(tableBody.rows).map(row => {
            const rowData = {};
            for (const key of dataKeys) {
                const cell = row.cells[keyToCellIndexMap[key]];
                if (!cell) continue;

                if (key === 'JAMDATANG') { // Laporan Akhir
                    const timeInput = cell.querySelector('input[type="time"]');
                    rowData[key] = timeInput ? timeInput.value : '';
                } else if (key === 'KETERANGAN' && tableId === 'tabelAwal') {
                    const timeInput = cell.querySelector('input[type="time"]');
                    if (timeInput) {
                        rowData['JAMBERANGKAT'] = timeInput.value;
                        rowData[key] = 'SIAP DINAS';
                    } else {
                        rowData[key] = cell.innerText.trim();
                    }
                } else if (key === 'KETERANGAN' && tableId === 'tabelAkhir') {
                    const select = cell.querySelector('select');
                    rowData[key] = select ? select.value : '';
                } else {
                    rowData[key] = cell.innerText.trim();
                }
            }
            return rowData;
        });
    };
    const parseSignatures = () => {
        return Array.from(document.querySelectorAll('#signatures .signature-block')).map(block => ({
            Jabatan: block.querySelector('p:first-child').innerText.trim(),
            Nama: block.querySelector('.name').innerText.trim(),
            NIPP: block.querySelector('.nipp').innerText.trim()
        }));
    };
    return {
        laporanAwalDinas: { info: document.getElementById('infoAwal').innerText, data: parseTable('tabelAwal') },
        laporanAkhirDinas: { info: document.getElementById('infoAkhir').innerText, data: parseTable('tabelAkhir') },
        penyelia: parseSignatures()
    };
}


function deleteRow(buttonElement) {
    const row = buttonElement.closest('tr');
    if (!row) return;
    const tableId = row.closest('table').id;
    row.remove();
    reNumberRows(tableId);
}

function reNumberRows(tableId) {
    const tableBody = document.getElementById(tableId).tBodies[0];
    Array.from(tableBody.rows).forEach((row, index) => {
        if(row.cells[0]) row.cells[0].innerText = index + 1;
    });
}

function saveToFile() {
    const allReports = {};
    const dataPrefix = 'laporanDinasData_';
    let reportCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(dataPrefix)) {
            const date = key.substring(dataPrefix.length);
            try {
                allReports[date] = JSON.parse(localStorage.getItem(key));
                reportCount++;
            } catch (e) { console.error(`Gagal mem-parsing data untuk tanggal ${date}:`, e); }
        }
    }
    if (reportCount === 0) {
        showMessageBox("Info", "Tidak ada data laporan yang tersimpan di browser untuk di-backup.");
        return;
    }
    const filename = `Backup Laporan Dinas (Semua Tanggal).json`;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allReports, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showMessageBox("Backup Berhasil", `${reportCount} laporan dari tanggal yang berbeda telah berhasil disimpan ke file.`);
}

function handlePenyeliaInput(event) {
    const target = event.target;
    const text = target.innerText.trim().toUpperCase();
    const parentBlock = target.closest('.signature-block');
    const nippSpan = parentBlock.querySelector('.nipp');
    
    if (text.length === 1 && penyeliaData[text]) {
        const data = penyeliaData[text];
        target.innerText = data.nama;
        nippSpan.innerText = data.nipp;

        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(target);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (target.innerText.trim().length === 0) {
        nippSpan.innerText = '';
    }
}

function showSuggestions(inputElement, suggestions) {
    hideSuggestions();
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.id = 'crew-suggestions';
    const rect = inputElement.getBoundingClientRect();
    suggestionsDiv.style.left = `${rect.left + window.scrollX}px`;
    suggestionsDiv.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionsDiv.style.width = `${rect.width}px`;
    suggestions.forEach(crew => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.innerText = crew.nama;
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            selectSuggestion(crew.nama, crew.upt, inputElement);
        });
        suggestionsDiv.appendChild(item);
    });
    document.body.appendChild(suggestionsDiv);
}

function hideSuggestions() {
    const existingSuggestions = document.getElementById('crew-suggestions');
    if (existingSuggestions) { existingSuggestions.remove(); }
}

function selectSuggestion(selectedName, selectedUpt, targetCell) {
    targetCell.innerText = selectedName;
    const row = targetCell.closest('tr');
    if(!row) return;
    
    const tableId = row.closest('table').id;
    let uptCellIndex = tableId === 'tabelAwal' ? 4 : 7;
    
    if (row.cells[uptCellIndex]) {
        row.cells[uptCellIndex].innerText = selectedUpt;
    }

    hideSuggestions();
    targetCell.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true }));
}

function handleCrewInput(event) {
    const target = event.target;
    const text = target.innerText.trim().toUpperCase();
    
    if (text.length < 3) {
        hideSuggestions();
        return;
    }
    const inputPrefix = text.substring(0, 3);
    const matchingCrews = crewData.filter(crew => crew.nama.substring(0, 3).toUpperCase() === inputPrefix);
    
    if (matchingCrews.length > 1) {
        showSuggestions(target, matchingCrews);
    } else if (matchingCrews.length === 1) {
        const crew = matchingCrews[0];
        selectSuggestion(crew.nama, crew.upt, target);
    } else {
        hideSuggestions();
    }
}

function delayedHideSuggestions() {
    setTimeout(() => {
        const suggestionsDiv = document.getElementById('crew-suggestions');
        if (suggestionsDiv && (!document.activeElement || !suggestionsDiv.contains(document.activeElement))) {
            hideSuggestions();
        }
    }, 150);
}

function populatePage(data) {
    setDynamicDate('infoAwal', currentSelectedDate);
    setDynamicDate('infoAkhir', currentSelectedDate);
    populateTable('tabelAwal', data.laporanAwalDinas?.data || []);
    populateTable('tabelAkhir', data.laporanAkhirDinas?.data || []);
    const signatureBlocks = document.querySelectorAll('#signatures .signature-block');
    if (data.penyelia) {
        data.penyelia.forEach((sig, index) => {
            if(signatureBlocks[index]) {
                signatureBlocks[index].querySelector('.name').innerText = sig.Nama;
                signatureBlocks[index].querySelector('.nipp').innerText = sig.NIPP;
            }
        });
    } else {
         document.querySelectorAll('.signature-block .name, .signature-block .nipp').forEach(el => { el.innerText = ''; });
    }
}

function populateTable(tableId, data) {
    const tbody = document.getElementById(tableId).tBodies[0];
    tbody.innerHTML = '';
    const defaultData = (tableId === 'tabelAwal') ? defaultTabelAwalNoKa : defaultTabelAkhirNoKa;
    const sourceData = data.length > 0 ? data : defaultData.map(noka => ({ NOKA: noka }));

    sourceData.forEach((rowData) => { addRow(tableId, rowData); });

    if (tableId === 'tabelAwal') {
        tbody.querySelectorAll('input[type="time"]').forEach(input => {
            if (input.value) { 
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        });
    }

    document.querySelectorAll('#tabelAwal td, #tabelAkhir td').forEach(cell => {
        const cellIndex = cell.cellIndex;
        const tableId = cell.closest('table').id;
        const isCrewCell = (tableId === 'tabelAwal' && (cellIndex === 2 || cellIndex === 3)) || (tableId === 'tabelAkhir' && (cellIndex === 5 || cellIndex === 6));
        if (isCrewCell) {
             cell.addEventListener('blur', delayedHideSuggestions);
        }
    });
}


function loadFromJson(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const loadedData = JSON.parse(e.target.result);
            if (loadedData.laporanAwalDinas) {
                populatePage(loadedData);
                document.getElementById('reportDate').value = '';
                currentSelectedDate = null;
                showMessageBox("Sukses", "Laporan harian berhasil dimuat. Data ini belum tersimpan otomatis.");
            } else {
                let restoredCount = 0;
                Object.keys(loadedData).forEach(dateKey => {
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
                        localStorage.setItem(`laporanDinasData_${dateKey}`, JSON.stringify(loadedData[dateKey]));
                        restoredCount++;
                    }
                });
                if (restoredCount > 0) {
                    showMessageBox("Restore Berhasil", `${restoredCount} laporan dari file backup telah dikembalikan. Silakan pilih tanggal untuk melihatnya.`);
                } else {
                    throw new Error("Struktur file backup tidak dikenali.");
                }
            }
        } catch (error) {
            console.error("Gagal memuat file JSON:", error);
            showMessageBox("Error", "Format file JSON tidak valid atau rusak.");
        }
    };
    reader.readAsText(file);
    event.target.value = null;
}

function printReport() {
    const oldPrintArea = document.getElementById('print-area');
    if (oldPrintArea) oldPrintArea.remove();

    const printArea = document.createElement('div');
    printArea.id = 'print-area';

    const mainHeader = document.getElementById('main-header');
    const sectionAwal = document.getElementById('sectionAwal');
    const sectionAkhir = document.getElementById('sectionAkhir');
    const signatures = document.getElementById('signatures');
    const mainFooter = document.getElementById('main-footer');

    const page1 = document.createElement('div');
    page1.className = 'print-page p-4';
    const clonedHeader1 = mainHeader.cloneNode(true);
    const clonedSectionAwal = sectionAwal.cloneNode(true);
    clonedSectionAwal.querySelectorAll('.no-print').forEach(el => el.remove());
    
    clonedSectionAwal.querySelectorAll('#tabelAwal tbody tr').forEach(row => {
        const keteranganCell = row.cells[7];
        if (keteranganCell) {
            const timeInput = keteranganCell.querySelector('input[type="time"]');
            if (timeInput) {
                const statusSpan = keteranganCell.querySelector('.departure-status');
                const timeValue = timeInput.value ? ` Jam ${timeInput.value}` : '';
                const statusValue = statusSpan ? statusSpan.innerText.trim() : '';
                keteranganCell.innerHTML = `SIAP DINAS, BER PWK${timeValue} - ${statusValue}`;
            }
        }
    });

    const clonedSignatures1 = signatures.cloneNode(true);
    processSignaturesForPrint(clonedSignatures1);
    const clonedFooter1 = mainFooter.cloneNode(true);
    page1.appendChild(clonedHeader1);
    page1.appendChild(clonedSectionAwal);
    page1.appendChild(clonedSignatures1);
    page1.appendChild(clonedFooter1);

    const page2 = document.createElement('div');
    page2.className = 'print-page p-4';
    const clonedHeader2 = mainHeader.cloneNode(true);
    const clonedSectionAkhir = sectionAkhir.cloneNode(true);
    clonedSectionAkhir.querySelectorAll('.no-print').forEach(el => el.remove());
    processAkhirDinasForPrint(clonedSectionAkhir);
    const clonedSignatures2 = signatures.cloneNode(true);
    processSignaturesForPrint(clonedSignatures2);
    const clonedFooter2 = mainFooter.cloneNode(true);
    page2.appendChild(clonedHeader2);
    page2.appendChild(clonedSectionAkhir);
    page2.appendChild(clonedSignatures2);
    page2.appendChild(clonedFooter2);

    printArea.appendChild(page1);
    printArea.appendChild(page2);

    document.body.appendChild(printArea);
    window.print();
    document.body.removeChild(printArea);
}


function processSignaturesForPrint(clonedSignaturesSection) {
    clonedSignaturesSection.querySelectorAll('.signature-block').forEach(block => {
        const name = block.querySelector('.name').innerText.trim();
        const nipp = block.querySelector('.nipp').innerText.trim();
        const signatureArea = block.querySelector('.signature-area');
        const dutyTitle = block.querySelector('p:first-child').innerText.trim();
        if (name && nipp && dutyTitle && signatureArea) {
            signatureArea.innerHTML = ''; 
            new QRCode(signatureArea, {
                text: `${dutyTitle}\nNama: ${name}\nNIPP: ${nipp}`,
                width: 80, height: 80, colorDark: "#000000", colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    });
}

function processAkhirDinasForPrint(clonedSectionAkhir) {
    clonedSectionAkhir.querySelectorAll('#tabelAkhir tbody tr').forEach(row => {
        const jamDatangCell = row.cells[3];
        if (jamDatangCell) {
            const timeInput = jamDatangCell.querySelector('input[type="time"]');
            if (timeInput) { jamDatangCell.innerText = timeInput.value; }
        }
        const keteranganCell = row.cells[9];
        if(keteranganCell){
            const select = keteranganCell.querySelector('select');
            if(select) { keteranganCell.innerText = select.value; }
        }
    });
}

function setDynamicDate(elementId, dateString = null) {
    const dateElement = document.getElementById(elementId);
    const displayDate = dateString ? new Date(dateString + 'T00:00:00') : new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    dateElement.innerText = `HARI: ${days[displayDate.getDay()]}     TANGGAL: ${displayDate.getDate()} ${months[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
}

function updateDelayColumn(event) {
    const inputElement = event.target;
    const row = inputElement.closest('tr');
    if (!row) return;

    const noKa = row.cells[1]?.innerText.trim();
    const lambatMenitCell = row.cells[4];
    const kejadianCell = row.cells[8];
    const actualTime = inputElement.value;

    if (!noKa || !actualTime) {
        if (lambatMenitCell) lambatMenitCell.innerText = '';
        if (kejadianCell) kejadianCell.innerText = '';
        return;
    }

    const scheduledTime = scheduledArrivalTimes[noKa];
    let delayMinutes = 0;

    if (scheduledTime) {
        const dummyDate = '2000-01-01T';
        const actualDateTime = new Date(dummyDate + actualTime + ':00');
        const scheduledDateTime = new Date(dummyDate + scheduledTime + ':00');
        delayMinutes = (actualDateTime - scheduledDateTime) / (1000 * 60);
        if (lambatMenitCell) lambatMenitCell.innerText = Math.round(delayMinutes);
    } else {
        if (lambatMenitCell) lambatMenitCell.innerText = '';
    }

    if (kejadianCell) {
        const template = kejadianDefaultText[noKa];
        if (template) {
            const finalDelay = Math.max(0, Math.round(delayMinutes));
            kejadianCell.innerText = template.replace('{lambat}', finalDelay);
        } else {
            kejadianCell.innerText = '';
        }
    }
}

async function handleDateSelection() {
    const reportDateInput = document.getElementById('reportDate');
    currentSelectedDate = reportDateInput.value;
    if (!currentSelectedDate) {
        showMessageBox("Info", "Silakan pilih tanggal terlebih dahulu.");
        return;
    }

    document.getElementById('sectionAwal').classList.remove('hidden');
    document.getElementById('sectionAkhir').classList.remove('hidden');
    document.getElementById('signatures').classList.remove('hidden');
    document.getElementById('printReportBtn').disabled = false;
    document.getElementById('exitReportBtn').classList.remove('hidden');
    document.getElementById('selectDateBtn').classList.add('hidden');
    document.getElementById('settingsBtn').disabled = true;
    document.getElementById('settingsPanel').classList.add('hidden');
    reportDateInput.disabled = true;

    // Alur pengambilan data otomatis: Coba Dropbox dulu, lalu fallback ke localStorage
    const dropboxData = await fetchDataFromDropbox(currentSelectedDate);
    if (dropboxData) {
        populatePage(dropboxData);
        localStorage.setItem(`laporanDinasData_${currentSelectedDate}`, JSON.stringify(dropboxData));
    } else {
        const localData = localStorage.getItem(`laporanDinasData_${currentSelectedDate}`);
        if (localData) {
            try { 
                populatePage(JSON.parse(localData)); 
                runCascadingSync(); 
            } 
            catch (e) {
                showMessageBox("Error", "Data tersimpan lokal untuk tanggal ini rusak. Membuat data baru.");
                localStorage.removeItem(`laporanDinasData_${currentSelectedDate}`);
                populatePage({});
            }
        } else {
            populatePage({});
        }
    }
}

function exitReport() {
    if (currentSelectedDate) {
        const dataToSave = collectPageData();
        localStorage.setItem(`laporanDinasData_${currentSelectedDate}`, JSON.stringify(dataToSave));
        saveDataToDropbox(currentSelectedDate, dataToSave); 
        localStorage.removeItem('lastActiveDate'); 
    }
    
    document.getElementById('sectionAwal').classList.add('hidden');
    document.getElementById('sectionAkhir').classList.add('hidden');
    document.getElementById('signatures').classList.add('hidden');
    document.getElementById('printReportBtn').disabled = true;
    document.getElementById('exitReportBtn').classList.add('hidden');
    document.getElementById('selectDateBtn').classList.remove('hidden');
    document.getElementById('settingsBtn').disabled = false;
    document.getElementById('reportDate').disabled = false;
    document.getElementById('reportDate').value = '';
    currentSelectedDate = null;
}

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
    document.getElementById('loadFromDropboxBtn').addEventListener('click', manualFetchFromDropbox);
    document.getElementById('saveToDropboxBtn').addEventListener('click', manualSaveToDropbox);

    // --- Tombol Tabel ---
    document.getElementById('addRowAwalBtn').addEventListener('click', () => addRow('tabelAwal'));
    document.getElementById('addRowAkhirBtn').addEventListener('click', () => addRow('tabelAkhir'));
    
    // --- Listener Global ---
    document.addEventListener('click', (event) => {
        if (event.target.closest('.delete-row-btn')) {
            deleteRow(event.target.closest('.delete-row-btn'));
        }
        if (!event.target.closest('#crew-suggestions')) {
             hideSuggestions();
        }
    });

    const mainContent = document.getElementById('screen-content');
    mainContent.addEventListener('keyup', (event) => {
        const target = event.target;
        if (target.isContentEditable) {
            const cellIndex = target.cellIndex;
            const tableId = target.closest('table')?.id;
            const isCrewCell = (tableId === 'tabelAwal' && (cellIndex === 2 || cellIndex === 3)) || (tableId === 'tabelAkhir' && (cellIndex === 5 || cellIndex === 6));
            if (isCrewCell) {
                handleCrewInput(event);
            }
            handleSync(event);
        }
    });
     document.querySelectorAll('.signature-block .name').forEach(field => {
        field.addEventListener('keyup', handlePenyeliaInput);
    });
    
    window.addEventListener('beforeunload', () => {
        if (currentSelectedDate) {
            const dataToSave = collectPageData();
            localStorage.setItem(`laporanDinasData_${currentSelectedDate}`, JSON.stringify(dataToSave));
            saveDataToDropbox(currentSelectedDate, dataToSave);
            localStorage.setItem('lastActiveDate', currentSelectedDate);
        }
    });
});
