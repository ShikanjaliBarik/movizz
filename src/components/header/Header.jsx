import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import { auth, provider } from "../firebase/firebase";


import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Login from "../login/Login";

import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
} from "../features/user/userSlice";

import { createSlice } from '@reduxjs/toolkit';

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isSignedIn: false,
  },
  reducers: {
    setSignOutState: (state) => {
      state.user = null;
      state.isSignedIn = false;
    },
  },
});
export const { setSignOutState } = userSlice.actions;

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
          navigate("/home");
        }
      });
    }, [userName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [setUserName] = useState(null);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

   // useEffect(() => {
   //     auth.onAuthStateChanged(async (user) => {
   //       if (user) {
   //         setUser(user);
   //         navigate("/home");
   //       }
   //     });
   //   }, [userName]);
    
      
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    const handleAuth = () => {
      if (!userName) {
        auth
          .signInWithPopup(provider)
          .then((result) => {
            setUser(result.user);
          })
          .catch((error) => {
            alert(error.message);
          });
      } else if (userName) {
        auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((err) => alert(err.message));
      }
    };
      

      const setUser = (user) => {
        dispatch(
          setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>

                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                    <li>
                <SignOut>
                   < UserImg src = { userPhoto } alt={ userName }  />
                    <DropDown>
                       <span onClick={handleAuth}>Sign out</span>
                     </DropDown>
                 </SignOut>
                 </li>
                 </ul>
                 
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;



const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 200;
    height: 200;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
      background-color: #f9f9f9;
      color: #000;
      border-color: transparent;
    }
  }
`;