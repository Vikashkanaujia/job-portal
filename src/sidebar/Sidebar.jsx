import React from 'react'
import Location from './Location'
const Sidebar = ({  handleChange ,handleClick,}) => {
    return (
        <div className='space-y-5'>
            <h3 className='text-lg font-bold md-2'>filters</h3>
            <Location handleChange={handleChange}/>
        </div>
    )
}

export default Sidebar