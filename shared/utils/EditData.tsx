import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import CustomizedSnackbars from "./SnackBar";
const EditBox = (props: {
  values: number;
  Edititem: {
    inStock: boolean | undefined;
    name: unknown;
    price: unknown;
    baseQuantity: unknown;
    id: number;
    
  };
  open: boolean;
  setEdititem: (arg0: any) => void;
  setOpen: (arg0: boolean) => void;
}) => {
  console.log(props.values);
  
    const [Opensnack, setOpenSnack] = React.useState(false);
  
const submitEdit = (id: number) => {
    const body = {
      category:props.values,
      imageId: 0,
      inStock: props.Edititem.inStock,
      name: props.Edititem.name,
      price: props.Edititem.price,
      strikeThroughPrice: 11,
      baseQuantity: props.Edititem.baseQuantity,
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
          // console.log(body);
          // console.log("Item Edited successfully!", "success");
          setOpenSnack(true);
          // window.location.reload();
        }
      })();
    } catch (error) {
      console.log(body);
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
     
    //   window.location.reload();

    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
    <CustomizedSnackbars
        open={Opensnack}
        setOpen={setOpenSnack}
        type="success"
        message="Item Edited SuccessFully"
      />
      <Box>
        <Dialog open={props.open}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <Grid container spacing={1} sx={{ padding: "30px" }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={props.Edititem?.name}
                  id="name"
                  label="name"
                  onChange={(event) =>
                    props.setEdititem({
                      ...props.Edititem,
                      [event.target.id]: event.target.value,
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
                  value={props.Edititem.price ? props.Edititem.price : 0}
                  id="price"
                  label="Price"
                  onChange={(event) =>
                    props.setEdititem({
                      ...props.Edititem,
                      [event.target.id]: parseInt(event.target.value),
                    })
                  }
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <label htmlFor="">In Stock</label>
              </Grid>
              <Grid item xs={4}>
                <Checkbox
                  checked={props.Edititem?.inStock}
                  id="inStock"
                  // value={Edititem?.inStock}
                  onChange={(event) =>
                    props.setEdititem({
                      ...props.Edititem,
                      [event.target.id]: event.target.checked,
                    })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  value={props.Edititem?.baseQuantity}
                  id="baseQuantity"
                  label="base Quantity"
                  type="email"
                  onChange={(event) =>
                    props.setEdititem({
                      ...props.Edititem,

                      [event.target.id]: event.target.value,
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
                // HandleEditButton()
                props.setOpen(!open);
                submitEdit(props.Edititem.id);
                
              }}
            >
              Edit Item
            </Button>
            <Button
              onClick={() => {
                // HandleEditButton()
                props.setOpen(!open);
              }}
            >
              Cancle
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default EditBox;
