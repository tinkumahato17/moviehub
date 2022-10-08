// context api
// context hooks

// context(warehouse) // bundle of data or data store
// Provider // provider means like delivery boy who take the food and give the consumer 
// consumer // who only get the things
import React, { useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

//we need to create a provider function

const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: 'false', msg: '' });
    const [query, setQuery] = useState("titanic");

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false);
                setIsError({
                    show: 'false',
                    msg: " ",
                })
                setMovie(data.Search);
            } else {
                setIsError({
                    show: 'true',
                    msg: data.Error,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //Debounce Debouncing is used for optimizing the performance of a web app. It is done by limiting the rate of execution of a particular function (also known as rate limiting). We will learn about debouncing by implementing it on an input box with an onChange event.
     let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        },400);
    return () => clearTimeout(timerOut);
    }, [query])

    return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>{children}</AppContext.Provider>
}

//create global custom hooks
const useGlobalContext = () => {
    return useContext(AppContext);
}
export { AppContext, AppProvider, useGlobalContext };