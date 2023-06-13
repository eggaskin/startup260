# React
[notes home](./notes.md)

* JSX - JavaScript XML combines js and html
  * separate functionality
  * Babel convertes JSX to JS
  ex. `const list = {<ul><li>1</li><li>2</li></ul>}`

ReactDOM.render(what, where), where is a DOM element (use document.getElement of some form)

## Components

* compontents can be functions, ex `function MyComponent() { return <div>...</div> }` then use `<MyComponent />`
* can add props to components, ex `<MyComponent prop1="value" prop2={value} />` and function looks like `function MyComponent(props) { return <div>{props.prop1}</div> }`
* can use destructuring to get props, ex `function MyComponent({prop1, prop2}) { return <div>{prop1}</div> }`
* can use children prop to get children of component, ex `<MyComponent>children</MyComponent>` and function looks like `function MyComponent({children}) { return <div>{children}</div> }`
 
* states: define, update, use.
  * useState hook to define state, ex `const [state, setState] = useState(initialState)` (define state name and function to update state)
  * setState to update state, ex `setState(newState)`
  * state to use state

* React is *in between* client and DOM!! Don't use DOM directly, use React to update DOM.

## Vite, Routing

* Vite is a build tool for React
  * 
* we are now injecting different components into a single webpage!

### Routers
* BrowserRouter contains entire app
* replace anchor tags for navigation with NavLink tags
* Route tags to define routes between paths and components

### Toolchain
process of different tools to get final product
* ex. vite, babel, minifyjs
* `npm run dev` to run dev server - debugging
* `npm run build` to build for production

npm create vite@latest (name) -- --template react, npm install

* instructions for converting to react on instruction website
  * separate directories for server components and 'front end' components
  * convert to react components
* new deployment script
* vite.config.js to configure vite
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa there is so much to do. oh github copilot, what do you say? "I don't know, I'm just a robot." oh. ok.
thanks.

* can make files in src folder to make components, then import them into App.js(x)
* css still works
* class -> className so jsx doesn't get confused

## Reactivity
* by changing properties and components, change the DOM reactively/rerender
* useState - component states
* useEffect - side effects, like external fetches, include `[]` to only run once/first render
  * or `[]` includes variables that when changed, useEffect runs


### Hooks
* only in function components
* top function scope
* no loops/conditionals

STEPS
* service directory for everything else
* then single other files
* vite.config.js just LOOK AT SIMON
* index.jsx renders root
* app.jsx renders views, header, footer, navlinks (in src with app.css)
* className instead of class
* use effects for fetches
* can make const lists for lists of elements! then {list} in jsx

