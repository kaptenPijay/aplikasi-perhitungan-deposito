import 'bootstrap/dist/css/bootstrap.min.css';
import { replaceDot, grossAmount} from './counter.js';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'

document.addEventListener("DOMContentLoaded",()=>{
const tenor = document.getElementById("tahun");
const jenis = document.getElementById("jenis");
const nominal = document.getElementById("nominal");
const persentase = document.getElementById("persentase");
const bungaKotor = document.getElementById("bungaKotor");
const pajak = document.getElementById("pajak");
const estimasiBersih = document.getElementById("estimasiBersih");

const pilihanTenor = [
  { value: 30, label: "1 Bulan" },
  { value: 90, label: "3 Bulan" },
  { value: 180, label: "6 Bulan" },
  { value: 365, label: "1 Tahun" }
];

tenor.innerHTML = pilihanTenor
  .map(item => `<option value="${item.value}">${item.label}</option>`)
  .join("");

jenis.innerHTML = `
                  <option value="">Tipe Deposito</option>
                  <option value="deposito">Deposito</option>
                  <option value="silah">Silah</option>
                  <option value="doubleUntung">Double Untung</option>
`


nominal.addEventListener('keyup',()=>{
    replaceDot(nominal);
    grossAmount(nominal,tenor,persentase,bungaKotor,pajak,estimasiBersih)
})
tenor.addEventListener('change',()=>{
    grossAmount(nominal,tenor,persentase,bungaKotor,pajak,estimasiBersih)
})
persentase.addEventListener("input", function () {
  let value = this.value.replace("%", "");
  if (value === "") {
    this.value = "";
    return;
  }
  this.value = value + "%";
  grossAmount(nominal,tenor,persentase,bungaKotor,pajak,estimasiBersih)
});
persentase.addEventListener("keydown", function (e) {
  if (e.key === "Backspace" && this.value.endsWith("%")) {
    this.value = this.value.replace("%", "");
  }
  grossAmount(nominal,tenor,persentase,bungaKotor,pajak,estimasiBersih)
});

})