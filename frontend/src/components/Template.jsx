import React from 'react';
import "./Template.css";
import BackgroundShape from '../components/BackgroundShape';

const Template = ({ title, children, button_text, onSubmit }) => {
    return (
        <div>
            <BackgroundShape />
            <div className="card">
                <h1>{title}</h1>

                {children}

                <button onClick={onSubmit}>
                    {button_text}
                </button>
            </div>
        </div>
    );
};

export default Template;