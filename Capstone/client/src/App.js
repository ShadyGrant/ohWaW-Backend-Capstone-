import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from './components/Header';
import { ProductProvider } from './providers/ProductProvider';
import { DepartmentProvider } from './providers/DepartmentProvider';
import { CommentProvider } from './providers/CommentProvider';



function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ProductProvider>
          <DepartmentProvider>
            <CommentProvider>
              <Header />
              <ApplicationViews />
            </CommentProvider>
          </DepartmentProvider>
        </ProductProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
