import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../Layout";
import Home from "../../pages/Home";

import RealEstateHome from "../../pages/Proporty/RealEstate/RealEstateHome";
import VehiculeHome from "../../pages/Proporty/Vehicle/VehicleHome";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import RealEstateTypes from "../../pages/Proporty/RealEstate/RealEstateType";
import VehiculeType from "../../pages/Proporty/Vehicle/VehicleType";
import AddProporty from "../../pages/AddProporty";
import Dashboard from "../Admin/Dashboard";
import UserProfile from "../User/UserProfile";
import REpostsForRent from "../Posts/REPosts/REpostsForRent";
import REpostsForSell from "../Posts/REPosts/REpostsForSell";
import VHPostsForSell from "../Posts/VHPosts/VHPostsForSell";
import VHPostsForRent from "../Posts/VHPosts/VHPostsForRent";
import PropertyListingRE from "../../pages/Proporty/RealEstate/PropertyListingRE";
import PropertyListingVH from "../../pages/Proporty/Vehicle/PropertyListingVH";
import ListingDetails from "../Posts/ListingDetails";

function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/real-estate-home" element={<RealEstateHome />} />
        <Route path="/real-estate/type" element={<RealEstateTypes />} />
        <Route path="/vehicle-home" element={<VehiculeHome />} />
        <Route path="/vehicles/type" element={<VehiculeType />} />
        <Route
          path="/real-estate/posts-for-sell"
          element={<REpostsForSell />}
        />
        <Route
          path="/real-estate/posts-for-rent"
          element={<REpostsForRent />}
        />
        <Route path="/vehicles/posts-for-sell" element={<VHPostsForSell />} />
        <Route path="/vehicles/posts-for-rent" element={<VHPostsForRent />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route
          path="/property/real-estate/type/:type"
          element={<PropertyListingRE />}
        />
        <Route
          path="/property/vehicle/type/:type"
          element={<PropertyListingVH />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        {/* Protected Routes with role requirements */}
        <Route
          path="/addProperty"
          element={
            <ProtectedRoute requiredRoles={["ADMIN", "USER"]}>
              <AddProporty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userProfile/:activepage"
          element={
            <ProtectedRoute requiredRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
