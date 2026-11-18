import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown,
  CircleHelp, Download, FileText, Github, Globe2, GraduationCap, Languages, LayoutTemplate,
  Linkedin, Mail, MapPin, Menu, Plus, Sparkles, Trash2, UserRound, WandSparkles,
  X, Zap,
  Users,
} from "lucide-react";

const initialData = {
  name: "", title: "", email: "", phone: "", location: "", linkedin: "", portfolio: "",
  summary: "", skills: "", experience: [{ company: "", role: "", period: "", description: "" }],
  education: [{ school: "", degree: "", period: "" }], languages: "",
};

const copy = {
  uz: {
    navHome: "Bosh sahifa", navCreate: "CV yaratish", navTemplates: "Shablonlar", navAbout: "Biz haqimizda",
    heroEyebrow: "Karyerangizga yangi imkoniyat", heroTitle: "Professional CV ni oson yarating",
    heroText: "Tajriba va ko‘nikmalaringizni kiriting, shablon tanlang va tayyor rezyumeni PDF qilib saqlang.",
    create: "CV yaratish", templates: "Shablonlarni ko‘rish", trusted: "Yangi imkoniyatlarga tayyorlanayotganlar uchun",
    quick: "Tez va oson CV yaratish", english: "Ingliz tilida rezyume", pdf: "PDF yuklab olish", pro: "Professional shablonlar",
    builderTag: "REZYUME YARATISH", builderTitle: "Sizning keyingi qadamingiz shu yerdan boshlanadi",
    builderText: "Ma’lumotlaringizni kiriting — rezyumeingiz o‘ng tomonda jonli tarzda yangilanadi.",
    stepOne: "Shaxsiy ma’lumotlar", stepTwo: "Tajriba va ko‘nikmalar", stepThree: "Ta’lim va tillar",
    personal: "Shaxsiy ma’lumotlar", fullName: "Ism va familiya", profession: "Kasb yoki lavozim",
    email: "Email", phone: "Telefon", location: "Shahar va mamlakat", linkedin: "LinkedIn havolasi",
    portfolio: "Portfolio yoki GitHub", professional: "Professional ma’lumotlar", about: "O‘zingiz haqingizda qisqacha",
    experience: "Ish tajribasi", company: "Kompaniya", role: "Lavozim", period: "Davr",
    description: "Vazifalar va yutuqlar", addExperience: "Tajriba qo‘shish", skills: "Ko‘nikmalar",
    skillsHint: "Vergul bilan ajrating", education: "Ta’lim", school: "Ta’lim muassasasi", degree: "Daraja yoki yo‘nalish",
    addEducation: "Ta’lim qo‘shish", languages: "Tillar", languagesHint: "Masalan: O‘zbek tili — ona tili, Ingliz tili — B2",
    livePreview: "Jonli ko‘rinish", download: "PDF yuklab olish", polish: "Matnni tartiblash",
    previewName: "Ism Familiya", previewRole: "Kasbingiz yoki lavozimingiz",
    summary: "PROFESSIONAL XULOSA", work: "ISH TAJRIBASI", skillsTitle: "KO‘NIKMALAR", educationTitle: "TA’LIM",
    languageTitle: "TILLAR", addDetails: "Tafsilotlaringiz shu yerda ko‘rinadi", aboutTitle: "Biz haqimizda",
    templatesTitle: "Sizga mos uslub", templatesText: "Har bir shablon ish beruvchilar uchun qulay va o‘qilishi oson bo‘lishi uchun puxta ishlab chiqilgan.",
    modern: "Zamonaviy", classic: "Klassik", minimal: "Minimal", footer: "Ishonch bilan keyingi qadamingizga.",
    namePlaceholder: "Masalan: Dilnoza Karimova", titlePlaceholder: "Masalan: Mahsulot dizayneri",
    summaryPlaceholder: "Asosiy tajribangiz, kuchli tomonlaringiz va karyera maqsadingiz haqida yozing…",
    companyPlaceholder: "Kompaniya nomi", rolePlaceholder: "Masalan: Katta mutaxassis",
    descriptionPlaceholder: "Natijalaringiz va asosiy vazifalaringizni yozing…", schoolPlaceholder: "Universitet yoki kollej",
    degreePlaceholder: "Masalan: Bakalavr, Kompyuter fanlari", empty: "Ma’lumot kiritilmagan",
    required: "Avval ism va kasbingizni kiriting.",
    copied: "Tayyor! CV chop etish oynasi ochildi — ‘PDF sifatida saqlash’ni tanlang.",
    templateApplied: "shabloni tanlandi.",
    projectTag: "9-OY LOYIHASI", projectTitle: "Kichik jamoa, katta imkoniyat",
    projectDescription: "AI CV Builder — rezyume yaratishni osonlashtirish uchun 9-oy davomida ikki kishilik jamoa tayyorlagan loyiha.",
    projectMonth: "Loyiha oyi", projectTeam: "Jamoa", people: "kishi",
    teamTag: "BIZNING JAMOA", teamTitle: "Loyihani ikki kishi yaratdi",
    memberOne: "Jamoa a’zosi 1", memberTwo: "Jamoa a’zosi 2",
    memberRole: "Loyiha muallifi",
    howTitle: "Uch qadamda tayyor CV", howText: "Oddiy jarayon — ma’lumot kiriting, ko‘rinishini tanlang va yuklab oling.",
    howOneTitle: "Ma’lumotlarni kiriting", howOneText: "Aloqa, tajriba, ko‘nikma va ta’limingizni qo‘shing.",
    howTwoTitle: "Shablon tanlang", howTwoText: "Zamonaviy, klassik yoki minimal ko‘rinishni sinab ko‘ring.",
    howThreeTitle: "PDF qilib saqlang", howThreeText: "CV ni chop etish oynasi orqali PDF formatida saqlang.",
    sampleButton: "Namuna CV ni ko‘rish", sampleLoaded: "Namuna CV yuklandi — ma’lumotlarni o‘zingiznikiga almashtiring.",
    projectGoalTitle: "Loyihaning maqsadi", projectGoalText: "Rezyume tayyorlashni qulay va tushunarli qilish: foydalanuvchi o‘z ma’lumotlarini bitta joyda kiritadi, natijani darhol ko‘radi va PDF qilib saqlaydi.",
    stackTitle: "Ishlatilgan texnologiyalar",
    aboutText: "Yaxshi CV — yangi imkoniyatlarga ochilgan eshik. AI CV Builder rezyume tayyorlashni sodda va hammaga qulay qilish uchun yaratilgan.",
    aiSuccess: "Matn brauzerda tartiblandi. Bu versiyada AI xizmati ulanmagan.",
    cvLayout: "Tartibli CV ko‘rinishi",
  },
  en: {
    navHome: "Home", navCreate: "Create CV", navTemplates: "Templates", navAbout: "About",
    heroEyebrow: "A new opportunity for your career", heroTitle: "Create a professional CV with ease",
    heroText: "Add your experience and skills, choose a template, and save your finished resume as a PDF.",
    create: "Create my CV", templates: "Explore templates", trusted: "For people ready for their next opportunity",
    quick: "Create a CV quickly and easily", english: "Resume in English", pdf: "Download as PDF", pro: "Professional templates",
    builderTag: "BUILD YOUR RESUME", builderTitle: "Your next chapter starts here",
    builderText: "Add your details — your resume updates live on the right.",
    stepOne: "Personal details", stepTwo: "Experience & skills", stepThree: "Education & languages",
    personal: "Personal information", fullName: "Full name", profession: "Profession or title",
    email: "Email", phone: "Phone", location: "City and country", linkedin: "LinkedIn URL",
    portfolio: "Portfolio or GitHub", professional: "Professional profile", about: "Short professional summary",
    experience: "Work experience", company: "Company", role: "Job title", period: "Dates",
    description: "Responsibilities and achievements", addExperience: "Add experience", skills: "Skills",
    skillsHint: "Separate with commas", education: "Education", school: "School or university", degree: "Degree or field",
    addEducation: "Add education", languages: "Languages", languagesHint: "For example: Uzbek — native, English — B2",
    livePreview: "Live preview", download: "Download PDF", polish: "Polish text",
    previewName: "Full Name", previewRole: "Your profession or title",
    summary: "PROFESSIONAL SUMMARY", work: "EXPERIENCE", skillsTitle: "SKILLS", educationTitle: "EDUCATION",
    languageTitle: "LANGUAGES", addDetails: "Your details will appear here", aboutTitle: "About us",
    templatesTitle: "Find your style", templatesText: "Each template is thoughtfully designed to be clear and easy for employers to scan.",
    modern: "Modern", classic: "Classic", minimal: "Minimal", footer: "Step forward with confidence.",
    namePlaceholder: "e.g. Alex Johnson", titlePlaceholder: "e.g. Product Designer",
    summaryPlaceholder: "Describe your key experience, strengths, and career goals…",
    companyPlaceholder: "Company name", rolePlaceholder: "e.g. Senior specialist",
    descriptionPlaceholder: "Describe your key responsibilities and results…", schoolPlaceholder: "University or college",
    degreePlaceholder: "e.g. BSc, Computer Science",     empty: "No information added",
    required: "Please enter your name and profession first.",
    copied: "Ready! The print window is open — choose ‘Save as PDF’.",
    templateApplied: "template selected.",
    projectTag: "MONTH 9 PROJECT", projectTitle: "A small team, a big opportunity",
    projectDescription: "AI CV Builder is a project created by a two-person team during month 9 to make resume building easier.",
    projectMonth: "Project month", projectTeam: "Team", people: "people",
    teamTag: "OUR TEAM", teamTitle: "Made by a team of two",
    memberOne: "Team member 1", memberTwo: "Team member 2",
    memberRole: "Project contributor",
    howTitle: "A ready CV in three steps", howText: "A simple process — add your details, choose a style, and download.",
    howOneTitle: "Add your details", howOneText: "Enter your contact details, experience, skills, and education.",
    howTwoTitle: "Choose a template", howTwoText: "Try a modern, classic, or minimal design.",
    howThreeTitle: "Save as PDF", howThreeText: "Use the print dialog to save your CV as a PDF.",
    sampleButton: "View sample CV", sampleLoaded: "Sample CV loaded — replace the details with your own.",
    projectGoalTitle: "Project goal", projectGoalText: "Make resume building clear and convenient: enter your details in one place, preview the result instantly, and save it as a PDF.",
    stackTitle: "Technologies used",
    aboutText: "A great CV opens the door to new opportunities. AI CV Builder was created to make resume building simple and accessible.",
    aiSuccess: "Text was tidied in your browser. An AI service is not connected in this version.",
    cvLayout: "Clean CV layout",
  },
};

const featureIcons = [Zap, Languages, Download, LayoutTemplate];
const featureKeys = ["quick", "english", "pdf", "pro"];
const templates = [
  { id: "modern", nameKey: "modern", className: "template-modern", accent: "#5f59ed" },
  { id: "classic", nameKey: "classic", className: "template-classic", accent: "#25314b" },
  { id: "minimal", nameKey: "minimal", className: "template-minimal", accent: "#b5744f" },
];

const sampleProfile = {
  name: "Dilnoza Karimova",
  title: "Frontend dasturchi",
  email: "dilnoza@example.com",
  phone: "+998 90 000 00 00",
  location: "Toshkent, O‘zbekiston",
  linkedin: "linkedin.com/in/dilnoza-karimova",
  portfolio: "github.com/dilnoza",
  summary: "Foydalanuvchilar uchun qulay va tezkor veb-ilovalar yaratishga qiziqadigan frontend dasturchi. React va zamonaviy JavaScript bilan amaliy loyihalar ishlab chiqqan.",
  skills: "HTML, CSS, JavaScript, React, Git, Responsive dizayn",
  experience: [{
    company: "Digital Solutions",
    role: "Frontend dasturchi",
    period: "2024 — hozirgacha",
    description: "React yordamida moslashuvchan sahifalar yaratdim. Jamoa bilan birga interfeys xatolarini tuzatib, foydalanuvchi tajribasini yaxshiladim.",
  }],
  education: [{
    school: "Toshkent Axborot Texnologiyalari Universiteti",
    degree: "Kompyuter injiniringi",
    period: "2020 — 2024",
  }],
  languages: "O‘zbek tili — ona tili, Ingliz tili — B2, Rus tili — B1",
};

function readSavedProfile() {
  try {
    const saved = localStorage.getItem("ai-cv-profile");
    return saved ? { ...initialData, ...JSON.parse(saved) } : initialData;
  } catch {
    return initialData;
  }
}

function improveLocally(profile) {
  const clean = (value) => value.trim().replace(/\s+/g, " ");
  return {
    ...profile,
    summary: clean(profile.summary),
    skills: profile.skills.split(",").map(clean).filter(Boolean).join(", "),
    experience: profile.experience.map((entry) => ({
      ...entry,
      company: clean(entry.company),
      role: clean(entry.role),
      period: clean(entry.period),
      description: clean(entry.description),
    })),
  };
}

function App() {
  const [language, setLanguage] = useState("uz");
  const [profile, setProfile] = useState(readSavedProfile);
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [notice, setNotice] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    localStorage.setItem("ai-cv-profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(null), 4600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const skillList = useMemo(
    () => profile.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
    [profile.skills],
  );

  function updateField(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function updateEntry(section, index, field, value) {
    setProfile((current) => ({
      ...current,
      [section]: current[section].map((entry, entryIndex) => entryIndex === index ? { ...entry, [field]: value } : entry),
    }));
  }

  function addEntry(section) {
    const blank = section === "experience"
      ? { company: "", role: "", period: "", description: "" }
      : { school: "", degree: "", period: "" };
    setProfile((current) => ({ ...current, [section]: [...current[section], blank] }));
  }

  function removeEntry(section, index) {
    setProfile((current) => ({
      ...current,
      [section]: current[section].length > 1
        ? current[section].filter((_, entryIndex) => entryIndex !== index)
        : current[section].map((entry, entryIndex) => entryIndex === index
          ? Object.fromEntries(Object.keys(entry).map((key) => [key, ""]))
          : entry),
    }));
  }

  function improveResume() {
    if (!profile.name.trim() || !profile.title.trim()) {
      setNotice({ type: "error", text: t.required });
      return;
    }
    setProfile(improveLocally(profile));
    setNotice({ type: "info", text: t.aiSuccess });
  }

  function loadSample() {
    setProfile(sampleProfile);
    setActiveTemplate("modern");
    setNotice({ type: "success", text: t.sampleLoaded });
    navigateTo("builder");
  }

  function downloadPdf() {
    if (!profile.name.trim()) {
      setNotice({ type: "error", text: t.required });
      return;
    }
    window.print();
  }

  function navigateTo(id) {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function renderField(label, field, placeholder, options = {}) {
    const { icon: Icon, type = "text", multiline = false, full = false } = options;
    const common = {
      id: field,
      name: field,
      value: profile[field],
      placeholder,
      onChange: (event) => updateField(field, event.target.value),
      className: `field-control${Icon ? " field-with-icon" : ""}`,
      type,
    };
    return (
      <label className={`field${full ? " field-full" : ""}`} htmlFor={field}>
        <span className="field-label">{label}</span>
        <span className="input-shell">
          {Icon && <Icon size={16} aria-hidden="true" />}
          {multiline
            ? <textarea {...common} rows={4} />
            : <input {...common} />}
        </span>
      </label>
    );
  }

  function renderDynamicEntry(section, entry, index, fields) {
    return (
      <div className="entry-card" key={`${section}-${index}`}>
        <div className="entry-heading">
          <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
          {profile[section].length > 1 && (
            <button className="icon-button remove-button" type="button" aria-label="Remove" onClick={() => removeEntry(section, index)}>
              <Trash2 size={15} />
            </button>
          )}
        </div>
        <div className="form-grid">
          {fields.map(({ key, label, placeholder, full }) => (
            <label className={`field${full ? " field-full" : ""}`} htmlFor={`${section}-${index}-${key}`} key={key}>
              <span className="field-label">{label}</span>
              {key === "description" ? (
                <textarea
                  className="field-control textarea-control"
                  id={`${section}-${index}-${key}`}
                  rows={3}
                  placeholder={placeholder}
                  value={entry[key]}
                  onChange={(event) => updateEntry(section, index, key, event.target.value)}
                />
              ) : (
                <input
                  className="field-control"
                  id={`${section}-${index}-${key}`}
                  placeholder={placeholder}
                  value={entry[key]}
                  onChange={(event) => updateEntry(section, index, key, event.target.value)}
                />
              )}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigateTo("home"); }}>
            <span className="brand-mark"><Sparkles size={19} fill="currentColor" /></span>
            <span>AI CV <strong>Builder</strong></span>
          </a>
          <nav className={`main-nav${mobileMenuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
            <button onClick={() => navigateTo("home")}>{t.navHome}</button>
            <button onClick={() => navigateTo("builder")}>{t.navCreate}</button>
            <button onClick={() => navigateTo("templates")}>{t.navTemplates}</button>
            <button onClick={() => navigateTo("about")}>{t.navAbout}</button>
          </nav>
          <div className="header-actions">
            <label className="language-select" aria-label="Language">
              <Globe2 size={15} />
              <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                <option value="uz">UZ</option>
                <option value="en">EN</option>
              </select>
              <ChevronDown size={13} />
            </label>
            <button className="button button-primary header-cta" onClick={() => navigateTo("builder")}>
              {t.create}<ArrowRight size={16} />
            </button>
            <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-sparkle"><Sparkles size={14} /></span>{t.heroEyebrow}</div>
            <h1>{t.heroTitle}</h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-buttons">
              <button className="button button-primary button-large" onClick={() => navigateTo("builder")}>
                {t.create}<ArrowRight size={17} />
              </button>
              <button className="button button-secondary button-large" onClick={() => navigateTo("templates")}>
                {t.templates}<ArrowDown size={16} />
              </button>
            </div>
            <div className="hero-social-proof"><div className="proof-avatars"><i>D</i><i>A</i><i>M</i><i>+</i></div><span>{t.trusted}</span></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="floating-chip chip-top"><span className="chip-check"><Check size={13} /></span>{t.cvLayout} <span className="chip-sparkle">✦</span></div>
            <div className="hero-document">
              <div className="doc-top"><div className="doc-avatar">AK</div><div><b>Alexandra Kim</b><span>Product Designer</span></div><div className="doc-dots">•••</div></div>
              <div className="doc-contact"><span><Mail size={10} /> alex.kim@email.com</span><span><MapPin size={10} /> New York, NY</span></div>
              <div className="doc-section"><b>PROFILE</b><i className="doc-line long" /><i className="doc-line medium" /><i className="doc-line short" /></div>
              <div className="doc-section"><b>EXPERIENCE</b><div className="doc-experience"><span className="doc-bullet" /><div><strong>Senior Product Designer</strong><i className="doc-line long" /><i className="doc-line medium" /></div></div><div className="doc-experience"><span className="doc-bullet lilac" /><div><strong>Product Designer</strong><i className="doc-line medium" /><i className="doc-line short" /></div></div></div>
              <div className="doc-section doc-skills"><b>SKILLS</b><span>Product design</span><span>Figma</span><span>UX research</span></div>
              <div className="doc-ai-badge"><span><FileText size={14} /></span><div><b>CV preview</b><small>Ready for your next role</small></div><Check size={16} /></div>
            </div>
            <div className="floating-chip chip-bottom"><span className="purple-spark">✦</span> Your next chapter starts here</div>
            <div className="hero-decoration decoration-one" /><div className="hero-decoration decoration-two" />
          </div>
        </section>

        <section className="feature-strip" aria-label="Features">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return <div className="feature-item" key={key}><span className={`feature-icon feature-icon-${index}`}><Icon size={18} /></span><span>{t[key]}</span>{index < featureKeys.length - 1 && <i className="feature-separator" />}</div>;
          })}
        </section>

        <section className="how-section section-wrap">
          <div className="section-heading">
            <span className="section-kicker"><Check size={14} /> {language === "uz" ? "QANDAY ISHLAYDI" : "HOW IT WORKS"}</span>
            <h2>{t.howTitle}</h2>
            <p>{t.howText}</p>
          </div>
          <div className="how-grid">
            {[
              { icon: UserRound, title: t.howOneTitle, text: t.howOneText },
              { icon: LayoutTemplate, title: t.howTwoTitle, text: t.howTwoText },
              { icon: Download, title: t.howThreeTitle, text: t.howThreeText },
            ].map(({ icon: Icon, title, text }, index) => (
              <article className="how-card" key={title}>
                <span className="how-number">0{index + 1}</span>
                <span className="how-icon"><Icon size={19} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="builder-section section-wrap" id="builder">
          <div className="section-heading">
            <span className="section-kicker"><WandSparkles size={14} /> {t.builderTag}</span>
            <h2>{t.builderTitle}</h2>
            <p>{t.builderText}</p>
            <button className="button button-secondary sample-button" type="button" onClick={loadSample}>
              <FileText size={15} />{t.sampleButton}
            </button>
          </div>
          <div className="builder-layout">
            <div className="form-panel">
              <div className="step-indicator">
                <span className="step active"><i>1</i>{t.stepOne}</span><b />
                <span className="step active"><i>2</i>{t.stepTwo}</span><b />
                <span className="step active"><i>3</i>{t.stepThree}</span>
              </div>
              <section className="form-section">
                <div className="form-section-title"><span className="form-section-icon"><UserRound size={17} /></span><div><h3>{t.personal}</h3><p>{language === "uz" ? "Ish beruvchilar siz bilan bog‘lanishi uchun" : "So employers can get in touch"}</p></div></div>
                <div className="form-grid">
                  {renderField(t.fullName, "name", t.namePlaceholder)}
                  {renderField(t.profession, "title", t.titlePlaceholder)}
                  {renderField(t.email, "email", "hello@example.com", { icon: Mail, type: "email" })}
                  {renderField(t.phone, "phone", "+998 90 123 45 67", { icon: BriefcaseBusiness, type: "tel" })}
                  {renderField(t.location, "location", "Toshkent, O‘zbekiston", { icon: MapPin })}
                  {renderField(t.linkedin, "linkedin", "linkedin.com/in/username", { icon: Linkedin, type: "url" })}
                  {renderField(t.portfolio, "portfolio", "github.com/username", { icon: Github, type: "url" })}
                </div>
              </section>
              <section className="form-section">
                <div className="form-section-title"><span className="form-section-icon icon-lilac"><BriefcaseBusiness size={17} /></span><div><h3>{t.professional}</h3><p>{language === "uz" ? "Tajriba va kuchli tomonlaringizni ko‘rsating" : "Showcase your experience and strengths"}</p></div></div>
                <div className="form-grid">
                  {renderField(t.about, "summary", t.summaryPlaceholder, { multiline: true, full: true })}
                </div>
                <div className="subsection-header"><h4>{t.experience}</h4><span className="subsection-line" /></div>
                {profile.experience.map((entry, index) => renderDynamicEntry("experience", entry, index, [
                  { key: "company", label: t.company, placeholder: t.companyPlaceholder },
                  { key: "role", label: t.role, placeholder: t.rolePlaceholder },
                  { key: "period", label: t.period, placeholder: language === "uz" ? "2022 — hozirgacha" : "2022 — Present" },
                  { key: "description", label: t.description, placeholder: t.descriptionPlaceholder, full: true },
                ]))}
                <button className="add-entry-button" type="button" onClick={() => addEntry("experience")}><Plus size={15} />{t.addExperience}</button>
                <label className="field skill-field" htmlFor="skills"><span className="field-label">{t.skills}</span><input className="field-control" id="skills" placeholder={`${language === "uz" ? "Figma, UX dizayn, loyiha boshqaruvi" : "Figma, UX design, project management"} (${t.skillsHint})`} value={profile.skills} onChange={(event) => updateField("skills", event.target.value)} /></label>
              </section>
              <section className="form-section last-form-section">
                <div className="form-section-title"><span className="form-section-icon icon-peach"><GraduationCap size={17} /></span><div><h3>{t.education} & {t.languages}</h3><p>{language === "uz" ? "Ta’lim va biladigan tillaringizni kiriting" : "Add your education and languages"}</p></div></div>
                <div className="subsection-header"><h4>{t.education}</h4><span className="subsection-line" /></div>
                {profile.education.map((entry, index) => renderDynamicEntry("education", entry, index, [
                  { key: "school", label: t.school, placeholder: t.schoolPlaceholder },
                  { key: "degree", label: t.degree, placeholder: t.degreePlaceholder },
                  { key: "period", label: t.period, placeholder: "2018 — 2022", full: true },
                ]))}
                <button className="add-entry-button" type="button" onClick={() => addEntry("education")}><Plus size={15} />{t.addEducation}</button>
                {renderField(t.languages, "languages", t.languagesHint, { icon: Globe2, full: true })}
              </section>
              <div className="form-actions">
                <button className="button button-ai" onClick={improveResume}>
                  <Sparkles size={17} />
                  {t.polish}
                </button>
                <span className="privacy-note"><Check size={13} />{language === "uz" ? "Ma’lumotlaringiz shu qurilmada saqlanadi" : "Your details are saved on this device"}</span>
              </div>
            </div>

            <aside className="preview-column">
              <div className="preview-toolbar"><div><span className="preview-live-dot" /><strong>{t.livePreview}</strong></div><button className="preview-download" onClick={downloadPdf}><Download size={15} /><span>{t.download}</span></button></div>
              <article className={`resume-paper ${templates.find((item) => item.id === activeTemplate)?.className}`} id="resume-paper">
                <div className="resume-header">
                  <h2>{profile.name || t.previewName}</h2><p>{profile.title || t.previewRole}</p>
                  <div className="resume-contact">
                    {profile.email && <span><Mail size={11} />{profile.email}</span>}
                    {profile.phone && <span><BriefcaseBusiness size={11} />{profile.phone}</span>}
                    {profile.location && <span><MapPin size={11} />{profile.location}</span>}
                    {profile.linkedin && <span><Linkedin size={11} />{profile.linkedin}</span>}
                    {profile.portfolio && <span><Globe2 size={11} />{profile.portfolio}</span>}
                  </div>
                </div>
                {profile.summary && <section className="resume-section"><h3>{t.summary}</h3><p>{profile.summary}</p></section>}
                {profile.experience.some((entry) => entry.company || entry.role || entry.description) && (
                  <section className="resume-section"><h3>{t.work}</h3>{profile.experience.filter((entry) => entry.company || entry.role || entry.description).map((entry, index) => <div className="resume-entry" key={index}><div className="resume-entry-heading"><strong>{entry.role || entry.company}</strong><span>{entry.period}</span></div><p className="resume-company">{entry.role && entry.company}</p>{entry.description && <p>{entry.description}</p>}</div>)}</section>
                )}
                {skillList.length > 0 && <section className="resume-section"><h3>{t.skillsTitle}</h3><div className="resume-skills">{skillList.map((skill) => <span key={skill}>{skill}</span>)}</div></section>}
                {profile.education.some((entry) => entry.school || entry.degree) && <section className="resume-section"><h3>{t.educationTitle}</h3>{profile.education.filter((entry) => entry.school || entry.degree).map((entry, index) => <div className="resume-entry" key={index}><div className="resume-entry-heading"><strong>{entry.school}</strong><span>{entry.period}</span></div><p>{entry.degree}</p></div>)}</section>}
                {profile.languages && <section className="resume-section"><h3>{t.languageTitle}</h3><p>{profile.languages}</p></section>}
                {!profile.summary && !profile.experience.some((entry) => entry.company || entry.role) && skillList.length === 0 && !profile.education.some((entry) => entry.school) && <div className="resume-empty"><span><FileText size={24} /></span><p>{t.addDetails}</p></div>}
                <div className="resume-footer"><span>AI CV Builder</span><Sparkles size={12} /></div>
              </article>
              <div className="template-picker"><div><strong>{t.templates}</strong><span>{language === "uz" ? "Birini tanlang" : "Choose a style"}</span></div>{templates.map((template) => <button type="button" key={template.id} className={`template-option${activeTemplate === template.id ? " selected" : ""}`} onClick={() => { setActiveTemplate(template.id); setNotice({ type: "success", text: `${t[template.nameKey]} ${t.templateApplied}` }); }} aria-label={`${t[template.nameKey]} template`}><span className={`template-thumb ${template.className}`}><i /><i /><i /></span><span>{t[template.nameKey]}</span></button>)}</div>
            </aside>
          </div>
        </section>

        <section className="templates-section" id="templates">
          <div className="section-wrap templates-inner">
            <div className="templates-copy"><span className="section-kicker"><LayoutTemplate size={14} /> {t.navTemplates}</span><h2>{t.templatesTitle}</h2><p>{t.templatesText}</p><button className="text-link" onClick={() => navigateTo("builder")}>{t.create}<ArrowUpRight size={16} /></button></div>
            <div className="template-showcase">{templates.map((template) => <button type="button" key={template.id} className={`showcase-card ${template.className}${activeTemplate === template.id ? " showcase-active" : ""}`} onClick={() => { setActiveTemplate(template.id); navigateTo("builder"); }}><div className="showcase-mini"><div className="mini-head" /><i /><i /><i /><i /><div className="mini-columns"><span /><span /></div></div><span>{t[template.nameKey]}<ArrowUpRight size={13} /></span></button>)}</div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="project-card">
            <div className="project-icon"><Sparkles size={22} /></div>
            <div className="project-copy">
              <span className="section-kicker">{t.projectTag}</span>
              <h2>{t.projectTitle}</h2>
              <p>{t.projectDescription}</p>
            </div>
            <div className="project-facts">
              <div><strong>09</strong><span>{t.projectMonth}</span></div>
              <div><strong>02</strong><span>{t.projectTeam}</span></div>
            </div>
          </div>
          <div className="team-heading">
            <div><span className="section-kicker"><Users size={14} /> {t.teamTag}</span><h3>{t.teamTitle}</h3></div>
            <span className="team-count">02 {t.people}</span>
          </div>
          <div className="team-grid">
            {[t.memberOne, t.memberTwo].map((member, index) => (
              <article className="team-card" key={member}>
                <span className={`team-avatar team-avatar-${index + 1}`}>0{index + 1}</span>
                <div><h4>{member}</h4><p>{t.memberRole}</p></div>
                <Check size={17} aria-label={language === "uz" ? "Jamoa a’zosi" : "Team member"} />
              </article>
            ))}
          </div>
          <div className="project-details-grid">
            <article className="project-detail-card">
              <span className="section-kicker">{t.projectGoalTitle}</span>
              <p>{t.projectGoalText}</p>
            </article>
            <article className="project-detail-card">
              <span className="section-kicker"><LayoutTemplate size={14} /> {t.stackTitle}</span>
              <div className="tech-list">
                {["React", "Vite", "JavaScript", "CSS", "Lucide React"].map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-inner"><a className="brand footer-brand" href="#home" onClick={(event) => { event.preventDefault(); navigateTo("home"); }}><span className="brand-mark"><Sparkles size={17} fill="currentColor" /></span><span>AI CV <strong>Builder</strong></span></a><span>{t.footer}</span><span>© {new Date().getFullYear()} AI CV Builder</span></div></footer>

      {notice && <div className={`toast toast-${notice.type}`} role="status"><span>{notice.type === "success" ? <Check size={16} /> : <CircleHelp size={16} />}</span>{notice.text}<button aria-label="Dismiss" onClick={() => setNotice(null)}><X size={15} /></button></div>}
      <div className="print-only">{t.copied}</div>
    </div>
  );
}

export default App;
