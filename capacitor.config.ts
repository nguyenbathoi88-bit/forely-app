import type { CapacitorConfig } from '@capacitor/cli';

/**
 * GIAI DOAN 1 — "Remote shell": app native tai thang https://forely.vn.
 *  - Mot nguon code duy nhat: sua web la app cap nhat ngay, khong can phat hanh lai.
 *  - Web nhan biet dang chay trong app qua User-Agent chua "ForelyApp/..."
 *    (dung de an nut dang nhap Google — Google chan OAuth trong webview — xem ROADMAP.md).
 * GIAI DOAN 2 — neu Apple doi "minimum functionality" (guideline 4.2):
 *    dong goi shell offline + push notification. Chi tiet: ROADMAP.md.
 */
const config: CapacitorConfig = {
  appId: 'vn.forely.app',
  appName: 'Forely',
  webDir: 'www',
  appendUserAgent: 'ForelyApp/0.1.0',
  backgroundColor: '#134e39',
  server: {
    url: 'https://forely.vn',
    allowNavigation: ['forely.vn', '*.forely.vn']
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#134e39',
      showSpinner: false
    },
    StatusBar: {
      backgroundColor: '#134e39'
    }
  }
};

export default config;
