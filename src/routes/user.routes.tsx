import UserDashboard from "../pages/UserDashboard";
import CreateGadget from "../pages/gadgetsManagement/CreateGadget";
import AllGadgets from "../pages/gadgetsManagement/AllGadgets";
import UpdateGadget from "../pages/gadgetsManagement/UpdateGadget";
import SaleGadgets from "../pages/salesManagement/SaleGadgets";
import SalesHistory from "../pages/salesManagement/SalesHistory";
import CreateVariant from "../pages/gadgetsManagement/CreateVariant";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
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
        path: "all-gadget",
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
        element: <SalesHistory />,
      },
    ],
  },
];
