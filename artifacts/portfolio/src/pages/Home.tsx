import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Terminal, Server, ShieldCheck, Code2, Database, MessageSquare, Briefcase, Zap, Smartphone } from 'lucide-react';
import { NeuButton, NeuCard, NeuInput, NeuCodeBlock } from '@/components/Neumorphic';
import { HangingBadge } from '@/components/HangingBadge';
import { DesignStylesShowcase } from '@/components/DesignStylesShowcase';

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

const ROLES = [
  'Full-Stack Engineer',
  'Web App Builder',
  'Business Systems Dev',
  'Custom Tool Maker',
];

function useTypingLoop(words: string[], typeSpeed = 80, deleteSpeed = 40, pauseMs = 1400) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

export function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const typedRole = useTypingLoop(ROLES);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      {/* Design Styles Showcase Modal */}
      <AnimatePresence>
        {showShowcase && <DesignStylesShowcase onClose={() => setShowShowcase(false)} />}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 backdrop-blur-md bg-background/80 border-b border-white/5' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-white cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            Gerald Jay Abiera<span className="text-primary">.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button 
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
            <NeuButton onClick={() => scrollTo('#contact')} className="!py-2 !px-6 !rounded-xl !text-sm">
              Let's Talk
            </NeuButton>
          </div>

          <button 
            className="md:hidden text-white p-2 neu-button rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 pb-6 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map(link => (
              <button 
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-semibold text-left text-white p-4 neu-flat rounded-2xl active:neu-active"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-32 md:pb-32 px-6">
          {/* Decorative background elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            {/* Hanging Badge - Desktop (absolute right) */}
            <div className="hidden md:block absolute -top-8 right-32 lg:right-40 z-40">
              <HangingBadge />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-20 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neu-flat text-xs font-medium text-primary mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for new projects
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Full-Stack <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-muted-foreground">Web Developer</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                I build exact, tailored web applications and custom websites for small businesses, gas stations, and local entrepreneurs. No fluff, just tools that work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <NeuButton primary onClick={() => scrollTo('#contact')}>
                  Discuss Your Project <ChevronRight size={18} />
                </NeuButton>
                <NeuButton onClick={() => scrollTo('#work')}>
                  View My Work
                </NeuButton>
              </div>

              {/* Code Panel — below heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="neu-panel p-2 rounded-3xl max-w-lg"
              >
                <div className="bg-[#121220] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <div className="h-8 bg-[#1a1a2e] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-6 font-mono text-sm text-gray-400">
                    <div className="text-primary mb-2">const developer = {'{'}</div>
                    <div className="pl-4">name: <span className="text-white">'Gerald Jay Abiera'</span>,</div>
                    <div className="pl-4">role: <span className="text-white">'{typedRole}<span className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-[1px] animate-pulse" /></span>',</div>
                    <div className="pl-4">specialties: [</div>
                    <div className="pl-8 text-white">'Business Systems',</div>
                    <div className="pl-8 text-white">'Gas Station Management',</div>
                    <div className="pl-8 text-white">'Voucher Platforms'</div>
                    <div className="pl-4">],</div>
                    <div className="pl-4">approach: <span className="text-white">'Build exactly what you need'</span></div>
                    <div className="text-primary mt-2">{'}'}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hanging Badge - Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:hidden w-full flex justify-center pt-32 pb-4 z-30 pointer-events-auto"
            >
              <div className="scale-[0.8] origin-top">
                <HangingBadge />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-background relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What I Do</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Specialized digital solutions crafted for specific business operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Code2, title: 'Custom Websites', desc: 'Fast, responsive, and uniquely tailored websites that represent your brand and convert visitors.' },
                { icon: Server, title: 'Gas Station Systems', desc: 'Specialized management interfaces for tracking inventory, sales, and daily operations.' },
                { icon: Smartphone, title: 'Voucher & Coupon Systems', desc: 'Secure generation, distribution, and validation of digital vouchers for customer loyalty.' },
                { icon: Briefcase, title: 'Business Apps', desc: 'Internal tools and web apps that automate your workflows and save you hours of manual work.' },
                { icon: Database, title: 'Database Integration', desc: 'Robust architecture using Firebase or Supabase for real-time data synchronization and secure storage.' },
                { icon: MessageSquare, title: 'SMS & Notifications', desc: 'Automated SMS alerts and email notification systems to keep your customers and staff informed.' }
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NeuCard className="h-full group hover:border-primary/20 transition-colors">
                    <div className="w-14 h-14 rounded-2xl neu-inset flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <service.icon size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </NeuCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/3">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  A transparent, straightforward process from our first chat to launch day. No technical jargon required.
                </p>
                <NeuButton onClick={() => scrollTo('#contact')} className="w-full md:w-auto">
                  Start the Process
                </NeuButton>
              </div>
              
              <div className="md:w-2/3 grid gap-6">
                {[
                  { step: '01', title: 'Consultation', desc: 'We discuss your business needs, pain points, and exactly what the software needs to achieve.' },
                  { step: '02', title: 'Design & Architecture', desc: 'I map out the user flow and database structure, ensuring we cover all use cases before coding.', clickable: true },
                  { step: '03', title: 'Build', desc: 'I develop the application, keeping you updated with workable demos along the way.' },
                  { step: '04', title: 'Deploy & Support', desc: 'We launch the system. I handle the hosting, maintenance, and ensure everything runs smoothly.' }
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={item.clickable ? () => setShowShowcase(true) : undefined}
                    className={`neu-flat p-6 rounded-2xl flex gap-6 items-start ${item.clickable ? 'cursor-pointer hover:border-primary/30 transition-all group' : ''}`}
                  >
                    <div className="text-2xl font-bold text-primary/40 font-mono pt-1">{item.step}</div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-semibold mb-2 transition-colors ${item.clickable ? 'text-white group-hover:text-primary' : 'text-white'}`}>{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                      {item.clickable && (
                        <div className="mt-4 text-xs font-medium text-primary bg-primary/10 inline-flex px-3 py-1.5 rounded-full border border-primary/20">
                          Click to see design styles ✨
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Yearly rental basis model. No massive upfront capital required to digitize your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Standard Tier */}
              <NeuCard className="relative overflow-hidden">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Standard Setup</h3>
                  <p className="text-muted-foreground">For custom websites and simple tools</p>
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                    Custom <span className="text-lg text-muted-foreground font-normal">/ year</span>
                  </div>
                  <p className="text-sm text-primary mt-2">Based on requirements</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Custom Website / Landing Page',
                    'Domain & Hosting Setup',
                    'Basic Contact Forms',
                    'Mobile Responsive Design',
                    'Standard Support'
                  ].map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <ShieldCheck size={18} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <NeuButton className="w-full" onClick={() => scrollTo('#contact')}>Inquire Now</NeuButton>
              </NeuCard>

              {/* Complex Systems Tier */}
              <NeuCard className="relative overflow-hidden border border-primary/20">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  POPULAR
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Business Systems</h3>
                  <p className="text-muted-foreground">For gas stations, vouchers & admin panels</p>
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                    Custom <span className="text-lg text-muted-foreground font-normal">/ year</span>
                  </div>
                  <p className="text-sm text-primary mt-2">No large one-time fees</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Custom Admin Dashboard',
                    'Database Integration (Supabase/Firebase)',
                    'User Authentication & Roles',
                    'Voucher & System Logic',
                    'Priority Support & Maintenance'
                  ].map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <Zap size={18} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <NeuButton primary className="w-full" onClick={() => scrollTo('#contact')}>Discuss System</NeuButton>
              </NeuCard>
            </div>

            <div className="mt-12 max-w-3xl mx-auto neu-inset p-6 rounded-2xl">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Terminal size={18} className="text-primary" /> Important Notes
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Prices operate on a yearly rental basis to cover hosting, domain renewals, and standard maintenance. 
                Third-party services like Twilio (for SMS) or premium database tiers are billed directly to you at cost. 
                <strong className="text-gray-300 font-medium ml-1">Source code delivery is available upon request (terms apply).</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Project Showcase / Code Demos */}
        <section id="work" className="py-24 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">System Architecture Demos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A glimpse into how I structure secure, scalable logic for business applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              
              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-primary/50">
                  <h3 className="text-xl font-semibold text-white mb-2">Voucher Generation</h3>
                  <p className="text-muted-foreground text-sm">Secure, collision-resistant voucher code generation tied to specific customer IDs and expiration dates.</p>
                </div>
                <NeuCodeBlock 
                  title="generateVoucher.ts"
                  code={`async function createVoucher(userId: string, value: number) {
  const code = crypto.randomBytes(4).toString('hex').toUpperCase();
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 3);

  const { data, error } = await supabase
    .from('vouchers')
    .insert({
      code: \`GAS-\${code}\`,
      user_id: userId,
      amount: value,
      status: 'ACTIVE',
      expires_at: expiresAt
    })
    .select();

  if (error) throw new Error('Voucher creation failed');
  
  await notifyUser(userId, data.code);
  return data;
}`}
                />
              </div>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-primary/50">
                  <h3 className="text-xl font-semibold text-white mb-2">Customer Tracking</h3>
                  <p className="text-muted-foreground text-sm">Real-time point accumulation and tier upgrades based on purchase history.</p>
                </div>
                <NeuCodeBlock 
                  title="rewardPoints.ts"
                  code={`export const processPurchase = async (
  customerId: string, 
  amountSpent: number
) => {
  // 1 point per $10 spent
  const pointsEarned = Math.floor(amountSpent / 10);
  
  const { data: customer } = await db
    .from('customers')
    .select('points, tier')
    .eq('id', customerId)
    .single();
    
  const newTotal = customer.points + pointsEarned;
  const newTier = calculateTier(newTotal); // Standard -> Gold -> Platinum
  
  await db.from('customers').update({ 
    points: newTotal,
    tier: newTier 
  }).eq('id', customerId);
  
  return { pointsEarned, newTier };
};`}
                />
              </div>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-primary/50">
                  <h3 className="text-xl font-semibold text-white mb-2">Dashboard Analytics</h3>
                  <p className="text-muted-foreground text-sm">Aggregating daily sales data for the admin overview, optimized for performance.</p>
                </div>
                <NeuCodeBlock 
                  title="useDashboardStats.ts"
                  code={`function useDashboardStats(stationId: string) {
  return useQuery({
    queryKey: ['stats', stationId],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Performant RPC call to Supabase
      const { data, error } = await supabase.rpc('get_daily_summary', {
        target_station: stationId,
        target_date: today
      });
      
      if (error) throw error;
      
      return {
        totalSales: data.sales_total,
        vouchersRedeemed: data.voucher_count,
        activePumps: data.active_pumps
      };
    },
    refetchInterval: 30000 // Real-time updates
  });
}`}
                />
              </div>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-primary/50">
                  <h3 className="text-xl font-semibold text-white mb-2">Responsive UI Architecture</h3>
                  <p className="text-muted-foreground text-sm">Mobile-first layout structure adapting from handheld to desktop admin monitors.</p>
                </div>
                <NeuCodeBlock 
                  title="AdminLayout.tsx"
                  code={`export function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile drawer / Desktop static sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        className="fixed md:static z-40 w-64 h-full neu-panel"
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}`}
                />
              </div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <NeuCard className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Build Your System</h2>
                <p className="text-muted-foreground">
                  Send me a message with a brief overview of what you need. <br className="hidden md:block" />
                  I typically respond within 24 hours.
                </p>
              </div>

              <form className="space-y-6 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2">Name</label>
                    <NeuInput placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2">Email</label>
                    <NeuInput type="email" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-2">Project Details</label>
                  <NeuInput textarea rows={5} placeholder="Tell me about your business and what kind of system you're looking for..." />
                </div>

                <div className="pt-4 flex justify-center">
                  <NeuButton primary type="submit" className="w-full md:w-auto md:min-w-[200px]">
                    Send Message
                  </NeuButton>
                </div>
              </form>
              
              <div className="mt-12 text-center text-sm text-muted-foreground">
                <p>Available on WhatsApp, Email, and Zoom for consultations.</p>
              </div>
            </NeuCard>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 mt-12 relative z-10">
        <p className="text-white font-medium mb-2">Gerald Jay Abiera</p>
        <p className="text-muted-foreground text-sm mb-4">Building exact, tailored solutions for specific needs.</p>
        <p className="text-muted-foreground text-xs opacity-50">&copy; {new Date().getFullYear()} Gerald Jay Abiera. All rights reserved.</p>
      </footer>
    </div>
  );
}
