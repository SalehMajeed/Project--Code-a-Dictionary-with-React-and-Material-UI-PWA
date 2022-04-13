import { createTheme, TextField, ThemeProvider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import './header.css';
import categores from '../../data/category';

function Header({
    category, 
    setCategory, 
    word, 
    setWord,
    setMeanings,
    lightTheme,
}) {
    const darkTheme = createTheme({
        palette: {
            primary:{
                main: lightTheme ? '#000' : '#fff',
            },
            type: lightTheme ? 'light' : 'dark',
        },
});

const handleChange = (language) => {
    setCategory(prevState => language);
    setWord('')
    setMeanings([]);
}

  return (
    <div className='header'>
        <span className='title'>{word ? word : 'Word Hunt'}</span>
        <div className='inputs'>
            <ThemeProvider theme={darkTheme}>
               <TextField 
                className='search' 
                id='filled-basic'
                label='search a word' 
                value={word} 
                onChange={(e) => setWord(prevState => e.target.value)} 
               />
               <TextField
                  select        
                  label='language'
                  value={category}
                  onChange={(e) => handleChange(e.target.value)}
                  className='select'
               >
                {categores.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                            {option.value}
                        </MenuItem>
                    ))
                }
               </TextField>
            </ThemeProvider>
        </div>
    </div>
  )
}

export default Header