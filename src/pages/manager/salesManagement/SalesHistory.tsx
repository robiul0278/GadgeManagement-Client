import { useState } from "react";
import { Skeleton, Table } from "antd";
import { useAllSalesQuery } from "../../../redux/features/sales/salesApi";
import { SerializedError } from "@reduxjs/toolkit";
import type { TableColumnsType } from "antd";
import { TSales } from "../../../types/types";

const SalesHistory = () => {
  const { data: allHistory, isLoading, error } = useAllSalesQuery({});
  const [filter, setFilter] = useState<string>("all-history");

  const columns: TableColumnsType<TSales> = [
    {
      title: "Buyer Name",
      dataIndex: "name",
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
    },
    {
      title: "Email Address",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Postal Code",
      dataIndex: "postal_code",
    },
    {
      title: "Products Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Sales Date",
      dataIndex: "date",
    },
  ];

  const filterData = (data: TSales[], selectedFilter: string) => {
    const currentDate = new Date();
    switch (selectedFilter) {
      case "weekly":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate >=
            new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
          );
        });
      case "daily":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === currentDate.toDateString();
        });
      case "monthly":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "yearly":
        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate.getFullYear() === currentDate.getFullYear();
        });
      default:
        return data;
    }
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    const errorMessage =
      (error as SerializedError).message || "An error occurred.";
    return <p>Error fetching gadgets: {errorMessage}</p>;
  }

  const filteredData = filterData(allHistory?.data || [], filter);

  return (
    <>
      <h1 className="text-center">Electronics Gadget Sales History</h1>
      <hr />
      <div style={{ marginBottom: 10, marginTop: 10, width: "200px" }}>
        <label htmlFor="select-history">Select History</label>
        <br />
        <select
          className="gInput"
          id="select-history"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all-history">All History</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default SalesHistory;
