import React from 'react'

import "./SearchResults.css"
import { SearchList } from './SearchList'
export const SearchResults = ({results,onSelectCity}) => {
    
    return (
        <div className='result-list'>
            {
                results.map((result,id) => {
                    return <SearchList result={result} key={id} onSelectCity={onSelectCity}/>;
                })
            }
        </div>
    )
}