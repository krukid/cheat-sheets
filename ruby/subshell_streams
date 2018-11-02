# execute a subshell command and print stdout/stderr in realtime

def syscall(cmd, encoding='US-ASCII')
  thread, stdout_string = []
  Open3.popen3(cmd) do |stdin, stdout, stderr, thr|
    thread = thr
    while !(outs = IO.select([stdout, stderr])[0]).all?(&:eof?)
      outs.each do |out|
        is_stdout = out == stdout
        stdany_string = out.gets.force_encoding(encoding)
        stdout_string = stdany_string if is_stdout
        puts "#{is_stdout ? '[stdout]' : '[stderr]'} #{stdany_string}"
      end
    end
  end
  return thread.value, stdout_string && stdout_string.strip
end
