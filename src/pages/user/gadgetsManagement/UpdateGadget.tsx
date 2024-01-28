/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row, Skeleton } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useSingleProductQuery, useUpdateGadgetMutation,
} from "../../../redux/features/product/productApi";
import { useParams } from "react-router-dom";

const UpdateGadget = () => {
  const { register ,handleSubmit} = useForm();

    const {gadgetId} = useParams();
    const {data:{data: product} = {}, isLoading}  = useSingleProductQuery(gadgetId)
    const [UpdateGadget] = useUpdateGadgetMutation()
    // console.log(product)

    if (isLoading) {
      return <Skeleton active />;
    }
    const onSubmit = async (data: FieldValues) => {
      const toastId = toast.loading("Updating user!");
  
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

        // console.log(updateInfo)


        const res = await UpdateGadget({data: updateInfo, id: gadgetId}).unwrap();
        console.log(res.data)
        if(res.success){
          toast.success("Gadget Update successful!", { id: toastId, duration: 2000 });
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
      <h1 className="text-center">Update Electronics Gadget</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="colInput" span={8}>
            <label htmlFor="name">Product Name</label> <br />
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
            <label htmlFor="product_name">Features</label><br />
            <input
            className="gInput"
              type="text"
              id="product_name"
              defaultValue={product?.features}
              {...register("features", { required: true })}
            />
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
             <label htmlFor="brand">Select Brand</label><br />
            <select className="gInput" id="brand" defaultValue={product?.brand} {...register("brand", { required: true })}>
              <option value="apple">Apple</option>
              <option value="sony">Sony</option>
              <option value="samsung">Samsung</option>
              <option value="logitech">Logitech</option>
              <option value="hyperX">HyperX</option>
            </select>
          </Col>

          <Col className="colInput" span={8}>
            <label htmlFor="category">Select Category</label> <br />
            <select className="gInput" id="category" defaultValue={product?.category} {...register("category", { required: true })}>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="camera">Camera</option>
              <option value="tablets">Tablets</option>
            </select>
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="operating_system">Operating System</label> <br />
            <select className="gInput" id="operating_system" defaultValue={product?.operating_system} {...register("operating_system", { required: true })}>
              <option value="windows">Windows</option>
              <option value="android">Android</option>
              <option value="iOS">ios</option>
            </select>
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="connectivity">Connectivity</label> <br />
            <select className="gInput" id="connectivity"   defaultValue={product?.connectivity} {...register("connectivity", { required: true })}>
              <option value="wi-fi">Wi-Fi</option>
              <option value="bluetooth">Bluetooth</option>
              <option value="usb">USB</option>
            </select>
          </Col>
          <Col className="colInput" span={8}>
            <label htmlFor="power_source">Power Source</label> <br />
            <select className="gInput" id="power_source"   defaultValue={product?.power_source} {...register("power_source", { required: true })}>
              <option value="battery-powered">Battery-powered</option>
              <option value="plug-in">Plug-in</option>
            </select>
          </Col>

        </Row>
        <Button htmlType="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdateGadget;
