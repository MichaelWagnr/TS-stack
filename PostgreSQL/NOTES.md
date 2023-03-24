==================================
Section 1: SQL Statements
==================================

PostgreSQL

We connect to a PostgreSQL DB with a Client

SQL is used to interact with databases and is supported for Oracle, MS SQL Server, MySQL etc.

Challenges of Postgres

Writing efficient queries to retrieve information
Designing the schema, or structure of the database
Understanding when to use advanced features
Managaing the database in a production environment

Database Design Process

What kind of thing are we storing?
What properites does this thing have?
What type of data does each of those properties contain?

Keywords: Tell the database that we want to do something. Always written out in capital letters. Ex. CREATE TABLE

Identifiers: Tell the database what thing we want to act on. Always written out in lower case letters. Ex. cities

Column Data Types

VARCHAR(50): Variable length character. Text! If we put in a string longer than 50 characters, we'll get an error.

==================================
Section 3: Working with Tables
==================================

What Tables should we make?

Common features ( like authentication , comments, etc ) are frequently built with conventional table names and columns

What tpe of resource exist in your app? Create a separate table for each of these features

Features that seem to indicate a relationship or ownership between two types of resources need to be reflected in our table design

One-to-Many Relationship
ex. A user has many photos
ex. A photo has many comments

Many-to-One Relationship
ex. A photo has one user

In general these two relationships are the inverse of one another.

Two other important relationships:

Many-to-Many Relationship
ex Students have many Classes

One-to-One Relationship
ex. Boats have one Captain

////

////Primary Key
Uniquely identifies an individual row in a table

Each row in every table has one primary key
No other row in the same table can have the same value
99% of the time called 'id'
Either an integer or a UUID
Will never change

////Foreign Key
Identifies a record that a row is associated with

Rows only have this if they belong to another record
Many rows in the same table can have the same foreign key
Name varies, usually called something like 'xyz_id'
Will change if the relationship changes

The 'many' side of the relationship gets the foreign key column

Photos have many comments, comments gets the foreign key column pointing at 'photo'
