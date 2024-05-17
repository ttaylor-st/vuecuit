# Vuecuit

A third-party client for [Discuit] built with Vue

## Platform support

Vuecuit is web-first, mobile-optimised and designed to work on all modern browsers.
In the future, I plan to provide both a PWA and native Android app using [Capacitor].

## Get Vuecuit

Vuecuit is available on GitHub Pages at
[ttaylor-st.github.io/vuecuit](https://ttaylor-st.github.io/vuecuit), **but** it is not production ready.

If and when I choose to support Android, I will provide automatically generated builds on the
[Releases](https://github.com/ttaylor-st/vuecuit/releases) page and on the Google Play Store.

Can't wait? You can clone the repository and run it locally, see [Development](#development).

## Development

Note that Discuit does not currently support CORS, which Vuecuit **needs** to work, as everything is done client-side. 
[Pull #80](https://github.com/discuitnet/discuit/pull/80) is open to address this issue.

First, make sure you have [Bun] installed.

```sh
# Clone the repository and install dependencies
git clone https://gitlab.com/ttaylor-st/vuecuit.git
cd vuecuit
bun install

# Compiles and hot-reloads for development
bun run dev

# Compiles and minifies for production
bun run build

# Run Unit Tests with https://vitest.dev/
bun run test:unit

# Lint with https://eslint.org/
# TODO: Make pre-commit hook and CI
bun run lint

# Format with https://prettier.io/
# TODO: Make pre-commit hook and CI
bun run format

```

## Supporting Vuecuit

Vuecuit development is entirely volunteer-driven.
If you would like to support Vuecuit, please consider contributing by making a pull request,
filing an issue, and/or sending us virtual cookies on our Discuit community, which will be made at some point, maybe.

### Contributing

You're welcome to contribute in any way you can, whether it's code, documentation, or just feedback. 
Before making any significant changes, please open an issue to discuss the changes you'd like to make.


## License

Vuecuit is licensed under the [MIT License](LICENSE).

[Discuit]: https://discuit.net/

[Capacitor]: https://capacitorjs.com/

[Bun]: https://bun.sh/


