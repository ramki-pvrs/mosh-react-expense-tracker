import { useState, useRef, useEffect } from "react";
import axios, { CanceledError } from "axios";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./expense-tracker/components/ProductList";
import { literal } from "zod";

//enable TypeScript to add auto completion to response.data
//by manually addig all keys as atttributes of the object below
//onl

//delete user steps:
//add Delete button in each of the user row (users are just json response from axios.get call)
//when use clicks on Delete button, onClick event calls a callback function deleteUser
//with that line user object
//deleteUser function calls setUsers interface and set the new users by FILTERING OUT
//the user asked to be deleted
//there are two delete types Optimisting and Pessimistic
//Optimistic is update GUI first with filtered out users list assuming
//server persistent api call will be successful (axios.delete call)
//if in case promise is rejected, you have forcefully update GUI again with
//all users + deleted user so that end user knows that delete was not successful
//and no change was made to users list and go for debugging

interface User {
  id: number;
  name: string;
  username: string;
}

function App() {
  const expenses_UNUSED = [
    { id: 1, description: "aaa", amount: 10, category: "Utils" },
    { id: 2, description: "bbb", amount: 20, category: "Utils" },
    { id: 3, description: "ccc", amount: 30, category: "TV" },
    { id: 4, description: "ddd", amount: 40, category: "TV" },
    { id: 5, description: "eee", amount: 50, category: "Mobile" },
  ];

  /*
    useEffect new topic
    Effect hook is to execute piece of code after component is rendered
    lets say there is an input put field and you want to focus on it 
    after it is rendered (may be when user moves the cursor there, will come to that)
    if you just add focus, the component becomes impure
    but if you add focus piece of code insder useEffect function, component is convereted as pure again??
    the ref for focus on input field is a side effect; input field is rendered already
    but when moust moved, focus on it; blue shade around input field
    NOTE: to avoid infinite loop of calling the useEffect, you need to add dependency 
    as param to the useEffect arrow function; [] empty one is for doing the effect once
    after component is rendered
    you can also control it to run the effect after use action on the browse like selecting an item
    similar to useState, useEffect can be called on top component and not inside loops or if condition
    multiple calls of useEffect is possible
    see the document.title below

    useEffect Dependencies: executes after each render, but you have to avoid infinite loop

    */

  const ref = useRef<HTMLInputElement>(null);
  //useEfffect is confusing name, afterRender would have been a more opt name for this hook
  useEffect(() => {
    //Side Effect
    if (ref.current) ref.current.focus();
  });

  useEffect(() => {
    document.title = "Ramki App";
  });

  //state for filtering the whole table with specific category
  //Utils, TV and Mobile are the categories in hard coded list below
  const [selectedCategory, setSelectedCategory] = useState("");

  //for expenses, its the state of the data of all expenses displayed on the Browser
  //so in theory you have to maintain the expenses list as a state
  //so use useState and pass expenses object to it as param
  //useState returns two things, the data variable and a method on it, typically setMethod
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utils" },
    { id: 2, description: "bbb", amount: 20, category: "Utils" },
    { id: 3, description: "ccc", amount: 30, category: "TV" },
    { id: 4, description: "ddd", amount: 40, category: "TV" },
    { id: 5, description: "eee", amount: 50, category: "Mobile" },
  ]);

  let visibleExpenses = selectedCategory
    ? expenses.filter((e: any) => e.category === selectedCategory)
    : expenses;

  if (selectedCategory === "All Categories") {
    visibleExpenses = expenses;
  }
  //check console.log first; convert to setExpense function later
  //<ExpenseForm onSubmit={(data) => console.log(data)}></ExpenseForm>

  const [category, setCategory] = useState("");

  //fetach users from jsonplaceholder using axios
  const [users, setUsers] = useState<User[]>([]);
  //axios returns a promise
  //Promise: an object that holds eventual result or failure of an async operation
  //all promises have a method called then and it takes a callback function
  //callback is executed when promise is resoved and result is ready
  //param is response, or res in short

  //RAMKI NOTES: for delete onClick has a callback function because
  //when you click Delete, the user object shd be used by the deleteUser function
  //which is called later than when passed

  //for createUser you dont need a callback because its a new user getting created when called
  //almost immediately
  //callback is when you want the function to be executed later with parameters passed now

  //create user steps
  //add a single button button.btn.btn-primary.mb-3 called Create User
  //you create manually a new user object in js; in production it could be a form submission
  //or some other event to create a new user
  //Optimisitic creation
  //because you have an interface for Users and setUsers is a method in it
  //call setUsers and combine the new user object and existing users ...users - destructured
  //once GUI is updated, sent POST request with new user object in the body
  //the dummy api end point https://jsonplaceholder.typicode.com/users
  //will send back a new user object
  //but if you click multiple times you get the same user id and name from dummy server
  //so in consolde you will see error for user list item because each list item
  //Warning: Encountered two children with the same key, `0`. Keys should be unique so that components maintain
  //their identity across updates. Non-unique keys may cause children to be duplicated
  //and/or omitted — the behavior is unsupported and could change in a future version.
  //in React is supposed to have a unique id but because its dummy, you get the same id back from server
  //your axios.post promise may be resolved or rejected, based on which .then and .catch
  //code block will handle the logic
  //if resolved successfully, you add the new user object
  //if rejected, you reset the users list to originalUsers in GUI (because Optimisam failed)

  //res is complete response object including headers and status code and status name and all
  //res.data shows only data

  //axios.get<User[]> is the data object fetched are of type User defined above in interface User
  //now res.data[0]. will auto complete to id, name, username
  const [error, setError] = useState("");
  //isLoading and setLoading for spinner
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //user may navigate away from fetch and you should be able to Abort fetch
    //modern browsers give AbortController object
    const controller = new AbortController();

    //axios.get returns a promise
    //if promise is resolved, we get response obj
    //if promise is rejected due to some error, we get error object

    //return controller.abort is part of clean-up/un-subscribe/disconnect kind of functionality
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      }) //Leanne Graham
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);
  //above line firtly was
  //res) => console.log(res.data[0].name)

  const deleteUser = (user: User) => {
    //in case axios.delete promise is rejected (delete failed)
    //in GUI you have to restore the origial users list
    //because we are using Optimisitic delete, that is
    //delete in GUI first and then persist it in server by axios.delete call
    //for that you have to retain the original user list here

    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];

    //dummy new user object; in production it may come from form submission or some other event
    //id 0 here means user is not saved yet and on return from axios.post,
    //server would have generated the id which will be used on successful promise resolution
    const newUser = { id: 0, name: "Ramki S", username: "ramki" };
    //combine newUser to existingUsers and update the users list
    //this is a change in interface which React will recognise and update the GUI

    setUsers([newUser, ...users]);

    //being Optimistice Add User, GUI was already updated with setUsers change
    //now post it to server for persistence
    //newUser in body of post req

    //note new user id is generated in server and send back in response data

    //typically its like .then((res) => setUsers([res.data, ...users]))
    //res.data in this case is returned user object with id, name and username
    //but to be better approach
    //destructure res.data to get only data property and alias it as savedUser
    //because data as word is not explanatory about what it is
    //savedUser alias is good to use
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <div>
      <p> Init </p>
      <>
        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn-btn-primary mb-3" onClick={addUser}>
          Add User
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between"
            >
              {user.name}
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
      <div className="mb-3">
        <input ref={ref} type="text" className="form-control" />
      </div>
      {/* Keep track of selected category in state variable */}
      <select
        className="form-select"
        onChange={(event) => setCategory(event?.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category}></ProductList>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            //you can also use immer for this spread operator to pass into setExpenses
            //expense object has only description, amount and category
            //but the expenses has id for each expense in it, so you need to add it to expense object
            //before inserting into table (dB)
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        ></ExpenseForm>
      </div>

      {/*when you pass id to onDelete, it is inturn passed to setExpenses */}
      {/* for delete, setExpenses, will set the expenses list minus this id passed */}
      {/* using filter method on expenses list object, equivalent to delete operation */}
      {/* may be this filter method may not change the original object; so move setExpenses as separate function */}
      {/* and deal with complexities later */}
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(visibleExpenses.filter((e: any) => e.id !== id))
        }
      ></ExpenseList>
    </div>
  );
}

//

//onDelete={(id) => console.log("delete req on expense id=", id)}

export default App;
