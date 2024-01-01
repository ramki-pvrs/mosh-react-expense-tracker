# mosh-react-expense-tracker

- Component - React JS Function which returns mark-up
  -- being function, takes params called props, passed through interface - from calling component(parent)

#SETUP

- node latest (16 and above)
- VS Code
  -- install prettier extension
  -- VS Code - File - Preferences - Settings - User - search for "format on save"
  -- Mosh theme = https://vscodethemes.com/e/juliettepretot.lucy-vscode/lucy?language=javascript
  -- install
  -- VS Code extension ES7+ React/Redux/.. plugin
  -- open new component.tsx file and type rafce - you get the code snippet
  -- you can use "rafce" cmd + tab to get code gen for you for a component (but not much useful for function based component struct; lot of edits)

- goto github and create new repo
- git clone it to local and cd to that dir
- git init
- (assuming npm and node is installed)
- npm create vite
  --check package.json - react and react-dom are two dependencies installed by default
- npm install bootstrap react-hook-form react-icons styled-components @types/styled-components zod
  -- zod is for schema validation (form input from user)

- A component template
  -- import statements
  -- interface object (component parameters)
  -- component (function)
  -- with destructured params pointing to interface
  -- inside may be State vars
  -- HTML element inside fragment block <> </>
  -- export default componentName;

#Expense List
-create expense-tracker dir under src
--create components sub-dir
--create ExpenseList.tsx file in components
