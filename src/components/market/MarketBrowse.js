import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { dseStocks, mutualFunds, goldOptions, tBills, getAllInstruments } from '../../data/bangladeshMarket';
import SearchIcon from '@material-ui/icons/Search';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import './MarketBrowse.css';

function MarketBrowse() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSector, setSelectedSector] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Instruments', count: getAllInstruments().length },
    { id: 'stocks', label: 'DSE Stocks', count: dseStocks.length },
    { id: 'mutualfunds', label: 'Mutual Funds', count: mutualFunds.length },
    { id: 'gold', label: 'Digital Gold', count: goldOptions.length },
    { id: 'tbills', label: 'T-Bills', count: tBills.length }
  ];

  const sectors = [
    'all', 'Banking', 'Pharmaceuticals', 'Telecommunications', 
    'Engineering', 'NBFI', 'Food & Allied'
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'change', label: 'Change %' },
    { value: 'volume', label: 'Volume' },
    { value: 'marketcap', label: 'Market Cap' }
  ];

  const filteredAndSortedData = useMemo(() => {
    let data = [];
    
    // Filter by tab
    if (activeTab === 'all') {
      data = getAllInstruments();
    } else if (activeTab === 'stocks') {
      data = dseStocks.map(stock => ({ ...stock, category: 'stocks' }));
    } else if (activeTab === 'mutualfunds') {
      data = mutualFunds.map(fund => ({ ...fund, category: 'mutualfunds' }));
    } else if (activeTab === 'gold') {
      data = goldOptions.map(gold => ({ ...gold, category: 'gold' }));
    } else if (activeTab === 'tbills') {
      data = tBills.map(tbill => ({ ...tbill, category: 'tbills' }));
    }

    // Filter by search query
    if (searchQuery) {
      data = data.filter(item => 
        item.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by sector
    if (selectedSector !== 'all') {
      data = data.filter(item => item.sector === selectedSector);
    }

    // Sort data
    data.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name || a.symbol || '';
          bValue = b.name || b.symbol || '';
          break;
        case 'price':
          aValue = a.currentPrice || a.nav || a.pricePerGram || a.interestRate || 0;
          bValue = b.currentPrice || b.nav || b.pricePerGram || b.interestRate || 0;
          break;
        case 'change':
          aValue = a.changePercent || 0;
          bValue = b.changePercent || 0;
          break;
        case 'volume':
          aValue = a.volume || 0;
          bValue = b.volume || 0;
          break;
        case 'marketcap':
          aValue = parseFloat((a.marketCap || '0').replace(/[^0-9.]/g, ''));
          bValue = parseFloat((b.marketCap || '0').replace(/[^0-9.]/g, ''));
          break;
        default:
          aValue = a.name || a.symbol || '';
          bValue = b.name || b.symbol || '';
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return data;
  }, [activeTab, searchQuery, selectedSector, sortBy, sortOrder]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-BD').format(num);
  };

  const getPrice = (item) => {
    if (item.currentPrice) return `৳${item.currentPrice}`;
    if (item.nav) return `৳${item.nav}`;
    if (item.pricePerGram) return `৳${item.pricePerGram}`;
    if (item.interestRate) return `${item.interestRate}%`;
    return '-';
  };

  const getChange = (item) => {
    const change = item.change || 0;
    const changePercent = item.changePercent || 0;
    
    if (item.category === 'tbills') {
      return { value: `${item.currentYield || item.interestRate}%`, isPositive: true };
    }
    
    return {
      value: `${change >= 0 ? '+' : ''}${change} (${changePercent >= 0 ? '+' : ''}${changePercent}%)`,
      isPositive: change >= 0
    };
  };

  const getSubtitle = (item) => {
    if (item.sector) return item.sector;
    if (item.category === 'mutualfunds') return item.category;
    if (item.category === 'gold') return item.type;
    if (item.category === 'tbills') return `${item.tenure} days`;
    return item.category;
  };

  return (
    <div className="market-browse" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
      <div className="market__container">
        {/* Header */}
        <div className="market__header">
          <div>
            <h1 style={{ color: theme.textPrimary }}>Market Overview</h1>
            <p style={{ color: theme.textSecondary }}>
              Explore and invest in Bangladesh's financial instruments
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="market__controls">
          <div className="search__section">
            <div className="search__container" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
              <SearchIcon style={{ color: theme.textSecondary }} />
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search__input"
                style={{ color: theme.textPrimary }}
              />
            </div>
          </div>

          <div className="filters__section">
            <div className="filter__group">
              <FilterListIcon style={{ color: theme.textSecondary }} />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="filter__select"
                style={{ backgroundColor: theme.card, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter__group">
              <SortIcon style={{ color: theme.textSecondary }} />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="filter__select"
                style={{ backgroundColor: theme.card, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
              >
                {sortOptions.map(option => (
                  <React.Fragment key={option.value}>
                    <option value={`${option.value}-asc`}>{option.label} ↑</option>
                    <option value={`${option.value}-desc`}>{option.label} ↓</option>
                  </React.Fragment>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="market__tabs">
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

        {/* Results */}
        <div className="market__results">
          <div className="results__header">
            <span style={{ color: theme.textSecondary }}>
              Showing {filteredAndSortedData.length} instruments
            </span>
          </div>

          <div className="instruments__grid">
            {filteredAndSortedData.map((item, index) => {
              const change = getChange(item);
              
              return (
                <Link
                  key={`${item.category}-${item.symbol}-${index}`}
                  to={`/instrument/${item.category}/${item.symbol}`}
                  className="instrument__card"
                  style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
                >
                  <div className="instrument__header">
                    <div className="instrument__info">
                      <h3 style={{ color: theme.textPrimary }}>{item.symbol}</h3>
                      <p style={{ color: theme.textSecondary }}>{getSubtitle(item)}</p>
                    </div>
                    <div className="instrument__category" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                      {item.category}
                    </div>
                  </div>

                  <div className="instrument__name" style={{ color: theme.textSecondary }}>
                    {item.name}
                  </div>

                  <div className="instrument__metrics">
                    <div className="metric">
                      <span className="metric__label" style={{ color: theme.textSecondary }}>Price</span>
                      <span className="metric__value" style={{ color: theme.textPrimary }}>
                        {getPrice(item)}
                      </span>
                    </div>
                    
                    <div className="metric">
                      <span className="metric__label" style={{ color: theme.textSecondary }}>
                        {item.category === 'tbills' ? 'Yield' : 'Change'}
                      </span>
                      <div className={`metric__change ${change.isPositive ? 'positive' : 'negative'}`}>
                        {change.isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        <span style={{ color: change.isPositive ? theme.positive : theme.negative }}>
                          {change.value}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.volume && (
                    <div className="instrument__volume" style={{ color: theme.textSecondary }}>
                      Volume: {formatNumber(item.volume)}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className="no__results" style={{ color: theme.textSecondary }}>
              <p>No instruments found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSector('all');
                  setActiveTab('all');
                }}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketBrowse;