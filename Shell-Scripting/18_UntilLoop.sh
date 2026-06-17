#!/bin/bash

counter=10

# Until Loop executing if the condition is false till it becomes true
until [ $counter -eq 0 ]
do
	echo "Counter=$counter"
	((counter--))
done
