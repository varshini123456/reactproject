import React from 'react'
import {makeStyles, InputBase, fade } from '@material-ui/core';
import {Search} from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
    search: {
        borderRadius: 2,
        backgroundColor: '#fff',
        marginLeft: 10,
        width: '38%',
        display: 'flex',
      },
      searchIcon: {
        padding: 5,
        height: '100%',
        display: 'flex',
        color: '#0b53d6',
      },
      inputRoot: {
        width: '100%',
        fontSize : 'unset',
      },
      inputInput: {
        paddingLeft: 20,
       
      },
}))

// functionality given to search bar

function SearchBar(){
    const classes = useStyle();
    return (
            <div className={classes.search}>
                <InputBase
                placeholder="Search for products, brands..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
                <div className={classes.searchIcon} >
                  <Search />
                </div>
          </div>
    );
}

export default SearchBar;