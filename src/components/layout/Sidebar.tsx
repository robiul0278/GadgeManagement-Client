import { Layout, Menu } from "antd";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenetator";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;


const userRole = {
  MANAGER: 'manager',
    USER: 'user',
  };

const Sidebar = () => {

    const user = useAppSelector(selectCurrentUser);
    // console.log(user)
    // const role = 'user'

    let sidebarItems;
  
    switch (user!.role) {
      case userRole.MANAGER:
        sidebarItems = sidebarItemsGenerator(userPaths, userRole.MANAGER);
        break;
      case userRole.USER:
        sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
        break;
        
      default:
        break;
    }

  return (
    <Sider
    style={{height: "100vh"}}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Electric Gadgets</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
