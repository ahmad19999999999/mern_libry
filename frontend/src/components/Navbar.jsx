import React, { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import '../Style/componentStyles/Navbar.css'
import '../Style/pageStyles/Search.css'
import { useSelector, useDispatch } from 'react-redux';
import { logout, removeAccess } from '../slice/users/userslice.js'; 
import { toast } from 'react-toastify'

const Navbar = () => {
    const [issearchopen,setissearchopen]=useState(false)
    const [searchQuery,setsearchQuery]=useState("")
    const [ismenuopen,setismenuopen]=useState(false)
    const toglesearch=()=> setissearchopen(prev => !prev)
    const toggelmenu=()=> setismenuopen(prev => !prev)
 
    const {isAuthenticated}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handelsearchsubmit=(e)=>{
        e.preventDefault()
        if(searchQuery.trim()){
            navigate(`/books?keyword=${encodeURIComponent(searchQuery.trim())}`)
        }
        else{
            navigate('/books')
        }
        setsearchQuery("")
        setissearchopen(false)
        setismenuopen(false)
    }

    const handleLogout = () => {
        dispatch(logout()).unwrap().then(() => {
      toast.success('Logout successful', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeAccess()); 
      navigate('/login');
    }).catch(() => {
      toast.error('Logout failed. Please try again.');
    });
    }
  
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" onClick={()=>setismenuopen(false)}>
                    DremLibry
                    </Link>
                </div>
                <div className={`navbar-links ${ismenuopen ? `active`:""}`}>
                    <ul>
                        <li><Link to="/" onClick={()=>setismenuopen(false)}>Home</Link></li>
                        <li><Link to="/books" onClick={()=>setismenuopen(false)}>Books</Link></li>
                        <li><Link to="/About-us" onClick={()=>setismenuopen(false)}>About-us</Link></li>
                       
                    </ul>
                </div>
                <div className="navbar-icons">
                    <div className="search-container">
                        {issearchopen && (
                            <form className={`search-form active`} onSubmit={handelsearchsubmit}>
                                <input type="text" className='search-input' placeholder='search books ...' 
                                value={searchQuery} onChange={(e)=>setsearchQuery(e.target.value)} autoFocus/>
                            </form>
                        )}
                        <button 
                            type="button" 
                            className='search-icon' 
                            onClick={toglesearch} 
                            aria-label={issearchopen ? "Close search" : "Open search"}>
                            <SearchIcon focusable="false"/>
                        </button>
                    </div>

                    {!isAuthenticated ? (
                        <Link to="/register" className='register-link' onClick={()=>setismenuopen(false)}>
                            <PersonAddIcon className="icon"/>
                        </Link>
                    ) : (
                        <Tooltip title="Logout">
                        <IconButton  onClick={handleLogout} color="primary" size="large" aria-label="logout">
                        <LogoutIcon />
                        </IconButton>
                         </Tooltip>
                    )}

                    <div className="navbar-hamburger" onClick={toggelmenu}>
                        {ismenuopen ? <CloseIcon className="icon"/>:<MenuIcon className="icon"/>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
