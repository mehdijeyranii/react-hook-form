import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  members: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
      })
    )
    .min(1, "At least one member is required")
    .required("Members are required"),
});

type FormData = yup.InferType<typeof schema>;

const TeamForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      members: [{ name: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = (data: FormData) => {
    console.log("Team Members:", data.members);
  };

  const reversedString = yup.string().test(
    "is-james",
    (d) => `${d} is not james`,
    (value) => value == null || value == "james"
  );

  console.log(reversedString);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
      {fields.map((field, index) => (
        <div className="flex items-center gap-4" key={field.id}>
          <input
            {...register(`members.${index}.name`)}
            placeholder="Member Name"
            className="border px-2 py-1 w-full"
          />
          {errors.members?.[index]?.name && (
            <p className="text-xs text-red-600">
              {errors.members?.[index]?.name.message}
            </p>
          )}

          <input
            {...register(`members.${index}.email`)}
            placeholder="Email Address"
            className="border px-2 py-1 w-full"
          />
          {errors.members?.[index]?.email && (
            <p className="text-xs text-red-600">
              {errors.members?.[index]?.email.message}
            </p>
          )}

          <button
            type="button"
            onClick={() => remove(index)}
            className="px-4 py-2 text-sm bg-yellow-500"
          >
            Delete
          </button>
        </div>
      ))}
      {errors.members?.message && (
        <p className="text-red-600">{errors.members.message}</p>
      )}

      <button
        type="button"
        onClick={() => append({ name: "", email: "" })}
        className="px-4 py-2 bg-blue-500"
      >
        Add New Team
      </button>

      <button type="submit" className="px-4 py-2 bg-neutral-300">
        Send
      </button>
    </form>
  );
};

export default TeamForm;
