declare const UI: {
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
