
import axios from 'axios';
import "./App.css";
import { useEffect, useState } from "react"


const App=()=>{
  
     const [name, setName]=useState("")
     const [details, setDetails]=useState("")
     const [newDetails, setNewDetails]=useState("")
    const [displayDetails, setDisplayDetails]=useState([])

const handleChangeName=(event)=>{
    setName(event.target.value)
}
const handleChangeDetails=(event)=>{
    setDetails(event.target.value)
}


useEffect(()=>{
    axios.get('http://localhost:3001/books').then((response)=>{
    
     setDisplayDetails(response.data)
    })
},[])

const saveChange=()=>{
         // setDisplayDetails(`name:${name} and details:${details}`)
          axios.post("http://localhost:3001/create",
          {name:name, details:details,}
          ).then(()=>{
            setDisplayDetails([...displayDetails,{name:name, details:details}])
          }) 
 setName("")
 setDetails("")        
          
}

const onDelete= (id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
        setDisplayDetails(displayDetails.filter((each)=>{
             return each.id!==id
            
        }) 
        )
    })
}

const newDetailsUpdate =(id) =>{
       axios.put("http://localhost:3001/update",
       {id:id, details:newDetails,}
       ).then((response)=>{
        
         setDisplayDetails(displayDetails.map((each)=>{
            return each.id===id ? {details:newDetails, name:each.name, id:id} : each
            
         }))
        
         })
        
         setNewDetails("")   
       
}
   return (
    <>
    
    <div className='upper-con'>
        <h1 className="head">Movie Review</h1>
        <div>
            <input type="text" id="name" value={name} placeholder="Enter Here" className="input" onChange={handleChangeName}/><br/>
            <label htmlFor="name" className='enter-name'>Enter Movie Name</label>
        </div>
        <br />
        <br />
       <div>
            <input type="text" id="details" placeholder="Enter Here" value={details} className="input" onChange={handleChangeDetails}/><br/>
            <label htmlFor="details" className='enter-name' >Enter Your Review</label>
        </div>
        <br/>
      <div> <button onClick={saveChange} className='savebutton'>Submit Review</button> </div>
    </div>     

         <hr />
         <div>
            {displayDetails.map((each)=>{
                return <div className='name-con'>

                    <h1>Movie Name:{each.name}</h1>
                    <h1 className="Review">Movie Review:{each.details}</h1>
                    


                    <div> 
                        <input type="value" onChange={(e)=>{setNewDetails(e.target.value)}}></input>
                        <button type="button" key={each.id} className="update-but" onClick={()=>newDetailsUpdate(each.id)}>Update</button> 
                    </div>

                    <button type="button" key={each.id} className="delete-but" onClick={()=>onDelete(each.id)}>Delete</button> 
                </div>

            })}
         </div>
</>

   )

}
export default App