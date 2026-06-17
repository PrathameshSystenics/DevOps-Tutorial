#!/bin/bash

# Condition for checking if there is not argument passed. 
if [ $# -eq 0 ]
then
	echo "Kindly Provide at Atleast 2 Argument"
	exit 1
fi

# Accessing the Argument passed from calling script
echo "First Arg=$1"
echo "Second Arg=$2"

echo "No. of Arguments are $#"
echo "All the Argument are $@"

