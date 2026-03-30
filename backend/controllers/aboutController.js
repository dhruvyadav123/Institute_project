const About = require('../models/About');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Get about page data
// @route   GET /api/about
// @access  Public
exports.getAboutData = async (req, res) => {
  try {
    let aboutData = await About.findOne({ isActive: true });
    
    if (!aboutData) {
      // Create default data if none exists
      aboutData = await About.create({
        collegeName: 'CollegeName',
        heading: 'CollegeName focuses on quality education, innovation, and shaping future leaders with strong values.',
        mission: 'Our mission is to empower students with skills, confidence, and knowledge to succeed globally.',
        cards: [
          {
            title: 'Campus Life',
            description: 'Clubs, sports, and cultural events for all-round student growth.',
            image: '/uploads/campus-life.jpg',
            category: 'Campus',
            order: 1
          },
          {
            title: 'Modern Labs',
            description: 'Advanced labs and infrastructure for practical learning.',
            image: '/uploads/modern-labs.jpg',
            category: 'Infrastructure',
            order: 2
          },
          {
            title: 'Expert Faculty',
            description: 'Experienced professors and industry professionals.',
            image: '/uploads/faculty.jpg',
            category: 'Academics',
            order: 3
          },
          {
            title: 'Achievements',
            description: 'Awards, alumni success, and academic excellence.',
            image: '/uploads/achievements.jpg',
            category: 'Success',
            order: 4
          }
        ],
        stats: [
          { label: 'Students', value: '5000+', icon: '👨‍🎓' },
          { label: 'Faculty', value: '300+', icon: '👨‍🏫' },
          { label: 'Courses', value: '50+', icon: '📚' },
          { label: 'Placements', value: '95%', icon: '💼' }
        ]
      });
    }
    
    // Sort cards by order
    aboutData.cards.sort((a, b) => a.order - b.order);
    
    res.status(200).json({
      success: true,
      count: aboutData.cards.length,
      data: aboutData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update about page data
// @route   PUT /api/about
// @access  Private/Admin
exports.updateAboutData = async (req, res) => {
  try {
    const { collegeName, heading, mission, cards, stats } = req.body;
    
    let aboutData = await About.findOne({ isActive: true });
    
    if (!aboutData) {
      aboutData = new About();
    }
    
    // Update basic info
    aboutData.collegeName = collegeName || aboutData.collegeName;
    aboutData.heading = heading || aboutData.heading;
    aboutData.mission = mission || aboutData.mission;
    
    // Update cards if provided
    if (cards) {
      aboutData.cards = cards;
    }
    
    // Update stats if provided
    if (stats) {
      aboutData.stats = stats;
    }
    
    aboutData.updatedAt = Date.now();
    
    await aboutData.save();
    
    res.status(200).json({
      success: true,
      data: aboutData,
      message: 'About page updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload image to Cloudinary
// @route   POST /api/about/upload
// @access  Private/Admin
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'about-page',
      transformation: [
        { width: 800, height: 600, crop: 'fill' },
        { quality: 'auto' }
      ]
    });

    // Delete file from server after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    // Clean up file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/about/image/:publicId
// @access  Private/Admin
exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete image'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add new card
// @route   POST /api/about/card
// @access  Private/Admin
exports.addCard = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;
    
    let aboutData = await About.findOne({ isActive: true });
    
    if (!aboutData) {
      aboutData = new About();
    }
    
    const newCard = {
      title: title || 'New Card',
      description: description || 'Card description',
      category: category || 'General',
      image: image || '/uploads/default-card.jpg',
      order: aboutData.cards.length + 1
    };
    
    aboutData.cards.push(newCard);
    await aboutData.save();
    
    res.status(201).json({
      success: true,
      data: newCard,
      message: 'Card added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update single card
// @route   PUT /api/about/card/:cardId
// @access  Private/Admin
exports.updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { title, description, category, image, order } = req.body;
    
    let aboutData = await About.findOne({ isActive: true });
    
    if (!aboutData) {
      return res.status(404).json({
        success: false,
        message: 'About data not found'
      });
    }
    
    const card = aboutData.cards.id(cardId);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }
    
    // Update card fields
    if (title) card.title = title;
    if (description) card.description = description;
    if (category) card.category = category;
    if (image) card.image = image;
    if (order) card.order = order;
    
    await aboutData.save();
    
    res.status(200).json({
      success: true,
      data: card,
      message: 'Card updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete card
// @route   DELETE /api/about/card/:cardId
// @access  Private/Admin
exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    
    let aboutData = await About.findOne({ isActive: true });
    
    if (!aboutData) {
      return res.status(404).json({
        success: false,
        message: 'About data not found'
      });
    }
    
    // Remove card
    aboutData.cards = aboutData.cards.filter(card => card._id.toString() !== cardId);
    
    // Reorder remaining cards
    aboutData.cards.forEach((card, index) => {
      card.order = index + 1;
    });
    
    await aboutData.save();
    
    res.status(200).json({
      success: true,
      message: 'Card deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update statistics
// @route   PUT /api/about/stats
// @access  Private/Admin
exports.updateStats = async (req, res) => {
  try {
    const { stats } = req.body;
    
    let aboutData = await About.findOne({ isActive: true });
    
    if (!aboutData) {
      aboutData = new About();
    }
    
    aboutData.stats = stats;
    await aboutData.save();
    
    res.status(200).json({
      success: true,
      data: aboutData.stats,
      message: 'Statistics updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};