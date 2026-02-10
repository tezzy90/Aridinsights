import express from 'express';
import { getBigQueryClient } from '@aridinsights/bigquery-client';

const app = express();
const port = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
  const client = getBigQueryClient();
  // Example BigQuery usage
  res.send('BigQuery research endpoint!');
});

app.listen(port, () => {
  console.log(`Research engine service running on port ${port}`);
});
