/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CreateInput from "../../../components/createGadgetForm/CreateInput";
import { useCreateGadgetMutation } from "../../../redux/features/product/productApi";
import SelectInput from "../../../components/createGadgetForm/SelectInput";
import CreateForm from "../../../components/createGadgetForm/CreateForm";

const CreateGadget = () => {
  const [CreateGadget] = useCreateGadgetMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data)
    const toastId = toast.loading("Creating Gadget!");

    try {

      const createInfo = {
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

      const res = await CreateGadget(createInfo).unwrap();
      if (res.success) {
      toast.success("Gadget Create successful!", { id: toastId, duration: 2000 });
      }
     
    } catch (error: any) {
      toast.error(`Something went wrong! ${error?.data?.message} !`, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      className="shadow rounded p-5 w-7xl"
      style={{ border: "1px solid gray" }}
    >
      <h1 className="text-center">Create a New Electronics Gadget</h1>
      <hr />
      <CreateForm onSubmit={onSubmit}>
        <Row>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="product_name" label="Product Name" placeholder="Product Name"/>
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="number" name="price" label="Price" placeholder="Price" />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="number" name="quantity" label="Quantity" placeholder="Quantity"/>
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
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
            <CreateInput type="text" name="model_number" label="Model Number" placeholder="Model Number" />
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
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
              type="text"
              name="operating_system"
              label="Operating System"
              placeholder="Operating System"
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="connectivity" label="Connectivity" placeholder="Connectivity"/>
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="power_source" label="Power Source" placeholder="Power Source"/>
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput type="text" name="features" label="Features" placeholder="Features"/>
          </Col>
        </Row>
        <Button htmlType="submit">Create</Button>
      </CreateForm>
    </div>
  );
};

export default CreateGadget;
