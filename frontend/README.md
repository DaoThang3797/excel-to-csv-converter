# Excel to CSV Converter - Frontend

Ứng dụng web cho phép người dùng chuyển đổi file Excel (.xlsx, .xls) sang định dạng CSV một cách dễ dàng. Được xây dựng bằng Vue.js.

## Tính năng

- Kéo thả file Excel hoặc chọn file từ trình duyệt
- Chuyển đổi file Excel sang CSV
- Tải xuống file CSV
- Giao diện trực quan và thân thiện với người dùng
- Hỗ trợ cả file .xlsx và .xls

## Cài đặt

```bash
# Cài đặt các dependencies
npm install

# Chạy ứng dụng ở môi trường phát triển
npm run dev

# Build ứng dụng cho môi trường sản xuất
npm run build
```

## Công nghệ sử dụng

- Vue.js 3
- Vue Router
- xlsx.js (để xử lý file Excel)
- file-saver.js (để tải xuống file CSV)
- Vite (build tool) 