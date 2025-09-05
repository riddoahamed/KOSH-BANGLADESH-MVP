const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KOSH Bangladesh - Investment Platform MVP</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #006A4E 0%, #00B894 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 1rem;
        }
        .container { 
            max-width: 900px; 
            text-align: center; 
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .logo { 
            font-size: 4rem; 
            font-weight: 700; 
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .tagline { 
            font-size: 1.5rem; 
            margin-bottom: 2rem; 
            opacity: 0.9;
        }
        .features { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 1.5rem; 
            margin: 2rem 0; 
        }
        .feature { 
            background: rgba(255, 255, 255, 0.1); 
            padding: 1.5rem; 
            border-radius: 15px; 
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.2s ease;
        }
        .feature:hover {
            transform: translateY(-5px);
        }
        .feature h3 { 
            font-size: 1.2rem; 
            margin-bottom: 0.5rem; 
        }
        .feature p { 
            opacity: 0.8; 
            line-height: 1.4;
        }
        .status { 
            background: rgba(255, 255, 255, 0.2); 
            padding: 1.5rem; 
            border-radius: 15px; 
            margin: 2rem 0; 
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .tech-stack { 
            margin-top: 2rem; 
            padding-top: 2rem; 
            border-top: 1px solid rgba(255, 255, 255, 0.2); 
        }
        .tech-stack h3 { 
            margin-bottom: 1rem; 
        }
        .tech-list { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 0.8rem; 
            justify-content: center; 
            margin-top: 1rem;
        }
        .tech-item { 
            background: rgba(255, 255, 255, 0.2); 
            padding: 0.5rem 1rem; 
            border-radius: 20px; 
            font-size: 0.9rem; 
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .completion-status {
            margin: 2rem 0;
            padding: 1rem;
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid rgba(76, 175, 80, 0.4);
            border-radius: 10px;
        }
        .file-structure {
            text-align: left;
            background: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            margin: 1rem 0;
            overflow-x: auto;
            white-space: pre-line;
        }
        @media (max-width: 768px) {
            .logo { font-size: 3rem; }
            .tagline { font-size: 1.2rem; }
            .features { grid-template-columns: 1fr; }
            .container { padding: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">KOSH 🇧🇩</div>
        <div class="tagline">Your Gateway to Bangladesh Capital Markets</div>
        
        <div class="completion-status">
            <h3>✅ MVP Development Complete!</h3>
            <p>Full-stack investment platform ready for UX/UI testing and demonstration</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🏦 DSE Stocks</h3>
                <p>Trade top 20 performing stocks from Dhaka Stock Exchange with real-time price updates</p>
            </div>
            <div class="feature">
                <h3>📈 Mutual Funds</h3>
                <p>Invest in top 10 mutual funds with professional management and NAV tracking</p>
            </div>
            <div class="feature">
                <h3>🥇 Digital Gold</h3>
                <p>24K pure gold investment with instant liquidity and gram-based trading</p>
            </div>
            <div class="feature">
                <h3>💰 T-Bills</h3>
                <p>Secure government treasury bills for stable returns with yield tracking</p>
            </div>
            <div class="feature">
                <h3>📱 Mobile First</h3>
                <p>Responsive design optimized for Bangladesh users with touch interfaces</p>
            </div>
            <div class="feature">
                <h3>🌙 Dark/Light Mode</h3>
                <p>Bangladesh flag-inspired color themes with green and red accents</p>
            </div>
            <div class="feature">
                <h3>🔐 Full Authentication</h3>
                <p>Complete onboarding with KYC simulation and secure login system</p>
            </div>
            <div class="feature">
                <h3>💼 Portfolio Management</h3>
                <p>Track holdings, performance, P&L, and comprehensive order history</p>
            </div>
        </div>
        
        <div class="status">
            <h3>🚀 Implementation Highlights</h3>
            <div class="file-structure">✅ Complete Component Structure:
├── Onboarding (Multi-step registration)
├── Dashboard (Portfolio overview)
├── Market Browse (All instruments)
├── Instrument Details (Charts & metrics)
├── Order Placement (Buy/Sell)
├── Portfolio Management
├── User Profile & Settings
└── Theme Management

✅ Bangladesh Market Data:
├── 20 Top DSE Stocks
├── 10 Leading Mutual Funds  
├── Digital Gold Options
└── Government T-Bills</div>
        </div>
        
        <div class="tech-stack">
            <h3>Technical Implementation</h3>
            <div class="tech-list">
                <span class="tech-item">React 17+ with Hooks</span>
                <span class="tech-item">Material-UI Components</span>
                <span class="tech-item">React Router v5</span>
                <span class="tech-item">Context API</span>
                <span class="tech-item">Local Storage</span>
                <span class="tech-item">Mock API Service</span>
                <span class="tech-item">Responsive CSS Grid</span>
                <span class="tech-item">PM2 Process Manager</span>
                <span class="tech-item">Bangladesh Taka (৳) Currency</span>
                <span class="tech-item">Real Financial Data Structure</span>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <h4>📋 Development Summary</h4>
            <p style="margin: 1rem 0; line-height: 1.6;"><strong>Status:</strong> All core features implemented and ready for testing</p>
            <p style="margin: 1rem 0; line-height: 1.6;"><strong>Components:</strong> 11 major components with full functionality</p>
            <p style="margin: 1rem 0; line-height: 1.6;"><strong>Demo Data:</strong> Realistic Bangladesh market data included</p>
            <p style="margin: 1rem 0; line-height: 1.6;"><strong>To Run Locally:</strong> <code style="background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 4px;">npm install && npm start</code></p>
            <p style="margin: 1rem 0; line-height: 1.6;"><strong>Source Code:</strong> Complete codebase committed to git repository</p>
        </div>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`KOSH Bangladesh MVP Showcase running on port ${PORT}`);
  console.log('🇧🇩 Investment Platform Demo Ready!');
});