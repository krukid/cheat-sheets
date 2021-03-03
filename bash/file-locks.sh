# use a file lock as mutex for async ops;
# call "script.sh &" N times and observe sequential execution

# lock code block with subshell
echo "[$$] Started"
(
  flock 9
  echo "[$$] Hello world"
  sleep 10
) 9>/var/lock/testlockfile
echo "[$$] Terminated"


# lock code block without subshell
exec {lock_fd}>/var/lock/promtest || exit 1
flock -w 1 -E 2 $lock_fd

echo EXECUTING EXCLUSIVE CODE...
sleep 2
echo DONE!

flock -u $lock_fd
