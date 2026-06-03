// Page sections for Kyra × Grumpy Girl
const { useState, useEffect, useRef } = React;

// ----- Marquee ---------------------------------------------------------------

const Marquee = ({ items, reverse }) => {
  const content = (
    <span>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {it}
          <span className="glyph">★</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className={"marquee-track" + (reverse ? " reverse" : "")}>
        {content}
        {content}
      </div>
    </div>
  );
};

// ----- Nav -------------------------------------------------------------------

const Nav = ({ onApply }) => (
  <nav className="nav">
    <div className="nav-brand">
      <span className="logo-kyra">kyra</span>
      <span className="x-mark" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12 14 L 48 50" stroke="#F5C84B" strokeWidth="9" strokeLinecap="round" />
          <path d="M 48 14 L 12 50" stroke="#F5C84B" strokeWidth="9" strokeLinecap="round" />
        </svg>
      </span>
      <span className="logo-grumpy-text">grumpy girl</span>
    </div>
    <div className="nav-links">
      <a href="#mission">why</a>
      <a href="#brunch">brunch</a>
      <a href="#activities">activities</a>
      <a href="#map">getting there</a>
      <a href="#apply">apply</a>
      <a href="#faq">faq</a>
    </div>
    <button className="nav-cta" onClick={onApply} data-sticker="yes.|clock it ★|seated.|the audacity">apply →</button>
  </nav>
);

// ----- Hero ------------------------------------------------------------------

const Hero = ({ onApply }) => {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const r = heroRef.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setParallax({ x: (e.clientX - cx) / r.width, y: (e.clientY - cy) / r.height });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <header className="hero" ref={heroRef} data-screen-label="01 Hero">
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-eyebrow">
          <span className="pulse"></span>
          <span>INVITES OUT 10 JUNE · BANGALORE</span>
        </div>

        <h1>
          we are <GrumpyWord><span className="hand">grumpy</span></GrumpyWord><br />
          and we need to <br/>
          <span className="display rust">talk</span> about it.
        </h1>

        <p className="hero-sub">
          Kyra is locking down Grumpy Girl Coffee for an afternoon. Thirty women,
          one long table, all the pent-up rage about being a woman in this city.
          The cab driver. The metro guy. The auto quoting double. The relative on whatsapp.
          <b>Come yell into a coffee with us.</b>
        </p>

        <div className="hero-cta-row">
          <button className="btn-primary" onClick={onApply} data-sticker="i'm seated|clock it ★|yes.|manifesting|she's right|the lore">
            apply for a seat <span className="arrow">→</span>
          </button>
          <a href="#mission" className="btn-ghost" data-sticker="the lore|spill it|tell me more|iykyk">read the manifesto →</a>
        </div>

        <div className="hero-meta">
          <div><b>WHEN</b><span>A Friday this June</span></div>
          <div><b>WHERE</b><span>Grumpy Girl Coffee · Indiranagar</span></div>
          <div><b>INVITES</b><span>Confirmed by 10 June</span></div>
          <div><b>SEATS</b><span>30 · first of many</span></div>
        </div>
      </div>

      {/* Decorative grumpy mascot, parallax */}
      <img
        src=window.__resources.mascot
        alt=""
        aria-hidden="true"
        className="hero-mascot"
        style={{
          transform: `translate(${parallax.x * -22}px, ${parallax.y * -18}px)`,
          transition: "transform 0.18s ease-out",
        }}
      />
      <Scribble2
        className="hero-doodle d2"
        style={{
          transform: `translate(${parallax.x * 14}px, ${parallax.y * 12}px) rotate(${-8 + parallax.x * -3}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      />
      <Sparkle
        className="hero-doodle d3"
        style={{
          transform: `translate(${parallax.x * 22}px, ${parallax.y * 18}px) rotate(${10 + parallax.x * 4}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      />
      <CoffeeBean className="hero-bean hb1" />
      <CoffeeBean className="hero-bean hb2" />
      <Sparkle className="hero-spark2" color="#C2502A" />
      <div className="hero-tape"></div>
    </header>
  );
};

// ----- Manifesto -------------------------------------------------------------

const Manifesto = () => (
  <section id="mission" className="manifesto" data-screen-label="02 Manifesto">
    <div className="wrap">
      <div>
        <div className="manifesto-eyebrow">why we're doing this</div>
        <h2>
          we are so <span className="hand">tired</span><br />
          of being the <br/>calm one.
        </h2>
        <img src=window.__resources.mascotCream alt="" aria-hidden="true" className="manifesto-mascot" />
      </div>
      <div>
        <p>
          The auto guy quoting double. The metro guy too close. The wedding seating chart.
          The 11pm WhatsApp from a number you didn't save. The boss who texted “can you
          just come in once.” The boyfriend who said you're “overreacting.”
          We could go on. <b>So could you.</b>
        </p>
        <p>
          Kyra is building the women-only rides app to fix one tiny piece of this. But
          this Friday we're not here to pitch. We're here to <em>vent</em>. To gossip.
          To sympathise loudly. To pass each other tissues and ranch sauce. Bring the
          story. The cafe is closed for thirty of us.
        </p>

        <div className="manifesto-stats">
          <div className="manifesto-stat">
            <div className="num">1 in 2</div>
            <div className="label">Indian women have felt unsafe in a cab</div>
            <div className="src">via Ola Mobility Institute, 2023</div>
          </div>
          <div className="manifesto-stat">
            <div className="num">31%</div>
            <div className="label">of urban Indian women skip travel plans over safety</div>
            <div className="src">via UN Women + India Today, 2022</div>
          </div>
          <div className="manifesto-stat">
            <div className="num">0%</div>
            <div className="label">of us willing to keep pretending this is fine</div>
            <div className="src">sample size: thirty</div>
          </div>
        </div>
        <BrokenPhone className="deco-phone manifesto-phone" />
      </div>
    </div>
  </section>
);

// ----- Insta strip (interactive taglines) -----------------------------------

const InstaStrip = () => {
  const chips = [
    { type: "stars", label: "we ate. we know.", sticker: "real|no notes|yes ma'am" },
    { type: "dot", label: "thirty seats", pop: "pop1", sticker: "manifesting one|seated|fingers crossed" },
    { type: "stars", label: "no walk-ins", sticker: "the audacity|read the room|not for them" },
    { type: "dot", label: "girls only", pop: "pop2", sticker: "we love that|finally|exactly" },
    { type: "stars", label: "clock it ↗", sticker: "clocked|noted|screenshot" },
    { type: "dot", label: "first of many", pop: "pop3", sticker: "the trilogy|the era|the cinematic universe" },
    { type: "stars", label: "indiranagar", sticker: "the spot|hometown|the move" },
    { type: "dot", label: "a friday in june", pop: "pop1", sticker: "save the date|cleared my cal|locked in" },
    { type: "stars", label: "byo grumpy", sticker: "the brief|i was born ready|done & done" },
  ];
  return (
    <div className="insta-strip" aria-label="event chips">
      <span className="section-eyebrow">the brief, in chip form</span>
      <div className="insta-grid">
        {chips.map((c, i) => (
          <span key={i} className={"insta-chip " + (c.pop || "")} data-sticker={c.sticker}>
            {c.type === "stars" ? <span className="stars">✦ ✦</span> : <span className="dot"></span>}
            <span>{c.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ----- Brunch picker --------------------------------------------------------

const FOOD_OPTIONS = [
  {
    key: "waffle",
    name: "Waffle & Chicken",
    desc: "Buttermilk waffle, crispy fried chicken, maple syrup with hot sauce on the side. The classic.",
    tag: "nonveg",
  },
  {
    key: "mac",
    name: "Mushroom Mac & Cheese",
    desc: "Cavatappi, three cheeses, oyster mushrooms, a breadcrumb crown. Vegetarian and unapologetic.",
    tag: "veg",
  },
  {
    key: "bagel",
    name: "Buffalo Chicken Bagel",
    desc: "Crispy chicken in in-house buffalo sauce with ranch, pickles, crunch. Gets messy. Worth it.",
    tag: "nonveg",
  },
];

const DRINK_OPTIONS = [
  {
    key: "cookie-butter",
    name: "Cookie Butter Latte",
    desc: "Espresso, oat milk, spiced cookie butter, a salt finish. Grumpy Girl's house cult favourite.",
  },
  {
    key: "kyra-special",
    name: "The Kyra Special",
    desc: "A coffee we built with Grumpy Girl: chai-spiced espresso over cold milk, cardamom-sugar rim. Available here, nowhere else.",
  },
];

const BrunchPicker = ({ food, setFood, drink, setDrink }) => (
  <section id="brunch" className="section brunch" data-screen-label="04 Brunch">
    <div className="wrap">
      <span className="section-eyebrow">your brunch · one of each</span>
      <h2>pick what you'll <span className="hl">eat</span>.</h2>
      <CoffeeBean className="brunch-bean b1" />
      <CoffeeBean className="brunch-bean b2" />
      <Sparkle className="brunch-spark" color="#C2502A" />
      <MatchaCup className="deco-matcha brunch-matcha" />
      <StickyImpulse className="brunch-sticky" text="impulsive tattoo →" />
      <p className="section-lead">
        Three plates, two drinks. Choose one of each. Your order is held with your application.
        Tell us about allergies in the form and the kitchen will sort it.
      </p>

      <div className="brunch-cols">
        <div className="brunch-col">
          <h3>
            The Plate
            <span className="meta">CHOOSE ONE</span>
          </h3>
          <p>// the kitchen brings it · seated service</p>
          <div className="brunch-options">
            {FOOD_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                className={"brunch-option " + (food === opt.key ? "selected" : "")}
                onClick={() => setFood(opt.key)}
                data-sticker
                aria-pressed={food === opt.key}
              >
                <span className="opt-radio"></span>
                <div className="opt-body">
                  <div className="opt-name">
                    <span>{opt.name}</span>
                    <span className={"opt-tag " + opt.tag}>{opt.tag === "veg" ? "VEG" : "NON-VEG"}</span>
                  </div>
                  <div className="opt-desc">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="brunch-col">
          <h3>
            The Pour
            <span className="meta">CHOOSE ONE</span>
          </h3>
          <p>// one drink on us · refills à la carte</p>
          <div className="brunch-options">
            {DRINK_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                className={"brunch-option " + (drink === opt.key ? "selected" : "")}
                onClick={() => setDrink(opt.key)}
                data-sticker
                aria-pressed={drink === opt.key}
              >
                <span className="opt-radio"></span>
                <div className="opt-body">
                  <div className="opt-name">
                    <span>{opt.name}</span>
                  </div>
                  <div className="opt-desc">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p style={{
        marginTop: "1.6rem",
        fontFamily: "var(--mono)",
        fontSize: "0.78rem",
        letterSpacing: "0.06em",
        color: "var(--ink-soft)",
        opacity: 0.7,
      }}>
        Selections sync with your application. Edit any time before you submit.
      </p>
    </div>
  </section>
);

// ----- Activities -----------------------------------------------------------

const PolaroidCarousel = () => {
  const photos = [
    window.__resources.photoWaffle,
    window.__resources.photoCoffee,
    window.__resources.photoPortrait,
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="polaroid-stage">
      {photos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={"polaroid-photo " + (i === idx ? "on" : "")}
        />
      ))}
    </div>
  );
};

const Activities = () => (
  <section id="activities" className="section activities" data-screen-label="05 Activities">
    <div className="wrap">
      <span className="section-eyebrow">on the day</span>
      <h2>
        the <span className="hl">friday</span> you'll <br/>
        <span className="hand">cancel</span> everything for.
      </h2>
      <p className="section-lead">
        Brunch. Vent. Paint. Vent some more. Get a polaroid of you mid-rant.
        Thirty women, one cafe, one collective exhale.
      </p>

      <div className="activities-grid">
        <div className="act-card c1">
          <div className="num">01 / THE TABLE</div>
          <h3>brunch with thirty women who get it</h3>
          <p>The cafe closes for us. Long shared table, two armchairs, a window seat people
            will quietly compete for. Bring your worst story. Someone here will match it.</p>
        </div>

        <div className="act-card maroon c2">
          <div className="num">02 / RAGE INTO ACRYLIC</div>
          <h3>paint your tote, paint your feelings</h3>
          <p>Blank totes, blank canvases, every paint colour, and a real artist helping.
            Channel the auto-fare-doubling rage into something you'll actually use on a
            Tuesday. Take it home.</p>
        </div>

        <div className="act-card yellow c3">
          <div className="num">03 / SOUND</div>
          <h3>resident DJ, women on records</h3>
          <p>A DJ we love spinning a long set built around the room. Mostly: women on
            records. Some: things you'll absolutely Shazam.</p>
        </div>

        <div className="act-card rust c4">
          <div className="num">04 / RECEIPTS</div>
          <h3>polaroids on the house</h3>
          <p>A photographer, a wall to pin prints on, and you walk out with the one you
            like. Document the moment we all collectively yelled.</p>
          <div className="act-polaroid">
            <PolaroidCarousel />
            your face here
          </div>
        </div>

        <div className="act-card c5">
          <div className="num">05 / THE RIDE</div>
          <h3>kyra to pick you up</h3>
          <p>Women drivers, within the 5km bubble around the cafe (see the map). We'll
            drop you home after too. No apps to download, no surge, no “madam where are
            you exactly.” The driver waits. You don't.</p>
        </div>
      </div>
      <img src=window.__resources.mascot alt="" aria-hidden="true" className="activities-grumpy" />
      <AutoRickshaw className="activities-rickshaw" />
      <SugarBottle className="deco-sugar activities-sugar" />
      <StickyImpulse className="activities-sticky" text="text the ex (don't)" />
    </div>
  </section>
);

// ----- Map (Leaflet) --------------------------------------------------------

const MapSection = () => {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || leafletRef.current || !window.L) return;
    const L = window.L;
    // Grumpy Girl Coffee, Indiranagar (approx 12th Main coords)
    // Grumpy Girl Coffee actual address:
    // Building No: 1333, Paramahansa Yogananda Rd, Indira Nagar II Stage, Eshwara Layout, Indiranagar
    const center = [12.9701, 77.6447];

    const map = L.map(mapRef.current, {
      center,
      zoom: 13,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    });
    leafletRef.current = map;

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }
    ).addTo(map);

    // 5km radius (pickup bubble) — outer dashed
    const outer = L.circle(center, {
      radius: 5000,
      color: "#C2502A",
      weight: 2.5,
      fillColor: "#C2502A",
      fillOpacity: 0.10,
      dashArray: "8 6",
    }).addTo(map);

    // Inner 2km ring
    const inner = L.circle(center, {
      radius: 2000,
      color: "#3D0808",
      weight: 1.5,
      fillColor: "#3D0808",
      fillOpacity: 0.06,
    }).addTo(map);

    // Fit map to the outer ring so the 5km bubble actually fits inside the viewport
    map.fitBounds(outer.getBounds(), { padding: [24, 24] });

    // Animated pulsing pin marker
    const pinIcon = L.divIcon({
      className: "",
      html: `
        <div class="map-pin-wrap">
          <span class="map-pin-pulse"></span>
          <span class="map-pin-pulse delay"></span>
          <span class="map-pin-dot"></span>
          <span class="map-pin-label">grumpy girl coffee</span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
    L.marker(center, { icon: pinIcon, zIndexOffset: 1000 }).addTo(map);

    // Open in Google Maps button
    const gmaps = L.control({ position: "topright" });
    gmaps.onAdd = () => {
      const d = L.DomUtil.create("a", "map-gmaps-btn");
      d.href = "https://maps.google.com/?q=Grumpy+Girl+Coffee+Indiranagar";
      d.target = "_blank";
      d.rel = "noreferrer";
      d.innerHTML = "open in maps ↗";
      return d;
    };
    gmaps.addTo(map);

    // Slight nudge so the loader fade is visible
    setTimeout(() => setLoaded(true), 500);

    return () => {
      map.remove();
      leafletRef.current = null;
    };
  }, []);

  return (
    <section id="map" className="section map-section" data-screen-label="06 Map">
      <div className="wrap">
        <span className="section-eyebrow">getting there</span>
        <h2>we'll come <span className="hl">pick you up</span>.</h2>
        <p className="section-lead">
          A Kyra ride is on us if you're inside the orange ring. Drop too. 
          Most of Indiranagar, Domlur, north Koramangala, HAL, Halasuru. The exact 
          pickup window goes out with your invite.
        </p>

        <div className="map-wrap">
          <div className="map-container">
            <div ref={mapRef} className="map-leaflet" aria-label="5km pickup radius around Grumpy Girl Coffee Indiranagar"></div>
            <div className={"map-loader " + (loaded ? "gone" : "")}>
              <div>
                <div className="spinner"></div>
                <p>mapping the bubble…</p>
              </div>
            </div>
          </div>

          <div className="map-side">
            <div className="map-address-card">
              <div className="map-address-eyebrow">
                <span className="map-address-dot"></span> location
              </div>
              <h3>grumpy girl coffee</h3>
              <p className="map-address-body">
                Building No. 1333, Paramahansa Yogananda Rd<br/>
                Indira Nagar II Stage, Eshwara Layout<br/>
                Indiranagar, Bengaluru, 560008
              </p>
              <a className="map-address-link" href="https://maps.google.com/?q=Grumpy+Girl+Coffee+Indiranagar+Bengaluru" target="_blank" rel="noreferrer" data-sticker="the drop|saving this|noted">
                open in maps ↗
              </a>
            </div>
            <p className="map-side-helper">
              Drag, zoom, scroll. The dashed orange ring is the pickup zone. 
              The solid inner ring is a 2km walk-or-skip.
            </p>
            <span className="pill">click + to zoom · drag to pan</span>
            <div className="fine-print">
              Fine print. Pickup is limited to a ~5km radius from the cafe due to driver
              availability for this pop-up. Outside the bubble (Whitefield, Sarjapur,
              Electronic City, etc.) you're welcome to get yourself there. We'll have
              more events with wider coverage as we scale.
            </div>
          </div>
        </div>
        <CoffeeBean className="map-bean mb1" />
        <CoffeeBean className="map-bean mb2" />
      </div>
    </section>
  );
};

// ----- How it works ---------------------------------------------------------

const How = ({ onApply }) => (
  <section id="how" className="section how" data-screen-label="07 How">
    <div className="wrap">
      <span className="section-eyebrow">how it works</span>
      <h2>
        apply, hold a seat, <br/>
        <span className="hand">come angry</span>.
      </h2>
      <p className="section-lead">
        Thirty seats. Many more applications. We'll read every one and put together a
        room we'd actually want to sit in. Here's the flow.
      </p>

      <div className="how-steps">
        <div className="how-step">
          <div className="tag">step one</div>
          <div className="step-num">01</div>
          <h4>apply &amp; pay ₹100</h4>
          <p>Three-minute form, then a UPI hold of ₹100 to lock your slot in the waitlist.
            Refundable if we don't invite you.</p>
        </div>
        <div className="how-step">
          <div className="tag">step two</div>
          <div className="step-num">02</div>
          <h4>invite by 10 June</h4>
          <p>We'll text you yes or no by Tuesday, 3rd June. Your invite carries the
            date, time, and seat number.</p>
        </div>
        <div className="how-step">
          <div className="tag">step three</div>
          <div className="step-num">03</div>
          <h4>pay ₹1,399 to confirm</h4>
          <p>If invited, you pay the remaining ₹1,399 within 48 hours to lock the seat.
            Total ₹1,499. Non-refundable from here.</p>
        </div>
        <div className="how-step">
          <div className="tag">step four</div>
          <div className="step-num">04</div>
          <h4>turn up</h4>
          <p>We send the playlist link, pickup window, and the cafe address the morning
            of. Driver will be outside. Walk in like you own it.</p>
        </div>
      </div>

      <div style={{ marginTop: "2.8rem", display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={onApply} data-sticker="let's go|yes.|i'm in|seated.|clock it ★">
          start application <span className="arrow">→</span>
        </button>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
          ~ 3 minutes
        </span>
      </div>
    </div>
  </section>
);

// ----- FAQ ------------------------------------------------------------------

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: "what does ₹1,499 actually buy me?",
      a: "Entry to a closed cafe with thirty women, your chosen brunch (one plate + one drink), the paint-your-own tote and canvas station with all supplies, a four-hour DJ set, free polaroid prints, and a Kyra ride to pick you up and drop you home (within ~5km of the cafe). ₹100 is paid on application; the remaining ₹1,399 is paid only if you're invited."
    },
    {
      q: "is the ₹1,499 refundable?",
      a: "The ₹100 deposit at application is refunded if we don't invite you. Once invited and you pay the ₹1,399, the full ₹1,499 is non-refundable. We're holding seats, ordering food, paying the DJ and the drivers. If something urgent comes up, message us and we'll do our best to roll your seat to the next event."
    },
    {
      q: "when is the event?",
      a: "It's on a Friday in June. We're keeping the exact date off the public site on purpose. Confirmed invitees get the full details (date, time, address, seat number) on 3rd June. If you're applying, hold a Friday this June."
    },
    {
      q: "why only thirty seats?",
      a: "Because this is the first of many, not the only one. Thirty is the size of cafe we can close, feed properly, and actually get to know. We're already planning the next one: bigger venue, more seats, same idea. Apply and we'll keep you on the list either way."
    },
    {
      q: "what's the application about: the 'grumpy story'?",
      a: "One short story about something that recently made you irrationally, specifically grumpy. The metro guy, the wedding seating chart, a coffee that came out wrong, a comment section. We use it to build a room of people who'd actually enjoy each other. Be honest. Be specific. We promise not to share it."
    },
    {
      q: "i live in HSR / Whitefield / Sarjapur, can i still come?",
      a: "Yes. You're welcome to apply. The free Kyra pickup only covers the ~5km bubble (most of Indiranagar, Domlur, parts of Koramangala, HAL, Halasuru). Outside that, get yourself there and we'll arrange a Kyra ride home after at our normal rates. We're working on city-wide coverage; future events will go further."
    },
    {
      q: "is it women-only?",
      a: "Yes. The room, the drivers, the table. We're building Kyra for women and non-binary folks who'd find this a soft place to land. Please read the room when applying."
    },
    {
      q: "what's kyra?",
      a: "A ride-hailing app for women in India. Women drivers, women riders, properly trained, properly paid. Launching in Bangalore this year. This event is our soft hello to the city we're starting in."
    },
  ];
  return (
    <section id="faq" className="section faq" data-screen-label="09 FAQ">
      <div className="wrap">
        <span className="section-eyebrow">questions, anticipated</span>
        <h2>
          things you might <br/>
          <span className="hand">want to know</span>.
        </h2>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={"faq-item " + (open === i ? "open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} data-sticker={i % 2 ? "clocked|noted|on it" : "good question|valid|fair"}>
                <span>{it.q}</span>
                <span className="plus">+</span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
        <Sparkle className="faq-spark fs1" color="#3D0808" />
        <Sparkle className="faq-spark fs2" color="#C2502A" />
      </div>
    </section>
  );
};

// ----- Apply section --------------------------------------------------------

const Approval = ({ formRef, food, setFood, drink, setDrink }) => (
  <section id="apply" className="section approval" data-screen-label="08 Apply" ref={formRef}>
    <div className="wrap approval-wrap">
      <div className="approval-copy">
        <span className="section-eyebrow">apply for a seat</span>
        <h2 className="apply-heading">
          tell us what you're<br/>
          <GrumpyWord><span className="hand">grumpy</span></GrumpyWord> about.
        </h2>
        <p className="section-lead">
          Three minutes to apply. ₹100 to hold your spot. Invites land 10 June.
        </p>

        <div className="apply-stats">
          <div className="apply-stat">
            <div className="apply-stat-num">₹100</div>
            <div className="apply-stat-label">to hold a seat</div>
            <div className="apply-stat-sub">refunded if not invited</div>
          </div>
          <div className="apply-stat">
            <div className="apply-stat-num">10 jun</div>
            <div className="apply-stat-label">we say yes or no</div>
            <div className="apply-stat-sub">by tuesday evening</div>
          </div>
          <div className="apply-stat">
            <div className="apply-stat-num">5 km</div>
            <div className="apply-stat-label">pickup on us</div>
            <div className="apply-stat-sub">women drivers, around cafe</div>
          </div>
        </div>

        <p className="apply-footnote">
          The room is built from your answers. Be specific. Be honest. Be unhinged.
        </p>
      </div>
      <ApplyForm food={food} drink={drink} setFood={setFood} setDrink={setDrink} />
    </div>
    <Sparkle className="approval-spark as1" color="#C2502A" />
    <Sparkle className="approval-spark as2" />
    <img src=window.__resources.mascot alt="" aria-hidden="true" className="approval-face" />
  </section>
);

// ----- Footer ---------------------------------------------------------------

const Footer = ({ onApply }) => (
  <footer className="footer" data-screen-label="10 Footer">
    <MarchingMascot />
    <div className="wrap">
      <div className="footer-big">
        kyra <span className="hand">×</span> <GrumpyWord><span className="rust">grumpy girl</span></GrumpyWord>
      </div>
      <button className="footer-cta" onClick={onApply} data-sticker="see you in june|manifesting|yes.|clock it ★|seated.">
        apply for a seat →
      </button>
      <div className="footer-meta">
        <div className="footer-cols">
          <div>
            <b>Kyra Rides</b>
            <a href="https://kyrarides.in" target="_blank" rel="noreferrer">kyrarides.in</a>
            <a href="#">@kyra.rides</a>
            <a href="mailto:hi@kyrarides.in">hi@kyrarides.in</a>
          </div>
          <div>
            <b>Grumpy Girl Coffee</b>
            <a href="https://www.grumpygirlcoffee.in" target="_blank" rel="noreferrer">grumpygirlcoffee.in</a>
            <a href="#">12th Main · Indiranagar</a>
          </div>
          <div>
            <b>Press</b>
            <a href="mailto:press@kyrarides.in">press@kyrarides.in</a>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          © 2026 Kyra Rides Pvt. Ltd.<br/>
          Made in Bangalore.
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Marquee, Nav, Hero, Manifesto, InstaStrip,
  BrunchPicker, Activities, MapSection,
  How, FAQ, Approval, Footer,
  FOOD_OPTIONS, DRINK_OPTIONS,
});
