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

=============================================
Section 5: Nest Architecture: Services and Repositories
=============================================

One difficulty of Nest is understanding why services exist and how they differ from Repositories
They frequently end up having very similar method names

Services:
Its a class
#1 place to put any business logic
Uses one or more repositories to find or store data

Repositories:
Its a class
#1 place to put storage-related logic
Usually ends up being a TypeORM entity, a Mongoose schema, or similar

Our controller works with the service not the repository

//// DI

Inversion of Control Principle
Classes should not create instance of its dependencies on its own

Nest DI Container / Injector
An object that:
Lists classes and their dependencies
List instances that have been created - which results in each dep being a singleton

DI Container Flow

At startup, register all classes with the container
Container will figure out what each dependency each class has
We then ask the container to create an instance of a class for us
Container creates all required dependencies and gives us the instance
Container will hold onto the created dependency instances and reuse them if needed

We have to now:
Use the 'Injectable' decorator on each class and add them to the modules list of providers ("Things that can be used as deps in other classes")

=============================================
Section 6: Organizing Code with Modules
=============================================

////Setting up DI between modules

DI inside of a module
Add the @Injectable decorator to PowerService
Add the PowerService to the PowerModule's list of providers
Define the constructor method on RegulatorService and add 'PowerService' to it.

DI Between Modules (very similar to Angular)
Add PowerService to the PowerModule's Decorator with exports:[]
Import the PowerMOdule into the CpuModule with imports: []
Define the constructor method on CpuService and add 'PowerService' to it

=============================================
Section 7: Big Project Time!
=============================================

A good way to start a Nest Application is to identify the different resources in our project for which we will probably need a Controller, Service and Repository.

Ex. In an app where Users report the value of their Car. We would have a:

USERS MODULE
Users Controller
Users Service
Users Repository

REPORTS MODULE
Reports Controller
Reports Service
Reports Repository

=============================================
Section 8: Persisting Data with TypeORM
=============================================

There are two ORMs that work well out of the box:

TypeORM and Mongoose

////

An Entity is very similar to a Model
Lists the different properties that an Entity has (no functionality)
Nest and TypeORM then takes the Entity and creates a Repository for us
We don't even see a generated file for them...

```ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db.sqlite',
			entities: [],
			synchronize: true,
		}),
		UsersModule,
		ReportsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
```

First step is to import the TypeOrmModule into our AppModule

////Creating an Entity

Create an entity file, and create a class in it that lists all the properties that your entity will have

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	password: string
}
```

Connect the entity to its parent module. This creates a repository

```ts
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
```

Connect the entity to the root connection (in app module)

```ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/users.entity'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db.sqlite',
			entities: [User],
			synchronize: true,
		}),
		UsersModule,
		ReportsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
```

=============================================
Section 9: Creating and Saving User Data
=============================================

Example of creating a TypeOrm repository in a service

```ts
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	create(email: string, password: string) {
		const user = this.repo.create({ email, password })
		return this.repo.save(user)
	}
}
```

Flow:

Our app receives a Request
We set up ValidationPipe in the main.ts file
We use a Dto to validate the incoming request
If the body is valid we send the request to the controller that handles routing
Inside the service is our business logic
We create an Entity and use a Repository to interface with the DB

=============================================
Section 10: Custom Data Serialization
=============================================

Interceptors can be used like middlewares

```ts
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // Run something before a request is handled by the request handler
    console.log('Im running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        console.log('Im running before response is sent out', data);
      }),
    );
  }
}

IN CONTROLLER ON ROUTE WE WANT TO INTERCEPT
  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');

    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
```

=============================================
Section 11: Authentication From Scratch
=============================================
=============================================
Section 12: Getting Started with Unit Testing
=============================================

Unit Testing = Make sure that individual methods on a class are worksing correctly

Integration Testing = Test the full flow of a feature

Example of a Unit Test

```ts
import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'

it('can create an instance of auth service', async () => {
	// Create a fake copy of the users service
	const fakeUsersService: Partial<UsersService> = {
		find: () => Promise.resolve([]),
		create: (email: string, password: string) =>
			Promise.resolve({ id: 1, email, password } as User),
	}

	const module = await Test.createTestingModule({
		providers: [
			AuthService,
			{
				provide: UsersService,
				useValue: fakeUsersService,
			},
		],
	}).compile()

	const service = module.get(AuthService)

	expect(service).toBeDefined()
})
```

We can run test runners in watch mode and press 'p' to write out a specific test we want to 'watch'

You can dramatically speed up your tests by updating the package.json file.

In the scripts section, find the following line:

"test:watch": "jest --watch",

And change it to:

"test:watch": "jest --watch --maxWorkers=1",

Restart your test runner at your terminal after making this change

=============================================
Section 13: Integration Testing
=============================================

Test it('handles a request to signup') =Test Runner>
Create new copy of the entire nest app
Listen on traffic to a randomly assigned port
Receive requests from the test

```ts
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db.sqlite',
			entities: [User, Report],
			synchronize: true,
		}),
		UsersModule,
		ReportsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
			}),
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				cookieSession({
					keys: ['asdfasdf'],
				})
			)
			.forRoutes('*')
	}
}
```

=============================================
Section 14: Managing App Configuration
=============================================

=============================================
Section 15: Relations with TypeORM
=============================================

Building Associations with Nest and TypeORM

Figure out what kind of association we are modeling
Add the appropriate decorators to our related entities
Associate the records when one is created
Apply a serializer to limit info shared

In our app: A User has many Reports, A Report has one User

```ts
import { Expose, Transform } from 'class-transformer'

export class ReportDto {
	@Expose()
	id: number

	@Expose()
	make: string

	@Expose()
	model: string

	@Expose()
	year: number

	@Expose()
	lng: number

	@Expose()
	lat: number

	@Expose()
	mileage: number

	@Expose()
	price: number

	@Transform(({ obj }) => obj.user.id)
	@Expose()
	userId: number
}
```

=============================================
Section 16: A Basic Permissions System
=============================================

Authorization: Figue out if the person making the request is allowed to make it

Authentication: Figure out who is making a request

Interceptors run after Middle Ware and Guards so we can't write Guards or MidWare that relies on Interceptors, instead we should make them middle ware

=============================================
Section 17: Query Builders with TypeORM
=============================================

TypeORM Repository methods:

create, save, find, findOne AND
createQueryBuilder - Returns a query builder that can be used for complex queries

````ts

	  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
				// THE VALUE OF :MAKE COMES FROM THE 2nd ARG
			// THIS PREVENTS SQL INJECTION ATTACKS
      .createQueryBuilder()
      .select('AVG(price', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng = :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat = :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year = :year BETWEEN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
	```

````
