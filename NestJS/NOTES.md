=============================
Section 2: The Basics of Nest
=============================

@nestjs/common
Contains vast majority of functions, classes, etc, that we need from Nest

@nestjs/platform-express
Lets Nest use ExpressJS for hadnling HTTP requests

reflect-metadata
Helps make decorators work.

In a typical Server we have steps to handle requests. Nest has TOOLS to help us write these.

Validate data contained in the request
PIPE

Make sure the user is authenticated
GUARD

Route the request to a particular function
CONTROLLER

Run some business logic
SERVICE

Access a database
REPOSITORY

We also have,

MODULE: Groups code together

FILTERS: Handles errors that occur during request handling

INTERCEPTORS: Adds extra logic to incoming request or outgoing responses

Basic Hi World Nestjs Server

```ts
import { Controller, Module, Get } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

@Controller()
class AppController {
	@Get()
	getRootRoute() {
		return 'hi there!'
	}
}

@Module({
	controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	await app.listen(3000)
}

bootstrap()
```

File naming conventions:

One class per file (some exceptions)
Class names should include the kind of thing we are creating
Name of class and name of file should always match up
Filename template: name.type_of_thing.ts

ex.
main.ts
app.controller.ts - class AppController{}
app.module.ts - class AppModule {}

////Routing Decorators

```ts
//CONTROLS HIGH LEVEL ROUTING RULES
@Controller('/app')
export class AppController {
	// localhost:3000/app/asdf
	@Get('/asdf')
	getRootRoute() {
		return 'hi there!'
	}
	// localhost:3000/app/bye
	@Get('/bye')
	getByeRoute() {
		return 'bye there!'
	}
}
```
