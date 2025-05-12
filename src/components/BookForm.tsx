import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Book title is required"),
  author: yup.string().required("Author name is required"),
  pages: yup
    .number()
    .typeError("Page must be a number")
    .positive("Page count must be an integer")
    .required("Page count is required"),
  publishedDate: yup
    .date()
    .typeError("Enter a valid date")
    .max(new Date(), "Published date cannot be in the future")
    .required("Published date is required"),
});

type FormData = yup.InferType<typeof schema>;

const BookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    console.log(new Date());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Book Title</label>
        <input {...register("title")} />
        {errors.title && (
          <p className="text-xs text-rose-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label>Author</label>
        <input {...register("author")} />
        {errors.author && (
          <p className="text-xs text-rose-600">{errors.author.message}</p>
        )}
      </div>
      <div>
        <label>Pages</label>
        <input {...register("pages")} />
        {errors.pages && (
          <p className="text-xs text-rose-600">{errors.pages.message}</p>
        )}
      </div>
      <div>
        <label>Published Date</label>
        <input {...register("publishedDate")} />
        {errors.publishedDate && (
          <p className="text-xs text-rose-600">
            {errors.publishedDate.message}
          </p>
        )}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2">
        Submit
      </button>
    </form>
  );
};

export default BookForm;
