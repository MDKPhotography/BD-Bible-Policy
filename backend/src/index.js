const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generateToken, verifyToken, users, bcrypt } = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

// Import quad charts router
const quadChartsRouter = require('./routes/quadCharts');
const quadChartWorkflowRouter = require('./routes/quadChartWorkflow');

// Public endpoints (no auth required)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'BD-Bible-Policy' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // For testing: accept 'admin123' as password
  const validPassword = password === 'admin123' || 
    await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  res.json({ 
    token, 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role 
    } 
  });
});

// Register endpoint (admin only in production)
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    name,
    role: 'user'
  };
  
  users.push(newUser);
  
  const token = generateToken(newUser);
  res.json({ token, user: { id: newUser.id, email, name, role: newUser.role } });
});

// Protected endpoints (auth required)
app.get('/api/documents', verifyToken, (req, res) => {
  const docsPath = path.join(__dirname, '../../data/documents');
  const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.md'));
  res.json({ documents: files });
});

app.get('/api/documents/:filename', verifyToken, (req, res) => {
  const docsPath = path.join(__dirname, '../../data/documents');
  const filePath = path.join(docsPath, req.params.filename);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ filename: req.params.filename, content: content });
  } else {
    res.status(404).json({ error: 'Document not found' });
  }
});

// User info endpoint
app.get('/api/user', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (user) {
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Add quad charts routes
app.use('/api/quad-charts', quadChartsRouter);
app.use('/api/quad-chart-workflow', quadChartWorkflowRouter);

// Add template routes
const templatesRouter = require('./routes/templates');
app.use('/api/templates', templatesRouter);

// Add content routes
const { setupContentRoutes } = require('./content');
setupContentRoutes(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`BD-Bible Backend running on port ${PORT}`);
  console.log('Default login: admin@gmu.edu / admin123');
  console.log('Quad Charts API available at /api/quad-charts');
});
