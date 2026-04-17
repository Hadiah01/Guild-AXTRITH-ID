document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('toggle');
    const menu = document.getElementById('menu');
    const navLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll("section[id]");
    const btn = document.getElementById('exploreBtn');
    const guild = document.getElementById('guildName');
    const logo = document.getElementById('logoClick');

    const viewer = document.getElementById('imgViewer');
    const preview = document.getElementById('imgPreview');

    const videoViewer = document.getElementById("videoViewer");
    const videoPreview = document.getElementById("videoPreview");
    const closeBtn = document.getElementById("closeVideoBtn");

    let lastScroll = window.pageYOffset;

    // NAVBAR
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.style.background =
                window.scrollY > 50
                    ? 'rgba(15,23,42,0.9)'
                    : 'rgba(15,23,42,0.8)';
        }
    });

    // MENU
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');

            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    // ACTIVE MENU
    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            const id = sec.getAttribute("id");

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // EXPLORE
    if (btn) {
        btn.addEventListener('click', () => {
            document.getElementById('facility').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // TYPING TITLE
    if (guild) {
        const text = guild.textContent;
        guild.textContent = '';
        let i = 0;

        function typing() {
            if (i < text.length) {
                guild.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 80);
            }
        }

        setTimeout(typing, 300);
    }

    // SCROLL ANIMATION
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;

            if (top < windowHeight - 100) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // LOGO
    if (logo) {
        logo.addEventListener('click', () => {
            logo.classList.toggle('zoom');
        });
    }

    // IMAGE VIEWER


    if (viewer) {
        viewer.addEventListener('click', () => {
            viewer.classList.remove('active');
        });
    }

    // ================= VIDEO FIX 🔥 =================
    const popupVideos = document.querySelectorAll(".popup-video");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            video.muted = true;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.2 });

    popupVideos.forEach(video => {
        observer.observe(video);

        video.addEventListener("click", () => {
            const source = video.querySelector("source").src;

            videoPreview.src = source;
            videoPreview.currentTime = 0;
            videoPreview.muted = false;

            videoViewer.classList.add("active");
            videoPreview.play();
        });
    });

    if (videoViewer) {
        videoViewer.addEventListener("click", () => {
            videoViewer.classList.remove("active");
            videoPreview.pause();
            videoPreview.src = "";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            videoViewer.classList.remove("active");
            videoPreview.pause();
            videoPreview.src = "";
        });
    }

});

// ================= INTERVIEW SYSTEM =================
const chatArea = document.getElementById("chatArea");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const roleBox = document.getElementById("roleBox");
const roleInputs = document.querySelectorAll('#roleBox input');

let step = 0;
let selesai = false;

const data = {
    nama: "",
    umur: "",
    id: "",
    kota: "",
    role: "",
    kata: ""
};

const questions = [
    "Halo 👋 Aku Zivaa, asisten guild.\nSiapa nama kamu?",
    "Berapa umur kamu?",
    "Masukkan ID game FF kamu",
    "Kamu berasal dari kota mana?",
    "Pilih role kamu (bisa lebih dari 1)",
    "Kata-kata terbaik mu?"
];

// BOT TYPING
function botTyping(text) {
    const typing = document.createElement("div");
    typing.className = "chat bot";
    typing.innerHTML = "🤖 <b>Zivaa</b><br><br>...sedang mengetik";
    chatArea.appendChild(typing);

    setTimeout(() => {
        typing.remove();

        const msg = document.createElement("div");
        msg.className = "chat bot";
        msg.innerHTML = `🤖 <b>Zivaa</b><br><br>${text}`;
        chatArea.appendChild(msg);
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 800);
}

function userMsg(text) {
    const div = document.createElement("div");
    div.className = "chat user";
    div.innerHTML = text;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// VALIDASI
function hanyaHuruf(text) {
    return /^[a-zA-Z\s]+$/.test(text);
}

function hanyaAngka(text) {
    return /^[0-9]+$/.test(text);
}

// START
setTimeout(() => {
    botTyping(questions[step]);
}, 500);

// ENTER
chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
    }
});

// SEND
sendBtn.addEventListener("click", () => {

    if (selesai) {
        kirimWA();
        botTyping("📤 Mengirim ulang ke WhatsApp...");
        return;
    }

    let val = chatInput.value.trim();

    if (step === 4) {
        const selected = Array.from(roleInputs)
            .filter(r => r.checked)
            .map(r => r.value);

        if (selected.length === 0) return botTyping("Pilih minimal 1 role ya!");

        data.role = selected.join(", ");
        userMsg(`🎮 ${data.role}`);
        roleBox.style.display = "none";

    } else {

        if (!val) return;

        if (step === 0 && !hanyaHuruf(val)) return botTyping("Nama hanya huruf! Silahkan hapus teks selain huruf 🙏");
        if (step === 1 && !hanyaAngka(val)) return botTyping("Umur harus angka! Silahkan hapus teks selain angka 🙏");

        if (step === 2) {
            if (!hanyaAngka(val)) return botTyping("ID hanya berupa angka! Silahkan hapus teks selain angka 🙏");
            if (val.length < 8) return botTyping("ID minimal 8 digit!");
        }

        if (step === 3 && !hanyaHuruf(val)) return botTyping("Kota hanya huruf! Silahkan hapus teks selain huruf 🙏");

        let tampil = val;

        if (step === 0 || step === 3) tampil = kapitalSetiapKata(val);
        if (step === 5) tampil = kapitalAwalSaja(val);

        userMsg(tampil);

        if (step === 0) data.nama = kapitalSetiapKata(val);
        if (step === 1) data.umur = val;
        if (step === 2) data.id = val;
        if (step === 3) data.kota = kapitalSetiapKata(val);
        if (step === 5) data.kata = kapitalAwalSaja(val);

        chatInput.value = "";
    }

    step++;

    if (step === 4) roleBox.style.display = "block";

    if (step === questions.length) {
        kirimWA();
        selesai = true;
        botTyping("📩 Data sudah direkam!\nKlik kirim lagi jika WA belum terbuka 🚀");
        return;
    }

    setTimeout(() => {
        botTyping(questions[step]);
    }, 500);
});

// WA FUNCTION
// WA FUNCTION
function kirimWA() {
    const nomorWA = "6283824063521";
    
    const pesan = `Halo Captain AXTRITH-ID 👋

━━━━━━━━━━━━━━━━━━━
📋 FORM PENDAFTARAN MEMBER
━━━━━━━━━━━━━━━━━━━

👤 Nama : ${data.nama}
🎂 Umur : ${data.umur} Tahun
🆔 ID   : ${data.id}
📍 Kota : ${data.kota}
🎮 Role : ${data.role}

💬 "${data.kata}"

━━━━━━━━━━━━━━━━━━━

Dengan ini saya mengajukan permohonan untuk bergabung sebagai member Guild *AXTRITH-ID*.

Saya menyatakan bahwa:
✔ Siap mematuhi seluruh peraturan guild  
✔ Siap bermain secara sportif dan kompak  
✔ Siap menerima konsekuensi jika melakukan pelanggaran  

Besar harapan saya untuk dapat diterima menjadi bagian dari guild ini.

Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih 🙏`;
    
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`);
}


// FORMAT
function kapitalSetiapKata(text) {
    return text.toLowerCase().split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function kapitalAwalSaja(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// ================= IMAGE VIEWER FIX (FINAL CLEAN) =================
document.addEventListener("DOMContentLoaded", () => {
    const viewer = document.getElementById("imgViewer");
    const preview = document.getElementById("imgPreview");
    
    document.addEventListener("click", (e) => {
        const img = e.target.closest(".member-img img");
        if (!img) return;
        
        if (!viewer || !preview) return;
        
        preview.src = img.src;
        viewer.classList.add("active");
    });
    
    if (viewer) {
        viewer.addEventListener("click", (e) => {
            if (e.target === viewer) {
                viewer.classList.remove("active");
                preview.src = "";
            }
        });
    }
    
// ================= FACILITY SCROLL ANIMATION FIX =================
const facilityCards = document.querySelectorAll(".facility-card");

function showFacilityOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    facilityCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
        
        // kalau masuk viewport → tampil
        if (cardTop < triggerBottom && cardBottom > 100) {
            setTimeout(() => {
                card.classList.add("show");
            }, index * 120);
        }
        // kalau sudah keluar layar atas → reset (biar bisa animasi ulang)
        else if (cardTop > window.innerHeight || cardBottom < 0) {
            card.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", showFacilityOnScroll);
showFacilityOnScroll();
});