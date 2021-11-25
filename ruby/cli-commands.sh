# http timeout server
ruby -r socket -e 'port = ARGV[0].to_i; time = ARGV[1].to_f; srv = TCPServer.new port; while s = srv.accept; p "o"; sleep time; s.close; p "x"; end' 8099 1.5
