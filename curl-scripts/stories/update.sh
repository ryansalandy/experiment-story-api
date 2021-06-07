
API="http://localhost:4741"
URL_PATH="/stories"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "story": {
      "tactic": "'"${TACTIC}"'"
    }
  }'

echo
