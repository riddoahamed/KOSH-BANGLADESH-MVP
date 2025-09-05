import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import Header from './components/layout/Header';
import Onboarding from './components/onboarding/Onboarding';
import Dashboard from './components/dashboard/Dashboard';
import MarketBrowse from './components/market/MarketBrowse';
import InstrumentDetails from './components/instrument/InstrumentDetails';
import OrderScreen from './components/order/OrderScreen';
import Portfolio from './components/portfolio/Portfolio';
import Profile from './components/profile/Profile';
import './styles/global.css';

function App() {
  // Simulate user authentication state
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('kosh-user') !== null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('kosh-user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('kosh-user');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {isAuthenticated && <Header onLogout={handleLogout} />}
          
          <Switch>
            <Route exact path="/onboarding">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <Onboarding onLogin={handleLogin} />}
            </Route>
            
            <Route exact path="/dashboard">
              {!isAuthenticated ? <Redirect to="/onboarding" /> : <Dashboard />}
            </Route>
            
            <Route exact path="/market">
              {!isAuthenticated ? <Redirect to="/onboarding" /> : <MarketBrowse />}
            </Route>
            
            <Route exact path="/instrument/:category/:symbol">
              {!isAuthenticated ? <Redirect to="/onboarding" /> : <InstrumentDetails />}
            </Route>
            
            <Route exact path="/order/:category/:symbol/:action">
              {!isAuthenticated ? <Redirect to="/onboarding" /> : <OrderScreen />}
            </Route>
            
            <Route exact path="/portfolio">
              {!isAuthenticated ? <Redirect to="/onboarding" /> : <Portfolio />}
            </Route>
            
            <Route exact path="/profile">
              {!isAuthenticated ? <Redirect to="/onboarding" /> : <Profile />}
            </Route>
            
            <Route exact path="/">
              <Redirect to={isAuthenticated ? "/dashboard" : "/onboarding"} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;