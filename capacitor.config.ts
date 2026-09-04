import type { CapacitorConfig } from '@capacitor/cli';

/**
 * GIAI DOAN 1 — "Remote shell": app native tai thang https://forely.vn.
 *  - Mot nguon code duy nhat: sua web la app cap nhat ngay, khong can phat hanh lai.
 *  - Web nhan biet dang chay trong app qua User-Agent chua "ForelyApp/..."
 *    (dung de an nut dang nhap Google — Google chan OAuth trong webview — xem ROADMAP.md).
 * GIAI DOAN 2 — neu Apple doi "minimum functionality" (guideline 4.2):
 *    dong goi shell offline + push notification. Chi tiet: ROADMAP.md.
 *
 * MAU: Forest #0F3A36 — mau neo cua bo nhan dien "Signal Rings".
 * Nguon su that la trang cong khai forely.vn/thuong-hieu, KHONG phai BRAND-GUIDE.md.
 * Dung dung ma nay o ca ba cho (nen app, splash, thanh trang thai) de khong co
 * mot khung hinh nao loe mau khac luc mo app.
 * KHONG dung lai: #134E39 (gan Forest nhung khong co trong bang), navy #0F172A/
 * #1E3A8A/#172554, lime #A3E635/#C4F531/#84CC16 — deu da nghi huu.
 */
const FOREST = '#0F3A36';

const config: CapacitorConfig = {
  appId: 'vn.forely.app',
  appName: 'Forely',
  webDir: 'www',
  appendUserAgent: 'ForelyApp/0.1.0',
  backgroundColor: FOREST,
  server: {
    // Che do remote: webview tai thang production. Sua web la app doi theo ngay.
    url: 'https://forely.vn',
    allowNavigation: ['forely.vn', '*.forely.vn'],
    // https thay vi http://localhost cho webview: cung secure context voi web that,
    // nen cookie/localStorage/Firebase reCAPTCHA hanh xu giong het trinh duyet.
    androidScheme: 'https'
  },
  android: {
    // Chi co tac dung o ban debug (CI dung assembleDebug) — cho phep mo
    // chrome://inspect de soi loi tren may that. Ban release khong bat.
    webContentsDebuggingEnabled: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: FOREST,
      showSpinner: false
    },
    StatusBar: {
      backgroundColor: FOREST,
      // Chu trang tren nen Forest — do tuong phan dat WCAG AA.
      style: 'DARK'
    }
  }
};

export default config;
