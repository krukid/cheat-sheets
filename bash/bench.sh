#!/bin/bash
#
# WARN: apache benchmark (ab) is the better way to bench
#

data() {
	local ts="$(date +%s)_$1"
	local payload
	read -r -d '' payload <<- EOM
		{
			"some_key": "some_value",
			"some_seed": "seed_${ts}",
			"some_array": ["lol", "kek"]
		}
	EOM
	echo $payload
}

for j in {1..3}; do # serial batches
	PIDS=()
	for i in {1..3}; do # parallel jobs
		time curl -d "$(data $i)" -H "content-type: application/json" "http://localhost:3009/api" &
		PIDS+=($!)
	done
	wait $PIDS
done
