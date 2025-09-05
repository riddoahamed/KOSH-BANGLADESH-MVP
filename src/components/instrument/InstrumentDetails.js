import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { dseStocks, mutualFunds, goldOptions, tBills } from '../../data/bangladeshMarket';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './InstrumentDetails.css';

function InstrumentDetails() {
  const { category, symbol } = useParams();
  const history = useHistory();
  const { theme } = useTheme();
  const [instrument, setInstrument] = useState(null);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('1D');

  useEffect(() => {
    let foundInstrument = null;
    
    switch (category) {
      case 'stocks':
        foundInstrument = dseStocks.find(stock => stock.symbol === symbol);
        break;
      case 'mutualfunds':
        foundInstrument = mutualFunds.find(fund => fund.symbol === symbol);
        break;
      case 'gold':
        foundInstrument = goldOptions.find(gold => gold.symbol === symbol);
        break;
      case 'tbills':
        foundInstrument = tBills.find(tbill => tbill.symbol === symbol);
        break;
      default:
        break;
    }

    if (foundInstrument) {
      setInstrument({ ...foundInstrument, category });
    }

    // Check if in watchlist (demo implementation)
    const watchlist = JSON.parse(localStorage.getItem('kosh-watchlist') || '[]');
    setIsWatchlisted(watchlist.includes(symbol));
  }, [category, symbol]);

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('kosh-watchlist') || '[]');
    let newWatchlist;
    
    if (isWatchlisted) {
      newWatchlist = watchlist.filter(item => item !== symbol);
    } else {
      newWatchlist = [...watchlist, symbol];
    }
    
    localStorage.setItem('kosh-watchlist', JSON.stringify(newWatchlist));
    setIsWatchlisted(!isWatchlisted);
  };

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

  const getPrice = () => {
    if (instrument.currentPrice) return `৳${instrument.currentPrice}`;
    if (instrument.nav) return `৳${instrument.nav}`;
    if (instrument.pricePerGram) return `৳${instrument.pricePerGram}`;
    if (instrument.interestRate) return `${instrument.interestRate}%`;
    return '-';
  };

  const getChange = () => {
    const change = instrument.change || 0;
    const changePercent = instrument.changePercent || 0;
    
    if (instrument.category === 'tbills') {
      return { value: `Yield: ${instrument.currentYield || instrument.interestRate}%`, isPositive: true };
    }
    
    return {
      value: `${change >= 0 ? '+' : ''}৳${Math.abs(change)} (${changePercent >= 0 ? '+' : ''}${changePercent}%)`,
      isPositive: change >= 0
    };
  };

  const renderStockDetails = () => (
    <div className="details__grid">
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Market Cap</span>
        <span style={{ color: theme.textPrimary }}>৳{instrument.marketCap}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Volume</span>
        <span style={{ color: theme.textPrimary }}>{formatNumber(instrument.volume)}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Day High</span>
        <span style={{ color: theme.textPrimary }}>৳{instrument.high}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Day Low</span>
        <span style={{ color: theme.textPrimary }}>৳{instrument.low}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Sector</span>
        <span style={{ color: theme.textPrimary }}>{instrument.sector}</span>
      </div>
    </div>
  );

  const renderMutualFundDetails = () => (
    <div className="details__grid">
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>AUM</span>
        <span style={{ color: theme.textPrimary }}>৳{instrument.aum}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Fund Manager</span>
        <span style={{ color: theme.textPrimary }}>{instrument.fundManager}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Category</span>
        <span style={{ color: theme.textPrimary }}>{instrument.category}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Inception Date</span>
        <span style={{ color: theme.textPrimary }}>{instrument.inceptionDate}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Min Investment</span>
        <span style={{ color: theme.textPrimary }}>৳{formatNumber(instrument.minInvestment)}</span>
      </div>
    </div>
  );

  const renderGoldDetails = () => (
    <div className="details__grid">
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Purity</span>
        <span style={{ color: theme.textPrimary }}>{instrument.purity}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Min Investment</span>
        <span style={{ color: theme.textPrimary }}>৳{instrument.minInvestment}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Type</span>
        <span style={{ color: theme.textPrimary }}>{instrument.type}</span>
      </div>
    </div>
  );

  const renderTBillDetails = () => (
    <div className="details__grid">
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Tenure</span>
        <span style={{ color: theme.textPrimary }}>{instrument.tenure} days</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Interest Rate</span>
        <span style={{ color: theme.textPrimary }}>{instrument.interestRate}%</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Current Yield</span>
        <span style={{ color: theme.textPrimary }}>{instrument.currentYield}%</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Maturity Date</span>
        <span style={{ color: theme.textPrimary }}>{instrument.maturityDate}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Min Investment</span>
        <span style={{ color: theme.textPrimary }}>৳{formatNumber(instrument.minInvestment)}</span>
      </div>
      <div className="detail__item">
        <span style={{ color: theme.textSecondary }}>Issuer</span>
        <span style={{ color: theme.textPrimary }}>{instrument.issuer}</span>
      </div>
    </div>
  );

  if (!instrument) {
    return (
      <div className="instrument-details" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
        <div className="loading__container">
          <div className="loading" />
          <p style={{ color: theme.textSecondary }}>Loading instrument details...</p>
        </div>
      </div>
    );
  }

  const change = getChange();
  const chartPeriods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="instrument-details" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
      <div className="instrument__container">
        {/* Header */}
        <div className="instrument__header">
          <button 
            onClick={() => history.goBack()}
            className="back__button"
            style={{ color: theme.textSecondary }}
          >
            <ArrowBackIcon />
          </button>
          
          <div className="instrument__info">
            <div className="title__section">
              <h1 style={{ color: theme.textPrimary }}>{instrument.symbol}</h1>
              <button
                onClick={toggleWatchlist}
                className="watchlist__button"
                style={{ color: isWatchlisted ? theme.warning : theme.textSecondary }}
              >
                {isWatchlisted ? <StarIcon /> : <StarBorderIcon />}
              </button>
            </div>
            <p style={{ color: theme.textSecondary }}>{instrument.name}</p>
            
            <div className="price__section">
              <h2 style={{ color: theme.textPrimary }}>{getPrice()}</h2>
              <div className={`change__indicator ${change.isPositive ? 'positive' : 'negative'}`}>
                {change.isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                <span style={{ color: change.isPositive ? theme.positive : theme.negative }}>
                  {change.value}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="instrument__content">
          {/* Chart Section */}
          <div className="chart__section" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="chart__header">
              <h3 style={{ color: theme.textPrimary }}>Price Chart</h3>
              <div className="chart__periods">
                {chartPeriods.map(period => (
                  <button
                    key={period}
                    className={`period__button ${chartPeriod === period ? 'period__button--active' : ''}`}
                    onClick={() => setChartPeriod(period)}
                    style={{
                      color: chartPeriod === period ? theme.primary : theme.textSecondary,
                      backgroundColor: chartPeriod === period ? `${theme.primary}20` : 'transparent'
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="chart__placeholder" style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}` }}>
              <ShowChartIcon style={{ fontSize: '4rem', color: theme.textMuted }} />
              <p style={{ color: theme.textMuted }}>Chart visualization would be implemented here</p>
              <p style={{ color: theme.textSecondary }}>Showing {chartPeriod} performance for {instrument.symbol}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="details__section" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.textPrimary }}>Details</h3>
            
            {instrument.category === 'stocks' && renderStockDetails()}
            {instrument.category === 'mutualfunds' && renderMutualFundDetails()}
            {instrument.category === 'gold' && renderGoldDetails()}
            {instrument.category === 'tbills' && renderTBillDetails()}
            
            {instrument.description && (
              <div className="description__section">
                <h4 style={{ color: theme.textPrimary }}>About</h4>
                <p style={{ color: theme.textSecondary }}>{instrument.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action__buttons">
          <Link
            to={`/order/${category}/${symbol}/buy`}
            className="btn btn-primary action__button"
          >
            <AccountBalanceIcon />
            Buy {instrument.category === 'stocks' ? 'Shares' : 
                 instrument.category === 'mutualfunds' ? 'Units' :
                 instrument.category === 'gold' ? 'Gold' : 'T-Bill'}
          </Link>
          
          <Link
            to={`/order/${category}/${symbol}/sell`}
            className="btn btn-secondary action__button"
          >
            Sell
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstrumentDetails;