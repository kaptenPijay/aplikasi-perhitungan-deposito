// counter.js

// Fungsi replaceDot (format input ribuan)
export function replaceDot(nominal) {
    let angka = nominal.value.replace(/\D/g, "");
    nominal.dataset.value = angka;
    nominal.value = angka ? Number(angka).toLocaleString("id-ID") : "";
}
export function grossAmount(nominal,tenor,persentase,bungaKotor,pajak,estimasiBersih) {
    let bunga = parseFloat(
    (persentase.value.trim() === "" ? "3.5%" : persentase.value).replace("%", "")
) / 100;
    let hasil = nominal.dataset.value * bunga * tenor.value / 365;
    const kotor = hasil ? Number(hasil) : 0;
    const pajakVal = hasil ? Number(hasil * 0.2) : 0;
    const bersih = kotor - pajakVal;

    bungaKotor.value = kotor.toLocaleString("id-ID");
    pajak.value = pajakVal.toLocaleString("id-ID");
    estimasiBersih.value = bersih.toLocaleString("id-ID");
}

