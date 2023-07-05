import {createContext, useCallback, useContext, useEffect, useReducer} from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
};

// reducer함수안에는 가능한 많은 비즈니스 로직을 수행햐게 해야하지만 pure해야하므로 HTTP요청 등은 X.  --> 비동기함수랑 함께할 때의 한계.
// dispatch action type명은 '이벤트' 중심으로 한다. (ex: setCities -> 'cities/loaded')
function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {...state, isLoading: true};
        case 'city/loaded':
            return {...state, isLoading: false, currentCity: action.payload};
        case 'cities/loaded':
            return {...state, isLoading: false, cities: action.payload};
        case 'city/created':
            return {...state, isLoading: false, currentCity: action.payload, cities: [...state.cities, action.payload]};
        case 'city/deleted':
            return {...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)};
        case 'rejected':
            return {...state, isLoading: false, error: action.payload};
        default:
            throw new Error("Unknown action type");
    }
}


export function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({type: 'loading'});
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data});
            } catch (e) {
                dispatch({type: 'rejected', payload: "There was an error loading cities..."});
            }
        }

        fetchCities();
    }, []);

    const getCity = useCallback(async function getCity(id) {
        if(Number(id) === currentCity.id) return;
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data});
        } catch (e) {
            dispatch({type: 'rejected', payload: "There was an error loading city..."});
        }
    },[currentCity.id]);

    async function createCity(newCity) {
        try {
            dispatch({type: 'loading'});
            const res = await fetch(`${BASE_URL}/cities/`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            dispatch({type: 'city/created', payload: data});
        } catch (e) {
            dispatch({type: 'rejected', payload: "There was an error creating city..."});
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({type: 'loading'});
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            dispatch({type: 'city/deleted', payload: id});
        } catch (e) {
            dispatch({type: 'rejected', payload: "There was an error deleting city..."});
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity,
            error
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside the Provider");
    return context;
}