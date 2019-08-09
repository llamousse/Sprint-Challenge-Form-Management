import React from 'react';
import axios from 'axios';
import './App.css';
import RegisterForm from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.fetchUser();
  };

  componentWillUnmount() {
    this.setState({ recipes: [] });
    this.setState({ errorMessage: "recipe not found" });
  }

  fetchUser = () => {
    axios.get("http://localhost:5000/api/restricted/data")
      .then(response => {
        // console.log("recipes data", response.data)
        this.setState({ recipes: response.data });
        // console.log(this.state.recipes)
      })
      .catch(err => {
        console.log("Error: Something went wrong while loading recipes.", err);
        this.setState({ recipes: [] });
        this.setState({ errorMessage: "recipe not found" });
      })
  }

  render() {
    return (
      <div className="App">
        <RegisterForm />
        <h1>Recipes</h1>
        {this.state.recipes.map(recipe => {
          return (
            <div>
              <h1>{recipe.name}</h1>
              <p>Course: {recipe.course}</p>
              <p>Technique: {recipe.technique}</p>
              <ul>
                <p key={recipe.id}>{recipe.ingredients}</p>
              </ul>

            </div>
          );
        })}
      </div>
    );
  }
}

export default App;