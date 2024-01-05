import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

//obSubmit: takes data of type ExenseFormData and returns void
interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

//.mb-3>label.form-labl+input.form-control and tab
//for select list error message object is slighly different, errorMap is required with arrow function
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Min 3 chars expected" })
    .max(30, { message: "Max 30 chars expected" }),
  amount: z
    .number({ invalid_type_error: "Amout is required!" })
    .min(1)
    .max(100_000),

  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required!" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;
//reset form is key word, you have to use only reset; resetForm for example will not work
function ExpenseForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-labl"></label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-labl"></label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label"></label>
        <select {...register("category")} id="category" className="form-select">
          <option value="">All Categories</option>
          {categories.map((category: any) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ExpenseForm;
