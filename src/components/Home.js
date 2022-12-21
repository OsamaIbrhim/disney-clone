// Components
import styled from "styled-components";
import ImgSlider from "./imgSlider";
import Recommends from "./Recommends";
import Viewers from "./Viewers";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from 'firebase/firestore'
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { useRef } from "react";

const Home = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let newDisneys = [];
    let recommends = [];
    let originals = [];
    let trending = [];

    let dataFetchedRef = useRef(false)

    useEffect(() => {
        if(dataFetchedRef.current) return ;
        dataFetchedRef.current = true;
        getDocs(collection(db, "movies"))
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                switch(doc.data().type){
                    case 'recommend':
                        recommends = [ ...recommends ,({ id: doc.id , ...doc.data()})];
                        break;
                    case 'new':
                        newDisneys = [ ...newDisneys ,({ id: doc.id , ...doc.data()})];
                        break;
                    case 'original':
                        originals = [ ...originals ,({ id: doc.id , ...doc.data()})];
                        break;
                    case 'trending':
                        trending = [ ...trending ,({ id: doc.id , ...doc.data()})];
                        break;
                };
                dispatch(setMovies({
                    recommend: recommends,
                    newDisney: newDisneys,
                    original: originals,
                    trending: trending,
                }))
            });
        })
        .catch((err)=>{
            console.log("ERROR: ", err);
        });

        
    }, [userName])

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trending />
        </Container>
    );
};

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
    &:after{
        background: url('/images/home-background.png') center center / cover no-repeat fixed;
        content: '';
        position: absolute;
        inset: 0px;
        opacity: 1;
        top: 0;
        z-index: -1;
    }
    `;

export default Home;