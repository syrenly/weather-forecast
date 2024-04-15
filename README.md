# WeatherForecast

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4. It's a Demo application for weather forecasts.

## How

You can run the project with this commands:

-   Run `npm i` and `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
-   Run `docker build . -t weather-forecast` and `docker run -p 4200:80 weather-forecast` to run a "dockerized" version of the application. Navigate to `http://localhost:4200/`.

## What

-   Angular 17 and standalone components only;
-   folders organized mainly in a "folder-by-type" way;
-   a router exposes 2 main components: HomeComponent and ForecastComponent; guard, resolver and animations implemented;
-   the folder _ui-components_ contains the less architectural components, designed to show or search data;
-   [theme.scss](./src/theme.scss) hosts the 2 themes (light and dark), that can be switched using the SwitchThemeComponent from _ui-components_; the component is always available on the upper right corner of the view;
-   HomeComponent is an entry point where search cities;
-   ForecastComponent is the core of the application, where data are displayed using charts, tabs and list;

## Libraries

-   Angular Material for theme and UI Kit;
-   ChartJS for charts;

## Attributions

The project depends on [Open Weather Map](https://openweathermap.org), which provides an API with free license. The license is limited to small number of requests and few methods.

> In case the license key should be changed, you can replace it [here](./src/app/app.config.ts)

## TODO List

Explore the [TODO List](./TODO_LIST.md) to know what's next
