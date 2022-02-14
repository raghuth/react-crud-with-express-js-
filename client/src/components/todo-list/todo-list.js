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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./todo-list.css";

function TodoList() {
  //const { _id } = props.match.params;
  let { _id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [input, setInput] = useState({
    customerName: "",
  });

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = () => {
    axios
      .get("http://localhost:8000/api/todo")
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

  const deleteTodo = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/delete/${_id}`)
      .then((res) => {
        console.log(res.data);
        const deleteCustomer = customers.filter((item) => item._id !== _id);
        setCustomers(deleteCustomer);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.customerName.trim().length === 0) return;
    if (input.customerName) {
      const newCustomerList = {
        name: input.customerName,
      };
      axios
        .post("http://localhost:8000/api/todo-list/create", newCustomerList, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((data) => {
          getCustomer();
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
      input.customerName = "";
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={<AccountBalanceIcon className="card-header-icon" />}
              title="Endpoints"
              subheader="Create and manage platform endpoints."
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
                <div key={i} className="right-side-icons">
                  {data.name}
                  <Link className="edit-link" to={"/update-todo/" + _id}>
                    <EditIcon className="point" />
                  </Link>
                  <DeleteIcon
                    className="delete-icon point"
                    onClick={(e) => deleteTodo(e)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default TodoList;
