#!/bin/bash
# Test Create Order Webhook
# Usage: ./test_webhook.sh [LOCAL|PROD]
# Default: PROD

ENV=${1:-PROD}

if [ "$ENV" == "LOCAL" ]; then
    URL="http://127.0.0.1:5001/aridinsights-dev/us-east1/createOrder"
    SECRET="df1ab5a86b923d602116338dee0055f8026dc70623b8c60843e72f4d0d6723be" # Use a test secret for local if env var set
else
    # Real Secret
    SECRET="df1ab5a86b923d602116338dee0055f8026dc70623b8c60843e72f4d0d6723be" 
    URL="https://us-east1-aridinsights-dev.cloudfunctions.net/createOrder"
fi

# Sample Payload
PAYLOAD='{
  "lemonSqueezyOrderId": "TEST_ORDER_999",
  "productType": "SCORECARD",
  "email": "tezzy@321work.com",
  "inputs": {
    "metro": "ORLANDO",
    "it_load_mw_current": 10,
    "cooling_profile": "Standard"
  },
  "data": {
    "attributes": {
        "order_number": 999123,
        "user_email": "tezzy@321work.com",
        "custom_data": {
            "productType": "SCORECARD",
            "metro": "ORLANDO",
            "it_load_mw_current": 15
        }
    }
  }
}'

# Calculate Signature
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')

echo "Sending to $URL..."
echo "Signature: $SIGNATURE"

curl -X POST "$URL" \
     -H "Content-Type: application/json" \
     -H "x-signature: $SIGNATURE" \
     -d "$PAYLOAD"

echo -e "\nDone."
