import { useFieldArray, useForm } from "react-hook-form";

type FormData = {
  tasks: { title: string }[];
};

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
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
          key={field.id}
          className="p-5 bg-amber-100 flex gap-4 items-center"
        >
          <input
            {...register(`tasks.${index}.title`, {
              required: "Task title is required",
            })}
            className="border px-4 py-2 text-sm"
          />
          {errors.tasks?.[index]?.title && (
            <p className="text-xs text-rose-600">
              {errors.tasks?.[index]?.title.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => remove(index)}
            className="px-4 py-2 text-sm bg-rose-600 text-white"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={() => append({ title: "" })}
        type="button"
        className="px-4 py-2 text-sm bg-green-600 text-white"
      >
        Add Task
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm bg-neutral-800 text-white"
      >
        Send
      </button>
    </form>
  );
};

export default TaskForm;
