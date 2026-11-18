const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'gharswaad123';
    const allowedEmails = [
      (process.env.ADMIN_EMAIL || 'saiyamrajput71@gmail.com').toLowerCase(),
      'admin@gharswaad.in',
      'saiyamrajput71@gmail.com',
    ];

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const inputEmail = email.trim().toLowerCase();
    if (allowedEmails.includes(inputEmail) && password === adminPassword) {
      const secret = process.env.JWT_SECRET || 'gharswaad_secret_key_2026';
      const token = jwt.sign(
        { email: inputEmail, role: 'admin' },
        secret,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Admin authenticated successfully',
        token,
        user: { email: inputEmail, role: 'admin', name: 'Kitchen Admin' },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
};

const verify = async (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { login, verify };
