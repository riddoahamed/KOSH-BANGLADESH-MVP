import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { dseStocks, mutualFunds, goldOptions, tBills } from '../../data/bangladeshMarket';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { v4 as uuidv4 } from 'uuid';
import './OrderScreen.css';

function OrderScreen() {
  const { category, symbol, action } = useParams();
  const history = useHistory();
  const { theme } = useTheme();
  
  const [instrument, setInstrument] = useState(null);
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock user portfolio data
  const [userBalance] = useState(50000); // BDT 50,000
  const [userHoldings] = useState({
    'SQURPHAR': { shares: 100, avgPrice: 150.30 },
    'GRAMEENPHONE': { shares: 50, avgPrice: 280.50 },
    'BRACMF': { shares: 500, avgPrice: 13.80 },
    'GOLD_1G': { grams: 10, avgPrice: 7800 }
  });

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
      // Set initial price for limit orders
      const currentPrice = foundInstrument.currentPrice || foundInstrument.nav || foundInstrument.pricePerGram || foundInstrument.interestRate;
      setPrice(currentPrice?.toString() || '');
    }
  }, [category, symbol]);

  const getCurrentPrice = () => {
    if (!instrument) return 0;
    return instrument.currentPrice || instrument.nav || instrument.pricePerGram || instrument.interestRate || 0;
  };

  const getMinInvestment = () => {
    if (!instrument) return 0;
    return instrument.minInvestment || (category === 'stocks' ? 1 : 100);
  };

  const calculateTotal = () => {
    if (orderType === 'market') {
      const unitPrice = getCurrentPrice();
      const qty = parseFloat(quantity) || 0;
      return unitPrice * qty;
    } else {
      const unitPrice = parseFloat(price) || 0;
      const qty = parseFloat(quantity) || 0;
      return unitPrice * qty;
    }
  };

  const validateOrder = () => {
    const newErrors = {};
    
    if (!quantity || parseFloat(quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }
    
    if (orderType === 'limit' && (!price || parseFloat(price) <= 0)) {
      newErrors.price = 'Please enter a valid price';
    }
    
    const total = calculateTotal();
    const minInvestment = getMinInvestment();
    
    if (total < minInvestment) {
      newErrors.amount = `Minimum investment is ৳${minInvestment}`;
    }
    
    if (action === 'buy' && total > userBalance) {
      newErrors.amount = 'Insufficient balance';
    }
    
    if (action === 'sell') {
      const holdings = userHoldings[symbol];
      if (!holdings) {
        newErrors.quantity = 'You do not own this instrument';
      } else {
        const availableQty = holdings.shares || holdings.grams || 0;
        if (parseFloat(quantity) > availableQty) {
          newErrors.quantity = `You only own ${availableQty} ${category === 'gold' ? 'grams' : 'units'}`;
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateOrder()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order object (would be sent to backend)
    const order = {
      id: uuidv4(),
      symbol,
      category,
      action,
      type: orderType,
      quantity: parseFloat(quantity),
      price: orderType === 'market' ? getCurrentPrice() : parseFloat(price),
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    // Save to localStorage (demo implementation)
    const existingOrders = JSON.parse(localStorage.getItem('kosh-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('kosh-orders', JSON.stringify(existingOrders));
    
    setLoading(false);
    setOrderSubmitted(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getUnitLabel = () => {
    switch (category) {
      case 'stocks': return 'shares';
      case 'mutualfunds': return 'units';
      case 'gold': return 'grams';
      case 'tbills': return 'amount (৳)';
      default: return 'units';
    }
  };

  const getChange = () => {
    if (!instrument) return { value: '', isPositive: true };
    
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

  if (orderSubmitted) {
    return (
      <div className="order-screen" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
        <div className="order__container">
          <div className="success__message" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <CheckCircleIcon style={{ color: theme.success, fontSize: '4rem' }} />
            <h2 style={{ color: theme.textPrimary }}>Order Submitted!</h2>
            <p style={{ color: theme.textSecondary }}>
              Your {action} order for {quantity} {getUnitLabel()} of {symbol} has been submitted successfully.
            </p>
            <div className="order__summary" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
              <div className="summary__item">
                <span style={{ color: theme.textSecondary }}>Order Type</span>
                <span style={{ color: theme.textPrimary }}>{orderType.charAt(0).toUpperCase() + orderType.slice(1)} {action.charAt(0).toUpperCase() + action.slice(1)}</span>
              </div>
              <div className="summary__item">
                <span style={{ color: theme.textSecondary }}>Quantity</span>
                <span style={{ color: theme.textPrimary }}>{quantity} {getUnitLabel()}</span>
              </div>
              <div className="summary__item">
                <span style={{ color: theme.textSecondary }}>Price per unit</span>
                <span style={{ color: theme.textPrimary }}>৳{orderType === 'market' ? getCurrentPrice() : price}</span>
              </div>
              <div className="summary__item total">
                <span style={{ color: theme.textSecondary }}>Total Amount</span>
                <span style={{ color: theme.textPrimary, fontWeight: 600, fontSize: '1.1rem' }}>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
            <div className="action__buttons">
              <button onClick={() => history.push('/portfolio')} className="btn btn-primary">
                View Portfolio
              </button>
              <button onClick={() => history.push('/market')} className="btn btn-outline">
                Continue Trading
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!instrument) {
    return (
      <div className="order-screen" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
        <div className="loading__container">
          <div className="loading" />
          <p style={{ color: theme.textSecondary }}>Loading order details...</p>
        </div>
      </div>
    );
  }

  const change = getChange();
  const total = calculateTotal();

  return (
    <div className="order-screen" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
      <div className="order__container">
        {/* Header */}
        <div className="order__header">
          <button 
            onClick={() => history.goBack()}
            className="back__button"
            style={{ color: theme.textSecondary }}
          >
            <ArrowBackIcon />
          </button>
          
          <div className="order__info">
            <h1 style={{ color: theme.textPrimary }}>
              {action.charAt(0).toUpperCase() + action.slice(1)} {instrument.symbol}
            </h1>
            <p style={{ color: theme.textSecondary }}>{instrument.name}</p>
            
            <div className="price__display">
              <span style={{ color: theme.textPrimary, fontSize: '1.5rem', fontWeight: '600' }}>
                ৳{getCurrentPrice()}
              </span>
              <div className={`change__indicator ${change.isPositive ? 'positive' : 'negative'}`}>
                {change.isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                <span style={{ color: change.isPositive ? theme.positive : theme.negative }}>
                  {change.value}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order__content">
          {/* Order Form */}
          <div className="order__form__container" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.textPrimary }}>Order Details</h3>
            
            <form onSubmit={handleSubmitOrder} className="order__form">
              {/* Order Type */}
              <div className="form__group">
                <label style={{ color: theme.textPrimary }}>Order Type</label>
                <div className="radio__group">
                  <label className="radio__label">
                    <input
                      type="radio"
                      value="market"
                      checked={orderType === 'market'}
                      onChange={(e) => setOrderType(e.target.value)}
                    />
                    <span style={{ color: theme.textPrimary }}>Market Order</span>
                    <small style={{ color: theme.textSecondary }}>Execute at current market price</small>
                  </label>
                  <label className="radio__label">
                    <input
                      type="radio"
                      value="limit"
                      checked={orderType === 'limit'}
                      onChange={(e) => setOrderType(e.target.value)}
                    />
                    <span style={{ color: theme.textPrimary }}>Limit Order</span>
                    <small style={{ color: theme.textSecondary }}>Execute at specified price or better</small>
                  </label>
                </div>
              </div>

              {/* Quantity */}
              <div className="form__group">
                <label style={{ color: theme.textPrimary }}>
                  Quantity ({getUnitLabel()})
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={`input ${errors.quantity ? 'input--error' : ''}`}
                  placeholder={`Enter number of ${getUnitLabel()}`}
                  min="0.001"
                  step={category === 'gold' ? '0.001' : '1'}
                />
                {errors.quantity && <span className="error__text" style={{ color: theme.error }}>{errors.quantity}</span>}
              </div>

              {/* Price (for limit orders) */}
              {orderType === 'limit' && (
                <div className="form__group">
                  <label style={{ color: theme.textPrimary }}>Price per {category === 'gold' ? 'gram' : 'unit'} (৳)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`input ${errors.price ? 'input--error' : ''}`}
                    placeholder="Enter price"
                    min="0.01"
                    step="0.01"
                  />
                  {errors.price && <span className="error__text" style={{ color: theme.error }}>{errors.price}</span>}
                </div>
              )}

              {/* Total Amount */}
              <div className="total__section">
                <div className="total__display" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
                  <span style={{ color: theme.textSecondary }}>Total Amount</span>
                  <span style={{ color: theme.textPrimary, fontSize: '1.5rem', fontWeight: '600' }}>
                    {formatCurrency(total)}
                  </span>
                </div>
                {errors.amount && <span className="error__text" style={{ color: theme.error }}>{errors.amount}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`btn ${action === 'buy' ? 'btn-primary' : 'btn-secondary'} submit__button`}
              >
                {loading ? (
                  <>
                    <div className="loading" />
                    Processing...
                  </>
                ) : (
                  <>
                    <AccountBalanceWalletIcon />
                    {action === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="summary__container" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.textPrimary }}>Account Summary</h3>
            
            <div className="account__info">
              <div className="info__item">
                <span style={{ color: theme.textSecondary }}>Available Balance</span>
                <span style={{ color: theme.textPrimary }}>{formatCurrency(userBalance)}</span>
              </div>
              
              {action === 'sell' && userHoldings[symbol] && (
                <div className="info__item">
                  <span style={{ color: theme.textSecondary }}>Current Holdings</span>
                  <span style={{ color: theme.textPrimary }}>
                    {userHoldings[symbol].shares || userHoldings[symbol].grams} {getUnitLabel()}
                  </span>
                </div>
              )}
              
              <div className="info__item">
                <span style={{ color: theme.textSecondary }}>After Order</span>
                <span style={{ color: action === 'buy' ? theme.error : theme.success }}>
                  {action === 'buy' 
                    ? formatCurrency(userBalance - total)
                    : formatCurrency(userBalance + total)
                  }
                </span>
              </div>
            </div>

            <div className="market__info" style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${theme.border}` }}>
              <h4 style={{ color: theme.textPrimary }}>Market Information</h4>
              <div className="info__item">
                <span style={{ color: theme.textSecondary }}>Market Status</span>
                <span style={{ color: theme.success }}>Open</span>
              </div>
              <div className="info__item">
                <span style={{ color: theme.textSecondary }}>Trading Hours</span>
                <span style={{ color: theme.textPrimary }}>10:30 AM - 2:30 PM</span>
              </div>
              {category === 'stocks' && (
                <div className="info__item">
                  <span style={{ color: theme.textSecondary }}>Day Range</span>
                  <span style={{ color: theme.textPrimary }}>৳{instrument.low} - ৳{instrument.high}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;