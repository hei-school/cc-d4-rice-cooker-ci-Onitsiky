[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/PHq8Kfj_)

# Ruby implementation of My Rice Cooker

Here you can find the implementation of __My Rice Cooker__ using __Kotlin__.

## Requirements :computer:

On your machine you will have to install and setup java environment. You can refer to this [documentation](https://www.oracle.com/java/technologies/downloads/) for installation.

Also you have to install kotlin by refering to this [doc](https://otfried.org/courses/cs109/project-install.html).

## Installation :hammer_and_wrench:
Clone this repository in your local machine:
```shell
    git clone https://github.com/hei-school/cc-d2-my-rice-cooker-Onitsiky.git
```

Checkout into the __feature/kotlin__ branch:
```shell
    cd cc-d2-my-rice-cooker-Onitsiky/
    git checkout origin/feature/kotlin
```

## Running the application :flight_departure:

Build the application
```shell
    kotlinc MainMenu.kt --include-runtime - MainMenu.jar
```

Run the application
```shell
    kotlin -classpath MainMenu.jar MainMenu
```

## Bug :bug:
When leaving the application, it doesn't directly leave but still loop on the menu. 