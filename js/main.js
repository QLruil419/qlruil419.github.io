// 页面主体、锚点跳转和 GitHub 链接由 HTML 完成；这里仅处理手机菜单。
const header = document.querySelector(".site-header");
const menuButton = document.querySelector("#menu-toggle");
const menuLabel = menuButton.querySelector(".menu-toggle-label");
const navigation = document.querySelector("#site-nav");
const desktopLayout = window.matchMedia("(min-width: 768px)");

// 同时更新显示状态、按钮文字和屏幕阅读器使用的展开状态。
function setMenuOpen(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuLabel.textContent = isOpen ? "Close" : "Menu";
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// 保留浏览器原生的锚点跳转，只在选择栏目后收起菜单。
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (event.key === "Escape" && isOpen) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

// 转到电脑布局时清除展开状态，避免缩回手机宽度后菜单意外展开。
desktopLayout.addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});

// 脚本加载成功后才启用折叠菜单；禁用 JavaScript 时仍可直接访问导航。
setMenuOpen(false);
header.classList.add("menu-ready");
menuButton.hidden = false;
