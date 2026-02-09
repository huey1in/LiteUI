const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

const distDir = path.join(__dirname, '../dist');

// 确保 dist 目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

async function build() {
  console.log('Building LiteUI...\n');

  // 1. 构建 CSS
  const cssSource = fs.readFileSync(path.join(__dirname, '../lite-ui.css'), 'utf8');
  const cssMinified = new CleanCSS({ level: 2 }).minify(cssSource);
  fs.writeFileSync(path.join(distDir, 'lite-ui.css'), cssSource);
  fs.writeFileSync(path.join(distDir, 'lite-ui.min.css'), cssMinified.styles);
  console.log('✓ CSS built');

  // 2. 构建主 JS (UMD)
  const jsSource = fs.readFileSync(path.join(__dirname, '../lite-ui.js'), 'utf8');
  fs.writeFileSync(path.join(distDir, 'lite-ui.js'), jsSource);
  const jsMinified = await minify(jsSource, { compress: true, mangle: true });
  fs.writeFileSync(path.join(distDir, 'lite-ui.min.js'), jsMinified.code);
  console.log('✓ JS (UMD) built');

  // 3. 构建 ESM 版本
  const esmJS = jsSource
    .replace(/\(function\(global\) \{/, '')
    .replace(/\}\)\(typeof window !== 'undefined' \? window : this\);/, '')
    .replace(/global\.UI = UI;/, 'export { UI };')
    .replace(/\/\/ DOM Ready[\s\S]*?UI\.init\(\);[\s\S]*?\}/, '')
    + '\nexport default UI;';
  fs.writeFileSync(path.join(distDir, 'lite-ui.esm.js'), esmJS);
  console.log('✓ JS (ESM) built');

  // 4. 构建图标库
  const iconsSource = fs.readFileSync(path.join(__dirname, '../lite-icons.js'), 'utf8');
  fs.writeFileSync(path.join(distDir, 'lite-icons.js'), iconsSource);
  const iconsMinified = await minify(iconsSource, { compress: true, mangle: true });
  fs.writeFileSync(path.join(distDir, 'lite-icons.min.js'), iconsMinified.code);
  
  // ESM 图标
  const esmIcons = iconsSource
    .replace(/if \(typeof window !== 'undefined'\)[\s\S]*?window\.icon = icon;\s*\}/, '')
    .replace(/if \(typeof module !== 'undefined'[\s\S]*?module\.exports[\s\S]*?\}/, '')
    + '\nexport { Icons, icon };\nexport default Icons;';
  fs.writeFileSync(path.join(distDir, 'lite-icons.esm.js'), esmIcons);
  console.log('✓ Icons built');

  // 5. 生成类型定义
  const dts = `declare const UI: {
  version: string;
  theme: {
    init(): void;
    toggle(): boolean;
    set(theme: 'dark' | 'light' | 'system'): void;
    get(): 'dark' | 'light';
  };
  modal: {
    open(options?: {
      title?: string;
      content?: string;
      html?: string;
      size?: 'default' | 'lg' | 'xl';
      closable?: boolean;
      showClose?: boolean;
      onClose?: () => void;
      footer?: string;
    }): { overlay: HTMLElement; modal: HTMLElement };
    close(instance?: any): void;
    closeAll(): void;
    confirm(options?: {
      title?: string;
      content?: string;
      confirmText?: string;
      cancelText?: string;
      danger?: boolean;
    }): Promise<boolean>;
  };
  toast: {
    show(message: string, options?: { type?: 'success' | 'danger' | 'warning' | 'info'; duration?: number }): { remove: () => void };
    success(message: string, options?: { duration?: number }): { remove: () => void };
    error(message: string, options?: { duration?: number }): { remove: () => void };
    warning(message: string, options?: { duration?: number }): { remove: () => void };
    info(message: string, options?: { duration?: number }): { remove: () => void };
  };
  dropdown: {
    init(): void;
    open(element: HTMLElement): void;
    close(element: HTMLElement): void;
    toggle(element: HTMLElement): void;
  };
  loading: {
    show(options?: { text?: string; target?: HTMLElement }): void;
    hide(): void;
  };
  validate: {
    rules: {
      required: (value: string) => true | string;
      email: (value: string) => true | string;
      minLength: (min: number) => (value: string) => true | string;
      maxLength: (max: number) => (value: string) => true | string;
    };
    field(input: HTMLInputElement, rules: Array<(value: string) => true | string>): boolean;
    form(form: HTMLFormElement, config: Record<string, Array<(value: string) => true | string>>): boolean;
  };
  utils: {
    debounce<T extends (...args: any[]) => any>(fn: T, delay?: number): T;
    throttle<T extends (...args: any[]) => any>(fn: T, limit?: number): T;
    formatDate(date: Date | string | number, format?: string): string;
    copyToClipboard(text: string): Promise<boolean>;
    uniqueId(prefix?: string): string;
  };
  init(): void;
};

declare const Icons: Record<string, string>;
declare function icon(name: string, className?: string): string;

export { UI, Icons, icon };
export default UI;
`;
  fs.writeFileSync(path.join(distDir, 'lite-ui.d.ts'), dts);
  console.log('✓ TypeScript definitions generated');

  console.log('\n✅ Build complete!');
}

build().catch(console.error);
