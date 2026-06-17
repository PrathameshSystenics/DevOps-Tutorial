#!/bin/bash

count=0
num=10

# While loop
while [ $count -le $num ]
do
	echo "Count is $count"
	let count++
done
