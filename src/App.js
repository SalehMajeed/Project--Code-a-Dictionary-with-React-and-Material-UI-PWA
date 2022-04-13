import { useEffect, useState } from 'react';
import {Container, Switch, withStyles} from '@material-ui/core'
import axios from 'axios';
import './App.css';
import Header from './components/header/Header';
import Definitions from './components/definitions/definitions';
import { grey } from '@material-ui/core/colors';

function App() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings]  = useState([]);
  const [category, setCategory] = useState('en');
  const [lightTheme, setLightTheme] = useState(false);

  const dictionaryApi = async () => {
    try{
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
      setMeanings(prevState => [...data.data])
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    dictionaryApi('fun')
  }, [word, category])

  const ModeSwitch = withStyles({
    switchBase: {
      color: grey[50],
      '&$checked': {
        color: grey[900],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div 
      className='App'
      style={{
        height: '100vh',
        backgroundColor: lightTheme ? '#fff' : '#282c34',
        color: lightTheme ? 'black' : 'white',
        transition: 'all 0.5s linear',
    }}>
      <Container 
        maxWidth='md' 
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-evenly',
          }}>
        <div 
          style={{position:'absolute', top:0, right:50, paddingTop:10}}
        >
          <span>{lightTheme ? 'Dark' : 'Light'} Mode</span>
          <ModeSwitch 
            checked={lightTheme} 
            onChange={() => setLightTheme(prevState => !lightTheme)} 
          />
        </div>
        <Header 
          category={category} 
          setCategory={setCategory} 
          word={word} 
          setWord={setWord} 
          setMeanings={setMeanings}
          lightTheme={lightTheme}
          />
        {meanings && (
          <Definitions
             word={word} 
             meanings={meanings} 
             category={category}
             lightTheme={lightTheme}
             />
            )}
      </Container>
    </div>
  );
}

export default App;
