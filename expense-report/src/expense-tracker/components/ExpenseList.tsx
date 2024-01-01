//each expense row is one object
//like that you may have multiple expense rows so Expense objects list
//so two interfaces, first one is single expense obj
//second is list of expense object

//WHY Expense, single expense is interface instead of some other type like 'type'
//https://stackoverflow.com/questions/49562569/typed-react-props-as-type-or-an-interface
//Here's some pros for Interface:

//(1) define, more specifically, the shape of objects and their contracts,
//(2) has declaration merging,
//(3) can be implemented by classes, and
//(4) just looks syntactically prettier (imo)
//https://www.reddit.com/r/reactjs/comments/14q6nyr/interface_vs_type_what_should_i_use_in/

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string; //in real-world category will be another object with id and name properties
}

interface Props {
  expenses: Expense[];
  //this is the call-back to delete the expense object from parent component, given id
  //from specific row in this component
  onDelete: (id: number) => void;
}

function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) return null;
  return (
    <table className="table table-border">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          {/*the next th is the one where Delete button will come; leave empty */}
          <th></th>
        </tr>
      </thead>
      {/* In tbody you display expenses of individual items; meaning your data rows */}
      {/* so thats a variable; so you dont want to hard code tbody rows */}
      {/* tbody rows contents are passed as props (function params) */}
      {/* so you need interfaces above this component function definition */}
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              {/*REMEMBER: state change should happen in a component which holds the state */}
              {/*expense state is props here, passed through an interface that means */}
              {/*when user clicks on delete, expense is NOT DELETED in this component but */}
              {/* a call-back function is used to send the message back to parent, may be APP.tsx */}
              {/*to inform so that parent can delete the expense (or pass it further in the chain in the app may be) */}
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td>Total</td>
          {/*We need to calc total dynamically on the footer row;  */}
          {/* in Js arrays (objects) has reduce method, you pass an array to reduce and can handle sum of all expenses from there*/}
          {/* reduce method has arry function with 2 params; acc for accumulator and individual item; */}
          {/* 0 is default for accumulate which we need to pass */}
          <td>
            $
            {expenses
              .reduce((acc, expense) => expense.amount + acc, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default ExpenseList;
