/**
 * 1in UI - JavaScript 组件库
 * Version: 1.1.0
 */

(function(global) {
  'use strict';

  const UI = {
    version: '1.1.0',
    theme: {
      _key: 'ui-theme',
      
      init() {
        const saved = localStorage.getItem(this._key);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (saved === 'dark' || (!saved && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
        
        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem(this._key)) {
            document.documentElement.classList.toggle('dark', e.matches);
          }
        });
      },

      toggle() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(this._key, isDark ? 'dark' : 'light');
        return isDark;
      },

      set(theme) {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          localStorage.removeItem(this._key);
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', prefersDark);
          return;
        }
        localStorage.setItem(this._key, theme);
      },

      get() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      }
    },

    modal: {
      _stack: [],

      open(options = {}) {
        const {
          title = '',
          content = '',
          html = null,
          size = 'default',
          closable = true,
          showClose = false,
          onClose = null,
          footer = null
        } = options;

        const overlay = document.createElement('div');
        overlay.className = 'ui-modal-overlay';
        overlay.setAttribute('data-ui-modal', '');

        const modal = document.createElement('div');
        modal.className = 'ui-modal';
        if (size === 'lg') modal.classList.add('ui-modal-lg');
        if (size === 'xl') modal.classList.add('ui-modal-xl');

        // 关闭按钮（右上角 X）
        const closeBtn = showClose ? `
          <button class="ui-modal-close" data-close>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        ` : '';

        // 标题
        const titleHtml = title ? `<h3 class="ui-modal-title">${title}</h3>` : '';
        
        // 内容
        const contentHtml = html || (content ? `<p class="ui-modal-desc">${content}</p>` : '');
        
        // 底部按钮
        const footerHtml = footer ? `<div class="ui-modal-actions">${footer}</div>` : '';

        modal.innerHTML = `
          ${closeBtn}
          ${titleHtml}
          ${contentHtml}
          ${footerHtml}
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const instance = { overlay, modal, onClose };
        this._stack.push(instance);

        // 关闭事件
        if (closable) {
          overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close(instance);
          });
          modal.querySelector('[data-close]')?.addEventListener('click', () => this.close(instance));
        }

        // ESC 关闭
        const escHandler = (e) => {
          if (e.key === 'Escape' && closable) {
            this.close(instance);
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);
        instance.escHandler = escHandler;

        return instance;
      },

      close(instance) {
        if (!instance) {
          instance = this._stack.pop();
        } else {
          const idx = this._stack.indexOf(instance);
          if (idx > -1) this._stack.splice(idx, 1);
        }

        if (!instance) return;

        instance.overlay.style.opacity = '0';
        setTimeout(() => {
          instance.overlay.remove();
          if (this._stack.length === 0) {
            document.body.style.overflow = '';
          }
          if (instance.onClose) instance.onClose();
        }, 200);

        if (instance.escHandler) {
          document.removeEventListener('keydown', instance.escHandler);
        }
      },

      closeAll() {
        while (this._stack.length) {
          this.close();
        }
      },

      // 确认对话框 - 完全匹配实际页面样式
      confirm(options = {}) {
        return new Promise((resolve) => {
          const {
            title = '确认',
            content = '确定要执行此操作吗？',
            confirmText = '确定',
            cancelText = '取消',
            danger = false,
            icon = null
          } = options;

          // 图标 HTML
          let iconHtml = '';
          if (icon || danger) {
            const iconType = danger ? 'danger' : (icon || 'warning');
            const iconSvg = {
              danger: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>',
              warning: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
              success: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
            };
            iconHtml = `<div class="ui-modal-icon ${iconType}">${iconSvg[iconType] || iconSvg.warning}</div>`;
          }

          const instance = this.open({
            html: `
              ${iconHtml}
              <h3 class="ui-modal-title">${title}</h3>
              <p class="ui-modal-desc">${content}</p>
            `,
            footer: `
              <button class="ui-modal-btn-cancel" data-action="cancel">${cancelText}</button>
              <button class="ui-modal-btn-confirm ${danger ? 'danger' : ''}" data-action="confirm">${confirmText}</button>
            `,
            onClose: () => resolve(false)
          });

          instance.modal.querySelector('[data-action="cancel"]').addEventListener('click', () => {
            this.close(instance);
            resolve(false);
          });

          instance.modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
            this.close(instance);
            resolve(true);
          });
        });
      }
    },
    toast: {
      _container: null,

      _getContainer() {
        if (!this._container) {
          this._container = document.createElement('div');
          this._container.style.cssText = `
            position: fixed;
            bottom: 1.5rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
            pointer-events: none;
          `;
          document.body.appendChild(this._container);
        }
        return this._container;
      },

      show(message, options = {}) {
        const {
          type = 'info',
          duration = 3000
        } = options;

        const icons = {
          success: '<svg width="20" height="20" fill="none" stroke="#3ba55c" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>',
          danger: '<svg width="20" height="20" fill="none" stroke="#ed4245" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
          warning: '<svg width="20" height="20" fill="none" stroke="#faa61a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
          info: '<svg width="20" height="20" fill="none" stroke="#5865f2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
        };

        const toast = document.createElement('div');
        toast.style.cssText = `
          background: #36393f;
          color: #dcddde;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          box-shadow: 0 8px 16px rgba(0,0,0,0.24);
          pointer-events: auto;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.2s ease;
          max-width: 24rem;
        `;

        toast.innerHTML = `
          <span style="flex-shrink:0;display:flex;">${icons[type] || icons.info}</span>
          <span>${message}</span>
        `;

        this._getContainer().appendChild(toast);

        // 动画进入
        requestAnimationFrame(() => {
          toast.style.transform = 'translateY(0)';
          toast.style.opacity = '1';
        });

        const remove = () => {
          toast.style.transform = 'translateY(20px)';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 200);
        };

        if (duration > 0) {
          setTimeout(remove, duration);
        }

        return { remove };
      },

      success(message, options = {}) {
        return this.show(message, { ...options, type: 'success' });
      },

      error(message, options = {}) {
        return this.show(message, { ...options, type: 'danger' });
      },

      warning(message, options = {}) {
        return this.show(message, { ...options, type: 'warning' });
      },

      info(message, options = {}) {
        return this.show(message, { ...options, type: 'info' });
      }
    },
    dropdown: {
      init() {
        document.addEventListener('click', (e) => {
          const trigger = e.target.closest('[data-dropdown]');
          
          if (trigger) {
            e.preventDefault();
            const dropdown = trigger.closest('.ui-dropdown');
            if (dropdown) {
              dropdown.classList.toggle('open');
            }
          } else {
            // 点击外部关闭所有下拉
            document.querySelectorAll('.ui-dropdown.open').forEach(d => d.classList.remove('open'));
          }
        });
      },

      open(element) {
        element.classList.add('open');
      },

      close(element) {
        element.classList.remove('open');
      },

      toggle(element) {
        element.classList.toggle('open');
      }
    },
    sidebar: {
      open(selector) {
        const sidebar = document.querySelector(selector);
        const overlay = document.querySelector(`${selector}-overlay`);
        
        if (sidebar) {
          sidebar.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
        if (overlay) {
          overlay.style.display = 'block';
          overlay.addEventListener('click', () => this.close(selector), { once: true });
        }
      },

      close(selector) {
        const sidebar = document.querySelector(selector);
        const overlay = document.querySelector(`${selector}-overlay`);
        
        if (sidebar) {
          sidebar.classList.remove('open');
          document.body.style.overflow = '';
        }
        if (overlay) {
          overlay.style.display = 'none';
        }
      },

      toggle(selector) {
        const sidebar = document.querySelector(selector);
        if (sidebar?.classList.contains('open')) {
          this.close(selector);
        } else {
          this.open(selector);
        }
      }
    },
    accordion: {
      init() {
        document.addEventListener('click', (e) => {
          const header = e.target.closest('.ui-accordion-header');
          if (header) {
            const item = header.closest('.ui-accordion-item');
            if (item) {
              item.classList.toggle('open');
            }
          }
        });
      },

      open(item) {
        if (typeof item === 'string') item = document.querySelector(item);
        item?.classList.add('open');
      },

      close(item) {
        if (typeof item === 'string') item = document.querySelector(item);
        item?.classList.remove('open');
      },

      toggle(item) {
        if (typeof item === 'string') item = document.querySelector(item);
        item?.classList.toggle('open');
      }
    },
    tabs: {
      init() {
        document.addEventListener('click', (e) => {
          const tab = e.target.closest('.ui-tab[data-tab]');
          if (tab) {
            const tabs = tab.closest('.ui-tabs');
            const target = tab.dataset.tab;
            
            // 切换 tab 激活状态
            tabs.querySelectorAll('.ui-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 切换内容面板
            const container = tabs.closest('[data-tabs-container]') || tabs.parentElement;
            container.querySelectorAll('.ui-tab-panel').forEach(p => {
              p.classList.toggle('active', p.dataset.panel === target);
              p.style.display = p.dataset.panel === target ? '' : 'none';
            });
          }
        });
      }
    },
    loading: {
      _overlay: null,

      show(options = {}) {
        const { text = '加载中...', target = document.body } = options;

        if (this._overlay) this.hide();

        this._overlay = document.createElement('div');
        this._overlay.style.cssText = `
          position: ${target === document.body ? 'fixed' : 'absolute'};
          inset: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          z-index: 9999;
        `;

        this._overlay.innerHTML = `
          <div class="ui-spinner"></div>
          ${text ? `<div style="font-weight:700;color:var(--ui-text-muted);">${text}</div>` : ''}
        `;

        if (target !== document.body) {
          target.style.position = 'relative';
        }
        target.appendChild(this._overlay);
      },

      hide() {
        if (this._overlay) {
          this._overlay.remove();
          this._overlay = null;
        }
      }
    },
    validate: {
      rules: {
        required: (value) => value.trim() !== '' || '此字段为必填项',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '请输入有效的邮箱地址',
        minLength: (min) => (value) => value.length >= min || `最少需要 ${min} 个字符`,
        maxLength: (max) => (value) => value.length <= max || `最多允许 ${max} 个字符`,
        pattern: (regex, msg) => (value) => regex.test(value) || msg,
        match: (selector, msg) => (value) => {
          const target = document.querySelector(selector);
          return target && value === target.value || msg || '两次输入不一致';
        }
      },

      field(input, rules) {
        const value = input.value;
        const errors = [];

        for (const rule of rules) {
          const result = typeof rule === 'function' ? rule(value) : rule;
          if (result !== true) {
            errors.push(result);
          }
        }

        // 显示/隐藏错误
        let errorEl = input.parentElement.querySelector('.ui-field-error');
        if (errors.length > 0) {
          input.style.borderColor = 'var(--ui-danger)';
          if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'ui-field-error';
            errorEl.style.cssText = 'color:var(--ui-danger);font-size:0.75rem;font-weight:700;margin-top:0.25rem;';
            input.parentElement.appendChild(errorEl);
          }
          errorEl.textContent = errors[0];
        } else {
          input.style.borderColor = '';
          if (errorEl) errorEl.remove();
        }

        return errors.length === 0;
      },

      form(formElement, config) {
        let isValid = true;
        
        for (const [name, rules] of Object.entries(config)) {
          const input = formElement.querySelector(`[name="${name}"]`);
          if (input && !this.field(input, rules)) {
            isValid = false;
          }
        }

        return isValid;
      }
    },
    utils: {
      // 防抖
      debounce(fn, delay = 300) {
        let timer;
        return function(...args) {
          clearTimeout(timer);
          timer = setTimeout(() => fn.apply(this, args), delay);
        };
      },

      // 节流
      throttle(fn, limit = 300) {
        let inThrottle;
        return function(...args) {
          if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
          }
        };
      },

      // 格式化日期
      formatDate(date, format = 'YYYY-MM-DD HH:mm') {
        const d = new Date(date);
        const map = {
          'YYYY': d.getFullYear(),
          'MM': String(d.getMonth() + 1).padStart(2, '0'),
          'DD': String(d.getDate()).padStart(2, '0'),
          'HH': String(d.getHours()).padStart(2, '0'),
          'mm': String(d.getMinutes()).padStart(2, '0'),
          'ss': String(d.getSeconds()).padStart(2, '0')
        };
        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => map[match]);
      },

      // 复制到剪贴板
      async copyToClipboard(text) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {
          // 降级方案
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          return success;
        }
      },

      // 生成唯一ID
      uniqueId(prefix = 'ui') {
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
      }
    },
    init() {
      this.theme.init();
      this.dropdown.init();
      this.accordion.init();
      this.tabs.init();
      
      // 自动绑定主题切换按钮
      document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.theme.toggle());
      });

      console.log(`1in UI v${this.version} initialized`);
    }
  };

  // 暴露到全局
  global.UI = UI;

  // DOM Ready 自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UI.init());
  } else {
    UI.init();
  }

})(typeof window !== 'undefined' ? window : this);
