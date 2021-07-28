import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Component } from "react";
import { display } from "@material-ui/system";
import {v4 as uuidv4} from "uuid";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export class App extends Component {
  constructor(props) {
    super(props);

       this.state = {
      subscriptionID: "",
      date: "",
      resourceGroup: "",
      tablerows:undefined,
      tablecolumns:undefined
    };
  }
  
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event) => {
    //  alert(this.state.subsId + this.state.resourseGroup )
    event.preventDefault();

    let a = { ...this.state };
    if (a.resourceGroup !== "") {
      a.resourceGroup = [a.resourceGroup];
      console.log(a);
    } else {
      a.resourceGroup = [];
    }
    axios.post("http://localhost:3001/getCost", a).then((response) => {
      console.log(response.data);
      this.setState({ tablerows: response.data.properties.rows,
        tablecolumns: response.data.properties.columns
       });
      //this.setState({ tablecolumns: response.data.properties.columns });
      console.log(this.state.tablecolumns)
      console.log(this.state.tablerows);
    });
  };

  render() 
  {

    return (
    
     
      <div className="App">
        <div style={{ 
      backgroundImage: "url(/bg1.jpg)"
    }}>

        <h1>Tech Project</h1>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div align='center'>
        <label>Subscription ID: </label>
        &nbsp;
        <Input inputProps={{ 'aria-label': 'description' }} placeholder="Subscription ID" value={this.state.subscriptionID}
            required="true"
            name="subscriptionID"
            onChange={this.changeHandler}/>
          </div>
          <br></br>
          <div align='center'>
        <label>Resource Group:</label>
        &nbsp;
        <Input inputProps={{ 'aria-label': 'description' }} placeholder="Resource Group " value={this.state.resourceGroup}
            name="resourceGroup"
            
            onChange={this.changeHandler}/>

          </div>
          <br></br>
          <div align='center'>
        <label>Date:</label>
        &nbsp;
        <Input inputProps={{ 'aria-label': 'description' }} placeholder="Date" value={this.state.date}
           type="month"
           name="date"
            onChange={this.changeHandler}/>

          </div>
                    <br></br>
          <Button variant="contained" color="primary" onClick={ this.handleSubmit }>
Search</Button>
          <br></br>
        {/* </form> */}

        {this.state.tablerows&& (
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell >{this.state.tablecolumns[1].name}</StyledTableCell>
                  <StyledTableCell >
                    {this.state.tablecolumns[0].name}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.tablerows.map((item) => {
                  return (
                    <StyledTableRow key={uuidv4()}>
                      <StyledTableCell component="th" scope="row">
                        {
                      this.state.tablecolumns[1].name=="UsageDate"?item[1].toString().substr(0,4)+'-'+item[1].toString().substr(4,2)+'-'+item[1].toString().substr(6,2):item[1]
                      
                        }
                      </StyledTableCell>
                      <StyledTableCell>
                        {item[0].toFixed(2)}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      </div>
    );
  }
}

export default App;
