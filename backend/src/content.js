const fs = require('fs').promises;
const path = require('path');

const setupContentRoutes = (app) => {
  // List documents endpoint
  app.get('/api/content/documentation', async (req, res) => {
    try {
      const dirPath = path.join(__dirname, '../data/content/documentation');
      
      try {
        const files = await fs.readdir(dirPath);
        const content = files
          .filter(f => f.endsWith('.md'))
          .map(file => ({
            slug: file.replace('.md', ''),
            title: file.replace('.md', '').replace(/-/g, ' ').replace(/_/g, ' '),
            type: 'documentation'
          }));
        
        res.json(content);
      } catch (err) {
        console.log('Directory not found, returning empty array');
        res.json([]);
      }
    } catch (error) {
      console.error('Error:', error);
      res.json([]);
    }
  });

  // Get specific document
  app.get('/api/content/documentation/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const filePath = path.join(__dirname, '../data/content/documentation', `${slug}.md`);
      
      const content = await fs.readFile(filePath, 'utf-8');
      res.json({ 
        content: content,
        slug: slug,
        type: 'documentation'
      });
    } catch (error) {
      res.status(404).json({ error: 'Document not found' });
    }
  });
};

module.exports = { setupContentRoutes };
