import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sparkleIcon from "../assets/sparkle.svg"; 
import summaryresultIcon from "../assets/summary result.svg";
import sourcematerialIcon from "../assets/source material.svg";
import chatlogoIcon from "../assets/chat logo.png";
import attachfileIcon from "../assets/attach file.svg";
import robotIcon from "../assets/robot.svg";
import linkIcon from "../assets/link.svg";
import historiqueIcon from "../assets/historique.svg";
import exportlogo from "../assets/export.svg";
import copyIcon from "../assets/copy.svg";
import addIcon from "../assets/add.svg";
import profileIcon from "../assets/profile.svg";
import pencilIcon from "../assets/pencil.svg";
import add2Icon from "../assets/add2.svg";
import logoutIcon from "../assets/logout.svg";

const API_BASE_URL = "http://localhost:8000";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const Chat = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  //const [isAuthenticated, setIsAuthenticated] = useState(true); //see the design if user is connected without the backend
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [editing, setEditing] = useState(false);
  

  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profile_pic") || null);
  const [history, setHistory] = useState([]);

  //to change the picture just click on the circle it changes locally
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const savedPic = localStorage.getItem("profile_pic");
      if (savedPic) setProfilePic(savedPic);
      fetchUserData();
    }
  }, []);

  //took it from user.py 
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const config = authHeader();

      const profileRes = await axios.get(`${API_BASE_URL}/me/profile`, config);
      setUserProfile(profileRes.data);

      const localName = localStorage.getItem("username");
      setUsername(localName || profileRes.data.user_name || "Guest");


      const historyRes = await axios.get(`${API_BASE_URL}/me/history`, config);
      setHistory(historyRes.data.conversations || []);
      
    } catch (err) {
      console.log("Profile/history error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.clear();
        setIsAuthenticated(false);
        setUsername("Guest");
        setProfilePic(null);
        setHistory([]);
      }
    }
  };

  
  useEffect(() => {
    const handleClick = () => setOpenProfile(false);
    if (openProfile) {
      setTimeout(() => { window.addEventListener("click", handleClick); }, 0);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [openProfile]);
  const handleProfileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  //chenged locally but no endpoints in the backend
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    //may not work after refresh or logout doesn't save permanently 
    const previewUrl = URL.createObjectURL(file);
    setProfilePic(previewUrl);
    localStorage.setItem("profile_pic", previewUrl);
  };
  //used main(2).py for the routs of summarize-pdf
  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Veuillez sélectionner un fichier PDF.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/summarize-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
      });
      setSummary(response.data.summary);
      setText(`Analyse du fichier : ${file.name}`);
      fetchUserData();
    } catch (error) {
      alert("Erreur lors de l'analyse du PDF.");
    } finally {
      setIsLoading(false);
    }
  };
  //used main(2).py for text and pdf
  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/summarize-text`, {
        text: text
      }, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setSummary(response.data.summary);
      fetchUserData();
    } catch (error) {
      alert(error.response?.data?.detail || "Erreur de connexion.");
    } finally {
      setIsLoading(false);
    }
  };
  //not sure for the routs
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) await axios.post(`${API_BASE_URL}/auth/logout`, {}, { headers: { "Authorization": `Bearer ${token}` } }); //
    } finally {
      localStorage.clear();
      setIsAuthenticated(false);
      setUsername("Guest");
      setProfilePic(null);
      setHistory([]);
      navigate("/");
    }
  };

  return (
    <div className="app-container">
      <div className="background">
        <div className="shape1"></div>
        <div className="shape2"></div>
      </div>

      <header className="navbar">
        <div className="brand">ESP Platform</div>
        <div className="nav-links"><span className="active-link">Summary</span></div>

        <div className="nav-right-section">
          {isAuthenticated ? (
            <div className="profile-icon-container" onClick={(e) => {e.stopPropagation(); setOpenProfile(!openProfile);}}>
              <img src={profilePic || profileIcon} className="navbar-profile-svg" alt="Profile" style={{ borderRadius: '50%', width: '32px', height: '32px', objectFit: 'cover' }} />
            </div>
          ) : (
            <button className="sign-in-btn-nav" onClick={() => navigate("/signin")}>SIGN IN</button>
          )}
        </div>

        {openProfile && isAuthenticated && (
          <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-avatar" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              {profilePic ? <img src={profilePic} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : <div className="avatar-fallback">{username.charAt(0).toUpperCase()}</div>}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            </div>
            
            <div className="popup-name-section">
              {!editing ? (
                <div className="name-display-row-centered">
                  <span className="user-name-text-normal">{username}</span>
                  <button className="edit-name-btn-tiny" onClick={() => setEditing(true)}><img src={pencilIcon} className="pencil-svg" alt="Edit" /></button>
                </div>
              ) : (
                <input 
                  className="edit-input" 
                  value={username} 
                  onChange={(e) => {
                    setUsername(e.target.value);
                    localStorage.setItem("username", e.target.value);
                  }} 
                  onBlur={() => setEditing(false)} 
                  autoFocus 
                />
              )}
            </div>

            <div className="popup-actions-solid">
              <button className="action-btn-solid" onClick={() => navigate("/")}><img src={add2Icon} className="action-svg" alt="" /><span>Add account</span></button>
              <button className="action-btn-solid logout-btn-solid" onClick={handleLogout}><img src={logoutIcon} className="action-svg" alt="" /><span>Logout</span></button>
            </div>
          </div>
        )}
      </header>

      <div className="chat-layout">
        <aside className="sidebar">
          <div className="sidebar-top">
            <button className="new-btn-simple" onClick={() => {setText(""); setSummary("");}}>
              <img src={addIcon} alt="" /> NEW SUMMARY
            </button>
            <div className="menu-item-simple active"><img src={historiqueIcon} alt="" /><span>HISTORY</span></div>
            
            <div className="sidebar-content" style={{ marginTop: '20px' }}>
              {isAuthenticated ? (
                <div className="history-list">
                  {history.length > 0 ? (
                    history.map((conv) => (
                      <div key={conv.id} className="history-item" style={{display:'flex', alignItems:'center', padding:'8px', cursor:'pointer', marginBottom:'5px'}}>
                        <img src={historiqueIcon} alt="" style={{width:'14px', marginRight:'10px', opacity:0.6}} />
                        <span style={{fontSize:'13px', color:'white', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                          {conv.title || "Untitled Summary"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p style={{fontSize:'12px', opacity:0.5, textAlign:'center'}}>No history yet</p>
                  )}
                </div>
              ) : (
                <div className="auth-box-sidebar">
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>Sign in to see history</p>
                  <button onClick={() => navigate("/signin")}>Get Started</button>
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <section className="workspace">
            <div className="header-text">
              <h1>Cognitive <span className="gradient-text">Extraction</span> <img src={chatlogoIcon} className="chat-main-logo" alt="" /></h1>
              <p>Transform dense documentation into actionable insights.</p>
            </div>

            <div className="grid-container">
              <div className="glass-card source-card">
                <div className="card-header-row">
                  <div className="header-title">
                    <img src={sourcematerialIcon} className="card-icon" alt="" />
                    <span>SOURCE MATERIAL</span>
                  </div>
                  {isAuthenticated && (
                    <div className="header-actions-right">
                      <img src={attachfileIcon} className="attach-icon" style={{ cursor: 'pointer' }} onClick={() => pdfInputRef.current.click()} alt="Import" />
                      <input type="file" ref={pdfInputRef} style={{ display: 'none' }} accept=".pdf" onChange={handlePdfUpload} />
                      <img src={linkIcon} className="action-icon" alt="Link" />
                    </div>
                  )}
                </div>
                <textarea placeholder="Paste text or upload PDF..." value={text} onChange={(e) => setText(e.target.value)} />
                <button className="sum-button" onClick={handleSummarize} disabled={isLoading || !text}>
                  {isLoading ? "Summarizing..." : "Summarize"} 
                  {!isLoading && <img src={sparkleIcon} className="btn-icon-inner" alt="" />}
                </button>
              </div>

              <div className="right-column">
                <div className="glass-card result-card">
                  <div className="card-header-row">
                    <div className="header-title">
                      <img src={summaryresultIcon} className="card-icon" alt="" />
                      <span>Summary result</span>
                    </div>
                    {isAuthenticated && summary && ( //icons will show if user is connected and after the summary
                      <div className="header-actions mini-actions">
                         <div className="action-group" style={{cursor:'pointer'}} onClick={() => {navigator.clipboard.writeText(summary); alert("Copied!");}}>
                           <img src={copyIcon} className="action-icon-small" alt="" />
                           <span>COPY</span>
                         </div>
                         <div className="action-group" style={{cursor:'pointer'}}> 
                           <img src={exportlogo} className="action-icon-small" alt="" />
                           <span>EXPORT</span>
                         </div>
                      </div>
                    )}
                  </div>
                  <div className="result-display-area" style={{padding: '20px', color: 'white', overflowY: 'auto'}}>
                    {isLoading ? (
                      <div className="empty-state"><p>Analysis in progress...</p></div>
                    ) : summary ? (
                      <div className="summary-output">{summary}</div>
                    ) : (
                      <div className="empty-state">
                        <img src={robotIcon} className="robot-svg" alt="" />
                        <p>Results will materialize here...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Chat;