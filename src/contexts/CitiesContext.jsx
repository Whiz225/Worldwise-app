import {
  createContext,
  // memo,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";

const CitiesContext = createContext();
// const BASE_URL = "http://localhost:8000/api/v1/worldwise";
const BASE_URL = "https://booking-app-api-tp56.onrender.com/api/v1/worldwise";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city._id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    case "error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown command");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/city`);
        const data = await res.json();
        // console.log(data.data.data);
        dispatch({ type: "cities/loaded", payload: data.data.data });
      } catch {
        dispatch({
          type: "error",
          payload: "There was an error fetching cities",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (+id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/city/${id}`);
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "city/loaded", payload: data.data.data });
      } catch {
        dispatch({
          type: "error",
          payload: "There was an error getting city",
        });
      }
    },
    [currentCity.id]
  );

  async function creatCity(newCity) {
    // console.log("newCity", newCity);
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/city`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "city/created", payload: data.data.data });
    } catch (err) {
      // console.log("err", err);
      dispatch({
        type: "error",
        payload: "There was an error creating city",
      });
    }
  }

  async function deleteCity(id) {
    // console.log("id", id);
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/city/${id}`, {
        method: "DELETE",
      });
      // console.log("deleted");
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        creatCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = function () {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };

// import {
//   createContext,
//   // memo,
//   useCallback,
//   useContext,
//   useEffect,
//   useReducer,
//   // useState,
// } from "react";

// const CitiesContext = createContext();
// const BASE_URL = "http://localhost:8000";

// const initialState = {
//   cities: [],
//   isLoading: false,
//   currentCity: {},
//   error: "",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "cities/loaded":
//       return { ...state, cities: action.payload, isLoading: false };
//     case "loading":
//       return { ...state, isLoading: true };
//     case "city/created":
//       return {
//         ...state,
//         isLoading: false,
//         cities: [...state.cities, action.payload],
//         currentCity: action.payload,
//       };
//     case "city/loaded":
//       return { ...state, currentCity: action.payload, isLoading: false };
//     case "city/deleted":
//       return {
//         ...state,
//         cities: state.cities.filter((city) => city.id !== action.payload),
//         isLoading: false,
//         currentCity: {},
//       };
//     case "error":
//       return { ...state, isLoading: false, error: action.payload };

//     default:
//       throw new Error("Unknown command");
//   }
// }

// function CitiesProvider({ children }) {
//   const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );
//   // const [cities, setCities] = useState([]);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [currentCity, setCurrentCity] = useState({});

//   useEffect(function () {
//     async function fetchCities() {
//       dispatch({ type: "loading" });
//       try {
//         const res = await fetch(`${BASE_URL}/cities`);
//         const data = await res.json();
//         dispatch({ type: "cities/loaded", payload: data });
//       } catch {
//         dispatch({
//           type: "error",
//           payload: "There was an error fetching cities",
//         });
//       }
//     }
//     fetchCities();
//   }, []);

//   const getCity = useCallback(
//     async function getCity(id) {
//       if (+id === currentCity.id) return;
//       dispatch({ type: "loading" });
//       try {
//         const res = await fetch(`${BASE_URL}/cities/${id}`);
//         const data = await res.json();
//         console.log(data);
//         dispatch({ type: "city/loaded", payload: data });
//       } catch {
//         dispatch({
//           type: "error",
//           payload: "There was an error getting city",
//         });
//       }
//     },
//     [currentCity.id]
//   );

//   async function creatCity(newCity) {
//     console.log("newCity", newCity);
//     dispatch({ type: "loading" });
//     try {
//       const res = await fetch(`${BASE_URL}/cities`, {
//         method: "POST",
//         body: JSON.stringify(newCity),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
//       dispatch({ type: "city/created", payload: data });
//     } catch {
//       dispatch({
//         type: "error",
//         payload: "There was an error creating city",
//       });
//     }
//   }

//   async function deleteCity(id) {
//     dispatch({ type: "loading" });
//     try {
//       await fetch(`${BASE_URL}/cities/${id}`, {
//         method: "DELETE",
//       });
//       dispatch({ type: "city/deleted", payload: id });
//     } catch {
//       dispatch({
//         type: "error",
//         payload: "There was an error deleting city",
//       });
//     }
//   }

//   return (
//     <CitiesContext.Provider
//       value={{
//         cities,
//         isLoading,
//         currentCity,
//         error,
//         getCity,
//         creatCity,
//         deleteCity,
//       }}
//     >
//       {children}
//     </CitiesContext.Provider>
//   );
// }

// const useCities = function () {
//   const context = useContext(CitiesContext);
//   if (context === undefined)
//     throw new Error("CitiesContext was used outside the CitiesProvider");
//   return context;
// };

// export { CitiesProvider, useCities };
