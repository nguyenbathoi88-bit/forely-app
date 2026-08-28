# Forely App — iOS · Android · Windows · macOS

**Kiến trúc:** 1 nguồn code web (forely.vn) → 4 nền tảng. App là kênh phân phối + giữ chân người dùng (push notification), không phải sản phẩm viết lại.

- **Mobile (iOS/Android):** Capacitor 7 — shell native tải thẳng `https://forely.vn` (chế độ remote: sửa web là app tự cập nhật, không cần phát hành lại).
- **Desktop (Windows/macOS):** Tauri 2 — installer nhẹ ~10MB, dùng webview có sẵn của hệ điều hành.

> Bản đầy đủ (kèm `android/` đã sinh sẵn) nằm trên máy dev tại `D:\Forely\forely-app`.
> Repo GitHub này khởi tạo qua API để chạy CI desktop; khi push từ máy dev lần đầu:
> `git push --force origin main` (lịch sử local là nguồn sự thật, nội dung là superset).

## Cấu trúc thư mục

```
forely-app/
├── capacitor.config.ts    # cấu hình mobile: appId vn.forely.app, remote = forely.vn
├── package.json           # dependency Capacitor
├── www/                   # trang dự phòng offline (webDir)
├── resources/             # icon nguồn (icon-1024.b64 — CI tự sinh .ico/.icns/png)
├── desktop/               # app PC/Mac (Tauri 2)
│   └── src-tauri/         # config + Rust
├── .github/workflows/     # CI build installer Win + Mac (không cần sở hữu máy Mac)
├── ROADMAP.md             # lộ trình lên store, thủ tục, rủi ro duyệt — ĐỌC TRƯỚC
└── docs/store-listing.md  # nháp nội dung listing với từ vựng an toàn
```

## Tải bản desktop (khách hàng)

- Windows: `https://github.com/nguyenbathoi88-bit/forely-app/releases/latest/download/Forely-Setup-Windows.exe`
- macOS (Intel + Apple Silicon): `https://github.com/nguyenbathoi88-bit/forely-app/releases/latest/download/Forely-macOS.dmg`

Lưu ý bản chưa ký code: Windows SmartScreen → "More info → Run anyway"; macOS → chuột phải file → Open (hoặc System Settings → Privacy & Security → Open Anyway).

## Android — chạy lần đầu (trên máy Windows dev)

Cài 1 lần: Node.js LTS + Android Studio (kèm SDK, JDK).

```bat
cd D:\Forely\forely-app
npm install
npx cap sync
npx cap open android
```

**Build bản nộp Google Play:** Android Studio → Build → *Generate Signed App Bundle (.aab)* → tạo keystore mới.
⚠ **Keystore = con dấu của app: mất là mất quyền cập nhật vĩnh viễn.** Cất 2 nơi. `.gitignore` đã chặn commit keystore.

## iOS

Cần máy Mac + Xcode (hoặc build qua CI — xem `ROADMAP.md` giai đoạn 2):

```bash
npm install && npx cap add ios && npx cap open ios
```

## Desktop — build qua CI (khuyến nghị)

Gắn tag `desktop-v0.1.1` (hoặc bấm Run workflow trong tab Actions) → CI build cả `.exe` (Windows) lẫn `.dmg` universal (macOS) và đính vào Release. Xem `.github/workflows/desktop.yml`.

Build tay trên Windows: cài Rust (rustup) + VS Build Tools (C++), rồi:

```bat
cd desktop && npm install && npm run dev
```

## Việc phía web (forely-site) đi kèm

App gửi User-Agent chứa `ForelyApp/`. PR #238 (repo forely) thêm cờ `window.FORELY_IS_APP` và ẩn nút "Đăng nhập Google" trong app (Google chặn OAuth trong webview nhúng — đăng nhập email/SĐT hoạt động bình thường).
