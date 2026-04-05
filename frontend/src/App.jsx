import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <body>
     <div className="background">
      <div className='shape1'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="300" viewBox="0 0 1728 396" fill="none">
          <path d="M-22 395.5C-22 395.5 149.706 110.822 357.343 39.4446C515.196 -14.8191 627.109 2.75122 800.858 4.93921C1049.47 8.06995 1213.59 -22.1747 1430.68 94.9532C1584.2 177.78 1765 401.501 1765 401.501L-22 395.5Z" fill="#6297EC" stroke="#6297EC"/>
        </svg>
      </div>

      <div className='shape2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="270" viewBox="0 0 1714 354" fill="none">
          <path d="M0.846558 378.9C0.846558 378.9 165.346 106.17 364.268 37.7884C515.497 -14.1978 622.713 2.6351 789.17 4.73126C1027.35 7.73059 1184.58 -21.2447 1392.56 90.9674C1539.63 170.318 1712.85 384.649 1712.85 384.649L0.846558 378.9Z" fill="#FF5CAB" stroke="#6297EC" stroke-width="0.95803"/>
        </svg>
      </div>

      <div className='shape3'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="230" viewBox="0 0 1605 251" fill="none">
          <path d="M0.792725 354.776C0.792725 354.776 154.819 99.4102 341.076 35.3823C482.676 -13.2941 583.066 2.46707 738.925 4.42978C961.942 7.23816 1109.16 -19.8923 1303.9 85.1754C1441.61 159.474 1603.79 360.159 1603.79 360.159L0.792725 354.776Z" fill="#7F08FF" stroke="#6297EC" stroke-width="0.897034"/>
        </svg>
      </div>

      <div className='shape4'> 
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="170" viewBox="0 0 1489 162" fill="none">
          <path d="M0.735352 329.103C0.735352 329.103 143.615 92.2166 316.394 32.822C447.747 -12.3319 540.873 2.2887 685.453 4.10938C892.331 6.71454 1028.9 -18.4526 1209.54 79.0119C1337.28 147.934 1487.74 334.097 1487.74 334.097L0.735352 329.103Z" fill="#02D9FF" stroke="#6297EC" stroke-width="0.832121"/>
        </svg>
      </div>

      <div className='shape5'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="300" viewBox="0 0 1715 354" fill="none">
          <path d="M1713.53 0C1713.53 0 1572.82 242.679 1365.18 314.056C1207.33 368.32 1095.42 350.75 921.667 348.562C673.051 345.431 508.933 375.676 291.844 258.548C138.329 175.72 1.02522 0 1.02522 0H1713.53Z" fill="#6297EC" stroke="#6297EC"/>
        </svg>
      </div>

      <div className='shape6'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="220" viewBox="0 0 1625 316" fill="none">
          <path d="M1624.05 0C1624.05 0 1502.05 209.479 1303.13 277.861C1151.9 329.847 1044.69 313.014 878.23 310.918C640.049 307.919 482.818 336.894 274.84 224.682C127.768 145.331 1.05318 0 1.05318 0H1624.05Z" fill="#FF5CAB" stroke="#6297EC" stroke-width="0.95803"/>
        </svg>
      </div>

      <div className='shape7'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200" viewBox="0 0 1366 213" fill="none">
          <path d="M1365.24 0C1365.24 0 1315.22 112.749 1128.96 176.777C987.359 225.453 886.969 209.692 731.11 207.729C508.093 204.921 360.874 232.051 166.138 126.984C28.4293 52.6847 0.742386 0 0.742386 0H1365.24Z" fill="#7F08FF" stroke="#6297EC" stroke-width="0.897034"/>
        </svg>
      </div>

      <div className='shape8'>
        <svg xmlns="http://www.w3.org/2000/svg" width="1170" height="124" viewBox="0 0 1170 124" fill="none">
          <path d="M1168.58 -0.99998C1168.58 -0.99998 1152.71 30.8802 979.926 90.2748C848.573 135.429 755.448 120.808 610.867 118.987C403.989 116.382 267.422 141.55 86.7782 44.0849C18.6071 7.30383 3.96409 0.147243 1.07636 -0.999759L0.584625 -0.999759C0.584625 -0.999759 -0.0259627 -1.4376 1.07636 -0.999759L1168.58 -0.99998Z" fill="#02D9FF"/>
          <path d="M979.926 90.2748C1152.7 30.8802 1168.58 -0.99998 1168.58 -0.99998L0.584625 -0.999759C0.584625 -0.999759 -7.4154 -6.7364 86.7782 44.0849C267.422 141.55 403.989 116.382 610.867 118.987C755.448 120.808 848.573 135.429 979.926 90.2748Z" stroke="#6297EC" stroke-width="0.832121"/>
        </svg>
      </div>

     </div>

     <div className='Welcome-card'>
      <h1>Welcome</h1>
      <div className='card'></div>
      <button onClick={handleClick} className={animating ? 'animating' : ''}>
        <div className='arrow-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="35" viewBox="0 0 82 37" fill="none">
            <path d="M80.7931 20.1779C81.7694 19.2016 81.7694 17.6187 80.7931 16.6424L64.8832 0.732487C63.9069 -0.243824 62.324 -0.243824 61.3476 0.732487C60.3713 1.7088 60.3713 3.29171 61.3476 4.26802L75.4898 18.4102L61.3476 32.5523C60.3713 33.5286 60.3713 35.1115 61.3476 36.0878C62.324 37.0641 63.9069 37.0641 64.8832 36.0878L80.7931 20.1779ZM0 18.4102V20.9102H79.0253V18.4102V15.9102H0V18.4102Z" fill="white"/>
          </svg>
        </div>
        <span className='btn-text'> Start right here </span>
      </button>
     </div>
    </body>
  );
};
export default App;