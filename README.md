# WeatherForecast

👋 Hi, I’m @syrenly and welcome to [**weather-forecast**](https://syrenly.github.io/weather-forecast/) repo! It's a Demo application for weather forecasts and it was generated with [Angular CLI](https://github.com/angular/angular-cli), maintained to version 20.

## Live site!

Live site [here!](https://syrenly.github.io/weather-forecast/) 🔥

### Implementations

- Angular 20 and standalone components only;
- folders organized mainly in a "folder-by-type" way;
- a router exposes 2 main components: HomeComponent and ForecastComponent; guard, resolver and animations implemented;
- the folder _ui-components_ contains the less architectural components, designed to show or search data;
- [theme.scss](./src/theme.scss) hosts the 2 themes (light and dark), that can be switched using the SwitchThemeComponent from _ui-components_; the component is always available on the upper right corner of the view;
- HomeComponent is an entry point where search cities;
- ForecastComponent is the core of the application, where data are displayed using charts, tabs and list;
- Switch for themes and the license key are managed with injection tokens;
- 🌟 NEW! 🌟 Improved accessibility!

### Main external dependencies

- Angular Material for theme and UI Kit;
- ChartJS for charts;

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Last code coverage

Run `npm run test:coverage` to get stats about the code coverage. Current:

```
=============================== Coverage summary ===============================
Statements   : 100% ( 398/398 )
Branches     : 100% ( 99/99 )
Functions    : 100% ( 129/129 )
Lines        : 100% ( 368/368 )
================================================================================
```

## Lint

Run `ng lint` to run the Angular lint.

Run `npm run eslint` to run the ES lint.

Run `npm run eslint:fix` to run the ES lint and apply fixes.

## Docker

Install docker in your machine. From the root folder of this application, run

`docker build . -t weather-forecast` and `docker run -p 4200:80 weather-forecast`.

Navigate to `http://localhost:4200/`.

> With this mode, the application will be built in _production_. Remember to update the license key for the OpenWeather API [here](./src//assets/configurations/configuration.prod.json) with a full working one.

## Upgrading Angular

Every major Angular version is preserved in its own `ng-<N>` branch (see [Branches](#branches)), and the upgrade to the next major version reaches `main` through a pull request. To upgrade from version N-1 to N:

1. Make sure `main` is up to date and green: `npm run eslint`, `npm run prettier:check` and `npm run test:coverage` must pass.
2. **Before merging anything**, preserve the current version by creating a branch from `main` and pushing it:
   `git switch main && git pull && git switch -c ng-<N-1> && git push -u origin ng-<N-1>`
3. Create the upgrade branch from `main`, for example `git switch -c upgrade-angular-<N> main`.
4. Follow the [Angular update guide](https://angular.dev/update-guide) and run `ng update @angular/core@<N> @angular/cli@<N> @angular/material@<N>` one major version at a time.
5. Fix the breaking changes, then run `npm run eslint`, `npm run prettier:check` and `npm run test:coverage`. Coverage must not drop.
6. Open a pull request towards `main` with a title like `[Upgrade] Angular <N>`, and merge it only when the checks above pass. Never push the upgrade directly to `main`.
7. Update the [Branches](#branches) list in this README: add the new `ng-<N-1>` branch and update the entry for `main`.

The `ng-<N-1>` branch is a snapshot of the previous version: it only receives security fixes, and it is not published (GitHub Pages and the Docker image are built from `main`).

## Attributions

The project depends on [Open Weather Map](https://openweathermap.org), which provides an API with free license. The license is limited to small number of requests and few methods.

> To change the license key, replace it [here](./src/configurations/configuration.ts) for development or [here](./src/configurations/configuration.prod.ts) for production.

## TODO List

Explore the [TODO List](./TODO_LIST.md) to know what's next.

## Branches

- [main](https://github.com/syrenly/weather-forecast/tree/main): implementation with Angular 21 (current);
- [ng-20](https://github.com/syrenly/weather-forecast/tree/ng-20): implementation with Angular 20;
- [ng-19](https://github.com/syrenly/weather-forecast/tree/ng-19): implementation with Angular 19;
- [ng-18](https://github.com/syrenly/weather-forecast/tree/ng-18): implementation with Angular 18;
- [ng-17](https://github.com/syrenly/weather-forecast/tree/ng-17): implementation with Angular 17;
- [assignment-04-2024](https://github.com/syrenly/weather-forecast/tree/assignment-04-2024): the first implementation of the application. Updates are not planned.
