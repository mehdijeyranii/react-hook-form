import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

const SimpleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          {...register("firstName", {
            required: "First Name is required!",
            validate: (value) =>
              value.length > 2 ||
              "First name must be at least 3 characters long",
          })}
          className="border"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          {...register("lastName", {
            required: "Last Name is required!",
            validate: (value) =>
              value.length > 2 ||
              "Last name must be at least 3 characters long",
          })}
          className="border"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
