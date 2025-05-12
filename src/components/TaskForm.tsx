import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  tasks: yup
    .array()
    .of(
      yup.object({
        title: yup.string().required("Task title is required"),
      })
    )
    .min(1, "At least one task is required")
    .required("Tasks are required"),
});

type FormData = yup.InferType<typeof schema>;

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tasks: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div
          className="flex gap-2 items-center p-5 bg-amber-100 my-4"
          key={field.id}
        >
          <input
            {...register(`tasks.${index}.title` as const, {
              required: "Title is required",
            })}
            placeholder={`Task #${index + 1}`}
            className="border px-2 py-1"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-rose-600 text-white px-6 py-2 text-xs"
          >
            Delete
          </button>
          {errors.tasks?.[index]?.title && (
            <p className="text-rose-600 text-xs">
              {errors.tasks[index]?.title?.message}
            </p>
          )}
        </div>
      ))}

      {errors.tasks?.message && (
        <p className="text-rose-600 text-xs">{errors.tasks.message}</p>
      )}

      <button
        type="button"
        onClick={() => append({ title: "" })}
        className="bg-lime-700 text-white px-6 py-2 m-2 ml-0"
      >
        Add Task
      </button>
      <button
        type="submit"
        className="bg-transparent hover:bg-lime-700 hover:text-white transition-all duration-300 px-6 py-2"
      >
        Send
      </button>
    </form>
  );
};

export default TaskForm;
