import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Template.css";
import BackgroundShape from '../components/BackgroundShape';

const Template = ({title, children, button_text, naviagateTo}) =>{
     const navigate = useNavigate();

    return(
        <div>
            <BackgroundShape></BackgroundShape>
            <div className="card">
             <h1>{title}</h1>

             {children}
        
             <button onClick={() => navigateTo && navigate(navigateTo)}>
               {button_text}
             </button>
            </div>  
        </div>
    );
};

export default Template;