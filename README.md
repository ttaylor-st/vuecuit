# Vuecuit

A third-party client for [Discuit] built with Vue

## Platform support

Vuecuit is web-first, mobile-optimised and designed to work on all modern browsers.
In the future, I plan to provide both a PWA and native Android app using [Capacitor].

## Get Vuecuit

Vuecuit will, at some point, be deployed to GitHub Pages at 
[ttaylor-st.github.io/vuecuit](https://ttaylor-st.github.io/vuecuit).

If and when I choose to support Android, I will provide automatically generated builds on the
[Releases](https://github.com/ttaylor-st/vuecuit/releases) page and on the Google Play Store.

Can't wa it? You can clone the repository and run it locally, see [Development](#development).


## Development

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

## License

Vuecuit is licensed under the [MIT License](LICENSE).

[Discuit]: https://discuit.net/
[Capacitor]: https://capacitorjs.com/
[Bun]: https://bun.sh/


