/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Table,
    Skeleton,
    Badge,
  } from "antd";
  import { useAllGadgetQuery } from "../../../redux/features/product/productApi";
  import { SerializedError } from "@reduxjs/toolkit";
  import React, { useState } from "react";
  import type { TableColumnsType } from "antd";
  import { TGadget } from "../../../types/types";
  import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
  
  import {
    selectCart,
    setCart,
  } from "../../../redux/features/product/productSlice";
  import {
    ShoppingCartOutlined,
  } from "@ant-design/icons";
  import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
  
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  
  const SaleMyGadgets = () => {
    const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
    const [searchQuery, setSearchQuery] = useState<string>("");
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const User = useAppSelector(selectCurrentUser);

    // console.log(cart)
    // console.log(allGadgets)

    const userFilteredData = (cart).filter((item: TGadget | null) => {
        return item && item.userId === User!.userId;
      });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };

    const filteredData = allGadgets?.data?.filter((item: TGadget) => {
      const searchString = Object.values(item)
        .filter((value) => typeof value === "string")
        .join(" ")
        .toLowerCase();
      return searchString.includes(searchQuery.toLowerCase()) && !item.isDeleted && item.userId === User?.userId && item.quantity > 0;
    });
  

  
    const ids: TGadget[] = [];
  
    userFilteredData.map((item: any) => ids.push(item._id));
  
    const handleAddCart = async (record: any) => {
      dispatch(setCart(record));
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
      <section style={{ border: "1px solid gray", background: '#f0f0f0' }}>
        <h1 className="text-center">Sales Electronics Gadget</h1>
        <hr />
        <div
          className=""
          style={{
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            className="rounded"
            style={{ paddingLeft: "5px", width: "20%", border: "1px solid gray" }}
            type="search"
            id="name"
            placeholder="Search gadgets"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="p-2 mr-2">
            <Link to="/user/checkout">
              <Badge count={userFilteredData?.length}>
                <ShoppingCartOutlined
                  style={{ fontSize: "26px", color: "#0063cc" }}
                />
              </Badge>
            </Link>
          </div>
        </div>
        <Table columns={columns} dataSource={filteredData}  scroll={{ x: 1500, y: 300 }} />
      </section>
    );
  };
  
  export default SaleMyGadgets;
  