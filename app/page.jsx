"use client";
import React, { useMemo, useState } from "react";
import { ArrowLeft, Check, Globe, Home, Search, Shield, Volume2, X } from "lucide-react";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", variant = "default", children, ...props }) {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "outline"
      ? "border bg-white hover:bg-slate-50"
      : variant === "ghost"
      ? "hover:bg-slate-100"
      : "bg-slate-900 text-white hover:bg-slate-800";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {
  return <input className={`w-full border px-3 py-2 ${className}`} {...props} />;
}

function Textarea({ className = "", ...props }) {
  return <textarea className={`w-full border px-3 py-2 ${className}`} {...props} />;
}

function Badge({ className = "", children }) {
  return <span className={`inline-flex items-center border px-2 py-1 text-xs ${className}`}>{children}</span>;
}

const categories = [
  { id: "transport", label: "Transport", emoji: "🚌" },
  { id: "shopping", label: "Shopping", emoji: "🛒" },
  { id: "health", label: "Health", emoji: "🏥" },
  { id: "school", label: "School", emoji: "🎓" },
  { id: "work", label: "Work", emoji: "💼" },
];

const approvedSeed = [
  {
    id: 1,
    title: "At the bus stop",
    category: "transport",
    situation: "You want to ask where the bus goes.",
    nativeText: "এই বাস কোথায় যায়?",
    englishText: "Where does this bus go?",
    tips: ["Speak slowly", "Repeat once if needed"],
  },
  {
    id: 2,
    title: "Asking the bus driver",
    category: "transport",
    situation: "You want to ask if this bus stops near your home.",
    nativeText: "এই বাস কি এই রাস্তার কাছে থামে?",
    englishText: "Does this bus stop near this street?",
    tips: ["Show the street name", "Be polite and short"],
  },
  {
    id: 3,
    title: "Buying apples",
    category: "shopping",
    situation: "You want to ask the price of apples.",
    nativeText: "এই আপেলের দাম কত?",
    englishText: "How much are these apples?",
    tips: ["Point if needed", "Use simple words"],
  },
  {
    id: 4,
    title: "At the clinic reception",
    category: "health",
    situation: "You want to say you have an appointment.",
    nativeText: "আমার একটি অ্যাপয়েন্টমেন্ট আছে।",
    englishText: "I have an appointment.",
    tips: ["Keep your health card ready", "Say your name clearly"],
  },
  {
    id: 5,
    title: "Meeting a teacher",
    category: "school",
    situation: "You want to ask about your child's homework.",
    nativeText: "আমার সন্তানের হোমওয়ার্ক সম্পর্কে জানতে চাই।",
    englishText: "I want to ask about my child's homework.",
    tips: ["Speak calmly", "Ask one question at a time"],
  },
  {
    id: 6,
    title: "At work",
    category: "work",
    situation: "You want to ask for help with a task.",
    nativeText: "আপনি কি আমাকে এই কাজটিতে সাহায্য করতে পারেন?",
    englishText: "Can you help me with this task?",
    tips: ["Be direct", "Use gestures if needed"],
  },
];

const pendingSeed = [
  {
    id: 101,
    title: "Pharmacy help",
    description: "I want to ask where cough medicine is.",
    nativeText: "কাশির ওষুধ কোথায় পাবো?",
    englishAttempt: "Where I get cough medicine?",
    status: "pending",
  },
  {
    id: 102,
    title: "School pickup",
    description: "I want to tell the school I will be late.",
    nativeText: "আমি বাচ্চাকে নিতে একটু দেরি করব।",
    englishAttempt: "I will late to pick up my child.",
    status: "pending",
  },
];

function Header({ title, onHome, language, setLanguage, adminMode, setAdminMode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b bg-white/90 px-4 py-3 backdrop-blur">
      <button onClick={onHome} className="flex items-center gap-2 text-left">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold">
          D
        </div>
        <div>
          <div className="text-lg font-semibold">DailySpeak</div>
          <div className="text-xs text-slate-500">Real-life speaking practice</div>
        </div>
      </button>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="rounded-2xl"
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
        >
          <Globe className="mr-2 h-4 w-4" />
          {language === "bn" ? "বাংলা" : "English"}
        </Button>
        <Button
          variant={adminMode ? "default" : "outline"}
          className="rounded-2xl"
          onClick={() => setAdminMode(!adminMode)}
        >
          <Shield className="mr-2 h-4 w-4" />
          Admin
        </Button>
      </div>
    </div>
  );
}

function HomeScreen({ openCategory, goSubmit }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold md:text-4xl">Speak with confidence in daily life</h1>
          <p className="mt-3 text-sm text-slate-200 md:text-base">
            Learn simple English for real situations like the bus stop, store, clinic, school, and work.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-3 text-xl font-semibold">Choose a category</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => openCategory(category.id)}
              className="rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-4xl">{category.emoji}</div>
              <div className="mt-4 text-xl font-semibold">{category.label}</div>
              <div className="mt-1 text-sm text-slate-500">Tap to view daily situations</div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <div className="mb-2 text-lg font-semibold">Help grow DailySpeak</div>
        <p className="mb-4 text-sm text-slate-600">
          Share a real-life situation you want to practice. A moderator will review it before publishing.
        </p>
        <Button className="rounded-2xl" onClick={goSubmit}>+ Submit Situation</Button>
      </section>
    </div>
  );
}

function CategoryScreen({ categoryId, scenarios, goBack, openScenario }) {
  const category = categories.find((c) => c.id === categoryId);
  const filtered = scenarios.filter((item) => item.category === categoryId);

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <Button variant="ghost" className="mb-4 rounded-2xl" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">{category?.emoji} {category?.label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => openScenario(item.id)}
              className="flex w-full items-center justify-between rounded-2xl border p-4 text-left transition hover:bg-slate-50"
            >
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-slate-500">{item.situation}</div>
              </div>
              <div className="text-sm text-slate-400">Open</div>
            </button>
          ))}
          {filtered.length === 0 && <div className="text-sm text-slate-500">No scenarios yet.</div>}
        </CardContent>
      </Card>
    </div>
  );
}

function ScenarioScreen({ scenario, language, goBack, nextScenario }) {
  if (!scenario) return null;

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <Button variant="ghost" className="mb-4 rounded-2xl" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="overflow-hidden rounded-3xl border-0 shadow-lg">
        <div className="bg-slate-900 p-6 text-white">
          <div className="text-sm uppercase tracking-wide text-slate-300">Situation</div>
          <div className="mt-2 text-3xl font-bold">{scenario.title}</div>
          <div className="mt-2 text-slate-200">{scenario.situation}</div>
        </div>

        <CardContent className="space-y-6 p-6 md:p-8">
          <div>
            <div className="mb-2 text-sm font-medium text-slate-500">
              {language === "bn" ? "বাংলা" : "Native language"}
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 text-2xl font-semibold md:text-3xl">
              {scenario.nativeText}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-slate-500">Simple English</div>
            <div className="rounded-3xl border p-5 text-2xl font-semibold md:text-3xl">
              {scenario.englishText}
            </div>
          </div>

          <div className="rounded-3xl border bg-emerald-50 p-5">
            <div className="mb-3 text-sm font-semibold text-emerald-800">Practice tips</div>
            <div className="space-y-2 text-sm text-emerald-900">
              {scenario.tips.map((tip, index) => (
                <div key={index}>✔ {tip}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(scenario.englishText);
                  utterance.lang = "en-CA";
                  utterance.rate = 0.9;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(utterance);
                }}
              >
                <Volume2 className="mr-2 h-4 w-4" /> Play Audio
              </Button>
            <Button className="rounded-2xl" onClick={nextScenario}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SubmitScreen({ goBack, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    nativeText: "",
    englishAttempt: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setSubmitted(true);
    setForm({ title: "", description: "", nativeText: "", englishAttempt: "" });
  };

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6">
      <Button variant="ghost" className="mb-4 rounded-2xl" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Submit a new situation</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted && (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              ✅ Thank you. Your situation has been sent for review.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Example: Asking about medicine" className="rounded-2xl" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Situation</label>
              <Textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Describe the real-life situation" className="min-h-28 rounded-2xl" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Your language</label>
              <Textarea value={form.nativeText} onChange={(e) => updateField("nativeText", e.target.value)} placeholder="Write what you want to say in Bengali" className="min-h-24 rounded-2xl" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">English attempt (optional)</label>
              <Textarea value={form.englishAttempt} onChange={(e) => updateField("englishAttempt", e.target.value)} placeholder="Write your English if you want" className="min-h-24 rounded-2xl" />
            </div>

            <Button type="submit" className="rounded-2xl">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminScreen({ submissions, approveSubmission, rejectSubmission }) {
  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6">
      <div className="mb-4 text-2xl font-bold">Moderator Panel</div>
      <div className="grid gap-4">
        {submissions.map((item) => (
          <Card key={item.id} className="rounded-3xl">
            <CardContent className="space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.description}</div>
                </div>
                <Badge variant="secondary" className="rounded-xl px-3 py-1">{item.status}</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 text-sm font-medium text-slate-500">Native text</div>
                  <div>{item.nativeText}</div>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="mb-2 text-sm font-medium text-slate-500">English attempt</div>
                  <div>{item.englishAttempt || "—"}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl" onClick={() => approveSubmission(item.id)}>
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button variant="outline" className="rounded-2xl" onClick={() => rejectSubmission(item.id)}>
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {submissions.length === 0 && <div className="text-sm text-slate-500">No pending submissions.</div>}
      </div>
    </div>
  );
}

export default function DailySpeakMVPPrototype() {
  const [screen, setScreen] = useState("home");
  const [language, setLanguage] = useState("bn");
  const [adminMode, setAdminMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [approvedScenarios, setApprovedScenarios] = useState(approvedSeed);
  const [submissions, setSubmissions] = useState(pendingSeed);
  const [searchText, setSearchText] = useState("");

  const visibleScenarios = useMemo(() => {
    if (!searchText.trim()) return approvedScenarios;
    const q = searchText.toLowerCase();
    return approvedScenarios.filter((item) =>
      [item.title, item.situation, item.englishText].join(" ").toLowerCase().includes(q)
    );
  }, [approvedScenarios, searchText]);

  const currentScenario = approvedScenarios.find((item) => item.id === activeScenarioId);

  const openCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setScreen("category");
  };

  const openScenario = (scenarioId) => {
    setActiveScenarioId(scenarioId);
    setScreen("scenario");
  };

  const nextScenario = () => {
    if (!currentScenario) return;
    const sameCategory = approvedScenarios.filter((item) => item.category === currentScenario.category);
    const index = sameCategory.findIndex((item) => item.id === currentScenario.id);
    const next = sameCategory[(index + 1) % sameCategory.length];
    setActiveScenarioId(next.id);
  };

  const submitSituation = (form) => {
    const newSubmission = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      nativeText: form.nativeText,
      englishAttempt: form.englishAttempt,
      status: "pending",
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const approveSubmission = (id) => {
    const match = submissions.find((item) => item.id === id);
    if (!match) return;

    const approved = {
      id: Date.now(),
      title: match.title,
      category: "shopping",
      situation: match.description,
      nativeText: match.nativeText,
      englishText: match.englishAttempt || "Needs moderator rewrite",
      tips: ["Moderator should review this text", "Assign the correct category"],
    };

    setApprovedScenarios((prev) => [approved, ...prev]);
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

  const rejectSubmission = (id) => {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header
        title="DailySpeak"
        onHome={() => setScreen("home")}
        language={language}
        setLanguage={setLanguage}
        adminMode={adminMode}
        setAdminMode={setAdminMode}
      />

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex flex-col gap-3 rounded-3xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Home className="h-4 w-4" /> MVP Prototype
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search approved scenarios"
              className="rounded-2xl pl-10"
            />
          </div>
        </div>
      </div>

      {adminMode ? (
        <AdminScreen
          submissions={submissions}
          approveSubmission={approveSubmission}
          rejectSubmission={rejectSubmission}
        />
      ) : screen === "home" ? (
        <HomeScreen openCategory={openCategory} goSubmit={() => setScreen("submit")} />
      ) : screen === "category" ? (
        <CategoryScreen
          categoryId={activeCategory}
          scenarios={visibleScenarios}
          goBack={() => setScreen("home")}
          openScenario={openScenario}
        />
      ) : screen === "scenario" ? (
        <ScenarioScreen
          scenario={currentScenario}
          language={language}
          goBack={() => setScreen("category")}
          nextScenario={nextScenario}
        />
      ) : screen === "submit" ? (
        <SubmitScreen goBack={() => setScreen("home")} onSubmit={submitSituation} />
      ) : null}
    </div>
  );
}
