#!/bin/sh

# If the mondrian core does not exist, create it
if [ ! -d "/opt/solr/server/solr/mondrian" ]; then
    # Solr has to be started to be able to create a core and add data
    /opt/solr/bin/solr start
    /opt/solr/bin/solr create_core -c mondrian
    /opt/solr/bin/post -c mondrian /opt/solr/mondrian_json/input.json

    # Stop the background Solr
    /opt/solr/bin/solr stop
fi

# Start Solr in the foreground
/opt/solr/bin/solr start -f
