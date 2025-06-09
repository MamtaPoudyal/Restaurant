import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the food list from the API
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food`);
      console.log("API Response:", response.data);

      if (response.data?.success && Array.isArray(response.data.data)) {
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
    console.log("Attempting to remove:", foodId);

    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success("Food item removed successfully");
        setList(prevList => prevList.filter(item => item._id !== foodId)); 
      } else {
        toast.error("Failed to remove food item");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Failed to remove food item. Check console for details.");
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
                <img src={`${url}/uploads/${item.image}`} alt={item.name} />
                <p>{item.name || "Unnamed"}</p>
                <p>{item.category || "No Category"}</p>
                <p>${item.price !== undefined ? item.price : "N/A"}</p>
                <p 
                  onClick={() => {
                    console.log("Removing:", item._id);
                    removeFood(item._id);
                  }} 
                  className='cursor'
                >
                  X
                </p>
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
