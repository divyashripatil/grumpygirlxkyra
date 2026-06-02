// Apply form for Kyra × Grumpy Girl
const { useState, useRef } = React;

const STORY_PROMPTS = [
  "the last cab ride",
  "a guy on the metro",
  "a wedding seating chart",
  "an instagram comment",
  "your group chat",
  "a coffee shop in koramangala",
  "monday at 11am",
];

const PICKUP_OPTIONS = [
  "Indiranagar Metro",
  "Trinity / Halasuru",
  "Domlur / 100ft Road",
  "North Koramangala",
  "Within the 5km bubble (I'll share)",
  "I'll get myself there",
];

const ApplyForm = ({ food, drink, setFood, setDrink }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    phone: "",
    location: "",
    pickup: "",
    instagram: "",
    story: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);
  const [appRef, setAppRef] = useState("");
  // 0 = saving · 1 = holding ₹100 · 2 = confirmed

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const totalSteps = 4;
  const stepValid = [
    () => data.name.trim().length > 1 && /^[0-9 +\-()]{8,}$/.test(data.phone),
    () => data.location.trim().length > 1 && !!data.pickup,
    () => !!food && !!drink,
    () => data.story.trim().length >= 20,
  ];

  const next = () => {
    if (!stepValid[step]()) return;
    if (step < totalSteps - 1) setStep(step + 1);
    else submit();
  };
  const back = () => setStep(Math.max(0, step - 1));

  const submit = async () => {
    setSubmitting(true);
    setSubmitStage(0);

    const ref = "KYRA-" + Math.floor(10000 + Math.random() * 90000);
    setAppRef(ref);

    try {
      // Step 1: create Razorpay order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const orderData = await orderRes.json();
      if (!orderData.orderId) throw new Error('Order creation failed');

      setSubmitStage(1);

      // Step 2: open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: 'INR',
        name: 'kyra × grumpy girl',
        description: '₹100 deposit · your spot in the queue',
        order_id: orderData.orderId,
        prefill: { name: data.name, contact: data.phone },
        theme: { color: '#3D0A0A' },
        handler: async (response) => {
          setSubmitStage(2);
          // Step 3: save to Google Sheets
          try {
            await fetch('/api/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...data,
                food,
                drink,
                ref,
                paymentId: response.razorpay_payment_id,
              }),
            });
          } catch (e) {
            console.error('Sheets save failed:', e);
          }
          setTimeout(() => { setSubmitting(false); setDone(true); }, 500);
        },
        modal: {
          ondismiss: () => { setSubmitting(false); setSubmitStage(0); },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const foodLabel = food ? FOOD_OPTIONS.find((f) => f.key === food)?.name : "...";
  const drinkLabel = drink ? DRINK_OPTIONS.find((d) => d.key === drink)?.name : "...";

  // -------------- DONE STATE --------------
  if (done) {
    return (
      <div className="form-panel">
        <div className="form-success">
          <span className="hand">you're on the list ✦</span>
          <h3>we'll text you<br/>by 03 june.</h3>
          <p>
            ₹100 is held on UPI. If we don't invite you, it's reversed within 48 hours
            of the decision, same UPI ID. If we do, you'll get a payment link for the
            ₹1,399 balance and the full event details.
          </p>
          <div className="receipt">
            <div className="row"><span>application</span><b>#{appRef}</b></div>
            <div className="row"><span>name</span><b>{data.name}</b></div>
            <div className="row"><span>phone</span><b>{data.phone}</b></div>
            <div className="row"><span>pickup</span><b>{data.pickup}</b></div>
            <hr/>
            <div className="row"><span>your plate</span><b>{foodLabel}</b></div>
            <div className="row"><span>your pour</span><b>{drinkLabel}</b></div>
            <hr/>
            <div className="row"><span>deposit</span><b>₹100 · held</b></div>
            <div className="row"><span>balance</span><b>₹1,399 · if invited</b></div>
            <div className="row"><span>response by</span><b>Tue 03 Jun · 8pm</b></div>
          </div>
        </div>
      </div>
    );
  }

  // -------------- SUBMITTING STATE --------------
  if (submitting) {
    const stages = [
      "saving your application…",
      "holding ₹100 on upi…",
      "confirming · you're in queue ✓",
    ];
    return (
      <div className="form-panel">
        <h3>almost there.</h3>
        <p style={{ fontSize: "0.98rem", lineHeight: 1.5, marginTop: "0.4rem", color: "var(--kyra-cream-2)" }}>
          Don't refresh. This takes a few seconds.
        </p>
        <div className="brew"></div>
        <div className="brew-label">{stages[submitStage]}</div>
        <div style={{
          marginTop: "1.2rem",
          display: "flex",
          gap: "0.3rem",
          justifyContent: "center",
        }}>
          {[0,1,2].map((i) => (
            <span key={i} style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: i <= submitStage ? "var(--yellow)" : "rgba(244, 213, 163, 0.25)",
              transition: "background 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    );
  }

  // -------------- STEP STATES --------------
  return (
    <div className="form-panel">
      <h3>
        {step === 0 && "let's start with you."}
        {step === 1 && "where in BLR?"}
        {step === 2 && "lock your order."}
        {step === 3 && <>one <GrumpyWord><span>grumpy</span></GrumpyWord> thing.</>}
      </h3>
      <div className="progress" aria-label={`Step ${step + 1} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={i < step ? "done" : i === step ? "active" : ""} />
        ))}
      </div>

      {step === 0 && (
        <>
          <label>your name</label>
          <input
            type="text"
            placeholder="first name is enough"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <label style={{ marginTop: "1.1rem" }}>phone number</label>
          <input
            type="tel"
            placeholder="+91"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <p className="hint">we won't spam, we promise ✦</p>
        </>
      )}

      {step === 1 && (
        <>
          <label>which part of bangalore?</label>
          <input
            type="text"
            placeholder="hsr sector 2 / koramangala 5th block / domlur…"
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            autoFocus
          />
          <label style={{ marginTop: "1.1rem" }}>where should we pick you up?</label>
          <div className="metro-grid">
            {PICKUP_OPTIONS.map((m) => {
              const stickerMap = {
                "Indiranagar Metro": "see you there",
                "Trinity / Halasuru": "say less",
                "Domlur / 100ft Road": "noted",
                "North Koramangala": "got u",
                "Within the 5km bubble (I'll share)": "share location",
                "I'll get myself there": "main character",
              };
              return (
                <button
                  key={m}
                  type="button"
                  className={data.pickup === m ? "selected" : ""}
                  onClick={() => update("pickup", m)}
                  data-sticker={stickerMap[m] || "noted"}
                >
                  {m}
                </button>
              );
            })}
          </div>
          <label style={{ marginTop: "1.1rem" }}>instagram (optional)</label>
          <input
            type="text"
            placeholder="@yourhandle"
            value={data.instagram}
            onChange={(e) => update("instagram", e.target.value)}
          />
        </>
      )}

      {step === 2 && (
        <>
          <label>your plate · pick one</label>
          <div className="form-options">
            {FOOD_OPTIONS.map((opt) => {
              const stickerMap = { waffle: "we ate", mac: "no crumbs", bagel: "left no crumbs" };
              return (
                <button
                  key={opt.key}
                  type="button"
                  className={"form-option " + (food === opt.key ? "selected" : "")}
                  onClick={() => setFood(opt.key)}
                  data-sticker={stickerMap[opt.key]}
                >
                  <span className="form-opt-radio"></span>
                  <span className="form-opt-name">{opt.name}</span>
                  <span className={"form-opt-tag " + opt.tag}>{opt.tag === "veg" ? "VEG" : "NV"}</span>
                </button>
              );
            })}
          </div>

          <label style={{ marginTop: "1.1rem" }}>your pour · pick one</label>
          <div className="form-options">
            {DRINK_OPTIONS.map((opt) => {
              const stickerMap = { "cookie-butter": "iykyk", "kyra-special": "screenshot this" };
              return (
                <button
                  key={opt.key}
                  type="button"
                  className={"form-option " + (drink === opt.key ? "selected" : "")}
                  onClick={() => setDrink(opt.key)}
                  data-sticker={stickerMap[opt.key]}
                >
                  <span className="form-opt-radio"></span>
                  <span className="form-opt-name">{opt.name}</span>
                </button>
              );
            })}
          </div>

          <label style={{ marginTop: "1.1rem" }}>allergies / notes for the kitchen (optional)</label>
          <input
            type="text"
            placeholder="e.g. no peanuts, lactose intolerant…"
            value={data.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
          <p className="hint">menus live in the section above. your picks sync ✦</p>
        </>
      )}

      {step === 3 && (
        <>
          <label>one thing that recently made you grumpy</label>
          <textarea
            placeholder="a paragraph, a sentence, a fragment. unhinged is welcome. be specific."
            value={data.story}
            onChange={(e) => update("story", e.target.value)}
          />
          <p className="hint" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>min 20 characters · be specific</span>
            <span style={{ opacity: 0.7 }}>{data.story.length} / 600</span>
          </p>
          <div className="story-prompts">
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--kyra-cream-2)", padding: "0.3rem 0", opacity: 0.75 }}>
              stuck? try:
            </span>
            {STORY_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update("story", data.story + (data.story ? " " : "") + p + ": ")}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="step-actions">
        {step > 0 && <button className="btn-back" type="button" onClick={back}>← back</button>}
        <button
          className={"btn-next " + (stepValid[step]() ? "" : "disabled")}
          type="button"
          onClick={next}
          data-sticker={step < totalSteps - 1 ? "let me cook|next|continue|yes." : "manifesting|clock it ★|seated.|sending it"}
        >
          {step < totalSteps - 1 ? "next →" : "submit · hold ₹100 →"}
        </button>
        <span className="step-count">{step + 1} / {totalSteps}</span>
      </div>
    </div>
  );
};

Object.assign(window, { ApplyForm });
