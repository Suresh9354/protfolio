import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import Skill from '../models/Skill.js';

const router = express.Router();

// Get all skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single skill (public)
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create skill (admin only)
router.post('/', authenticateToken, [
  body('name').notEmpty().trim(),
  body('category').isIn(['Frontend', 'Backend', 'Database', 'Tools', 'Other']),
  body('proficiency').isInt({ min: 0, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skill (admin only)
router.put('/:id', authenticateToken, [
  body('name').optional().notEmpty().trim(),
  body('category').optional().isIn(['Frontend', 'Backend', 'Database', 'Tools', 'Other']),
  body('proficiency').optional().isInt({ min: 0, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete skill (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;



