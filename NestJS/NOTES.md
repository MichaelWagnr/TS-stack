=============================================
Section 2: The Basics of Nest
=============================================

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

=============================================
Section 3: Nest CLI
=============================================

nest generate controller messages/messages --flat

controller - Type of class to generate
messages/ - Place the file in the messages folder
messages - Call the class 'messages'
--flat - Don't create an extra folder called 'controllers'

=============================================
Section 4: Validating Request Data with Pipes
=============================================

HTTP Request

Start line:
POST /messages/5?validate=true HTTP/1.1

Headers:
Host: localhost:3000
Content-Type: application/json

Body:
{"content": "hi there"}

We can use the decorators:
@Param('id')
@Query()
@Headers()
@Body()

To pick apart the incoming request

//// Using Pipes for validation

ValidationPipe : a Pipe built in to Nest to make validation super easy

Setting up automatic validation:

1 Tell Nest to use global validation

```ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module'

async function bootstrap() {
	const app = await NestFactory.create(MessagesModule)
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(3000)
}
bootstrap()
```

2 Create a class that describes the different properties that the request body should have referred to as a Data Transfer Object (DTO)

3 Add validation rules to the class

```ts
import { IsString } from 'class-validator'

export class CreateMessageDto {
	@IsString()
	content: string
}
```

4 Apply that class to the request handler

```ts
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }
```

////Behind the scenes with validation

The goal of a DTO is to carry data between two places.

Validation Pipe flow:
Use class-transformer to turn the body of a request into an instance of the DTO class
Use class-validator to validate the instance
If there are validation errors, respond immediately, otherwise provide body to request handler
