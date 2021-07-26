import React, {Component} from "react";
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
import { array } from "yargs";

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

export class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      subscriptionID:'',
      date:'',
      resourceGroup:''
    }
  }
  changeHandler = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }
// handleSubsId=(event)=>{
//   this.setState({
//     subsId:event.target.value
//   });
// }  
// handleDate=(event)=>{
//   this.setState({
//     date:event.target.value
//   });
// }  
// handleresourseGroup=(event)=>{
//   this.setState({
//     resourseGroup:event.target.value
//   });
// }  
handleSubmit=(event)=>{
  
//  alert(this.state.subsId + this.state.resourseGroup )
event.preventDefault()  
console.log(this.state)
let a={...this.state}
a.resourceGroup=[a.resourceGroup]
axios.post("http://localhost:3001/getCost",a)
.then(response =>{
  console.log(response.data.properties.rows);
}

)
} 

  render()
  {
  return (
    
    <div className="App">
      
      <h1>Tech Project</h1>
      <form onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="Subscription ID"
        value={this.state.subscriptionID}
        name="subscriptionID"
        onChange={this.changeHandler}
      />
      <input
        
        type="text"
        placeholder="resourceGroup"
        value={this.state.resourceGroup}
        name="resourceGroup"
        onChange={this.changeHandler}
      />
      <input
        type="month"
        placeholder="date"
        value={this.state.date}
        name="date"
        onChange={this.changeHandler}
      

      />
      <button>Submit</button>
      </form>

{/* 
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Product Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
                .sort((a, b) => parseInt(a.price)> parseInt(b.price)? 1 : -1)

              .filter((item) => {
                if (search == ""&&price=="") {
                  return item;
                } else if (
                  (item.name.toLowerCase().includes(search.toLowerCase()))&&(parseInt(item.price)>parseInt(price))
                )
                 {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.price}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>  */}
    </div>
  );
            }
};

export default App;
