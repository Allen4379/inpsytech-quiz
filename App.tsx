import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { CouponScreen } from './components/CouponScreen';

function App() {
  // Initialize state from localStorage to persist progress across refreshes
  const [step, setStep] = useState<number>(() => {
    const savedStep = localStorage.getItem('inpsytech_movie_step');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('inpsytech_movie_step', step.toString());
  }, [step]);

  const handleStart = () => {
    setStep(1);
  };

  const handleCorrectAnswer = () => {
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
    // localStorage will be updated by the useEffect
  };

  const renderContent = () => {
    // Step 0: Welcome
    if (step === 0) {
      return <WelcomeScreen onStart={handleStart} />;
    }

    // Steps 1 to N: Quiz
    if (step >= 1 && step <= QUESTIONS.length) {
      return (
        <QuizScreen
          key={step} 
          question={QUESTIONS[step - 1]}
          currentStep={step}
          totalSteps={QUESTIONS.length}
          onCorrectAnswer={handleCorrectAnswer}
        />
      );
    }

    // Step N+1: Coupon
    return <CouponScreen onReset={handleReset} />;
  };

  return (
    <div className="h-full w-full bg-pandora-bg text-pandora-text font-sans relative overflow-hidden flex flex-col">
      
      {/* Immersive Background Effects (Pandora Atmosphere) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-pandora-bg via-[#0f172a] to-[#1e1b4b]"></div>
        
        {/* Bioluminescent Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pandora-cyan/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pandora-purple/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        
        {/* Floating particles (simulated via CSS for simplicity) */}
        <div className="absolute top-[20%] right-[20%] w-2 h-2 bg-pandora-cyan rounded-full blur-[1px] animate-float opacity-50"></div>
        <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-white rounded-full blur-[0px] animate-float opacity-30 delay-700"></div>
        <div className="absolute bottom-[30%] left-[30%] w-3 h-3 bg-pandora-purple rounded-full blur-[2px] animate-float opacity-40 delay-200"></div>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-5 py-4 relative z-10 h-full">
        {/* Header - Minimalist iOS 26 style */}
        <header className="flex justify-center mb-2 shrink-0">
           <div className="glass-panel px-4 py-1.5 rounded-full flex items-center space-x-2">
             <span className="w-2 h-2 rounded-full bg-pandora-cyan animate-pulse"></span>
             <span className="text-pandora-cyan font-display tracking-[0.15em] text-xs font-bold uppercase">
               InPsytech Movie Night
             </span>
           </div>
        </header>

        {/* Main Content Area - Flex Grow to take available space, centering vertically */}
        <main className="flex-grow flex flex-col justify-center overflow-hidden">
           {renderContent()}
        </main>

        {/* Footer */}
        <footer className="mt-4 shrink-0 text-center pb-safe">
          <p className="text-[10px] text-white/30 font-display tracking-widest uppercase">
             &copy; 2025 InPsytech
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;