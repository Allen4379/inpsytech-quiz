import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Ticket, Calendar, Clock, MapPin, Info, UserCheck, Linkedin, ExternalLink, Film, Hand } from 'lucide-react';

interface CouponScreenProps {
  onReset: () => void;
}

export const CouponScreen: React.FC<CouponScreenProps> = ({ onReset }) => {
  const [activeTab, setActiveTab] = useState<'voucher' | 'info'>('voucher');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-TW', { hour12: false });
  };

  const handleSafeReset = () => {
    // Confirmation dialog to prevent accidental resets
    const isConfirmed = window.confirm(
      "⚠️ 警告：確定要重新開始嗎？\n\n這將會清除目前的兌換券畫面。\n如果尚未兌換，請勿執行此操作。\n\n(僅供工作人員或測試使用)"
    );
    
    if (isConfirmed) {
      onReset();
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in w-full h-full justify-start pt-2">
      
      {/* Top Toggle / Tabs - Fixed at top of content area */}
      <div className="flex w-full bg-white/5 rounded-xl p-1 mb-4 border border-white/10 shrink-0">
        <button 
          onClick={() => setActiveTab('voucher')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${activeTab === 'voucher' ? 'bg-pandora-cyan text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'text-white/50 hover:text-white'}`}
        >
          <Ticket size={16} />
          <span>數位兌換券</span>
        </button>
        <button 
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${activeTab === 'info' ? 'bg-pandora-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-white/50 hover:text-white'}`}
        >
          <Film size={16} />
          <span>電影資訊</span>
        </button>
      </div>

      {/* Content Container - Scrollable internal if needed, but designed to fit */}
      <div className="w-full flex-1 relative overflow-y-auto no-scrollbar">
        
        {/* VIEW 1: VOUCHER */}
        {activeTab === 'voucher' && (
          <div className="animate-fade-in space-y-4">
             {/* Instruction */}
             <div className="text-center mb-2">
                <div className="bg-pandora-cyan/10 border border-pandora-cyan/30 rounded-lg p-2 inline-flex items-center space-x-2">
                  <Hand size={16} className="text-pandora-cyan animate-pulse" />
                  <span className="text-white text-sm">挑戰成功！請向<span className="text-pandora-cyan font-bold mx-1">工作人員</span>出示此畫面</span>
                </div>
             </div>

             {/* Breathing Coupon Card */}
             <div className="w-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pandora-cyan to-pandora-purple blur-xl opacity-30 rounded-3xl animate-pulse-slow"></div>
                
                <div className="relative glass-panel rounded-3xl overflow-hidden border-2 border-pandora-cyan/50 shadow-2xl bg-white/10 animate-breathing">
                  {/* Header Strip */}
                  <div className="bg-white/10 p-3 border-b border-white/20 flex items-center justify-between">
                    <span className="font-display font-bold text-white tracking-wider text-xs uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                      LIVE PASS
                    </span>
                    <Ticket className="text-pandora-cyan" size={20} />
                  </div>

                  <div className="p-5 text-center space-y-5">
                     <div className="flex justify-center space-x-3">
                       <div className="flex-1 p-3 rounded-xl bg-black/40 border border-white/20">
                         <span className="text-3xl">🍿</span>
                         <span className="block text-lg font-bold text-white mt-1">爆米花</span>
                       </div>
                       <div className="flex-1 p-3 rounded-xl bg-black/40 border border-white/20">
                         <span className="text-3xl">🥤</span>
                         <span className="block text-lg font-bold text-white mt-1">飲料</span>
                       </div>
                     </div>
                     
                     {/* Verification Area */}
                     <div className="bg-black/50 rounded-lg p-3 border-2 border-pandora-cyan/30 relative overflow-hidden">
                        <div className="flex flex-col items-center justify-center space-y-1 relative z-10">
                          <div className="flex items-center space-x-2 text-pandora-cyan">
                            <UserCheck size={16} />
                            <span className="font-display font-bold text-xs tracking-widest uppercase">Staff Verify</span>
                          </div>
                          <div className="text-3xl font-display font-bold text-white tracking-widest tabular-nums">
                            {formatTime(currentTime)}
                          </div>
                          <div className="text-[9px] text-white/50 uppercase tracking-widest">Current Time</div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
             
             {/* LinkedIn Button (High Priority) */}
             <div className="pt-2">
                <a 
                  href="https://tw.linkedin.com/company/inpsytech-inc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Button variant="secondary" fullWidth className="!py-4 !bg-[#0077b5]/20 !border-[#0077b5]/50 group-hover:!bg-[#0077b5]/40 text-white flex flex-col items-center justify-center space-y-1">
                     <div className="flex items-center space-x-2">
                       <Linkedin size={20} fill="currentColor" />
                       <span className="text-lg">追蹤乾瞻科技 LinkedIn</span>
                       <ExternalLink size={16} className="opacity-50" />
                     </div>
                     <span className="text-xs text-white/60 font-normal">獲取最新科技趨勢與活動資訊</span>
                  </Button>
                </a>
             </div>
          </div>
        )}

        {/* VIEW 2: INFO */}
        {activeTab === 'info' && (
          <div className="animate-fade-in space-y-3">
            <div className="glass-panel rounded-2xl p-5 space-y-4 border-l-4 border-l-pandora-purple bg-white/5">
               {/* Title */}
               <div className="border-b border-white/20 pb-3">
                  <span className="block text-[10px] text-white/60 mb-1 font-display tracking-widest">NOW SCREENING</span>
                  <h2 className="text-2xl font-bold text-white leading-tight font-display">
                    阿凡達：<span className="text-pandora-cyan">火與燼</span>
                  </h2>
                  <span className="font-display text-white/60 text-sm tracking-wide block mt-1">Avatar: Fire and Ash</span>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold bg-pandora-cyan/20 border border-pandora-cyan/50 text-white">IMAX 3D</span>
               </div>

               {/* Grid Info */}
               <div className="space-y-3 text-sm text-white">
                  <div className="flex items-center space-x-3">
                     <div className="p-1.5 bg-white/10 rounded-lg"><Calendar size={18} className="text-pandora-purple" /></div>
                     <div>
                        <p className="text-[10px] text-white/60 uppercase">Date</p>
                        <p className="font-bold text-lg">2025年12月19日 <span className="text-sm font-normal text-gray-300">(五)</span></p>
                     </div>
                  </div>

                  <div className="flex items-center space-x-3">
                     <div className="p-1.5 bg-white/10 rounded-lg"><Clock size={18} className="text-pandora-purple" /></div>
                     <div>
                        <p className="text-[10px] text-white/60 uppercase">Time</p>
                        <p className="font-display font-bold text-xl">20:20 <span className="text-sm text-gray-400">~</span> 23:47</p>
                     </div>
                  </div>

                  <div className="flex items-center space-x-3">
                     <div className="p-1.5 bg-white/10 rounded-lg"><MapPin size={18} className="text-pandora-purple" /></div>
                     <div>
                        <p className="text-[10px] text-white/60 uppercase">Location</p>
                        <p className="font-bold text-lg">威秀影城 新竹巨城店</p>
                        <p className="text-pandora-cyan text-sm">Big City IMAX 3廳</p>
                     </div>
                  </div>
               </div>
               
               {/* Warning */}
               <div className="bg-pandora-purple/20 border border-pandora-purple/50 rounded-xl p-3 flex items-start space-x-3">
                  <Info size={20} className="text-white shrink-0 mt-0.5" />
                  <p className="text-sm text-white font-bold leading-relaxed">
                    請於 <span className="text-pandora-cyan text-lg">20:10</span> 前入場集合
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Link (Bottom) */}
      <div className="mt-2 shrink-0">
        <button 
          onClick={handleSafeReset}
          className="text-xs text-white/20 hover:text-white/50 transition-colors py-2"
        >
          重新開始 (Staff Only)
        </button>
      </div>
    </div>
  );
};