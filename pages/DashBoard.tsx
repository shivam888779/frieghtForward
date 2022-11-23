import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import * as React from "react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logoicon from "../public/images/iconsec.png";
import Image from "next/image";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditBox from "../shared/utils/EditData";

import axios from "axios";
import CustomizedSnackbars from "../shared/utils/SnackBar";

interface Additems {
  Category: number;
  name: String;
  price: number;
  inStock: boolean;
  baseQuantity: string;
  imageId: number;
}

const body = {
  category: 2,
  name: "pinapple",
  price: 500,
  inStock: false,
  baseQuantity: "1 Unit",
  imageId: 53,
};

export default function Dashboard() {
  const [loadPage, setLoadpage] = React.useState(false);
  const [EditOpen, setEditOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();
  const [value, setValue] = React.useState("1");
  const [Operation , setOperation] = React.useState("Successfully logged in");
  const [Data, setData] = useState([]);
  const [Opensnack, setOpenSnack] = React.useState(true);
  const [Edititem, setEdititem] = useState({
    Category: 1,
    name: "random",
    price: 500,
    inStock: true,
    baseQuantity: "1 Unit",
    imageId: 52,
    id: 1,
  });

  const [Additem, setAdditem] = useState<Additems>({
    Category: 0,
    name: "",

    price: 0,
    inStock: false,
    baseQuantity: "",
    imageId: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item",
          {
            headers: {
              Authorization: `${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        console.log("again and again");
        // setEdititem(res.data)
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [loadPage, EditOpen]);



  const Catagory = Data.filter(({ id, categoryID }) => {
    if (value == "1" || value == "2") {
      return categoryID == parseInt(value);
    }
    return categoryID != 1 && categoryID != 2;
  });

  const backButtonHandler = () => {
    router.push("/");
  };

  const HandleEdit = async (id: number) => {
    try {
      const res = await axios.get(
        `http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("AuthToken")}`,
          },
        }
      );
      console.log(res.data);
      console.log(res.data.id);
      //  setEdititem()

      setEdititem({
        ...Edititem,
        id: res.data.id,
        Category: res.data.CatagoryID,
        name: res.data.name,
        price: res.data.price,
        baseQuantity: res.data.baseQuantity,
      });
      setEditOpen(!EditOpen);
      // console.log(Edititem);
      setLoadpage(!loadPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    id: number,
    name: string,
    baseQuantity: string,
    price: number,
    inStock: boolean,
    categoryID: number
  ) => {
    console.log(id);
    console.log(inStock);

    const body = {
      category: categoryID,
      imageId: 0,
      inStock: !inStock,
      name: name,
      price: price,
      strikeThroughPrice: 11,
      baseQuantity: baseQuantity,
    };
    console.log(body);
    try {
      (async () => {
        const { status, data } = await axios.put(
          `http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item/${id}`,
          body,
          {
            headers: {
              Authorization: `${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        if (status == 201) {
          console.log(data);
          setLoadpage(!loadPage);
          console.log("Item Edited successfully!", "success");
          setOperation("item edited")
          setOpenSnack(true)
          // window.location.reload()
          //  setLoadpage(!loadPage);
        }
      })();
    } catch (error) {
      console.log(body);
      console.log(error);
    }
  };

  const HandleAddItem = async () => {
    const body = {
      category: Additem.Category,
      name: Additem.name,
      price: Additem.price,
      inStock: checked,
      baseQuantity: Additem.baseQuantity,
      imageId: 52,
    };

    try {
      const res = await axios.post(
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item",
        body,
        {
          headers: {
            Authorization: `${localStorage.getItem("AuthToken")}`,
          },
        }
      );
      if (res.status == 201) {
        setOpen(!open);
        console.log("done");
        setLoadpage(!loadPage);
          setOperation("item Added SuccessFully");
          setOpenSnack(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async (id: number) => {
    console.log(id);
    let cloneid = id;
    console.log("number");

    try {
      const res = await axios.delete(
        `http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/store-manager/item/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("AuthToken")}`,
          },
        }
      );

      if (res.status == 200) {
        console.log("deleted successfully");
        setLoadpage(!loadPage);
        //   window.location.reload();
          setOperation("item Deleted Successfully");
          setOpenSnack(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  console.log(value);

  return (
    <Stack>
      <CustomizedSnackbars
        open={Opensnack}
        setOpen={setOpenSnack}
        type="success"
        message= {Operation}
      />
      <EditBox
        open={EditOpen}
        setOpen={setEditOpen}
        Edititem={Edititem}
        setEdititem={setEdititem}
        values={parseInt(value)}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#60574e" }}>
          <Toolbar>
            <Image
              src={logoicon}
              alt="Picture of the author"
              width="70px"
              height="70px"
            />
            <Typography
              variant="h1"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "30px",
                marginLeft: "25px",
                color: "white",
              }}
            >
              Frieght Forward
            </Typography>
            <Button variant="text">
              <PersonAddAltTwoToneIcon
                fontSize="large"
                sx={{ color: "white" }}
              />
            </Button>
            <Button variant="text">
              <LogoutSharpIcon fontSize="large" sx={{ color: "white" }} />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* ADD DATA FORM */}
      <Box>
        <Dialog open={open}>
          <DialogTitle>Add item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <Grid container spacing={1} sx={{ padding: "30px" }}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={Additem.Category ? Additem.Category : 0}
                  id="name"
                  label="Category"
                  onChange={(event) =>
                    setAdditem({
                      ...Additem,
                      Category: parseInt(event.target.value),
                    })
                  }
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={Additem?.name}
                  id="name"
                  label="name"
                  onChange={(event) =>
                    setAdditem({
                      ...Additem,
                      name: event.target.value,
                    })
                  }
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={Additem.price ? Additem.price : 0}
                  id="name"
                  label="Price"
                  onChange={(event) =>
                    setAdditem({
                      ...Additem,
                      price: parseInt(event.target.value),
                    })
                  }
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </Grid>

              <Grid item xs={6}>
                In Stock
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={Additem?.baseQuantity}
                  id="name"
                  label="base Quantity"
                  type="email"
                  onChange={(event) =>
                    setAdditem({
                      ...Additem,
                      baseQuantity: event.target.value,
                    })
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={Additem?.imageId}
                  id="name"
                  label="Image Id"
                  type="email"
                  onChange={(event) =>
                    setAdditem({
                      ...Additem,
                      imageId: parseInt(event.target.value),
                    })
                  }
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button
              onClick={() => {
                HandleAddItem();
              }}
            >
              Add Item
            </Button>
            <Button
              onClick={() => {
                setOpen(!open);
                console.log(Additem);
              }}
            >
              Cancle
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* ADD DATA FORM */}
      <Grid container spacing={1} sx={{ padding: "30px" }}>
        {/* <Box sx={{ marginLeft: "150px", marginTop: "15px" }}> */}
        <Grid item xs={4}>
          <Button variant="text" onClick={backButtonHandler}>
            <Typography variant="h4" component="div" sx={{ color: "black" }}>
              Back
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="text">
            <Typography variant="h1" component="div" sx={{ color: "black" }}>
              Items
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="text"
            onClick={() => {
              setOpen(!open);
            }}
            sx={{ color: "black", marginLeft: "0px" }}
          >
            <Typography variant="h4" sx={{ color: "#F88A12" }}>
              + Add New Items
            </Typography>
          </Button>
        </Grid>
        {/* </Box> */}
      </Grid>
      <Box sx={{ Width: "80%" }}>
        <Grid container spacing={2} sx={{ margin: "0 auto", width: "80%" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
            sx={{ color: "black", width: "100%" }}
            variant="fullWidth"
          >
            <Tab
              // setValue()
              value="1"
              label="light Vehical"
              sx={{
                border: "2px solid",
                borderTopLeftRadius: "20px",
                borderBottom: "4px solid",
              }}
            />
            <Tab
              value="2"
              label="heavy Vehical"
              sx={{ border: "2px solid ", borderBottom: "4px solid" }}
            />
            <Tab
              value="3"
              label="Others"
              sx={{
                border: "2px solid ",
                borderTopRightRadius: "20px",
                borderBottom: "4px solid",
              }}
            />
          </Tabs>
        </Grid>

        <Table
          sx={{
            margin: "0 auto",
            width: "80%",
            marginTop: "30px",
          }}
        >
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <TableHead
            sx={{
              margin: "0 auto",
              width: "80%",
              border: "2px solid",
              height: "70px",
              backgroundColor: "#FFF0DF",
              marginTop: "30px",
            }}
          >
            <TableRow>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                S. No
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                Image
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                Delivery Boy Name
              </TableCell>
              <TableCell sx={{ border: "1px solid" }}>Mobile No</TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                Task Assign
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                In Working 
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                edit
              </TableCell>
              <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableData values={value} /> */}

            {Catagory?.map(
              ({
                id,
                categoryID,
                baseQuantity,
                itemImageLinks,
                name,
                inStock,
                price,
              }) => (
                <TableRow sx={{ height: "70px" }}>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    {id}
                  </TableCell>{" "}
                  {/* const [checked, setChecked] = React.useState(true); */}
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    {
                      <img
                        src={itemImageLinks[0] ?? ""}
                        style={{
                          width: "80%",
                          height: "80%",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    }
                  </TableCell>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    {name}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    {baseQuantity}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    {price}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    <Checkbox
                      checked={inStock}
                      onChange={() => {
                        handleChange(
                          id,
                          name,
                          baseQuantity,
                          price,
                          inStock,
                          categoryID
                        );
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        HandleEdit(id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid", textAlign: "center" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        // setLoadpage(!loadPage)
                        // console.log(id)
                        HandleDelete(id);
                        //  setLoadpage(+loadPage+1);
                        // <HandleDelete id:number = {id}/>
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        <TableContainer
          component={Paper}
          sx={{ margin: "0 auto", width: "80%" }}
        ></TableContainer>
      </Box>
    </Stack>
  );
}
