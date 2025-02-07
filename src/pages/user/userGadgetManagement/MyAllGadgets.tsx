/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row, Skeleton, Space, Table } from "antd";
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
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const MyAllGadgets = () => {
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const User = useAppSelector(selectCurrentUser);

  const [BulkDelete] = useBulkDeleteMutation();
  const [DeleteProduct] = useDeleteMutation();

  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    releaseDateMin: "",
    releaseDateMax: "",
    brand: "",
    category: "",
    operatingSystem: "",
    connectivity: "",
  });

  const handleFilterChange = (e: any) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left"
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
      // fixed: "right",

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
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const filteredData = allGadgets?.data?.filter((item: TGadget) => {
    return (
      (!filters.priceMin || item.price >= parseFloat(filters.priceMin)) &&
      (!filters.priceMax || item.price <= parseFloat(filters.priceMax)) &&
      (!filters.releaseDateMin ||
        item.release_date >= filters.releaseDateMin) &&
      (!filters.releaseDateMax ||
        item.release_date <= filters.releaseDateMax) &&
      (!filters.brand || item.brand === filters.brand) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.operatingSystem ||
        item.operating_system === filters.operatingSystem) &&
      (!filters.connectivity || item.connectivity === filters.connectivity)
    );
  });

  const allData = filteredData?.reduce((acc: TGadget[], item: TGadget) => {
    if (!item.isDeleted && item.quantity > 0 && item.userId === User!.userId) {
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
        operating_system: item.operating_system,
        features: item.features,
        release_date: item.release_date,
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

  const onSelectChange = (newSelectedRowKeys: any) => {
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
      <hr className="mb-3" />
      <Row>
        <Col span={24} xl={{ span: 5 }} className="rounded border mt-2 mr-2" style={{ background: '#f0f0f0' }}>
          <h3 className="text-center">Filtered Your Data</h3>
          <hr />
          <form className="p-2" style={{ marginBottom: 10, marginTop: 10 }}>
            <label className="bold" htmlFor="price">
              Filter by Price Range:
            </label>
            <div className="flex mt-1 mb-2">
              <input
                style={{ width: "140px", padding: "8px" }}
                type="number"
                id="priceMin"
                placeholder="min"
                onChange={handleFilterChange}
              />
              <input
                style={{ width: "140px", padding: "8px" }}
                type="number"
                id="priceMax"
                placeholder="max"
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label className="bold" htmlFor="date">
                Filter Release Date :
              </label>
              <br />
              <label htmlFor="releaseDateMin">Minimum </label>
              <input
                className="mb-2"
                style={{ padding: "8px" }}
                type="date"
                id="releaseDateMin"
                onChange={handleFilterChange}
              />{" "}
              <br />
              <label htmlFor="releaseDateMax">Maximum </label>
              <input
                className="mb-2"
                style={{ padding: "8px" }}
                type="date"
                id="releaseDateMax"
                onChange={handleFilterChange}
              />{" "}
              <br />
            </div>
            <label className="bold" htmlFor="brand">
              Filter by Brand :
            </label>
            <br />
            <select id="brand" onChange={handleFilterChange}>
              <option value="">Select brand</option>
              <option value="samsung">Samsung</option>
              <option value="hyperX">HyperX</option>
              <option value="logitech">Logitech</option>
              <option value="apple">Apple</option>
              <option value="sony">Sony</option>
            </select>
            <label className="bold" htmlFor="category">
              Filter by Category :
            </label>
            <br />
            <select id="category" onChange={handleFilterChange}>
              <option value="">Select category</option>
              <option value="tablets">Tablets</option>
              <option value="smart tv">Smart TV</option>
              <option value="laptops">Laptops</option>
              <option value="smartphones">Smartphones</option>
              <option value="smartwatches">Smartwatches</option>
            </select>
            <label className="bold" htmlFor="operatingSystem">
              Filter by Operating System :
            </label>
            <br />
            <select id="operatingSystem" onChange={handleFilterChange}>
              <option value="">Select operating system</option>
              <option value="windows">Windows</option>
              <option value="android">Android</option>
              <option value="ios">IOS</option>
            </select>
            <label className="bold" htmlFor="connectivity">
              Filter by Connectivity :
            </label>
            <br />
            <select id="connectivity" onChange={handleFilterChange}>
              <option value="">Select connectivity</option>
              <option value="usb-c">USB-C</option>
              <option value="wi-fi">Wi-Fi</option>
              <option value="bluetooth">Bluetooth</option>
            </select>
          </form>
        </Col>
        <Col span={24} xl={{ span: 18 }} className="rounded border p-1 mt-2" style={{ background: '#f0f0f0' }}>
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <Button className="ml-2" type="primary" onClick={handleBulkDelete}>
              Delete
            </Button>
            <span style={{ marginLeft: 8 }}></span>
          </div>
          <Table
          style={{ background: '#f0f0f0' }}
            className=""
            rowSelection={rowSelection}
            columns={columns}
            dataSource={allData}
            scroll={{ x: 1500, y: 300 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default MyAllGadgets;
