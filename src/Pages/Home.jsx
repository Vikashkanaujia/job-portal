import React, { useEffect } from "react";
import { useState } from "react";
import Banner from "../components/Banner";
import Jobs from "../components/Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  //Filter job by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // <---------------- Radio based button filtering ----------

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  // <-----button based filtering ---------->
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  //     calculate the index range

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };
  // function for the next page

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main function

  const filterData = (jobs, selected, query) => {
    let filleredJobs = jobs;
    // console.log(jobs);
    // <------------------filtering input items------------>
    if (query) {
      filleredJobs = filteredItems;
    }
    // <-------------category filtering---------------->
    // console.log(selected);
    if (selected) {
      filleredJobs = filleredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
        // postingDate >= selected
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
    }
    // console.log(filleredJobs);

    // Slice the data bsased on current page
    const { startIndex, endIndex } = calculatePageRange();
    filleredJobs = filleredJobs.slice(startIndex, endIndex);

    return filleredJobs.map((data, i) => {
      return <Card key={i} data={data} />;
    });
  };

  const result = filterData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* Main content  */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* Job cards */}
         <div className="col-span-2 bg-white p-4 rounded-sm ">
          {isLoading ? (
            <p className="font-medium">Loading....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found!</p>
            </>
          )
        }
        {
          result.length > 0 ? (
            <div className = "flex justify-center mt-4 space-x-8">
            <button onClick = {prevPage} disabled={currentPage === 1} className="hover:underline">Previous</button>
            <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
            <button onClick = {nextPage} disabled = {currentPage === Math.ceil(filteredItems.length /itemsPerPage )}
             className="hover:underline">Next</button>
            </div>
          ) : ""
        }
        </div>
        {/* Right side */}
        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>
    </div>
  );
};

export default Home;
