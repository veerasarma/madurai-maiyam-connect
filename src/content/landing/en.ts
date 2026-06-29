import type { LandingContent } from "./types";

export const en: LandingContent = {
  brand: {
    name: "VISIL191",
    expanded: "Madurai North MLA Grievance Control System",
    tagline: "People's Voice · Direct Registration · Continuous Monitoring",
    constituency: "Madurai North Assembly Constituency (191)",
    constituencyShort: "Madurai North (191)",
  },
  nav: {
    links: [
      { label: "Home", href: "#" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Monitoring", href: "#impact" },
      { label: "Volunteers", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    submit: "Submit Grievance",
    submitShort: "Submit",
    track: "Track Status",
    trackShort: "Track",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Madurai North Assembly Constituency · Digital Grievance Centre",
    titleLine1: "VISIL191",
    titleLine2: "Madurai North MLA Grievance Control System",
    subtitle:
      "An integrated digital public service platform that registers grievances from Madurai North citizens, routes them to the right departments, and monitors until resolution.",
    processStrip: "Citizen Petition → Registration → Department Routing → Monitoring → Verified Closure",
    ctaPrimary: "Submit Your Grievance",
    ctaSecondary: "Track Complaint Status",
    ctaTertiary: "Join as Volunteer",
    stats: [
      { v: "24/7", l: "Grievance Intake" },
      { v: "Ward-Level", l: "Area & Ward Monitoring" },
      { v: "Live", l: "Status Updates" },
      { v: "Priority", l: "Emergency Escalation" },
    ],
  },
  about: {
    tag: "About Visil191",
    title: "Unified grievance and service monitoring platform for Madurai North",
    body:
      "Visil191 is the MLA Grievance Control System for Madurai North Assembly Constituency. It registers public issues — water supply, roads, street lights, garbage, drainage, sanitation, welfare requests, and administrative guidance — routes them to the right department, and monitors until resolved.",
    bodyNote:
      "This is not just a complaint form. It is the MLA office's public service, monitoring, and accountability system.",
    pillars: [
      { t: "Tracking ID", d: "Unique code for every petition", i: "◆" },
      { t: "Department Routing", d: "Routed to the correct department", i: "⚡" },
      { t: "Ward Monitoring", d: "Ward-wise issue tracking", i: "✦" },
      { t: "Follow-up Until Closure", d: "Continuous follow-up until resolved", i: "◎" },
    ],
  },
  leadership: {
    tag: "Our Leadership",
    title: "Voices of Madurai North",
    viewMore: "Learn More",
    leaders: [
      {
        name: "C. Joseph Vijay",
        role: "TVK President",
        quote: "Tamil Nadu's change is in the hands of Tamil people",
        badge: "TVK President",
      },
      {
        name: "N. Anand",
        role: "TVK General Secretary & Minister",
        quote: "Rural development and people's welfare are our priority",
        badge: "TVK General Secretary",
      },
      {
        name: "Thiru. A. Kallanai",
        role: "MLA – Madurai North (191)",
        quote: "Recording a grievance is not enough; it must be monitored until resolved.",
        badge: "Madurai North MLA",
      },
    ],
  },
  features: {
    tag: "Core Features",
    title: "Key features built to accelerate public service",
    items: [
      { t: "Complaint Registration", d: "Register with name, mobile, address, ward, category, photo, and location." },
      { t: "Track Your Complaint", d: "Check status via Tracking ID or mobile number." },
      { t: "Ward-Level Monitoring", d: "Monitor which wards have the most recurring issues." },
      { t: "Department Routing", d: "Route to Corporation, Water, EB, Revenue, Highways, and more." },
      { t: "Priority Escalation", d: "Priority handling and escalation for emergency grievances." },
      { t: "Volunteer Network", d: "Ground-level data collection, verification, and follow-up support." },
      { t: "Photo / Field Verification", d: "Closure through photos, field checks, and citizen confirmation." },
      { t: "Public Announcements", d: "Service camps, water supply notices, and emergency alerts." },
    ],
  },
  workflow: {
    tag: "How Visil191 Works",
    title: "From your street to resolution — the Visil191 process",
    steps: [
      { n: "01", t: "Citizen registers grievance", d: "Via website, mobile, or WhatsApp." },
      { n: "02", t: "Details verified", d: "Area, ward, category, urgency, and contact details checked." },
      { n: "03", t: "Assigned to handler", d: "Ward coordinator / grievance desk / department liaison / field volunteer." },
      { n: "04", t: "Status monitoring", d: "Received → Under Review → Forwarded → In Progress → Resolved → Closed" },
      { n: "05", t: "Resolution confirmed", d: "Field verification, photo proof, and citizen confirmation." },
    ],
  },
  impact: {
    tag: "Impact & Service Reach",
    title: "Monitoring data that measures public service delivery",
    body: "Visil191 is not only about receiving petitions — it is a grievance monitoring framework that moves them toward resolution.",
    metrics: [
      { v: "24/7", l: "Grievance intake" },
      { v: "Ward", l: "Level monitoring" },
      { v: "Structured", l: "Complaint routing" },
      { v: "Live", l: "Status tracking" },
    ],
  },
  volunteer: {
    tag: "Volunteer & Area Coordination",
    title: "A service network connecting people at the ground level",
    body:
      "Volunteers, ward coordinators, and area representatives work together to register issues correctly, understand ground realities, and verify locations with photos where needed.",
    roles: [
      { n: "Ward Coordinator", r: "Ward Coordinator", w: "Coordinates ward grievances and forwards to the grievance desk" },
      { n: "Area Representative", r: "Area Representative", w: "Citizen outreach, location verification, follow-up support" },
      { n: "Field Volunteer", r: "Field Volunteer", w: "Photo collection, ground updates, urgency reporting" },
      { n: "Support Team", r: "Support Team", w: "Data entry, citizen callback, status updates, escalation support" },
      { n: "Grievance Desk", r: "Grievance Desk", w: "Petition registration, department routing, follow-up" },
      { n: "Digital Access", r: "Digital Access", w: "Mobile / WhatsApp registration and tracking" },
    ],
  },
  digitalAccess: {
    tag: "Digital Access",
    title: "Visil191 on your phone — from grievance registration to status tracking",
    body:
      "Visil191 is designed for citizens to register grievances and track status through a mobile-friendly web portal or WhatsApp.",
    bullets: [
      "Register grievances via mobile",
      "Photo / location upload",
      "Tracking ID status updates",
      "SMS / WhatsApp alerts",
      "Volunteer field coordination",
      "Local area announcements",
    ],
    ctaAndroid: "Open Complaint Portal",
    ctaIos: "Track Your Complaint",
  },
  testimonials: {
    tag: "Citizen Voice",
    title: "Public trust — the true measure of service",
    body:
      "Visil191 is built not only to register petitions but to follow up, share status transparently, and monitor until resolution.",
    comingSoonTitle: "Citizen Feedback – Coming Soon",
    comingSoonBody:
      "Feedback, resolution experiences, and ward-level stories from Visil191 users will be shared here soon.",
  },
  cta: {
    tag: "Your Voice Matters",
    title: "Register your local issue right away",
    body:
      "If you face water, road, street light, sewage, garbage, welfare, or any public issue in Madurai North, register it on Visil191. Every petition is logged, routed, and monitored until resolved.",
    submit: "Submit Your Grievance",
    track: "Track Complaint Status",
    volunteer: "Join as Volunteer",
    submitUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfI0yDlQ2Pb8XalAcq225zEScIYvrUM3GT_byNnrvlE9vJTgQ/viewform?usp=publish-editor",
  },
  footer: {
    description:
      "An integrated digital public service platform that registers citizen grievances, welfare petitions, and basic amenity requests from Madurai North, routes them to departments, and monitors until resolution.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "#" },
      { label: "About Visil191", href: "#about" },
      { label: "Submit Grievance", href: "#submit" },
      { label: "Track Status", href: "#track" },
      { label: "Service Categories", href: "#features" },
      { label: "Volunteer Registration", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    serviceLinksTitle: "Service Categories",
    serviceLinks: [
      "Water Supply",
      "Roads & Street Lights",
      "Drainage & Sanitation",
      "Garbage Collection",
      "Public Service Assistance",
      "Emergency Grievances",
    ],
    reachUsTitle: "Reach Us",
    address: "Visil191 Control Room / Constituency Support Office, Madurai North, Madurai",
    phone: "+91 9500355775",
    emailSupport: "support@visil191.com",
    emailGrievance: "grievance@visil191.com",
    copyright: "© 2026 VISIL191 – Madurai North MLA Grievance Control System. All rights reserved.",
    tagline: "People's Voice · Direct Registration · Continuous Monitoring",
  },
  language: {
    label: "Language",
    tamil: "தமிழ்",
    english: "English",
  },
};
