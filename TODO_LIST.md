# 🗹 TODO List

The following enhancements will be evaluated in order to improve the application:

-   [ ] add links to the specific sections/components in this TODO list (todo list inception 🤯)
-   [ ] retrieve the license key from a json configuration (better with different files for development and production) and remove the current hard-coded behavior
-   [ ] find out why Edge is so reluctant to accept the integrity control made for the Google Font in index.ts with https://subresourceintegrity.com/. At the moment, it is removed from the link element to make the application work
-   [ ] add missing unit tests
-   [ ] rewrite in a more readable way the htmls of the ForecastComponent and children: unlucky choice to use Angular 17 😿. It seems that most of VSCode extensions are not updated for the new statements @if and @for. The indentation of the code is a mess
-   [ ] save in the browser storage the last N selected city and suggest them inside the HomeComponent instead of the list of hard-coded cities
-   [ ] ask users to retrieve their location and open directly their city
-   [ ] integrate the signal feature
-   [ ] evaluate where to use the DetectionStrategy OnPush
-   [ ] create a pipe that turns the direction (in degree) of the wind in a more human readable way using cardinal point
        s (like N, NWN, S, etc)
-   [ ] not sure if leave Angular Material or create custom components
-   [ ] of course new ideas will come!
