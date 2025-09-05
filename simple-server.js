const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from src directory for development
app.use('/static', express.static(path.join(__dirname, 'src')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Simple HTML file to showcase the app
app.get('/', (req, res) => {
  res.send(`
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
            }
            .container { 
                max-width: 800px; 
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
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                gap: 1.5rem; 
                margin: 2rem 0; 
            }
            .feature { 
                background: rgba(255, 255, 255, 0.1); 
                padding: 1.5rem; 
                border-radius: 15px; 
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .feature h3 { 
                font-size: 1.2rem; 
                margin-bottom: 0.5rem; 
            }
            .feature p { 
                opacity: 0.8; 
            }
            .status { 
                background: rgba(255, 255, 255, 0.2); 
                padding: 1rem; 
                border-radius: 10px; 
                margin: 2rem 0; 
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
                gap: 0.5rem; 
                justify-content: center; 
            }
            .tech-item { 
                background: rgba(255, 255, 255, 0.2); 
                padding: 0.5rem 1rem; 
                border-radius: 20px; 
                font-size: 0.9rem; 
            }
            @media (max-width: 768px) {
                .logo { font-size: 3rem; }
                .tagline { font-size: 1.2rem; }
                .features { grid-template-columns: 1fr; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">KOSH</div>
            <div class="tagline">Your Gateway to Bangladesh Capital Markets</div>
            
            <div class="status">
                <h3>🎉 MVP Development Complete!</h3>
                <p>Full-stack investment platform ready for UX/UI testing</p>
            </div>
            
            <div class="features">
                <div class="feature">
                    <h3>🏦 DSE Stocks</h3>
                    <p>Trade top 20 performing stocks from Dhaka Stock Exchange</p>
                </div>
                <div class="feature">
                    <h3>📈 Mutual Funds</h3>
                    <p>Invest in top 10 mutual funds with professional management</p>
                </div>
                <div class="feature">
                    <h3>🥇 Digital Gold</h3>
                    <p>24K pure gold investment with instant liquidity</p>
                </div>
                <div class="feature">
                    <h3>💰 T-Bills</h3>
                    <p>Secure government treasury bills for stable returns</p>
                </div>
                <div class="feature">
                    <h3>📱 Mobile First</h3>
                    <p>Responsive design optimized for Bangladesh users</p>
                </div>
                <div class="feature">
                    <h3>🌙 Dark/Light Mode</h3>
                    <p>Bangladesh flag-inspired color themes</p>
                </div>
            </div>
            
            <div class="tech-stack">
                <h3>Technical Implementation</h3>
                <div class="tech-list">
                    <span class="tech-item">React 17+</span>
                    <span class="tech-item">Material-UI</span>
                    <span class="tech-item">React Router</span>
                    <span class="tech-item">Context API</span>
                    <span class="tech-item">Local Storage</span>
                    <span class="tech-item">Mock API</span>
                    <span class="tech-item">Responsive CSS</span>
                    <span class="tech-item">PM2</span>
                </div>
            </div>
            
            <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                <p><strong>Note:</strong> Complete React application code is ready and committed to git.</p>
                <p>To run locally: <code>npm install && npm start</code></p>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`KOSH Bangladesh MVP showcase running on port ${PORT}`);
});
