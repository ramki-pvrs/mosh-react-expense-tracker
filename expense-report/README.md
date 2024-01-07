# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Ramki's Notes:

- class to className when you get Bootstrap component
- class is keyword in React
- Bootstrap import is in main.tsx
- React Component function cannot return more than one HTML element
- because React component is a function and a function can return only one value
- that value need not be single value like int, it can be list or object but one object or one list
- so in React wrap in div or Fragment; you dont want additional element div
- <> </> - Fragement wrap for all children inside them

- Javascrip map with arrow function =>

- React elements all needs unique ids, including list items so that on react manage the rendering only that id on change

- onClick in react is SyntheticBaseEven (chrome debug console print will show it)
- which is a React wrapper on browser native event object
- if event handling function is a large one, keep it outside jsx and call it in jsx
- typescript event warning to be handled import MouseEvent
- type annotation in typescript
- useState is component Hook which lets React know that this component will chaneg over time (during exeuction)
- in ListGroup for example useState retains selectedIndex as state and it also holds a function to update selectedIndex const array = useState(-1)
  -- arr[0] is variable for selectedIndex - Bool
  -- arr[1] updater Function
  -- convention in react is const [selectedIndex, setSelectedIndex] = useState(-1);
  -- js destructuring is when return on right side of = is object, you can accordingly store it in respective vars

  -- NOTE: multiple useState are possible in single component
  -- say in addition to selectedIndex, you need another variable "name" and its setName
  it is like const [name, setName] = useState(''); '' inside useState is init value of name; through exec of program name can be set in this component from user of this component, may be parent component or some others
  -- what useState means is in React typically you dont touch DOM directly at all
  -- think alsways in Component terms and its state; when state changes React automatically updates DOM (through vDOM)

  -- Components being React Function whcih returning mark-up, props are function params - input to components

  - using props we can dynamic data to our components
  - using props, in addition to specific variables, you can also pass function
    -- useful when on select of list item you want to redirect the user to another page or do some calculation based on selected value

    - PROPS ARE IM-MUTABLE
    - STATE IS MUTABLE
    - BUT ANY TIME PROPS OR STATE CHANGES REACT WILL UPDATE DOM

    -- you typically dont add this function as param inside component but on its parent/caller
    -- so from component pass selected item back to caller or App (root) component so that App can use it as variable for some other requirement may be redirect user to other page

    - you define the function in App.tsx component, pass it to the ListGroup component as a prop, take care of params de-structuring inside ListGroup component and call that function in ListGroup
      -- now when you select an item, the value is passed back to App component which can use it for further processing; in this example, it is consle logged in App.tsx

      - PASS CHILDREN TO COMPONENTS - pass Alert to ListGroup may be
      - VS Code ES7+React/Redux/React-Native sn extension
        now you can type "rafce" component lines

- REACT DEVELOPER TOOLS FOR CHROME AND FIREFOX - INSTALL IN CHROME
- YOU WILL SEE components tab now in browser debug window F12

-#########################
#STYLING css

- index.ts in each folder and import only the folder
- vanilla cs is possible
- CSS Modules ListGroup.module.css
- CSS-IN-JS
  -Libraries
  --Styled components
  --Emotion
  --Polished

  npm install styled-components
  npm install @types/styled-components

  above modules are used in ListGroupProps.tsx in this example

  //Modularity
  //each module is accessed by its interface
  //like remote control to TV

  //separation of concerns
  styles
  markup
  logic

  divide into distinct function areas

  in our App.tsx, everything about ListGroup is hidden inside ListGroupProps.tsx module
  the props and function in App.tsx towards ListGroupProps.tsx is like remote buttons - interfaces

  for Consume App.tsx, ListGroupProps.tsx is hidden and exposes only interfaces

  #POPULAR UI LIBS

  - Bootstrap - Open Source
  - Material UI - Google - Open Source
  - Tailwind CSS
  - Daisy UI
  - Chakra UI

npm install react-icons

https://react-icons.github.io/react-icons/

check the prefix

in the above page when you select an icon it gives the code lines to be added
in the component

# MANAGING COMPONENT STATE

- within state hook, add state to the component
- React updates state asynchronously
  -IMPORTANT TO NOTE: lets say on Button click a setVisibility is set to true
  -- in browser debug console you will still see false after Button click
  -- react collects all changes and updates page async - meaning in the future
  -- for performance reasons
- REACT STATE STORED OUTSIDE OF ITS COMPONENTS
  -- because component being function and state being used outside component, if state is not mentioned outside component, any update to state will be lost; because local vars inside fn scope is limited to function exec time only

  - WE CAN USE HOOKS ONLY AT TOP LEVEL OF A COMPONENT, MEANING THE CALLER/PARENT
    -- meaning
    function App() {
    const [isVisible, setVisibility] = useState(false);
    const [isApproved, setApproved] = useState(true);
    //React may store the above booleans in order in an array internally
    //because its not aware of the identifiers like isVisible, isApproved because they are local to this App function
    //when React re-renders the component, it will look at the array and store the value inside variable (identifier) like isVisible - because on re-rendering component state has to be restored as well
    }
    -- the abvoe statement that hooks only on top component means, you cannot use state hooks inside if condition or loops and all

    - CHOOSING STATE STRUCTURE
      -- Avoid redundant state variables
      -- Group related state variables inside an object like firstName and
      const [person, setPerson] = useState ({
      firstName: '',
      lastName: ''
      });
      --Avoid deeply nested structures - prefer flat structure

  - Component Purity
  - pure function: given same input, always returns same result, any number of times called
  - React Components are designe to be pure functions
    propos -> COmponent - JSX : given same props, every time is shd be same rendering
    -- so if props have not changed React can skip re-rendering that component
    -- keep your components pure - meaning
    do not not update variables declared outside component function definition inside component
    const Message = () => {
    count++; DO NOT DO THIS
    return <div>Message {count} </div>
    } // this will become impure function
    - WE SHOULD NOT CHANGE ANY OBJ THAT EXISTED BEFORE RENDERING
    - WE SHD KEEP CHANGES OUT OF RENDER PHASE
      whereas this is OK; count var moved inside function
      const Message = () => {
      let count = 0; //THIS IS PART OF RENDERING FUNCTION; SHD BE OK TO DO
      count++;
      return <div>Message {count} </div>
      }

-STRICT MODE

- EACH COMP FUNCTION IS CALLED TWICE, FIRST TIME TO THROW ANY ERRORS
- SECOND TIME FOR RENDERING
  -Strict mode is only for dev and not for production
- in production it will render only once
- UPDATING OBJECTS
  -- you need a brand new object to update state value
  -- you can use spread operator ... on old object and say set price new value

  - create new object
  - const handleClick() {
    const newDrink = {}

    setDrink(newDrink)

  }

  //use Immer lib to simplify component update logic
  //npm install immer

  -SHARE STATE BETWEEN COMPONENTS
  -- like shopping cart individual list and count of items in cart above in nav bar
  -- they have to share count state between

  -- App NavBar
  -- App - Cart
  -- App can share state with NavBar and Cart using props

  --REMEMBER THE COMPONENT WHICH IS HOLDING THE STATE IS THE ONE RESPONSIBLE FOR UPDATING IT
  -- IF App component holds count state, when Cart is cleared, Cart component will not update count inside it but pass the message back to App component
  -- inside App component clear cart items count and that should reflect in NavBar also

  Expandable Text Component

  #React FORM Handling

  - Reack Hook Forms
  - Zod for data validation

-- use handleSubmit as separate function
-- useRef - used to reference DOM element

-- useRef init to null all the time
-- form values as object

#From lesson - Controlled Components
--get another way of form input values instead of useRef;
-- use State Hook useState - Ramki: neither useRef or useState, switch to React Hook Form

-FORM - handle React Hook Form

-Zod is schema based validation - trending lately
npm install zod

#Effect Hook

- React components should be pure functions props --->Component(purei function) ----> JSX
- for same input (i.e. props) Component should always return same JSX
- side effects
- to keep component pure, we have to keep any code that changes (side effects) outside render phase
- SIDE EFFECTS
  -- store data in local storage
  -- call server to fetch/save data
  -- manually modify DOM element
  none of the above is direct rendering - they are non-rendering actions but required in your app
  -Effect Hook: tell React to execute a piece od code after a component is rendered
- lets say we want to focus on input field ater it is rendered

-useEffect - dependencies passed as array param
--reset of useEffect
-- mount and un-mouting of components by react (useEffect)

FETCH Data:
jsonplaceholder.typicode.com
npm install axios

axios makes http requests to server
https://jsonplaceholder.typicode.com/

- Deleting Data
  -- convert the user list received as a list-group object with bootstrap for list-group
  -- add a delete button for each list item
- to have the delete button formatted properly, add a flex styling for each list-group-item
  --
