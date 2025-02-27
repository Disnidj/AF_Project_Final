import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      groups:[]
    };
  }

  componentDidMount(){
    this.retriveGroups();
  }

retriveGroups(){
  axios.get("http://localhost:8000/groups").then(res=>{
    if(res.data.success){
      this.setState({
        groups:res.data.existingGroups
      });
      console.log(this.state.groups)
    }
  });
}


onDelete = (id) =>{

  axios.delete(`http://localhost:8000/group/delete/${id}`).then((res) =>{
    alert("Deleted successfully!");
    this.retriveGroups();
  })
}

filterData(groups,searchKey){
  const result = groups.filter((group) =>
  group.GName.toLowerCase().includes(searchKey)||
  group.Leader.toLowerCase().includes(searchKey)
  )

  this.setState({groups:result})
}

handleSearchArea = (e) =>{
  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8000/travelors").then(res=>{
    if(res.data.success){
      this.filterData(res.data.existingGroups,searchKey)
    }
  });
}


  render() {
    return (
      <div className='container'>

        <p>Registered Groups</p>
        <br/>
            <br/>
          {/* {this.state.travelors.map(travelors=>(
            <div>
                <p>{travelors.Name}</p>
                <p>{travelors.NIC}</p>
                <p>{travelors.Phone}</p>
                <p>{travelors.Email}</p>
                <p>{travelors.type}</p>
                <p>{travelors.date}</p>
              </div>
          ))} */}
          <br/>
           <div className="col-lg-9 mt-2 mb-2">
              <input
              className="form-control"
              type="search"
              placeholder="search for your reservation"
              name="searchQuery"
              onChange={this.handleSearchArea}>
              </input>
            </div>
      <table className='table'>

          <thead>
          <tr>
          <th scope='col'>No.</th>
          <th scope='col'>Name of the group</th>
          <th scope='col'>Student 1</th>
          <th scope='col'>Student 2</th>
          <th scope='col'>Student 3</th>
          <th scope='col'>Student 4</th>
          <th scope='col'>Group Leader</th>
          <th scope='col'>Delete Group</th>

          </tr>

          </thead>
          <tbody>

          {this.state.groups.map((groups,index)=>(
            <tr>
              <th scope='row'>{index+1}</th>
              <td>
              <a href={`/Details/${groups._id}`} style={{textDecoration:'none'}}>{groups.GName}</a></td>
              <td>{groups.student1}</td>
              <td>{groups.student2}</td>
              <td>{groups.student3}</td>
              <td>{groups.student4}</td>
              <td>{groups.Leader}</td>
              <td>
              <a className="btn btn-danger" href='#' onClick={() =>this.onDelete(groups._id)}>
              &nbsp;Delete Group

              </a>

              </td>


            </tr>
          ))}

          </tbody>

          

      </table>


      
      </div>
    )
  }
}
