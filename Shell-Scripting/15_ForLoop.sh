#!/bin/bash

# Simple For Loop for iterating between number

for i in 1 2 3 4 4
do 
	echo "Number ${i}"
done

# For Loop on String
for name in Raju Alex paul johnny
do 
	echo "Name is ${name}"
done

# For Loop on Range
for num in {1..10}
do
	echo "Number in Range ${num}"
done

# For loop with Arrays
loop_Array=(1 5 6 8 9 "Hello")

for key in ${loop_Array[*]}
do
	echo "Value = $key"
done


