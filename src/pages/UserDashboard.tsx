import { Card, Col, Row, Skeleton } from "antd";
import { useAllGadgetQuery } from "../redux/features/product/productApi";
import { useAllSalesQuery } from "../redux/features/sales/salesApi";
import { TGadget, TSales } from "../types/types";
import { SerializedError } from "@reduxjs/toolkit";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const UserDashboard = () => {
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const { data: allHistory } = useAllSalesQuery({});
  const User = useAppSelector(selectCurrentUser);

  // console.log(allGadgets?.data.length)
  const filteredData = allGadgets?.data?.filter((item: TGadget) => {
    return !item.isDeleted && item.quantity > 0 && item.userId === User!.userId;
  });
  const totalSale = allHistory?.data?.filter((item: TGadget) => {
    return item.quantity > 0 && item.userId === User!.userId;
  });

  const totalPrice = (totalSale || []).reduce(
    (accumulator: number, item: TSales | null) => {
      // Check if item is not null or undefined before accessing its properties
      if (
        item &&
        item.total_amounts !== undefined &&
        item.quantity !== undefined
      ) {
        const sum = item.total_amounts * item.quantity;
        return accumulator + sum;
      } else {
        return accumulator; // If item is null or properties are undefined, just return the current accumulator
      }
    },
    0
  );

  const totalQuantity = (totalSale || []).reduce(
    (accumulator: number, item: TSales | null) => {
      // Check if item is not null or undefined before accessing its properties
      if (item && item.quantity !== undefined) {
        return accumulator + item.quantity;
      } else {
        return accumulator; // If item is null or quantity is undefined, just return the current accumulator
      }
    },
    0
  ); // 0 is the initial value for the accumulator

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    const errorMessage =
      (error as SerializedError).message || "An error occurred.";
    return <p>Error fetching gadgets: {errorMessage}</p>;
  }
  return (
    <Row gutter={65} style={{ textAlign: "center" }}>
      <Col span={24} lg={{ span: 6 }}>
        <Card title="Total Electronic Gadgets" bordered={false} headStyle={{ background: 'lightgray' }} style={{ background: '#f0f0f0' }}>
          <h1 style={{ textAlign: "center" }}>{filteredData?.length}</h1>
        </Card>
      </Col>
      <Col span={24} lg={{ span: 6 }}>
        <Card title="Total Sale Gadgets" bordered={false}  headStyle={{ background: 'lightgray' }} style={{ background: '#f0f0f0' }}>
          <h1 style={{ textAlign: "center" }}>{totalSale?.length}</h1>
        </Card>
      </Col>
      <Col span={24} lg={{ span: 6 }}>
        <Card title="Total Sale Quantity" bordered={false}  headStyle={{ background: 'lightgray' }} style={{ background: '#f0f0f0' }}>
          <h1 style={{ textAlign: "center" }}>{totalQuantity}</h1>
        </Card>
      </Col>
      <Col span={24} lg={{ span: 6 }}>
        <Card title="Total Sale Amounts" bordered={false}  headStyle={{ background: 'lightgray' }} style={{ background: '#f0f0f0' }}>
          <h1 style={{ textAlign: "center" }}>{totalPrice}</h1>
        </Card>
      </Col>
    </Row>
  )
}

export default UserDashboard