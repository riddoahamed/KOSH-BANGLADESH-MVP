# 🇧🇩 KOSH Bangladesh - Investment Platform MVP

<div align="center">
  <h1>KOSH</h1>
  <p><strong>Your Gateway to Bangladesh Capital Markets</strong></p>
  
  <p>A comprehensive investment platform MVP inspired by Robinhood, specifically designed for Bangladesh's financial markets featuring DSE stocks, mutual funds, digital gold, and treasury bills.</p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-17+-blue?logo=react" />
    <img alt="Material-UI" src="https://img.shields.io/badge/Material--UI-Components-blue?logo=material-ui" />
    <img alt="Bangladesh" src="https://img.shields.io/badge/Made%20for-Bangladesh-green" />
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
  </p>
</div>

## 🚀 **Live Demo**

🌐 **[View Live Demo →](https://3000-ia1oq1yajjcqr5fg2gzwg-6532622b.e2b.dev)**

## ✨ **Features**

### 🏦 **Financial Instruments**
- **DSE Stocks**: Top 20 performing Dhaka Stock Exchange stocks
- **Mutual Funds**: Top 10 mutual funds with NAV tracking
- **Digital Gold**: 24K pure gold investment with gram-based trading
- **Treasury Bills**: Government T-Bills (91-day, 182-day, 364-day)

### 📱 **Core Functionality**
- **Multi-step Onboarding** with KYC simulation
- **Real-time Market Browse** with search and filtering
- **Comprehensive Portfolio Management**
- **Buy/Sell Order Placement** (Market & Limit orders)
- **Performance Tracking** with P&L analysis
- **User Profile & Settings**
- **Watchlist Management**

### 🎨 **Design & UX**
- **Bangladesh Flag-Inspired Themes** (Dark & Light modes)
- **Mobile-First Responsive Design**
- **Material-UI Components**
- **Bangladesh Taka (৳) Currency Formatting**
- **Smooth Animations & Transitions**

## 🛠️ **Technology Stack**

- **Frontend**: React 17+ with Hooks, Context API
- **UI Library**: Material-UI Icons & Components
- **Routing**: React Router v5
- **Styling**: CSS Grid, Flexbox, Responsive Design
- **State Management**: React Context API
- **Data Persistence**: Local Storage (Demo)
- **Process Management**: PM2
- **Mock API**: Realistic service simulation with delays

## 📊 **Market Data**

### **DSE Stocks (20 Companies)**
Square Pharmaceuticals, BRAC Bank, Grameenphone, Beximco, City Bank, Walton Hi-Tech, BSRM, Renata, Dhaka Bank, Robi Axiata, LankaBangla Finance, Islami Bank, BAT Bangladesh, Pubali Bank, Berger Paints, Orion Pharma, Eastern Bank, ACI Formulations, Prime Bank, Standard Bank

### **Mutual Funds (10 Funds)**
AIBL 1st MF, ICB 3rd MF, Dhaka Bank 1st MF, Trust Bank 1st MF, Popular Life 1st MF, Exim Bank 1st MF, BRAC Bank MF, City Bank Capital MF, LankaBangla MF, Phoenix Finance 1st MF

### **Investment Options**
- Digital Gold (1g increments, SIP available)
- Government Treasury Bills (Various maturities)

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 14+ and npm
- Modern web browser

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/riddoahamed/KOSH-Bangladesh-MVP.git
   cd KOSH-Bangladesh-MVP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### **Production Deployment**

```bash
# Build for production
npm run build

# Using PM2 (recommended)
npm install -g pm2
pm2 start ecosystem.config.js

# Or using the included showcase server
node server.js
```

## 📁 **Project Structure**

```
src/
├── components/
│   ├── onboarding/         # Multi-step user registration
│   ├── dashboard/          # Portfolio overview & summary  
│   ├── market/             # Browse all financial instruments
│   ├── instrument/         # Detailed instrument pages
│   ├── order/              # Buy/sell order placement
│   ├── portfolio/          # Holdings & performance tracking
│   ├── profile/            # User settings & preferences
│   └── layout/             # Header & navigation components
├── theme/                  # Bangladesh color themes & context
├── data/                   # Market data & financial instruments
├── services/               # Mock API service simulation
└── styles/                 # Global CSS & responsive design
```

## 🎯 **Key Components**

### **1. Onboarding Flow**
- Personal information collection
- Security setup (password, 2FA simulation)
- KYC verification simulation
- Welcome & feature introduction

### **2. Market Browser**
- Real-time instrument listing
- Search and filter functionality
- Category-based browsing (Stocks, MF, Gold, T-Bills)
- Sort by price, change, volume, market cap

### **3. Trading Interface**
- Market and limit order placement
- Real-time price updates
- Order confirmation and tracking
- Portfolio impact calculation

### **4. Portfolio Management**
- Holdings overview with P&L
- Performance tracking and analytics
- Order history and transaction logs
- Asset allocation visualization

## 🇧🇩 **Bangladesh Market Integration**

### **Dhaka Stock Exchange (DSE)**
- Real company data and ticker symbols
- Sector-wise categorization
- Market cap and trading volume simulation
- Bangladesh Taka (৳) currency formatting

### **Local Market Features**
- Trading hours (10:30 AM - 2:30 PM)
- Bangladesh banking integration
- NID number validation
- Local mutual fund houses
- Government securities (T-Bills)

## 🎨 **Theming**

### **Dark Theme (Default)**
- Primary: Bangladesh Green (#006A4E)
- Secondary: Bangladesh Red (#F42A41)  
- Background: Dark (#0D1117)
- Accent: Emerald (#00B894)

### **Light Theme**
- Primary: Bangladesh Green (#006A4E)
- Secondary: Bangladesh Red (#F42A41)
- Background: White (#FFFFFF)
- Surface: Light Gray (#F8F9FA)

## 📱 **Responsive Design**

- **Mobile First**: Optimized for Bangladesh's mobile-heavy user base
- **Touch Friendly**: Large tap targets and swipe gestures
- **Progressive Enhancement**: Works on all screen sizes
- **Performance Optimized**: Fast loading and smooth animations

## 🔧 **Configuration**

### **Environment Variables**
```bash
REACT_APP_API_URL=http://localhost:3001/api  # Backend API URL
PORT=3000                                     # Development server port
```

### **PM2 Ecosystem**
```javascript
module.exports = {
  apps: [{
    name: 'kosh-bangladesh',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
};
```

## 🛣️ **Roadmap**

### **Phase 1** ✅ (Current MVP)
- [x] Core trading interface
- [x] Bangladesh market data
- [x] Portfolio management  
- [x] User onboarding
- [x] Responsive design

### **Phase 2** (Planned)
- [ ] Real-time WebSocket price feeds
- [ ] Advanced charting (TradingView integration)
- [ ] News and market analysis
- [ ] Mobile app (React Native)
- [ ] Advanced order types

### **Phase 3** (Future)
- [ ] Real DSE API integration
- [ ] Banking API connectivity
- [ ] KYC verification system
- [ ] Compliance and regulatory features
- [ ] Multi-language support (Bengali)

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Riddo Ahmed**  
- GitHub: [@riddoahamed](https://github.com/riddoahamed)

## 🙏 **Acknowledgments**

- Inspired by Robinhood's clean UX design
- Bangladesh Securities and Exchange Commission (BSEC)
- Dhaka Stock Exchange (DSE) for market structure reference
- Material-UI team for excellent React components
- React team for the amazing framework

## 📞 **Support**

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/riddoahamed/KOSH-Bangladesh-MVP/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

---

<div align="center">
  <p><strong>Made with ❤️ for Bangladesh's Financial Future</strong></p>
  <p>🇧🇩 Empowering Bangladeshi investors with world-class technology</p>
</div>