## Tracing all HTTP traffic on host network

    docker run --net=host corfr/tcpdump -s 0 -A -vv '(((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0) and port 3000' -i any
