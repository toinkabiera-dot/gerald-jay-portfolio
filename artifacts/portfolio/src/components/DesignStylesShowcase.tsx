import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette } from 'lucide-react';
import { useState } from 'react';

const STYLES = [
  { id: 'glass', name: 'Liquid Glass', desc: 'Frosted translucency, blur, and vivid mesh gradients.' },
  { id: 'brutalism', name: 'Brutalism', desc: 'Raw, bold, hard shadows, clashing colors.' },
  { id: 'skeuo', name: 'Skeuomorphism', desc: 'Realistic textures, embossed buttons, glossy 3D.' },
  { id: 'neumorph', name: 'Neumorphism', desc: 'Soft extruded UI in a clean, light palette.' },
  { id: 'retro', name: 'Retro 90s', desc: 'Table layouts, Times New Roman, and beveled edges.' }
];

const CONTENT = {
  name: "BrightSmile Dental",
  heroTitle: "Your Smile, Our Passion.",
  heroSub: "Advanced, comfortable dental care for the whole family.",
  cta: "Book Appointment",
  services: [
    { title: "Deep Cleaning", desc: "Professional removal of plaque and tartar for a healthier smile." },
    { title: "Laser Whitening", desc: "Brighten your teeth by several shades in just one session." },
    { title: "Clear Aligners", desc: "Invisible, comfortable alignment for a perfect bite." }
  ]
};

const GlassStyle = () => (
  <div className="min-h-full bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 p-4 md:p-8 relative overflow-hidden font-sans">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
       <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"></div>
       <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-50"></div>
       <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[50%] bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
    </div>
    
    <div className="max-w-5xl mx-auto relative z-10 space-y-8">
      <nav className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold tracking-tight">{CONTENT.name}</h1>
        <div className="hidden md:flex gap-6 text-sm font-medium opacity-80">
           <span>Home</span><span>Services</span><span>About</span>
        </div>
      </nav>
      
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-12 md:p-20 rounded-3xl shadow-2xl text-center text-white">
        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{CONTENT.heroTitle}</h2>
        <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto">{CONTENT.heroSub}</p>
        <button className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          {CONTENT.cta}
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {CONTENT.services.map(s => (
           <div key={s.title} className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-xl text-white hover:bg-white/20 transition-all">
             <h3 className="text-xl font-bold mb-3">{s.title}</h3>
             <p className="opacity-70 text-sm">{s.desc}</p>
           </div>
        ))}
      </div>
    </div>
  </div>
);

const BrutalStyle = () => (
  <div className="min-h-full bg-[#ffe800] p-4 md:p-8 font-mono border-x-8 border-black text-black">
    <div className="max-w-5xl mx-auto space-y-12">
      <nav className="flex justify-between items-center border-4 border-black bg-white p-4 shadow-[8px_8px_0_0_#000]">
        <h1 className="text-3xl font-black uppercase tracking-tighter">{CONTENT.name}</h1>
        <div className="hidden md:flex gap-6 font-bold uppercase underline">
           <span>Home</span><span>Services</span><span>About</span>
        </div>
      </nav>

      <div className="border-4 border-black bg-[#ff00ff] p-12 md:p-20 shadow-[16px_16px_0_0_#000] text-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-6">{CONTENT.heroTitle}</h2>
        <p className="text-xl md:text-2xl font-bold mb-10 border-4 border-black bg-white inline-block p-4 shadow-[4px_4px_0_0_#000]">{CONTENT.heroSub}</p>
        <div>
           <button className="px-8 py-4 bg-[#00ffff] border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_0_#000] hover:translate-y-2 hover:translate-x-2 hover:shadow-none transition-all active:bg-yellow-400">
             {CONTENT.cta}
           </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {CONTENT.services.map((s, i) => (
           <div key={s.title} className={`border-4 border-black p-6 shadow-[8px_8px_0_0_#000] ${i % 2 === 0 ? 'bg-white' : 'bg-[#00ff00]'}`}>
             <h3 className="text-2xl font-black uppercase mb-3 border-b-4 border-black pb-2">{s.title}</h3>
             <p className="font-bold">{s.desc}</p>
           </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeuoStyle = () => (
  <div className="min-h-full bg-[#e3dcc8] p-4 md:p-8 text-[#333]" style={{ backgroundImage: 'radial-gradient(#c5bba1 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
    <div className="max-w-5xl mx-auto space-y-8">
      <nav className="flex justify-between items-center p-6 bg-[#f4f0e6] rounded-xl" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.15), inset 0 2px 0 #fff', border: '1px solid #c5bba1' }}>
        <h1 className="text-3xl font-serif font-bold text-[#2c3e50]" style={{ textShadow: '0 1px 1px #fff' }}>{CONTENT.name}</h1>
        <div className="hidden md:flex gap-6 font-serif text-sm text-[#5a6a7a] font-semibold" style={{ textShadow: '0 1px 1px #fff' }}>
           <span>Home</span><span>Services</span><span>About</span>
        </div>
      </nav>

      <div className="bg-[#f4f0e6] p-12 md:p-20 rounded-2xl text-center relative overflow-hidden" style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.2), inset 0 2px 0 #fff', border: '1px solid #c5bba1' }}>
        <div className="absolute inset-x-0 top-0 h-8" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)' }}></div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2c3e50] mb-6" style={{ textShadow: '0 2px 2px #fff, 0 -1px 1px rgba(0,0,0,0.1)' }}>{CONTENT.heroTitle}</h2>
        <p className="text-lg font-serif text-[#5a6a7a] mb-10 max-w-2xl mx-auto italic" style={{ textShadow: '0 1px 1px #fff' }}>{CONTENT.heroSub}</p>
        
        <button className="px-8 py-4 rounded-full text-white font-bold font-sans tracking-wide" style={{
          background: 'linear-gradient(to bottom, #7db9e8 0%, #207cca 100%)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.3)',
          textShadow: '0 -1px 1px rgba(0,0,0,0.5)',
          border: '1px solid #14558f'
        }}>
          {CONTENT.cta}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {CONTENT.services.map(s => (
           <div key={s.title} className="bg-[#fcfbf9] p-8 rounded-xl relative" style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.15), inset 0 1px 0 #fff', border: '1px solid #dcd5c4' }}>
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#dcd5c4] rounded-full" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}></div>
             <h3 className="text-xl font-serif font-bold text-[#2c3e50] mb-3 mt-2" style={{ textShadow: '0 1px 1px #fff' }}>{s.title}</h3>
             <p className="text-[#5a6a7a] text-sm leading-relaxed" style={{ textShadow: '0 1px 1px #fff' }}>{s.desc}</p>
           </div>
        ))}
      </div>
    </div>
  </div>
);

const NeuLightStyle = () => (
  <div className="min-h-full bg-[#e0e5ec] p-4 md:p-8 text-[#4d5d74] font-sans">
    <div className="max-w-5xl mx-auto space-y-12">
      <nav className="flex justify-between items-center p-6 rounded-3xl" style={{ boxShadow: '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)' }}>
        <h1 className="text-2xl font-bold tracking-tight text-[#313c4e]">{CONTENT.name}</h1>
        <div className="hidden md:flex gap-6 font-medium">
           <span>Home</span><span>Services</span><span>About</span>
        </div>
      </nav>

      <div className="p-12 md:p-20 rounded-[40px] text-center" style={{ boxShadow: '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)' }}>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#313c4e]">{CONTENT.heroTitle}</h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto">{CONTENT.heroSub}</p>
        
        <button className="px-8 py-4 rounded-full font-bold text-[#313c4e] hover:text-blue-500 transition-colors" style={{
          boxShadow: '6px 6px 12px rgb(163,177,198,0.6), -6px -6px 12px rgba(255,255,255, 0.5)'
        }}>
          {CONTENT.cta}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {CONTENT.services.map(s => (
           <div key={s.title} className="p-8 rounded-3xl" style={{ boxShadow: '6px 6px 12px rgb(163,177,198,0.6), -6px -6px 12px rgba(255,255,255, 0.5)' }}>
             <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center" style={{ boxShadow: 'inset 4px 4px 8px rgb(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255, 0.5)' }}>
                <span className="text-xl">🦷</span>
             </div>
             <h3 className="text-xl font-bold mb-3 text-[#313c4e]">{s.title}</h3>
             <p className="text-sm">{s.desc}</p>
           </div>
        ))}
      </div>
    </div>
  </div>
);

const RetroStyle = () => (
  <div className="min-h-full bg-[#c0c0c0] p-4 md:p-8 font-serif text-black relative" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10z\' fill=\'%23a0a0a0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}>
    <style>{`
      @keyframes retro-marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-retro-marquee {
        display: inline-block;
        white-space: nowrap;
        animation: retro-marquee 15s linear infinite;
      }
      .retro-border {
        border-width: 3px;
        border-style: outset;
        border-color: #dfdfdf #404040 #404040 #dfdfdf;
      }
      .retro-border-inset {
        border-width: 3px;
        border-style: inset;
        border-color: #dfdfdf #404040 #404040 #dfdfdf;
      }
    `}</style>
    
    <div className="max-w-4xl mx-auto bg-white border-[4px] border-[#808080] p-1 shadow-lg">
      <div className="border-[2px] border-black p-4 space-y-6">
        
        <div className="text-center pb-4 border-b-[4px] border-double border-gray-400">
          <h1 className="text-4xl text-blue-800 font-bold italic mb-2 font-times">{CONTENT.name}</h1>
          <div className="bg-yellow-200 border-y-2 border-dashed border-red-500 overflow-hidden py-1 relative flex">
             <span className="animate-retro-marquee text-red-600 font-bold font-sans">
               🔥 NEW: Ask about our painless laser whitening! 🔥 Welcome to our homepage! 🔥
             </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 py-2">
           {['Home', 'Services', 'Contact'].map(link => (
             <a key={link} href="#" className="text-blue-600 underline font-bold font-sans">{link}</a>
           ))}
        </div>

        <div className="retro-border bg-gray-200 p-8 text-center my-6">
          <h2 className="text-3xl font-bold mb-4 font-times text-red-700">{CONTENT.heroTitle}</h2>
          <p className="text-lg mb-6 font-times">{CONTENT.heroSub}</p>
          <button className="retro-border bg-gray-300 px-6 py-2 font-sans text-sm font-bold active:retro-border-inset">
            {CONTENT.cta}
          </button>
        </div>

        <table className="w-full border-collapse border-2 border-gray-500 mt-8 font-sans text-sm">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-gray-500 p-2">Service</th>
              <th className="border border-gray-500 p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {CONTENT.services.map((s, i) => (
               <tr key={s.title} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                 <td className="border border-gray-500 p-2 font-bold text-blue-700">{s.title}</td>
                 <td className="border border-gray-500 p-2">{s.desc}</td>
               </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-8 pt-4 border-t border-gray-400 text-xs text-gray-600 font-sans">
          <p>Best viewed in Netscape Navigator</p>
          <div className="mt-2 retro-border-inset bg-black text-green-500 font-mono inline-block px-4 py-1">
             Hits: 0048291
          </div>
        </div>

      </div>
    </div>
  </div>
);

export function DesignStylesShowcase({ onClose }: { onClose: () => void }) {
  const [activeStyle, setActiveStyle] = useState(STYLES[0].id);

  const activeData = STYLES.find(s => s.id === activeStyle) || STYLES[0];

  const renderStyle = () => {
    switch (activeStyle) {
      case 'glass': return <GlassStyle />;
      case 'brutalism': return <BrutalStyle />;
      case 'skeuo': return <SkeuoStyle />;
      case 'neumorph': return <NeuLightStyle />;
      case 'retro': return <RetroStyle />;
      default: return <GlassStyle />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md overflow-hidden"
    >
      {/* Top Bar */}
      <div className="bg-background border-b border-white/10 p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-50 shrink-0 shadow-xl">
        <div className="flex items-center gap-3 text-white">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <Palette size={20} />
          </div>
          <div className="pr-12 md:pr-0">
            <h2 className="font-bold text-lg leading-tight">Design Styles Showcase</h2>
            <p className="text-xs text-muted-foreground hidden md:block">Same content. 5 different executions.</p>
          </div>
        </div>

        {/* Switcher */}
        <div className="flex flex-wrap justify-center gap-2">
          {STYLES.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveStyle(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeStyle === s.id 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(233,69,96,0.3)]' 
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:static p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Description Bar */}
      <div className="bg-primary/10 border-b border-primary/20 px-6 py-3 text-center shrink-0 z-40">
        <p className="text-primary text-sm font-medium">
          <span className="font-bold text-white">{activeData.name}:</span> {activeData.desc}
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-black relative">
         <AnimatePresence mode="wait">
           <motion.div
             key={activeStyle}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             className="min-h-full"
           >
             {renderStyle()}
           </motion.div>
         </AnimatePresence>
      </div>
    </motion.div>
  );
}