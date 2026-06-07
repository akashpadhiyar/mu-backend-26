import React from 'react';
import axios from 'axios'
function Display() {
  const [mydata,setData] = React.useState([])
  React.useEffect(() => {
    axios.get("http://127.0.0.1:3000/getdata")
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => alert(err))
  }, [])
  return (<>
    <h1>Display </h1>
    <table border={1}>
    {mydata.map((value,index)=>{
      return(<tr>
        <td>{index+1}</td>
      <td>{value.pname}</td>
      <td>${value.pprice}</td>
      <td>{value.pdetails}</td>
      </tr>)
    })}
    </table>
  </>)
}
export default Display