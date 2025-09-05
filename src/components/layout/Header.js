import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PersonIcon from '@material-ui/icons/Person';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Header.css';

function Header({ onLogout }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/market', label: 'Market', icon: <TrendingUpIcon /> },
    { path: '/portfolio', label: 'Portfolio', icon: <AccountBalanceWalletIcon /> },
    { path: '/profile', label: 'Profile', icon: <PersonIcon /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', searchQuery);
  };

  return (
    <header className="header" style={{ backgroundColor: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/dashboard" className="logo__link">
            <div className="logo__icon" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }}>
              <span>K</span>
            </div>
            <span className="logo__text" style={{ color: theme.textPrimary }}>KOSH</span>
          </Link>
        </div>

        {/* Search */}
        <div className="header__search">
          <form onSubmit={handleSearch} className="search__form">
            <div className="search__container" style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}` }}>
              <SearchIcon style={{ color: theme.textSecondary }} />
              <input
                type="text"
                placeholder="Search stocks, funds, gold..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search__input"
                style={{ color: theme.textPrimary }}
              />
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="header__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav__item ${location.pathname === item.path ? 'nav__item--active' : ''}`}
              style={{
                color: location.pathname === item.path ? theme.primary : theme.textSecondary,
                borderBottom: location.pathname === item.path ? `2px solid ${theme.primary}` : 'none'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header__actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="action__btn"
            style={{ color: theme.textSecondary }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </button>

          {/* User Avatar & Logout */}
          <div className="user__section">
            <div className="user__avatar" style={{ backgroundColor: theme.primary }}>
              <PersonIcon style={{ color: 'white' }} />
            </div>
            <button
              onClick={onLogout}
              className="action__btn logout__btn"
              style={{ color: theme.textSecondary }}
              title="Logout"
            >
              <ExitToAppIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;