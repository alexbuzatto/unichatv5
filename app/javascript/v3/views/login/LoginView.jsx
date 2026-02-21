import React, { useState, useEffect } from 'react';

const LoginView = ({ 
  onSubmit, 
  onGoogleLogin, 
  onSamlLogin, 
  error, 
  isLoading,
  installationName = 'UNICHAT',
  logo = '',
  signupEnabled = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAccessPanelOpen, setIsAccessPanelOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) {
      setIsError(true);
      const timer = setTimeout(() => setIsError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#111b21] flex items-center justify-center p-4 sm:p-8 font-sans antialiased overflow-hidden selection:bg-[#00a884]/30 selection:text-[#00a884]">
      {/* Container Principal */}
      <div className="relative w-full max-w-6xl aspect-[16/9] bg-[#202c33] rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden animate-fade-in border border-white/5">
        
        {/* Lado Esquerdo - Branding/Visual (WhatsApp Dark Teal Theme) */}
        <div className="relative w-full md:w-1/2 bg-[#111b21] overflow-hidden flex flex-col p-12">
          {/* Grainy Noise Texture */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
          
          {/* WhatsApp Deep Green Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#00a884]/20"></div>

          {/* Glowing Elements - WhatsApp Teal */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#00a884]/10 blur-[100px] rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-[#00a884]/5 blur-[120px] rounded-full animate-float"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,168,132,0.05)_0%,transparent_70%)]"></div>

          {/* Logo Glassmorphism Box */}
          <div className="relative z-10 self-start mb-auto">
            <div className="bg-[#202c33]/80 backdrop-blur-3xl border border-white/10 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center group hover:scale-105 transition-transform duration-500">
              <svg className="w-10 h-10 text-[#00a884] drop-shadow-[0_0_15px_rgba(0,168,132,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>

          {/* Brutalist Typography - High Contrast */}
          <div className="relative z-10 mt-auto mb-12">
            <h1 className="text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter drop-shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
              <span className="text-white opacity-95">UNI</span><br />
              <span className="text-[#00a884] animate-glow">CHAT</span>
            </h1>
          </div>

          {/* Footer Status Indicators */}
          <div className="relative z-10 flex items-center gap-6">
             <div className="flex items-center gap-3 text-[#00a884]/80 text-[11px] uppercase font-bold tracking-[0.5em] backdrop-blur-sm bg-black/40 py-2 px-4 rounded-full border border-[#00a884]/20">
                <div className="w-2 h-2 rounded-full bg-[#00a884] shadow-[0_0_15px_rgba(0,168,132,1)] animate-pulse"></div>
                SYSTEM ONLINE
             </div>
             <div className="text-white/20 text-[10px] uppercase font-medium tracking-[0.4em]">
                V4.0.9 // UNICHAT
             </div>
          </div>
        </div>

        {/* Lado Direito - Formulário Minimalista (Dark Mode WA) */}
        <div className="w-full md:w-1/2 bg-[#202c33] flex flex-col p-12 lg:p-20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00a884]/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className={`w-full max-w-sm mx-auto my-auto ${isError ? 'animate-shake' : ''} relative z-10`}>
            <div className="mb-10 text-center md:text-left">
               <h2 className="text-4xl font-black text-[#e9edef] mb-3 tracking-tight">Acesso de Segurança</h2>
               <p className="text-[#8696a0] text-sm font-medium leading-relaxed">Verificação de identidade necessária para <span className="text-[#00a884] font-bold underline decoration-[#00a884]/30 underline-offset-4">UNICHAT</span>.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-[#8696a0] uppercase tracking-[0.2em] ml-5 group-focus-within:text-[#00a884] transition-colors">Identidade Digital</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@empresa.com"
                    className="w-full bg-[#111b21] border-2 border-transparent rounded-[24px] px-7 py-5 text-[#e9edef] placeholder:text-[#8696a0] focus:bg-[#2a3942] focus:border-[#00a884]/20 focus:ring-4 focus:ring-[#00a884]/5 transition-all outline-none font-medium"
                    required
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8696a0] group-focus-within:text-[#00a884]/50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-5">
                  <label className="text-[10px] font-black text-[#8696a0] uppercase tracking-[0.2em] group-focus-within:text-[#00a884] transition-colors">Token Secreto</label>
                  <a href="/app/auth/password/new" className="text-[10px] font-black text-[#00a884] hover:text-[#00a884]/80 transition-colors uppercase tracking-[0.15em]">Recuperar Senha</a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#111b21] border-2 border-transparent rounded-[24px] px-7 py-5 text-[#e9edef] placeholder:text-[#8696a0] focus:bg-[#2a3942] focus:border-[#00a884]/20 focus:ring-4 focus:ring-[#00a884]/5 transition-all outline-none font-medium text-xl tracking-widest"
                    required
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8696a0] group-focus-within:text-[#00a884]/50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-[#00a884] hover:bg-[#008f72] active:scale-95 text-[#111b21] font-black uppercase tracking-[0.2em] py-6 rounded-[24px] shadow-2xl shadow-[#00a884]/20 hover:shadow-[#00a884]/40 transition-all duration-500 mt-8 flex items-center justify-center gap-3 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine"></div>
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-[#111b21]/20 border-t-[#111b21] rounded-full animate-spin"></div>
                ) : (
                  <>
                    Iniciar Sessão
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-14 text-center">
              <button 
                onClick={() => setIsAccessPanelOpen(true)}
                className="group inline-flex flex-col items-center gap-1"
              >
                <span className="text-[11px] font-bold text-[#8696a0] uppercase tracking-[0.2em] group-hover:text-[#00a884]/80 transition-colors">Não autorizado?</span>
                <span className="text-sm font-black text-[#e9edef] border-b-2 border-[#00a884] transition-all group-hover:bg-[#00a884] group-hover:text-[#111b21] px-2">Solicitar Acesso</span>
              </button>
            </div>
          </div>

          {/* Sliding Access Panel - Full Emerald UI */}
          <div className={`absolute inset-0 bg-[#111b21] transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) z-20 flex flex-col p-12 lg:p-20 ${isAccessPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,168,132,0.1)_0%,transparent_50%)]"></div>
            
            <button 
              onClick={() => setIsAccessPanelOpen(false)}
              className="relative z-10 self-start mb-16 text-[#00a884]/50 hover:text-[#00a884] transition-all flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] group"
            >
              <div className="w-8 h-8 rounded-full border border-[#00a884]/20 flex items-center justify-center group-hover:bg-[#00a884]/10 group-hover:border-[#00a884]/40 transition-all">
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              Abort Sequence
            </button>
            
            <div className="relative z-10 my-auto w-full max-w-sm mx-auto">
              <div className="mb-10 text-center">
                 <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-[0.1em] italic drop-shadow-[0_0_20px_rgba(0,168,132,0.3)]">Junte-se à Rede</h2>
                 <p className="text-[#00a884]/40 text-[10px] font-black uppercase tracking-[0.5em]">Registro de Rede</p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Administrador da Organização"
                  className="w-full bg-white/5 border border-white/10 rounded-[28px] px-8 py-5 text-white placeholder:text-white/10 focus:bg-white/10 focus:border-[#00a884]/30 focus:ring-4 focus:ring-[#00a884]/5 transition-all outline-none font-medium"
                />
                <input
                  type="email"
                  placeholder="Email Prioritário"
                  className="w-full bg-white/5 border border-white/10 rounded-[28px] px-8 py-5 text-white placeholder:text-white/10 focus:bg-white/10 focus:border-[#00a884]/30 focus:ring-4 focus:ring-[#00a884]/5 transition-all outline-none font-medium"
                />
                <button
                  className="w-full bg-[#00a884] hover:bg-[#00a884]/90 active:scale-95 text-[#111b21] font-black uppercase tracking-[0.3em] py-6 rounded-[28px] shadow-[0_20px_60px_rgba(0,168,132,0.3)] transition-all duration-500 mt-10"
                >
                  Autorizar Link
                </button>
              </div>
              
              <div className="mt-20 text-center">
                 <div className="inline-flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-1 h-1 rounded-full bg-[#00a884]/20 animate-pulse" style={{animationDelay: `${i*200}ms`}}></div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-40px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); filter: blur(100px); }
          50% { opacity: 0.3; transform: scale(1.2); filter: blur(130px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-15px); }
          40% { transform: translateX(15px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,168,132,0.1); }
          50% { text-shadow: 0 0 40px rgba(0,168,132,0.6); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fade-in { animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 12s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-shine { animation: shine 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LoginView;
