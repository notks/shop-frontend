import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Items from "../Items/Items";
import Sidebar from "../Sidebar/Sidebar";
import Order from "../Order/Order";
import Home from "../Home/Home";
import Login from "../Login/Login";
import "./Content.scss";
import { useState, useEffect,useRef } from "react";
import Auth from "../../Auth";
export default function Content({ cart, setcart, auth }) {
  const url = "http://127.0.0.1:8000/api/products";
  const [items, setitems] = useState([]);
  const [authstate, setauthstate] = useState()
  //const authstate = useRef(false)
  
  

  useEffect( () => {
    
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setitems(json);
      });
  },[]);

  return (
    <>
    {authstate}
      <BrowserRouter>
        <Switch>
          <>
            <div className="content">
              <div className="main">
                <Route
                  path="/"
                  exact
                  render={() => (
                    <Items cart={cart} setcart={setcart} items={items}></Items>
                  )}
                ></Route>
                <Route
                  path="/order"
                  exact
                  render={() =>
                  
                    
                      
                    
                      <Order cart={cart}></Order>
                    
                    
                  }
                ></Route>
                <Route
                  path="/home"
                  exact
                  render={() =>
                   
                      <Home></Home>
              
                  }
                ></Route>
                <Route
                  path="/login"
                  exact
                  render={() => <Login auth={auth}></Login>}
                ></Route>
              </div>

              <Sidebar setcart={setcart} cart={cart}></Sidebar>
            </div>
          </>
        </Switch>
      </BrowserRouter>
    </>
  );
}
