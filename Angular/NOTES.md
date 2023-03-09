=======================================
Section 1: Welcome! Start Here!
=======================================

File structure:

Component Template
app.component.html

Component Class
app.component.ts

Service
translate.service.ts

Module
app.module.ts

Angular specific syntax:
Code is written in TS tempates are written Angular template syntax.

=======================================
Section 2: Understanding Angular Template Syntax
=======================================

We use the angular CLI to generate an angular app:
ng new project

To start up a program we can use
npm start OR ng serve

npm start behind the scenes will run ng serve

Stopping the server
control C

////Event Binding Syntax

app.component.ts : Component Class contains code to run when imporant events occur like when a user clicks abutton

(click)="onButtonClick()"

Whatever goes inside the double quotes will be evaluated as through it were code. Not a string. This reference will bind the method to the component method. What is surprising is that we don't have to refer to the method as THIS dot Method.

////Property Binding Syntax

[value]="password"

In square brackets we put in the name of the propert we want to set on this element. and whatever is in the string will be evaluated as code. in this case it's the value of the component's password.

Instead of using the value we could jsut as easily call a method that would evaluate and give the same result.

////Interpolation Syntax

{{ }}

You can have parameters of the component object inbetween the double curly braces or evaluate code, call methods. Again without the need of using the THIS keyword.

When we refer to the event object in Angular template syntax we need to use

'$event' DOLLAR SIGN EVENT

Adding third party CSS

NPM install a css library and add an import statement into the styles.css file in the src folder

```css
@import 'bulma/css/bulma.css';
```

////Structural Directives

A lot like conditional rendering in React

There are 3 different kinds of directives, two we'll look at are

Structural Directives Adds or removes HTML elements

Attribute Directives Changes the properties of the HTML element it gets applied to

EX '\*ngIf'

How to deploy an app using now.sh
