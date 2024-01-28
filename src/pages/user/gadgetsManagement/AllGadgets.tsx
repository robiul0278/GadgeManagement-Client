/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button,Skeleton, Space, Table } from "antd";
import {
  useAllGadgetQuery,
  useBulkDeleteMutation,
  useDeleteMutation,
} from "../../../redux/features/product/productApi";
import { TGadget } from "../../../types/types";
import { SerializedError } from "@reduxjs/toolkit";
import React, { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Model Number",
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
      title: "Power Source",
      dataIndex: "power_source",
    },
    {
      title: "Operating System",
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
        <Space>
          <Button size="small" type="dashed">
            <Link to={`/user/update-gadget/${record._id}`}>
              <EditOutlined />
            </Link>
          </Button>
          <Button size="small" type="dashed">
            <Link to={`/user/duplicate-gadget/${record._id}`}>
              <CopyOutlined />
            </Link>
          </Button>
          <Button
            size="small"
            type="dashed"
            onClick={() => {
              // setModalOpen(true);
              handleDelete(record._id);
            }}
          >
            <DeleteOutlined />
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
        price: item.price,
        brand: item.brand,
        quantity: item.quantity,
        model_number: item.model_number,
        category: item.category,
        connectivity: item.connectivity,
        power_source: item.power_source,
        operating_system: item.operating_system,
        features: item.features,
      });
    }

    return acc;
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  if (isLoading) {
    return <Skeleton active />;
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
      <h1 className="text-center">All Electronics Gadgets</h1>
      <hr />
      <div style={{ display: "flex" }}>
        <div className="shadow rounded mt-2 mb-2" style={{ width: "300px" }}>
          <h3 className="text-center">Filtered Your Data</h3>
          <hr />
          <form className="p-2" style={{ marginBottom: 10, marginTop: 10 }}>
            <label htmlFor="price">Price Range</label>
            <div className="flex mt-1 mb-2">
              <input
                style={{ width: "140px", padding: "8px" }}
                type="number"
                id="price"
                placeholder="min"
              />
              <input
                style={{ width: "140px", padding: "8px" }}
                type="number"
                id="price"
                placeholder="max"
              />
            </div>
            <label htmlFor="date">release Date</label>
            <br />
            <input className="mb-2" style={{ padding: "8px", width:"280px" }} type="date" id="date" /> <br />
            <label htmlFor="samsung">Filter by Brand</label>
            <br />
            <select id="samsung">
              <option selected >select brand</option>
              <option value="samsung">Samsung</option>
              <option  value="hyperX">HyperX</option>
              <option value="logitech">Logitech</option>
              <option value="apple">Apple</option>
              <option value="sony">Sony</option>
            </select>
            <label htmlFor="mouse">Filter by Category</label>
            <br />
            <select id="mouse">
              <option selected >select category</option>
              <option value="Mouse">Mouse</option>
              <option value="Earbuds">Earbuds</option>
              <option value="Laptops">Laptops</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Smartwatches">Smartwatches</option>
            </select>
            <label htmlFor="windows">Filter by Operating System</label>
            <br />
            <select id="windows">
              <option selected>select operating system</option>
              <option value="Windows">Windows</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
            </select>
            <label htmlFor="bluetooth">Filter by Connectivity</label>
            <br />
            <select id="bluetooth">
              <option selected>select connectivity</option>
              <option value="USB-C">USB-C</option>
              <option value="Wi-Fi">Wi-Fi</option>
              <option value="bluetooth">Bluetooth</option>
            </select>
          </form>
        </div>
        <div className="shadow rounded m-2">
          <div className="m-5" style={{ marginBottom: 10, marginTop: 10 }}>
            <Button type="primary" onClick={handleBulkDelete}>
              Delete
            </Button>
            <span style={{ marginLeft: 8 }}></span>
          </div>
          <Table
            className="m-5"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={allData}
          />
        </div>
      </div>
    </>
  );
};

export default AllGadgets;
