/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Table,
  Skeleton,
  Badge,
  Row,
  Col,
} from "antd";
import { useAllGadgetQuery } from "../../../redux/features/product/productApi";
import { SerializedError } from "@reduxjs/toolkit";
import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { TGadget } from "../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { selectManagerCart, setmCart } from "../../../redux/features/product/managerCartSlice";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AllSaleMyGadgets = () => {
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectManagerCart);

  // console.log(cart)
  // console.log(allGadgets)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = allGadgets?.data?.filter((item: TGadget) => {
    const searchString = Object.values(item)
      .filter((value) => typeof value === "string")
      .join(" ")
      .toLowerCase();
    return searchString.includes(searchQuery.toLowerCase()) && !item.isDeleted;
  });



  const ids: TGadget[] = [];

  cart.map((item: any) => ids.push(item._id));

  const handleAddCart = async (record: any) => {
    dispatch(setmCart(record));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Model_Number",
      dataIndex: "model_number",
      key: "model_number",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Connectivity",
      dataIndex: "connectivity",
      key: "connectivity",
    },
    {
      title: "Power_Source",
      dataIndex: "power_source",
      key: "power_source",
    },
    {
      title: "Operating_System",
      dataIndex: "operating_system",
      key: "operating_system",
    },
    {
      title: "Features",
      dataIndex: "features",
      key: "features",
    },

    {
      title: "Action",
      key: "action",

      render: (_: any, record: any) => (
        <div>

          <Button
            size="small"
            type="primary"
            onClick={() => handleAddCart(record)}
            disabled={ids.includes(record._id)}
          >
            Add to Cart
          </Button>
        </div>
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
      <div>
        <Row>
        <Col span={24}>
          <h3 className="text-center">
          Sales Electronics Gadget
          </h3>
        </Col>
        </Row>
      </div>
      <hr />
      <div
        className=""
        style={{
          marginBottom: 10,
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
        width={100}
          className="rounded"
          style={{ padding: "5px", width: "20%", border: "1px solid gray" }}
          type="search"
          id="name"
          placeholder="Search gadgets"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="p-2 mr-2">
          <Link to="/manager/checkout1">
            <Badge count={cart?.length}>
              <ShoppingCartOutlined
                style={{ fontSize: "26px", color: "#0063cc" }}
              />
            </Badge>
          </Link>
        </div>
      </div>
      <Table columns={columns} dataSource={filteredData}  scroll={{ x: 1500, y: 300 }}/>
    </>
  );
};

export default AllSaleMyGadgets;
