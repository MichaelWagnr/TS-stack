Tailwind

Is a CSS famework that uses low=level utility classes to create layouts. It's known as a utility-first framework.

Traditional CSS frameworks like Bootstrap use classes that are directly correlated to components like Alerts and Navbars.

Utility classes are simple HTML classes typically scoped to a single and specific CSS property.

EX:
max-w-xl mx-auto p-2

Named accord to their purpose, easy to understand and remember, you know exactly what it does, no naming inconsistencies. Allows for very fast layout creation and testing.

How is Tailwind different from Bootstrap?

Released in 2017 vs 2011.
Bootstrap is more common but Tailwind is coming up
BS is highlevel and TW is low-level
TW has more flexibility and uniqueness.
TW is customizable with directives & functions
TW is a bit more difficult but only because you need to know CSS
TW has more classes per element typically.

Responsive Classes and State Classes

TW has conditional class naming for breakpoints as well as states such as hover focus.

EX.
hover:text-blue-500 md:flex-row (medium display)

Utility first fundementals

building complex components from a constrainded set of utilities

Colors

50 to 900

Spacing

m0.5 = 2px
m1 = 4px

If you want a custom font you can use a tailwind.config.js

=======================================
Section 4: A Better Dev Environment
=======================================

////Directives and functions

In our input.css file we can declare class combinations or custom values. To leverage existing tailwind classes we start with the @apply directive

```css
INPUT CSS FILE ----------------------------------

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	h1 {
		@apply text-3xl;
	}

	h2 {
		@apply text-xl;
	}
}

@layer components {
	.btn-blue {
		@apply bg-blue-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-blue-700;
	}
}

.content-area {
	@apply bg-green-200;
	height: theme('spacing.128');
}

@media screen(xl) {
	body {
		@apply bg-black text-white;
	}
}

TAILWIND CONFIG FILE ----------------------------

module.exports = {
	content: ['./*.html'],
	theme: {
		extend: {
			spacing: {
				128: '32rem',
			},
		},
	},
	plugins: [],
}

```

We can make custom themes in our tailwind config file and reference them elsewhere
