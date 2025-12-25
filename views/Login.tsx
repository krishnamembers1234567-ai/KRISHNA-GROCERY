
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { LOGO } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [passcode, setPasscode] = useState('');
  const [recoveryInput, setRecoveryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'role' | 'phone' | 'otp' | 'admin_auth' | 'partner_auth' | 'forgot_passcode' | 'forgot_otp_help'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CUSTOMER);
  const navigate = useNavigate();

  const handleStartLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === UserRole.CUSTOMER) {
      setStep('phone');
    } else if (role === UserRole.ADMIN) {
      setStep('admin_auth');
    } else {
      setStep('partner_auth');
    }
  };

  const handlePhoneSubmit = () => {
    if (phone.length < 10) return alert("Enter valid 10-digit number");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerify = () => {
    if (selectedRole === UserRole.CUSTOMER && otp.length < 4) return alert("Enter 4-digit OTP");
    
    setLoading(true);
    setTimeout(() => {
      // For Demo: Admin passcode is 1234, Partner is 5678
      if (selectedRole === UserRole.ADMIN && passcode !== '1234') {
        setLoading(false);
        return alert("Invalid Admin Passcode");
      }
      if (selectedRole === UserRole.PARTNER && passcode !== '5678') {
        setLoading(false);
        return alert("Invalid Partner Passcode");
      }

      const mockUser: User = {
        id: `u_${Math.random().toString(36).substr(2, 9)}`,
        name: selectedRole === UserRole.CUSTOMER ? 'Premium Guest' : (selectedRole === UserRole.ADMIN ? 'Krishna Admin' : 'Delivery Captain'),
        role: selectedRole,
        phone: selectedRole === UserRole.CUSTOMER ? phone : 'Official Line',
        walletBalance: selectedRole === UserRole.CUSTOMER ? 500 : 0
      };
      
      onLogin(mockUser);
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleRecovery = () => {
    if (!recoveryInput) return alert("Please enter your registered ID or Phone");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Recovery instructions have been sent to your registered email/phone.");
      setStep('role');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-900 p-8 flex flex-col justify-center items-center">
      <div className="mb-12 flex flex-col items-center">
        {LOGO("w-20 h-20 mb-4 animate-pulse")}
        <h1 className="brand-font text-amber-500 text-4xl">KRISHNA</h1>
        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mt-2 font-bold">Premium Selection</p>
      </div>

      <div className="w-full max-w-sm bg-neutral-800/50 p-8 rounded-[40px] border border-neutral-800 shadow-2xl backdrop-blur-sm">
        
        {step === 'role' && (
          <div className="space-y-4">
            <h2 className="text-center text-neutral-100 font-bold mb-6">Welcome to Krishna</h2>
            <button 
              onClick={() => handleStartLogin(UserRole.CUSTOMER)}
              className="w-full bg-amber-500 text-neutral-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <i className="fa-solid fa-user"></i>
              Customer Login
            </button>
            <div className="flex items-center gap-4 py-4">
              <div className="h-px bg-neutral-700 flex-1"></div>
              <span className="text-[10px] text-neutral-500 font-bold">RESTRICTED ACCESS</span>
              <div className="h-px bg-neutral-700 flex-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleStartLogin(UserRole.PARTNER)}
                className="border border-emerald-900/50 text-emerald-500 p-4 rounded-2xl text-[10px] font-bold uppercase hover:bg-emerald-900/10 transition-all flex flex-col items-center gap-2"
              >
                <i className="fa-solid fa-motorcycle text-lg"></i>
                Partner
              </button>
              <button 
                onClick={() => handleStartLogin(UserRole.ADMIN)}
                className="border border-amber-900/50 text-amber-500 p-4 rounded-2xl text-[10px] font-bold uppercase hover:bg-amber-900/10 transition-all flex flex-col items-center gap-2"
              >
                <i className="fa-solid fa-shield text-lg"></i>
                Admin
              </button>
            </div>
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-6">
            <button onClick={() => setStep('role')} className="text-neutral-500 text-xs flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Back</button>
            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-3">Mobile Number</label>
              <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden px-4">
                <span className="text-neutral-400 text-sm font-bold border-r border-neutral-800 pr-4 py-4 mr-4">+91</span>
                <input 
                  type="tel"
                  maxLength={10}
                  placeholder="00000 00000"
                  className="bg-transparent w-full text-white focus:outline-none text-lg tracking-widest"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
            <button 
              onClick={handlePhoneSubmit}
              disabled={loading || phone.length < 10}
              className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Continue'}
            </button>
            <button 
              onClick={() => setStep('forgot_otp_help')}
              className="w-full text-center text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-amber-500"
            >
              Trouble logging in?
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-6 text-center">
            <button onClick={() => setStep('phone')} className="text-neutral-500 text-xs flex items-center gap-2 text-left"><i className="fa-solid fa-arrow-left"></i> Back</button>
            <div>
              <h3 className="text-neutral-100 font-bold text-lg">Verify OTP</h3>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">Sent to +91 {phone}</p>
            </div>
            <div className="flex justify-center gap-2">
              <input 
                type="text"
                maxLength={4}
                placeholder="0000"
                className="bg-neutral-900 border border-neutral-700 rounded-2xl p-4 text-white text-center text-2xl tracking-[1em] focus:outline-none focus:border-amber-500 w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <button 
              onClick={handleVerify}
              disabled={loading || otp.length < 4}
              className="w-full bg-amber-500 text-neutral-900 font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Verify & Enter'}
            </button>
            <p className="text-[10px] text-neutral-600">Didn't receive code? <button className="text-amber-500 font-bold">Resend</button></p>
          </div>
        )}

        {(step === 'admin_auth' || step === 'partner_auth') && (
          <div className="space-y-6">
            <button onClick={() => setStep('role')} className="text-neutral-500 text-xs flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Back</button>
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${step === 'admin_auth' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                <i className={`fa-solid ${step === 'admin_auth' ? 'fa-user-shield' : 'fa-motorcycle'}`}></i>
              </div>
              <h3 className="text-neutral-100 font-bold">{step === 'admin_auth' ? 'Admin Gateway' : 'Partner Portal'}</h3>
              <p className="text-[10px] text-neutral-500 uppercase mt-1">Authorized Personnel Only</p>
            </div>
            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-3">Security Passcode</label>
              <input 
                type="password"
                placeholder="••••"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl p-4 text-white text-center text-xl tracking-[0.5em] focus:outline-none focus:border-amber-500"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
            </div>
            <button 
              onClick={handleVerify}
              disabled={loading || !passcode}
              className={`w-full font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 ${step === 'admin_auth' ? 'bg-amber-500 text-neutral-900' : 'bg-emerald-600 text-white'}`}
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Authenticate'}
            </button>
            <div className="text-center">
              <button 
                onClick={() => setStep('forgot_passcode')}
                className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-amber-500"
              >
                Forgot Passcode?
              </button>
            </div>
            <p className="text-[9px] text-neutral-600 text-center italic">Passcodes are assigned by HQ. (Demo: Admin 1234, Partner 5678)</p>
          </div>
        )}

        {step === 'forgot_passcode' && (
          <div className="space-y-6">
            <button onClick={() => setStep(selectedRole === UserRole.ADMIN ? 'admin_auth' : 'partner_auth')} className="text-neutral-500 text-xs flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Back</button>
            <div className="text-center">
              <h3 className="text-neutral-100 font-bold">Recover Passcode</h3>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase">Enter your official ID or Phone number</p>
            </div>
            <div>
              <input 
                type="text"
                placeholder="Official ID / Phone"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl p-4 text-white text-center text-sm focus:outline-none focus:border-amber-500"
                value={recoveryInput}
                onChange={(e) => setRecoveryInput(e.target.value)}
              />
            </div>
            <button 
              onClick={handleRecovery}
              disabled={loading}
              className="w-full bg-amber-500 text-neutral-900 font-bold py-4 rounded-2xl transition-all active:scale-95"
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Request Recovery'}
            </button>
          </div>
        )}

        {step === 'forgot_otp_help' && (
          <div className="space-y-6">
            <button onClick={() => setStep('phone')} className="text-neutral-500 text-xs flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Back</button>
            <div className="text-center">
              <h3 className="text-neutral-100 font-bold">Login Help</h3>
              <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
                If you are not receiving the OTP, please ensure your mobile number is correct and you have an active network connection.
              </p>
            </div>
            <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-700 space-y-3">
              <button className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                <span>Login via Email</span>
                <i className="fa-solid fa-envelope text-amber-500"></i>
              </button>
              <div className="h-px bg-neutral-800"></div>
              <button className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                <span>Contact Support</span>
                <i className="fa-solid fa-headset text-amber-500"></i>
              </button>
            </div>
            <button 
              onClick={() => setStep('phone')}
              className="w-full bg-neutral-800 text-neutral-100 font-bold py-4 rounded-2xl transition-all active:scale-95"
            >
              Back to Login
            </button>
          </div>
        )}

      </div>

      <p className="mt-12 text-neutral-500 text-[10px] text-center max-w-xs uppercase tracking-widest leading-loose">
        Protected by Krishna Secure™<br/>
        All transactions are encrypted
      </p>
    </div>
  );
};

export default Login;
