import React, { useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import { ApolloProvider, useMutation, useQuery } from "@apollo/client";
import { rickAndMortyClient, 
  pokemonClient, spaceXClient, 
  Travelclient, starClient, clientHasura } from "./utils";
import { MainPage } from "./pages/MainPage";
import { CharacterPage } from "./pages/CharacterPage";
import { NotFoundPage } from "./pages/NotFound";

import { PokemonPage } from "./pages/PokemonPage";
import { CountryPage } from "./pages/CountryPage";
import { SpacePage } from "./pages/SpacePage";
import {
  GeneralCountryPage,
  GeneralPokemonPage,
  GeneralSpacePage,
} from "./pages/GeneralPages";

import "./styles.css";
import { StarFullPage } from "./pages/StarFullPage";
import { StarPage } from "./pages/StarPage";
import { FilterBar } from "./components/SearchComponent";
import { ADD_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from "./graphql";

function AllRoutes() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <nav aria-labelledby="navigation" role="navigation">
        <header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">Home</Link>
          <FilterBar />
          <Link to="/pokemon">Pokémon</Link>
          <Link to="/countries">Country</Link>
          <Link to="/space">Space</Link>
          <Link to="/star">Star wars</Link>
          <button onClick={goBack}>Go Back</button>
        </header>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/character/:id" element={<CharacterPage />} />
            <Route path="/pokemon" element={<GeneralPokemonPage />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />
            <Route path="/countries" element={<GeneralCountryPage />} />
            <Route path="/country/:code" element={<CountryPage />} />
            <Route path="/space" element={<GeneralSpacePage />} />
            <Route path="/missions/:id" element={<SpacePage />} />
            <Route path="/star" element={<StarFullPage />} />
            <Route path="/star/:id" element={<StarPage />} />
            <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </Suspense> 
    </>
  )
}

export default function App() {
  return (
    <ApolloProvider client={rickAndMortyClient}>
      <Router>
        <div className="App">
          <AllRoutes /> 
        </div>
      </Router>
    </ApolloProvider>
  );
}

export const TodoList = () => {
  const { loading, data, error } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = async () => {
    if(newTodo) {
      await addTodo({
        variables: {
          title: newTodo,
        },
        refetchQueries: [{ query: GET_TODOS}]
      })
      setNewTodo('')
    }
  }

  const handleupdateTodo = async (id, title, completed) => {
    await updateTodo({
      variables: {
        id, title, completed,
        refetchQueries: [{ query: GET_TODOS }],
      }
    })
  }

  const handleDeleteTodo = async (id) => {
    await deleteTodo({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }],
    })
    refetch()
  }

  return(
    <div>
      <h2>Todo list</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <input 
        type="text"
        placeholder="Add new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add todo</button>
      <ul>
        {data.todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button
              onClick={() => handleupdateTodo(
                todo.id, todo.title
              )}
            >Update</button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}