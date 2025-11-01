const noResi = document.getElementById("noResi");
const lacakResi = document.getElementById("lacak");
const formResi = document.getElementById("formLacak");

const username = localStorage.getItem(userNameKey);

formResi.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomerResi = noResi.value.trim();
  if (!nomerResi) {
    alert("No Resi kosong, harap isi terlebih dahulu");
    return;
  }
  console.log(`nomerResi : ${nomerResi}`);
  const validasiTracking = dataTracking[nomerResi];

  if (validasiTracking) {
    document.getElementById("cardResult").style.display = "block";
    document.getElementById("timelineResult").style.display = "block";

    document.querySelector(".card-header").textContent = validasiTracking.nama;
    document.querySelector(".card-number").textContent =
      validasiTracking.nomorDO;
    document.querySelector(".card-details").innerHTML = `
      ${validasiTracking.status} >> ${validasiTracking.ekspedisi}<br />
      Paket: ${validasiTracking.paket} | Total: ${validasiTracking.total}
    `;

    const timeline = document.querySelector(".timeline");
    timeline.innerHTML = "";

    validasiTracking.perjalanan.forEach((item) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";
      timelineItem.innerHTML = `
        <div class="timeline-content">
          <div class="timeline-text">${item.keterangan}</div>
          <div class="timeline-date">${item.waktu}</div>
        </div>
      `;
      timeline.appendChild(timelineItem);
    });
  } else {
    document.getElementById("cardResult").style.display = "none";
    document.getElementById("timelineResult").style.display = "none";
    alert("Nomor resi tidak ditemukan");
  }
});
