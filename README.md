# Async Race   

### Watch [deploy](https://insane-idea.github.io/async-race/)  
---  

Your customer has an idea to spend his money. He has hired some engineers who installed some radio-controlled equipment to real cars. To the all his collection of cars to be precise. He is eager to create kind of drag-racing competition in order to discover which car fastest. 
Each radio-contorller has an HTTP-compatible interface. It's let you to start or stop engine of the car and of course enable "driving" mode.

### Setup and Running

:exclamation: Reviewer should clone repo and keep the local server running during functionality review as described below :exclamation: 

- Open [deploy](https://insane-idea.github.io/async-race/)  
- Clone this repo: `$ git clone https://github.com/insane-idea/async-race`
- Switch to the `server` branch: `$ git switch server`
- Install dependencies: `$ npm install`
- Start server: `$ npm run start`
- Now local server is available at: `http://127.0.0.1:3000`, deploy is available to be used with this server   

## Key skills
- Сommunication with a server (fetch, REST API)
- Async coding / Promises
- JS Animation 
- DOM Api
- SPA 


### Note for reviewers :
- User is able to create, update, delete a car, and see the list of the cars
- User clicks to the engine start button ("A") -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped
- User clicks to the stop button ("B"), car engine stops and car returns to its' start position
- "Generate Cars" button creates random cars (100 cars per click). Name is assembled from two random parts, color is also generated randomly.
- Race/reset buttons and winners page are not implemented yet  


## Functional requirements
1. Basic structure:
   - (**+5**) There should be two views on the site: "Garage" and "Winners".
   - (**+5**) "Garage" view should contain its name, page number, and the full amount of items in the database (how many car user has in his garage).
   - (**+5**) "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains).
   - (**+10**) View state should be saved when user switches from one view to another. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.
2. "Garage" view:
   - (**+15**) User should be able to create, update, delete a car, and see the list of the cars. Car has only two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".
   - (**+10**) User should be able to select any color from an RGB-Palete [like here](https://www.colorspire.com/rgb-color-wheel/) and see the picture of the car colored with the color selected and car's name.
   - (**+5**) Near the car's picture should be buttons to update its attributes or delete it.
   - (**+10**) There should be pagination on the "Garage" view (7 cars per one page).
   - (**+10**) There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.
3. Car animation:
   - (**+5**) Near the car's picture should be buttons for starting / stoping the car engine.
   - (**+20**) User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.
   - (**+5**) User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
   - (**+5**) Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it's initial place.
   - (**+15**) Car animation should work fine on any screen (smallest screen size is 500px).
4. Race animation:
   - (**+10**) There should be a button to start race. After user clicks this button all the cars on the current page start driving.
   - (**+10**) There should be a button to reset race. After user clicks this button all the cars return to it's initial places.
   - (**+10**) After some car finishes first user should see the message contains car's name that shows which one has won.
5. "Winners" view:
   - (**+10**) After some car wins it should be displayed at the "Winners view" table.
   - (**+5**) There should be pagination (10 winners per one page).
   - (**+10**) Table should include the next culumns: "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names of the columns can differ). If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
   - (**+10**) User should be able to sort cars by wins number and by best time (ASC, DESC).
  
## Non-functional requirements
- (**-100%** for not fulfillment) It's forbidden to use any libraries or frameworks, like JQuery, React, Angular, Lodash, Material Design, etc. But you can use CSS from Bootstrap (**CSS only!**) if you wish. **Note:** It may be allowed to use React or Angular, but only if you've already studied at previous RS-course and/or pretty understand how to work with a DOM Api (DOM modification, Event Delegation) and only after agrement with a mentor!
- (**-100%** for not fulfillment) Typescript must be used. Types of input and output parameters of all the methods must be described. Using type "any" is strictly forbidden.
- (**+40**) Application is divided to logical modules / layers. Like working with api it's separate module, as well as working with UI rendering, or working with an application state, etc. Better discuss architecture with a mentor before implementing.
- (**+30**) All the HTML-content is generated by JavaScript (body contains only one tag script inside).
- (**+25**) Application is SPA.
- (**+20**) Webpack or another bundler should be used. There should be one HTML-file, JS-file, and one CSS-file (or it can be embedded right in the HTML-file).
- (**+15**) Eslint with [Airbnb style guide](https://github.com/airbnb/javascript) should be used. Some paricular eslint-rules can be disabled or changed only after agrement with a mentor. There shouldn't be any eslint errors or warnings.
- (**+10**) Code divided to small functions with a clear names and purposes. Each function should be less or equal to 40 lines.
- (**+5**) There are not unnecessary code duplications.
- (**+5**) Code shouldn't contain magical numbers or strings.


