# Planes, trains and automobiles

### Author: Abhijit Baldawa

### Description

React.js/Typescript application to select vehicles and customize them.

### Tech Stack

1. React.js, Typescript
2. Material UI (MUI)
3. Zod (for data validation)
4. Zustand (state manager)
5. Jest, React Testing Library (for testing)

### Pre-requisites

Node.js (20.0.x or higher)

### How to run the application:

1. `git clone https://github.com/abaldawa/vehicle-selection.git`
2. `cd https://github.com/abaldawa/vehicle-selection.git`
3. execute `npm i`
4. execute `npm start` (This will start the frontend react dev server)
5. Go to `http://localhost:3000` to see the UI

### Integration tests

Full suite of integration tests are written covering the entire functionality including the edge cases. To run the integration tests do below:

1. `cd https://github.com/abaldawa/vehicle-selection.git`
2. execute `npm run test:watch`

### Create production build and deployment

To create a production build of the application do below:

1. `cd https://github.com/abaldawa/vehicle-selection.git`
2. execute `npm run build` - This will generate the production build of the application in the `build` folder

Once the production build of the application is created in the `build` folder then it can be deployed and served from any CDN/reverse proxy/static server/server etc.

### Edge cases handling

1. When the UI is loading the vehicles data then the Loader is shown on the UI
2. If the data loading fails for any reason then error popup displaying the error is shown on the UI.
3. If data loading is successful but no vehicles are found then a popup is shown to the user informing the same
4. Zod is used for data validation and if the data is received in an incorrect format then the exact validation error details popup is shown on the UI.

### A bit about integration tests

Integration tests covering all the edge cases and success cases are written which validates that the application works as intended.
Moreover, the integration tests code is not hardcoded and is scalable/extensible because of below architecture:

`Integration test code` -> reads -> `Test plan` -> has `Test scenarions` -> has `{action, assertion tests}`

`Test scenarions` mock data can be easily changed by adding/removing/modifying objects in the `test scenarios` array. Once the `test scenario` data is changed, the `Integration test suite` will pick it up, execute the scenarios as described and validate the test results thus making adding/removing/modifying scenarios extremely easy without needing any change to the
original test code.

### A bit about Design + CSS

1. Mobile first responsive design is implemented which looks good on both mobile and desktop.
2. Modern CSS units (ex `container` units) are used to be responsive at the container level.
3. CSS-IN-JS flavour which comes with material-ui is used.

### User interface

Below video demonstrates how the UI looks like and its functionality.

https://github.com/abaldawa/vehicle-selection/assets/5449692/fe9a6249-44b9-40b6-abfa-76653f2782fc
