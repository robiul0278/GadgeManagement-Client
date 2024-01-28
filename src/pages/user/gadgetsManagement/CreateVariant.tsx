/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row, Skeleton } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    useCreateGadgetMutation,
  useSingleProductQuery
} from "../../../redux/features/product/productApi";
import { useParams } from "react-router-dom";

const CreateVariant = () => {
  const { register ,handleSubmit} = useForm();

    const {gadgetId} = useParams();
    const {data:{data: product} = {}, isLoading}  = useSingleProductQuery(gadgetId)
    const [DuplicateVariant] = useCreateGadgetMutation()
    // console.log(product)

    if (isLoading) {
      return <Skeleton active />;
    }
    const onSubmit = async (data: FieldValues) => {
      const toastId = toast.loading("Creating variant!");
  
      try {

        const updateInfo = {
          name: data.name,
          price:parseFloat(data.price),
          quantity:parseFloat(data.quantity),
          brand:data.brand,
          model_number: data.model_number,
          category: data.category,
          operating_system: data.operating_system,
          connectivity: data.connectivity,
          power_source: data.power_source,
          features: data.features,
        };

        console.log(updateInfo)


        const res = await DuplicateVariant(updateInfo).unwrap();
        console.log(res.data)
        if(res.success){
          toast.success("Gadget create successful!", { id: toastId, duration: 2000 });
        }
      } catch (error: any) {
        console.log()
        toast.error(`Something went wrong! ${error?.data?.message} !`, { id: toastId, duration: 2000 });
       
      }
    };
  return (
    <div
      className="shadow rounded p-5 w-7xl"
      style={{ border: "1px solid gray" }}
    >
      <h1 className="text-center">Create Duplicate Variant Electronics Gadget</h1>
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
             style={{ padding: "10px", marginTop:"8px", width: "335px"  }}
              type="number"
              id="price"
              defaultValue={product?.price}
              {...register("price", { required: true })}
            />
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="quantity">Quantity</label><br />
            <input
             style={{ padding: "10px", marginTop:"8px", width: "335px" }}
              type="number"
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

export default CreateVariant;
