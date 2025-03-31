const express = require('express');
const router = express.Router();

// Trang hồ sơ
router.get('/', (req, res) => {
    // TODO: Lấy thông tin người dùng từ database
    const user = {
        hoTen: 'Nguyễn Văn A',
        tenDangNhap: 'nguyenvana',
        email: 'nguyenvana@example.com',
        ngaySinh: '1990-01-01',
        gioiTinh: 'Nam',
        soDienThoai: '0123456789',
        diaChi: 'Hà Nội'
    };
    res.render('profile/index', { 
        title: 'Hồ sơ người dùng',
        user: user
    });
});

// Cập nhật thông tin
router.post('/update', (req, res) => {
    // TODO: Xử lý cập nhật thông tin
    res.redirect('/profile');
});

// Cập nhật ảnh đại diện
router.post('/avatar', (req, res) => {
    // TODO: Xử lý cập nhật ảnh đại diện
    res.redirect('/profile');
});

module.exports = router; 