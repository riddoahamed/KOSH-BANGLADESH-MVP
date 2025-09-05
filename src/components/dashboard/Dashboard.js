import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { dseStocks, mutualFunds } from '../../data/bangladeshMarket';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import './Dashboard.css';

function Dashboard() {
  const { theme } = useTheme();
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 125000,
    todayChange: 2450,
    todayChangePercent: 2.00,
    totalReturn: 15000,
    totalReturnPercent: 13.64
  });

  const [watchlist] = useState([
    'SQURPHAR', 'BRACBANK', 'GRAMEENPHONE', 'WALTONHIL', 'BEXIMCO'
  ]);

  const [quickStats] = useState({
    dseIndex: { value: 6842.35, change: 45.67, changePercent: 0.67 },
    goldPrice: { value: 7850, change: 25, changePercent: 0.32 },
    usdRate: { value: 109.50, change: -0.25, changePercent: -0.23 }
  });

  // Get portfolio holdings from localStorage (demo data)
  const [holdings] = useState([
    { symbol: 'SQURPHAR', shares: 50, avgPrice: 154.50, category: 'stocks' },
    { symbol: 'GRAMEENPHONE', shares: 25, avgPrice: 292.70, category: 'stocks' },
    { symbol: 'BRACMF', shares: 1000, avgPrice: 14.35, category: 'mutualfunds' },
    { symbol: 'GOLD_1G', grams: 15.5, avgPrice: 7825.00, category: 'gold' }
  ]);

  const getWatchlistData = () => {
    return watchlist.map(symbol => {
      const stock = dseStocks.find(s => s.symbol === symbol);
      return stock || null;
    }).filter(Boolean);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-BD').format(num);
  };

  return (
    <div className="dashboard" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
      <div className="dashboard__container">
        {/* Header Section */}
        <div className="dashboard__header">
          <div>
            <h1 style={{ color: theme.textPrimary }}>Good morning! 👋</h1>
            <p style={{ color: theme.textSecondary }}>
              Here's what's happening with your investments today.
            </p>
          </div>
          <Link to="/market" className="btn btn-primary">
            <ShowChartIcon />
            Explore Markets
          </Link>
        </div>

        {/* Portfolio Overview */}
        <div className="portfolio__overview">
          <div className="portfolio__card main__card" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="portfolio__header">
              <div>
                <h3 style={{ color: theme.textSecondary }}>Total Portfolio Value</h3>
                <h2 style={{ color: theme.textPrimary }}>{formatCurrency(portfolioData.totalValue)}</h2>
              </div>
              <AccountBalanceWalletIcon style={{ color: theme.primary, fontSize: '3rem' }} />
            </div>
            
            <div className="portfolio__metrics">
              <div className="metric">
                <span style={{ color: theme.textSecondary }}>Today's Change</span>
                <div className={`metric__value ${portfolioData.todayChange >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioData.todayChange >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  <span style={{ color: portfolioData.todayChange >= 0 ? theme.positive : theme.negative }}>
                    {formatCurrency(Math.abs(portfolioData.todayChange))} ({portfolioData.todayChangePercent >= 0 ? '+' : ''}{portfolioData.todayChangePercent}%)
                  </span>
                </div>
              </div>
              
              <div className="metric">
                <span style={{ color: theme.textSecondary }}>Total Return</span>
                <div className={`metric__value ${portfolioData.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioData.totalReturn >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  <span style={{ color: portfolioData.totalReturn >= 0 ? theme.positive : theme.negative }}>
                    {formatCurrency(Math.abs(portfolioData.totalReturn))} (+{portfolioData.totalReturnPercent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick__stats">
            <div className="stat__card" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
              <h4 style={{ color: theme.textSecondary }}>DSE Broad Index</h4>
              <div className="stat__value">
                <span style={{ color: theme.textPrimary }}>{formatNumber(quickStats.dseIndex.value)}</span>
                <span className={quickStats.dseIndex.change >= 0 ? 'positive' : 'negative'} style={{ color: quickStats.dseIndex.change >= 0 ? theme.positive : theme.negative }}>
                  {quickStats.dseIndex.change >= 0 ? '+' : ''}{quickStats.dseIndex.change} ({quickStats.dseIndex.changePercent >= 0 ? '+' : ''}{quickStats.dseIndex.changePercent}%)
                </span>
              </div>
            </div>

            <div className="stat__card" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
              <h4 style={{ color: theme.textSecondary }}>Gold (per gram)</h4>
              <div className="stat__value">
                <span style={{ color: theme.textPrimary }}>৳{formatNumber(quickStats.goldPrice.value)}</span>
                <span className={quickStats.goldPrice.change >= 0 ? 'positive' : 'negative'} style={{ color: quickStats.goldPrice.change >= 0 ? theme.positive : theme.negative }}>
                  {quickStats.goldPrice.change >= 0 ? '+' : ''}৳{quickStats.goldPrice.change} ({quickStats.goldPrice.changePercent >= 0 ? '+' : ''}{quickStats.goldPrice.changePercent}%)
                </span>
              </div>
            </div>

            <div className="stat__card" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
              <h4 style={{ color: theme.textSecondary }}>USD/BDT</h4>
              <div className="stat__value">
                <span style={{ color: theme.textPrimary }}>৳{quickStats.usdRate.value}</span>
                <span className={quickStats.usdRate.change >= 0 ? 'positive' : 'negative'} style={{ color: quickStats.usdRate.change >= 0 ? theme.positive : theme.negative }}>
                  {quickStats.usdRate.change >= 0 ? '+' : ''}৳{quickStats.usdRate.change} ({quickStats.usdRate.changePercent >= 0 ? '+' : ''}{quickStats.usdRate.changePercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__content">
          {/* Holdings */}
          <div className="section">
            <div className="section__header">
              <h3 style={{ color: theme.textPrimary }}>Your Holdings</h3>
              <Link to="/portfolio" style={{ color: theme.primary }}>View All</Link>
            </div>
            <div className="holdings__list">
              {holdings.slice(0, 4).map((holding, index) => {
                const isStock = holding.category === 'stocks';
                const isMutualFund = holding.category === 'mutualfunds';
                const isGold = holding.category === 'gold';
                
                let currentPrice = 0;
                let change = 0;
                let name = holding.symbol;
                
                if (isStock) {
                  const stockData = dseStocks.find(s => s.symbol === holding.symbol);
                  if (stockData) {
                    currentPrice = stockData.currentPrice;
                    change = ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                    name = stockData.name;
                  }
                } else if (isMutualFund) {
                  const fundData = mutualFunds.find(f => f.symbol === holding.symbol);
                  if (fundData) {
                    currentPrice = fundData.nav;
                    change = ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                    name = fundData.name;
                  }
                } else if (isGold) {
                  currentPrice = quickStats.goldPrice.value;
                  change = ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                  name = 'Digital Gold';
                }
                
                const currentValue = isGold ? 
                  (holding.grams * currentPrice) : 
                  (holding.shares * currentPrice);

                return (
                  <Link
                    key={index}
                    to={`/instrument/${holding.category}/${holding.symbol}`}
                    className="holding__item"
                    style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
                  >
                    <div className="holding__info">
                      <h4 style={{ color: theme.textPrimary }}>{holding.symbol}</h4>
                      <p style={{ color: theme.textSecondary }}>
                        {isGold ? `${holding.grams}g` : `${holding.shares} shares`}
                      </p>
                    </div>
                    <div className="holding__value">
                      <span style={{ color: theme.textPrimary }}>{formatCurrency(currentValue)}</span>
                      <span className={change >= 0 ? 'positive' : 'negative'} style={{ color: change >= 0 ? theme.positive : theme.negative }}>
                        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Watchlist */}
          <div className="section">
            <div className="section__header">
              <h3 style={{ color: theme.textPrimary }}>Watchlist</h3>
              <Link to="/market" style={{ color: theme.primary }}>Manage</Link>
            </div>
            <div className="watchlist__list">
              {getWatchlistData().map((stock, index) => (
                <Link
                  key={index}
                  to={`/instrument/stocks/${stock.symbol}`}
                  className="watchlist__item"
                  style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
                >
                  <div className="stock__info">
                    <h4 style={{ color: theme.textPrimary }}>{stock.symbol}</h4>
                    <p style={{ color: theme.textSecondary }}>{stock.name}</p>
                  </div>
                  <div className="stock__price">
                    <span style={{ color: theme.textPrimary }}>৳{stock.currentPrice}</span>
                    <span className={stock.change >= 0 ? 'positive' : 'negative'} style={{ color: stock.change >= 0 ? theme.positive : theme.negative }}>
                      {stock.change >= 0 ? '+' : ''}৳{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;