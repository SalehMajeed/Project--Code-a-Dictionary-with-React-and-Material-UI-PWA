import React from 'react'
import './definitions.css'

function definitions({word, category, meanings, lightTheme}) {
  return (
    <div className='meanings'>
        {
            meanings[0] && word && category === 'en' && (
                <audio 
                    style={{ backgroundColor: '#fff', borderRadius: 10 }}
                    controls
                >
                    <source 
                        src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
                    />
                    Your Browser doesn't support audio element.
                </audio>
            )
        }
        {
            word === '' ? (<span className='subTitle'>Start by typing a word in Search</span>) 
                : (
                    meanings.map((mean) =>(
                        mean.meanings.map((item) => (
                            item.definitions.map((def) => (
                                <div 
                                    className='singleMean' 
                                    style={{
                                        backgroundColor: lightTheme ? '#3b5360' : 'white', 
                                        color:lightTheme ? 'white' : 'black',
                                    }}
                                >
                                    <b>{def.definition}</b>
                                    <hr style={{backgroundColor: 'black', width:'100%'}} />
                                    {
                                        def.example && (
                                            <span>
                                                <b>Example:</b>
                                                {def.example}
                                            </span>
                                        )
                                    }
                                    {
                                        def.synonyms && (
                                            <span>
                                                <b>synonyms</b>
                                                {def.synonyms.map((s) => `${s},`)}
                                            </span>
                                        )
                                    }
                                </div>
                            ))
                        ))
                    ))
                )
        }
    </div>
  )
}

export default definitions