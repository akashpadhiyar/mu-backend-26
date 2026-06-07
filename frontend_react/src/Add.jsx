import axios from 'axios';
import React from 'react';
function Add() {
    const [txt1, setTxt1] = React.useState("")
    const [txt2, setTxt2] = React.useState("")
    const [txt3, setTxt3] = React.useState("")
   const saveData = () => {
        var myobj = {
            pname: txt1,
            pprice: txt2,
            pdetails: txt3
        }
        axios.post("http://127.0.0.1:3000/adddata",myobj)
        .then((res)=>{
            console.log(res.data)
            alert(res.data.msg)
        })
        .catch(err=>alert(err))
    }
    return (<>

        <h1>Add Component</h1>
        Name : <input type='text' onChange={(e) => setTxt1(e.target.value)} />
        Price  : <input type='text' onChange={(e) => setTxt2(e.target.value)} />
        Details : <input type='text' onChange={(e) => setTxt3(e.target.value)} />
        <input type='button' onClick={saveData} />
    </>)
}
export default Add