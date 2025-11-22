import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import Contact from '../models/Contact.js';

const router = express.Router();

// Submit contact form (public)
router.post('/submit', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contact messages (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read (admin only)
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact message (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

