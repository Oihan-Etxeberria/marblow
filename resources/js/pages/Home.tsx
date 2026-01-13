import Hero from '@/components/Hero';
import Highlights from '@/components/HighlightsSection';
import AdBanner from '@/components/AdBanner';

const Home = () => {
  return (
    <>
      <Hero 
        title="International Marble Blowing Competition"
        subtitle="Experience the pinnacle of precision and skill! The most prestigious and exciting marble-blowing event in the world, uniting the globe's finest blowers."
        primaryButton={{
            label: "Register Now",
            href: "#register",
            variant: "primary"
        }}
        secondaryButton={{
            label: "View Rulebook",
            href: "#rules",
            variant: "outline-light"
        }}
      />
      <Highlights />
      <AdBanner position="bottom" closeable={true} />
    </>
  );
};

export default Home;