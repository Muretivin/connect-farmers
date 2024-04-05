import React from 'react'
import './Widgets.css';
import { FiberManualRecord, InfoRounded } from '@mui/icons-material';

function Widgets() {
    const newsArticle = (heading,subtitle) =>(
        <div className='widgets_article'>
            <div  className='widgets_articleleft'>
                <FiberManualRecord />

            </div>
            <div className='widgets_articleright'>
                <h4> {heading}</h4>
                <p> {subtitle}</p>

            </div>

        </div>
    )
  return (
    <div className='widgets'>
        <div className='widgets_header'>
            <h2> Kilimo News</h2>
            <InfoRounded />
        </div>
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}
        {newsArticle('great improvent in farming ', 'top news ')}

    </div>
  )
}

export default Widgets