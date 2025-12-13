/* =======================
   FORMAT INPUT NOMINAL
======================= */
export function replaceDot(nominal) {
  const angka = nominal.value.replace(/\D/g, "");
  nominal.dataset.value = angka;
  nominal.value = angka ? Number(angka).toLocaleString("id-ID") : "";
}

/* =======================
   CONTROLLER JENIS DEPOSITO
======================= */
export function depoType(
  jenis,
  nominal,
  tenor,
  persentase,
  bungaKotor,
  pajak,
  estimasiBersih
) {
  if (jenis.value === "silah") {
    renderSilah();
    hitungSilah(nominal, tenor);
  } else {
    removeSilah();
  }

  grossAmount(
    nominal,
    tenor,
    persentase,
    bungaKotor,
    pajak,
    estimasiBersih
  );
}

/* =======================
   UI SILAH
======================= */
function renderSilah() {
  const silahPrize = document.getElementById("silahPrize");
  if (document.getElementById("silahBox")) return;

  silahPrize.innerHTML = `
    <div class="col-12 silah-animate">
      <h4 class="fw-bold text-center mt-3">Total Hadiah Silah</h4>
      <input
        type="text"
        id="silahBox"
        class="form-control form-control-lg text-center"
        readonly
      />
    </div>
  `;
}

function removeSilah() {
  const silahPrize = document.getElementById("silahPrize");
  silahPrize.innerHTML = "";
}

/* =======================
   HITUNG SILAH
======================= */
function hitungSilah(nominal, tenor) {
  const silahBox = document.getElementById("silahBox");
  if (!silahBox) return;

  const bunga = 0.0325;
  const hasil =
    (nominal.dataset.value || 0) * bunga * tenor.value / 365;

  const bersih = hasil - hasil * 0.2;
  silahBox.value = bersih.toLocaleString("id-ID");
}

/* =======================
   HITUNG DEPOSITO
======================= */
export function grossAmount(
  nominal,
  tenor,
  persentase,
  bungaKotor,
  pajak,
  estimasiBersih
) {
  const bunga =
    parseFloat((persentase.value || "3.5").replace("%", "")) / 100;

  const hasil =
    (nominal.dataset.value || 0) * bunga * tenor.value / 365;

  const kotor = hasil || 0;
  const pajakVal = kotor * 0.2;

  bungaKotor.value = kotor.toLocaleString("id-ID");
  pajak.value = pajakVal.toLocaleString("id-ID");
  estimasiBersih.value = (kotor - pajakVal).toLocaleString("id-ID");
}
