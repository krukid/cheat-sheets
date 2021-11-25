# parse json value

jq .foo <<< '{"foo": "bar"}' # get json value at path
jq -r ... # get value as raw data (w/ newline)
jq -j ... # get value as raw data (w/o newline)
