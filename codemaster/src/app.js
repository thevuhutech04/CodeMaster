require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Flash messages
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/problems', require('./routes/problems'));
app.use('/profile', require('./routes/profile'));
app.use('/leaderboard', require('./routes/leaderboard'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Lỗi',
    error: err
  });
});

const PORT = process.env.PORT || 3000;

// Start server with clickable link
app.listen(PORT, () => {
  console.log(`\n🚀 Server đang chạy tại: \x1b[34mhttp://localhost:${PORT}\x1b[0m\n`);
  console.log('Các đường dẫn:');
  console.log(`- Trang chủ: \x1b[34mhttp://localhost:${PORT}/\x1b[0m`);
  console.log(`- Đăng nhập: \x1b[34mhttp://localhost:${PORT}/auth/login\x1b[0m`);
  console.log(`- Đăng ký: \x1b[34mhttp://localhost:${PORT}/auth/register\x1b[0m`);
  console.log(`- Danh sách bài tập: \x1b[34mhttp://localhost:${PORT}/problems\x1b[0m`);
  console.log(`- Hồ sơ: \x1b[34mhttp://localhost:${PORT}/profile\x1b[0m`);
  console.log(`- Bảng xếp hạng: \x1b[34mhttp://localhost:${PORT}/leaderboard\x1b[0m\n`);
}); 