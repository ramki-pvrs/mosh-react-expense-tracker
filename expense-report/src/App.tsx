import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";

function App() {
  const expenses_UNUSED = [
    { id: 1, description: "aaa", amount: 10, category: "Utils" },
    { id: 2, description: "bbb", amount: 20, category: "Utils" },
    { id: 3, description: "ccc", amount: 30, category: "TV" },
    { id: 4, description: "ddd", amount: 40, category: "TV" },
    { id: 5, description: "eee", amount: 50, category: "Mobile" },
  ];

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

  return (
    <div>
      <p> Init </p>
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
