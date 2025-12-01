import { Pool } from 'pg';

// Initialize connection pool
// In production (Cloud Run), these environment variables will be set automatically
// if you use the Cloud SQL Auth Proxy or Cloud Run's native Cloud SQL integration.
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, // e.g., '/cloudsql/project:region:instance' for Unix socket
    database: process.env.DB_NAME,
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
};

// Example PostGIS query function
export const findDistrictForWell = async (lat: number, lng: number) => {
    const queryText = `
    SELECT district_name, district_id 
    FROM water_districts 
    WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326));
  `;
    const res = await query(queryText, [lng, lat]);
    return res.rows[0];
};
