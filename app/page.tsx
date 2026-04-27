import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import WhyDrJoffin from '@/components/WhyDrJoffin';
import Services from '@/components/Services';
import PatientDiaries from '@/components/PatientDiaries';
import AboutDoctor from '@/components/AboutDoctor';
import BookingPortal from '@/components/BookingPortal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <WhyDrJoffin />
      <Services />
      <PatientDiaries />
      <AboutDoctor />
      <BookingPortal />
      <Footer />
    </main>
  );
}
