import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import SecurityIcon from '@material-ui/icons/Security';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HelpIcon from '@material-ui/icons/Help';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './Profile.css';

function Profile() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    fullName: 'Ahmed Rahman',
    email: 'ahmed.rahman@email.com',
    phone: '+880 1712-345678',
    nidNumber: '1234567890123',
    address: 'Dhaka, Bangladesh',
    bankAccount: 'BRAC Bank - 12345678901',
    joinedDate: '2024-01-15',
    accountType: 'Premium',
    kycStatus: 'Verified'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketUpdates: true,
    portfolioAlerts: true,
    newsletters: false
  });

  const [formData, setFormData] = useState({ ...userProfile });

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: <PersonIcon /> },
    { id: 'security', label: 'Security', icon: <SecurityIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
    { id: 'banking', label: 'Banking Details', icon: <AccountBalanceIcon /> },
    { id: 'support', label: 'Support', icon: <HelpIcon /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    setUserProfile({ ...formData });
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...userProfile });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderPersonalInfo = () => (
    <div className="section__content">
      <div className="section__header">
        <div>
          <h3 style={{ color: theme.textPrimary }}>Personal Information</h3>
          <p style={{ color: theme.textSecondary }}>Manage your personal details and account information</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-outline"
        >
          <EditIcon />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {showSuccess && (
        <div className="success__banner" style={{ backgroundColor: `${theme.success}20`, border: `1px solid ${theme.success}`, color: theme.success }}>
          <CheckCircleIcon />
          Profile updated successfully!
        </div>
      )}

      <div className="info__grid">
        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input"
            />
          ) : (
            <span style={{ color: theme.textPrimary }}>{userProfile.fullName}</span>
          )}
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input"
            />
          ) : (
            <span style={{ color: theme.textPrimary }}>{userProfile.email}</span>
          )}
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input"
            />
          ) : (
            <span style={{ color: theme.textPrimary }}>{userProfile.phone}</span>
          )}
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>NID Number</label>
          <span style={{ color: theme.textPrimary }}>{userProfile.nidNumber}</span>
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input"
            />
          ) : (
            <span style={{ color: theme.textPrimary }}>{userProfile.address}</span>
          )}
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>Account Type</label>
          <span className="account__type" style={{ color: theme.primary }}>{userProfile.accountType}</span>
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>KYC Status</label>
          <span className="kyc__status" style={{ color: theme.success }}>{userProfile.kycStatus}</span>
        </div>

        <div className="info__item">
          <label style={{ color: theme.textSecondary }}>Member Since</label>
          <span style={{ color: theme.textPrimary }}>{formatDate(userProfile.joinedDate)}</span>
        </div>
      </div>

      {isEditing && (
        <div className="action__buttons">
          <button onClick={handleSave} className="btn btn-primary">
            Save Changes
          </button>
          <button onClick={handleCancel} className="btn btn-outline">
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const renderSecurity = () => (
    <div className="section__content">
      <div className="section__header">
        <div>
          <h3 style={{ color: theme.textPrimary }}>Security Settings</h3>
          <p style={{ color: theme.textSecondary }}>Manage your account security and password settings</p>
        </div>
      </div>

      <div className="security__options">
        <div className="security__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="security__info">
            <h4 style={{ color: theme.textPrimary }}>Password</h4>
            <p style={{ color: theme.textSecondary }}>Last changed 30 days ago</p>
          </div>
          <button className="btn btn-outline">Change Password</button>
        </div>

        <div className="security__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="security__info">
            <h4 style={{ color: theme.textPrimary }}>Two-Factor Authentication</h4>
            <p style={{ color: theme.textSecondary }}>Add an extra layer of security to your account</p>
          </div>
          <button className="btn btn-primary">Enable 2FA</button>
        </div>

        <div className="security__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="security__info">
            <h4 style={{ color: theme.textPrimary }}>Login Sessions</h4>
            <p style={{ color: theme.textSecondary }}>Manage your active login sessions</p>
          </div>
          <button className="btn btn-outline">View Sessions</button>
        </div>

        <div className="security__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="security__info">
            <h4 style={{ color: theme.textPrimary }}>Trading PIN</h4>
            <p style={{ color: theme.textSecondary }}>Set a PIN for trading transactions</p>
          </div>
          <button className="btn btn-outline">Setup PIN</button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="section__content">
      <div className="section__header">
        <div>
          <h3 style={{ color: theme.textPrimary }}>Notification Preferences</h3>
          <p style={{ color: theme.textSecondary }}>Choose how you want to receive notifications</p>
        </div>
      </div>

      <div className="notification__options">
        <div className="notification__group">
          <h4 style={{ color: theme.textPrimary }}>Communication Preferences</h4>
          
          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>Email Notifications</span>
              <small style={{ color: theme.textSecondary }}>Receive updates via email</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceChange}
              />
              <span className="slider" style={{ backgroundColor: preferences.emailNotifications ? theme.primary : theme.border }}></span>
            </label>
          </div>

          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>SMS Notifications</span>
              <small style={{ color: theme.textSecondary }}>Receive updates via SMS</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={preferences.smsNotifications}
                onChange={handlePreferenceChange}
              />
              <span className="slider" style={{ backgroundColor: preferences.smsNotifications ? theme.primary : theme.border }}></span>
            </label>
          </div>

          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>Push Notifications</span>
              <small style={{ color: theme.textSecondary }}>Receive app notifications</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={preferences.pushNotifications}
                onChange={handlePreferenceChange}
              />
              <span className="slider" style={{ backgroundColor: preferences.pushNotifications ? theme.primary : theme.border }}></span>
            </label>
          </div>
        </div>

        <div className="notification__group">
          <h4 style={{ color: theme.textPrimary }}>Content Preferences</h4>
          
          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>Market Updates</span>
              <small style={{ color: theme.textSecondary }}>Daily market summaries and news</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="marketUpdates"
                checked={preferences.marketUpdates}
                onChange={handlePreferenceChange}
              />
              <span className="slider" style={{ backgroundColor: preferences.marketUpdates ? theme.primary : theme.border }}></span>
            </label>
          </div>

          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>Portfolio Alerts</span>
              <small style={{ color: theme.textSecondary }}>Alerts about your investments</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="portfolioAlerts"
                checked={preferences.portfolioAlerts}
                onChange={handlePreferenceChange}
              />
              <span className="slider" style={{ backgroundColor: preferences.portfolioAlerts ? theme.primary : theme.border }}></span>
            </label>
          </div>

          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>Newsletters</span>
              <small style={{ color: theme.textSecondary }}>Weekly investment insights and tips</small>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="newsletters"
                checked={preferences.newsletters}
                onChange={handlePreferenceChange}
              />
              <span className="slider" style={{ backgroundColor: preferences.newsletters ? theme.primary : theme.border }}></span>
            </label>
          </div>
        </div>

        <div className="theme__section">
          <h4 style={{ color: theme.textPrimary }}>App Preferences</h4>
          
          <div className="notification__item">
            <div>
              <span style={{ color: theme.textPrimary }}>Dark Mode</span>
              <small style={{ color: theme.textSecondary }}>Switch between light and dark themes</small>
            </div>
            <button onClick={toggleTheme} className="theme__toggle" style={{ color: theme.textSecondary }}>
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBanking = () => (
    <div className="section__content">
      <div className="section__header">
        <div>
          <h3 style={{ color: theme.textPrimary }}>Banking Details</h3>
          <p style={{ color: theme.textSecondary }}>Manage your bank accounts for transactions</p>
        </div>
      </div>

      <div className="banking__info">
        <div className="bank__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="bank__details">
            <h4 style={{ color: theme.textPrimary }}>Primary Bank Account</h4>
            <p style={{ color: theme.textSecondary }}>{userProfile.bankAccount}</p>
            <span className="status verified" style={{ color: theme.success }}>Verified</span>
          </div>
          <button className="btn btn-outline">Update</button>
        </div>

        <div className="add__bank" style={{ backgroundColor: theme.surface, border: `2px dashed ${theme.border}` }}>
          <p style={{ color: theme.textSecondary }}>Add another bank account</p>
          <button className="btn btn-primary">Add Bank Account</button>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="section__content">
      <div className="section__header">
        <div>
          <h3 style={{ color: theme.textPrimary }}>Support & Help</h3>
          <p style={{ color: theme.textSecondary }}>Get help and support for your account</p>
        </div>
      </div>

      <div className="support__options">
        <div className="support__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <h4 style={{ color: theme.textPrimary }}>Contact Support</h4>
          <p style={{ color: theme.textSecondary }}>Get help from our support team</p>
          <button className="btn btn-primary">Contact Us</button>
        </div>

        <div className="support__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <h4 style={{ color: theme.textPrimary }}>FAQ</h4>
          <p style={{ color: theme.textSecondary }}>Find answers to common questions</p>
          <button className="btn btn-outline">View FAQ</button>
        </div>

        <div className="support__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <h4 style={{ color: theme.textPrimary }}>Download Statements</h4>
          <p style={{ color: theme.textSecondary }}>Download your account statements</p>
          <button className="btn btn-outline">Download</button>
        </div>

        <div className="support__item" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}>
          <h4 style={{ color: theme.textPrimary }}>App Version</h4>
          <p style={{ color: theme.textSecondary }}>KOSH Bangladesh v1.0.0</p>
          <span style={{ color: theme.success }}>Up to date</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile" style={{ backgroundColor: theme.background, minHeight: 'calc(100vh - 70px)' }}>
      <div className="profile__container">
        {/* Header */}
        <div className="profile__header">
          <div className="user__avatar" style={{ backgroundColor: theme.primary }}>
            <PersonIcon style={{ color: 'white', fontSize: '2rem' }} />
          </div>
          <div>
            <h1 style={{ color: theme.textPrimary }}>Profile Settings</h1>
            <p style={{ color: theme.textSecondary }}>Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="profile__content">
          {/* Sidebar */}
          <div className="profile__sidebar" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <nav className="profile__nav">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  className={`nav__item ${activeSection === item.id ? 'nav__item--active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    color: activeSection === item.id ? theme.primary : theme.textSecondary,
                    backgroundColor: activeSection === item.id ? `${theme.primary}10` : 'transparent'
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="profile__main" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            {activeSection === 'personal' && renderPersonalInfo()}
            {activeSection === 'security' && renderSecurity()}
            {activeSection === 'notifications' && renderNotifications()}
            {activeSection === 'banking' && renderBanking()}
            {activeSection === 'support' && renderSupport()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;