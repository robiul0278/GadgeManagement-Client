/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Modal, Row } from "antd";
import { useAllGadgetQuery } from "../../../redux/features/product/productApi";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";

import React, { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { TGadget } from "../../../types/types";
import LoginInput from "../../../components/authForm/LoginInput";
import LoginForm from "../../../components/authForm/LoginForm";
import { FieldValues, useForm } from "react-hook-form";
import { Col } from "antd";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AllSalesGadgets = () => {
  const { register, handleSubmit } = useForm();
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const [CreateSales] = useCreateSalesMutation();
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




  // Modal data =====================================


  const onSubmit = async (data: FieldValues) => {
    console.log("data",data)
    const toastId = toast.loading("Registering user!");

    try {
      const saleInfo = {
        name: data.buyer_name,
        quantity:parseFloat(data.quantity),
        date: new Date(),
      };
      const response = await CreateSales(saleInfo).unwrap();
      console.log(response);
      toast.success("Sales successful!", { id: toastId, duration: 2000 });
      // Optionally, you can handle further actions after successful registration
    } catch (error: any) {
      console.log()
      toast.error(`Something went wrong! ${error?.data?.message} !`, { id: toastId, duration: 2000 });
     
    }
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
      <div style={{ marginBottom: 10, marginTop: 10 }}>
        <LoginForm onSubmit={onSubmit}>
          <div style={{ display: "flex" }}>
            <LoginInput
              type="search"
              name=""
              label=""
              placeholder="Search your gadgets"
            />
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
