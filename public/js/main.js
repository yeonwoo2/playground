const copyBtn = document.getElementById("copyBtn");
const donationAddress = document.getElementById("donationAddress");
const toast = document.getElementById("toast");

let toastTimer = null;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 900);
}

copyBtn.addEventListener("click", async () => {
  const text = donationAddress.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copy");
  } catch {
    // 구형/권한 이슈 대비: fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("Copy");
  }
});
