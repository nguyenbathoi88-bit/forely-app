# resources/

- `icon-1024.b64` — base64 của icon gốc PNG 1024×1024 (nền #134e39, chữ trắng),
  lấy từ `08_Brand Assets/Forely_Brand_Navy/forely-icon-1024.png` (bản palette tối ưu 11.6KB).
- CI decode file này rồi chạy `tauri icon` để sinh đủ .ico/.icns/png — repo không cần chứa binary.
- Trên máy dev còn có `icon-1024.png` + `icon-light-1024.png` gốc (không push qua API được).

Đổi icon: thay `icon-1024.b64` (base64 -w0 file.png) hoặc push `icon-1024.png` từ máy dev
rồi chạy `npm run icon` trong `desktop/`.

Icon + splash cho Android đã nằm sẵn trong `android/` trên máy dev (sinh bằng PIL, màu #134e39).
