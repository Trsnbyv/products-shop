import {
  ContactsOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SiteLogo from "../assets/images/site-logo.avif";
import { Link } from "react-router-dom";
const items = [
  {
    key: "sub1",
    label: "Products",
    icon: <ProductOutlined style={{ fontSize: "25px" }} />,
    children: [
      {
        key: "g1",
        type: "group",
        children: [
          {
            key: "1",
            label: <Link to="/">All Products</Link>,
          },
          {
            key: "2",
            label: <Link to="/add-product">Add Products</Link>,
          },
          {
            key: "3",
            label: <Link to="/special-product">Special Products</Link>,
          },
          {
            key: "4",
            label: <Link to="/special-product">Favourite Products</Link>,
        },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "About Us",
    icon: <MenuUnfoldOutlined style={{ fontSize: "25px" }} />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
    ],
  },
  {
    key: "sub4",
    label: "Contact Us",
    icon: <ContactsOutlined style={{ fontSize: "25px" }} />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
      },
    ],
  },
];
const Navbar = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="fixed w-[20%]">
      <div className="bg-[#001529] p-5">
        <Link to={"/"} className="flex items-center gap-[10px]">
          <img src={SiteLogo} className="rounded-full" alt="site logo" width={50} height={50} />
          <h2 className="text-[25px] text-white">Online shop</h2>
        </Link>
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        className="h-[100vh]"
        items={items}
      />
    </div>
  );
};
export default Navbar;
