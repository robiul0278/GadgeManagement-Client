/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table } from "antd";
import {
  useAllGadgetQuery,
  useBulkDeleteMutation,
  useDeleteMutation,
} from "../../../redux/features/product/productApi";
import { TGadget } from "../../../types/types";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";

import React, { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AllGadgets = () => {
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const [BulkDelete] = useBulkDeleteMutation();
  const [DeleteProduct] = useDeleteMutation();

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
        <Space>
          <Button size="small" type="primary">
            <Link to={`/user/update-gadget/${record._id}`}>Update</Link>
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              // setModalOpen(true);
              handleDelete(record._id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
     await DeleteProduct(id);
    // console.log(res);
  };

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

  // console.log(allGadgets);

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  const handleBulkDelete = async () => {
    const res = await BulkDelete({ ids: selectedRowKeys });
    console.log(res);
  };

  return (
    <>
     <h1 className="text-center">Create a New Electronics Gadget</h1>
      <hr />
      <div style={{ marginBottom: 10, marginTop: 10 }}>
        <Button type="primary" onClick={handleBulkDelete}>
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}></span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={allData}
      />
    </>
  );
};

export default AllGadgets;
