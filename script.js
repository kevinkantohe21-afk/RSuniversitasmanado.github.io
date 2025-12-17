 // Array Global sebagai "Database" Sederhana
        let janjiTemu = [];
        let nextId = 1;

        document.getElementById('form-pendaftaran').addEventListener('submit', function(e) {
            e.preventDefault();
            daftarkanJanjiTemu(); 
            tampilkanJanjiTemu();
            e.target.reset(); 
        });

        // ----------------------------------------------------
        // Fungsi/Prosedur CRUD Modular
        // ----------------------------------------------------

        // [C]reate: Prosedur Input Data
        function daftarkanJanjiTemu() {
            const nama = document.getElementById('nama_pasien').value;
            const dokter = document.getElementById('dokter').value;
            const tanggalInput = document.getElementById('tanggal').value;

            if (!tanggalInput) {
                alert("Mohon masukkan tanggal dan waktu yang valid.");
                return;
            }

            const janjiBaru = {
                id: nextId++,
                pasien: nama,
                dokter: dokter,
                waktu: new Date(tanggalInput).toLocaleString('id-ID', { 
                    dateStyle: 'short', 
                    timeStyle: 'short' 
                }),
                status: 'Terdaftar'
            };

            janjiTemu.push(janjiBaru);
        }

        // [R]ead: Prosedur Output dan Iterasi Data
        function tampilkanJanjiTemu() {
            const dataBody = document.getElementById('data-body');
            dataBody.innerHTML = ''; // Clear tabel sebelumnya

            // Perulangan Data (Struktur Kontrol Iterasi)
            janjiTemu.forEach(j => {
                const row = dataBody.insertRow();
                
                row.insertCell().textContent = j.id;
                row.insertCell().textContent = j.pasien;
                row.insertCell().textContent = j.dokter;
                row.insertCell().textContent = j.waktu;
                
                const statusCell = row.insertCell();
                statusCell.textContent = j.status;
                if (j.status === 'Selesai') {
                    statusCell.classList.add('status-selesai');
                }
                
                // Tambahkan tombol Aksi (Struktur Kontrol Percabangan)
                const cellAksi = row.insertCell();
                
                if (j.status === 'Terdaftar') {
                    // Tombol untuk mengubah status
                    const btnSelesai = document.createElement('button');
                    btnSelesai.textContent = 'Tandai Selesai';
                    btnSelesai.onclick = () => ubahStatus(j.id, 'Selesai'); 
                    cellAksi.appendChild(btnSelesai);

                } else if (j.status === 'Selesai') {
                    // Tombol Hapus (Muncul setelah status Selesai)
                    const btnHapus = document.createElement('button');
                    btnHapus.textContent = 'Hapus';
                    btnHapus.className = 'btn-hapus'; // Menggunakan style merah
                    btnHapus.onclick = () => hapusJanjiTemu(j.id); 
                    cellAksi.appendChild(btnHapus);
                }
            });
        }

        // [U]pdate: Prosedur Modifikasi Status
        function ubahStatus(id, statusBaru) {
            const index = janjiTemu.findIndex(j => j.id === id);
            
            if (index !== -1) {
                janjiTemu[index].status = statusBaru;
                tampilkanJanjiTemu(); // Muat ulang tampilan
            }
        }

        // [D]elete: Fungsi Penghapusan Data Baru
        function hapusJanjiTemu(id) {
            // Menggunakan filter untuk membuat array baru tanpa item yang dihapus
            janjiTemu = janjiTemu.filter(j => j.id !== id);
            tampilkanJanjiTemu(); // Muat ulang tampilan
            alert(`Janji temu ID ${id} berhasil dihapus dari sistem.`);
        }
        
        // Jalankan saat halaman dimuat
        document.addEventListener('DOMContentLoaded', tampilkanJanjiTemu);