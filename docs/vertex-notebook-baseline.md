# AridInsights Vertex Workbench Notebook - Baseline Queries

This notebook contains baseline queries for analyzing water data in BigQuery.

## Setup

```python
from google.cloud import bigquery
import pandas as pd

# Initialize BigQuery client
client = bigquery.Client(project='aridinsights-platform')
```

## Sample Query: Historical Water Levels

```python
# Query historical water levels
query = """
SELECT 
    date,
    district_name,
    water_level_ft,
    latitude,
    longitude
FROM `aridinsights-platform.water_data.historical_levels`
WHERE date >= '2020-01-01'
ORDER BY date DESC
LIMIT 1000
"""

# Execute query
df = client.query(query).to_dataframe()

# Display results
print(f"Retrieved {len(df)} records")
df.head()
```

## Export to CSV

```python
# Export to CSV for Jira epic
df.to_csv('historical_water_levels.csv', index=False)
print("Exported to historical_water_levels.csv")
```

## Upload to Cloud Storage

```python
from google.cloud import storage

# Initialize storage client
storage_client = storage.Client()
bucket = storage_client.bucket('aridinsights-data')

# Upload file
blob = bucket.blob('exports/historical_water_levels.csv')
blob.upload_from_filename('historical_water_levels.csv')

print(f"Uploaded to gs://aridinsights-data/exports/historical_water_levels.csv")
```

## Geospatial Analysis Example

```python
import geopandas as gpd
from shapely.geometry import Point

# Convert to GeoDataFrame
geometry = [Point(xy) for xy in zip(df['longitude'], df['latitude'])]
gdf = gpd.GeoDataFrame(df, geometry=geometry, crs='EPSG:4326')

# Plot on map
gdf.plot(column='water_level_ft', legend=True, figsize=(15, 10))
```

## Idle Shutdown

To prevent unnecessary costs, this notebook should be stopped when idle. A Cloud Scheduler job runs the `notebook-idle-shutdown.sh` script every hour to check for idle instances.

To manually stop the notebook:
```bash
gcloud notebooks instances stop aridinsights-notebook --location=us-central1-a
```

To restart:
```bash
gcloud notebooks instances start aridinsights-notebook --location=us-central1-a
```
