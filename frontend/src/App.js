import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Services from './components/Services';
import WhyTixo from './components/WhyTixo';
import Approach from './components/Approach';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }} data-testid="app-root">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Ticker />
        <Services />
        <WhyTixo />
        <Approach />
        <CaseStudies />
        <Process />
        <FAQ />
        <Contact />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
