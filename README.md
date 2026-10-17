# Thiết Bị Văn Phòng Bến Dược (Công Ty Kỹ Thuật Bảo Đạt - Mr. Ân)

Website giới thiệu dịch vụ sửa chữa thiết bị văn phòng, máy in, máy photocopy, nạp mực tận nơi và kinh doanh máy in cũ/mới tại Tây Ninh.

---

## 🚀 Hướng Dẫn Đẩy Lên GitHub & Triển Khai Lên Vercel

### Bước 1: Tạo Repository Mới Trên GitHub
1. Đăng nhập vào [GitHub](https://github.com) của bạn.
2. Nhấn nút **New** (Tạo repository mới).
3. Đặt tên Repository, ví dụ: `thiet-bi-van-phong-ben-duoc`.
4. Chọn chế độ **Public** hoặc **Private** tùy ý.
5. **Không** tích chọn "Add a README file" hay ".gitignore" (vì dự án đã có sẵn).
6. Nhấn **Create repository**.
7. Sao chép đường dẫn Git URL (dạng `https://github.com/TÊN_USER/thiet-bi-van-phong-ben-duoc.git`).

---

### Bước 2: Đẩy Mã Nguồn Lên GitHub

Mở Terminal tại thư mục dự án và chạy các lệnh sau:

```bash
# 1. Thêm toàn bộ file vào git (đã loại bỏ node_modules, dist qua .gitignore)
git add .

# 2. Tạo commit đầu tiên
git commit -m "feat: complete benduoc office printer hub website"

# 3. Đổi tên nhánh chính thành main
git branch -M main

# 4. Gắn liên kết tới repository GitHub của bạn (thay bằng URL repository của bạn)
git remote add origin https://github.com/TÊN_USER/thiet-bi-van-phong-ben-duoc.git

# 5. Đẩy code lên GitHub
git push -u origin main
```

> **Mẹo**: Nếu sau này bạn có chỉnh sửa code thêm, chỉ cần chạy 3 lệnh:
> ```bash
> git add .
> git commit -m "cập nhật tính năng..."
> git push
> ```

---

### Bước 3: Triển Khai Miễn Phí Lên Vercel (1-Click Deploy)

1. Truy cập [Vercel](https://vercel.com) và đăng nhập bằng tài khoản **GitHub**.
2. Tại trang Dashboard, nhấn **Add New...** -> chọn **Project**.
3. Danh sách các Repository GitHub của bạn sẽ hiện ra, tìm `thiet-bi-van-phong-ben-duoc` và nhấn **Import**.
4. Vercel sẽ tự động nhận diện cấu hình:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. File `vercel.json` đã được tạo sẵn trong dự án với cấu hình điều hướng SPA (`rewrites`), tối ưu hóa cache tĩnh. Bạn chỉ cần nhấn **Deploy**!
6. Sau khoảng 30 - 45 giây, Vercel sẽ cấp cho bạn một đường link website trực tuyến miễn phí (dạng `https://thiet-bi-van-phong-ben-duoc.vercel.app`).
7. **Tự động cập nhật**: Mỗi khi bạn `git push` mã nguồn mới lên GitHub, Vercel sẽ tự động build lại và cập nhật website ngay lập tức.

---

### Bước 4: Gắn Tên Miền Riêng (Tùy Chọn)
Nếu bạn sở hữu tên miền riêng (ví dụ: `mayintayninh.vn`, `baodatprinter.com`):
1. Vào mục **Settings** -> **Domains** trong dự án Vercel.
2. Nhập tên miền của bạn và làm theo hướng dẫn trỏ bản ghi DNS (CNAME hoặc A record). Vercel sẽ tự động cấp chứng chỉ bảo mật HTTPS SSL miễn phí trọn đời.

---

## 🛠️ Lệnh Phát Triển & Kiểm Tra Nội Bộ (Local Development)

```bash
# Cài đặt thư viện
npm install

# Khởi chạy server phát triển (Port 3000)
npm run dev

# Kiểm tra lỗi Typescript
npm run lint

# Đóng gói xuất bản production
npm run build
```
