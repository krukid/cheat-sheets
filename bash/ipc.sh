# writing temporary file by descriptor (flush)

fn=$(mktemp -p /app/tmp)
exec {fd}>$fn
echo yesss >&$fd
exec {fd}>&-
echo close $fn

# suspending script until external process sends signal (think: pipe to external worker, wait for signal)

echo ":SUSP $$"
echo ":WAIT" && sleep 5 && kill -CONT $$ &
kill -STOP $$
echo ":CONT $$"
echo ":DONE $$"

# keep in mind heavy pipe messaging may need to be flushed

mkfifo /tmp/pipe
...
stdbuf -oL echo ... > /tmp/pipe

# check pidfile (critical section recommended via flock)

if [[ $(cat /tmp/pidfile | xargs ps o comm=) != expected_cmd ]]; then
    pkill -f expected_cmd
    nohup restart_cmd &> /dev/null &
    echo $! > /tmp/pidfile
fi
