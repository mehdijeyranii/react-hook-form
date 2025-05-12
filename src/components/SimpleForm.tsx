import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

const SimpleForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input {...register("firstName")} className="border" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input {...register("lastName")} className="border" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
