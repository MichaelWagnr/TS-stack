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

=======================================
Section 6: Directives in Angular
=======================================

Directives can be used to modify the structure or properties of HTML elements.

Used only in a template

Some built into Angular

We can build them on our own too!

We can only apply one ng structural directive to one element

<ng-container> is like a react fragment wherein we can wrap something that has a structural directive in an ng container and put aditional structural directives on to the ng-container

////NG switch

```html
<div [ngSwitch]="currentPage">
	<div *ngSwitchCase="0">Current Page is zero</div>
	<div *ngSwitchCase="3">Current Page is 3</div>
	<div *ngSwitchDefault>Unknown Current Page</div>
</div>
```

If you have multiple matching statements they will all be displayed

////Generating Custom Directives

We again use the angular CLI

`ng generate directive NAME`

```ts
import { Directive, ElementRef } from '@angular/core'

@Directive({
	selector: '[appClass]',
})
export class ClassDirective {
	constructor(private element: ElementRef) {
		this.element.nativeElement.style.backgroundColor = 'orange'
	}
}
```

This is very similar to React's useRef hook. I believe that the decorator @Directive has access to the element's type 'ElementRef' and is doing some magic behind the scenes.

Similarly to react having elementRef.current we need to use element.nativeElement when dealing with a ref

We can then use the name in the 'selector' of the decorator without \*

////Intercepting a property assignment

```ts
class Car {
	set color(newColor: string) {}
}

const car = new Car()
car.color = 'blue'
```

```ts
import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
	selector: '[appClass]',
})
export class ClassDirective {
	constructor(private element: ElementRef) {}

	@Input() set backgroundColor(color: string) {
		this.element.nativeElement.style.backgroundColor = color
	}
}
```

////Input Aliasing

We want to be able to use the directive name as a property directive without having to 'call' it first like
<element customDirective [property]="argument">

We can accomplish this two ways;

We can name the property the same name as the the custom directive.

Or we can pass the directive name as an argument into the decorator that precedes the property

```ts
  @Input('appClass') set backgroundColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
```

The later makes more sense in order to maintain a naming convention that is explanatory

=======================================
Section 7: The Module System
=======================================

Module system inside of Angular is an optional way of organizing our components.

5 types of modules:

Domain - wraps up all the components needed to implement on single feature

Routed - Same as a Domain module, but these components are tied to routes only displayed when the suer is at some particular address

Routing - Defines routing rules

Service - Defines services that will be used in multiple parts of the app

Widget - Defines some reusable components that will be used in multiple other modules.

////Generating Modules

we can again use the ng CLI
ng generate module MODULE_NAME --routing
ng g m MODULE_NAME --routing

'Routing' flag tells Angular to make this module ready for navigation

The routing.module.ts defines routing rules

////Importing and Exporting Modules

Generating a component with CLI in a module

ng g component MODULE/NAME

Step 1 EXPORT

Go into the Module file and add the component into the exports array of the NgModule Decorator

```ts
@NgModule({
	declarations: [ElementsHomeComponent],
	imports: [CommonModule, ElementsRoutingModule],
	exports: [ElementsHomeComponent], // ADD EXPORT
})
export class ElementsModule {}
```

Step 2 IMPORT

Import using ESModule import statement the Module file wherein we added the component into the config array.

Add the MODULE into the imports of the module you want to have access to said module and it's components by proxy.

```ts
import { ElementsModule } from './elements/elements.module'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, ElementsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
```

Modules directive

declarations - List of components, pipes, directives that are created in this module

imports - List of other modules that this module depends upon

exports - List of components, pipes, directives that this module makes available to other modules

providers - Old way of connecting modules and services

bootstrap - Used by the AppModule only to declare what component will be displayed first

=======================================
Section 8: Routing and Navigation
=======================================

When routing, we no longer need to export the component because whether or not it is visible will be handled by the routing component file instead of hardcoding it as a component element in a parents html template file.

Adding an route is accomplished in two steps

step 1: importing the Component into the routing file
step 2: adding an object to the routes array

```ts
	{
		path: 'elements',
		component: ElementsHomeComponent
	}
```

Routing file:

```ts
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ElementsHomeComponent } from './elements-home/elements-home.component'

const routes: Routes = [{ path: 'elements', component: ElementsHomeComponent }]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ElementsRoutingModule {}
;``
```

////Navigating with RouterLink

we use the attribute routerLink in place of HREF in an anchor tag.

=======================================
Section 9: Lazy Loading with Modules
=======================================

With eager loading the Angular Development Server sends all of the modules when we hit the home route.

Implenting Lazy loading in 4 steps:

Choose which modules should be lazy loaded

For each of those modules, remove any import statmenet for those modules from anywhere else in your project

In the AppRoutingModule, define a Route in the 'routes' array to specify when to load up that module

```ts
const routes: Routes = [
	{
		path: 'elements',
		loadChildren: () =>
			import('./elements/elements.module').then((m) => m.ElementsModule),
	},
	{ path: '', component: HomeComponent },
	{ path: '**', component: NotFoundComponent },
]
```

In your lazy loaded module's Routing file, edit the 'path' of each route to be relative to the path you specifed in the 'AppRoutingModule'

////Widget modules

Typically we make a generic module called the 'shared module' and keep out universal widget modules in that module.

ngContent is pretty similar to React children

```html
<h1>
	<ng-content></ng-content>
</h1>

<!-- same as  -->

<h1>{ React.Children }</h1>
```

We can use multiple elements with ng-content using the select attribute

```html
<div class="ui placeholder segment">
	<div class="ui icon header">
		<ng-content select="header"></ng-content>
	</div>
	<ng-content></ng-content>
</div>

<!-- used with: -->

<app-segment>
	<header>
		<i class="pdf file outline icon"> </i>
		No documents are listed for this customer
	</header>

	<button class="ui primary button">Add document</button>
</app-segment>
```

How to deal with empty or commented out components to avoid margin

```css
div.ui.icon.header:empty {
	display: none;
}
```

=======================================
Section 10: Advanced Component Routing
=======================================

////Handling exact routes

```html
<a
	class="item"
	[routerLink]="['./']"
	routerLinkActive="active"
	[routerLinkActiveOptions]="{ exact: true }"
	>Biography</a
>
```

=======================================
Section 11: Advanced Component Reusability + Hooks
=======================================

LifeCycle Hooks

ngOnInit -> onMount
ngOnDestroy -> onUnMount
ngOnChanges -> onChange

////Handling events from child to parent.

```ts
CHILD ---------

import { Component, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
	...
})
export class ModalComponent {
  @Output() close = new EventEmitter();

  onCloseClick() {
    this.close.emit();
  }
}

PARENT --------

<app-modal (close)="onClick()" *ngIf="modalOpen"></app-modal>
```

We use the Output decorator and a property that points to a new instance of EventEmitter
The name of the property can be anything. It's similar in nature to a refElement, where we can name the ref something specific but have it point to an element. We name an EventEmitter something specific and reference it on the parent element.

=======================================
Section 12: A TypeScript Overview
=======================================

When using the Propert Assignment Shortcut where we declare public and private variables in the constructor we don't have to assign them in the body of the constructor function.

public/private are modifiers
get/set are accessors

part 161. Decorators!

Plain functions
Called when the file first gets executed, not when an instance of the class is created
Can be applied to a class, a property, a method, an accessor, or an argument of a method
Receives different arguments depending on where it gets used
Can be a plain decorator or a decorator factory
Used to mess around with the internals of the class in clever ways

The difference between a Decorator and Decorator factory is a Decorator Factory has parens and has to return another function

Class Generic example:

```ts
class ValueHolder<TypeForValueProperty> {
	value: TypeForValueProperty
}

const numberHolder = new ValueHolder<number>()
```

Function Generic example:

```ts
const valueWrapper = <T>(value: T): T[] => {
	return [value]
}

valueWrapper<number>(10)
```

In general we can lean on type inference when using generic functions

=======================================
Section 13: Handling Data and HTTP Req
=======================================

App goals:
Figure out how to fetch data from an outside API
learn more about communicating between components
leverage TS to catch errors during development
learn about Angular app security

////Services
To generate a service we use _drumroll_ Angular CLI

```
ng g service NAME
```

Name is seemingly lowercase

https://en.wikipedia.org/w/api.php?
action=query&
format=json&
list=search&
utf8=1&
srsearch=space

Services
Used to fetch/store/update any kind of data in our app
Almost always where we are going to put network requests
data flows from a service to a component
services are implemented as classes
Angular will automatically create a single instance of each service for us

////Accessing Services

```ts
import { Component } from '@angular/core'
import { WikipediaService } from './wikipedia.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	constructor(private wikipedia: WikipediaService) {}

	onTerm(term: string) {
		const results = this.wikipedia.search(term)
		console.log(results)
	}
}
```

We're saying 'wikipedia' will be added as a 'private' property atuomatically to the instance of the App component

'wikipedia' will be of type 'Instance of WikipediaService'

176 - 179 DEPENDENCY INJECTION

Dependency Injection
Components, services , and other things in Angular 'ask' for dependencies, rather than creating them directly
Components need other things to work correctly. Our components could create an instance of those things themselves. Instead, we create them separately and pass them in to the constructor
The 'automatic' nature of DI is not strictly required - we could do this all manually by hand
The goal is to make testing easier
Theoretically makes code reuse and code changes easier, but maybe not happen a lot.

////Making HTTP requests inside angular

```ts
APP MODULE FILE ---------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
IMPORT
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageListComponent } from './page-list/page-list.component';

ADD TO IMPORTS ARRAY AFTER BROWSER MODULE
@NgModule({
  declarations: [AppComponent, SearchBarComponent, PageListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

SERVICE -----------------------------------------

import { Injectable } from '@angular/core';
IMPORT
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  constructor(private http: HttpClient) {}

    search(term: string) {
    return this.http.get('https://en.wikipedia.org/w/api.php?', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*',
      },
    });
  }
}

COMPONENT THAT CONSUMES SERVICE -----------------

import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private wikipedia: WikipediaService) {}

  onTerm(term: string) {
    this.wikipedia.search(term).subscribe((response) => {
      console.log(response);
    });
  }
}

```

=======================================
Section 14: App Security in Angular
=======================================

Angular can automatically escape HTML for us.

```html
<td [innerHTML]="page.snippet"></td>
```

Angular can also purify HTML for us when we intentionally put it as a [] attribute

=======================================
Section 15: RxJs From the Fundamentals
=======================================

rxjs - Functional reactive programming library

Separate library from Angular
Used extensively by Angular for managing data
We use this instead of promises or async/await for handling async stuff
Not strictly required! We can use promises and async/await

RxJs makes building some kinds of features really really easy compared to writing normal code

Hard. Probably the hardest thing in the world of JS, period.
If you can get a good grasp of RXJS, all of angular is at your fingertips.

OBSERVABLE emmits events that go through a PIPE that consists of various OPERATORS that process the value. If we encounter an error we exit early and otherwise we proceed, this last step is referred to as the OBSERVER.

////Creating an observable

out.stegrider.now.sh
Tool to play around with and visualize RxJs

```js
const { fromEvent } = Rx

const input = document.createElement('input')
const container = document.querySelector('.container')

container.appendChild(input)

const observable = fromEvent(input, 'input')

// This line is only necessary in the REPL
observable
```

observable is sort of like an event listener

////Operators

Functions that do some specific processing on the incoming value
We chain together operators to build up a processing pipeline
75% of RxJs dis memorizing the different operators
There are some very generic operators and some very specific ones
For any given problem, you will probably decide to use on operator, then later realize you could have more easily used another
Almost all documentation around operators is awful
Recommendation: take a look at exactly what value is coming out of your observable, then figure out what operators you need to implement you app.

////Adding an Observer

```js
observable.subscribe({
	next(value) {
		console.log(`Your value is ${value}`)
	},
	error(err) {
		console.error('Oops', err.message)
	},
})
```

Major Operator Groups

Transform - Take in a value, do some processing, return a new value
Filtering - Modifies the flow of events in a pipe (group them together, pause them, delete them)
Creation - Creates a new observable

////Low Level Observables

```js
const { Observable } = Rx

const observable = new Observable((subscriber) => {
	// Throw the value 1 into our pipeline
	subscriber.next(1)

	// Marks this observable as complete, no more values will come out
	subscriber.complete()

	// Emit an error, no more values will come out
	subscriber.error(new Error('Error'))
}).pipe()

observable.subscribe({
	next(value) {
		console.log('Got a value', value)
	},
	complete() {
		console.log('Observable is complete. Dont expect any more values')
	},
	error(err) {
		console.log('Oops, ', err.message)
	},
})

// ONLY HERE because this tool requires it
observable
```

////Alternative Observer Syntax

```js
observable.subscribe(
	(value) => console.log('Next value:', value),
	(err) => console.error('BAD THING!!!', err.message),
	() => console.log('COMPLETE!')
)
```

Hot vs Cold
Multicast vs Unicast

=======================================
Section 16: Bonus - TS + RxJs
=======================================

When we make a get request using the build in HttpClient in Angular it returns an observable.

Example of using a pipe appended to the end of an http request which is afterall returning an observable.

We can also pass a custom interface into the http request so that TS can intelligently assess what is coming as a response and how the operators are effecting it.

It will also catch errors anywhere where a component is consuming/subscribing to this observable.

Presumably we could have a service that makes http requests and consume them via dependency injection in multiple components. Mimicking http requests made in Context in React.

```ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

interface WikipediaResponse {
	query: {
		search: {
			title: string
			snippet: string
			pageid: number
		}[]
	}
}
@Injectable({
	providedIn: 'root',
})
export class WikipediaService {
	constructor(private http: HttpClient) {}

	search(term: string) {
		return this.http
			.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php?', {
				params: {
					action: 'query',
					format: 'json',
					list: 'search',
					utf8: '1',
					srsearch: term,
					origin: '*',
				},
			})
			.pipe(map((res) => res.query.search))
	}
}
```

=======================================
Section 18: Credit Card Payments with Reactive Forms
=======================================

Two ways of making forms in Angular:

Reactive Forms - a little more common

Most of the form logic is driven by configuration in a component calss file
More appropriate for complex forms
Exposes some aspects of the form to us as RxJs Observalbes
We have to wrie up the 'ReactiveFormsModule' to our App Module to use them!

Template Forms

Most of the form logic is driven by config in our component template file
More appropriate for simple forms
Harder to deal with dynamic forms (adding/removing form elements)
We have to wire up the 'FormsMOdule' to our App Module to use them!

Step 1: we need to import the module and import it into our App module

```ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
```

Form component

```ts
COMPONENT ---------------------------------------
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent {
  cardForm = new FormGroup({
    name: new FormControl(''),
  });
}

TEMPLATE ----------------------------------------
<form [formGroup]="cardForm">
  <input formControlName="name" />
</form>

//For debugging purposes
<div>Form Contents: {{ cardForm.value | json }}</div>
<div>Form is valid: {{ cardForm.valid }}</div>
```

Validation

We import Validators into our class component and add an array as a second argument to FormControl:

````ts
 cardForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
	```

	We can click on Validators to go to the type declaration file and see all of the different validators available.
````

valid - Angular has validated whatever the user entered successfully
invalid - The value in th einput is invalid
pending - Validation is currently running on this field
disabled - Ignore user input on this field and don't validate it
touched - User clicked into then out of a field
untouched - User hasn't clicked into then out of this field
pristine - User hasn't clicked on this field at all
dirty - User has changed the value of this field

////Hijacking Form Control Values

```ts
import { FormControl } from '@angular/forms'

export class DateFormControl extends FormControl {
	setValue(value: string, options: any) {
		console.log(value)
		super.setValue(value, options)
	}
}
```

We import FormControl and create a class that extends it so that we can overwrite some of the functionality.

Input masking is the act of taking the input of a user and modifying it.

We can accomplish this with Libraries, albeit with some drawbacks.

ngx-mask is a good example of a masking library.

The data behind the scenes does not receive the same formatting as what is shown to the user when using a masking library.

=======================================
Section 19: Simple Data Entry with Template Forms
=======================================

Again like Reactive Forms, we need to import and include the FormModule into the App module component

A lot of logic will be in the component template file

```ts
COMPONENT ---------------------------------------
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  email: string;
}

TEMPLATE ----------------------------------------
<form #emailForm="ngForm">
  <input name="email" [(ngModel)]="email" />

  {{ emailForm.valid }}
  {{ email }}
</form>

<div>Is form valid: {{ emailForm.valid }}</div>
<div>Form values: {{ emailForm.value | json }}</div>

```

////Two way binding syntax

When we write out [(ngMOdel)] it's as though we were using (input) and [value] at the same time, it creates a two way bind between our component and the user. Similar in fashion to having a controlled input in React.

=======================================
Section 21: Custom Validators
=======================================

When we create a validator that needs to make a request or take some time to validate we refer to it as an async validator vs. synchronous validators that can be validated instantly ex. checking the length of an inputted text vs. making a call to a server to see if a username is already in use.

```ts
import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
	authForm = new FormGroup({
		username: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(20),
			Validators.pattern(/^[a-z0-9]+$/i),
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(4),
			Validators.maxLength(20),
		]),
		passwordConfirmation: new FormControl('', [
			Validators.required,
			Validators.minLength(4),
			Validators.maxLength(20),
		]),
	})
}
```

Another example of Reactive forms in Angular. Broken down into steps

1 We import FormGroup, FormControl and Validators from @angular/forms

2 We create a property on our component class that references the entire form

3 We then instantiate a new FormGroup() and pass an object of all the inputs that will make up our form

4 The Object is a key value pair where key is the name of the input and value is a new FormControl() where the arguments is the initial value, and an array of validators.
Validators is an object with a number of static methods that will be used to validate an input

```html
<h3>Create an Account</h3>
<form class="ui form" [formGroup]="authForm">
	<div class="field">
		<label>Username</label><input formControlName="username" />
	</div>
	{{ authForm.get("username")!.errors | json }}
	<div class="field">
		<label>Password</label><input formControlName="password" />
	</div>
	{{ authForm.get("password")!.errors | json }}
	<div class="field">
		<label>Password Confirmation</label
		><input formControlName="passwordConfirmation" />
	</div>
	{{ authForm.get("passwordConfirmation")!.errors | json }}

	<button class="ui submit button primary">Submit</button>
</form>
```

5 In our component template html file we make reference to FormGroup and FormControls

6 We create a form and use attribute binding to reference the FormGroup
[formGroup]="NAME_OF_FORM_GROUP"

7 We then reference each controlled input in our component with the attribute formControlName="FORM_CONTROL_NAME"

////Custom Validator

We will implement a validator that checks that password and passwordConfirmation match

And a second that will check if a username already exists on the server

The steps to making a Class-Based Custom Sync Validator

Create a new class to implement your custom validator
[Optional] Have the class implement the 'Validator' interface
Add a 'validate' mehtod to the class, which will be called witha FormGroup of FormControl
Validator method should return 'null' if everything is OK, or an object if something is wrong

```ts
import { FormGroup, Validator } from '@angular/forms'

export class MatchPassword implements Validator {
	validate(formGroup: FormGroup) {
		// RETURN NULL IF OK
		// RETURN {} IF THERE IS AN ERROR
		// return { passwordsDontMatch: true };
	}
}
```

We can pass FormControl, FormGroup or AbstractControl into the validate method of our ucstom class validator. Depending on what we want to validate.

We use implements Validator, to make sure that our custom validator matches what Angular expects out of a Validator, thanks TS.

Class-based Custom Async Validator

Create a new class to implement your custom validator
Option, Have the class implement the 'AsyncValidator' interface
Add a 'validate' method to the class, which will be called with a FormGroup or FormControl
Validator method should return an Observable that will emit 'null' if everything is OK or an object if something is wrong.

```ts
username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/i),
        ],
        [this.uniqueUsername.validate as AsyncValidatorFn]
      ),
```

We place asynchronous validators in an array as the the 3rd argument to our formcontrol. Angular will prioritize synchronous validators over asynchronous validators. So the async validator won't run until the others have passed.

=======================================
Section 22: Handling Authentication
=======================================

Requirements of the SignIn Observable

We must be able to get it to emit a new value 'from the outside'
We must be able to give it a default, or starting, value
New subscribers must be given the value from it immediately after subscribing

We want to implement a tool named BehaviorSubject

Naming convention for observables: adding a $-sign to the end of the variable name.

```ts
import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from './auth/auth.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	// signedin = false;
	signedin$: BehaviorSubject<boolean>

	constructor(private authService: AuthService) {
		this.signedin$ = this.authService.signedin$
	}

	// ngOnInit() {
	//   this.authService.signedin$.subscribe((signedin) => {
	//     this.signedin = signedin;
	//   });
	// }
}
```

Two different ways of consuming a behavior subject. Commented out version vs referencing the Observable directly. There may be a preference to have the commented out version because then we do not need to pass our value through an async pipe in our template file.

The default behavior to the HttpClient is to discard any cookies.

````ts
  checkAuth() {
    return this.http
      .get(this.rootUrl + '/auth/signedin', { withCredentials: true })
      .pipe(tap((response) => console.log(response)));
  }
	```

	The way we can work around this is by passing an options object as another argument with withCredentials: true

````

////HTTP Interceptors

Works very similarly to express middleware function.

```ts
import { Injectable } from '@angular/core'
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpEventType,
} from '@angular/common/http'
import { Observable, tap } from 'rxjs'

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// Modify or log the outgoing request
		const modifiedReq = req.clone({
			withCredentials: true,
		})
		return next.handle(modifiedReq)
		// .pipe(
		//   tap((val) => {
		//     if (val.type === HttpEventType.Sent) {
		//       console.log('Request was sent to server');
		//     }

		//     if (val.type === HttpEventType.Response) {
		//       console.log('Got a response from the API', val);
		//     }
		//   })
		// );
	}
}
```

The nicety is that if we write out the class and implements HttpInterceptor the body of the class will be autocompleted.

////Programatic Navigation

```ts
import { Component } from '@angular/core'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-signout',
	templateUrl: './signout.component.html',
	styleUrls: ['./signout.component.css'],
})
export class SignoutComponent {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.authService.signout().subscribe(() => {
			this.router.navigateByUrl('/')
		})
	}
}
```

Basically we just import Router and inject it into our class and then call this.router.navigateByUrl('ENDPOINT')

=======================================
Section 23: More on Angular App Security
=======================================

//// Restricted routing with guards

3 types of guards

canActivate - User can visit this route
canActivateChild - User can visit this child route
canLoad - User can load this lazily-loaded module and access the routes inside of it

```ts
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
	{
		path: 'inbox',
		canLoad: [AuthGuard],
		loadChildren: () =>
			import('./inbox/inbox.module').then((mod) => mod.InboxModule),
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
```

Implementing guards in routes

////Auth Guard Issues

The signedin$ behavior subject never gets marked as complete
solution: Use some RxJs trickery to mark the behavior subject as complete

If the guard runs before our 'checkAuth' function is done, we will provide the default 'false' value, marking the user as not authenticated
solution: Change the default value of the behavior subject to 'null'

If we move the 'checkAuth' call to the guard, we risk not running the function at all if a user only loads another route
solution: Leave the 'checkAuth' call in the App component

=======================================
Section 24: Build a Real Email Client!
=======================================
