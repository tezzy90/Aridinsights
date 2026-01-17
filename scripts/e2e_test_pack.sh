#!/bin/bash
# E2E Test Pack v1
# Usage: ./e2e_test_pack.sh [LOCAL|PROD]
# Default: PROD

ENV=${1:-PROD}

if [ "$ENV" == "LOCAL" ]; then
    URL="http://127.0.0.1:5001/aridinsights-dev/us-east1/createOrder"
    SECRET="df1ab5a86b923d602116338dee0055f8026dc70623b8c60843e72f4d0d6723be" # Local test secret
else
    # Real Secret
    SECRET="df1ab5a86b923d602116338dee0055f8026dc70623b8c60843e72f4d0d6723be"
    URL="https://us-east1-aridinsights-dev.cloudfunctions.net/createOrder"
fi

current_time=$(date +%s)
echo "Running E2E Test Pack v1 at $current_time against $URL"

# Helper function to send request
send_req() {
    local payload=$1
    local name=$2
    local expected_status=$3
    
    echo "---------------------------------------------------"
    echo "TEST: $name"
    
    SIGNATURE=$(echo -n "$payload" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')
    
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$URL" \
         -H "Content-Type: application/json" \
         -H "x-signature: $SIGNATURE" \
         -d "$payload")

    http_body=$(echo "$response" | sed -e 's/HTTP_STATUS:.*//g')
    http_status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

    echo "Response Status: $http_status"
    echo "Response Body: $http_body"

    if [ "$http_status" == "$expected_status" ]; then
        echo "✅ PASS"
    else
        echo "❌ FAIL (Expected $expected_status)"
    fi
}

# Test 1: Happy Path (Address present)
PAYLOAD_1='{
  "lemonSqueezyOrderId": "E2E_HAPPY_'$current_time'",
  "productType": "SCORECARD",
  "email": "tezzy@321work.com",
  "data": { "attributes": {
        "order_number": "E2E_HAPPY_'$current_time'",
        "user_email": "tezzy@321work.com",
        "custom_data": {
            "productType": "SCORECARD",
            "metro": "ORLANDO",
            "address": "123 Water Way, Orlando, FL",
            "it_load_mw_current": 10
        }
  }}
}'
send_req "$PAYLOAD_1" "Happy Path (Address)" "200"

# Test 2: Polygon Path
PAYLOAD_2='{
  "lemonSqueezyOrderId": "E2E_POLY_'$current_time'",
  "productType": "SCORECARD",
  "email": "tezzy@321work.com",
  "data": { "attributes": {
        "order_number": "E2E_POLY_'$current_time'",
        "user_email": "tezzy@321work.com",
        "custom_data": {
            "productType": "SCORECARD",
            "metro": "TAMPA",
            "parcel_polygon_geojson": "{\"type\":\"Polygon\",\"coordinates\":[[[0,0],[0,1],[1,1],[1,0],[0,0]]]}",
            "it_load_mw_current": 5
        }
  }}
}'
send_req "$PAYLOAD_2" "Polygon Path" "200"

# Test 3: Missing Optional Fields (No Address, Yes Polygon)
# Covered by Test 2 essentially, but let's do vice versa or mixed.
# Let's do Missing Address AND Polygon (Fail Case)
PAYLOAD_3='{
  "lemonSqueezyOrderId": "E2E_FAILGEO_'$current_time'",
  "productType": "SCORECARD",
  "email": "tezzy@321work.com",
  "data": { "attributes": {
        "order_number": "E2E_FAILGEO_'$current_time'",
        "user_email": "tezzy@321work.com",
        "custom_data": {
            "metro": "ORLANDO",
            "it_load_mw_current": 5
        }
  }}
}'
send_req "$PAYLOAD_3" "Missing Geo Inputs (Fail Case)" "422"

# Test 4: Missing Required Fields (Missing MW)
PAYLOAD_4='{
  "lemonSqueezyOrderId": "E2E_FAILMW_'$current_time'",
  "productType": "SCORECARD",
  "email": "tezzy@321work.com",
  "data": { "attributes": {
        "order_number": "E2E_FAILMW_'$current_time'",
        "user_email": "tezzy@321work.com",
        "custom_data": {
            "metro": "ORLANDO",
            "address": "123 Test St",
            "it_load_mw_current": 0
        }
  }}
}'
send_req "$PAYLOAD_4" "Missing Required Field (MW)" "422"

# Test 5: Replay Idempotency
echo "---------------------------------------------------"
echo "TEST: Idempotency (Replaying Test 1 Payload)"
send_req "$PAYLOAD_1" "Idempotency Replay 1" "200"
send_req "$PAYLOAD_1" "Idempotency Replay 2" "200"

# Test 6: Concurrency
# We will use & to run in background
echo "---------------------------------------------------"
echo "TEST: Concurrency (5 requests)"
for i in {1..5}; do
   ORDER_ID="E2E_CONCUR_${current_time}_${i}"
   PAYLOAD_C='{
      "lemonSqueezyOrderId": "'$ORDER_ID'",
      "productType": "SCORECARD",
      "email": "tezzy@321work.com",
      "data": { "attributes": {
            "order_number": "'$ORDER_ID'",
            "user_email": "tezzy@321work.com",
            "custom_data": {
                "metro": "ORLANDO",
                "address": "123 Concurrent Way",
                "it_load_mw_current": 10
            }
      }}
   }'
   # Calculate sig per payload
   SIGNATURE_C=$(echo -n "$PAYLOAD_C" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')
   curl -s -o /dev/null -w "%{http_code} " -X POST "$URL" \
         -H "Content-Type: application/json" \
         -H "x-signature: $SIGNATURE_C" \
         -d "$PAYLOAD_C" &
done
wait
echo -e "\nConcurrency batch done."

echo "---------------------------------------------------"
echo "E2E Pack Complete."
