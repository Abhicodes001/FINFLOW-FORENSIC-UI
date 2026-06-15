import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, authenticate here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-[3rem] text-amber leading-none mb-2">FINFLOW</h1>
          <p className="font-mono text-[0.65rem] tracking-[0.25em] text-text-muted uppercase">
            Forensic Financial Intelligence
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-8" />

        {/* Form Section */}
        <form onSubmit={handleLogin} className="w-full flex flex-col">
          <div className="mb-6 flex flex-col">
            <label htmlFor="officerId" className="font-mono text-text-muted uppercase text-[0.75rem] mb-2">
              OFFICER ID
            </label>
            <input
              id="officerId"
              type="text"
              required
              className="bg-input border border-border text-text-primary px-3 py-2 text-sm focus:border-border-focus focus:outline-none transition-colors rounded-[3px]"
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="mb-8 flex flex-col">
            <label htmlFor="caseNumber" className="font-mono text-text-muted uppercase text-[0.75rem] mb-2">
              CASE NUMBER
            </label>
            <input
              id="caseNumber"
              type="text"
              required
              className="bg-input border border-border text-text-primary px-3 py-2 text-sm focus:border-border-focus focus:outline-none transition-colors rounded-[3px]"
              autoComplete="off"
              spellCheck="false"
              defaultValue="CC/2026/0042"
            />
          </div>

          {/* Visual Breath */}
          <div className="w-[80px] h-[2px] bg-amber mx-auto mb-8" />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber text-white font-sans font-semibold text-[0.875rem] uppercase tracking-[0.06em] py-3 rounded-[3px] hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-void focus:ring-amber"
          >
            ENTER CASE WORKSPACE →
          </button>
        </form>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-6 font-mono text-[0.65rem] text-text-muted">
        CIDECODE 2K26 · CCITR · Karnataka CID · DSCI
      </div>
    </div>
  );
};

export default Login;
