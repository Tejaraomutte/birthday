import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  Cake,
  Camera,
  Gift,
  Heart,
  PartyPopper,
  Play,
  Sparkles,
  Star,
  Upload,
  WandSparkles,
  X
} from 'lucide-react';
import './style.css';
import imgOne from '../img 1.jpeg';
import imgTwo from '../img 2.jpeg';
import imgThree from '../img 3.jpeg';
import imgFive from '../img 5.jpeg';
import whatsApp1 from '../WhatsApp Image 2026-10-26 at 10.27.24 PM.jpeg';
import whatsApp2 from '../WhatsApp Image 2026-10-26 at 10.27.25 PM.jpeg';
import dsc1400 from '../DSC_1400.JPG';
import dsc2395 from '../DSC_2395.JPG';

const birthdayConfig = {
  name: 'Your Sister',
  age: '18',
  birthdayYear: 2026,
  nickname: 'little star',
  heroTitle: 'Happy Birthday to My Favorite Human 💗',
  heroSubtitle: 'To the little girl who will always have a special place in my heart.',
  introTitle: 'Hey, Birthday Girl! 🎀',
  introSubtitle: 'Someone has prepared something special just for you...',
  letterTitle: 'To My Little Sister, With All My Heart',
  letterText: `To my sweetest little sister,

No matter how much you grow, you will always be my little girl in so many ways.

You make ordinary days brighter, little moments more special, and our memories more precious than words can explain.

I hope you always remember how special you are, how much you deserve happiness, and how many beautiful things are waiting for you in life.

I may not say it every day, but I am so lucky to have you as my sister.

May this new chapter bring you endless smiles, beautiful friendships, exciting adventures, and every little thing your heart wishes for.

Keep smiling, keep dreaming, and keep being your adorable self.

No matter how old we become, you will always have me cheering for you.

Happy Birthday, my little princess! 🎂💗

With all my love,
Your forever partner in crime ❤️`
};

const defaultMemories = [
  { id: 'm1', title: 'My forever little girl 💕', caption: 'My forever little girl 💕', emoji: '💕', tone: 'rose', src: imgOne, type: 'image' },
  { id: 'm2', title: 'Partners in every little adventure', caption: 'Partners in every little adventure.', emoji: '🩷', tone: 'peach', src: imgTwo, type: 'image' },
  { id: 'm3', title: 'Memories I wish I could relive', caption: 'Memories I wish I could relive.', emoji: '✨', tone: 'lavender', src: imgThree, type: 'image' },
  { id: 'm4', title: 'My favorite troublemaker', caption: 'My favorite troublemaker.', emoji: '🎀', tone: 'mint', src: imgFive, type: 'image' },
  { id: 'm5', title: 'Us, always and forever', caption: 'Us, always and forever.', emoji: '🫶', tone: 'gold', src: whatsApp1, type: 'image' },
  { id: 'm6', title: 'The cutest birthday girl', caption: 'The cutest birthday girl.', emoji: '🌷', tone: 'sky', src: whatsApp2, type: 'image' },
  { id: 'm7', title: 'A moment to remember', caption: 'A moment to remember.', emoji: '✨', tone: 'lavender', src: dsc1400, type: 'image' },
  { id: 'm8', title: 'One more favorite memory', caption: 'One more favorite memory.', emoji: '💗', tone: 'rose', src: dsc2395, type: 'image' }
];

const quizQuestions = [
  {
    question: 'Who is the cutest birthday girl in the world?',
    options: ['You, obviously 💗', 'The internet', 'A movie star', 'Your favorite actor'],
    correct: 'You, obviously 💗'
  },
  {
    question: 'Who deserves all the happiness today?',
    options: ['My favorite person ever', 'The neighbor', 'A random stranger', 'Whoever wins the lottery'],
    correct: 'My favorite person ever'
  },
  {
    question: 'What is the best thing about being you?',
    options: ['Your kindness and sparkle ✨', 'Your silence', 'Your stress', 'Your fake laugh'],
    correct: 'Your kindness and sparkle ✨'
  },
  {
    question: 'Who loves you more than words can explain?',
    options: ['Me, always ❤️', 'Nobody', 'Your pet rock', 'The Wi-Fi'],
    correct: 'Me, always ❤️'
  },
  {
    question: 'What is your birthday wish?',
    options: ['A year full of love, laughter, and dreams ✨', 'To never grow up', 'To ignore all the love', 'To be the busiest person on earth'],
    correct: 'A year full of love, laughter, and dreams ✨'
  }
];

function App() {
  const [media, setMedia] = useState([]);
  const [showLetter, setShowLetter] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [giftOpen, setGiftOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizMessage, setQuizMessage] = useState('');
  const [score, setScore] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const galleryItems = useMemo(() => {
    const uploaded = media.map((item) => ({
      id: item.id,
      title: item.name,
      caption: item.name,
      src: item.url,
      type: item.type,
      tone: 'rose'
    }));

    return [...defaultMemories, ...uploaded];
  }, [media]);

  useEffect(() => {
    if (selectedMemory === null && !galleryOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedMemory(null);
        setGalleryOpen(false);
        return;
      }

      if (selectedMemory !== null && event.key === 'ArrowRight') {
        setSelectedMemory((current) => (current === null ? 0 : (current + 1) % galleryItems.length));
      }

      if (selectedMemory !== null && event.key === 'ArrowLeft') {
        setSelectedMemory((current) => (current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedMemory, galleryOpen, galleryItems.length]);

  const birthdayTarget = useMemo(() => new Date(birthdayConfig.birthdayYear, 10, 6, 0, 0, 0), []);
  const isBirthdayDay = now.getMonth() === 10 && now.getDate() === 6;

  const diff = useMemo(() => {
    const target = new Date(birthdayTarget);
    const safeDiff = target.getTime() - now.getTime();
    return Math.max(0, safeDiff);
  }, [birthdayTarget, now]);

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const countdownText = isBirthdayDay
    ? 'It is your birthday — let the magic begin! ✨'
    : now > birthdayTarget
      ? 'The birthday magic is already here — happy birthday, always! 💗'
      : 'Countdown to your special day';

  function addFiles(event) {
    const selected = Array.from(event.target.files || []);
    const additions = selected.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file)
    }));

    setMedia((current) => [...current, ...additions]);
    event.target.value = '';
  }

  function removeMedia(id) {
    setMedia((current) => {
      const item = current.find((entry) => entry.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return current.filter((entry) => entry.id !== id);
    });
  }

  function celebrate() {
    setSurprise(true);
    setTimeout(() => setSurprise(false), 4200);
  }

  function openIntro() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      const audioContext = new AudioContextClass();
      const notes = [392, 523.25, 659.25];
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.0001;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start(audioContext.currentTime + index * 0.12);
        gainNode.gain.exponentialRampToValueAtTime(0.06, audioContext.currentTime + index * 0.12 + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + index * 0.12 + 0.45);
        oscillator.stop(audioContext.currentTime + index * 0.12 + 0.5);
      });
    }

    setIntroOpen(false);
  }

  function handleAnswer(option) {
    const currentQuestion = quizQuestions[quizIndex];
    const isCorrect = option === currentQuestion.correct;

    if (isCorrect) {
      setScore((count) => count + 1);
      setQuizMessage('Perfect! You know me so well 💗');
    } else {
      setQuizMessage(`Close one — ${currentQuestion.correct}`);
    }

    setTimeout(() => {
      if (quizIndex === quizQuestions.length - 1) {
        setQuizComplete(true);
        setQuizMessage('');
        return;
      }

      setQuizIndex((index) => index + 1);
      setQuizMessage('');
    }, 700);
  }

  const currentQuestion = quizQuestions[quizIndex];
  const galleryLength = galleryItems.length;

  return (
    <>
      {introOpen && (
        <div className="intro-screen">
          <div className="intro-orb orb-one" />
          <div className="intro-orb orb-two" />
          <div className="intro-card">
            <div className="gift-envelope">
              <div className="envelope-flap" />
              <div className="envelope-heart">♥</div>
            </div>
            <p className="eyebrow">A little surprise for you</p>
            <h1>{birthdayConfig.introTitle}</h1>
            <p className="intro-subtitle">{birthdayConfig.introSubtitle}</p>
            <button className="primary-button" onClick={openIntro}>
              Open Your Surprise <Heart size={17} fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      <main className={`page-shell ${introOpen ? 'blurred' : ''}`}>
        {surprise && (
          <div className="confetti-layer" aria-hidden="true">
            {Array.from({ length: 90 }, (_, index) => (
              <span
                key={index}
                style={{
                  left: `${(index * 31) % 100}%`,
                  animationDelay: `${(index % 12) * 0.12}s`,
                  background: ['#ff78a8', '#ffc857', '#bfa2ff', '#7ddac2', '#ff9d79'][index % 5],
                  transform: `rotate(${index * 18}deg)`
                }}
              />
            ))}
          </div>
        )}

        <nav className="topbar">
          <a href="#home" className="brand">
            <span className="brand-mark"><Heart size={16} fill="currentColor" /></span>
            a little love note
          </a>
          <a href="#memories" className="nav-pill">
            Our memories <ArrowDown size={14} />
          </a>
        </nav>

        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> made with all my love</div>
            <h1>{birthdayConfig.heroTitle}</h1>
            <p className="hero-subtitle">{birthdayConfig.heroSubtitle}</p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' })}>
                Let&apos;s relive our memories <Heart size={17} fill="currentColor" />
              </button>
              <button className="text-button" onClick={() => setShowLetter(true)}>
                A letter for you <span>↗</span>
              </button>
            </div>
            <div className="mini-love">
              <span className="avatar-stack">
                <i>💗</i>
                <i>🌼</i>
                <i>🦋</i>
              </span>
              <span>One sister. A million memories.</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="floating-sticker sticker-one">♡</div>
            <div className="floating-sticker sticker-two">✦</div>
            <div className="floating-sticker sticker-three">✿</div>

            <button type="button" className="portrait-frame" onClick={() => setGalleryOpen(true)} aria-label="Open the photo gallery">
              <div className="portrait-card has-photo">
                <img className="portrait-photo" src={dsc1400} alt="A favorite photo of your sister" />
                <div className="sunburst">✹</div>
              </div>
              <div className="frame-caption">
                <span>open our photo gallery</span>
                <Heart size={16} fill="currentColor" />
              </div>
            </button>

            <div className="little-note"><Sparkles size={15} /> {birthdayConfig.nickname}</div>
          </div>

          <div className="scroll-hint"><span className="scroll-line" /> Scroll for the good stuff</div>
        </section>

        <section className="birthday-strip">
          <div className="strip-icon"><Cake size={23} /></div>
          <div className="strip-copy">
            <span className="strip-label">Save the date</span>
            <strong>November 6 <span>·</span> Your day to sparkle</strong>
          </div>
          <div className="countdown-text">{countdownText}</div>
          <div className="countdown" aria-label="Countdown to next November 6">
            {[['DAYS', days], ['HRS', hours], ['MIN', minutes], ['SEC', seconds]].map(([label, value]) => (
              <div className="time-unit" key={label}>
                <b>{String(value).padStart(2, '0')}</b>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrap memories-section" id="memories">
          <div className="section-heading">
            <div className="eyebrow"><Camera size={15} /> The little things</div>
            <h2>Our story, in <em>snapshots.</em></h2>
            <p>Every photo has a story. Every video holds a little piece of us.</p>
          </div>

          <div className="memory-grid">
            {[
              ['Always', 'Partners in crime', '🫶', 'memory-pink'],
              ['The chaos', 'Certified giggle club', '🎀', 'memory-yellow'],
              ['The magic', 'Growing together', '🦋', 'memory-lilac']
            ].map(([label, title, emoji, tone], index) => (
              <div className={`memory-card ${tone}`} key={label}>
                <span className="card-number">0{index + 1} / {label}</span>
                <div className="memory-emoji">{emoji}</div>
                <h3>{title}</h3>
                <p>From tiny secrets to big dreams, it is always better with you.</p>
                <span className="scribble">sisters forever ♡</span>
              </div>
            ))}
          </div>

          <div className="gallery-head">
            <div>
              <div className="eyebrow"><WandSparkles size={15} /> your personal gallery</div>
              <h2>Little <em>memory lane.</em></h2>
            </div>
            <label className="upload-button">
              <Upload size={16} /> Add photos & videos
              <input type="file" accept="image/*,video/*" multiple onChange={addFiles} />
            </label>
          </div>

          <button type="button" className="gallery-entry" onClick={() => setGalleryOpen(true)}>
            <span className="gallery-entry-icon"><Camera size={24} /></span>
            <span className="gallery-entry-copy">
              <strong>Open our memory gallery</strong>
              <small>{galleryItems.length} memories, all in one place</small>
            </span>
            <span className="gallery-entry-arrow" aria-hidden="true">↗</span>
          </button>

          {galleryOpen && (
            <div className="gallery-modal-backdrop" role="dialog" aria-modal="true" aria-label="Our memory gallery" onClick={() => setGalleryOpen(false)}>
              <div className="gallery-modal" onClick={(event) => event.stopPropagation()}>
                <div className="gallery-modal-head">
                  <div>
                    <div className="eyebrow"><Camera size={15} /> every little moment</div>
                    <h2>Our <em>memory gallery.</em></h2>
                    <p>Tap any photo to see it up close.</p>
                  </div>
                  <button type="button" className="lightbox-close" aria-label="Close gallery" onClick={() => setGalleryOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="gallery-grid">
                  {galleryItems.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`gallery-item tone-${item.tone || 'rose'}`}
                      onClick={() => {
                        setSelectedMemory(index);
                        setGalleryOpen(false);
                      }}
                    >
                      {item.src ? (
                        item.type === 'video' ? (
                          <video src={item.src} muted playsInline />
                        ) : (
                          <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                        )
                      ) : (
                        <div className="gallery-placeholder">
                          <span>{item.emoji}</span>
                        </div>
                      )}
                      <span className="gallery-caption">{item.caption}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedMemory !== null && (
            <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedMemory(null)}>
              <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setSelectedMemory(null)}>
                  <X size={18} />
                </button>
                {galleryItems.length > 1 && (
                  <button type="button" className="lightbox-nav left" onClick={() => setSelectedMemory((current) => (current - 1 + galleryLength) % galleryLength)}>
                    ‹
                  </button>
                )}

                {galleryItems[selectedMemory]?.src ? (
                  galleryItems[selectedMemory].type === 'video' ? (
                    <video src={galleryItems[selectedMemory].src} controls autoPlay playsInline />
                  ) : (
                    <img src={galleryItems[selectedMemory].src} alt={galleryItems[selectedMemory].title} />
                  )
                ) : (
                  <div className="lightbox-placeholder">
                    <span>{galleryItems[selectedMemory]?.emoji || '💗'}</span>
                  </div>
                )}

                <div className="lightbox-meta">
                  <p>{galleryItems[selectedMemory]?.caption || 'Forever and always'}</p>
                </div>

                {galleryItems.length > 1 && (
                  <button type="button" className="lightbox-nav right" onClick={() => setSelectedMemory((current) => (current + 1) % galleryLength)}>
                    ›
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="letter-section">
          <div className="letter-decoration">✿</div>
          <div className="letter-copy">
            <div className="eyebrow"><Heart size={15} fill="currentColor" /> from your biggest fan</div>
            <h2>To my little sister,<br />with all my heart.</h2>
            <p>
              You are the softest part of my life, the funniest person I know, and the sweetest reason to believe in magic.
            </p>
            <button className="primary-button" onClick={() => setShowLetter(true)}>
              Open your letter <Heart size={16} fill="currentColor" />
            </button>
          </div>
          <div className="letter-side">
            <div className="letter-stamp">For<br />You<br /><Heart size={18} fill="currentColor" /></div>
            <div className="letter-scribble">love you<br />to the moon<br />& back <span>♡</span></div>
          </div>
        </section>

        <section className="wish-section section-wrap">
          <div className="wish-icon"><Gift size={29} /></div>
          <div className="eyebrow">Make a wish</div>
          <h2>Ready for a little <em>birthday magic?</em></h2>
          <p>Close your eyes, think of something wonderful, and tap the button.</p>
          <button className="primary-button wish-button" onClick={celebrate}>
            <PartyPopper size={18} /> {surprise ? 'One more wish!' : 'Make a wish!'} <Sparkles size={17} />
          </button>
          {surprise && <div className="wish-message">✨ May this year bring you the kind of happiness you give everyone else. ✨</div>}
        </section>

        <section className="quiz-section section-wrap">
          <div className="quiz-card">
            <div className="eyebrow"><Star size={15} /> quiz time</div>
            <h2>How well do you know yourself?</h2>
            {!quizComplete ? (
              <>
                <p className="quiz-question">{currentQuestion.question}</p>
                <div className="quiz-options">
                  {currentQuestion.options.map((option) => (
                    <button key={option} type="button" className="choice-button" onClick={() => handleAnswer(option)}>
                      {option}
                    </button>
                  ))}
                </div>
                {quizMessage && <div className="quiz-message">{quizMessage}</div>}
              </>
            ) : (
              <>
                <div className="quiz-finish">
                  <div className="finish-badge">🎉</div>
                  <h3>Congratulations! You have officially unlocked your birthday surprise!</h3>
                  <p>You answered {score} out of {quizQuestions.length} correctly. You deserve all the love today.</p>
                </div>
                <button type="button" className="primary-button" onClick={() => document.getElementById('gift-box')?.scrollIntoView({ behavior: 'smooth' })}>
                  Continue to the next surprise <Play size={16} />
                </button>
              </>
            )}
          </div>
        </section>

        <section className="gift-section section-wrap" id="gift-box">
          <div className="gift-box-wrap">
            <div className={`gift-box ${giftOpen ? 'opened' : ''}`} onClick={() => setGiftOpen(true)} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && setGiftOpen(true)}>
              <div className="gift-lid" />
              <div className="gift-body" />
              <div className="gift-ribbon ribbon-horizontal" />
              <div className="gift-ribbon ribbon-vertical" />
              <div className="gift-label">A Little Gift,<br />Just for You...</div>
            </div>

            {giftOpen && (
              <div className="gift-reveal">
                <div className="gift-card">
                  <div className="gift-card-icon">🎁</div>
                  <h3>Open your little surprise</h3>
                  <p>May your year be filled with laughter, fresh dreams, sweet memories, and the kind of happiness that feels like home.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer>
          <div className="footer-heart"><Heart size={16} fill="currentColor" /></div>
          <p>Made with an unreasonable amount of love.</p>
          <span>your sister, your forever friend ♡</span>
          <div className="footer-stars">✦　♡　✦</div>
        </footer>

        {showLetter && (
          <div className="modal-backdrop" role="presentation" onClick={() => setShowLetter(false)}>
            <article className="letter-modal" role="dialog" aria-modal="true" aria-labelledby="letter-title" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="modal-close" onClick={() => setShowLetter(false)} aria-label="Close letter">
                <X size={20} />
              </button>
              <div className="modal-flower">🌷</div>
              <div className="eyebrow">A note just for you</div>
              <h2 id="letter-title">{birthdayConfig.letterTitle}</h2>
              <div className="letter-body">
                {birthdayConfig.letterText.split('\n').map((line, index) => (
                  <p key={index}>{line || <span>&nbsp;</span>}</p>
                ))}
              </div>
              <button type="button" className="primary-button" onClick={() => setShowLetter(false)}>
                Sending you a big hug <Heart size={16} fill="currentColor" />
              </button>
            </article>
          </div>
        )}
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);