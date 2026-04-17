window.members = [
  // ================= LEADER =================
  {
    nama: "Latex76",
    umur: 18,
    jabatan: "Leader",
    role: "Rusher / Pengaman",
    kota: "Jogja",
    img: "leader1.jpg",
    quote: "OPMEM〡minat join silahkan scroll ke paling bawah!"
  },

  // ================= CO LEADER =================
  {
    nama: "Aryaa",
    umur: 18,
    jabatan: "Co Leader",
    role: "Rusher / Sniper",
    kota: "Bandung",
    img: "leader2.jpg",
    quote: "Aku-nya udah salting eh kamu nya malah just kidding"
  },

  // ================= OFFICER =================
  {
    nama: "Ceyaa",
    umur: "17",
    jabatan: "Officer",
    role: "Rusher / Riffler / Support",
    kota: "Merauke",
    img: "opicer1.jpg",
    quote: "Fokus ke tujuan hidup mu, bkn membuat banyak drama"
  },
  {
    nama: "Opicer 2",
    umur: "??",
    jabatan: "Officer",
    role: "Rifler",
    kota: "Impian",
    img: "opicer2.jpg",
    quote: "kata² dari opicer 2"
  },
  {
    nama: "Opicer 3",
    umur: "??",
    jabatan: "Officer",
    role: "Bomber",
    kota: "Impian",
    img: "opicer3.jpg",
    quote: "kata² dari opicer 3"
  },

  // ================= MEMBER =================
  {
    nama: "Royyan",
    umur: 16,
    jabatan: "Member",
    role: "Rusher / Riffler / Sniper",
    kota: "Mataram",
    img: "royyan.jpg",
    quote: "Lebih baik mengejar mimpi dari pada mengejar yg tidak pasti 🙂‍↔️ 🔥"
  },
  {
    nama: "Zack",
    umur: 18,
    jabatan: "Member",
    role: "All Rolle",
    kota: "Tanjab Timur",
    img: "zack.jpg",
    quote: "Tidak ada kata kata, tapi jangan lupa makan"
  },
  {
    nama: "Azzahra",
    umur: 16,
    jabatan: "Member",
    role: "Suport",
    kota: "Jateng",
    img: "zahra.jpg",
    quote: "open member nih kak, join yukk..."
  }, 
  {
  nama: "Rizki",
  umur: 17,
  jabatan: "Member",
  role: "Suport",
  kota: "Bandung",
  img: "rizki.jpg",
  quote: "sunda"
}, 
{
  nama: "Kenzo",
  umur: 23,
  jabatan: "Member",
  role: "Suport",
  kota: "Madium",
  img: "kenzo.jpg",
  quote: "Hanya seorang pendosa yang ingin kembali jalan tuhannya"
}, 
   {
  nama: "Vera",
  umur: 16,
  jabatan: "Member",
  role: "Suport",
  kota: "Jateng",
  img: "vera.jpg",
  quote: "OPMEM! kuyy join..."
}
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("memberContainer");
  const searchInput = document.getElementById("searchMember");

  function renderMembers(data) {
    container.innerHTML = "";

    data.forEach(m => {
      let roleClass = "";

      if (m.jabatan === "Leader") roleClass = "leader";
      else if (m.jabatan === "Co Leader") roleClass = "co";
      else if (m.jabatan === "Officer") roleClass = "officer";
      else roleClass = "member";

      container.innerHTML += `
        <div class="member-card ${roleClass}">
          <div class="member-img">
            <img src="${m.img}" alt="${m.nama}">
          </div>

          <h3>${m.nama}</h3>
          <p>Umur: ${m.umur}</p>
          <p>Jabatan: ${m.jabatan}</p>
          <p>Role: ${m.role}</p>
          <p>Kota: ${m.kota}</p>
          <span class="quote">"${m.quote}"</span>
        </div>
      `;
    });
  }

  // first load
  renderMembers(window.members);

  // search
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = window.members.filter(m =>
      m.nama.toLowerCase().includes(keyword)
    );

    renderMembers(filtered);
  });
});

