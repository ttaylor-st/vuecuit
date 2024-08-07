# Vuecuit

A third-party client for [Discuit] built with Vue

> [!WARNING]  
> This repository has been archived. Vuecuit development, however, is continuing on Codeberg
> [here](https://codeberg.org/ttaylor/vuecuit)

## Platform support

Vuecuit is web-first, mobile-optimised and designed to work on all modern browsers.
In the future, I plan to provide both a PWA and native Android app using [Capacitor].

## Get Vuecuit

Vuecuit is available on GitHub Pages at
[ttaylor-st.github.io/vuecuit](https://ttaylor-st.github.io/vuecuit), but it is **not** production
ready and you **will** encounter issues with CORS if trying to use it with the official Discuit
instance

If and when I choose to support Android, I will provide automatically generated builds on the
[Releases](https://github.com/ttaylor-st/vuecuit/releases) page and on the Google Play Store.

Can't wait? You can clone the repository and run it locally, see [Development](#development).

## Development

### Setup

Note that Discuit does not currently support CORS, which Vuecuit **needs** to work, as everything is
done client-side.
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

### Starting the development server

```sh
bun run dev
```

This will start a development server at `http://localhost:5173/`. The page will reload if you make
any edits. You'll also probably want to change the API URL set by the
[`urlStore`](src/stores/urlStore.ts) to `http://localhost:5173/`, which can be done in
the `/settings` page.

### Building for production

```sh
bun run build
```

This will build the app for production to the `dist/` directory. You can also use `bun run
build-only` to skip any pre-build checks.

## Supporting Vuecuit

Vuecuit development is entirely volunteer-driven.
If you would like to support Vuecuit, please consider contributing by making a pull request,
filing an issue, and/or sending us virtual cookies on
our [Discuit community](https://discuit.net/Vuecuit),
which will be made at some point, maybe.

### Contributing

You're welcome to contribute in any way you can, whether it's code, documentation, or just feedback.
Before making any significant changes, please open an issue to discuss the changes you'd like to
make.

## License

Vuecuit is licensed under the [MIT License](LICENSE).

[Discuit]: https://discuit.net/

[Capacitor]: https://capacitorjs.com/

[Bun]: https://bun.sh/


