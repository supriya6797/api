
import React, { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const PAGE_LIMIT = 10; // Number of records per page
const apiPath = "https://dummyjson.com/users"; // DummyJSON API URL

const Home = () => {
    const [users, setUsers] = useState([]); // State to hold users data
    const [page, setPage] = useState(1); // State to track current page
    const [hasMore, setHasMore] = useState(true); // State to check if more data is available
    const [designationFilter, setDesignationFilter] = useState(''); // Designation filter
    const [genderFilter, setGenderFilter] = useState('');




    // Fetch data from the API
    const fetchData = () => {
        fetch(`${apiPath}?limit=${PAGE_LIMIT}&skip=${(page - 1) * PAGE_LIMIT}`)
            .then(res => res.json())
            .then(data => {
                if (data.users.length > 0) {
                    setUsers(prevUsers => [...prevUsers, ...data.users]);
                    setPage(prevPage => prevPage + 1); // Increment page number
                } else {
                    setHasMore(false); // No more data available
                }
            })
            .catch(err => console.error('Error fetching data:', err));
    };

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    // Function to fetch more data on scroll
    const fetchMoreData = () => {
        fetchData()
    };
   //  sorting
   // name assending fun
      const Assending = ()=>{
   const data = [...users]
   if(data.length>0) {
      const result= data.sort((a,b)=>a.username.localeCompare(b.username))
      setUsers(result)
   }
      };

      //descending name order
      const Descending=()=>{
       const data = [...users] 
       if(data.length>0) {
          const result= data.sort((a,b)=>b.username.localeCompare(a.username))
          setUsers(result)
       }
      };

      // on id base desceding
      const Dind=()=>{
       const data = [...users]
       if(data.length>0){
           const result = data.sort((a,b) => b.id - a.id)
           setUsers(result)
       }
      };

   //    id base ascending 
      const Aind=()=>{
       const data = [...users]
       if(data.length>0){
           const result = data.sort((a,b) => a.id - b.id)
           setUsers(result)
       }
      };
   

  // Apply filters
const filter=() => {
   const filtered = [...users]
   // DESGNATION FILTER
   if (designationFilter) {
    const resultf = filtered.filter(user =>`${user.company.title}`.toLowerCase().includes(designationFilter.toLowerCase())
       );
       setUsers(resultf);

   }
};


// gender filter
const gender=() => {
   let filtered = [...users]

   if (genderFilter) {
   const resultg = filtered.filter(user => `${user.gender}`.toLowerCase() === genderFilter.toLowerCase()
);
setUsers(resultg)
}
};

    return (
        <>
        <body>
        <div className='contain'>  
        <span className='title'> Employees  </span>

      <span className='icons' >
         <FilterAltIcon style={{ fontSize:"xx-large",color:"red",marginBottom:"-10px",marginRight:"8px"}}/>
         <span>
         <input
      
         style={{ height:"20px",width:"120px"}}
              type="text"
              placeholder="designation"
              value={designationFilter}
              onChange={(e) => setDesignationFilter(e.target.value)}
              />
                <button style={{ marginLeft:"-25px",marginRight:"12px",height:"25px"}} onClick={filter}> a</button> 
                </span>
                <span >
                <select
                  style={{ height:"25px",width:"120px"}}
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                >
                    <option value="">Select</option>
                    <option  value="male">Male</option>
                    <option value="female">Female</option>
                </select> 

                <button
                  style={{ height:"25px"}}
                 onClick={gender}>b</button>
                </span>
                </span>
                    </div>
    <div className='api'>
                <InfiniteScroll
                    dataLength={users.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>End of Results</p>}>
                   <table>
                <thead>
                <tr>
             <th>ID <ArrowUpwardIcon onClick={Aind}/> <ArrowDownwardIcon onClick={Dind}/></th>
             <th>Image</th>
             <th>Name <button onClick={Assending}>A</button> <button onClick={Descending}>D</button></th>
             <th>Demography
           
             </th>
             <th >Designation </th>
                
             
             <th>Location</th>        
         </tr>
                </thead>
                    <tbody>
                        {users.map(user => (
                            <tr>
                                <td>{user.id}</td>
                                <td><img src={user.image} alt='user' style={{ height: "60px", width: "60px" }} /></td>
                                <td>{`${user.firstName} ${user.lastName}`}</td>
                                <td>{`${user.gender}/${user.age}`}</td>
                                <td>{user.company.title}</td>
                                <td>{`${user.address.state}, ${user.address.country}`}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
                </InfiniteScroll>
        </div>
        </body>
        </>
    );
}



export default Home;  