import React from 'react'

const FilterForm = ({ filter, handleFilterChange }) => {
  return (
  <form>
    <div>
      Suodata
      <input value={filter} onChange={handleFilterChange}/>
    </div>
  </form>
  )
}

export default FilterForm