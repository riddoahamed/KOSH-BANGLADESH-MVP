// Mock API service for KOSH Bangladesh
// In a real application, these would be actual API calls to your backend

import { dseStocks, mutualFunds, goldOptions, tBills } from '../data/bangladeshMarket';

class KOSHAPIService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.isDemo = true; // Set to false when connecting to real backend
  }

  // Simulate network delay for demo purposes
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication
  async login(credentials) {
    await this.delay();
    
    if (this.isDemo) {
      // Demo login - always succeeds
      return {
        success: true,
        user: {
          id: 'demo-user-1',
          name: credentials.email?.split('@')[0] || 'Demo User',
          email: credentials.email || 'demo@kosh.com',
          token: 'demo-token-12345',
          accountType: 'Premium',
          kycStatus: 'Verified'
        }
      };
    }
    
    // Real API call would go here
    // return await fetch(`${this.baseUrl}/auth/login`, { ... })
  }

  async register(userData) {
    await this.delay();
    
    if (this.isDemo) {
      return {
        success: true,
        user: {
          id: 'demo-user-' + Date.now(),
          ...userData,
          accountType: 'Basic',
          kycStatus: 'Pending'
        }
      };
    }
  }

  // Market Data
  async getMarketData(category = 'all') {
    await this.delay(200);
    
    if (this.isDemo) {
      switch (category) {
        case 'stocks':
          return { success: true, data: dseStocks };
        case 'mutualfunds':
          return { success: true, data: mutualFunds };
        case 'gold':
          return { success: true, data: goldOptions };
        case 'tbills':
          return { success: true, data: tBills };
        default:
          return {
            success: true,
            data: {
              stocks: dseStocks,
              mutualFunds,
              gold: goldOptions,
              tBills
            }
          };
      }
    }
  }

  async getInstrumentDetails(category, symbol) {
    await this.delay(300);
    
    if (this.isDemo) {
      let instrument = null;
      
      switch (category) {
        case 'stocks':
          instrument = dseStocks.find(stock => stock.symbol === symbol);
          break;
        case 'mutualfunds':
          instrument = mutualFunds.find(fund => fund.symbol === symbol);
          break;
        case 'gold':
          instrument = goldOptions.find(gold => gold.symbol === symbol);
          break;
        case 'tbills':
          instrument = tBills.find(tbill => tbill.symbol === symbol);
          break;
      }
      
      return {
        success: !!instrument,
        data: instrument ? { ...instrument, category } : null,
        error: !instrument ? 'Instrument not found' : null
      };
    }
  }

  // Portfolio Management
  async getPortfolio(userId) {
    await this.delay(400);
    
    if (this.isDemo) {
      const demoHoldings = [
        {
          symbol: 'SQURPHAR',
          category: 'stocks',
          shares: 50,
          avgPrice: 154.50,
          currentPrice: 156.80,
          investedAmount: 7725,
          currentValue: 7840
        },
        {
          symbol: 'GRAMEENPHONE',
          category: 'stocks',
          shares: 25,
          avgPrice: 292.70,
          currentPrice: 298.50,
          investedAmount: 7317.50,
          currentValue: 7462.50
        },
        {
          symbol: 'BRACMF',
          category: 'mutualfunds',
          shares: 1000,
          avgPrice: 14.35,
          currentPrice: 14.60,
          investedAmount: 14350,
          currentValue: 14600
        }
      ];
      
      const totalInvested = demoHoldings.reduce((sum, holding) => sum + holding.investedAmount, 0);
      const totalCurrent = demoHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
      
      return {
        success: true,
        data: {
          holdings: demoHoldings,
          summary: {
            totalInvested,
            totalCurrent,
            totalReturn: totalCurrent - totalInvested,
            totalReturnPercent: ((totalCurrent - totalInvested) / totalInvested) * 100
          }
        }
      };
    }
  }

  // Order Management
  async placeOrder(orderData) {
    await this.delay(1000); // Simulate order processing time
    
    if (this.isDemo) {
      const orderId = 'ORDER-' + Date.now();
      const order = {
        id: orderId,
        ...orderData,
        status: 'pending',
        timestamp: new Date().toISOString(),
        executionPrice: null
      };
      
      // Simulate random order execution
      const shouldExecute = Math.random() > 0.1; // 90% success rate
      
      if (shouldExecute) {
        order.status = 'completed';
        order.executionPrice = orderData.type === 'market' 
          ? orderData.price * (0.98 + Math.random() * 0.04) // ±2% slippage
          : orderData.price;
      }
      
      // Store in localStorage for demo
      const existingOrders = JSON.parse(localStorage.getItem('kosh-orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('kosh-orders', JSON.stringify(existingOrders));
      
      return {
        success: true,
        data: order
      };
    }
  }

  async getOrders(userId) {
    await this.delay(300);
    
    if (this.isDemo) {
      const orders = JSON.parse(localStorage.getItem('kosh-orders') || '[]');
      return {
        success: true,
        data: orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      };
    }
  }

  async cancelOrder(orderId) {
    await this.delay(500);
    
    if (this.isDemo) {
      const orders = JSON.parse(localStorage.getItem('kosh-orders') || '[]');
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1 && orders[orderIndex].status === 'pending') {
        orders[orderIndex].status = 'cancelled';
        localStorage.setItem('kosh-orders', JSON.stringify(orders));
        
        return {
          success: true,
          data: orders[orderIndex]
        };
      }
      
      return {
        success: false,
        error: 'Order not found or cannot be cancelled'
      };
    }
  }

  // Watchlist Management
  async getWatchlist(userId) {
    await this.delay(200);
    
    if (this.isDemo) {
      const watchlist = JSON.parse(localStorage.getItem('kosh-watchlist') || '[]');
      return {
        success: true,
        data: watchlist
      };
    }
  }

  async addToWatchlist(userId, symbol) {
    await this.delay(200);
    
    if (this.isDemo) {
      const watchlist = JSON.parse(localStorage.getItem('kosh-watchlist') || '[]');
      if (!watchlist.includes(symbol)) {
        watchlist.push(symbol);
        localStorage.setItem('kosh-watchlist', JSON.stringify(watchlist));
      }
      
      return {
        success: true,
        data: watchlist
      };
    }
  }

  async removeFromWatchlist(userId, symbol) {
    await this.delay(200);
    
    if (this.isDemo) {
      let watchlist = JSON.parse(localStorage.getItem('kosh-watchlist') || '[]');
      watchlist = watchlist.filter(item => item !== symbol);
      localStorage.setItem('kosh-watchlist', JSON.stringify(watchlist));
      
      return {
        success: true,
        data: watchlist
      };
    }
  }

  // Price Updates (WebSocket simulation)
  subscribeToPriceUpdates(symbols, callback) {
    if (this.isDemo) {
      // Simulate real-time price updates
      const interval = setInterval(() => {
        symbols.forEach(symbol => {
          const randomChange = (Math.random() - 0.5) * 2; // ±1% random change
          callback({
            symbol,
            price: Math.random() * 1000 + 10, // Random price for demo
            change: randomChange,
            timestamp: new Date().toISOString()
          });
        });
      }, 5000); // Update every 5 seconds
      
      return () => clearInterval(interval);
    }
  }
}

// Export singleton instance
export const koshAPI = new KOSHAPIService();
export default koshAPI;