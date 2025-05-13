import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const nestedFormSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  addresses: yup
    .array()
    .of(
      yup.object({
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        zipCode: yup
          .number()
          .required("Zip code is required")
          .typeError("Zip code must be a number"),
      })
    )
    .min(1, "At least one address is required")
    .required("Addresses are required"),
});

type FormData = yup.InferType<typeof nestedFormSchema>;
const NestedForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(nestedFormSchema),
    defaultValues: {
      addresses: [{ street: "", city: "", zipCode: 12345 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input
        {...register("name")}
        placeholder="Full Name"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>

      <input
        {...register("email")}
        placeholder="Email Address"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <div>
        <h3 className="font-semibold text-lg">Addresses</h3>
        {fields.map((field, index) => (
          <div className="space-y-2 mb-4" key={field.id}>
            <input
              {...register(`addresses.${index}.street`)}
              placeholder="Street"
              className="border p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.addresses?.[index]?.street?.message}
            </p>

            <input
              {...register(`addresses.${index}.city`)}
              placeholder="City"
              className="border p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.addresses?.[index]?.city?.message}
            </p>
            <input
              type="number"
              {...register(`addresses.${index}.zipCode`)}
              placeholder="Zip Code"
              className="border p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.addresses?.[index]?.zipCode?.message}
            </p>

            <button
              type="button"
              onClick={() => remove(index)}
              className="px-4 py-2 text-sm bg-red-600 text-white"
            >
              Remove Address
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ street: "", city: "", zipCode: +"" })}
          className="px-4 py-2 bg-green-600 text-white cursor-pointer"
        >
          Add New Address
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-neutral-900 text-white cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default NestedForm;
