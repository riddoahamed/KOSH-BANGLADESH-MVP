import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { dseStocks, mutualFunds } from '../../data/bangladeshMarket';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HistoryIcon from '@material-ui/icons/History';
import FilterListIcon from '@material-ui/icons/FilterList';
import './Portfolio.css';

function Portfolio() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('holdings');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock portfolio data
  const [portfolioSummary] = useState({
    totalValue: 125000,
    totalInvested: 110000,
    totalReturn: 15000,
    totalReturnPercent: 13.64,
    dayChange: 2450,
    dayChangePercent: 2.00
  });

  const [holdings] = useState([
    { 
      symbol: 'SQURPHAR', 
      category: 'stocks',
      shares: 50, 
      avgPrice: 154.50, 
      currentPrice: 156.80,
      investedAmount: 7725,
      currentValue: 7840,
      dayChange: 115,
      totalReturn: 115
    },
    { 
      symbol: 'GRAMEENPHONE', 
      category: 'stocks',
      shares: 25, 
      avgPrice: 292.70, 
      currentPrice: 298.50,
      investedAmount: 7317.50,
      currentValue: 7462.50,
      dayChange: 145,
      totalReturn: 145
    },
    { 
      symbol: 'BRACBANK', 
      category: 'stocks',
      shares: 100, 
      avgPrice: 45.20, 
      currentPrice: 44.70,
      investedAmount: 4520,
      currentValue: 4470,
      dayChange: -50,
      totalReturn: -50
    },
    { 
      symbol: 'BRACMF', 
      category: 'mutualfunds',
      shares: 1000, 
      avgPrice: 14.35, 
      currentPrice: 14.60,
      investedAmount: 14350,
      currentValue: 14600,
      dayChange: 250,
      totalReturn: 250
    },
    { 
      symbol: 'AIBLMF1', 
      category: 'mutualfunds',
      shares: 500, 
      avgPrice: 12.70, 
      currentPrice: 12.85,
      investedAmount: 6350,
      currentValue: 6425,
      dayChange: 75,
      totalReturn: 75
    },
    { 
      symbol: 'GOLD_1G', 
      category: 'gold',
      grams: 15.5, 
      avgPrice: 7825.00, 
      currentPrice: 7850.00,
      investedAmount: 121287.50,
      currentValue: 121675,
      dayChange: 387.50,
      totalReturn: 387.50
    }
  ]);

  const [orders] = useState([
    {
      id: 'order-001',
      symbol: 'SQURPHAR',
      category: 'stocks',
      action: 'buy',
      type: 'market',
      quantity: 25,
      price: 156.80,
      total: 3920,
      status: 'completed',
      timestamp: '2024-09-05T10:30:00Z'
    },
    {
      id: 'order-002',
      symbol: 'BRACMF',
      category: 'mutualfunds',
      action: 'buy',
      type: 'limit',
      quantity: 500,
      price: 14.60,
      total: 7300,
      status: 'pending',
      timestamp: '2024-09-05T11:15:00Z'
    },
    {
      id: 'order-003',
      symbol: 'GRAMEENPHONE',
      category: 'stocks',
      action: 'sell',
      type: 'market',
      quantity: 10,
      price: 298.50,
      total: 2985,
      status: 'completed',
      timestamp: '2024-09-04T14:20:00Z'
    }
  ]);

  const tabs = [
    { id: 'holdings', label: 'Holdings', count: holdings.length },
    { id: 'orders', label: 'Orders', count: orders.length }
  ];

  const categories = ['all', 'stocks', 'mutualfunds', 'gold', 'tbills'];

  const filteredHoldings = holdings.filter(holding => 
    filterCategory === 'all' || holding.category === filterCategory
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return theme.success;
      case 'pending': return theme.warning;
      case 'cancelled': return theme.error;
      default: return theme.textSecondary;
    }
  };

  const getInstrumentName = (symbol, category) => {
    if (category === 'stocks') {
      const stock = dseStocks.find(s => s.symbol === symbol);
      return stock ? stock.name : symbol;
    } else if (category === 'mutualfunds') {
      const fund = mutualFunds.find(f => f.symbol === symbol);
      return fund ? fund.name : symbol;
    } else if (category === 'gold') {
      return 'Digital Gold';
    }
    return symbol;
  };

  const renderHoldings = () => (
    <div className="holdings__section">
      {filteredHoldings.length === 0 ? (
        <div className="empty__state" style={{ color: theme.textSecondary }}>
          <AccountBalanceWalletIcon style={{ fontSize: '4rem', opacity: 0.5 }} />
          <h3>No Holdings Found</h3>
          <p>You don't have any investments in the selected category.</p>
          <Link to="/market" className="btn btn-primary">
            <ShowChartIcon />
            Start Investing
          </Link>
        </div>
      ) : (
        <div className="holdings__grid">
          {filteredHoldings.map((holding, index) => {
            const returnPercent = ((holding.currentValue - holding.investedAmount) / holding.investedAmount) * 100;
            const dayChangePercent = (holding.dayChange / holding.investedAmount) * 100;
            
            return (
              <Link
                key={index}
                to={`/instrument/${holding.category}/${holding.symbol}`}
                className="holding__card"
                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
              >
                <div className="holding__header">
                  <div className="holding__info">
                    <h4 style={{ color: theme.textPrimary }}>{holding.symbol}</h4>
                    <p style={{ color: theme.textSecondary }}>
                      {getInstrumentName(holding.symbol, holding.category)}
                    </p>
                  </div>
                  <div className="holding__category" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                    {holding.category}
                  </div>
                </div>

                <div className="holding__metrics">
                  <div className="metric__row">
                    <span style={{ color: theme.textSecondary }}>Quantity</span>
                    <span style={{ color: theme.textPrimary }}>
                      {holding.shares || holding.grams} {holding.category === 'gold' ? 'g' : 'shares'}
                    </span>
                  </div>
                  
                  <div className="metric__row">
                    <span style={{ color: theme.textSecondary }}>Avg Price</span>
                    <span style={{ color: theme.textPrimary }}>৳{holding.avgPrice}</span>
                  </div>
                  
                  <div className="metric__row">
                    <span style={{ color: theme.textSecondary }}>Current Price</span>
                    <span style={{ color: theme.textPrimary }}>৳{holding.currentPrice}</span>
                  </div>
                </div>

                <div className="holding__performance">
                  <div className="performance__item">
                    <span style={{ color: theme.textSecondary }}>Current Value</span>
                    <span style={{ color: theme.textPrimary, fontWeight: 600, fontSize: '1.1rem' }}>
                      {formatCurrency(holding.currentValue)}
                    </span>
                  </div>
                  
                  <div className="performance__item">
                    <span style={{ color: theme.textSecondary }}>Total Return</span>
                    <div className={`return__value ${holding.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                      {holding.totalReturn >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      <span style={{ color: holding.totalReturn >= 0 ? theme.positive : theme.negative }}>
                        {formatCurrency(Math.abs(holding.totalReturn))} ({returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="performance__item">
                    <span style={{ color: theme.textSecondary }}>Today's Change</span>
                    <div className={`return__value ${holding.dayChange >= 0 ? 'positive' : 'negative'}`}>
                      {holding.dayChange >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      <span style={{ color: holding.dayChange >= 0 ? theme.positive : theme.negative }}>
                        {formatCurrency(Math.abs(holding.dayChange))} ({dayChangePercent >= 0 ? '+' : ''}{dayChangePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="orders__section">
      {orders.length === 0 ? (
        <div className="empty__state" style={{ color: theme.textSecondary }}>
          <HistoryIcon style={{ fontSize: '4rem', opacity: 0.5 }} />
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet.</p>
          <Link to="/market" className="btn btn-primary">
            <ShowChartIcon />
            Start Trading
          </Link>
        </div>
      ) : (
        <div className="orders__list">
          {orders.map((order, index) => (
            <div
              key={index}
              className="order__card"
              style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
            >
              <div className="order__header">
                <div className="order__info">
                  <h4 style={{ color: theme.textPrimary }}>{order.symbol}</h4>
                  <p style={{ color: theme.textSecondary }}>
                    {getInstrumentName(order.symbol, order.category)}
                  </p>
                </div>
                <div className="order__status">
                  <span 
                    className="status__badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(order.status)}20`, 
                      color: getStatusColor(order.status)
                    }}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="order__details">
                <div className="detail__row">
                  <span style={{ color: theme.textSecondary }}>Action</span>
                  <span 
                    style={{ 
                      color: order.action === 'buy' ? theme.success : theme.error,
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  >
                    {order.action}
                  </span>
                </div>
                
                <div className="detail__row">
                  <span style={{ color: theme.textSecondary }}>Type</span>
                  <span style={{ color: theme.textPrimary, textTransform: 'capitalize' }}>
                    {order.type}
                  </span>
                </div>
                
                <div className="detail__row">
                  <span style={{ color: theme.textSecondary }}>Quantity</span>
                  <span style={{ color: theme.textPrimary }}>{order.quantity}</span>
                </div>
                
                <div className="detail__row">
                  <span style={{ color: theme.textSecondary }}>Price</span>
                  <span style={{ color: theme.textPrimary }}>৳{order.price}</span>
                </div>
                
                <div className="detail__row total">
                  <span style={{ color: theme.textSecondary }}>Total</span>
                  <span style={{ color: theme.textPrimary, fontWeight: 600 }}>
                    {formatCurrency(order.total)}
                  </span>
                </div>
                
                <div className="detail__row">
                  <span style={{ color: theme.textSecondary }}>Date</span>
                  <span style={{ color: theme.textPrimary }}>{formatDate(order.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="portfolio" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
      <div className="portfolio__container">
        {/* Header */}
        <div className="portfolio__header">
          <div>
            <h1 style={{ color: theme.textPrimary }}>Portfolio</h1>
            <p style={{ color: theme.textSecondary }}>
              Track your investments and monitor performance
            </p>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="portfolio__summary" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
          <div className="summary__main">
            <div className="total__value">
              <h3 style={{ color: theme.textSecondary }}>Total Portfolio Value</h3>
              <h2 style={{ color: theme.textPrimary }}>{formatCurrency(portfolioSummary.totalValue)}</h2>
            </div>
            
            <div className="summary__metrics">
              <div className="metric">
                <span style={{ color: theme.textSecondary }}>Total Invested</span>
                <span style={{ color: theme.textPrimary }}>{formatCurrency(portfolioSummary.totalInvested)}</span>
              </div>
              
              <div className="metric">
                <span style={{ color: theme.textSecondary }}>Total Return</span>
                <div className={`metric__value ${portfolioSummary.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioSummary.totalReturn >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  <span style={{ color: portfolioSummary.totalReturn >= 0 ? theme.positive : theme.negative }}>
                    {formatCurrency(Math.abs(portfolioSummary.totalReturn))} (+{portfolioSummary.totalReturnPercent}%)
                  </span>
                </div>
              </div>
              
              <div className="metric">
                <span style={{ color: theme.textSecondary }}>Today's Change</span>
                <div className={`metric__value ${portfolioSummary.dayChange >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioSummary.dayChange >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  <span style={{ color: portfolioSummary.dayChange >= 0 ? theme.positive : theme.negative }}>
                    {formatCurrency(Math.abs(portfolioSummary.dayChange))} ({portfolioSummary.dayChangePercent >= 0 ? '+' : ''}{portfolioSummary.dayChangePercent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="portfolio__controls">
          <div className="portfolio__tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab__button ${activeTab === tab.id ? 'tab__button--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  color: activeTab === tab.id ? theme.primary : theme.textSecondary,
                  borderBottom: activeTab === tab.id ? `2px solid ${theme.primary}` : 'none',
                  backgroundColor: activeTab === tab.id ? `${theme.primary}10` : 'transparent'
                }}
              >
                <span>{tab.label}</span>
                <span className="tab__count">{tab.count}</span>
              </button>
            ))}
          </div>

          {activeTab === 'holdings' && (
            <div className="filter__section">
              <FilterListIcon style={{ color: theme.textSecondary }} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter__select"
                style={{ backgroundColor: theme.card, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="portfolio__content">
          {activeTab === 'holdings' && renderHoldings()}
          {activeTab === 'orders' && renderOrders()}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;