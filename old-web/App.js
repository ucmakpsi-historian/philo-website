// To whomever is reading this, this is the Paws for a Cause 2025 website for Alpha Kappa Psi code.
// It is made with React and styled with CSS. It was deployed through GitHub Pages.
// This specific file is the main App.js file that contains the main components of the website.
// It contains some imports for the icons and the fonts since it was Western Themed last year.
// As this is your website now, you can do whatever you want with it. However, I have some thoughts if you will indulge me for a moment.
// First of all, I am excited at the prospect of seeing the chapter continue to make this website better and better each year. I really hope you are able to
// complete it as this is one of Alpha Kappa Psi's many traditions within Philo every year.
// We were the first organization to make a philanthropy website in 2024, we were the first organization to make a philanthropy Instagram in 2023, we were the first
// organization to invite clubs in 2024. We always innovate, so please continue to innovate. The campus follows us, remember that always.

import React, { useState, useEffect } from "react";
import "@fontsource/rye";
import { FaHorse, FaTshirt } from "react-icons/fa";
import { GiCactus } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import "./App.css";

// This is the header component that contains the navigation bar for the website. (The top bar)
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav-container">
        <h1 className="title">Paws for a Cause 2025</h1>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#pup-points" className="nav-item">Points</a></li>
          <li><a href="#philanthropy" className="nav-item">Philanthropy</a></li>
          <li><a href="#calendar" className="nav-item">Calendar</a></li>
          <li><a href="#top-dawgs" className="nav-item">Candidates</a></li>
          <li><a href="#gallery" className="nav-item">Gallery</a></li>
          <li><a href="#history" className="nav-item">History</a></li>
        </ul>
      </nav>
    </header>
  );
};

// This is the data for the organizations that are participating in the philanthropy week.
// It contains the rank, name, score, category, and Instagram link for each organization.
// The score is the total number of points that the organization has earned.
// The category is the type of organization that it is.
// The Instagram link is the link to the organization's Instagram page.
// I manually updated the points every night during the philanthropy week, however I encourage to explore programming ways to connect the Excel sheet to the website so that it updates on it's own.
const organizations = [
  { rank: 1, name: "Pi Kappa Phi", score: 2504500, category: "Socials", instagram: "https://instagram.com/ucmpikapp" },
  { rank: 2, name: "Kappa Sigma", score: 2074110, category: "Socials", instagram: "https://instagram.com/kappasigmaucm" },
  { rank: 3, name: "Phi Mu", score: 2043490, category: "Sororities", instagram: "https://instagram.com/ucmercedphimu" },
  { rank: 4, name: "Delta Gamma", score: 1962490, category: "Sororities", instagram: "https://instagram.com/ucmdeltagamma" },
  { rank: 5, name: "Delta Delta Delta", score: 1580410, category: "Sororities", instagram: "https://instagram.com/ucmtridelta" },
  { rank: 6, name: "Business Society", score: 1231530, category: "Organizations", instagram: "https://instagram.com/ucm_businessociety" },
  { rank: 7, name: "Theta Tau", score: 1129860, category: "Professionals", instagram: "https://instagram.com/mdthetatau" },
  { rank: 8, name: "Delta Sigma Pi", score: 1014100, category: "Professionals", instagram: "https://instagram.com/ucmdeltasigmapi" },
  { rank: 9, name: "Sigma Chi", score: 719900, category: "Socials", instagram: "https://instagram.com/ucmsigmachi" },
  { rank: 10, name: "Rotaract Club", score: 345440, category: "Organizations", instagram: "https://instagram.com/ucmercedrotaract" },
  { rank: 11, name: "Phi Delta Epsilon", score: 280790, category: "Professionals", instagram: "https://instagram.com/ucmercedphide" },
  { rank: 12, name: "Sigma Theta Psi", score: 182330, category: "Sororities", instagram: "https://instagram.com/ucm_stpnu" },
  { rank: 13, name: "Merced Pre-Law Society", score: 78250, category: "Organizations", instagram: "https://instagram.com/ucm.mpls" },
];

const PupPoints = () => {
  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleFilterChange = (category) => {
    setFilter(category);
    setIsDropdownOpen(false);
  };

  const filteredOrgs =
    filter === "All" ? organizations : organizations.filter(org => org.category === filter);

  const categories = ['All', 'Socials', 'Sororities', 'Professionals', 'Organizations'];

  return (
    <section id="pup-points" className="pup-points">
      <h2 className="leaderboard-title">Pup Points</h2>
      
      <div className="filters">
        {isMobile ? (
          <div className="filter-dropdown">
            <button 
              className="dropdown-button" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
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
              <td><strong>{org.score}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

// This is the philanthropy component that contains the boxes for the philanthropy events. 
// It contains the title, the boxes for the events, and the links to the events.
// The boxes are flipped when clicked, and the links are opened in a new tab.
// The images are stored in the public folder and are accessed using the src attribute.
// The links are opened in a new tab using the target="_blank" attribute.
// The learn more button is a button that opens the link in a new tab.
// The buy now button is a button that opens the link in a new tab.
// The LinkedIn button is a button that opens the link in a new tab.
// I encourage you to explore a way to showcase the shirts in a better way, and maybe highlight the entire Philo Committee isntead of just the Parliamentarian.

const Philanthropy = () => {
  const [flippedBox, setFlippedBox] = useState(null);

  const handleBoxClick = (boxIndex) => {
    if (flippedBox !== boxIndex) {
      setFlippedBox(boxIndex);
    }
  };

  const handleBackClick = (e, boxIndex) => {
    if (e.target.tagName !== "BUTTON") {
      setFlippedBox(null);
    }
  };

  return (
      <section id="philanthropy" className="philanthropy">
        <h2 className="philanthropy-title">Philanthropy</h2>
        <div className="philanthropy-boxes">
          <div
              className={`philanthropy-box ${flippedBox === 1 ? "flipped" : ""}`}
              onClick={() => handleBoxClick(1)}
          >
            <div className="front">
              <GiCactus className="icon" />
              <h3>New Beginnings for<br />Merced County Animals</h3>
              <p>New Beginnings is dedicated to finding homes for animals in need from the Merced County Shelter.</p>
            </div>
            <div className="back" onClick={(e) => handleBackClick(e, 1)}>
              <img src="https://i.imgur.com/cQiQ8Fm.png" alt="New Beginnings" />
              <a href="https://www.newbeginningsforanimalsmerced.org" target="_blank" rel="noopener noreferrer">
                <button className="learn-more">Learn More</button>
              </a>
            </div>
          </div>
          <div
              className={`philanthropy-box ${flippedBox === 2 ? "flipped" : ""}`}
              onClick={() => handleBoxClick(2)}
          >
            <div className="front">
              <FaTshirt className="icon" />
              <h3>Paws for a Cause<br />T-Shirts</h3>
              <p>Get your hands on our exclusive Paws for a Cause 2025 shirts to support our philanthropy!</p>
            </div>
            <div className="back" onClick={(e) => handleBackClick(e, 1)}>
              <img src="https://i.imgur.com/EupyDX0.png" alt="Shirts" />
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfbkVkHMjv0ToStclX-nyeFP69wTSQ-img3fVOwBOBNtIACYA/viewform" target="_blank" rel="noopener noreferrer">
                <button className="learn-more">Buy Now</button>
              </a>
            </div>
          </div>
          <div
              className={`philanthropy-box ${flippedBox === 3 ? "flipped" : ""}`}
              onClick={() => handleBoxClick(3)}
          >
            <div className="front">
              <FaHorse className="icon" />
              <h3>Meet Our<br />Parliamentarian</h3>
              <p>Our Parliamentarian, Anais Honadle, is the head of Paws for a Cause 2025, as well as all the service events Alpha Kappa Psi does!</p>
            </div>
            <div className="back" onClick={(e) => handleBackClick(e, 1)}>
              <img src="https://i.imgur.com/LexCzA2.png" alt="Philanthropy Chair" />
              <a href="https://www.linkedin.com/in/anais-honadle/g" target="_blank" rel="noopener noreferrer">
                <button className="learn-more">LinkedIn</button>
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};

// This is the calendar component that contains the calendar for the philanthropy week.
// It contains the title, the calendar for the events, and the events for the calendar.
// The calendar is a train track with the dates of the events.
// The events are displayed in a popup when the date is clicked.
// The popup contains the title, the description, and the buttons to close the popup.
// The buttons to close the popup are the close button.
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const events = {
    "4/7": [
      { title: "Bark Bites", description: "11 AM - 2 PM at Scholar's Lane, Buy Western Themed Cookies! $5 per Cookie, 5,000 Points" },
      { title: "Crafty Canines", description: "6:30 - 8:30 PM at COB 105, Make Dog Toys by Bringing Old T-Shirts! 1 Dog Toy, 1,000 Points" }
    ],
    "4/8": [
      { title: "Toy Talks", description: "11 AM - 2 PM at Scholar's Lane, Talk With Brothers of Alpha Kappa Psi! One 5 Minute Talk, 2,000 Points" },
      { title: "Panda Express", description: "3 - 10 PM at 165 E. Yosemite Ave, Raise Money By Grubbing at Panda! Per $1, 1,000 Points" }
    ],
    "4/9": [
      { title: "Toy Talks", description: "11 AM - 2 PM at Scholar's Lane, Talk With Brothers of Alpha Kappa Psi! One 5 Minute Talk, 2,000 Points" },
      { title: "Smooch the Pooch", description: "3:30 - 5:30 PM at Pavilion Lawn, Take Pictures With Animals From New Beginnings! $5 per Set of Pictures, 5,000 Points" }
    ],
    "4/10": [
      { title: "Pie-An-AKPSI", description: "11 AM - 2 PM at Scholar's Lane, Pie Brothers of Alpha Kappa Psi! $3 for 1 Pie (3,000 Points), $5 for 2 Pies (6,000 Points)" },
      { title: "Paws & Claws", description: "6 - 9 PM at Brother's House, Our Paws for a Cause Carnival Including Our Talent Show! 1st Place - 200,000 Points, 2nd Place - 100,000 Points, 3rd Place - 50,000 Points" }
    ],
    "4/11": [
      { title: "Dogball", description: "3 - 5 PM at Elmer Murchie Park, Water Balloon Dodgeball! 1st Place - 300,000 Points, 2nd Place - 200,000 Place, 3rd Place - 100,000 Points" },
      { title: "Paws & Refresh", description: "3 - 5 PM at Elmer Murchie Park, We're hosting an Horchata Stand! $3 per Cup of Horchata, 3,000 Points" }
    ]
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClosePopup = () => {
    setSelectedDate(null);
  };

  return (
      <section id="calendar" className="calendar">
        <h2 className="calendar-title">Calendar</h2>
        <div className="train-track">
          {["4/7", "4/8", "4/9", "4/10", "4/11"].map((date) => (
              <div key={date} className="train-stop" onClick={() => handleDateClick(date)}>
                <div className="train-stop-date">{date}</div>
              </div>
          ))}
        </div>

        {selectedDate && (
            <div className="popup">
              <div className="popup-content">
                <h3>{selectedDate}</h3>
                {events[selectedDate].map((event, index) => (
                    <div key={index}>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                    </div>
                ))}
                <button onClick={handleClosePopup} className="close-popup">Close</button>
              </div>
            </div>
        )}
      </section>
  );
};

// This is the top dawgs component that contains the top dawgs for the philanthropy week.
// It contains the title, the top dawgs for the philanthropy week, and the links to the top dawgs.
// The top dawgs are displayed in a box with the name, organization, and image of the top dawg.
// The links to the top dawgs are opened in a new tab using the target="_blank" attribute.
// The images are uploaded privately to imgur.
// I encourage you to explore a way to highly the Top Dawg winner and Top Organization winner at the end of the philanthropy week. Also, I think
// it could be cool to highlight the coaches of each organization some how, maybe it's own section?
// An issue I've noticed in philo weeks is sometimes people don't know who their coaches are, so it could be cool to highlight them.
const TopDawgs = () => {
  const candidates = [
    {
      name: "Miguel Jimenez",
      organization: "Business Society",
      image: "https://i.imgur.com/bLM388i.png"
    },
    {
      name: "Bernadette Bravo",
      organization: "Delta Delta Delta",
      image: "https://i.imgur.com/HswWOrc.png"
    },
    {
      name: "Gena Carlos",
      organization: "Delta Gamma",
      image: "https://i.imgur.com/LpYWhwd.png"
    },
    {
      name: "Edwin Gallegos",
      organization: "Delta Sigma Pi",
      image: "https://i.imgur.com/kGgHvLO.png"
    },
    {
      name: "Ethan Han",
      organization: "Kappa Sigma",
      image: "https://i.imgur.com/WOUFgWD.png"
    },
    {
      name: "Victoria De Los Angeles",
      organization: "Phi Mu",
      image: "https://i.imgur.com/GZ4gpcU.png"
    },
    {
      name: "Cris Huerta Lomeli",
      organization: "Pi Kappa Phi",
      image: "https://i.imgur.com/VKjP1lq.png"
    },
    {
      name: "Mateo Inzunza",
      organization: "Sigma Chi",
      image: "https://i.imgur.com/1PFvPmI.png"
    },
    {
      name: "Abigail Yenawine",
      organization: "Sigma Theta Psi",
      image: "https://i.imgur.com/Mh2PtgS.png"
    },
    {
      name: "Evan Acerga",
      organization: "Theta Tau",
      image: "https://i.imgur.com/YOBO6Po.png"
    }
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

// This is the gallery component that contains the gallery for the philanthropy week.
// It contains the title, the gallery for the philanthropy week, and the images for the gallery.
// The images are stored in the public folder and are accessed using the src attribute.
// The images are displayed in a carousel.
// The images are displayed in a popup when the image is clicked.
// The popup contains the image and the buttons to close the popup.
// The buttons to close the popup are the close button.
// I updated this every night with photos from the philanthropy week.
const Gallery = () => {
  const images = [
    "https://i.imgur.com/I5VY51k.png",
    "https://i.imgur.com/biccL8s.png",
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
    "https://i.imgur.com/KVL9blA.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
      <section id="gallery" className="gallery">
        <h2 className="gallery-title">Gallery</h2>
        <div className="stagecoach">
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
        </div>
      </section>
  );
};
// This is the history component that contains the history for the philanthropy week.
// It contains the title, the history for the philanthropy week, and the images for the history.
// The history is a button that opens a popup with the history of the philanthropy week.
// The popup contains the title, the description, and the image of the history.
// The buttons to close the popup are the close button.
// I updated this with the history of the philanthropy week.
// Please keep this section, and remember to add a section for 2025!
const History = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const historyData = {
    '2023': {
      title: 'Paws for a Cause 2023',
      description: 'Our 1st Annual Paws for a Cause was led by Sogoli Fahr! Under her vision of creating our philanthropy week as our Parliamentarian, Alpha Kappa Psi was able to raise around $7000 and had 10 organizations participate! She introduced some of the core events that we still do annually such as Smooch the Pooch and our infamous DOG BALL tournament! Congratulations to Alpha Phi Omega for becoming our First Top Organization!',
      image: 'https://i.imgur.com/9Ri3y4M.png',
    },
    '2024': {
      title: 'Paws for a Cause 2024',
      description: "Our 2nd Annual Paws for a Cause was led by Sebastian Garcia! Under his vision of our philanthropy week as our Parliamentarian, Alpha Kappa Psi was able to raise $7416 and tie the record of having the most organizations participate in one philanthropy week (13)! He also introduced the Top Dawg award, awarded to the individual that shows Alpha Kappa Psi's core values the best. Congratulations to Kappa Sigma's Malcolm Berry for being our first TOP DAWG and to Delta Sigma Pi for becoming our Second Top Organization! Finally, special thanks to Celsius for partnering with us and supporting our cause!",
      image: 'https://i.imgur.com/3s32AhV.png',
    },
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const closePopup = () => {
    setSelectedYear(null);
  };

  return (
      <div id="history" className="history">
        <h2 className="history-title">History</h2>
        <div className="history-btn-container">
          <button className="history-btn" onClick={() => handleYearClick('2023')}>Paws for a Cause 2023</button>
          <button className="history-btn" onClick={() => handleYearClick('2024')}>Paws for a Cause 2024</button>
        </div>

        {selectedYear && (
            <div className="popup">
              <div className="popup-content">
                <h3 className="popup-title">{historyData[selectedYear].title}</h3>
                <p className="popup-description">{historyData[selectedYear].description}</p>
                <button className="close-popup" onClick={closePopup}>Close</button>
              </div>
              <div className="popup-image">
                <img src={historyData[selectedYear].image} alt={selectedYear} />
              </div>
            </div>
        )}
      </div>
  );
};

// This is the social links component that contains the social links for the website.
// It contains the Instagram, TikTok, and Website links.
// The Instagram link is the link to the organization's Instagram page.
// The TikTok link is the link to the organization's TikTok page.
// The Website link is the link to the organization's website.
// The links are opened in a new tab using the target="_blank" attribute.
// The links are displayed in a circle with the icon of the social media platform.
const SocialLinks = ({ className }) => {
  return (
    <div className={className}>
      <a
        href="https://www.instagram.com/ucmakpsiphilo"
        target="_blank"
        rel="noopener noreferrer"
        className="circle instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="https://www.tiktok.com/@ucmakpsi"
        target="_blank"
        rel="noopener noreferrer"
        className="circle tiktok"
      >
        <i className="fab fa-tiktok"></i>
      </a>
      <a
        href="https://akpsiucm.com"
        target="_blank"
        rel="noopener noreferrer"
        className="circle website"
      >
        <i className="fas fa-globe"></i>
      </a>
    </div>
  );
};

const StickyLinks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return <SocialLinks className="sticky-links" />;
};

// This is the footer component that contains the footer for the website.
// It contains the Alpha Kappa Psi, Psi Upsilon Chapter, and the Website By Andrew Reed.
// Feel free to credit yourself or whomever else is working on the website. (or not)
const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <footer className="footer">
      <p>Alpha Kappa Psi - Psi Upsilon Chapter</p>
      <p>Website By Andrew Reed</p>
      {isMobile && <SocialLinks className="footer-social-links" />}
    </footer>
  );
};

// This is the main App component that contains the main components of the website.
const App = () => {
  return (
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
};

export default App;

// One last idea I had was maybe add a Top Dawg / Top Organization section, like put the past winners so that we can always remember them.
// Good luck with the website, and I hope you have a great Philo Week! If you have any questions, feel free to reach out to me.
// I'm always here to help.
// Best,
// Andrew Reed - Alpha Epsilon
// In Unity, and Integrity