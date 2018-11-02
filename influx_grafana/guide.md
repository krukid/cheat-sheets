# Dockerfile

FROM ubuntu:trusty

RUN apt-get update
RUN apt-get install -y wget adduser libfontconfig

RUN wget http://s3.amazonaws.com/influxdb/influxdb_0.12.1-1_amd64.deb
RUN dpkg -i influxdb_0.12.1-1_amd64.deb

RUN wget https://grafanarel.s3.amazonaws.com/builds/grafana_2.6.0_amd64.deb
RUN dpkg -i grafana_2.6.0_amd64.deb

RUN mkdir -p /usr/src/scripts
WORKDIR /usr/src/scripts
ADD . /usr/src/scripts

CMD ["./start.sh"]

Make sure start.sh does not terminate until you want the services to stop.

(see also)
https://github.com/docker-library/official-images/blob/master/library/ubuntu
https://www.vultr.com/docs/installing-influxdb-on-ubuntu-14
https://github.com/tutumcloud/influxdb/blob/master/0.12/Dockerfile

# Running (Upstart)

  service influxdb start
  service grafana-server start

When starting inside a docker container, be sure to expose the following ports:
For influxdb: 8083 (admin), 8086 (api)
For grafana: 3000 (UI)

Be sure to create a db and a user via influxdb admin or manual API queries.
Default grafana login is admin:admin

# Writing

Over HTTP:
curl -i -XPOST 'http://localhost:8086/write?db=server_stats' \
  --data-binary "response_time,host=localhost value=$(((RANDOM%50)+150)) $(date +%s000000000)"

Over UDP in Ubuntu (see also UDP section for setup info):
echo -n "response_time,host=localhost value=300 $(date +%s000000000)" > /dev/udp/localhost/8089

Over UDP with netcat:
echo "response_time,host=inspiron value=300 $(date +%s000000000)" \
  | nc -4u -w1 localhost 8089

https://docs.influxdata.com/influxdb/v0.12/guides/writing_data/

# Querying

https://docs.influxdata.com/influxdb/v0.12/guides/querying_data/

# Dashboard

1. Set up influxdb as your default data source in grafana.
2. Create new dashboard, add row/graph.
3. Write some data as described in the "Writing" section.
4. Select a measurement for graph query, observe results.

# UDP

Enable UDP acceptor for a given database by modifying /etc/influxdb/influxdb.conf

https://docs.influxdata.com/influxdb/v0.12/write_protocols/udp/
