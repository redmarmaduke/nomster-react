import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import Landing from './pages/Landing';
import Results from './pages/Results';
import Footer from './components/Footer';

function App() {
  const [ query, setQuery ] = useState({});
  const [ results, setResults ] = useState({
    businesses: [],
    region: {
      center: {
        latitude: 0.0,
        longitude: 0.0
      }
    },
    total: 0
  });
  useEffect(() => {
    var params = new URLSearchParams(query);
    fetch(`/api/listing?${params.toString()}`).then((res) => {
      return res.json();
    }).then((data) => {
      data = data || {};
      setResults(data);
    }).catch((error) => {
      console.log(error);
    });
  },[query]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} query={query} setQuery={setQuery} />} />
          <Route path="/results" render={(props) => <Results {...props} results={results}/>} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
