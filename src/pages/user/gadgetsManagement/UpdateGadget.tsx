/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useSingleProductQuery,
} from "../../../redux/features/product/productApi";
import { useParams } from "react-router-dom";

const UpdateGadget = () => {
  const { register ,handleSubmit} = useForm();

    const {id} = useParams();
    const {data:{data: product} = {}, isLoading}  = useSingleProductQuery(id)
    // console.log(product)

    if (isLoading) {
      return toast.loading("Loading gadgets...!");
    }


    const onSubmit = (data: FieldValues) => {
      console.log(data);
    };
  return (
    <div
      className="shadow rounded p-5 w-7xl"
      style={{ border: "1px solid gray" }}
    >
      <h1 className="text-center">Update Electronics Gadget</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="colInput" span={8}>
            <label htmlFor="name">Name</label> <br />
            <input
            className="gInput"
              type="text"
              id="name"
              defaultValue={product?.name}
              {...register("name", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="price">Price</label> <br />
            <input
            className="gInput"
              type="text"
              id="price"
              defaultValue={product?.price}
              {...register("price", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="quantity">Quantity</label><br />
            <input
            className="gInput"
              type="text"
              id="quantity"
              defaultValue={product?.quantity}
              {...register("quantity", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
             <label htmlFor="apple">Select Category</label><br />
            <select className="gInput" id="apple" defaultValue={product?.brand} {...register("brand", { required: true })}>
              <option value="apple">Apple</option>
              <option value="sony">Sony</option>
              <option value="samsung">Samsung</option>
              <option value="logitech">Logitech</option>
              <option value="hyperX">HyperX</option>
            </select>
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="model_number">Model Number</label> <br />
            <input
            className="gInput"
              type="text"
              id="model_number"
              defaultValue={product?.model_number}
              {...register("model_number", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="smartphones">Select Category</label> <br />
            <select className="gInput" id="smartphones" defaultValue={product?.category} {...register("category", { required: true })}>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="earbuds">Earbuds</option>
              <option value="mouse">Mouse</option>
            </select>
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="operating_system">Operating System</label><br />
            <input
            className="gInput"
              type="text"
              id="operating_system"
              defaultValue={product?.operating_system}
              {...register("operating_system", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="connectivity">Connectivity</label><br />
            <input
            className="gInput"
              type="text"
              id="connectivity"
              defaultValue={product?.connectivity}
              {...register("connectivity", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="power_source">Power Source</label><br />
            <input
            className="gInput"
              type="text"
              id="power_source"
              defaultValue={product?.power_source}
              {...register("power_source", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="product_name">Features</label><br />
            <input
            className="gInput"
              type="text"
              id="product_name"
              defaultValue={product?.features}
              {...register("features", { required: true })}
            />
          </Col>
        </Row>
        <Button htmlType="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdateGadget;
