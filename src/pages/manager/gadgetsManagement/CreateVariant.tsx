/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Form, Input, Row, Skeleton } from "antd";
import { Controller, FieldValues, } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateGadgetMutation,
  useSingleProductQuery,
} from "../../../redux/features/product/productApi";
import { useNavigate, useParams } from "react-router-dom";
import CreateForm from "../../../components/createGadgetForm/CreateForm";
import CreateInput from "../../../components/createGadgetForm/CreateInput";
import SelectInput from "../../../components/createGadgetForm/SelectInput";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const CreateVariant = () => {
  // const { register, handleSubmit } = useForm();

  const { gadgetId } = useParams();
  const { data: { data: product } = {}, isLoading } =
    useSingleProductQuery(gadgetId);
    const User = useAppSelector(selectCurrentUser);
  const [DuplicateVariant] = useCreateGadgetMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton active />;
  }

  const defaultValues = {
    product_name: product?.name,
    price: product?.price,
    quantity: product?.quantity,
    brand: product?.brand,
    model_number: product?.model_number,
    category: product?.category,
    operating_system: product?.operating_system,
    connectivity: product?.connectivity,
    power_source: product?.power_source,
    features: product?.features
  };



  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating variant!");

    try {
      const updateInfo = {
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
        release_date: new Date(),
        image: data.image,
        user: User?.userId,
        userId: User?.userId,
      };

      console.log(updateInfo)
      
      const formData = new FormData();

      formData.append("data", JSON.stringify(updateInfo));
      formData.append("file", data.image);

      const res = await DuplicateVariant(formData).unwrap();
      if (res.success) {
        toast.success("Variant create successful!", {
          id: toastId,
          duration: 2000,
        });
        navigate(`/${User!.role}/all-gadgets`)
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
      <h1 className="text-center">Create a New Variant Electronics Gadget</h1>
      <hr />
      <CreateForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Row>
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <CreateInput
            // defaultValue={product?.name}
              type="text"
              name="product_name"
              label="Product Name"
              placeholder="Product Name"
            />
          </Col>
          <Col className="colFile" span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Controller
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item label="Picture">
                  <Input
                    type="file"
                    value={value?.fileName}
                    {...field}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <CreateInput
              type="number"
              name="price"
              label="Price"
              placeholder="Price"
            />
          </Col>
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <CreateInput
              type="number"
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
            />
          </Col>
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <CreateInput
              type="text"
              name="features"
              label="Features"
              placeholder="Features"
            />
          </Col>
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <CreateInput
              type="text"
              name="model_number"
              label="Model Number"
              placeholder="Model Number"
            />
          </Col>
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
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

          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
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
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
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
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
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
          <Col
            className="colInput"
            span={24}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
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
        <Button htmlType="submit">Create Variant</Button>
      </CreateForm>
    </div>
  );
};

export default CreateVariant;
