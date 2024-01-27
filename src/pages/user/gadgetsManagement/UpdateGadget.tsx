/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CreateInput from "../../../components/createGadgetForm/CreateInput";
import { useSingleProductQuery, useUpdateGadgetMutation } from "../../../redux/features/product/productApi";
import SelectInput from "../../../components/createGadgetForm/SelectInput";
import CreateForm from "../../../components/createGadgetForm/CreateForm";
import { useParams } from "react-router-dom";

const UpdateGadget = () => {

    const [UpdateGadget] = useUpdateGadgetMutation();


    const {id} = useParams();
    const {data:{data: product} = {}, isLoading}  = useSingleProductQuery(id)
    // console.log(productById)




    if (isLoading) {
      return toast.loading("Loading gadgets...!");
    }

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Gadget!");

    console.log(data)

    try {

      const updateInfo = {
        name: data.product_name,
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
      const response = await UpdateGadget(updateInfo).unwrap();
      console.log(response);
      toast.success("Register successful!", { id: toastId, duration: 2000 });


    } catch (error: any) {
      console.log(error)
      toast.error(`Something went wrong! ${error?.data?.message} !`, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      className="shadow rounded p-5 w-7xl"
      style={{ border: "1px solid gray" }}
    >
      <h1 className="text-center">Create a New Electronics Gadget</h1>
      <CreateForm onSubmit={onSubmit}>
        <Row>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="product_name" label="Product Name" defaultValue={product?.name} />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="number" name="price" label="Price" defaultValue={product?.price}/>
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="number" name="quantity" label="Quantity" defaultValue={product?.quantity} />
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
            defaultValue={product?.brand}
              type="select"
              name="brand"
              label="Select Brand"
              options={[
                { label: "Apple", value: "Apple" },
                { label: "Sony", value: "Sony" },
                { label: "Samsung", value: "Samsung" },
                { label: "Logitech", value: "Logitech" },
                { label: "HyperX", value: "HyperX" },
              ]}
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="model_number" label="Model Number"  defaultValue={product?.model_number}/>
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
             defaultValue={product?.category}
              type="select"
              name="category"
              label="Select Category"
              options={[
                { label: "Smartphones", value: "Smartphones" },
                { label: "Laptops", value: "Laptops" },
                { label: "Smartwatches", value: "Smartwatches" },
                { label: "Earbuds", value: "Earbuds" },
                { label: "Mouse", value: "Mouse" },
              ]}
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput
             defaultValue={product?.operating_system}
              type="text"
              name="operating_system"
              label="Operating System"
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="connectivity" label="Connectivity"  defaultValue={product?.connectivity}/>
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="power_source" label="Power Source"  defaultValue={product?.power_source}/>
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="features" label="Features"  defaultValue={product?.features}/>
          </Col>
        </Row>
        <Button htmlType="submit">Update</Button>
      </CreateForm>
    </div>
  );
};

export default UpdateGadget;
