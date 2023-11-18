/* eslint-disable react-hooks/exhaustive-deps */
import axios, { Axios } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel

} from "@material-ui/core";


import AuthContext from "../../context/auth/authContext";
/* eslint-disable jsx-a11y/heading-has-content */

const FoodsMenu = ({ category }) => {
  const [foods, setFoods] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFoodDetailDialog, setOpenFoodDetailDialog] = useState(false);
  const [updatedFood, setUpdatedFood] = useState({
    name: "",
    cost: "",
    categoryId: "",
  });
  const [Item, setItem] = useState({
    name: "",
    cost: "",
    imageFile: "",
    imageUrl: "",
    categoryId: ""
  });
  const [reloadComponent, setReloadComponent] = useState(false);


  const authContext = useContext(AuthContext);
  const { userCurrentTable, isLoggedIn, userToken, role } = authContext;
  const isGuest = role.includes("Guest");
  const isManager = role.includes("Manager");
  const isAdmin = role[0] === "Admin";

  const [foodOrder, setFoodOrder] = useState({
    Id: "",
    tableId: "",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseFoodDetailDialog = () => {
    setOpenFoodDetailDialog(false);
  };
  const handleOpenFoodDetailDialog = (food) => {
    setItem({
      name: food.name,
      cost: food.cost,
      imageUrl: food.imageUrl,
      categoryId: food.categoryId,
    });
    setOpenFoodDetailDialog(true);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...Item, [name]: value });
  };


  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];
    setItem({ ...Item, [name]: selectedFile });
  };
  const handleOrder = async (foodId) => {
    setFoodOrder({ ...foodOrder, Id: foodId, tableId: userCurrentTable });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setItem({
      ...Item,
      categoryId,
    });
  };

  
  const DisplayCategoryName = (categoryId) => {

    if (categoryId == 101) {
      return "Main Dishes";
    }
    else if (categoryId == 102) {
      return "Drink";
    }
    else {
      return "Other";
    }
  }
  const AddItemToDb = (imageUrl) => {
    const formData = new FormData();

    formData.append("name", Item.name);
    formData.append("cost", Item.cost);
    formData.append("categoryId", Item.categoryId);
    formData.append("imageUrl", imageUrl);


    axios
      .post("https://localhost:44307/api/Items", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Added to items !!!");
        } else {
          toast.error("Some thing wrong !!!");
        }
      })
      .catch((error) => {
        toast.error("Some thing wrong !!!");
      });
  }

  // const handleCategoryUrlData = (urlData) => {
  //   setItem((prevItem) => ({
  //     ...prevItem,
  //     imageUrl: urlData,
  //   }));


  // };
  const handleAddItem = () => {

    if (!Item.name || !Item.cost || !Item.categoryId) {
      toast.error('Please fill in all the required fields.');
      return;
    }


    const formData = new FormData();
    formData.append("file", Item.imageFile);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", "Smarest");


    axios.post("https://api.cloudinary.com/v1_1/dnj7dje92/image/upload", formData)
      .then((response) => {

        AddItemToDb(response.data.url);
        reloadComponentNow();

      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    if (category) {
      axios
        .get("https://localhost:44307/api/items/" + category, {
          withCredentials: true,
        })
        .then((response) => setFoods(response.data))
        .catch((error) => console.log(error));
      return;
    }
    else {
      axios
        .get("https://localhost:44307/api/items/MainDishes", {
          withCredentials: true,
        })
        .then((response) => setFoods(response.data))
        .catch((error) => console.log(error));
    }
  }, [category, reloadComponent]);

  const reloadComponentNow = () => {
    setReloadComponent(prevState => !prevState);
  };
  useEffect(() => {
    if (foodOrder.Id !== "") {
      axios
        .post("https://localhost:44307/api/carts/addtocart", foodOrder, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Added to cart !!!");
          } else {
            toast.error("Some thing wrong !!!");
          }
        })
        .catch((error) => {
          toast.error("Some thing wrong !!!");
        });
    }
  }, [foodOrder]);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const handleOpenEditDialog = () => {
    setOpenFoodDetailDialog(false);
    setIsUpdateDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleEditFood = () => {
    // Implement the logic to update the food in the database
    // You can use the `updatedFood` state to get the updated values
    // and make an API call to update the food item
    // ...

    // After updating, close the update dialog
    handleCloseEditDialog();
  };

  return (
    <div>
      <Dialog open={isUpdateDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle className="text-lg font-bold">Edit Food</DialogTitle>
        <DialogContent>
          {/* Implement the form fields to update the food item */}
          {/* ... (similar to the Add Item dialog) */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="blue">
            Cancel
          </Button>
          <Button onClick={handleEditFood} color="blue">
          Edit Food
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openFoodDetailDialog} onClose={handleCloseFoodDetailDialog}>
        <DialogTitle className="text-lg font-bold">Food Detail</DialogTitle>
        <DialogContent>
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <img src={Item.imageUrl} alt={Item.name} className="w-full h-auto rounded-lg" />
            </div>
            <div className="w-1/2">
              <h3 className="text-xl font-bold mb-2">{Item.name}</h3>
              <p className="font-bold text-blue-500">Price: ${Item.cost}</p>
              <p className="font-bold text-blue-500">Category: {DisplayCategoryName(Item["categoryId"])}</p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFoodDetailDialog} color="blue">
            Cancel
          </Button>
          <Button onClick={handleOpenEditDialog} color="blue">
            Edit Food
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openDialog} onClose={handleCloseDialog} className="max-w-xl mx-auto">
        <DialogTitle className="text-lg font-bold">Add a New Item</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            Please enter the details of the new item.
          </DialogContentText>
          <div className="mb-4">
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={Item.name || ''}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <TextField
              margin="dense"
              name="cost"
              label="Cost ($)"
              type="number"
              fullWidth
              value={Item.cost || ''}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <input
              type="file"
              name="imageFile"
              onChange={handleFileInputChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="categoryId">Category</InputLabel>
            <Select
              margin="dense"
              name="categoryId"
              label="categoryId"
              fullWidth
              value={Item.categoryId || ''}
              onChange={handleCategoryChange}
              className="w-full"
            >
              <MenuItem value="101">Main Dishes</MenuItem>
              <MenuItem value="102">Drink</MenuItem>
              <MenuItem value="103">Other</MenuItem>
              {/* Add more category options as needed */}
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="blue"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddItem}
            color="blue"


          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>



      {isAdmin && (
        <Button onClick={handleOpenDialog}
          className="flex  py-3 px-5  text-black font-bold bg-amber-300 hover:bg-amber-400"> Add a new item </Button>
      )}

      <div className=" grid grid-cols-1 gap-1 mt-8 xl:mt-12 xl:gap-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3">

        {foods.map((food) => (
          <div key={food.id} className="w-64 ">
            <div>
              <h2 className="text-white text-left font-semibold	">
                {food.name}
              </h2>
              <h2 className="text-white text-left font-medium	">
                Price: {food.cost}$
              </h2>
              {isGuest && !isManager && !isAdmin && (
                <button
                  className="bg-amber-300 hover:bg-amber-400 text-black font-bold py-2 px-3 rounded flex mb-2"
                  onClick={() => handleOrder(food.id)}
                >
                  Order
                </button>
              )}
            </div>
            <div className="w-4/5 h-48 rounded-lg " onClick={() => handleOpenFoodDetailDialog(food)}>
              <img
                src={food.imageUrl}
                alt={food.name}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        ))}
        <div className="h-screen">

        </div>

      </div>
    </div>
  );
};

export default FoodsMenu;
