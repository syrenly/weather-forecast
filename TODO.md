# 🗹 TODO List

The following enhancements will be evaluated in order to improve the application:

-   [ ] save in the browser storage the last N selected city and suggest them inside the HomeComponent instead of the list of hard-coded cities
-   [ ] ask users to retrieve their location and open directly their city
-   [ ] _started_ integrate the signal feature
-   [ ] evaluate where to use the DetectionStrategy OnPush
-   [ ] not sure if leave Angular Material or create custom components
-   [ ] refresh button or periodic refresh of the data
-   [ ] add a background image with transparence for the HomeComponent
-   [ ] replace [groupBy](./src/app/ui-components/forecast-five/forecast-five.component.ts) with the new Object.groupBy function when Typescript will expose it
-   [ ] manage errors and not-found with specific components in routing
-   [ ] find out why Edge is so reluctant to accept the integrity control made for the Google Font and icons in index.ts with https://subresourceintegrity.com/. At the moment, it is removed from the link element to let the application work

... of course new ideas will come!

## DONE

-   [x] add links to the specific sections/components in this TODO list (todo list inception 🤯)
-   [x] retrieve the license key from a json configuration (better with different files for development and production) and remove the current hard-coded behavior
-   [x] _fixed with prettier+eslint_: rewrite in a more readable way the htmls of the ForecastComponent and children: unlucky choice to use Angular 17 😿. It seems that most of VSCode extensions are not updated for the new statements @if and @for. The indentation of the code is a mess
-   [x] find a better place for the OpenWeather attribution
-   [x] apply inverse animation to the navigation transition from forecasts to home
-   [x] remove navigation logic from searchbar
-   [x] refactor scss variables
-   [x] create a pipe that turns the direction (in degree) of the wind in a more human readable way using cardinal point
        s (like N, NWN, S, etc)
-   [x] set unit tests coverage to minimum 80%
-   [x] use Renderer2 to manipulate DOM while applying a theme
-   [x] implementation of lazy loading for components in routes
