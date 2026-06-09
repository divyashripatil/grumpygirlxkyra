// Kyra × Grumpy Girl main app
const { useRef, useState } = React;

const App = () => {
  const formRef = useRef(null);
  const [food, setFood] = useState("");
  const [drink, setDrink] = useState("");

  const scrollToForm = () => {
    const el = formRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const marqueeItems = [
    "kyra × grumpy girl",
    "thirty grumpy women · one cafe",
    "indiranagar · bangalore",
    "byo rage · we'll bring snacks",
    "apply now · ₹1,499",
    "event · fri 12 june",
    "invites · 10 june",
  ];
  const marqueeItems2 = [
    "no walk-ins. no men. no apologies.",
    "first of many · many more to come",
    "the metro guy is a hazard ★ pass it on",
    "kyra pickup · within the 5km bubble",
    "vent · gossip · paint · repeat",
  ];

  return (
    <>
      <Marquee items={marqueeItems} />
      <Nav onApply={scrollToForm} />
      <Hero onApply={scrollToForm} />
      <InstaStrip />
      <Manifesto />
      <BrunchPicker food={food} setFood={setFood} drink={drink} setDrink={setDrink} />
      <Activities />
      <MapSection />
      <Marquee items={marqueeItems2} reverse />
      <How onApply={scrollToForm} />
      <Approval
        formRef={formRef}
        food={food}
        setFood={setFood}
        drink={drink}
        setDrink={setDrink}
      />
      <FAQ />
      <Footer onApply={scrollToForm} />
      <CursorSticker />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
