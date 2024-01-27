/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Modal } from "antd";
import { useAllGadgetQuery } from "../../../redux/features/product/productApi";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";

import React, { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { TGadget } from "../../../types/types";
import LoginInput from "../../../components/authForm/LoginInput";
import LoginForm from "../../../components/authForm/LoginForm";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AllSalesGadgets = () => {
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const [saleProductId, setSaleProductId] = useState();
  console.log(saleProductId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

    {
      title: "Action",
      key: "action",

      render: (_: any, record: any) => (
        <Button
          size="small"
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setSaleProductId(record._id);
          }}
        >
          Sale
        </Button>
      ),
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  if (isLoading) {
    return toast.loading("Loading gadgets...!");
  }

  if (error) {
    const errorMessage =
      (error as SerializedError).message || "An error occurred.";
    return <p>Error fetching gadgets: {errorMessage}</p>;
  }

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  const onSubmit = () => {};

  return (
    <>
      <>
        <Modal
          title="Sales Electronics Gadgets"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <LoginForm onSubmit={onSubmit}>
            <div style={{ display: "" }}>
              <LoginInput type="text" name="name" label="Product Name" />
              <LoginInput
                type="text"
                name="quantity"
                label="Product Quantity"
              />
              <LoginInput type="text" name="price" label="Price" />
              <Button htmlType="submit">Submit</Button>
            </div>
          </LoginForm>
        </Modal>
      </>
      <div style={{ marginBottom: 16 }}>
        <LoginForm onSubmit={onSubmit}>
          <div style={{ display: "flex" }}>
            <LoginInput type="text" name="" label="" />
            <Button htmlType="submit">Search</Button>
          </div>
        </LoginForm>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={allData}
      />
    </>
  );
};

export default AllSalesGadgets;
