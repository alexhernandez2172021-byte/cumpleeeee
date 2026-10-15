const $ = (selector) => document.querySelector(selector);

const openGift = $("#openGift");
const surpriseContent = $("#surpriseContent");
openGift.addEventListener("click", () => {
  surpriseContent.scrollIntoView({ behavior: "smooth" });
  showToast("¡Este rinconcito es solo para ti! 💗");
  burstHearts(18);
});

const letterToggle = $("#letterToggle");
const letterPaper = $("#letterPaper");
letterToggle.addEventListener("click", () => {
  const opening = letterPaper.classList.contains("hidden");
  letterPaper.classList.toggle("hidden");
  letterToggle.textContent = opening ? "Cerrar mi carta 💌" : "Abrir mi carta 💗";
  letterToggle.setAttribute("aria-expanded", String(opening));
  if (opening) {
    letterPaper.scrollIntoView({ behavior: "smooth", block: "nearest" });
    burstHearts(8);
  }
});

document.querySelectorAll(".surprise-card").forEach((card) => {
  card.addEventListener("click", () => {
    const message = $("#surpriseMessage");
    message.textContent = card.dataset.message;
    message.classList.remove("hidden");
    message.scrollIntoView({ behavior: "smooth", block: "nearest" });
    burstHearts(6);
  });
});

$("#finalButton").addEventListener("click", () => {
  $("#finalMessage").classList.remove("hidden");
  $("#finalButton").textContent = "¡Feliz cumpleaños! 💗";
  burstHearts(28);
});

const toast = $("#toast");
let toastTimeout;
function showToast(text) {
  toast.textContent = text;
  toast.classList.remove("hidden");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add("hidden"), 2600);
}

function burstHearts(count = 10) {
  const holder = $(".floating-hearts");
  const symbols = ["♡", "♥", "✦", "💗"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    holder.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

// Animación suave al entrar cada sección en pantalla.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

// La música solo empieza cuando ella toca el botón, porque los navegadores
// normalmente bloquean la reproducción automática.
const musicButton = $("#musicButton");
const music = $("#bgMusic");
let musicReady = false;
musicButton.addEventListener("click", async () => {
  const source = music.querySelector("source");
  if (!source) {
    showToast("Añade tu canción como musica.mp3 para activar la música 🎵");
    return;
  }
  try {
    if (music.paused) {
      await music.play();
      musicButton.textContent = "♫ Música: encendida";
      musicButton.setAttribute("aria-pressed", "true");
    } else {
      music.pause();
      musicButton.textContent = "♫ Música: apagada";
      musicButton.setAttribute("aria-pressed", "false");
    }
    musicReady = true;
  } catch {
    showToast("No se pudo reproducir. Prueba con otro archivo de audio.");
  }
});

// Personaliza este texto si quieres usar su nombre en la portada.
const girlfriendName = ""; // Ejemplo: "Sofía"
if (girlfriendName.trim()) {
  $("#heroName").textContent = girlfriendName.trim();
}
