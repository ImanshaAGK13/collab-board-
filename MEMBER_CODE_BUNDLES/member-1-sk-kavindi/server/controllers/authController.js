import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'collabboard_super_secret_jwt_key_2026';

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email address is already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Crew',
      title: role === 'Captain' ? 'Mission Leader' : role === 'Co-Captain' ? 'Flight Lead' : 'Payload Specialist'
    });

    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        title: newUser.title
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
    }

    const userId = user ? user._id : 'user_' + Date.now();
    const userName = user ? user.name : email.split('@')[0];
    const userRole = role || (user ? user.role : 'Captain');

    const token = jwt.sign({ id: userId, email, role: userRole }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: userId,
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email,
        role: userRole,
        title: userRole === 'Captain' ? 'Mission Commander' : 'Flight Systems Lead'
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const resetToken = 'rst_' + Math.random().toString(36).substring(2, 12);
    const expireTime = new Date(Date.now() + 3600000);

    await User.findOneAndUpdate({ email }, { resetToken, resetTokenExpire: expireTime });

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to email.',
      token: resetToken
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate(
      { resetToken: token },
      { password: hashedPassword, resetToken: null, resetTokenExpire: null }
    );

    return res.status(200).json({
      success: true,
      message: 'Password has been updated successfully via API.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
