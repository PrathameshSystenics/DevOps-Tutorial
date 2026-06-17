#!/bin/bash

# Creating the Function
function sayHello {
	echo "Saying hello"
}

# Calling the Function
sayHello

# Creating the Function using another way
greet(){
	echo "Greeting to You"
}

# Calling the function
greet

# Passing the Argument to the function
read -p "Enter Your Name:" name
read -p "Enter your Age:" age

# Creating the function which contains the argument
greetNewUser(){
	echo "
	-------------------------------
	Welcome 		$1

	To the Programming

		Age: $2
	-------------------------------"
}

# Calling the function and passing the argument
greetNewUser $name $age
