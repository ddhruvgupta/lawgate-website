import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  FileSearch,
  Globe,
  GraduationCap,
  Handshake,
  IndianRupee,
  Layers,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import shishirImg from "../../../imgs/shishir.png";
import ringeImg from "../../../imgs/ringe.png";
import bhaumikImg from "../../../imgs/bhaumik.png";
import archanaImg from "../../../imgs/archana.png";
import jahnviImg from "../../../imgs/jahnvi.jpg";

const stats = [
  {
    label: "Years of combined leadership experience",
    value: "32+",
  },
  {
    label: "Arbitration & dispute mandates coordinated",
    value: "200+",
  },
  {
    label: "Big-4 pedigree in our advisory bench",
    value: "15+ yrs",
  },
  {
    label: "India-focused practice history",
    value: "100%",
  },
];

const audiences = [
  "Foreign companies & multinationals establishing an India presence",
  "Overseas startups scaling into India’s digital-first consumer market",
  "Family offices and private investors seeking compliant India exposure",
  "International consultants who require India-specific execution support",
  "Joint venture partners that need a reliable Indian coordination desk",
];

const services = [
  {
    title: "FDI Advisory & Investment Strategy",
    icon: Globe,
    points: [
      "Entry-route mapping across automatic & approval channels",
      "Sectoral cap analysis, policy intelligence, and risk assessments",
      "Government incentive discovery tied to PLI and state schemes",
    ],
  },
  {
    title: "Business Establishment & Structuring",
    icon: Building2,
    points: [
      "Subsidiary, JV, LLP, branch, or liaison office incorporation",
      "Shareholder documentation and director onboarding",
      "Registered office, MCA filings, and governance documentation",
    ],
  },
  {
    title: "Regulatory & Compliance Advisory",
    icon: ShieldCheck,
    points: [
      "FEMA, RBI, SEBI, IRDAI, and sector approvals coordination",
      "ODI / FDI reporting, ECB filings, GST registration & filings",
      "Ongoing compliance programmes with proactive monitoring",
    ],
  },
  {
    title: "International Tax & Transfer Pricing",
    icon: IndianRupee,
    points: [
      "Cross-border tax structuring and DTAA optimisation",
      "Transfer pricing design, documentation, and defence strategies",
      "Tax due diligence for acquisitions, restructuring, and exits",
    ],
  },
  {
    title: "Dispute Risk & Arbitration Readiness",
    icon: Scale,
    points: [
      "Legal diligence on Indian target entities and counter-parties",
      "Contractual risk mitigation frameworks & documentation playbooks",
      "Arbitration coordination and enforcement of foreign awards",
    ],
  },
  {
    title: "Market Intelligence & Business Development",
    icon: Users,
    points: [
      "Feasibility studies, partner vetting, and government connects",
      "Access to incentives, grants, and regulatory briefings",
      "Cultural advisory for boards and international leadership teams",
    ],
  },
];

const advantages = [
  "India-only focus ensures encyclopedic regulatory depth and speed.",
  "Single-window accountability orchestrates legal, tax, and compliance partners.",
  "Access to elite advocates empanelled with DIAC, ICA, IITArb, CIAC, and Delhi High Court.",
  "Big-4 chartered accountancy pedigree for international tax and transfer pricing.",
  "Ethically compliant facilitation model that keeps advocacy conflict-free.",
  "Confidential, milestone-linked delivery that protects strategic positions.",
];

const engagementPhases = [
  {
    phase: "Phase 1",
    title: "Discovery & Assessment",
    details: [
      "Confidential consultation to understand objectives, risk appetite, and timelines.",
      "Preliminary FDI route and regulatory mapping with sector watchpoints.",
      "Engagement charter and milestone-linked commercial structure.",
    ],
  },
  {
    phase: "Phase 2",
    title: "Structuring & Strategy",
    details: [
      "Recommended entity structure with tax, DTAA, and governance overlays.",
      "Introduction to hand-picked legal counsel and chartered accountants.",
      "Implementation roadmap aligned with capital deployment schedules.",
    ],
  },
  {
    phase: "Phase 3",
    title: "Execution & Incorporation",
    details: [
      "Incorporation, board formation, and statutory filings end-to-end.",
      "FEMA/RBI compliance, shareholder agreements, and banking coordination.",
      "Sector licences, approvals, and policy interactions handled on your behalf.",
    ],
  },
  {
    phase: "Phase 4",
    title: "Ongoing Advisory & Compliance",
    details: [
      "Annual compliance, regulatory horizon scanning, and impact alerts.",
      "Transfer pricing documentation, tax filings, and dispute prevention.",
      "Strategic advisory, business partner diligence, and pre-litigation monitoring.",
    ],
  },
];

const leadership = [
  {
    name: "Shishir Gupta",
    role: "Founder & Managing Director — Industrial Engineer & Techno-Legal Expert",
    image: shishirImg,
    imageFrameClass: "w-64 h-64 md:w-72 md:h-72",
    imageClass: "scale-150 object-[center_30%]",
    summary:
      "Empanelled arbitrator and counsel with 200+ arbitration mandates led, blending engineering rigour with contract mastery.",
    credentials: [
      "Member: Delhi International Arbitration Centre, Indian Council of Arbitration, IITArb, CIAC.",
    ],
  },
  {
    name: "Akshay Girish Ringe",
    role: "Advocate-on-Record, Supreme Court of India",
    image: ringeImg,
    imageClass: "object-[center_10%]",
    summary:
      "Handles constitutional, commercial, and regulatory litigation before the Supreme Court, Delhi High Court, and tribunals.",
    credentials: [
      "Empanelled with Competition Commission of India & Delhi High Court MIG Legal Aid.",
    ],
  },
  {
    name: "Sanjoy Bhaumik",
    role: "Senior Legal Associate — Advocate, Delhi High Court",
    image: bhaumikImg,
    imageClass: "scale-125 object-[center_10%]",
    summary:
      "Three decades of courtroom advocacy on commercial law, infrastructure disputes, and contract enforcement.",
    credentials: [
      "Bar Council of Delhi, Delhi High Court Bar Association since 1988.",
    ],
  },
  {
    name: "Archana Gupta (FCA)",
    role: "International Tax & Transfer Pricing Partner",
    image: archanaImg,
    imageFrameClass: "w-64 h-64 md:w-72 md:h-72",
    imageClass: "scale-100 object-[center_30%]",
    summary:
      "Ex-EY Associate Partner with 15+ years advising Fortune 500 clients on cross-border tax and TP strategy.",
    credentials: ["Fellow, Institute of Chartered Accountants of India."],
  },
  {
    name: "Jahnvi Gupta",
    role: "Business Development & Administration Manager",
    image: jahnviImg,
    summary:
      "Leads strategic partnerships, global liaison, and operational excellence for Law Gate’s India desk.",
    credentials: [
      "BBA — Christ University | MS (IT) — Georgia State University.",
    ],
  },
];

const sectors = [
  "Infrastructure & Construction",
  "Energy & Power Generation",
  "Real Estate & Housing",
  "Information Technology & Digital Media",
  "Defence & Government Undertakings",
  "Financial Services & Fintech",
  "Healthcare & Pharmaceuticals",
];

const representativeClients = [
  "National Projects Construction Corporation",
  "Airport Authority of India",
  "Megha Engineering & Infrastructures",
  "DRDO",
  "Simplex Infrastructure",
  "Haryana Power Generation Corporation",
  "Mysore Palace Board",
  "Rattanindia Power",
  "SAAB India Technologies",
  "Hungama Digital Media",
];

const compliancePoints = [
  "Clear separation between facilitation (Law Gate) and legal practice (independent advocates).",
  "No solicitation in violation of Bar Council regulations; all engagements are referral and relationship driven.",
  "Conflict-of-interest checks at inception plus NDA-backed confidentiality for every mandate.",
  "Data protection aligned with India’s emerging Personal Data Protection framework.",
  "Transparent, milestone-linked fee structures documented before execution begins.",
];

export const AboutPage = () => {
  return (
    <div className="bg-gray-50 pt-24">
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl">
            <p className="uppercase tracking-wide text-white/80 text-sm mb-4">
              Engage Law Gate OPC Pvt. Ltd.
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 !text-white">
              Strategic legal & investment facilitation for India-bound global
              investors
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Based in New Delhi, we orchestrate an elite network of advocates,
              chartered accountants, and regulatory specialists to turn India’s
              regulatory complexity into your competitive edge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-primary font-semibold rounded-md hover:bg-white"
              >
                Schedule a confidential consult
                <ArrowUpRight className="h-5 w-5 ml-2" />
              </Link>
              <a
                href="mailto:shishir@lawgate.in"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/40 rounded-md text-white hover:bg-white/10"
              >
                Email shishir@lawgate.in
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <p className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="uppercase text-secondary font-semibold mb-3">
              Who We Serve
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary mb-6">
              Your trusted gateway to compliant growth in India
            </h2>
            <p className="text-gray-600 mb-6">
              We are not a traditional law firm. Law Gate is a strategic
              facilitation and coordination platform that assigns you a single
              accountable relationship manager while mobilising vetted legal,
              tax, compliance, and sector specialists.
            </p>
            <ul className="space-y-3">
              {audiences.map((item) => (
                <li key={item} className="flex items-start text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-secondary mr-3 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-sm uppercase text-secondary font-semibold mb-2">
              Our Mission
            </p>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              Transform regulatory complexity into strategic advantage.
            </h3>
            <p className="text-gray-600 mb-4">
              Every mandate is engineered to deliver structured, compliant, and
              commercially intelligent market entry. We coordinate advocacy,
              finance, and compliance so global boards can focus on opportunity,
              not red tape.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">Head Office</p>
                <p className="font-semibold text-primary">
                  27, Siri Fort Road, New Delhi
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-500">Direct Line</p>
                <p className="font-semibold text-primary">+91 966 788 7033</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="uppercase text-secondary font-semibold">
              Integrated Services
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary mt-2">
              Single-window facilitation across the full investment lifecycle
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <service.icon className="h-8 w-8 text-secondary mr-3" />
                  <h3 className="text-xl font-semibold text-primary">
                    {service.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start">
                      <ArrowUpRight className="h-4 w-4 text-secondary mr-2 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary text-white rounded-3xl p-10">
          <div className="text-center mb-8">
            <span className="block uppercase text-secondary font-semibold text-sm mb-3 tracking-wider">
              Why Law Gate
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-white">
              One partner. Complete ecosystem access. Faster execution.
            </h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {advantages.map((advantage) => (
              <li key={advantage} className="flex items-start">
                <Handshake className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/90">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="uppercase text-secondary font-semibold">
              Engagement Model
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary mt-2">
              Milestone-driven delivery with complete accountability
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {engagementPhases.map((phase) => (
              <div
                key={phase.title}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <p className="text-sm uppercase text-secondary font-semibold">
                  {phase.phase}
                </p>
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {phase.details.map((detail) => (
                    <li key={detail} className="flex items-start">
                      <Layers className="h-4 w-4 text-secondary mr-2 mt-1" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="uppercase text-secondary font-semibold">
            Leadership & Network
          </p>
          <h2 className="text-3xl font-heading font-bold text-primary mt-2">
            Seasoned advocates, Big-4 finance, and global liaison capabilities
          </h2>
        </div>
        <div className="space-y-6">
          {leadership.map((leader) => (
            <div
              key={leader.name}
              className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-md"
            >
              <div
                className={`w-64 h-64 rounded-full overflow-hidden shadow ring-2 ring-primary/10 flex-shrink-0 flex items-center justify-center ${leader.imageFrameClass ?? ""}`}
                style={{ backgroundColor: "#bfbeba" }}
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className={`w-full h-full object-cover ${leader.imageClass ?? ""}`}
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-gray-500">{leader.role}</p>
                  </div>
                  <GraduationCap className="h-6 w-6 text-secondary self-start" />
                </div>
                <p className="text-gray-700 mb-3">{leader.summary}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {leader.credentials.map((credential) => (
                    <li key={credential} className="flex items-start">
                      <FileSearch className="h-4 w-4 text-secondary mr-2 mt-0.5" />
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <p className="uppercase text-secondary font-semibold mb-2">
                Track Record
              </p>
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                Trusted across mission-critical infrastructure, energy, and
                technology mandates
              </h2>
              <p className="text-gray-600 mb-6">
                Law Gate has advised or coordinated disputes for marquee names
                spanning public sector undertakings, multinational EPC
                contractors, defence integrators, and digital-first enterprises.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {representativeClients.map((client) => (
                  <div
                    key={client}
                    className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="uppercase text-secondary font-semibold mb-2">
                Sectors We Serve
              </p>
              <div className="space-y-3">
                {sectors.map((sector) => (
                  <div
                    key={sector}
                    className="flex items-center bg-primary/5 rounded-xl p-4"
                  >
                    <Building2 className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary text-white rounded-3xl p-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="uppercase text-secondary font-semibold text-sm mb-2">
                Ethical & Legal Compliance
              </p>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Governance-first engagement ethos
              </h2>
              <p className="text-white/80">
                Compliance is not a checkbox — it is our operating system. Every
                engagement is structured to shield your capital, data, IP, and
                reputation while meeting both Indian and international
                standards.
              </p>
            </div>
            <ul className="space-y-3">
              {compliancePoints.map((point) => (
                <li key={point} className="flex items-start text-white/90">
                  <ShieldCheck className="h-5 w-5 text-secondary mr-3 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="uppercase text-secondary font-semibold mb-3">
            Ready to Enter India?
          </p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Let’s design your compliant, board-ready market entry playbook.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Schedule a complimentary discovery call with Founder & Managing
            Director Shishir Gupta or International Liaison Jahnvi Gupta. Expect
            a preliminary assessment within five business days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md font-semibold"
            >
              Book a discovery call
            </Link>
            <a
              href="tel:+919667887033"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md font-semibold"
            >
              Call +91 966 788 7033
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
