import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary pt-6 pb-4">
      <div className="container mx-auto px-20 max-w-screen-xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-high2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl"><img className="text-sm font-extrabold h-8" src="/images/logo.png"></img></span>CloudDrop
          </h2>
          <p className="mt-2 text-sm">
            Call now: <a href="tel:+919591776078" className="text-high1">+91 9999999999</a>
          </p>
          <p className="mt-1 text-sm">
            JIIT-Noida Jaypee Greens Campus Sector 128 Noida
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-high1">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm text-high2">
            <li><Link href="/about" className="hover:text-high1/50">About</Link></li>
            <li><Link href="/contact" className="hover:text-high1/50">Contact</Link></li>
            <li><Link href="/admin" className="hover:text-high1/50">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-high1">Candidate</h3>
          <ul className="mt-2 space-y-1 text-sm text-high2">
            <li><Link href="/jobs" className="hover:text-high1/50">Browse Jobs</Link></li>
            <li><Link href="/employers" className="hover:text-high1/50">Browse Employers</Link></li>
            <li><Link href="/dashboard" className="hover:text-high1/50">Candidate Dashboard</Link></li>
            <li><Link href="/saved-jobs" className="hover:text-high1/50">Saved Jobs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-high1">Employers</h3>
          <ul className="mt-2 space-y-1 text-sm text-high2">
            <li><Link href="/post-job" className="hover:text-high1/50">Post a Job</Link></li>
            <li><Link href="/browse-candidates" className="hover:text-high1/50">Browse Candidates</Link></li>
            <li><Link href="/employer-dashboard" className="hover:text-high1/50">Employers Dashboard</Link></li>
            <li><Link href="/applications" className="hover:text-high1/50">Applications</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary/80 container mx-auto max-w-screen-xl px-4 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-high2">
        <p>&copy; 2025 ResuRabbit - Job Portal. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-high1">
          <Link href="#" className="hover:text-high1/50"><FaFacebookF /></Link>
          <Link href="#" className="hover:text-high1/50"><FaYoutube /></Link>
          <Link href="#" className="hover:text-high1/50"><FaInstagram /></Link>
          <Link href="#" className="hover:text-high1/50"><FaTwitter /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
