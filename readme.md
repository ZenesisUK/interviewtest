# interviewtest

This is the a basic application for interviewees to extend and modify in order to show off their skills.
It is an application written using the Qooxdoo framework (https://qooxdoo.org/).

## Getting Started

To get you started, this repo contains a small application, start by looing at `interviewtest.Application` and
you'll see that it loads/initialises the database, creates a toolbar with some helpful buttons. Below the toolbar
is space for your widgets (eg a list of meetings).

Check out this repository (if you fork it, make sure you do not fork in into a public repo because your
fellow interviewees will be able to see your work!).

If you have not already done so, install Qooxdoo:

```
$ npm install -g @qooxdoo/framework
```

In the directory where you have checked out the app, run:

```
$ qx serve
```

and browse to http://localhost:8080

## Tasks

Your task is to create a small application which acts like a calendar booking app, where the user can book
meetings for one or more users on a particular date and time, and in a particular meeting room.

Some meeting rooms are smaller than others - they each have a `maxPeople` property, which says how many people
can be accomodated in that room in one meeting; you should not allow the user to book a meeting room which is too
small for the number of people attending.

### First Task - the database

The database currently only supports people `interviewtest.db.Person` and rooms `interviewtest.db.Room` - you will
need to save the meetings, so you will probably have to create a new class, perhaps called `interviewtest.db.Meeting`
and add it to the database. Look at the code for `Person` and `Room` and you should be able to see how to make your
new class save and load with the rest of the database.

`Person`, `Room` etc save and load to localStorage, so it's pure JSON only. You cannot store Qooxdoo objects in the
localStorage. This means that if your new `Meeting` class (if thats what you chose to call it) has references to Person
or Room classes, you will need to store some identifier instead of the actual object.

Hint: Qooxdoo objects have a UUID.

### Second Task - the User Interface

Below the toolbar is a big blank space; you should show all future meetings in a list, and allow the user to be
add, edit, and delete meetings. Each meeting can have one or more people, exactly one room, have a date, a start time,
and a duration or end time. It should not be possible to schedule overlapping meetings in the same room.

### Third Task - Database Admin

Create a simple user interface that allows people and rooms to be created, edited and deleted. When the people and rooms
are created, they should show up in the user interface without requiring a refresh of the page

## Coding tips

Data Binding is an important and very helpful feature of Qooxdoo - you can see examples of it in action here:
https://qooxdoo.org/qxl.demobrowser/#data~ListController.html and documentation for it here:
https://qooxdoo.org/documentation/v7.2/#/core/data_binding/

Data Binding also backs the form validation, which has example here: https://qooxdoo.org/qxl.demobrowser/#data~Form.html
