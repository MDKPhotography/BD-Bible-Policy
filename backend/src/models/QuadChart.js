const fs = require('fs');
const path = require('path');

// Simple file-based storage for quad charts
// This can be replaced with PostgreSQL later

class QuadChart {
  constructor() {
    this.dataFile = path.join(__dirname, '../../data/quadcharts.json');
    this.ensureDataFile();
  }

  ensureDataFile() {
    const dir = path.dirname(this.dataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(this.dataFile, '[]', 'utf8');
    }
  }

  readData() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeData(data) {
    fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2), 'utf8');
  }

  // Create a new quad chart
  create(chartData) {
    const charts = this.readData();
    const newChart = {
      id: Date.now().toString(),
      title: chartData.title || 'Untitled Quad Chart',
      client: chartData.client || '',
      technical_approach: chartData.technical_approach || '',
      management_approach: chartData.management_approach || '',
      past_performance: chartData.past_performance || '',
      cost_schedule: chartData.cost_schedule || '',
      created_by: chartData.created_by || 'system',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    charts.push(newChart);
    this.writeData(charts);
    return newChart;
  }

  // Get all quad charts
  findAll() {
    return this.readData();
  }

  // Get a specific quad chart by ID
  findById(id) {
    const charts = this.readData();
    return charts.find(chart => chart.id === id);
  }

  // Update a quad chart
  update(id, updates) {
    const charts = this.readData();
    const index = charts.findIndex(chart => chart.id === id);

    if (index === -1) {
      return null;
    }

    // Update the chart
    charts[index] = {
      ...charts[index],
      ...updates,
      id: charts[index].id, // Preserve ID
      created_at: charts[index].created_at, // Preserve creation date
      updated_at: new Date().toISOString()
    };

    this.writeData(charts);
    return charts[index];
  }

  // Delete a quad chart
  delete(id) {
    const charts = this.readData();
    const initialLength = charts.length;
    const filtered = charts.filter(chart => chart.id !== id);

    if (filtered.length === initialLength) {
      return false; // Chart not found
    }

    this.writeData(filtered);
    return true;
  }

  // Search quad charts
  search(query) {
    const charts = this.readData();
    const searchTerm = query.toLowerCase();

    return charts.filter(chart => {
      return (
        chart.title.toLowerCase().includes(searchTerm) ||
        chart.client.toLowerCase().includes(searchTerm) ||
        chart.technical_approach.toLowerCase().includes(searchTerm) ||
        chart.management_approach.toLowerCase().includes(searchTerm) ||
        chart.past_performance.toLowerCase().includes(searchTerm) ||
        chart.cost_schedule.toLowerCase().includes(searchTerm)
      );
    });
  }
}

// PostgreSQL version (for when database is ready)
class QuadChartDB {
  static async createTable(pgPool) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS quad_charts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        client VARCHAR(255),
        technical_approach TEXT,
        management_approach TEXT,
        past_performance TEXT,
        cost_schedule TEXT,
        created_by VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await pgPool.query(createTableQuery);
      console.log('QuadChart table created or already exists');
    } catch (error) {
      console.error('Error creating QuadChart table:', error);
    }
  }

  static async create(pgPool, chartData) {
    const query = `
      INSERT INTO quad_charts
      (title, client, technical_approach, management_approach, past_performance, cost_schedule, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      chartData.title,
      chartData.client,
      chartData.technical_approach,
      chartData.management_approach,
      chartData.past_performance,
      chartData.cost_schedule,
      chartData.created_by || 'system'
    ];

    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  static async findAll(pgPool) {
    const query = 'SELECT * FROM quad_charts ORDER BY created_at DESC;';
    const result = await pgPool.query(query);
    return result.rows;
  }

  static async findById(pgPool, id) {
    const query = 'SELECT * FROM quad_charts WHERE id = $1;';
    const result = await pgPool.query(query, [id]);
    return result.rows[0];
  }

  static async update(pgPool, id, updates) {
    const query = `
      UPDATE quad_charts
      SET title = $2, client = $3, technical_approach = $4,
          management_approach = $5, past_performance = $6,
          cost_schedule = $7, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `;

    const values = [
      id,
      updates.title,
      updates.client,
      updates.technical_approach,
      updates.management_approach,
      updates.past_performance,
      updates.cost_schedule
    ];

    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  static async delete(pgPool, id) {
    const query = 'DELETE FROM quad_charts WHERE id = $1 RETURNING id;';
    const result = await pgPool.query(query, [id]);
    return result.rowCount > 0;
  }
}

module.exports = { QuadChart, QuadChartDB };