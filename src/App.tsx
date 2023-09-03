import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ArtWorkList from  "./components/ArtWorkList/ArtWorkList";
import ArtworkDetailCard from "./components/ArtWorkDetail/ArtworkDetailCard";
import Favorites from "./components/Favorites/Favorites";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container p-4 mx-auto">
          {/* Navigation */}
          <nav className="p-4 mb-8 bg-gray-800 rounded">
            <ul className="flex">
              <li className="mr-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl text-white border-b-2 border-white"
                      : "text-xl text-white"
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="mr-6">
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl text-white border-b-2 border-white"
                      : "text-xl text-white"
                  }
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* Main Content */}
          <div className="p-12">
            <Routes>
              <Route path="/" element={<ArtWorkList />} />
              <Route
                path="/artwork-detail/:id"
                element={<ArtworkDetailCard />}
              />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
