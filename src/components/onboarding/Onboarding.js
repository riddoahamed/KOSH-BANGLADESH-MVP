import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SecurityIcon from '@material-ui/icons/Security';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import './Onboarding.css';

function Onboarding({ onLogin }) {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nidNumber: '',
    bankAccount: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const steps = [
    { title: 'Welcome to KOSH', subtitle: 'Your gateway to Bangladesh capital markets' },
    { title: 'Personal Information', subtitle: 'Let\'s get to know you better' },
    { title: 'Security Setup', subtitle: 'Protect your investments' },
    { title: 'You\'re all set!', subtitle: 'Start investing in DSE, mutual funds, and more' }
  ];

  const features = [
    {
      icon: <TrendingUpIcon />,
      title: 'DSE Stocks',
      description: 'Trade top performing stocks from Dhaka Stock Exchange'
    },
    {
      icon: <AccountBalanceIcon />,
      title: 'Mutual Funds',
      description: 'Diversify with professionally managed investment funds'
    },
    {
      icon: <SecurityIcon />,
      title: 'Government T-Bills',
      description: 'Secure investments backed by Bangladesh government'
    },
    {
      icon: <PhoneAndroidIcon />,
      title: 'Digital Gold',
      description: 'Invest in 24K pure digital gold with instant liquidity'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      // Complete onboarding
      onLogin({
        id: 'demo-user-1',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        joinedDate: new Date().toISOString()
      });
    } else {
      handleNext();
    }
  };

  const renderWelcomeStep = () => (
    <div className="welcome__content">
      <div className="welcome__hero">
        <div className="hero__logo" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }}>
          <span>KOSH</span>
        </div>
        <h1 style={{ color: theme.textPrimary }}>
          Welcome to the Future of Investing in Bangladesh
        </h1>
        <p style={{ color: theme.textSecondary }}>
          Trade stocks, mutual funds, gold, and government securities all in one place.
          Built for Bangladeshi investors.
        </p>
      </div>

      <div className="features__grid">
        {features.map((feature, index) => (
          <div key={index} className="feature__card" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="feature__icon" style={{ color: theme.primary }}>
              {feature.icon}
            </div>
            <h3 style={{ color: theme.textPrimary }}>{feature.title}</h3>
            <p style={{ color: theme.textSecondary }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfoStep = () => (
    <div className="form__content">
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="input"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="input"
          placeholder="+880 1XXX-XXXXXX"
          required
        />
      </div>
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>NID Number</label>
        <input
          type="text"
          name="nidNumber"
          value={formData.nidNumber}
          onChange={handleInputChange}
          className="input"
          placeholder="National ID number"
          required
        />
      </div>
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>Bank Account Number</label>
        <input
          type="text"
          name="bankAccount"
          value={formData.bankAccount}
          onChange={handleInputChange}
          className="input"
          placeholder="Your bank account for transactions"
          required
        />
      </div>
    </div>
  );

  const renderSecurityStep = () => (
    <div className="form__content">
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>Create Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="input"
          placeholder="Minimum 8 characters"
          required
        />
      </div>
      <div className="form__group">
        <label style={{ color: theme.textPrimary }}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="input"
          placeholder="Re-enter your password"
          required
        />
      </div>
      <div className="checkbox__group">
        <label className="checkbox__label">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            required
          />
          <span style={{ color: theme.textPrimary }}>
            I agree to the <a href="#" style={{ color: theme.primary }}>Terms of Service</a> and{' '}
            <a href="#" style={{ color: theme.primary }}>Privacy Policy</a>
          </span>
        </label>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="complete__content">
      <div className="success__icon" style={{ color: theme.success }}>
        ✓
      </div>
      <h2 style={{ color: theme.textPrimary }}>
        Congratulations, {formData.fullName}!
      </h2>
      <p style={{ color: theme.textSecondary }}>
        Your KOSH account has been created successfully. You can now start exploring
        Bangladesh's financial markets and build your investment portfolio.
      </p>
      <div className="next__steps">
        <h4 style={{ color: theme.textPrimary }}>What's next?</h4>
        <ul style={{ color: theme.textSecondary }}>
          <li>Explore top DSE stocks and market trends</li>
          <li>Browse mutual funds from leading fund houses</li>
          <li>Start your digital gold savings journey</li>
          <li>Invest in secure government T-Bills</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="onboarding" style={{ backgroundColor: theme.background, minHeight: '100vh' }}>
      <div className="onboarding__container">
        {/* Progress Indicator */}
        <div className="progress__indicator">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress__dot ${index <= currentStep ? 'progress__dot--active' : ''}`}
              style={{
                backgroundColor: index <= currentStep ? theme.primary : theme.border
              }}
            />
          ))}
        </div>

        {/* Step Header */}
        <div className="step__header">
          <h2 style={{ color: theme.textPrimary }}>{steps[currentStep].title}</h2>
          <p style={{ color: theme.textSecondary }}>{steps[currentStep].subtitle}</p>
        </div>

        {/* Step Content */}
        <form onSubmit={handleSubmit} className="onboarding__form">
          <div className="step__content">
            {currentStep === 0 && renderWelcomeStep()}
            {currentStep === 1 && renderPersonalInfoStep()}
            {currentStep === 2 && renderSecurityStep()}
            {currentStep === 3 && renderCompleteStep()}
          </div>

          {/* Navigation */}
          <div className="step__navigation">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn btn-outline"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginLeft: 'auto' }}
            >
              {currentStep === 0 ? 'Get Started' : 
               currentStep === steps.length - 1 ? 'Enter KOSH' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;