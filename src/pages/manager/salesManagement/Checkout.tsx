/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCart } from "../../../redux/features/product/productSlice";
import { TGadget } from "../../../types/types";
import { toast } from "sonner";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";
import { FieldValues, useForm } from "react-hook-form";
// import { useUpdateGadgetMutation } from "../../../redux/features/product/productApi";
import { useEffect, useState } from "react";
// import { useSingleProductQuery, useUpdateGadgetMutation } from "../../../redux/features/product/productApi";

const CheckOut = () => {
  const cart = useAppSelector(selectCart);
  const [CreateSales] = useCreateSalesMutation();
  // const [UpdateQuantity] = useUpdateGadgetMutation();
  const { register, handleSubmit, reset } = useForm();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Calculate initial total amount based on default quantities and item prices
  useEffect(() => {
    const initialTotalAmount = cart.reduce((total, item: TGadget) => {
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

    // Calculate the total amount based on individual item prices and quantities
    const updatedTotalAmount = cart.reduce((total, item: TGadget) => {
      const itemQuantity = quantities[item._id] || 0;
      return total + item.price * itemQuantity;
    }, 0);
    setTotalAmount(updatedTotalAmount);
  };


// React hook form 
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Sale gadgets!");

    try {
      const saleInfo = {
        name: data.buyer_name,
        contact_number: Number(data.contact_number),
        date: new Date(),
        total_price: totalAmount,
      };
      console.log(saleInfo);

      const response = await CreateSales(saleInfo).unwrap();

      console.log(response);
      toast.success("Sales successful!", { id: toastId, duration: 2000 });
      reset();
    } catch (error: any) {
      console.log();
      toast.error(`Something went wrong! ${error?.data?.message} !`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row className="" style={{}}>
      <Col span={16}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row style={{}}>
              <Col className="colInput" span={8}>
                <label htmlFor="name">Buyer Name:</label> <br />
                <input
                  style={{
                    padding: "8px",
                    border: "2px solid gray",
                    borderRadius: "5px",
                  }}
                  type="text"
                  id="name"
                  placeholder="Buyer name"
                  {...register("buyer_name", { required: true })}
                />
              </Col>
              <Col className="colInput" span={8}>
                <label htmlFor="name">Contact Number:</label> <br />
                <input
                  style={{
                    padding: "8px",
                    border: "2px solid gray",
                    borderRadius: "5px",
                  }}
                  type="number"
                  id="name"
                  placeholder="number"
                  {...register("contact_number", { required: true })}
                />
              </Col>
              <Col className="colInput" span={8}>
                <label htmlFor="date">Sale Date:</label>
                <br />
                <input
                  style={{
                    padding: "8px",
                    border: "2px solid gray",
                    borderRadius: "5px",
                  }}
                  type="date"
                  id="date"
                  {...register("sale_date", { required: true })}
                />
              </Col>
            </Row>
            <Button className="mt-5" htmlType="submit">
              Sale Product
            </Button>
          </form>
        </div>
      </Col>
      <Col span={8}>
        {cart.map((item: TGadget) => (
          <div
            key={item._id}
            className="p-3 mt-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
          >
            <Col span={10}>
              <img style={{ width: 100 }} alt="gadget image" src={item.image} />
            </Col>
            <Col span={10}>
              <h4>Name: {item.name}</h4>
              <p>Model: {item.model_number}</p>
              <p>Price: {item.price} BDT</p>

              <input
                style={{ width: "40px" }}
                type="number"
                value={quantities[item._id]}
                onChange={(e) => {
                  const newQuantity = +e.target.value;
                  handleQuantityChange(item._id, newQuantity);
                  // Update the total amount here, and set it in state
                  const updatedTotalAmount =
                    totalAmount +
                    item.price * (newQuantity - (quantities[item._id] || 0));
                  setTotalAmount(updatedTotalAmount);
                }}
                min={1}
              />
            </Col>
          </div>
        ))}
        <h3>Total Amount: {totalAmount} BDT</h3>
      </Col>
    </Row>
  );
};

export default CheckOut;
