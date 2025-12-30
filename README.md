# 1in UI 组件库

[![GitHub Stars](https://img.shields.io/github/stars/huey1in/1inui?style=flat-square&logo=github)](https://github.com/huey1in/1inui)[![GitHub Forks](https://img.shields.io/github/forks/huey1in/1inui?style=flat-square&logo=github)](https://github.com/huey1in/1inui)[![npm Version](https://img.shields.io/npm/v/1inui?style=flat-square&logo=npm)](https://www.npmjs.com/package/1inui)[![Repo Views](https://komarev.com/ghpvc/?username=huey1in&repo=1inui&style=flat-square&color=orange&label=Views)](https://github.com/huey1in/1inui)[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

### 文档: https://ui.yinxh.fun
### 你可以预览库组件风格在以下网站

- https://1incode.yinxh.fun
- https://step.yinxh.fun


## 安装

```bash
npm install 1in-ui
```

## 使用

### CDN 方式
```html
<link rel="stylesheet" href="https://unpkg.com/1in-ui/dist/1in-ui.css">
<script src="https://unpkg.com/1in-ui/dist/1in-ui.min.js"></script>
<script src="https://unpkg.com/1in-ui/dist/1in-icons.min.js"></script>
```

### ES Module
```javascript
import UI from '1in-ui';
import '1in-ui/css';
import { Icons, icon } from '1in-ui/icons';

UI.toast.success('Hello!');
```

### CommonJS
```javascript
const { UI } = require('1in-ui');
```

## 组件列表

### CSS 组件
- **导航栏** `.ui-navbar`
- **按钮** `.ui-btn` `.ui-btn-primary` `.ui-btn-secondary` `.ui-btn-success` `.ui-btn-danger`
- **卡片** `.ui-card`
- **表单** `.ui-input` `.ui-label` `.ui-checkbox` `.ui-select`
- **徽章** `.ui-badge`
- **提示框** `.ui-alert`
- **进度条** `.ui-progress`
- **分页** `.ui-pagination`
- **下拉菜单** `.ui-dropdown`
- **模态框** `.ui-modal`
- **侧边栏** `.ui-sidebar`
- **选项卡片** `.ui-option`
- **标签页** `.ui-tabs`
- **加载状态** `.ui-spinner` `.ui-skeleton`
- **空状态** `.ui-empty`

### JavaScript API

```javascript
// 主题
UI.theme.toggle()      // 切换主题
UI.theme.set('dark')   // 设置主题
UI.theme.get()         // 获取当前主题

// Toast 提示
UI.toast.success('成功')
UI.toast.error('失败')
UI.toast.warning('警告')
UI.toast.info('提示')

// 模态框
UI.modal.open({ title, content, html, footer, closable, onClose })
UI.modal.close()
UI.modal.confirm({ title, content, confirmText, cancelText, danger })

// 表单验证
UI.validate.form(formElement, {
  fieldName: [UI.validate.rules.required, UI.validate.rules.email]
})

// 工具函数
UI.utils.debounce(fn, delay)
UI.utils.throttle(fn, limit)
UI.utils.formatDate(date, format)
UI.utils.copyToClipboard(text)
UI.utils.uniqueId(prefix)
```

## 设计令牌

```css
:root {
  --ui-primary: #6366f1;
  --ui-primary-hover: #4f46e5;
  --ui-success: #10b981;
  --ui-warning: #f59e0b;
  --ui-danger: #ef4444;
  --ui-radius-lg: 1rem;
  --ui-radius-xl: 1.5rem;
  --ui-radius-2xl: 2rem;
}
```

## 文件结构

```
1in-ui/
├── 1in-ui.css      # 样式文件
├── 1in-ui.js       # JavaScript 组件
├── 1in-icons.js    # SVG 图标库
├── demo.html       # 演示页面
└── README.md       # 文档
```

## 图标库

引入图标库：
```html
<script src="1in-icons.js"></script>
```

使用图标：
```javascript
// 获取图标 SVG
icon('user')                    // 返回 SVG 字符串
icon('lock', 'my-class')        // 带自定义 class

// 直接访问图标对象
Icons.user
Icons.checkCircle
```

在 HTML 中使用：
```html
<div id="my-icon"></div>
<script>
  document.getElementById('my-icon').innerHTML = icon('user');
</script>
```

可用图标（60+）：
- 用户: `user`, `users`, `userPlus`
- 认证: `lock`, `unlock`, `key`, `shield`, `login`, `logout`
- 导航: `home`, `menu`, `chevronLeft/Right/Up/Down`, `arrowLeft/Right`, `externalLink`
- 操作: `close`, `check`, `plus`, `minus`, `edit`, `trash`, `copy`, `refresh`, `search`, `filter`, `download`, `upload`
- 状态: `checkCircle`, `xCircle`, `exclamationCircle`, `infoCircle`, `questionCircle`, `warning`, `bell`
- 主题: `sun`, `moon`, `eye`, `eyeOff`
- 文档: `document`, `documentText`, `clipboard`, `clipboardCheck`, `folder`, `inbox`
- 时间: `clock`, `calendar`
- 媒体: `play`, `pause`, `stop`
- 工具: `cog`, `adjustments`, `bolt`, `sparkles`, `lightbulb`
- 数据: `chartBar`, `trendingUp`, `trendingDown`
- 通信: `mail`, `chat`
- 其他: `star`, `heart`, `bookmark`, `flag`, `globe`, `link`, `code`, `terminal`

## 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
