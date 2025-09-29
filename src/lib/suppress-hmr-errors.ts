'use client';

/**
 * 抑制 WebSocket HMR 相关的错误信息
 * 这些错误在开发环境中是常见的，不影响应用功能
 */
export function suppressHMRErrors() {
  if (typeof window === 'undefined') return;

  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args) => {
    const message = args.join(' ');
    
    // 忽略 WebSocket HMR 相关错误
    if (
      message.includes('WebSocket connection to') ||
      message.includes('webpack-hmr') ||
      message.includes('HMR') ||
      message.includes('Hot Module Replacement') ||
      (args[0] instanceof Error && args[0].message?.includes('WebSocket'))
    ) {
      return;
    }

    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    const message = args.join(' ');
    
    // 忽略 WebSocket HMR 相关警告
    if (
      message.includes('WebSocket connection to') ||
      message.includes('webpack-hmr') ||
      message.includes('HMR') ||
      message.includes('Hot Module Replacement') ||
      message.includes('Cross origin request detected')
    ) {
      return;
    }

    originalWarn.apply(console, args);
  };

  // 全局错误处理
  window.addEventListener('error', (event) => {
    if (
      event.message.includes('WebSocket connection to') ||
      event.message.includes('webpack-hmr') ||
      event.filename?.includes('use-websocket.js')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // 未处理的 Promise 拒绝
  window.addEventListener('unhandledrejection', (event) => {
    if (
      typeof event.reason === 'string' && (
        event.reason.includes('WebSocket connection to') ||
        event.reason.includes('webpack-hmr')
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });
}