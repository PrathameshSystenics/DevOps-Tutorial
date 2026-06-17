#!/bin/bash

Servers="./servers.txt"

# Interating through the server in the txt file
for server in $(cat $Servers)
do
	echo "Performing Operations on Server = ${server}"
done
