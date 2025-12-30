// 文档站公共脚本

// 侧边栏滚动位置记忆
(function() {
  const STORAGE_KEY = '1inui-sidebar-scroll';
  const sidebar = document.querySelector('.docs-sidebar');
  
  if (!sidebar) return;
  
  // 恢复滚动位置
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    sidebar.scrollTop = parseInt(saved, 10);
  }
  
  // 保存滚动位置
  sidebar.addEventListener('scroll', function() {
    localStorage.setItem(STORAGE_KEY, sidebar.scrollTop);
  });
})();

// 渲染图标
window.addEventListener('load', function() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    if (typeof Icons !== 'undefined' && Icons[name]) {
      el.innerHTML = Icons[name];
    }
  });
});
