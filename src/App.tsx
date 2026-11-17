import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileHeart,
  Heart,
  HeartPulse,
  House,
  Leaf,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Video,
} from "lucide-react";
import "./App.css";

const menu: {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
}[] = [
  { label: "Overview", icon: House, active: true },
  { label: "Appointments", icon: CalendarDays },
  { label: "Find a doctor", icon: Stethoscope },
  { label: "My health records", icon: FileHeart },
  { label: "Messages", icon: MessageCircle, badge: "2" },
];
const specialties: {
  name: string;
  caption: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    name: "General care",
    caption: "Your everyday health",
    icon: Stethoscope,
    color: "sage",
  },
  {
    name: "Cardiology",
    caption: "A little heart care",
    icon: HeartPulse,
    color: "rose",
  },
  {
    name: "Dental care",
    caption: "More reasons to smile",
    icon: Smile,
    color: "peach",
  },
  {
    name: "Mental wellness",
    caption: "Make space for you",
    icon: Leaf,
    color: "lavender",
  },
];
const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "General Practitioner",
    image: "dr-sarah.jpg",
    rating: "4.9",
    reviews: "128",
    available: "Available today",
    color: "sage",
    position: "50% 31%",
  },
  {
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    image: "dr-james.jpg",
    rating: "4.9",
    reviews: "96",
    available: "Available tomorrow",
    color: "peach",
    position: "50% 27%",
  },
  {
    name: "Dr. Emily Chen",
    specialty: "Dermatologist",
    image: "dr-emily.jpg",
    rating: "4.8",
    reviews: "112",
    available: "Available today",
    color: "lavender",
    position: "50% 30%",
  },
];

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Plus size={22} strokeWidth={3} />
      </span>
      lemoncare<span className="brand-dot">.</span>
    </div>
  );
}
function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <span className="text-link">
        {action}
        <ArrowUpRight size={16} />
      </span>
    </div>
  );
}
function Sidebar() {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="workspace-label">YOUR HEALTH SPACE</div>
      <nav aria-label="Main navigation">
        {menu.map(({ label, icon: Icon, active, badge }) => (
          <div
            key={label}
            className={`nav-item ${active ? "active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={1.7} />
            <span>{label}</span>
            {badge && <span className="nav-badge">{badge}</span>}
            {active && <span className="active-dot" />}
          </div>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <Heart size={25} strokeWidth={1.5} />
          <h3>
            A little help?
            <br />
            We’re here for you.
          </h3>
          <p>Care is a conversation away.</p>
          <span className="help-link">
            Talk to our care team <ArrowUpRight size={15} />
          </span>
        </div>
        <div className="sidebar-footer">
          <ShieldCheck size={15} />
          <span>Your health. In safe hands.</span>
        </div>
      </div>
    </aside>
  );
}
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <span className="eyebrow">
          <span /> A HEALTHIER YOU STARTS HERE
        </span>
        <h1 id="hero-heading">
          Big on care.
          <br />
          Better for <span>you.</span>
          <svg
            className="headline-underline"
            viewBox="0 0 150 12"
            aria-hidden="true"
          >
            <path d="M3 8 Q65 -2 146 5" />
          </svg>
        </h1>
        <p>
          Expert care, a familiar face, and a little peace
          <br className="desktop-break" /> of mind. Let’s put your health first.
        </p>
        <span className="primary-button">
          Find your care <ArrowUpRight size={19} />
        </span>
        <div className="hero-trust">
          <div className="avatar-stack">
            <img src="/images/dr-james.jpg" alt="" />
            <img src="/images/dr-emily.jpg" alt="" />
            <img src="/images/dr-sarah.jpg" alt="" />
          </div>
          <div>
            <span className="trust-stars">★★★★★</span>
            <p>
              <strong>2,000+</strong> happy, healthier people
            </p>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <Sparkles className="hero-spark" size={32} strokeWidth={1.3} />
        <div className="hero-photo">
          <img
            src="/images/dr-sarah.jpg"
            alt="A friendly doctor ready to welcome you"
          />
        </div>
        <div className="doctor-tag">
          <span className="tag-check">
            <Check size={17} strokeWidth={2.7} />
          </span>
          <div>
            <strong>Good care. Great people.</strong>
            <span>Experts who listen, always.</span>
          </div>
        </div>
        <div className="floating-heart">
          <HeartPulse size={26} strokeWidth={1.5} />
        </div>
        <span className="hero-small-cross">+</span>
      </div>
    </section>
  );
}
function Appointment() {
  return (
    <section className="appointment-panel">
      <div className="panel-heading">
        <h2>Your next visit</h2>
        <MoreHorizontal size={22} />
      </div>
      <div className="appointment-date">
        <div className="date-tile">
          <span>NOV</span>
          <strong>19</strong>
        </div>
        <div>
          <span className="appointment-type">General consultation</span>
          <p>Thursday, 10:00 – 10:30 AM</p>
        </div>
      </div>
      <div className="appointment-doctor">
        <img src="/images/dr-sarah.jpg" alt="Dr. Sarah Mitchell" />
        <div>
          <h3>Dr. Sarah Mitchell</h3>
          <p>General Practitioner</p>
        </div>
        <span className="verified-badge">
          <Check size={11} strokeWidth={3} />
        </span>
      </div>
      <div className="appointment-location">
        <MapPin size={16} />
        <span>Lemoncare Medical Center</span>
      </div>
      <div className="appointment-status">
        <span /> Confirmed <span className="status-divider">·</span>
        <span className="status-detail">In-person visit</span>
      </div>
      <div className="appointment-actions">
        <span className="appointment-details">
          View appointment <ArrowUpRight size={16} />
        </span>
        <span className="calendar-button">
          <CalendarDays size={18} />
        </span>
      </div>
    </section>
  );
}
function HealthSnapshot() {
  return (
    <section className="health-panel">
      <div className="panel-heading">
        <h2>A little health check</h2>
        <span className="tiny-icon">
          <Activity size={17} />
        </span>
      </div>
      <p className="panel-subtitle">Small steps, a healthier everyday.</p>
      <div className="health-metrics">
        <div className="health-metric">
          <span className="metric-label">
            <Heart size={14} /> Heart rate
          </span>
          <div>
            <strong>72</strong>
            <span>bpm</span>
            <svg viewBox="0 0 90 28" aria-hidden="true">
              <path d="M0 18 H17 L23 12 L29 22 L37 3 L45 25 L51 14 L57 18 H90" />
            </svg>
          </div>
          <small>
            <span /> In a healthy range
          </small>
        </div>
        <div className="health-metric steps">
          <span className="metric-label">
            <Activity size={14} /> Daily steps
          </span>
          <div>
            <strong>6,240</strong>
            <span>/ 8,000</span>
          </div>
          <div className="progress-track">
            <span />
          </div>
          <small>
            78% of your daily goal <Sparkles size={11} />
          </small>
        </div>
      </div>
      <div className="health-updated">
        <Clock3 size={12} /> Last updated today, 9:15 AM
      </div>
    </section>
  );
}
function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-shell">
        <header className="topbar">
          <div className="mobile-brand">
            <Brand />
          </div>
          <div className="breadcrumb">
            Your health, a little brighter <Sun size={17} />
          </div>
          <div className="header-actions">
            <div className="header-location">
              <MapPin size={16} />
              <span>San Francisco, CA</span>
              <ChevronDown size={13} />
            </div>
            <span className="header-divider" />
            <span className="notification-button">
              <Bell size={20} />
              <i />
            </span>
            <div className="profile-avatar">JL</div>
            <div className="header-profile">
              <strong>Jamie Lee</strong>
              <span>Personal account</span>
            </div>
            <ChevronDown className="profile-chevron" size={14} />
          </div>
        </header>
        <main>
          <div className="welcome-row">
            <div>
              <span className="greeting">MONDAY, NOVEMBER 16</span>
              <h2>
                Good morning, Jamie <span className="wave">✺</span>
              </h2>
              <p>A little care goes a long way. How are you feeling today?</p>
            </div>
            <div className="search-box">
              <Search size={18} />
              <span>Search doctors, specialties...</span>
              <kbd>⌘ K</kbd>
            </div>
          </div>
          <div className="dashboard-grid">
            <div className="primary-column">
              <Hero />
              <section className="specialties-section">
                <SectionHeading
                  title="What brings you in?"
                  action="All specialties"
                />
                <div className="specialties-grid">
                  {specialties.map(({ name, caption, icon: Icon, color }) => (
                    <div className="specialty-card" key={name}>
                      <span className={`specialty-icon ${color}`}>
                        <Icon size={27} strokeWidth={1.45} />
                      </span>
                      <h3>{name}</h3>
                      <p>{caption}</p>
                      <ArrowUpRight className="specialty-arrow" size={16} />
                    </div>
                  ))}
                </div>
              </section>
              <section className="doctors-section">
                <SectionHeading
                  title="Good people. Great care."
                  subtitle="Meet the experts who put you first."
                  action="Meet all doctors"
                />
                <div className="doctors-grid">
                  {doctors.map((doctor) => (
                    <article className="doctor-card" key={doctor.name}>
                      <div className={`doctor-image ${doctor.color}`}>
                        <img
                          src={`/images/${doctor.image}`}
                          alt={doctor.name}
                          style={{ objectPosition: doctor.position }}
                        />
                        <span className="doctor-favorite">
                          <Heart size={16} strokeWidth={1.6} />
                        </span>
                        <span className="doctor-availability">
                          <i />
                          {doctor.available}
                        </span>
                      </div>
                      <div className="doctor-info">
                        <div className="doctor-name">
                          <h3>{doctor.name}</h3>
                          <span className="verified-badge">
                            <Check size={9} strokeWidth={3} />
                          </span>
                        </div>
                        <p>{doctor.specialty}</p>
                        <div className="doctor-card-bottom">
                          <span className="doctor-rating">
                            <Star size={13} fill="currentColor" />{" "}
                            <strong>{doctor.rating}</strong>
                            <span>({doctor.reviews} reviews)</span>
                          </span>
                          <span className="doctor-arrow">
                            <ArrowUpRight size={17} />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <div className="care-note">
                <ShieldCheck size={15} />
                <span>
                  Thoughtful care. Trusted experts. Always here for you.
                </span>
                <span className="care-note-right">
                  A healthier you, together.
                  <Leaf size={13} />
                </span>
              </div>
            </div>
            <aside className="secondary-column">
              <Appointment />
              <HealthSnapshot />
              <section className="wellness-card">
                <div className="wellness-top">
                  <span className="eyebrow">A MOMENT FOR YOU</span>
                  <span className="wellness-flower">✳</span>
                </div>
                <h2>
                  Your mind deserves
                  <br />a little care, too.
                </h2>
                <p>
                  Take a breath. Find your balance.
                  <br />
                  We’re here to help you feel like you.
                </p>
                <span className="wellness-link">
                  Explore mental wellness <ArrowUpRight size={17} />
                </span>
                <div className="wellness-art" aria-hidden="true">
                  <div className="leaf leaf-one" />
                  <div className="leaf leaf-two" />
                  <div className="leaf leaf-three" />
                  <div className="leaf-stem" />
                </div>
              </section>
              <div className="quick-help">
                <span className="quick-help-icon">
                  <Video size={19} />
                </span>
                <div>
                  <h3>Care, wherever you are.</h3>
                  <p>Connect with a doctor online</p>
                </div>
                <ArrowUpRight size={18} />
              </div>
              <div className="right-footer">
                <span>Privacy</span>
                <span>Terms</span>
                <span>
                  Help center <ArrowUpRight size={10} />
                </span>
                <p>© 2026 Lemoncare. Made with care.</p>
              </div>
            </aside>
          </div>
        </main>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <span className="selected">
            <House size={21} />
            Home
          </span>
          <span>
            <CalendarDays size={21} />
            Visits
          </span>
          <span>
            <Stethoscope size={21} />
            Doctors
          </span>
          <span>
            <FileHeart size={21} />
            My health
          </span>
          <span>
            <MessageCircle size={21} />
            Messages
          </span>
        </nav>
      </div>
    </div>
  );
}
export default App;
