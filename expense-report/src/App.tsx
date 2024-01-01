import ExpenseList from "./expense-tracker/components/ExpenseList";

function App() {
  const expenses = [
    { id: 1, description: "aaa", amount: 10, category: "Utils" },
    { id: 2, description: "bbb", amount: 20, category: "Utils" },
    { id: 3, description: "ccc", amount: 30, category: "TV" },
    { id: 4, description: "ddd", amount: 40, category: "TV" },
    { id: 5, description: "eee", amount: 50, category: "Mobile" },
  ];
  return (
    <div>
      <p> Init </p>
      <ExpenseList
        expenses={expenses}
        onDelete={(id) => console.log("delete req on expense id=", id)}
      ></ExpenseList>
    </div>
  );
}

export default App;
