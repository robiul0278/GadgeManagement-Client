/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Modal, Row, Skeleton, Badge } from "antd";
import { useAllGadgetQuery } from "../../../redux/features/product/productApi";
import { SerializedError } from "@reduxjs/toolkit";
import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { TGadget } from "../../../types/types";
import { useForm } from "react-hook-form";
import { Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCart, setCart } from "../../../redux/features/product/productSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const SaleGadgets = () => {
  const { register } = useForm();
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const cart = useAppSelector(selectCart)
  // console.log(cart.length)
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = allGadgets?.data?.filter((item: TGadget) => {
    const searchString = Object.values(item)
      .filter((value) => typeof value === "string") // Filter only string values
      .join(" ") // Concatenate all string values into a single string
      .toLowerCase(); // Convert to lowercase for case-insensitive search
    return searchString.includes(searchQuery.toLowerCase()) && !item.isDeleted;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [cartItems, setCartItems] = useState<any[]>([]);
  const handleAddCart = async (record: any) => {
    // Check if the product ID is already in the cart
    const isProductIdInCart = cartItems.some((item) => item._id === record._id);

    if (!isProductIdInCart) {
      // If not in the cart, add it
      dispatch(setCart({ cart: record }));
      setCartItems([...cartItems, record]);
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Model_Number",
      dataIndex: "model_number",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Connectivity",
      dataIndex: "connectivity",
    },
    {
      title: "Power_Source",
      dataIndex: "power_source",
    },
    {
      title: "Operating_System",
      dataIndex: "operating_system",
    },
    {
      title: "Features",
      dataIndex: "features",
    },

    {
      title: "Action",
      key: "action",

      render: (_: any, record: any) => (
        <Button
          size="small"
          type="primary"
          onClick={() => handleAddCart(record)}
          disabled={cartItems.some((item) => item._id === record._id)}
        >
          {cartItems.some((item) => item._id === record._id)
            ? "Added to Cart"
            : "Add to Cart"}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    const errorMessage =
      (error as SerializedError).message || "An error occurred.";
    return <p>Error fetching gadgets: {errorMessage}</p>;
  }

  return (
    <>
      <>
        <Modal
          width={600}
          title="Sales Electronics Gadgets"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <hr />
          <form>
            <Row style={{}}>
              <Col className="colInput" span={8}>
                <label htmlFor="name">Buyer Name:</label> <br />
                <input
                  style={{ padding: "10px" }}
                  type="text"
                  id="name"
                  placeholder="Buyer name"
                  {...register("buyer_name", { required: true })}
                />
              </Col>
              <Col className="colInput" span={8}>
                <label htmlFor="price">Quantity:</label> <br />
                <input
                  style={{ padding: "10px" }}
                  type="number"
                  id="price"
                  placeholder="Quantity number"
                  {...register("quantity", { required: true })}
                />
              </Col>
              <Col className="colInput" span={8}>
                <label htmlFor="date">Sale Date:</label>
                <br />
                <input
                  style={{ padding: "9px" }}
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
        </Modal>
      </>
      <h1 className="text-center">Sales Electronics Gadget</h1>
      <hr />
      <div className="" style={{ marginBottom: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
        {/* <label htmlFor="name">Buyer Name:</label> <br /> */}
        <input
          className="rounded"
          style={{ padding: "5px", width: "20%", border: '1px solid gray' }}
          type="search"
          id="name"
          placeholder="Search gadgets"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="p-2 mr-2">
          <a href="#">
            <Badge count={cart.length}>
              <ShoppingCartOutlined
                style={{ fontSize: "26px", color: "#0063cc" }}
              />
            </Badge>
          </a>
        </div>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default SaleGadgets;
