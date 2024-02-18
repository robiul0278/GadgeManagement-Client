/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { removeItemFromCart, selectCart } from "../../../redux/features/product/productSlice";
import { TGadget } from "../../../types/types";
import { toast } from "sonner";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";
import { FieldValues } from "react-hook-form";
// import { useUpdateGadgetMutation } from "../../../redux/features/product/productApi";
import { useEffect, useState } from "react";
import CreateForm from "../../../components/createGadgetForm/CreateForm";
import CreateInput from "../../../components/createGadgetForm/CreateInput";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const UserCheckOut = () => {
  const cart = useAppSelector(selectCart);
  const User = useAppSelector(selectCurrentUser);
  const [CreateSales] = useCreateSalesMutation();

  // const [UpdateQuantity] = useUpdateGadgetMutation();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const numbers = Object.values(quantities);
  const quantity = numbers.reduce((total, num) => total + num, 0);

  const userFilteredData = cart.filter((item: TGadget | null) => {
    return item && item.userId === User!.userId;
  });

  const dispatch = useAppDispatch();
  const handleRemoveItem = (productId: string) => {
    // Dispatch the removeItemFromCart action when the button is clicked
    dispatch(removeItemFromCart({ id: productId }));
  };

  // Calculate initial total amount based on default quantities and item prices
  useEffect(() => {
    const initialTotalAmount = cart?.reduce((total, item: TGadget) => {
      const defaultQuantity = 1; // You can set the default quantity here
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item._id]: defaultQuantity,
      }));
      return Math.floor(total + item.price * defaultQuantity);
    }, 0);
    setTotalAmount(initialTotalAmount);
  }, [cart]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // Update the quantities state
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // React hook form
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Sale gadgets!");

    try {
      const saleInfo = {
        name: data.buyer_name,
        contact_number: Number(data.contact_number),
        email: data.email,
        date: new Date(),
        address: data.address,
        postal_code: Number(data.postal_code),
        total_amounts: totalAmount,
        quantity: quantity,
        user: User?.userId,
        userId: User?.userId,
      };

      const res = await CreateSales(saleInfo).unwrap();
      if (res.success) {
        toast.success("Sales successful!", { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error(`Something went wrong! ${error?.data?.message} !`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row className="" style={{}}>
      <Col span={24} xl={{span: 16}}>
        <div className="rounded p-5" style={{}}>
          <h1 className="text-center">Sale Electronics Gadget</h1>
          <hr />
          <CreateForm onSubmit={onSubmit}>
            <Row>
              <Col
                className="colInput"
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <CreateInput
                  type="text"
                  name="buyer_name"
                  label="Buyer Name"
                  placeholder="Buyer Name"
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
                  name="contact_number"
                  label="Contact Number"
                  placeholder="Contact Number"
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
                  name="email"
                  label="Buyer Email"
                  placeholder="Email"
                />
              </Col>
              <Col
                className="colInput"
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <CreateInput type="date" name="sale_date" label="Sale Date" />
              </Col>
              <Col
                className="colInput"
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <CreateInput
                  type="text"
                  name="address"
                  label="Address"
                  placeholder="Address"
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
                  name="postal_code"
                  label="Postal Code"
                  placeholder="Postal Code"
                />
              </Col>
            </Row>
            <Button htmlType="submit">Sale Gadget</Button>
          </CreateForm>
        </div>
      </Col>
      <Col
        className="shadow rounded p-5"
        style={{ border: "1px solid gray" }}
        span={24} xl={{span: 8}}
      >
        {userFilteredData?.map((item: TGadget) => (
          <div
            key={item._id}
            className="p-3 mt-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              // alignContent: "center",
              alignItems: "center",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
          >
            <Col span={10}>
              <img
                style={{ width: 100, borderRadius: "5px" }}
                alt="gadget image"
                src={item?.image}
              />
            </Col>
            <Col span={10}>
              <h4>Name: {item?.name}</h4>
              <p>Model: {item?.model_number}</p>
              <p>Price: {item?.price} BDT</p>

              <input
                style={{ width: "40px" }}
                type="number"
                value={quantities[item?._id]}
                onChange={(e) => {
                  const newQuantity = +e.target.value;
                  handleQuantityChange(item?._id, newQuantity);
                  // Update the total amount here, and set it in state
                  const updatedTotalAmount =
                    totalAmount +
                    item.price * (newQuantity - (quantities[item._id] || 0));
                  setTotalAmount(updatedTotalAmount);
                }}
                min={1}
              />
            </Col>
            <Button
              type="dashed"
              shape="circle"
              onClick={() => handleRemoveItem(item._id)}
            >
              x
            </Button>
          </div>
        ))}
        <h3>Total Amount = {totalAmount} BDT</h3>
      </Col>
    </Row>
  );
};

export default UserCheckOut;
