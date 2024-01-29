/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Modal, Row, Skeleton } from "antd";
import { useAllGadgetQuery, useSingleProductQuery, useUpdateGadgetMutation } from "../../../redux/features/product/productApi";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";
import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import { TGadget } from "../../../types/types";
import { FieldValues, useForm } from "react-hook-form";
import { Col } from "antd";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const SaleGadgets = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data: allGadgets, isLoading, error } = useAllGadgetQuery({});
  const [UpdateQuantity] = useUpdateGadgetMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [CreateSales] = useCreateSalesMutation();
  const [gadgetId, setSaleProductId] = useState();
  const {data:{data: quantityProduct} = {},}  = useSingleProductQuery(gadgetId)
  console.log(quantityProduct);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = allGadgets?.data?.filter((item: TGadget) => {
    const searchString = Object.values(item)
      .filter(value => typeof value === 'string') // Filter only string values
      .join(' ') // Concatenate all string values into a single string
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



  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    const errorMessage =
      (error as SerializedError).message || "An error occurred.";
    return <p>Error fetching gadgets: {errorMessage}</p>;
  }

  // Modal data =====================================

  const onSubmit = async (data: FieldValues) => {
    console.log("data", data);
    const toastId = toast.loading("sale gadgets!");

    try {
      const saleInfo = {
        name: data.buyer_name,
        // calculate quantity
        quantity: parseFloat(data.quantity),
        date: new Date(),
      };


      if (quantityProduct.quantity < saleInfo.quantity) {
        toast.error("Requested quantity exceeds available stock!", { id: toastId, duration: 2000 });
        return; // Stop further execution
      }


          // Update the quantity of the product
    const updatedQuantity = quantityProduct.quantity - saleInfo.quantity;
    const updateInfo = { ...quantityProduct, quantity: updatedQuantity };
    await UpdateQuantity({ id: gadgetId, data: updateInfo });


      const response = await CreateSales(saleInfo).unwrap();
      console.log(response);
      toast.success("Sales successful!", { id: toastId, duration: 2000 });
      reset();
      // Optionally, you can handle further actions after successful registration
    } catch (error: any) {
      console.log();
      toast.error(`Something went wrong! ${error?.data?.message} !`, {
        id: toastId,
        duration: 2000,
      });
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
        {/* <label htmlFor="name">Buyer Name:</label> <br /> */}
        <input
          className="rounded"
          style={{ padding: "10px", width: "26%", border: "none" }}
          type="search"
          id="name"
          placeholder="Search Gadgets"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default SaleGadgets;
