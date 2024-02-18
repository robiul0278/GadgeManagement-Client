import CreateGadget from "../pages/manager/gadgetsManagement/CreateGadget";
import UpdateGadget from "../pages/manager/gadgetsManagement/UpdateGadget";
import SalesHistory from "../pages/user/userSaleManagement/SalesHistory";
import CreateVariant from "../pages/manager/gadgetsManagement/CreateVariant";
import UserDashboard from "../pages/UserDashboard";
import MyAllGadgets from "../pages/user/userGadgetManagement/MyAllGadgets";
import SaleMyGadgets from "../pages/user/userSaleManagement/SaleMyGadgets";
import UserCheckOut from "../pages/user/userSaleManagement/UserCheckout";

export const userPaths = [
  {
    name: "User Dashboard",
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
        name: "My All Gadgets",
        path: "all-gadgets",
        element: <MyAllGadgets />,
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
        element: <SaleMyGadgets />,
      },
      {
        name: "Sales History",
        path: "sale-history",
        element: <SalesHistory />,
      },
      {
        hidden: true,
        name: "Checkout gadget",
        path: "checkout",
        element: <UserCheckOut />,
      },
    ],
  },
];
