# 1inUI 组件库

轻量级前端组件库，12KB JS，零依赖，原生深色模式。

## 引入

```html
<link rel="stylesheet" href="https://unpkg.com/1inui/dist/1in-ui.min.css">
<script src="https://unpkg.com/1inui/dist/1in-ui.min.js" defer></script>
```

- body 必须加 `class="ui-base"` 应用基础样式
- 深色模式：html 加 `class="dark"`，或用 `UI.theme.toggle()`
- 图标库可选：`<script src="https://unpkg.com/1inui/dist/1in-icons.min.js" defer></script>`

## 组件

### 按钮 Button
```html
<button class="ui-btn">默认</button>
<button class="ui-btn ui-btn-primary">主要</button>
<button class="ui-btn ui-btn-secondary">次要</button>
<button class="ui-btn ui-btn-ghost">幽灵</button>
<button class="ui-btn ui-btn-danger">危险</button>
<button class="ui-btn ui-btn-success">成功</button>
<button class="ui-btn ui-btn-primary ui-btn-lg">大按钮</button>
<button class="ui-btn ui-btn-primary" disabled>禁用</button>
<button class="ui-btn-icon"><svg>...</svg></button>
```
注意：ui-btn-icon 是圆形图标按钮，不需要 ui-btn 前缀

### 卡片 Card
```html
<div class="ui-card">
  <h3 class="ui-card-title">标题</h3>
  <p class="ui-card-subtitle">副标题</p>
  <p>内容</p>
</div>
```
变体：`ui-card-sm`(小卡片)、`ui-card-blur`(毛玻璃)
悬停效果：加 `ui-hover-lift` 或 `ui-hover-shadow`

### 输入框 Input
```html
<!-- 基础 -->
<div class="ui-form-group">
  <label class="ui-label">标签</label>
  <input type="text" class="ui-input" placeholder="请输入">
</div>

<!-- 带图标 -->
<div class="ui-form-group">
  <label class="ui-label">邮箱</label>
  <div class="ui-input-group">
    <div class="ui-input-icon"><svg>...</svg></div>
    <input type="email" class="ui-input" placeholder="user@example.com">
  </div>
</div>

<!-- 文本域 -->
<textarea class="ui-input ui-textarea" placeholder="内容"></textarea>

<!-- 复选框 -->
<label class="ui-checkbox">
  <input type="checkbox"> 记住我
</label>
```
注意：ui-input-group 内的 input 会自动左侧留出图标空间

### 开关 Switch
```html
<label class="ui-switch">
  <input type="checkbox">
  <span class="ui-switch-track">
    <span class="ui-switch-thumb"></span>
  </span>
  <span class="ui-switch-label">开启通知</span>
</label>
```
结构固定：input + track(含thumb) + label，缺一不可

### 单选框 Radio
```html
<div class="ui-radio-group">
  <label class="ui-radio">
    <input type="radio" name="opt" value="1">
    <span class="ui-radio-mark"></span>
    选项一
  </label>
  <label class="ui-radio">
    <input type="radio" name="opt" value="2">
    <span class="ui-radio-mark"></span>
    选项二
  </label>
</div>
```
水平排列：`<div class="ui-radio-group horizontal">`

### 警告提示 Alert
```html
<div class="ui-alert ui-alert-success">成功消息</div>
<div class="ui-alert ui-alert-error">错误消息</div>
<div class="ui-alert ui-alert-warning">警告消息</div>
<div class="ui-alert ui-alert-info">提示消息</div>

<!-- 带图标和标题 -->
<div class="ui-alert ui-alert-success">
  <div class="ui-alert-content">
    <div class="ui-alert-icon"><svg>...</svg></div>
    <div>
      <div class="ui-alert-title">成功</div>
      <p class="ui-alert-text">操作已完成</p>
    </div>
  </div>
</div>
```
注意：是 `ui-alert-error` 不是 ui-alert-danger

### 徽章 Badge
```html
<span class="ui-badge ui-badge-primary">主要</span>
<span class="ui-badge ui-badge-secondary">次要</span>
<span class="ui-badge ui-badge-success">成功</span>
<span class="ui-badge ui-badge-error">错误</span>
```
注意：是 `ui-badge-error` 不是 ui-badge-danger

### 标签 Tag
```html
<span class="ui-tag">默认</span>
<span class="ui-tag ui-tag-primary">主要</span>
<span class="ui-tag ui-tag-success">成功</span>
<span class="ui-tag ui-tag-error">错误</span>
<span class="ui-tag ui-tag-warning">警告</span>

<!-- 可关闭 -->
<span class="ui-tag">
  标签文字
  <span class="ui-tag-close" onclick="this.parentElement.remove()">×</span>
</span>
```

### 头像 Avatar
```html
<!-- 文字头像 -->
<div class="ui-avatar ui-avatar-md">A</div>

<!-- 图片头像 -->
<div class="ui-avatar ui-avatar-md">
  <img src="avatar.jpg" alt="">
</div>

<!-- 带状态 -->
<div class="ui-avatar-wrapper">
  <div class="ui-avatar ui-avatar-md">A</div>
  <span class="ui-avatar-status online"></span>
</div>

<!-- 头像组 -->
<div class="ui-avatar-group">
  <div class="ui-avatar ui-avatar-sm">A</div>
  <div class="ui-avatar ui-avatar-sm">B</div>
  <div class="ui-avatar ui-avatar-sm">+3</div>
</div>
```
尺寸：`ui-avatar-xs`(24px) / `ui-avatar-sm`(32px) / `ui-avatar-md`(40px) / `ui-avatar-lg`(48px) / `ui-avatar-xl`(64px)
状态：`online`(绿) / `offline`(灰) / `busy`(红) / `away`(黄)

### 下拉菜单 Dropdown
```html
<div class="ui-dropdown">
  <button class="ui-btn ui-btn-secondary" data-dropdown>
    选择选项 ▼
  </button>
  <div class="ui-dropdown-menu">
    <button class="ui-dropdown-item">选项一</button>
    <button class="ui-dropdown-item">选项二</button>
    <button class="ui-dropdown-item">选项三</button>
  </div>
</div>
```
触发按钮必须有 `data-dropdown` 属性，JS 会自动处理点击事件

### 选项卡 Tabs
```html
<div data-tabs-container>
  <div class="ui-tabs">
    <button class="ui-tab active" data-tab="tab1">选项卡1</button>
    <button class="ui-tab" data-tab="tab2">选项卡2</button>
  </div>
  <div class="ui-tab-panel active" data-panel="tab1">内容1</div>
  <div class="ui-tab-panel" data-panel="tab2" style="display:none">内容2</div>
</div>
```
注意：data-tab 和 data-panel 值要对应，非激活面板需要 `style="display:none"`

### 表格 Table
```html
<div class="ui-table-wrapper">
  <table class="ui-table">
    <thead>
      <tr><th>姓名</th><th>邮箱</th><th>状态</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>张三</td>
        <td>zhang@example.com</td>
        <td><span class="ui-badge ui-badge-success">活跃</span></td>
      </tr>
    </tbody>
  </table>
</div>
```
斑马纹：`<table class="ui-table ui-table-striped">`
必须用 ui-table-wrapper 包裹以支持响应式滚动

### 列表 List
```html
<ul class="ui-list">
  <li class="ui-list-item">
    <div class="ui-list-item-icon"><svg>...</svg></div>
    <div class="ui-list-item-content">
      <div class="ui-list-item-title">标题</div>
      <div class="ui-list-item-desc">描述文字</div>
    </div>
    <div class="ui-list-item-action">
      <button class="ui-btn ui-btn-ghost">操作</button>
    </div>
  </li>
</ul>
```

### 统计 Stat
```html
<div class="ui-stat">
  <div class="ui-stat-value">1,234</div>
  <div class="ui-stat-label">总用户</div>
</div>

<!-- 带颜色 -->
<div class="ui-stat">
  <div class="ui-stat-value primary">98%</div>
  <div class="ui-stat-label">完成率</div>
</div>
```
颜色：在 ui-stat-value 上加 `primary` / `success` / `error`

### 进度条 Progress
```html
<div class="ui-progress">
  <div class="ui-progress-bar" style="width: 60%"></div>
</div>

<!-- 带颜色 -->
<div class="ui-progress">
  <div class="ui-progress-bar success" style="width: 80%"></div>
</div>
```
颜色：在 ui-progress-bar 上加 `success` / `warning` / `error`

### 分页 Pagination
```html
<div class="ui-pagination">
  <button class="ui-page-btn" disabled>‹</button>
  <button class="ui-page-btn active">1</button>
  <button class="ui-page-btn">2</button>
  <button class="ui-page-btn">3</button>
  <span class="ui-page-ellipsis">...</span>
  <button class="ui-page-btn">10</button>
  <button class="ui-page-btn">›</button>
</div>
```

### 加载 Loading
```html
<!-- 加载动画 -->
<div class="ui-spinner"></div>
<div class="ui-spinner ui-spinner-sm"></div>

<!-- 骨架屏 -->
<div class="ui-skeleton ui-skeleton-text"></div>
<div class="ui-skeleton ui-skeleton-text"></div>
<div class="ui-skeleton ui-skeleton-text" style="width:60%"></div>
<div class="ui-skeleton ui-skeleton-avatar"></div>
<div class="ui-skeleton ui-skeleton-btn"></div>
```

### 空状态 Empty
```html
<div class="ui-empty">
  <div class="ui-empty-icon"><svg>...</svg></div>
  <h3 class="ui-empty-title">暂无数据</h3>
  <p class="ui-empty-text">当前没有任何内容</p>
  <button class="ui-btn ui-btn-primary">添加内容</button>
</div>
```

### 手风琴 Accordion
```html
<div class="ui-accordion">
  <div class="ui-accordion-item open">
    <button class="ui-accordion-header">
      问题一
      <span class="ui-accordion-icon">▼</span>
    </button>
    <div class="ui-accordion-content">
      <div class="ui-accordion-body">答案内容</div>
    </div>
  </div>
  <div class="ui-accordion-item">
    <button class="ui-accordion-header">
      问题二
      <span class="ui-accordion-icon">▼</span>
    </button>
    <div class="ui-accordion-content">
      <div class="ui-accordion-body">答案内容</div>
    </div>
  </div>
</div>
```
默认展开：在 ui-accordion-item 上加 `open`

### 工具提示 Tooltip
```html
<div class="ui-tooltip">
  <button class="ui-btn">悬停查看</button>
  <div class="ui-tooltip-content">提示内容</div>
</div>

<!-- 底部显示 -->
<div class="ui-tooltip ui-tooltip-bottom">
  <button class="ui-btn">悬停查看</button>
  <div class="ui-tooltip-content">提示内容</div>
</div>
```

### 面包屑 Breadcrumb
```html
<nav class="ui-breadcrumb">
  <a href="#" class="ui-breadcrumb-item">首页</a>
  <span class="ui-breadcrumb-sep">/</span>
  <a href="#" class="ui-breadcrumb-item">分类</a>
  <span class="ui-breadcrumb-sep">/</span>
  <span class="ui-breadcrumb-item active">当前页</span>
</nav>
```

### 分割线 Divider
```html
<div class="ui-divider"></div>
<div class="ui-divider-v"></div><!-- 垂直分割线，用于 flex 容器 -->
<div class="ui-divider-text">或者</div><!-- 带文字 -->
```

### 代码 Code
```html
<code class="ui-code">npm install 1inui</code>
<pre class="ui-code-block">
const UI = window.UI;
UI.toast.success('Hello!');
</pre>
```

### 键盘按键 Kbd
```html
<kbd class="ui-kbd">Ctrl</kbd> + <kbd class="ui-kbd">C</kbd>
```

### 提示框 Callout
```html
<div class="ui-callout">
  <div class="ui-callout-icon"><svg>...</svg></div>
  <div class="ui-callout-content">
    <div class="ui-callout-title">提示</div>
    这是一条提示信息
  </div>
</div>

<div class="ui-callout ui-callout-warning">...</div>
<div class="ui-callout ui-callout-error">...</div>
<div class="ui-callout ui-callout-success">...</div>
```

### 导航栏 Navbar
```html
<nav class="ui-navbar">
  <div class="ui-navbar-inner">
    <a href="#" class="ui-navbar-brand">
      <span>Logo</span>
    </a>
    <div class="ui-nav-pills">
      <a href="#" class="ui-nav-link active">首页</a>
      <a href="#" class="ui-nav-link">关于</a>
      <div class="ui-divider-v"></div>
      <button class="ui-btn-icon" data-theme-toggle><svg>...</svg></button>
    </div>
  </div>
</nav>
```
导航栏是 fixed 定位，页面内容需要 `padding-top: 4rem` 或用 `ui-page` 类

### 侧边栏 Sidebar
```html
<div class="ui-sidebar-overlay" id="sidebar-overlay"></div>
<div class="ui-sidebar" id="sidebar">
  <div class="ui-sidebar-header">
    <span class="ui-sidebar-title">菜单</span>
    <button class="ui-btn-icon" onclick="UI.sidebar.close('#sidebar')">×</button>
  </div>
  <nav class="ui-sidebar-nav">
    <a href="#" class="ui-sidebar-link active">首页</a>
    <a href="#" class="ui-sidebar-link">设置</a>
  </nav>
</div>

<button onclick="UI.sidebar.open('#sidebar')">打开菜单</button>
```

### 页脚 Footer
```html
<footer class="ui-footer">
  <div class="ui-container">
    <div class="ui-footer-grid">
      <div>
        <div class="ui-footer-title">产品</div>
        <ul class="ui-footer-links">
          <li><a href="#">功能</a></li>
          <li><a href="#">定价</a></li>
        </ul>
      </div>
    </div>
    <div class="ui-footer-bottom">
      <p>© 2024 Company. All rights reserved.</p>
    </div>
  </div>
</footer>
```

## JavaScript API

### 主题 Theme
```javascript
UI.theme.toggle();           // 切换深色/浅色
UI.theme.set('dark');        // 设置深色
UI.theme.set('light');       // 设置浅色
UI.theme.set('system');      // 跟随系统
UI.theme.get();              // 获取当前 'dark' | 'light'
```
主题会自动保存到 localStorage

### Toast 消息提示
```javascript
UI.toast.show('消息内容');
UI.toast.success('操作成功');
UI.toast.error('操作失败');
UI.toast.warning('请注意');
UI.toast.info('提示信息');

// 自定义选项
UI.toast.show('消息', { type: 'success', duration: 3000 });
// duration: 0 表示不自动关闭
```

### Modal 弹窗
```javascript
// 打开弹窗
const modal = UI.modal.open({
  title: '标题',
  content: '内容文字',
  html: '<div>自定义HTML</div>',  // 与 content 二选一
  size: 'default',  // 'default' | 'lg' | 'xl'
  closable: true,   // 点击遮罩关闭
  showClose: true,  // 显示右上角关闭按钮
  footer: '<button class="ui-btn">自定义按钮</button>',
  onClose: () => {}
});

// 关闭弹窗
UI.modal.close(modal);
UI.modal.close();     // 关闭最后一个
UI.modal.closeAll();  // 关闭所有

// 确认对话框
const confirmed = await UI.modal.confirm({
  title: '确认删除',
  content: '此操作不可恢复，确定要删除吗？',
  confirmText: '删除',
  cancelText: '取消',
  danger: true,        // 确认按钮红色
  icon: 'danger'       // 'danger' | 'warning' | 'success'
});
if (confirmed) {
  // 用户点击了确认
}
```

### Dropdown 下拉菜单
```javascript
UI.dropdown.open(element);
UI.dropdown.close(element);
UI.dropdown.toggle(element);
```
通常不需要手动调用，data-dropdown 会自动处理

### Sidebar 侧边栏
```javascript
UI.sidebar.open('#sidebar');
UI.sidebar.close('#sidebar');
UI.sidebar.toggle('#sidebar');
```

### Loading 加载
```javascript
UI.loading.show({ text: '加载中...' });
UI.loading.show({ text: '加载中...', target: document.querySelector('.container') });
UI.loading.hide();
```

### 工具函数
```javascript
UI.utils.debounce(fn, 300);              // 防抖
UI.utils.throttle(fn, 300);              // 节流
UI.utils.formatDate(date, 'YYYY-MM-DD'); // 格式化日期
await UI.utils.copyToClipboard('文本');   // 复制到剪贴板
UI.utils.uniqueId('prefix');             // 生成唯一ID
```

## 布局工具类

### 容器
```html
<div class="ui-container">最大宽度 80rem，居中</div>
<div class="ui-container-sm">最大宽度 40rem</div>
<div class="ui-container-md">最大宽度 48rem</div>
<div class="ui-container-lg">最大宽度 64rem</div>
```

### 区块
```html
<section class="ui-section">上下 padding 4rem</section>
<section class="ui-section-sm">上下 padding 2rem</section>
<section class="ui-section-lg">上下 padding 6rem</section>
```

### 页面
```html
<div class="ui-page">min-height: 100vh, padding-top: 5rem (给 navbar 留空间)</div>
<div class="ui-page-center">垂直水平居中</div>
```

### 网格
```html
<div class="ui-grid ui-grid-2">2列</div>
<div class="ui-grid ui-grid-3">3列</div>
<div class="ui-grid ui-grid-4">4列</div>
<div class="ui-grid ui-grid-auto">自适应列数，最小 280px</div>
```
移动端自动变为单列

### Flex
```html
<div class="ui-flex">flex</div>
<div class="ui-flex ui-flex-col">flex-direction: column</div>
<div class="ui-flex ui-items-center">align-items: center</div>
<div class="ui-flex ui-items-start">align-items: flex-start</div>
<div class="ui-flex ui-items-end">align-items: flex-end</div>
<div class="ui-flex ui-justify-center">justify-content: center</div>
<div class="ui-flex ui-justify-between">justify-content: space-between</div>
<div class="ui-flex ui-justify-end">justify-content: flex-end</div>
<div class="ui-flex ui-flex-wrap">flex-wrap: wrap</div>
<div class="ui-flex ui-gap-2">gap: 0.5rem</div>
<div class="ui-flex ui-gap-4">gap: 1rem</div>
<div class="ui-flex ui-gap-6">gap: 1.5rem</div>
```

### 间距
```html
<!-- Padding -->
ui-p-0/2/3/4/6/8/10/12
ui-px-2/4/6/8 (水平)
ui-py-2/4/6/8/12/16/20 (垂直)

<!-- Margin -->
ui-m-0/4, ui-m-auto
ui-mx-auto (水平居中)
ui-mt-0/2/4/6/8/10/12 (上)
ui-mb-0/2/4/6/8/10/12 (下)
ui-ml-2 (左)
```

### 文字
```html
ui-text-xs/sm/lg/xl/2xl/3xl/4xl/5xl (字号)
ui-font-normal/medium/semibold/bold/extrabold/black (字重)
ui-text-left/center/right (对齐)
ui-text-muted/primary/success/error/warning/dark/light/white (颜色)
ui-leading-tight/normal/relaxed/loose (行高)
ui-truncate (单行截断)
ui-line-clamp-2/3 (多行截断)
```

### 显示隐藏
```html
ui-hidden (display: none)
ui-hide-mobile (768px 以下隐藏)
ui-hide-desktop (768px 以上隐藏)
```

### 背景
```html
ui-bg-transparent/white/card/muted/primary
ui-bg-primary-light (主色浅色背景)
ui-bg-gradient (彩色渐变背景)
```

### 边框圆角
```html
ui-border (1px 边框)
ui-border-2 (2px 边框)
ui-border-t/b (上/下边框)
ui-border-none
ui-rounded/rounded-lg/rounded-xl/rounded-2xl/rounded-3xl/rounded-full/rounded-none
```

### 阴影
```html
ui-shadow (小阴影)
ui-shadow-lg (大阴影)
ui-shadow-xl (超大阴影)
ui-shadow-none
```

### 宽高
```html
ui-w-full/auto
ui-w-1\/2, ui-w-1\/3, ui-w-2\/3, ui-w-1\/4, ui-w-3\/4
ui-max-w-xs/sm/md/lg/xl/2xl/full
ui-h-full/screen
ui-min-h-screen
```

### 悬停效果
```html
ui-hover-lift (上浮)
ui-hover-scale (放大)
ui-hover-shadow (阴影)
ui-hover-primary (文字变主色)
ui-hover-bg (背景变灰)
ui-transition (过渡动画)
```

## 常见问题

1. **样式不生效**：检查 body 是否有 `class="ui-base"`
2. **JS 功能不工作**：确保 script 标签有 `defer` 属性，或放在 body 末尾
3. **深色模式**：在 html 标签加 `class="dark"`，不是 body
4. **导航栏遮挡内容**：页面容器用 `ui-page` 类或手动加 `padding-top: 4rem`
5. **表格溢出**：必须用 `ui-table-wrapper` 包裹
6. **开关不显示**：检查结构是否完整（input + track + thumb）
7. **下拉菜单不工作**：触发按钮需要 `data-dropdown` 属性
