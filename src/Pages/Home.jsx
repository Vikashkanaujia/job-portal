import React, { useEffect } from "react";
import { useState } from "react";
import Banner from "../components/Banner";
import Jobs from "../components/Jobs";
import Card from "../components/Card";
const Home = () => {
  const [selectedCategory , setSelectedCategory] = useState(null)
  const [jobs , setJobs] = useState([]);

  useEffect(()=>{
    fetch("jobs.json").then(res =>res.json()).then(data=>{
      
      setJobs(data)
    })
  },[])
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  //Filter job by title
  const filteredItems = jobs.filter((job)=> job.jobTitle.toLowerCase().indexOf(query.toLowerCase())!== -1);

  // <---------------- Radio based button filtering ----------

  const handleChange = (event)=>{
    setSelectedCategory(event.target.value)
  }
  
  
  const handleClick = (event)=>{
    setSelectedCategory(event.target.value)
  }

  // main function

  const filterData = (jobs,selected,query)=>{
    let filleredJobs = jobs;

    if(query){
      filleredJobs = filteredItems
    }
    if(selected){
      filleredJobs = filleredJobs.folter(({jobLocation,maxPrice,experienceLevel,salaryType,employmentType,postingDate})=>{
        jobLocation.toLowerCase() === selected.toLowerCase() || parseInt(maxPrice) <= parseInt(selected) ||
        salaryType.toLowerCase() === selected.toLowerCase ||
        employmentType.toLowerCase() === selected.toLowerCase()


      })
    }

    return filleredJobs.map((data , i)=>{
      return <Card key={i} data ={data} />
    })
  }

  const result = filterData(jobs,selectedCategory,query);


 
  return (
    <div>
      <Banner query={query} handleInputChange={ handleInputChange}/>
      {/* Main content  */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">Left </div>
        <div className="col-span-2 bg-white p-4 rounded"><Jobs result = {result}/></div>
        
        <div className="bg-white p-4 rounded">Right</div>
      </div>
    </div>
  );
};

export default Home;
