import HeroSection from "~/components/Homepage/HeroSection";
import FeaturesSection from "~/components/Homepage/FeaturesSection";
import CTASection from "~/components/Homepage/CTASection";

const Homepage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection/>
            <FeaturesSection/>
            <CTASection/>
        </div>
    );
};

export default Homepage;