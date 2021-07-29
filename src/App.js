import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemContainer from './components/ItemContainer';
import NewItemForm from './components/NewItemForm';
import EditItemForm from './components/EditItemForm';
import OrderCard from './components/OrderCard';
import Auth from './components/Auth';
import LogIn from './components/LogIn';

function App() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    async function fetchItems(path) {
      let res = await fetch(`http://localhost:3001/`);
      let json = await res.json();
      if (path == 'items') {
        setItems(json);
      }
    }
    fetchItems('items');
  }, []);

  return (
    <div className='App'>
      <Navbar currentUser={currentUser} />
      <Switch>
        <Route exact path='/items/new'>
          <NewItemForm items={items} setItems={setItems} />
        </Route>
        <Route exact path='/items/:id/edit'>
          <EditItemForm items={items} setItems={setItems} />
        </Route>
        <Route exact path='/'>
          <ItemContainer items={items} setItems={setItems} />
        </Route>
        <Route exact path='/orders/:id'>
          <OrderCard />
        </Route>
        <Route exact path='/sign_up'>
          <Auth setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path='/log_in'>
          <LogIn setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
