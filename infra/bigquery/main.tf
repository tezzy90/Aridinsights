resource "google_bigquery_dataset" "research" {
  dataset_id    = "research"
  friendly_name = "Shared Research Engine"
  description   = "Shared research data for all Arid Insights apps"
  location      = "US"
}

resource "google_bigquery_table" "research_results" {
  dataset_id = google_bigquery_dataset.research.dataset_id
  table_id   = "research_results"
}