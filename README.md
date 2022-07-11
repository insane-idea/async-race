# Task "Async Race"

Your customer has an idea to spend his money. He has hired some engineers who installed some radio-controlled equipment to real cars. To the all his collection of cars to be precise. He is eager to create kind of drag-racing competition in order to discover which car fastest. 
Each radio-contorller has an HTTP-compatible interface. It's let you to start or stop engine of the car and of course enable "driving" mode.

### Setup and Running

Reviewer should clone repo and keep the local server running during functionality review as described below :exclamation: 

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
