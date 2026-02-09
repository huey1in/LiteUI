// 文档站公共脚本

// 动态加载 LiteUI 资源
(function() {
  // 配置：切换为 true 使用本地资源，false 使用 CDN
  const USE_LOCAL = true;
  
  const CDN_BASE = 'https://unpkg.com/@1ing/liteui/dist/';
  const LOCAL_BASE = '../';
  
  const BASE_URL = USE_LOCAL ? LOCAL_BASE : CDN_BASE;
  
  // 加载 CSS
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = BASE_URL + (USE_LOCAL ? 'lite-ui.css' : 'lite-ui.min.css');
  document.head.appendChild(cssLink);
  
  // 加载 JS
  const jsScript = document.createElement('script');
  jsScript.src = BASE_URL + (USE_LOCAL ? 'lite-ui.js' : 'lite-ui.min.js');
  jsScript.defer = true;
  document.head.appendChild(jsScript);
  
  // 开发模式提示
  if (USE_LOCAL) {
    console.log('开发模式：使用本地资源');
  }
})();

// 侧边栏导航配置
const SIDEBAR_NAV = [
  {
    title: '开始',
    items: [
      { name: '快速开始', href: 'guide.html' },
      { name: '安装方式', href: 'install.html' },
      { name: '示例页面', href: 'example.html' }
    ]
  },
  {
    title: '布局',
    items: [
      { name: '布局工具类', href: 'layout.html' }
    ]
  },
  {
    title: '基础组件',
    items: [
      { name: '按钮 Button', href: 'components.html' },
      { name: '卡片 Card', href: 'card.html' },
      { name: '徽章 Badge', href: 'badge.html' }
    ]
  },
  {
    title: '表单组件',
    items: [
      { name: '输入框 Input', href: 'input.html' },
      { name: '开关 Switch', href: 'switch.html' },
      { name: '单选框 Radio', href: 'radio.html' },
      { name: '下拉菜单 Dropdown', href: 'dropdown.html' }
    ]
  },
  {
    title: '展示组件',
    items: [
      { name: '手风琴 Accordion', href: 'accordion.html' },
      { name: '标签页 Tabs', href: 'tabs.html' },
      { name: '分隔线 Divider', href: 'divider.html' },
      { name: '标签 Tag', href: 'tag.html' },
      { name: '进度条 Progress', href: 'progress.html' },
      { name: '面包屑 Breadcrumb', href: 'breadcrumb.html' },
      { name: '列表 List', href: 'list.html' }
    ]
  },
  {
    title: '反馈组件',
    items: [
      { name: '提示 Alert', href: 'alert.html' },
      { name: '轻提示 Toast', href: 'toast.html' },
      { name: '模态框 Modal', href: 'modal.html' },
      { name: '骨架屏 Skeleton', href: 'skeleton.html' },
      { name: '提示框 Callout', href: 'callout.html' },
      { name: '工具提示 Tooltip', href: 'tooltip.html' },
      { name: '通知点 Notification', href: 'notification.html' }
    ]
  },
  {
    title: '其他',
    items: [
      { name: '头像 Avatar', href: 'avatar.html' },
      { name: '表格 Table', href: 'table.html' },
      { name: '代码块 Code', href: 'code.html' },
      { name: '键盘按键 Keyboard', href: 'keyboard.html' },
      { name: 'AI 文档', href: 'ai-docs.html' }
    ]
  }
];

// 渲染侧边栏
(function() {
  const sidebar = document.querySelector('.docs-sidebar');
  if (!sidebar) return;
  
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  
  let navHtml = '<div class="docs-logo"><a href="index.html">LiteUI</a></div><nav class="docs-nav">';
  
  SIDEBAR_NAV.forEach(group => {
    navHtml += `<div class="docs-nav-group">`;
    navHtml += `<div class="docs-nav-title">${group.title}</div>`;
    
    group.items.forEach(item => {
      const isActive = item.href === currentPage ? ' active' : '';
      navHtml += `<a href="${item.href}" class="docs-nav-link${isActive}">${item.name}</a>`;
    });
    
    navHtml += `</div>`;
  });
  
  navHtml += '</nav>';
  sidebar.innerHTML = navHtml;
})();

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
