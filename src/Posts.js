import React from 'react'
import "./Posts.css";
import  {forwardRef} from "react";
import { Avatar } from '@mui/material';
import InputOption from './InputOption';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Posts =forwardRef(({name, description, message,photoUrl},ref) => {
  return (
    <div ref={ref} className='posts'>
        <div className='post_header'>
            <Avatar src={photoUrl} > {name[0]} </Avatar>
            <div className='post_info'>
                <h2> {name}</h2>
                <p> {description}</p>

            </div>
        </div>
        <div className='post_body'>
            <p> {message}</p>

        </div>
        <div className='post_buttons'>
            <InputOption Icon={ThumbUpAltSharpIcon} title='like' color='gray' />
            <InputOption Icon={ChatSharpIcon} title='comment' color='gray' />
            <InputOption Icon={ShareSharpIcon} title='share' color='gray' />
            <InputOption Icon={SendOutlinedIcon} title='send' color='gray' />

        </div>
    </div>
  )
})

export default Posts