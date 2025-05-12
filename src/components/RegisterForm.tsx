import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password must match"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^09\d{9}$/, "Phone number must be a valid Iranian mobile number"),
});

type FormData = yup.InferType<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input {...register("fullName")} />
        {errors.fullName && (
          <p className="text-xs text-rose-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && (
          <p className="text-xs text-rose-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="text-xs text-rose-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="text-xs text-rose-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label>Phone</label>
        <input {...register("phone")} />
        {errors.phone && (
          <p className="text-xs text-rose-600">{errors.phone.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
