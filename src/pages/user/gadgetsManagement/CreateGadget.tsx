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
        price: parseFloat(data.price),
        quantity: parseFloat(data.quantity),
        brand: data.brand,
        model_number: data.model_number,
        category: data.category,
        operating_system: data.operating_system,
        connectivity: data.connectivity,
        power_source: data.power_source,
        features: data.features,
        release_date: new Date()
      };

      const res = await CreateGadget(createInfo).unwrap();
      if (res.success) {
        toast.success("Gadget Create successful!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(`Something went wrong! ${error?.data?.message} !`, {
        id: toastId,
        duration: 2000,
      });
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
            <CreateInput
              type="text"
              name="product_name"
              label="Product Name"
              placeholder="Product Name"
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput
              type="number"
              name="price"
              label="Price"
              placeholder="Price"
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput
              type="number"
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput
              type="text"
              name="features"
              label="Features"
              placeholder="Features"
            />
          </Col>
          <Col className="colInput" span={8}>
            <CreateInput
              type="text"
              name="model_number"
              label="Model Number"
              placeholder="Model Number"
            />
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
              type="select"
              name="brand"
              label="Select Brand"
              options={[
                { label: "Apple", value: "apple" },
                { label: "Sony", value: "sony" },
                { label: "Samsung", value: "samsung" },
                { label: "Logitech", value: "logitech" },
                { label: "HyperX", value: "hyperX" },
              ]}
            />
          </Col>

          <Col className="colInput" span={8}>
            <SelectInput
              type="select"
              name="category"
              label="Select Category"
              options={[
                { label: "Smartphones", value: "smartphones" },
                { label: "Laptops", value: "laptops" },
                { label: "Smartwatches", value: "smartwatches" },
                { label: "Tablets", value: "tablets" },
                { label: "Smart TV", value: "smart tv" },
              ]}
            />
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
              type="select"
              name="operating_system"
              label="Operating System"
              options={[
                { label: "IOS", value: "ios" },
                { label: "Android", value: "android" },
                { label: "Windows", value: "windows" },
              ]}
            />
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
              type="select"
              name="connectivity"
              label="Connectivity"
              options={[
                { label: "USB", value: "usb" },
                { label: "Bluetooth", value: "bluetooth" },
                { label: "Wi-Fi", value: "wi-fi" },
              ]}
            />
          </Col>
          <Col className="colInput" span={8}>
            <SelectInput
              type="select"
              name="power_source"
              label="Power Source"
              options={[
                { label: "Plug-in", value: "plug-in" },
                { label: "Battery-powered", value: "battery-powered" },
              ]}
            />
          </Col>
        </Row>
        <Button htmlType="submit">Create</Button>
      </CreateForm>
    </div>
  );
};

export default CreateGadget;
