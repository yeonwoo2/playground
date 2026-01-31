const copyBtn = document.getElementById("copyBtn");
const donationAddress = document.getElementById("donationAddress");
const toast = document.getElementById("toast");

const walletModal = document.getElementById("walletModal");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
const confirmBtn = document.getElementById("confirmBtn");

let toastTimer = null;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 900);
}

function openModal() {
  walletModal.classList.add("active");
  walletModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  walletModal.classList.remove("active");
  walletModal.setAttribute("aria-hidden", "true");
}

copyBtn.addEventListener("click", async () => {
  const text = donationAddress.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copy");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("Copy");
  }
  openModal()
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
confirmBtn.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && walletModal.classList.contains("active")) {
    closeModal();
  }
});
