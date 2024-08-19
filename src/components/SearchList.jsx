import React from 'react'
import "./SearchList.css"

export const SearchList = ({result,onSelectCity}) => {
    return     <div
    className="search-result"
    onClick={() => onSelectCity(result.name)}
  >
    {result.name}
  </div>
}