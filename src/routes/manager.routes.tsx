import CreateGadget from "../pages/manager/gadgetsManagement/CreateGadget";
import AllGadgets from "../pages/manager/gadgetsManagement/AllGadgets";
import UpdateGadget from "../pages/manager/gadgetsManagement/UpdateGadget";
import SaleGadgets from "../pages/manager/salesManagement/AllSaleGadgets";
import CreateVariant from "../pages/manager/gadgetsManagement/CreateVariant";
import ManagerDashboard from "../pages/ManagerDashboard";
import AllSalesHistory from "../pages/manager/salesManagement/AllSaleHistory";
import CheckOut from "../pages/manager/salesManagement/Checkout";

export const managerPaths = [
  {
    name: "Manager Dashboard",
    path: "dashboard",
    element: <ManagerDashboard />,
  },
  {
    name: "Gadgets Management",
    children: [
      {
        name: "Create Gadget",
        path: "create-gadget",
        element: <CreateGadget />,
      },
      {
        name: "All Gadgets",
        path: "all-gadgets",
        element: <AllGadgets />,
      },
      {
        hidden: true,
        name: "Update Gadget",
        path: `update-gadget/:gadgetId`,
        element: <UpdateGadget />,
      },
      {
        hidden: true,
        name: "Duplicate Gadget",
        path: `duplicate-gadget/:gadgetId`,
        element: <CreateVariant />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "Sale Gadgets",
        path: "sale-gadgets",
        element: <SaleGadgets />,
      },
      {
        name: "Sales History",
        path: "sale-history",
        element: <AllSalesHistory />,
      },
      {
        hidden: true,
        name: "Checkout gadget",
        path: "checkout1",
        element: <CheckOut />,
      },
    ],
  },
];
