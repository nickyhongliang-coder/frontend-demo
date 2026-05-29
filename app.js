const page = document.body.dataset.page;

const iconMap = {
  home: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5"></path>
      <path d="M5 9.5V21h14V9.5"></path>
      <path d="M9.5 21v-6h5v6"></path>
    </svg>
  `,
  venues: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z"></path>
      <circle cx="12" cy="10" r="2.5"></circle>
    </svg>
  `,
  buddies: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
      <path d="M17 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
      <path d="M4 19a5 5 0 0 1 10 0"></path>
      <path d="M14 19a4 4 0 0 1 6 0"></path>
    </svg>
  `,
  coaches: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 4 7l8 3 8-3-8-3Z"></path>
      <path d="M7 10.5V14c0 1.9 2.2 3.5 5 3.5s5-1.6 5-3.5v-3.5"></path>
      <path d="M20 8v6"></path>
    </svg>
  `,
  events: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="3"></rect>
      <path d="M8 3v6"></path>
      <path d="M16 3v6"></path>
      <path d="M4 11h16"></path>
    </svg>
  `,
  profile: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5"></circle>
      <path d="M5 20a7 7 0 0 1 14 0"></path>
    </svg>
  `,
  back: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18 9 12l6-6"></path>
    </svg>
  `,
  ai: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 13.8 8.2 19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"></path>
      <path d="M18 16.5 18.8 18.2 20.5 19 18.8 19.8 18 21.5 17.2 19.8 15.5 19 17.2 18.2 18 16.5Z"></path>
    </svg>
  `,
  apply: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14"></path>
      <path d="M5 12h14"></path>
    </svg>
  `
};

function renderIcon(name) {
  return `<span class="ui-icon" aria-hidden="true">${iconMap[name] || ""}</span>`;
}

document.querySelectorAll(".tab").forEach((tab) => {
  const label = tab.textContent.trim();
  const iconName = tab.dataset.tab;
  tab.innerHTML = `${renderIcon(iconName)}<span class="tab-label">${label}</span>`;
});

document.querySelectorAll("[data-icon-button]").forEach((button) => {
  const iconName = button.dataset.iconButton;
  const label = button.getAttribute("aria-label") || button.textContent.trim();
  button.setAttribute("aria-label", label);
  button.innerHTML = renderIcon(iconName);
});

document.querySelectorAll(".tab").forEach((tab) => {
  if (tab.dataset.tab === page) tab.classList.add("active");
});

document.querySelectorAll("[data-chip-group]").forEach((group) => {
  group.querySelectorAll(".chip, .slot, .seg-btn").forEach((button) => {
    button.addEventListener("click", () => {
      group.querySelectorAll(".chip, .slot, .seg-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("visible"), 1600);
}

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

const topupGroup = document.querySelector("[data-topup-group]");
const walletBalance = document.querySelector("[data-wallet-balance]");
const walletCopy = document.querySelector("[data-wallet-copy]");
const topupAmount = document.querySelector("[data-topup-amount]");
const topupArrival = document.querySelector("[data-topup-arrival]");
const topupBonus = document.querySelector("[data-topup-bonus]");
const topupBadge = document.querySelector("[data-topup-badge]");
const topupSubmit = document.querySelector("[data-topup-submit]");

function applyTopupOption(option) {
  if (!option) return;
  const amount = option.dataset.amount;
  const arrival = option.dataset.arrival;
  const bonus = option.dataset.bonus;
  const badge = option.dataset.badge;

  topupGroup?.querySelectorAll("[data-topup-option]").forEach((item) => item.classList.remove("active"));
  option.classList.add("active");

  if (topupAmount) topupAmount.textContent = `¥${amount}`;
  if (topupArrival) topupArrival.textContent = `¥${arrival}`;
  if (topupBonus) topupBonus.textContent = `含赠送 ¥${bonus}`;
  if (topupBadge) topupBadge.textContent = badge;
  if (walletBalance) walletBalance.textContent = `当前余额 ¥286，充值后 ¥${286 + Number(arrival)}`;
  if (walletCopy) walletCopy.textContent = `本次支付 ¥${amount}，赠送 ¥${bonus}，到账后可立即用于订台、助教和活动报名。`;
  if (topupSubmit) topupSubmit.dataset.toast = `充值成功，已到账 ¥${arrival}`;
}

topupGroup?.querySelectorAll("[data-topup-option]").forEach((option) => {
  option.addEventListener("click", () => applyTopupOption(option));
});

if (topupGroup) {
  applyTopupOption(topupGroup.querySelector(".active") || topupGroup.querySelector("[data-topup-option]"));
}

topupSubmit?.addEventListener("click", () => {
  showToast(topupSubmit.dataset.toast || "充值成功");
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "index.html";
  });
});
