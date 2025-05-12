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
