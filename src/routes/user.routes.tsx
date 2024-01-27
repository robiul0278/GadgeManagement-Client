import UserDashboard from "../pages/user/UserDashboard";
import CreateGadget from "../pages/user/gadgetsManagement/CreateGadget";
import AllGadgets from "../pages/user/gadgetsManagement/AllGadgets";
import UpdateGadget from "../pages/user/gadgetsManagement/UpdateGadget";
import AllSalesGadgets from "../pages/user/salesManagement/AllSalesGadget";

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
        name: "Add a New Gadget",
        path: "create-gadget",
        element: <CreateGadget />,
      },
      {
        name: "All Gadgets",
        path: "all-gadget",
        element: <AllGadgets />,
      },
      {
        path: `update-gadget/:id`,
        element: <UpdateGadget />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "All Sales Gadgets",
        path: "sales-gadget",
        element: <AllSalesGadgets/>,
      },
 
    ],
  },
];
