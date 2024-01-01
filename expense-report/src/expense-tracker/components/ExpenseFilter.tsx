interface Props {
  onSelectCategory: (category: string) => void;
}

function ExpenseFilter({ onSelectCategory }: Props) {
  return (
    <select
      className="form-select"
      onChange={(event: any) => onSelectCategory(event.target.value)}
    >
      <option value="All Categories">All Categories</option>
      <option value="Utils">Utils</option>
      <option value="TV">TV</option>
      <option value="Mobile">Mobile</option>
    </select>
  );
}

export default ExpenseFilter;
