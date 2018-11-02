# use a file lock as mutex for async ops;
# call "script.sh &" N times and observe sequential execution

echo "[$$] Started"
(
  flock 9
  echo "[$$] Hello world"
  sleep 10
) 9>/var/lock/testlockfile
echo "[$$] Terminated"
