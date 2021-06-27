import React from 'react';
import './Search.scss';
import Button from '@material-ui/core/Button';

const Search = () => {
    return (
        <div className="search_box">
            <input className="search_input" type="text" name="search_input" placeholder="Search For Websites..." />
            {/* <Button variant="contained" style={{background:'#46ed99',color:'white'}} className="search_btn" children="Search"/> */}
        </div>
   )
}

export default Search
