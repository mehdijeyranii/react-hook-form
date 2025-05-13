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
      tasks: [],
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

      {fields.length === 0 && (
        <p className="w-full p-5 bg-amber-100 text-sm text-slate-800">
          No tasks have been added. Please add at least one task.
        </p>
      )}

      {errors.tasks?.message && (
        <p className="text-rose-600 text-sm mt-1">{errors.tasks.message}</p>
      )}

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
