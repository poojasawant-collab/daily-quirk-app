const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let quirks = [
  { id: 1, text: "Today's vibe: Pretending to understand cryptocurrency while nodding confidently.", category: "humor", createdAt: new Date('2024-01-01').toISOString() },
  { id: 2, text: "Remember: Every expert was once a beginner who refused to give up.", category: "motivation", createdAt: new Date('2024-01-02').toISOString() },
  { id: 3, text: "The best time to plant a tree was 20 years ago. The second best time is now.", category: "wisdom", createdAt: new Date('2024-01-03').toISOString() },
  { id: 4, text: "Coffee: Because adulting is hard and naps are frowned upon at work.", category: "humor", createdAt: new Date('2024-01-04').toISOString() },
  { id: 5, text: "Your comfort zone is a beautiful place, but nothing ever grows there.", category: "motivation", createdAt: new Date('2024-01-05').toISOString() },
  { id: 6, text: "Plot twist: The hokey pokey really IS what it's all about.", category: "humor", createdAt: new Date('2024-01-06').toISOString() },
  { id: 7, text: "Be the energy you want to attract. Unless it's chaotic. Then maybe dial it back.", category: "wisdom", createdAt: new Date('2024-01-07').toISOString() },
  { id: 8, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "motivation", createdAt: new Date('2024-01-08').toISOString() },
  { id: 9, text: "I'm not lazy, I'm on energy-saving mode.", category: "humor", createdAt: new Date('2024-01-09').toISOString() },
  { id: 10, text: "The only way to do great work is to love what you do.", category: "motivation", createdAt: new Date('2024-01-10').toISOString() },
  { id: 11, text: "Life is short. Smile while you still have teeth.", category: "humor", createdAt: new Date('2024-01-11').toISOString() },
  { id: 12, text: "In the middle of difficulty lies opportunity.", category: "wisdom", createdAt: new Date('2024-01-12').toISOString() },
  { id: 13, text: "My bed is a magical place where I suddenly remember everything I forgot to do.", category: "humor", createdAt: new Date('2024-01-13').toISOString() },
  { id: 14, text: "The journey of a thousand miles begins with a single step... and probably a snack.", category: "wisdom", createdAt: new Date('2024-01-14').toISOString() },
  { id: 15, text: "Dream big, work hard, stay focused, and surround yourself with good people.", category: "motivation", createdAt: new Date('2024-01-15').toISOString() }
];

let nextId = 16;

// Helper function to get today's quirk based on date
const getTodaysQuirk = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % quirks.length;
  return quirks[index];
};

// Routes

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET /api/quirks/today - Get today's quirk (must be before /:id route)
app.get('/api/quirks/today', (req, res) => {
  const todaysQuirk = getTodaysQuirk();
  res.json({
    success: true,
    data: todaysQuirk,
    date: new Date().toISOString().split('T')[0]
  });
});

// GET /api/quirks/random - Get a random quirk (must be before /:id route)
app.get('/api/quirks/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quirks.length);
  res.json({
    success: true,
    data: quirks[randomIndex]
  });
});

// GET /api/quirks - Get all quirks
app.get('/api/quirks', (req, res) => {
  const { category } = req.query;
  
  let filteredQuirks = quirks;
  if (category) {
    filteredQuirks = quirks.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }
  
  res.json({
    success: true,
    count: filteredQuirks.length,
    data: filteredQuirks
  });
});

// GET /api/quirks/:id - Get a specific quirk by ID
app.get('/api/quirks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quirk = quirks.find(q => q.id === id);
  
  if (!quirk) {
    return res.status(404).json({
      success: false,
      error: 'Quirk not found'
    });
  }
  
  res.json({
    success: true,
    data: quirk
  });
});

// POST /api/quirks - Create a new quirk
app.post('/api/quirks', (req, res) => {
  const { text, category } = req.body;
  
  // Validation
  if (!text || !category) {
    return res.status(400).json({
      success: false,
      error: 'Please provide both text and category'
    });
  }
  
  const validCategories = ['wisdom', 'humor', 'motivation'];
  if (!validCategories.includes(category.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: `Category must be one of: ${validCategories.join(', ')}`
    });
  }
  
  const newQuirk = {
    id: nextId++,
    text,
    category: category.toLowerCase(),
    createdAt: new Date().toISOString()
  };
  
  quirks.push(newQuirk);
  
  res.status(201).json({
    success: true,
    data: newQuirk
  });
});

// PUT /api/quirks/:id - Update a quirk
app.put('/api/quirks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quirkIndex = quirks.findIndex(q => q.id === id);
  
  if (quirkIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Quirk not found'
    });
  }
  
  const { text, category } = req.body;
  
  if (category) {
    const validCategories = ['wisdom', 'humor', 'motivation'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Category must be one of: ${validCategories.join(', ')}`
      });
    }
  }
  
  quirks[quirkIndex] = {
    ...quirks[quirkIndex],
    text: text || quirks[quirkIndex].text,
    category: category ? category.toLowerCase() : quirks[quirkIndex].category
  };
  
  res.json({
    success: true,
    data: quirks[quirkIndex]
  });
});

// DELETE /api/quirks/:id - Delete a quirk
app.delete('/api/quirks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quirkIndex = quirks.findIndex(q => q.id === id);
  
  if (quirkIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Quirk not found'
    });
  }
  
  const deletedQuirk = quirks.splice(quirkIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedQuirk,
    message: 'Quirk deleted successfully'
  });
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Daily Quirks API server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints available at http://localhost:${PORT}/api/quirks`);
});

module.exports = app;
