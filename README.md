# WeatherForecast

👋 Hi, I’m @syrenly and welcome to **weather-forecast** repo! It's a Demo application for weather forecasts and it was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.1.

### Implementations

-   Angular 17 and standalone components only;
-   folders organized mainly in a "folder-by-type" way;
-   a router exposes 2 main components: HomeComponent and ForecastComponent; guard, resolver and animations implemented;
-   the folder _ui-components_ contains the less architectural components, designed to show or search data;
-   [theme.scss](./src/theme.scss) hosts the 2 themes (light and dark), that can be switched using the SwitchThemeComponent from _ui-components_; the component is always available on the upper right corner of the view;
-   HomeComponent is an entry point where search cities;
-   ForecastComponent is the core of the application, where data are displayed using charts, tabs and list;
-   Switch for themes and the license key are managed with injection tokens;

### Main external dependencies

-   Angular Material for theme and UI Kit;
-   ChartJS for charts;

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
Statements   : 69.3% ( 149/215 )
Branches     : 34.32% ( 23/67 )
Functions    : 67.74% ( 42/62 )
Lines        : 68.57% ( 144/210 )
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

> With this mode, the application will be built in _production_. Remember to update the license key for the OpenWeather API [here](./src//assets/configuration.prod.json) with a full working one.

## Attributions

The project depends on [Open Weather Map](https://openweathermap.org), which provides an API with free license. The license is limited to small number of requests and few methods.

> To change the license key, replace it [here](./src/app/app.config.ts)

## TODO List

Explore the [TODO List](./TODO_LIST.md) to know what's next.

## Branches

-   [assignment-04-2024](https://github.com/syrenly/weather-forecast/tree/assignment-04-2024): the first implementation of the application. Updates are not planned.
