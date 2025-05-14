import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const signupSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "At least 3 characters"),
  age: yup
    .number()
    .required("Age is required")
    .min(18, "You must be at least 18"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "At least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password must match"),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Please confirm the terms and conditions"),
});

type FormData = yup.InferType<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("💠 User registered:", data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

      <input
        {...register("age")}
        type="number"
        placeholder="Age"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.age?.message}</p>

      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="border p-2 w-full"
      />
      <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("acceptedTerms")} />
        <label>Accept terms and conditions</label>
      </div>
      <p className="text-red-500 text-sm">{errors.acceptedTerms?.message}</p>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
