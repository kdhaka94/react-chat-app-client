import React, { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import { themeDark } from '../../../theme/themeDark';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    width: 230,
    borderRadius: '9999px',
    color: 'white',
    flex: 1,
    '&::placeholder': {
      color: '#efefef',
    },
  },
  iconButton: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fefefe',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');
  function changeTheme() {
    // Iterarte through each class
    Object.keys(themeDark).map((cls) => {
      // Create an elem of it
      const elem = document.getElementsByClassName(cls)[0];
      // Iterate through each style and apply
      Object.keys(themeDark[cls]).map((sty) => {
        elem.style[sty] = themeDark[cls][sty];
      });
    });
  }
  function openMenu() {
    changeTheme();
  }

  function handleSearchChange(e) {
    setSearchInput(e.target.value);
    console.log(e.target.value);
  }
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">
          <h1>Chats</h1>
          <IconButton
            onClick={openMenu}
            style={{ color: 'white' }}
            aria-label="upload picture"
            component="span"
          >
            <MoreVertIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="search-bar">
            <InputBase
              className={classes.input}
              value={searchInput}
              placeholder="Search users and messages"
              InputProps={{ classes: { input: classes['input'] } }}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
