import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { FieldValues, useForm } from "react-hook-form";


const Test = () => {
  const { register, handleSubmit } = useForm();

    const {id} = useParams();
    const {data:{data: product} = {}, isLoading}  = useSingleProductQuery(id)
    console.log(product)

    if (isLoading) {
      return toast.loading("Loading gadgets...!");
    }


    const onSubmit = (data: FieldValues) => {
      console.log(data); // Log form data
      // You can add your login logic here, such as making an API call
    };

  return (

    <div>
    <h2>Login Form</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="username"
          defaultValue={product?.name}
          {...register('username', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          defaultValue={product.price}
          {...register('password', { required: true })}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  );
};

export default Test;
