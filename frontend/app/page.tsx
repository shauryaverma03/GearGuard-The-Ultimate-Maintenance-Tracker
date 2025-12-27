'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Crown, ShieldCheck, Zap, ArrowRight, CheckCircle2, Calendar, Users, Settings, Wrench, AlertCircle, Clock } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.section-reveal')
    sections.forEach((section) => {
      const texts = section.querySelectorAll('.reveal-text')
      const visual = section.querySelector('.reveal-visual')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      if (texts.length > 0) {
        tl.fromTo(texts,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
        )
      }

      if (visual) {
        tl.fromTo(visual,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
          0.2
        )
      }
    })
  }, { scope: containerRef })

  return (
    <main ref={containerRef} className="relative w-full overflow-hidden bg-background transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="section-reveal min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-6 md:px-24 pt-32 pb-20 gap-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='currentColor' class='text-primary' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />

        {/* Hero Content */}
        <div className="flex-1 text-center lg:text-left z-10 relative max-w-2xl">
          <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Premium Enterprise Solution</span>
          </div>

          <h1 className="reveal-text text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
            Unified Equipment, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-600">Request & Team Management.</span>
          </h1>

          <p className="reveal-text text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-light">
            GearGuard brings royal elegance to equipment tracking. One live dashboard to rule them all.
          </p>

          <ul className="reveal-text space-y-3 mb-10 text-muted-foreground text-left max-w-md mx-auto lg:mx-0">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Track every asset lifecycle</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Automate maintenance workflows</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Visual Kanban & Calendar views</li>
          </ul>

          <div className="reveal-text flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link href="/register">
              <button className="bg-primary text-primary-foreground h-14 px-8 rounded-xl font-bold hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 group text-lg transform hover:-translate-y-1">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="h-14 px-8 rounded-xl font-bold text-foreground border border-border hover:bg-muted/50 transition-colors text-lg backdrop-blur-md">
              View Interactive Demo
            </button>
          </div>
        </div>

        {/* Hero Visuals (Mockups) */}
        <div className="flex-1 w-full max-w-[600px] reveal-visual relative perspective-1000">
          <div className="relative z-10 grid gap-6 transition-transform duration-500 hover:rotate-y-2 hover:rotate-x-2">

            {/* Kanban Card Mockup */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-sm transform translate-y-4 lg:-translate-x-12 relative z-20">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <span className="font-bold text-foreground">Maintenance Board</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 h-48">
                <div className="bg-muted/50 rounded-lg p-2 flex flex-col gap-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase">New Requests</div>
                  <div className="bg-background p-3 rounded shadow-sm border border-border/50 text-sm">
                    <div className="font-semibold text-primary mb-1">Leakage in Pump X2</div>
                    <div className="text-xs text-muted-foreground">Hydraulic Unit</div>
                  </div>
                  <div className="bg-background p-3 rounded shadow-sm border border-border/50 text-sm">
                    <div className="font-semibold text-primary mb-1">Screen Flickering</div>
                    <div className="text-xs text-muted-foreground">Control Panel</div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 flex flex-col gap-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase">In Progress</div>
                  <div className="bg-background p-3 rounded shadow-sm border-l-4 border-l-amber-500 border-y border-r border-border/50 text-sm">
                    <div className="font-semibold text-primary mb-1">Motor Overheating</div>
                    <div className="text-xs text-muted-foreground">Conveyor Belt 04</div>
                    <div className="flex -space-x-1 mt-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-white"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 flex flex-col gap-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase">Repaired</div>
                  <div className="bg-background p-3 rounded shadow-sm border-l-4 border-l-green-500 border-y border-r border-border/50 text-sm opacity-70">
                    <div className="font-semibold text-foreground mb-1">Filter Replacement</div>
                    <div className="text-xs text-muted-foreground">HVAC System</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Mockup */}
            <div className="absolute -top-12 -right-4 lg:-right-16 w-64 bg-card border border-border rounded-2xl p-4 shadow-xl z-10 hidden sm:block">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm">October 2025</span>
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-muted-foreground">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                <div className="p-1">1</div><div className="p-1">2</div><div className="p-1">3</div><div className="p-1">4</div><div className="p-1">5</div><div className="p-1">6</div><div className="p-1">7</div>
                <div className="p-1">8</div><div className="p-1">9</div><div className="p-1 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/30">10</div><div className="p-1">11</div><div className="p-1">12</div><div className="p-1">13</div><div className="p-1">14</div>
              </div>
              <div className="mt-3 text-xs border-t border-border pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Preventive Check: Boiler</span>
                </div>
              </div>
            </div>

          </div>

          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10" />
        </div>
      </section>

      {/* Core Features Cards */}
      <section id="features" className="section-reveal py-24 px-6 md:px-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-sm font-bold text-primary uppercase tracking-widest mb-2">Platform Capabilities</h2>
            <h3 className="reveal-text text-4xl md:text-5xl font-serif font-bold text-foreground">The Complete Toolkit</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Asset Intelligence", icon: <Settings />, desc: "Complete equipment database with ownership, warranty, and tech specs.", items: ["Serial Tracking", "Location Mapping", "Warranty Alerts"] },
              { title: "Maintenance Requests", icon: <AlertCircle />, desc: "Handle unplanned breakdowns and routine checkups effortlessly.", items: ["Corrective Flow", "Preventive Flow", "Duration Logging"] },
              { title: "Team Workflows", icon: <Users />, desc: "Dedicated teams for Mechanics, Electricians or IT Support.", items: ["Role Assignment", "Technician Linking", "Team Routing"] },
              { title: "Smart Automation", icon: <Zap />, desc: "Auto-fill logic and smart buttons to speed up operations.", items: ["Auto-fetch Data", "Smart Buttons", "Scrap Logic"] }
            ].map((card, idx) => (
              <div key={idx} className="reveal-text group bg-card border border-border/50 hover:border-primary/50 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{card.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-12">{card.desc}</p>
                <ul className="space-y-2">
                  {card.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How GearGuard Works */}
      <section id="how-it-works" className="section-reveal py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-4xl font-serif font-bold text-foreground">How GearGuard Works</h2>
            <p className="reveal-text text-muted-foreground mt-4">Seamless execution from request to resolution.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            {/* Flow 1 */}
            <div className="reveal-visual flex-1 bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Wrench className="w-96 h-96" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-extrabold uppercase">Flow 1</span>
                The Breakdown
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div className="w-0.5 h-full bg-border my-1"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Request Created</h4>
                    <p className="text-sm text-muted-foreground">User reports "Leaking Oil" on Printer 01.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-primary text-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <div className="w-0.5 h-full bg-border my-1"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Auto-Fill & Assignment</h4>
                    <p className="text-sm text-muted-foreground">System auto-assigns "Mechanics" team. Tech picks it up.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Execution & Repair</h4>
                    <p className="text-sm text-muted-foreground">Tech logs hours. Status moved to "Repaired".</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow 2 */}
            <div className="reveal-visual flex-1 bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calendar className="w-96 h-96" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-extrabold uppercase">Flow 2</span>
                Routine Checkup
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div className="w-0.5 h-full bg-border my-1"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Schedule Maintenance</h4>
                    <p className="text-sm text-muted-foreground">Manager sets "Preventive" type for Next Monday.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-primary text-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <div className="w-0.5 h-full bg-border my-1"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Calendar Visibility</h4>
                    <p className="text-sm text-muted-foreground">Job appears on Calendar View for technicians.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Pre-emptive Fix</h4>
                    <p className="text-sm text-muted-foreground">Work executed before breakdown occurs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
