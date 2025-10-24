const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'ep-odd-sunset-aggu808m-pooler.c-2.eu-central-1.aws.neon.tech',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'Cravex',
  user: process.env.POSTGRES_USER || 'neondb_owner',
  password: process.env.POSTGRES_PASSWORD || 'npg_p5kvxZrC4tOd',
  ssl: { rejectUnauthorized: false }
});

// Get all chat messages
app.get('/api/messages', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.from) || 0;
    const roomId = req.query.room_id;
    const sender = req.query.sender;

    let query = `
      SELECT 
        e.event_id as id,
        e.room_id,
        e.sender,
        e.origin_server_ts as timestamp,
        e.type,
        e.content::text as content_raw
      FROM events e
      WHERE e.type = 'm.room.message'
    `;

    const queryParams = [];
    let paramIndex = 1;

    if (roomId) {
      query += ` AND e.room_id = $${paramIndex}`;
      queryParams.push(roomId);
      paramIndex++;
    }

    if (sender) {
      query += ` AND e.sender LIKE $${paramIndex}`;
      queryParams.push(`%${sender}%`);
      paramIndex++;
    }

    query += ` ORDER BY e.origin_server_ts DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    // Get total count
    let countQuery = "SELECT COUNT(*) FROM events WHERE type = 'm.room.message'";
    const countParams = [];
    let countParamIndex = 1;

    if (roomId) {
      countQuery += ` AND room_id = $${countParamIndex}`;
      countParams.push(roomId);
      countParamIndex++;
    }

    if (sender) {
      countQuery += ` AND sender LIKE $${countParamIndex}`;
      countParams.push(`%${sender}%`);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    // Parse content JSON
    const messages = result.rows.map(row => {
      let content = {};
      try {
        if (row.content_raw) {
          content = JSON.parse(row.content_raw);
        }
      } catch (e) {
        content = { body: String(row.content_raw || '') };
      }

      return {
        id: row.id,
        event_id: row.id,
        room_id: row.room_id,
        sender: row.sender,
        timestamp: parseInt(row.timestamp) || Date.now(),
        type: row.type,
        body: (content && content.body) || '',
        msgtype: (content && content.msgtype) || 'm.text'
      };
    });

    res.json({
      data: messages,
      total: total
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8009;
app.listen(PORT, () => {
  console.log(`Chat History API running on port ${PORT}`);
});

