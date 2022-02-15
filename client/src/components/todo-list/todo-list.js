import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./todo-list.css";

function TodoList() {
  const todoID = useParams();
  console.log("todoID", todoID.id);
  const [customers, setCustomers] = useState([]);
  const [input, setInput] = useState({
    customerName: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (todoID.id) {
      console.log("todo edit");
    } else {
      console.log("todo list");
    }
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = () => {
    axios
      .get("api/todo/get")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setCustomers(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const deleteTodo = (todoID) => {
    axios
      .delete(`/api/delete/${todoID.id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("todo successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => console.log("Something went wrong"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (input.customerName.trim().length === 0) return;
    const newCustomerList = {
      name: input.customerName,
    };
    axios
      .post("api/todo/create", newCustomerList, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        getCustomer();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
    input.customerName = "";
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={<AccountBalanceIcon className="card-header-icon" />}
              title="Customer"
              subheader="Create and manage platform Customer."
              className="card-grid"
            />
            <CardContent></CardContent>
            <CardActions disableSpacing></CardActions>
            <CardContent>
              <div style={{ paddingTop: 24 }}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    label="CustomerName"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 40 }}
                    name="customerName"
                    value={input.customerName || ""}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    onClick={(e) => handleSubmit(e)}
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{ marginBottom: 20 }}
                  >
                    SUBMIT
                  </Button>
                </form>
              </div>
              {customers?.map((data, i) => (
                <Grid container justifyContent="flex-end" key={i}>
                  <Grid item xs={10}>
                    {data.name}
                  </Grid>
                  <Grid item xs={2}>
                    <Link className="edit-link m-r-20" to={`/edit/${data._id}`}>
                      <EditIcon className="point" />
                    </Link>
                    <DeleteIcon
                      className="delete-icon point"
                      onClick={(data) => deleteTodo(todoID.id)}
                    />
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default TodoList;
