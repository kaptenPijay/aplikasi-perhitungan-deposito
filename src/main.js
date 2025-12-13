import 'bootstrap/dist/css/bootstrap.min.css';
import { replaceDot, grossAmount, depoType } from './counter.js';

document.addEventListener("DOMContentLoaded", () => {
  const els = {
    tenor: document.getElementById("tahun"),
    jenis: document.getElementById("jenis"),
    nominal: document.getElementById("nominal"),
    persentase: document.getElementById("persentase"),
    bungaKotor: document.getElementById("bungaKotor"),
    pajak: document.getElementById("pajak"),
    estimasiBersih: document.getElementById("estimasiBersih"),
  };

  /* =======================
     OPTION TENOR & JENIS
  ======================= */
  const pilihanTenor = [
    { value: 30, label: "1 Bulan" },
    { value: 90, label: "3 Bulan" },
    { value: 180, label: "6 Bulan" },
    { value: 365, label: "1 Tahun" },
  ];

  els.tenor.innerHTML = pilihanTenor
    .map(item => `<option value="${item.value}">${item.label}</option>`)
    .join("");

  els.jenis.innerHTML = `
    <option value="" disabled selected>Tipe Deposito</option>
    <option value="deposito">Deposito</option>
    <option value="silah">Silah</option>
  `;

  /* =======================
     CENTRAL UPDATE
  ======================= */
  function update() {
    depoType(
      els.jenis,
      els.nominal,
      els.tenor,
      els.persentase,
      els.bungaKotor,
      els.pajak,
      els.estimasiBersih
    );
  }

  /* =======================
     EVENT LISTENER
  ======================= */
  els.nominal.addEventListener("keyup", () => {
    replaceDot(els.nominal);
    update();
  });

  els.tenor.addEventListener("change", update);
  els.jenis.addEventListener("change", update);

  els.persentase.addEventListener("input", function () {
    let value = this.value.replace("%", "");
    this.value = value ? value + "%" : "";
    update();
  });

  els.persentase.addEventListener("keydown", function (e) {
    if (e.key === "Backspace" && this.value.endsWith("%")) {
      this.value = this.value.replace("%", "");
    }
  });
});
