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

=======================================
Section 3: Building Components
=======================================

Two important additional features of Angular. How Angular works behind the scenes and a deep dive into TypeScript.

////Adding static files to Angular

Any files that are placed in the assets folder is going to be made directly available to our application

The path is 'assets/file'

////Scoped CSS files
We placed specific styling into:
app.component.css

Global styles into the styles.css file in the src folder

////Components in Angular

Duplicating HTML is a sign that you need to create a new component

Every app has a component called the App component and it is always the most parent component

Each component has its own Component Class, Component Template, Component CSS File adn Spec File

we can use the angular cli to generate a New Component

In order to have a component be visible we have to nest it inside another

The selector in the component decorator declares what name we use to refer to the element

App bootup process

Angular loads up each component class file inspect the selecotr property in the decorator

Angular then takes a look at the html document that got loaded into the browser

<app-root> found angular finds a component with a matching 'selector'

Angular create an instance of that component

Angular turns the instance template into real THML then stickts it into the approot element (the 'host' element)

While inspecting the app's template it sees the app-card element

Angular creates an instance of that component

Angular turns the instances template into real HTML then sticks it into the host element

////Setting Up Input Binding

1 In the parent componet template find where we created the child component

2 Decide on the property name that we want to use to communicate from the parent to the child

3 Add a new binding to the child component specifiying the data that we want to pass down

4 In the child component's class file add an input property this tells the component to expect the parent to provide data

5 In the child component's template file refernece that input property

////Structural directive ngFor

```ts
PARENT ============================

<app-card
  *ngFor="let post of posts"
  [title]="post.title"
  [imageUrl]="post.imageUrl"
  [username]="post.username"
  [content]="post.content"
></app-card>

CHILD =============================

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title = '';
  @Input() imageUrl = '';
  @Input() content = '';
  @Input() username = '';
}
```

Whatever we are iterating over will be a target of the component class. We can also refer to methods.

"\*ngFor="let posts of getPosts()"
so long as the method returns an array

////Host Element Selectors
We can't us app-root selector inside the scoped file

Host element selector is
:host

=======================================
Section 5: Pipes
=======================================

angular.io/api?type=pipe

Functions that format data for use in a template
Only used in a template
Some pipes are built into Angular
We can build our own pipes very easily
Like many other angular features, you don't have to use pipes, but they are recommended

      {{ height | number : "1.1-3" }}

The 1-3 to the right of the decimal is saying,

give me atleast 1 decimal place and at most 3 decimal places.

////JSON pipe is really useful for debugging.

it prints json instead of [object, object]

////Creating custom pipes

we use the angular CLI to generate pipes with:

```
ng generate pipe NAME
```

Miles to Kilometers pipe example

```ts
@Pipe({
	name: 'convert',
})
export class ConvertPipe implements PipeTransform {
	transform(value: any, ...args: unknown[]): unknown {
		if (!value) {
			return ''
		}

		return value * 1.609
	}
}
```

Two interesting things with pipes

Pipes can be used in more places than just the {{}} it can be used in directives however there is a chance that you'll need to wrap it in parens

We can chain pipes!

{{ miles | convert: 'cm' | number: '1.0-2' }}
