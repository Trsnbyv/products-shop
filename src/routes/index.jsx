import { Route, Routes } from "react-router-dom";
import { Home, AddProduct, SingleProduct} from "../pages";
import Navbar from "../components/Navbar";

function index() {

  return (
    <div className="flex">
      <div className="w-[20%]">
        <Navbar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default index;
