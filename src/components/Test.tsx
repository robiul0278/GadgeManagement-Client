/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Modal, Row, Skeleton } from "antd";
import { useAllGadgetQuery } from "../../../redux/features/product/productApi";
import { SerializedError } from "@reduxjs/toolkit";
import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { TGadget } from "../../../types/types";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const SaleGadgets = () => {
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});


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
      title: "brand",
      dataIndex: "brand",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "model_number",
      dataIndex: "model_number",
    },
    {
      title: "category",
      dataIndex: "category",
    },
    {
      title: "connectivity",
      dataIndex: "connectivity",
    },
    {
      title: "power_source",
      dataIndex: "power_source",
    },
    {
      title: "operating_system",
      dataIndex: "operating_system",
    },
    {
      title: "features",
      dataIndex: "features",
    },
  ];

  const allData = allGadgets?.data?.reduce((acc: TGadget[], item: TGadget) => {
    if (!item.isDeleted && item.quantity > 0) {
      acc.push({
        key: item._id,
        _id: item._id,
        name: item.name,
        model_number: item.model_number,
        price: item.price,
        brand: item.brand,
        quantity: item.quantity,
        category: item.category,
        operating_system: item.operating_system,
        connectivity: item.connectivity,
        features: item.features,
        power_source: item.power_source,
      });
    }

    return acc;
  }, []);

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
      <h1 className="text-center">Sales Electronics Gadget</h1>
      <hr />
      <div style={{ marginBottom: 10, marginTop: 10 }}>
        <input
        className="rounded"
          style={{ padding: "10px" , width: "26%" ,border: "none"}}
          type="search"
          id="name"
          placeholder="Search Gadgets"
        />
      </div>
      <Table columns={columns} dataSource={allData} />
    </>
  );
};

export default SaleGadgets;
