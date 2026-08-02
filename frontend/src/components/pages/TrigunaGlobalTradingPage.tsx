import { Link } from 'react-router-dom';
import { Building2, Briefcase, Cpu, Droplet, HeartPulse, Leaf, MapPin, Zap, Globe2, Handshake, Layers, ShieldCheck, Users } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui';
import powerUtilitiesImg from '../../../imgs/Power & Utilities.jpeg';
import waterImg from '../../../imgs/Water, Wastewater & Desalination.jpeg';
import electronicsImg from '../../../imgs/Electronics & Manufacturing.jpeg';
import constructionImg from '../../../imgs/Construction, Roads & Infrastructure.jpeg';
import renewableImg from '../../../imgs/Renewable Energy & Sustainability.jpeg';
import healthcareImg from '../../../imgs/Healthcare, Pharma & Life Sciences.jpeg';
import industrialImg from '../../../imgs/Industrial Engineering.jpeg';
import publicSectorImg from '../../../imgs/Government-Linked Projects & Public Sector Opportunities.jpeg';

const capabilities = [
  {
    title: 'Strategic partnership development',
    description:
      'We identify and coordinate with credible partners, vendors, consultants, contractors, technology providers and execution agencies.',
    icon: Handshake,
  },
  {
    title: 'Market access and representation',
    description:
      'We help companies enter India and selected global markets through structured introductions, capability presentations and stakeholder engagement.',
    icon: Globe2,
  },
  {
    title: 'Project facilitation',
    description:
      'From opportunity identification to partner alignment, documentation and commercial readiness, we support the full journey.',
    icon: Layers,
  },
  {
    title: 'Government and institutional liaison support',
    description:
      'We coordinate engagement with public-sector stakeholders, regulators, authorities and institutional bodies with discipline and professionalism.',
    icon: Building2,
  },
  {
    title: 'Commercial coordination',
    description:
      'We manage follow-ups, meeting preparation, documentation discipline, proposal support and partner communication through execution.',
    icon: Users,
  },
  {
    title: 'Risk-aware execution support',
    description:
      'Backed by Law Gate’s dispute-resolution and advisory background, our model is grounded in contract awareness and practical risk management.',
    icon: ShieldCheck,
  },
];

const sectors = [
  {
    label: 'Power & Utilities',
    icon: Zap,
    image: powerUtilitiesImg,
    description: 'Structured delivery for energy and utility infrastructure projects.',
  },
  {
    label: 'Water, Wastewater & Desalination',
    icon: Droplet,
    image: waterImg,
    description: 'Pipeline and treatment systems for clean water and desalination programmes.',
  },
  {
    label: 'Electronics & Manufacturing',
    icon: Cpu,
    image: electronicsImg,
    description: 'Advanced manufacturing and electronics production capability support.',
  },
  {
    label: 'Construction, Roads & Infrastructure',
    icon: MapPin,
    image: constructionImg,
    description: 'Project coordination for construction, roads and major infrastructure works.',
  },
  {
    label: 'Renewable Energy & Sustainability',
    icon: Leaf,
    image: renewableImg,
    description: 'Clean energy and sustainability initiatives with partner-ready solutions.',
  },
  {
    label: 'Healthcare, Pharma & Life Sciences',
    icon: HeartPulse,
    image: healthcareImg,
    description: 'Regulated healthcare and pharma sector support grounded in expertise.',
  },
  {
    label: 'Industrial Engineering & Project Consulting',
    icon: Briefcase,
    image: industrialImg,
    description: 'Consulting-led coordination for engineering and industrial project delivery.',
  },
  {
    label: 'Government-linked projects & public-sector opportunities',
    icon: Globe2,
    image: publicSectorImg,
    description: 'Trusted engagement for government and public-sector linked programmes.',
  },
];

const partnershipSteps = [
  {
    step: '01',
    title: 'Identify',
    description: 'We identify relevant opportunities, sectors, markets, stakeholders and collaboration areas.',
  },
  {
    step: '02',
    title: 'Connect',
    description: 'We connect companies with credible partners, institutional stakeholders and business counterparts.',
  },
  {
    step: '03',
    title: 'Position',
    description: 'We present capabilities clearly through profiles, presentations, proposals and sector-specific narratives.',
  },
  {
    step: '04',
    title: 'Coordinate',
    description: 'We support meetings, follow-ups, documentation, commercial discussions and local representation.',
  },
  {
    step: '05',
    title: 'Enable',
    description: 'We help move conversations toward project development, commercial closure, implementation and long-term partnership.',
  },
];

export const TrigunaGlobalTradingPage = () => {
  return (
    <div className="bg-gray-50 pt-24">
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl">
            <p className="uppercase tracking-wide text-white/80 text-sm mb-4">
              Triguna Global Trading
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 !text-white">
              Connecting capability with opportunity.
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-3xl">
              Triguna Global Trading is the strategic business-development and trade-facilitation brand of Engage Law Gate OPC Pvt. Ltd., created to connect credible companies, sector experts, project owners and institutional stakeholders across India and global markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">
                  Explore collaboration opportunities
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/about">
                  Learn about Law Gate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            What we do
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
            A partnership-led growth platform for complex, high-opportunity sectors.
          </h2>
          <p className="text-lg text-gray-600">
            We help businesses move beyond introductions by building credibility, coordinating stakeholders and maintaining follow-through until conversations become structured commercial outcomes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-primary-dark">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Sectors we work across
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
              Built for access. Structured for execution.
            </h2>
            <p className="text-lg text-gray-600">
              Our ecosystem spans infrastructure, energy, water, manufacturing, electronics, healthcare and public-sector-linked opportunities where technical capability, government interface and trusted relationships matter.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sectors.map((sector) => (
              <div key={sector.label} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={sector.image}
                    alt={sector.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-secondary shadow-sm">
                    <sector.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xl font-semibold text-slate-900 leading-8 mb-2">
                    {sector.label}
                  </p>
                  <p className="text-sm text-slate-600 leading-6">
                    {sector.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
              Our partnership model
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
              Structured support for every stage of collaboration.
            </h2>
          </div>
          <div className="grid gap-4">
            {partnershipSteps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-[1.5rem] border border-gray-200 bg-slate-50 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-secondary/15 to-white p-8 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">
            Ready to build the right partnership?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you are entering new markets, exploring public-sector opportunities or coordinating complex project partnerships, Triguna helps you move forward with clarity.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
