import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the food list from the API
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food`);
      console.log("API Response:", response.data);

      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data);
        console.log("Updated State:", response.data.data);
      } else {
        console.error("Unexpected API Response:", response.data);
        toast.error("Invalid data format received");
      }
    } catch (error) {
      toast.error("Failed to fetch list");
      console.error("Error fetching list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      
      if (response.data.success) {
        toast.success("Food item removed successfully");
        fetchList(); // Refresh list after removal
      } else {
        toast.error("Failed to remove food item");
      }

      console.log("Removed Food ID:", foodId);
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Failed to remove food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.length > 0 ? (
            list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img
                  src={`${url}/uploads/${item.image}`} 
                  alt={item.name}
                />
                <p>{item.name || "Unnamed"}</p>
                <p>{item.category || "No Category"}</p>
                <p>${item.price !== undefined ? item.price : "N/A"}</p>
                <p onClick={() => removeFood(item._id)} className='cursor'>X</p> {/* ✅ Fix applied */}
              </div>
            ))
          ) : (
            <p>No food items available</p>
          )}
        </>
      )}
    </div>
  );
};

export default List;
