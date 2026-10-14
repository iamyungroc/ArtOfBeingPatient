import { useState, useEffect, useRef } from 'react';

function BreathingCircle() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const durations = { inhale: 4, hold: 4, exhale: 4, rest: 4 };
    const timer = setTimeout(() => {
      const phases: Array<'inhale' | 'hold' | 'exhale' | 'rest'> = ['inhale', 'hold', 'exhale', 'rest'];
      const currentIndex = phases.indexOf(phase);
      setPhase(phases[(currentIndex + 1) % 4]);
      setSeconds(0);
    }, durations[phase] * 1000);
    return () => clearTimeout(timer);
  }, [phase, isActive]);

  const getScale = () => {
    if (!isActive) return 'scale-75';
    switch (phase) {
      case 'inhale': return 'scale-100';
      case 'hold': return 'scale-100';
      case 'exhale': return 'scale-75';
      case 'rest': return 'scale-75';
    }
  };

  const getLabel = () => {
    if (!isActive) return 'Click to begin';
    switch (phase) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe out...';
      case 'rest': return 'Rest...';
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        onClick={() => {
          setIsActive(!isActive);
          if (!isActive) setPhase('inhale');
        }}
        className={`w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-[4000ms] ease-in-out ${getScale()} bg-gradient-to-br from-teal-200 via-emerald-300 to-cyan-200 shadow-2xl shadow-teal-200/50 hover:shadow-teal-300/60`}
      >
        <div className="w-36 h-36 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-teal-800 font-light text-sm text-center px-4">{getLabel()}</span>
        </div>
      </div>
      <p className="text-stone-500 text-sm">
        {isActive ? '4-4-4-4 Box Breathing Technique' : 'A simple breathing exercise to center yourself'}
      </p>
    </div>
  );
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quotes = [
    { text: "Patience is not the ability to wait, but the ability to keep a good attitude while waiting.", author: "Joyce Meyer" },
    { text: "The two most powerful warriors are patience and time.", author: "Leo Tolstoy" },
    { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
    { text: "Patience is bitter, but its fruit is sweet.", author: "Aristotle" },
    { text: "He that can have patience can have what he will.", author: "Benjamin Franklin" },
    { text: "Rivers know this: there is no hurry. We shall get there some day.", author: "A.A. Milne" },
  ];

  const practices = [
    {
      icon: '🌱',
      title: 'Start Small',
      description: 'Begin with short moments of intentional waiting. Stand in a longer line. Let someone go ahead of you. These micro-moments build your patience muscle.',
    },
    {
      icon: '🌊',
      title: 'Embrace the Present',
      description: 'When waiting feels unbearable, anchor yourself in the present moment. Notice your breath, the sounds around you, the feeling of your feet on the ground.',
    },
    {
      icon: '🍃',
      title: 'Reframe the Wait',
      description: 'Instead of seeing waiting as wasted time, view it as a gift — unexpected moments of stillness in a world that rarely pauses.',
    },
    {
      icon: '🌙',
      title: 'Practice Self-Compassion',
      description: 'Be patient with yourself as you learn patience. Growth is not linear. Some days will be harder than others, and that is perfectly okay.',
    },
    {
      icon: '☀️',
      title: 'Trust the Process',
      description: 'Like a seed that cannot be rushed into bloom, some things in life need time. Trust that what is meant for you will unfold in its own season.',
    },
    {
      icon: '🕊️',
      title: 'Let Go of Control',
      description: 'Much of our impatience comes from wanting to control outcomes. Practice releasing what you cannot change and focusing on what you can.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-stone-50 to-amber-50/30" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-100 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <span className="text-6xl md:text-8xl">🌿</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-stone-700 mb-6 tracking-tight">
            The Art of<br />
            <span className="italic text-emerald-700">Being Patient</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
            In a world that celebrates speed, patience is a quiet revolution.
            It is the gentle art of trusting time, embracing stillness,
            and finding peace in the space between wanting and having.
          </p>
          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-sans">Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-light mt-4 text-stone-700">
                Why Patience Matters
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-6">
                <p className="text-lg text-stone-600 leading-relaxed">
                  Patience is often misunderstood as passive waiting. In truth, it is an active practice —
                  a conscious choice to remain present and open-hearted even when circumstances don't align
                  with our desires.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  The ancient wisdom traditions all speak of patience as a virtue. The Stoics saw it as
                  essential to resilience. Buddhists consider it one of the six perfections. Christians
                  list it among the fruits of the Spirit.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-stone-600 leading-relaxed">
                  In our modern age of instant gratification, patience has become almost countercultural.
                  We want answers now, results immediately, success without struggle. But the most
                  meaningful things in life — love, wisdom, mastery, growth — cannot be rushed.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Like a river that carves canyons not through force but through persistence,
                  patience transforms us gradually, steadily, and profoundly.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quotes Carousel */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-stone-50 to-emerald-50/30">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-sans">Wisdom</span>
              <h2 className="text-3xl md:text-5xl font-light mt-4 text-stone-700">
                Words to Carry With You
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <ScrollReveal key={index}>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-500 border border-stone-100">
                  <div className="text-4xl text-emerald-200 mb-4">"</div>
                  <p className="text-stone-600 italic leading-relaxed mb-4">{quote.text}</p>
                  <p className="text-sm text-stone-400 font-sans">— {quote.author}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Exercise */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-emerald-50/30 to-stone-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-sans">Practice</span>
              <h2 className="text-3xl md:text-5xl font-light mt-4 text-stone-700">
                A Moment of Stillness
              </h2>
              <p className="text-stone-500 mt-4 max-w-lg mx-auto">
                Take a moment to breathe. Patience begins with the simple act of being present with your breath.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex justify-center">
              <BreathingCircle />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Practices Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-sans">Cultivation</span>
              <h2 className="text-3xl md:text-5xl font-light mt-4 text-stone-700">
                Practices for a Patient Life
              </h2>
              <p className="text-stone-500 mt-4 max-w-2xl mx-auto">
                Patience is not something you either have or don't have. It is a skill that can be nurtured,
                practiced, and deepened over time.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((practice, index) => (
              <ScrollReveal key={index}>
                <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-stone-100 hover:border-emerald-100 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{practice.icon}</div>
                  <h3 className="text-xl font-medium text-stone-700 mb-3">{practice.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{practice.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reflection Section */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-stone-50 to-amber-50/20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="mb-8">
              <span className="text-6xl">🌸</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-stone-700 mb-8">
              A Final Reflection
            </h2>
            <blockquote className="text-xl md:text-2xl text-stone-600 italic leading-relaxed mb-8">
              "The art of being patient is really the art of being at peace —
              with yourself, with others, with the timing of your life.
              It is understanding that you are exactly where you need to be,
              growing in ways you may not yet see."
            </blockquote>
            <div className="w-16 h-px bg-emerald-300 mx-auto mb-8" />
            <p className="text-stone-500 leading-relaxed">
              Remember: every moment of patience is a moment of strength.
              Every breath taken in stillness is a victory over the chaos of haste.
              You are learning an art that takes a lifetime to master,
              and that is perfectly alright.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-stone-800 text-stone-300">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-3xl mb-4">🌿</div>
          <p className="font-light text-lg mb-2">The Art of Being Patient</p>
          <p className="text-stone-500 text-sm">
            A reminder that the most beautiful things in life unfold in their own time.
          </p>
          <div className="mt-8 pt-8 border-t border-stone-700">
            <p className="text-stone-500 text-xs mb-4">
              Made with patience and care
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-stone-400 text-sm">Created By</span>
              <span className="text-white font-semibold text-lg tracking-wide">RocAudio</span>
              <span className="text-emerald-400 text-xs font-bold align-super">™</span>
            </div>
            <p className="text-stone-500 text-xs mt-2 tracking-wider uppercase">Tech Company</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
