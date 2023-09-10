const rollInput = document.querySelector("#roll");
const regInput = document.querySelector("#reg");
const submit = document.querySelector("#submit");
const loader = document.querySelector("#loader");
const result = document.querySelector("#result");
const form = document.querySelector("form");
const examName = document.querySelector("#exam-name");
let resultHeader = "";
let examHeader = "";

submit.addEventListener("click", (e) => {
  if (!form.reportValidity()) {
    return;
  }
  e.preventDefault();
  const roll = rollInput.value;
  const reg = regInput.value;
  if (roll == undefined) {
    return alert("Roll number is required.");
  }
  if (reg && reg.length !== 10) {
    return alert("Invalid Registration number.");
  }
  if (roll.length !== 6) {
    return alert("Invalid roll number.");
  }
  getResult(roll, reg);
});

const getResult = async (roll, reg) => {
  submit.classList.toggle("d-none");
  loader.classList.toggle("d-none");
  let res;
  try {
    result.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`;
    res = await fetch(`/?roll=${roll}&reg=${reg}`, {
      method: "POST",
    });
    if (res.status === 200) {
      showResult(await res.text());
      submit.classList.toggle("d-none");
      loader.classList.toggle("d-none");
    } else {
      submit.classList.toggle("d-none");
      loader.classList.toggle("d-none");
      result.innerHTML = "";
      return console.error(error);
    }
  } catch (error) {
    submit.classList.toggle("d-none");
    loader.classList.toggle("d-none");
    return console.error(error);
  }
};

// SSC
resultHeader = "SSC Result 2023";
examHeader = "SSC 2023";
examName.innerText = examHeader;
const showResult = (text) => {
  let parts = text.split("Continuous");
  parts[0] = parts[0].replace(/<!--|-->/g, "");
  result.innerHTML =
    `<div class="head m-auto" id="head">
    <div class="head_scetion" style="width: 650px; text-align: center; margin: 0px auto;">
      <img src="https://cdn.kmnahidulislam.com/logo.png" style="height: 80px;">
      <h1 style="font-size: 20px; margin: 0px;">Board of Intermediate &amp; Secondary Education, Jashore</h1>
      <h3 style="border-bottom: 1px dashed #AAAAAA; display: inline-block; font-weight: normal; margin-bottom: 10px;  padding: 0 20px;  text-align: center;">${resultHeader}</h3>
      </div>
      </div>` + parts.join("Continuous");
  if (parts[0].includes("Total Mark")) {
    result
      .querySelectorAll(
        ".table_result tr:nth-child(2) [rowspan], .table_result tr:nth-child(4) [rowspan]"
      )
      .forEach((item) => {
        item.setAttribute("rowspan", "2");
      });
    result
      .querySelectorAll(".table_result tr:nth-child(n+6) td:nth-child(2)")
      .forEach((item) => {
        item.innerHTML = "";
      });
  }
  document.querySelector(
    "#result > div:last-child"
  ).innerHTML = ` <button type="button" onclick="printResult()" class="btn btn-dark rounded-pill px-4">
    Print
    </button>`;
};

//HSC
//resultHeader = "HSC Result 2023"
//examHeader = "HSC 2023";
//examName.innerText = examHeader;
// const showResult = (text) => {
//   text = text.replace(/<!--|-->/g, "");
//   result.innerHTML =
//     `<div class="head m-auto" id="head">
//   <div class="head_scetion" style="width: 650px; text-align: center; margin: 0px auto;">
//       <img src="logo.png" style="height: 80px;">
//       <h1 style="font-size: 20px; margin: 0px;">Board of Intermediate &amp; Secondary Education, Jashore</h1>
//       <h3 style="border-bottom: 1px dashed #AAAAAA; display: inline-block; font-weight: normal; margin-bottom: 10px;  padding: 0 20px;  text-align: center;">${resultHeader}</h3>
//   </div>
// </div>` + text;
//   if (text.includes("Total Mark")) {
//     result
//       .querySelectorAll(
//         ".table_result tr:nth-child(2) [rowspan], .table_result tr:nth-child(4) [rowspan], .table_result tr:nth-child(6) [rowspan], .table_result tr:nth-child(8) [rowspan], .table_result tr:nth-child(10) [rowspan], .table_result tr:nth-child(13) [rowspan]"
//       )
//       .forEach((item) => {
//         item.setAttribute("rowspan", "2");
//       });
//     result.querySelector(
//       ".table_result tr:nth-child(12) td:nth-child(2)"
//     ).innerHTML = "";
//   }
//   document.querySelector(
//     "#result > div:last-child"
//   ).innerHTML = ` <button type="button" onclick="printResult()" class="btn btn-dark rounded-pill px-4">
//   Print
// </button>`;
// };

function printResult() {
  var result = document.getElementById("resutl_sheet").innerHTML;
  var head = `<div class="head" id="head">
  <div class="head_scetion" style="width: 650px; text-align: center; margin: 0px auto;">
      <img src="logo.png" style="height: 80px;">
      <h1 style="font-size: 20px; margin: 0px;">Board of Intermediate &amp; Secondary Education, Jashore</h1>
      <h3 style="border-bottom: 1px dashed #AAAAAA; display: inline-block; font-weight: normal; margin-bottom: 10px;  padding: 0 20px;  text-align: center;">${resultHeader}</h3>
  </div>
</div>`;
  var popupWin = window.open("", "_blank", "width=700,height=1100");
  popupWin.document.open();
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobileDevice = regexp.test(details);
  popupWin.document.write(
    `<html><head></head><body onload='print();${
      isMobileDevice ? "" : "close()"
    }'>` +
      head +
      result +
      "</body></html>"
  );
  popupWin.document.close();
}
