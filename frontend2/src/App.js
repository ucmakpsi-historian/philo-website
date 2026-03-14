// Paws for a Cause 2026 — Disco Dawgs — Alpha Kappa Psi
// Updated by Steven Navas & Ami Ogbonna

import React, { useState, useEffect } from "react";
import "./App.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav-container">
        <h1 className="title">Paws for a Cause 2026</h1>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#pup-points"  className="nav-item">Points</a></li>
          <li><a href="#philanthropy" className="nav-item">Philanthropy</a></li>
          <li><a href="#calendar"    className="nav-item">Calendar</a></li>
          <li><a href="#top-dawgs"   className="nav-item">Candidates</a></li>
          <li><a href="#gallery"     className="nav-item">Gallery</a></li>
          <li><a href="#history"     className="nav-item">History</a></li>
        </ul>
      </nav>
    </header>
  );
};

// ── Points reset to 0 for new philo week ──────────────────────────────────────
const organizations = [
  { rank: 1,  name: "Pi Kappa Phi",          score: 0, category: "Socials",       instagram: "https://instagram.com/ucmpikapp" },
  { rank: 2,  name: "Kappa Sigma",            score: 0, category: "Socials",       instagram: "https://instagram.com/kappasigmaucm" },
  { rank: 3,  name: "Phi Mu",                 score: 0, category: "Sororities",    instagram: "https://instagram.com/ucmercedphimu" },
  { rank: 4,  name: "Delta Gamma",            score: 0, category: "Sororities",    instagram: "https://instagram.com/ucmdeltagamma" },
  { rank: 5,  name: "Delta Delta Delta",      score: 0, category: "Sororities",    instagram: "https://instagram.com/ucmtridelta" },
  { rank: 6,  name: "Business Society",       score: 0, category: "Organizations", instagram: "https://instagram.com/ucm_businessociety" },
  { rank: 7,  name: "Theta Tau",              score: 0, category: "Professionals", instagram: "https://instagram.com/mdthetatau" },
  { rank: 8,  name: "Delta Sigma Pi",         score: 0, category: "Professionals", instagram: "https://instagram.com/ucmdeltasigmapi" },
  { rank: 9,  name: "Sigma Chi",              score: 0, category: "Socials",       instagram: "https://instagram.com/ucmsigmachi" },
  { rank: 10, name: "Delta Epsilon Mu",       score: 0, category: "Professionals", instagram: "https://instagram.com/dem_theta" },
  { rank: 11, name: "Kappa Kappa Gamma",      score: 0, category: "Professionals", instagram: "https://instagram.com/kappaucm" },
];

const PupPoints = () => {
  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleFilterChange = (category) => {
    setFilter(category);
    setIsDropdownOpen(false);
  };

  const filteredOrgs =
    filter === "All" ? organizations : organizations.filter(org => org.category === filter);

  const categories = ['All', 'Socials', 'Sororities', 'Professionals'];

  return (
    <section id="pup-points" className="pup-points">
      <h2 className="leaderboard-title">Pup Points</h2>
      <div className="filters">
        {isMobile ? (
          <div className="filter-dropdown">
            <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {filter} <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {categories.map(category => (
                  <div
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={filter === category ? "dropdown-item active" : "dropdown-item"}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={filter === category ? "active" : ""}
            >
              {category}
            </button>
          ))
        )}
      </div>

      <table className="leaderboard">
        <thead>
          <tr>
            <th><strong>Rank</strong></th>
            <th><strong>Organization Name</strong></th>
            <th><strong>Score</strong></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrgs.map(org => (
            <tr key={org.rank}>
              <td><strong>{org.rank}</strong></td>
              <td>
                <a href={org.instagram} target="_blank" rel="noopener noreferrer" className="org-link">
                  <strong>{org.name}</strong>
                </a>
              </td>
              <td><strong>{org.score.toLocaleString()}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const Philanthropy = () => {
  const [flippedBox, setFlippedBox] = useState(null);

  const handleBoxClick = (boxIndex) => {
    if (flippedBox !== boxIndex) setFlippedBox(boxIndex);
  };

  const handleBackClick = (e) => {
    if (e.target.tagName !== "BUTTON") setFlippedBox(null);
  };

  return (
    <section id="philanthropy" className="philanthropy">
      <h2 className="philanthropy-title">Philanthropy</h2>
      <div className="philanthropy-boxes">

        {/* Box 1 — New Beginnings */}
        <div
          className={`philanthropy-box ${flippedBox === 1 ? "flipped" : ""}`}
          onClick={() => handleBoxClick(1)}
        >
          <div className="front">
            <div className="icon">🐾</div>
            <h3>New Beginnings for Merced County Animals</h3>
            <p>Finding homes for animals in need from the Merced County Shelter.</p>
          </div>
          <div className="back" onClick={handleBackClick}>
            <img src="https://i.imgur.com/cQiQ8Fm.png" alt="New Beginnings" />
            <a href="https://www.newbeginningsforanimalsmerced.org" target="_blank" rel="noopener noreferrer">
              <button className="learn-more">Learn More</button>
            </a>
          </div>
        </div>

        {/* Box 2 — T-Shirts */}
        <div
          className={`philanthropy-box ${flippedBox === 2 ? "flipped" : ""}`}
          onClick={() => handleBoxClick(2)}
        >
          <div className="front">
            <div className="icon">👕</div>
            <h3>Disco Dawgs T-Shirts</h3>
            <p>Get our exclusive Paws for a Cause 2026 shirts and support the cause!</p>
          </div>
          <div className="back" onClick={handleBackClick}>
            <img src="https://i.imgur.com/F0SC79C.png" alt="Disco Dawgs T-Shirts" />
            <a href="https://order.utees.com/bird_banks/120253/signups/new" target="_blank" rel="noopener noreferrer">
              <button className="learn-more">Buy Now</button>
            </a>
          </div>
        </div>

        {/* Box 3 — Philanthropy Chair Joe Corona */}
        <div
          className={`philanthropy-box ${flippedBox === 3 ? "flipped" : ""}`}
          onClick={() => handleBoxClick(3)}
        >
          <div className="front">
            <div className="icon">🪩</div>
            <h3>Meet Our Philanthropy Chair</h3>
            <p>Joe Corona leads Paws for a Cause 2026 and all service events for Alpha Kappa Psi!</p>
          </div>
          <div className="back" onClick={handleBackClick}>
            <img src="https://i.imgur.com/LexCzA2.png" alt="Joe Corona" />
            <a href="mailto:ucmakpsiphilo@gmail.com">
              <button className="learn-more">Contact Joe</button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

// ── Calendar updated to March 16–20 with events from slides ──────────────────
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const events = {
    "3/16": [
      { title: "🎙️ Toy Talks", description: "Scholar's Lane | 10AM–2PM. Come talk to Brothers to earn points! 5,000 pts per talk. Pup Pops available: $3 for 1, $5 for 2 ($1 = 1,000 pts). Key chains for purchase for extra points!" },
      { title: "🧸 Toy Making", description: "COB 105 | 7PM–8:30PM. Teams make toys out of shirts for dogs in need! 1 toy = +2,000 pts. Bring your own shirt or buy one for $4 (= +4,000 pts)." },
      { title: "⚔️ Start of Coin Wars!", description: "Teams collect coins in their provided jars all week. Pennies +15, Nickels +75, Dimes +150, Quarters +375, Dollar Coins +1,500. Dollars -1,000. Best Painted Jar = +5,000!" },
      { title: "🐕 Spot-a-Dog Starts!", description: "Spot a dog on campus and submit a photo for points!" },
    ],
    "3/17": [
      { title: "🥧 Pie-a-Psi", description: "Scholar's Lane | 10AM–2PM. $5 for one, two for $9. One pie = 5,000 pts. Pie the AKPSI Pres or Philo Chair for $15 = +20,000 pts (limited supply!)." },
      { title: "🎬 Dawg Flicks Day 1", description: "Send a picture of you and your pet for 500 points!" },
      { title: "🧋 Em-Tea Fundraiser", description: "11AM–11PM. Use the fundraising code — $1 = +1,000 pts." },
      { title: "🐾 Top Dawg Duggy", description: "Location TBD | 8PM–9PM. Top Dawg candidates invited to chapter for exclusive activities worth points!" },
    ],
    "3/18": [
      { title: "🎙️ Toy Talks", description: "Scholar's Lane | 10AM–2PM. Talk to Brothers and earn 5,000 pts per talk. Coin Wars continues!" },
      { title: "📞 Call-A-Thon", description: "Officially accepting donations! Call friends & family to fundraise. $1 = +1,000 pts. $50 and over = bonus +10,000 pts!" },
      { title: "💋 Smooch-A-Pooch", description: "Pavillion Lawn | 3PM–5PM. Take pictures with puppies from New Beginnings or your own pet! $2 for 1 picture = +2,150 pts." },
      { title: "🐕 Spot-a-Dog Ends!", description: "Last day to submit your Spot-a-Dog photos for points!" },
    ],
    "3/19": [
      { title: "🕺 Disco Dawgs Dance", description: "COB1 105 | 7PM–10PM. Brothers host dance night with talent show and music! Mocktails for purchase: $1 = +1,000 pts." },
      { title: "🎴 Bingo Cards", description: "Brothers will be posting bingo cards with dares of different prices. $1 = +1,000 pts." },
      { title: "🧋 Em-Tea Fundraiser", description: "11AM–11PM. Use the fundraising code — $1 = +1,000 pts." },
    ],
    "3/20": [
      { title: "🏐 Dawg Ball", description: "Elmer Murchie Park | 5PM–7PM. Dodgeball with water balloons! 1st +500,000 pts | 2nd +250,000 pts | 3rd +100,000 pts." },
      { title: "🥤 Aguas Frescas", description: "Available at Dawg Ball. $1 = +1,500 pts." },
    ],
  };

  return (
    <section id="calendar" className="calendar">
      <h2 className="calendar-title">Calendar</h2>
      <div className="train-track">
        {["3/16", "3/17", "3/18", "3/19", "3/20"].map((date) => (
          <div key={date} className="train-stop" onClick={() => setSelectedDate(date)}>
            <div className="train-stop-date">{date}</div>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedDate === "3/16" ? "Monday 3/16" : selectedDate === "3/17" ? "Tuesday 3/17" : selectedDate === "3/18" ? "Wednesday 3/18" : selectedDate === "3/19" ? "Thursday 3/19" : "Friday 3/20"}</h3>
            {events[selectedDate].map((event, index) => (
              <div key={index}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
            ))}
            <button onClick={() => setSelectedDate(null)} className="close-popup">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

const TopDawgs = () => {
  const candidates = [
    { name: "Ethan Han",               organization: "Kappa Sigma",       image: "https://i.imgur.com/WOUFgWD.png" },
    { name: "Mateo Inzunza",           organization: "Sigma Chi",         image: "https://i.imgur.com/1PFvPmI.png" },
  ];

  return (
    <section id="top-dawgs" className="top-dawgs">
      <h2 className="section-title">Top Dawgs</h2>
      <div className="top-dawgs-container">
        {candidates.map((candidate, index) => (
          <div key={index} className="top-dawg-box">
            <img src={candidate.image} alt={candidate.name} className="candidate-image" />
            <h3 className="candidate-name">{candidate.name}</h3>
            <p className="candidate-organization">{candidate.organization}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://i.imgur.com/jK9bhrT.png",
    "https://i.imgur.com/HMhDcI5.png",
    "https://i.imgur.com/wO7VEJf.png",
    "https://i.imgur.com/leLjDWT.png",
    "https://i.imgur.com/K2ohuT7.png",
    "https://i.imgur.com/ExpvF23.png",
    "https://i.imgur.com/7Xz3PRY.png",
    "https://i.imgur.com/RzFKtoX.png",
    "https://i.imgur.com/wFcY9bx.png",
    "https://i.imgur.com/LrbmU8u.png",
    "https://i.imgur.com/rQpEdos.png",
    "https://i.imgur.com/6bd7OHl.png",
    "https://i.imgur.com/qnD52Hj.png",
    "https://i.imgur.com/KVL9blA.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => setCurrentImageIndex(i => (i + 1) % images.length);
  const prevImage = () => setCurrentImageIndex(i => (i - 1 + images.length) % images.length);

  return (
    <section id="gallery" className="gallery">
      <h2 className="gallery-title">Gallery</h2>
      <div className="carousel">
        <button className="carousel-btn prev" onClick={prevImage}>❮</button>
        <div className="carousel-image-container">
          <img
            src={images[currentImageIndex]}
            alt={`Gallery Image ${currentImageIndex + 1}`}
            className="carousel-image"
          />
        </div>
        <button className="carousel-btn next" onClick={nextImage}>❯</button>
      </div>
    </section>
  );
};

const History = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  const historyData = {
    '2023': {
      title: 'Paws for a Cause 2023',
      description: 'Our 1st Annual Paws for a Cause was led by Sogoli Fahr! Under her vision, Alpha Kappa Psi raised around $7,000 with 10 organizations participating! She introduced core events like Smooch the Pooch and the infamous Dog Ball tournament. Congratulations to Alpha Phi Omega for becoming our First Top Organization!',
      image: 'https://i.imgur.com/9Ri3y4M.png',
    },
    '2024': {
      title: 'Paws for a Cause 2024',
      description: "Our 2nd Annual Paws for a Cause was led by Sebastian Garcia! Alpha Kappa Psi raised $7,416 with 13 organizations participating — a record! He introduced the Top Dawg award. Congratulations to Kappa Sigma's Malcolm Berry for being our first TOP DAWG and to Delta Sigma Pi for becoming our Second Top Organization! Special thanks to Celsius for partnering with us!",
      image: 'https://i.imgur.com/3s32AhV.png',
    },
  };

  return (
    <div id="history" className="history">
      <h2 className="history-title">History</h2>
      <div className="history-btn-container">
        <button className="history-btn" onClick={() => setSelectedYear('2023')}>Paws for a Cause 2023</button>
        <button className="history-btn" onClick={() => setSelectedYear('2024')}>Paws for a Cause 2024</button>
      </div>

      {selectedYear && (
        <div className="popup">
          <div className="popup-content">
            <h3 className="popup-title">{historyData[selectedYear].title}</h3>
            <p className="popup-description">{historyData[selectedYear].description}</p>
            <button className="close-popup" onClick={() => setSelectedYear(null)}>Close</button>
          </div>
          <div className="popup-image">
            <img src={historyData[selectedYear].image} alt={selectedYear} />
          </div>
        </div>
      )}
    </div>
  );
};

const SocialLinks = ({ className }) => (
  <div className={className}>
    <a href="https://www.instagram.com/ucmakpsi" target="_blank" rel="noopener noreferrer" className="circle instagram">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://www.tiktok.com/@ucmakpsi" target="_blank" rel="noopener noreferrer" className="circle tiktok">
      <i className="fab fa-tiktok"></i>
    </a>
    <a href="https://akpsiucm.com" target="_blank" rel="noopener noreferrer" className="circle website">
      <i className="fas fa-globe"></i>
    </a>
  </div>
);

const StickyLinks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) return null;
  return <SocialLinks className="sticky-links" />;
};

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <footer className="footer">
      <p>Alpha Kappa Psi — Psi Upsilon Chapter</p>
      <p>Website By Steven Navas & Ami Ogbonna</p>
      {isMobile && <SocialLinks className="footer-social-links" />}
    </footer>
  );
};

const App = () => (
  <div>
    <Header />
    <PupPoints />
    <Philanthropy />
    <Calendar />
    <TopDawgs />
    <Gallery />
    <History />
    <StickyLinks />
    <Footer />
  </div>
);

export default App;