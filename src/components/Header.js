import { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from "../features/user/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                history('/home');
            }
        })
    }, [userName])

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })
        );
    }

    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider).then((result) => {
                setUser(result.user);
            })
            .catch((err) => alert(err));

        } else if (userName) {
            signOut(auth)
            .then(() => {
                dispatch(setSignOutState());
                history('/');
            })
            .catch((err) => alert(err))
        };
    }

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney+" />
            </Logo>
            { localStorage.getItem('users') ? (<>
                <NavMenu>
                    <Link to="/home" >
                        <img src="/images/home-icon.svg" alt="HOME" />
                        <span>HOME</span>
                    </Link>
                    <Link to="/search" >
                        <img src="/images/search-icon.svg" alt="SEARCH" />
                        <span>SEARCH</span>
                    </Link>
                    <Link to="/watchlist" >
                        <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                        <span>WATCHLIST</span>
                    </Link>
                    <Link to="/originals" >
                        <img src="/images/original-icon.svg" alt="ORIGINALS" />
                        <span>ORIGINALS</span>
                    </Link>
                    <Link to="/movies" >
                        <img src="/images/movie-icon.svg" alt="MOVIES" />
                        <span>MOVIES</span>
                    </Link>
                    <Link to="/series" >
                        <img src="/images/series-icon.svg" alt="SERIES" />
                        <span>SERIES</span>
                    </Link>
                </NavMenu>
                <SignOut>
                    <UserImg src={userPhoto} alt={userName} />
                    <DropDown>
                        <span onClick={handleAuth} >Sign out</span>
                    </DropDown>
                </SignOut>
            </>) : (<Login onClick={handleAuth} >Login</Login>)}
        </Nav>
    );
};

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: black ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16;
    z-index: 3;
    opacity: 1;
`;

const Logo = styled.a`
    padding: 0;
    width: 90px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;
    img {
        display: block;
        width: 100%;
    };
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 30px;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }
        span {
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1px;
            line-height: 1.08;
            padding: 2px 5px;
            white-space: nowrap;
            position: relative;
            &:before {
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 3px;
                left: 0px;
                opacity: 1;
                position: absolute;
                right: 0px;
                transform-origin: left center right;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier( 0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
            }
        }
        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }


    @media (max-width: 768px) {
        display: none;
    }
`;

const Login = styled.a`
    background-color: rgba(0,0,0,0.6) ;
    padding: 8px 17px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
    border: 1px solid ;
    cursor: pointer;
    border-radius: 5px ;
    transform: all 0.5s ease 0s;

    &:hover {
        background-color: #f9f9f9 ;
        color: #000;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19,19,19);
    border: 1px solid rgba(151,151,151,0.34);
    border-radius: 5px ;
    box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px ;
    letter-spacing: 3px ;
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

    ${UserImg}{
        border-radius: 50% ;
        width: 100%;
        height: 100%;
    }
    &:hover{
        ${DropDown} {
            opacity: 1;
            transition-duration: 1.5s;
        };
    };
`;

export default Header;