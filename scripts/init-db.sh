#!/bin/bash

# AridInsights - Cloud SQL Database Setup Script
# This script creates the necessary PostGIS extensions and tables

set -e

echo "Setting up AridInsights database with PostGIS..."

# Enable PostGIS extension
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Enable PostGIS extension
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS postgis_topology;
    
    -- Enable pgvector for AI embeddings
    CREATE EXTENSION IF NOT EXISTS vector;
    
    -- Create water_districts table with geometry
    CREATE TABLE IF NOT EXISTS water_districts (
        district_id SERIAL PRIMARY KEY,
        district_name VARCHAR(255) NOT NULL,
        district_code VARCHAR(50) UNIQUE NOT NULL,
        county VARCHAR(100),
        region VARCHAR(100),
        geom GEOMETRY(MULTIPOLYGON, 4326),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create spatial index on geometry column
    CREATE INDEX IF NOT EXISTS idx_water_districts_geom 
    ON water_districts USING GIST (geom);
    
    -- Create wells table
    CREATE TABLE IF NOT EXISTS wells (
        well_id SERIAL PRIMARY KEY,
        well_number VARCHAR(100) UNIQUE NOT NULL,
        owner_name VARCHAR(255),
        district_id INTEGER REFERENCES water_districts(district_id),
        location GEOMETRY(POINT, 4326),
        depth_feet DECIMAL(10, 2),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create spatial index on well locations
    CREATE INDEX IF NOT EXISTS idx_wells_location 
    ON wells USING GIST (location);
    
    -- Create permits table
    CREATE TABLE IF NOT EXISTS permits (
        permit_id SERIAL PRIMARY KEY,
        permit_number VARCHAR(100) UNIQUE NOT NULL,
        well_id INTEGER REFERENCES wells(well_id),
        district_id INTEGER REFERENCES water_districts(district_id),
        permit_type VARCHAR(100),
        issue_date DATE,
        expiration_date DATE,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create regulations table with vector embeddings
    CREATE TABLE IF NOT EXISTS regulations (
        regulation_id SERIAL PRIMARY KEY,
        district_id INTEGER REFERENCES water_districts(district_id),
        document_name VARCHAR(255),
        document_url TEXT,
        section_title VARCHAR(500),
        section_text TEXT,
        page_number INTEGER,
        embedding vector(768), -- For text embeddings
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create index on embeddings for similarity search
    CREATE INDEX IF NOT EXISTS idx_regulations_embedding 
    ON regulations USING ivfflat (embedding vector_cosine_ops);
    
    -- Create compliance_deadlines table
    CREATE TABLE IF NOT EXISTS compliance_deadlines (
        deadline_id SERIAL PRIMARY KEY,
        district_id INTEGER REFERENCES water_districts(district_id),
        deadline_type VARCHAR(100),
        deadline_date DATE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $POSTGRES_USER;
EOSQL

echo "Database setup complete!"
