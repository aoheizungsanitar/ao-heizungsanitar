"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Sun,
  Droplets,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Leaf,
  Zap,
  Home,
  BadgeEuro,
  Star,
  Thermometer,
} from "lucide-react";

const COMPANY = {
  name: "AO Heizung Sanitär",
  phone: "+49 000 0000000",
  email: "anfrage@ao-heizung-sanitaer.de",
  location: "Deutschland",
  mapsEmbed:
    "https://www.google.com/maps?q=Deutschland&output=embed",
};

const packages = [
  {
    size: "5 kW",
    ideal: "Kleine, gut gedämmte Häuser / Wohnungen",
    priceFrom: 10990,
    features: ["Luft-Wasser-Wärmepumpe", "Hydraulik-Paket", "Förderfähige Auslegung", "Optional mit Montage"],
  },
  {
    size: "8 kW",
    ideal: "Einfamilienhaus mit mittlerem Wärmebedarf",
    priceFrom: 13990,
    features: ["Effiziente Inverter-Technik", "Leiser Betrieb", "Smart-Regelung", "Optional mit PV-Kombination"],
  },
  {
    size: "10 kW",
    ideal: "Größere Einfamilienhäuser",
    priceFrom: 15990,
    features: ["Hohe Leistung", "Warmwasserintegration", "Fördercheck inklusive", "Optional mit Komplettmontage"],
  },
  {
    size: "12 kW",
    ideal: "Altbau / hoher Wärmebedarf",
    priceFrom: 17990,
    features: ["Leistungsstark", "Hybridfähig", "Modernisierung geeignet", "Optional mit Batteriespeicher"],
  },
];

const services = [
  {
    icon: Thermometer,
    title: "Wärmepumpen-Installation",
    text: "Planung, Lieferung und fachgerechte Montage von elektrischen, gasbasierten und hybriden Wärmepumpensystemen.",
  },
  {
    icon: Wrench,
    title: "Heizungsmodernisierung",
    text: "Austausch alter Heizsysteme gegen energieeffiziente Lösungen für Bestand und Neubau.",
  },
  {
    icon: Sun,
    title: "Solar & Photovoltaik",
    text: "PV-Anlagen, Wechselrichter, Speicher und Dachmontage – ideal in Kombination mit Wärmepumpen.",
  },
  {
    icon: Droplets,
    title: "Sanitärinstallation",
    text: "Komplette Sanitärlösungen für Bad, Hausanschlüsse, Leitungen und Modernisierung.",
  },
  {
    icon: ShieldCheck,
    title: "Wartung & Reparatur",
    text: "Regelmäßige Heizungswartung, schnelle Störungsdiagnose und zuverlässiger Reparaturservice.",
  },
];

const reviews = [
  {
    name: "Familie Schneider",
    text: "Vom Erstgespräch bis zur Montage absolut professionell. Die Wärmepumpe läuft leise und effizient.",
  },
  {
    name: "M. Keller",
    text: "Wir haben Wärmepumpe und PV kombiniert. Sehr gute Beratung zu Förderung und Auslegung.",
  },
  {
    name: "A. Hoffmann",
    text: "Saubere Arbeit, pünktlich, freundlich und technisch stark. Klare Empfehlung für Hausbesitzer.",
  },
];

const powerOptions = ["5 kW", "8 kW", "10 kW", "12 kW", "Individuell"];
const currentHeatingOptions = ["Gas", "Öl", "Fernwärme", "Direktstrom", "Pellets", "Sonstiges"];
const roofTypes = ["Satteldach", "Flachdach", "Pultdach", "Zeltdach", "Sonstiges"];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <div className={cn("mb-10", center && "text-center max-w-3xl mx-auto")}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>}
    </div>
  );
}

function PriceCard({ item }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{item.size}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.ideal}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 px-4 py-2 text-right">
          <div className="text-xs uppercase tracking-wide text-blue-700">ab</div>
          <div className="text-2xl font-bold text-blue-900">{item.priceFrom.toLocaleString("de-DE")} €</div>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#konfigurator"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
      >
        Paket konfigurieren <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function AOHeizungSanitaerWebsite() {
  const [formData, setFormData] = useState({
    systemType: "Wärmepumpe",
    powerSize: "8 kW",
    installation: "Mit Installation",
    solarPanels: true,
    inverter: true,
    battery: false,
    roofInstallation: true,
    address: "",
    houseSize: "",
    yearBuilt: "",
    currentHeating: "Gas",
    roofType: "Satteldach",
    electricityConsumption: "",
    phone: "",
    email: "",
    message: "",
    privacyAccepted: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "AO Heizung Sanitär | Wärmepumpe, Solar & Sanitär in Deutschland";
    const description =
      "AO Heizung Sanitär: Wärmepumpen, Heizungsmodernisierung, Solar & Photovoltaik, Sanitärinstallation und Wartung. Jetzt online Angebot anfordern.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  const estimate = useMemo(() => {
    const baseMap = {
      "5 kW": 10990,
      "8 kW": 13990,
      "10 kW": 15990,
      "12 kW": 17990,
      Individuell: 0,
    };

    let total = baseMap[formData.powerSize] || 0;

    if (formData.systemType === "Solar") total = 7990;
    if (formData.systemType === "Wärmepumpe + Solar") total += 8990;
    if (formData.installation === "Mit Installation") total += 4500;
    if (formData.solarPanels && formData.systemType !== "Wärmepumpe") total += 3500;
    if (formData.inverter && formData.systemType !== "Wärmepumpe") total += 1800;
    if (formData.battery) total += 5900;
    if (formData.roofInstallation && formData.systemType !== "Wärmepumpe") total += 2500;

    return total;
  }, [formData]);

  const showSolarOptions = formData.systemType !== "Wärmepumpe";

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildLeadPayload = () => ({
    company: COMPANY.name,
    requestDate: new Date().toLocaleString("de-DE"),
    configuration: {
      systemType: formData.systemType,
      powerSize: formData.powerSize,
      installation: formData.installation,
      solarOptions: showSolarOptions
        ? {
            solarPanels: formData.solarPanels,
            inverter: formData.inverter,
            battery: formData.battery,
            roofInstallation: formData.roofInstallation,
          }
        : "Nicht ausgewählt",
      estimatedStartingPrice: estimate > 0 ? `${estimate.toLocaleString("de-DE")} €` : "Individuell",
    },
    customer: {
      address: formData.address,
      houseSize: formData.houseSize,
      yearBuilt: formData.yearBuilt,
      currentHeating: formData.currentHeating,
      roofType: formData.roofType,
      electricityConsumption: formData.electricityConsumption,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.privacyAccepted) {
      setError("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    setSubmitting(true);

    const payload = buildLeadPayload();

    try {
      // Für den Live-Betrieb: Diese Route mit einem Serverless-Endpoint verknüpfen,
      // der eine E-Mail an das Unternehmen sendet und eine Bestätigung an den Kunden auslöst.
      // Erwartete Server-Antwort: { ok: true }
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Netzwerkfehler");

      setSubmitted(true);
    } catch (err) {
      // Vorschau-/Fallback-Modus
      const subject = encodeURIComponent(`Neue Anfrage über Website – ${formData.systemType} / ${formData.powerSize}`);
      const body = encodeURIComponent(JSON.stringify(payload, null, 2));
      window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-green-600 text-white shadow-lg">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold">AO Heizung Sanitär</div>
              <div className="text-xs text-slate-500">Wärmepumpe · Solar · Sanitär</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            <a href="#leistungen" className="text-sm font-medium text-slate-600 hover:text-slate-900">Leistungen</a>
            <a href="#pakete" className="text-sm font-medium text-slate-600 hover:text-slate-900">Pakete</a>
            <a href="#foerderung" className="text-sm font-medium text-slate-600 hover:text-slate-900">Förderung</a>
            <a href="#ueber-uns" className="text-sm font-medium text-slate-600 hover:text-slate-900">Über uns</a>
            <a href="#kontakt" className="text-sm font-medium text-slate-600 hover:text-slate-900">Kontakt</a>
          </nav>

          <a
            href="#konfigurator"
            className="rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Jetzt Angebot anfordern
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-green-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(22,163,74,0.25),transparent_24%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
                Wärmepumpen & Energie-Lösungen für Hausbesitzer in Deutschland
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Moderne Heiztechnik für Ihr Zuhause – effizient, nachhaltig und förderfähig
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                AO Heizung Sanitär plant und installiert Wärmepumpen, modernisiert Heizungen, kombiniert Systeme mit Photovoltaik und bietet zuverlässige Sanitär- und Wartungslösungen.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#konfigurator"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Jetzt Angebot anfordern
                </a>
                <a
                  href="#pakete"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/15"
                >
                  Wärmepumpen-Pakete ansehen
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["Förderfähig", "BAFA / KfW vorbereitet"],
                  ["Komplettservice", "Planung bis Montage"],
                  ["Deutschlandweit", "Für private Hausbesitzer"],
                ].map(([title, subtitle]) => (
                  <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-slate-200">{subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur"
            >
              <div className="rounded-[28px] bg-white p-6 text-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-blue-700">Schnell-Konfiguration</div>
                    <h3 className="mt-1 text-2xl font-bold">Ihr Wärmepumpen-Projekt</h3>
                  </div>
                  <Zap className="h-10 w-10 text-green-600" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {packages.slice(0, 4).map((pkg) => (
                    <div key={pkg.size} className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold">{pkg.size}</div>
                      <div className="mt-1 text-sm text-slate-600">{pkg.ideal}</div>
                      <div className="mt-3 text-lg font-bold text-blue-700">ab {pkg.priceFrom.toLocaleString("de-DE")} €</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-slate-700">
                  Ideal kombinierbar mit PV-Anlage, Speicher und fachgerechter Installation.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {[
              ["Energieeffizient", "Zukunftssichere Heizsysteme"],
              ["Förderservice", "Unterstützung bei BAFA / KfW"],
              ["Fachgerechte Montage", "Aus einer Hand"],
              ["Schnelle Anfrage", "Digitaler Paket-Konfigurator"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-600">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="leistungen" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Leistungen"
            title="Alles rund um Heizung, Solar und Sanitär"
            text="Professionelle Lösungen für Modernisierung, Neubau und energetische Sanierung – passgenau für private Wohngebäude in Deutschland."
            center
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="pakete" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Webshop / Pakete"
              title="Wärmepumpen-Pakete für Hausbesitzer"
              text="Orientierungspreise für typische Leistungsgrößen. Die finale Auslegung erfolgt nach Objektprüfung und Verbrauchsdaten."
              center
            />
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {packages.map((item) => (
                <PriceCard key={item.size} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="konfigurator" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionTitle
                eyebrow="Paket-Konfigurator"
                title="In 5 Schritten zur qualifizierten Anfrage"
                text="Kunden können online System, Leistung, Installation und Hausdaten angeben. So kann AO Heizung Sanitär schnell ein passendes Angebot vorbereiten."
              />

              {submitted ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-7 w-7 text-green-600" />
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Vielen Dank für Ihre Anfrage</h3>
                      <p className="mt-3 leading-7 text-slate-700">
                        Ihre Daten wurden erfasst. AO Heizung Sanitär meldet sich zur Projektklärung und finalen Preisermittlung. Im Live-Betrieb kann dieser Formularprozess direkt per E-Mail an das Unternehmen und automatisch als Bestätigung an den Kunden versendet werden.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Schritt 1 – Systemtyp</div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {["Wärmepumpe", "Wärmepumpe + Solar", "Solar"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleChange("systemType", type)}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-left font-medium transition",
                            formData.systemType === type
                              ? "border-blue-700 bg-blue-700 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Schritt 2 – Leistungsgröße</div>
                    <div className="grid gap-3 sm:grid-cols-5">
                      {powerOptions.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleChange("powerSize", size)}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-center font-medium transition",
                            formData.powerSize === size
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Schritt 3 – Installation</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["Ohne Installation", "Mit Installation"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange("installation", option)}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-left font-medium transition",
                            formData.installation === option
                              ? "border-blue-700 bg-blue-700 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {showSolarOptions && (
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Schritt 4 – Solar-Optionen</div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          ["solarPanels", "Solarmodule"],
                          ["inverter", "Wechselrichter"],
                          ["battery", "Batteriespeicher"],
                          ["roofInstallation", "Dachmontage"],
                        ].map(([key, label]) => (
                          <label key={key} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                            <input
                              type="checkbox"
                              checked={Boolean(formData[key])}
                              onChange={(e) => handleChange(key, e.target.checked)}
                              className="h-5 w-5 rounded border-slate-300"
                            />
                            <span className="font-medium text-slate-700">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Schritt 5 – Haus- und Kontaktdaten</div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-blue-600" placeholder="Adresse" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} required />
                      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-blue-600" placeholder="Hausgröße (m²)" value={formData.houseSize} onChange={(e) => handleChange("houseSize", e.target.value)} required />
                      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-blue-600" placeholder="Baujahr" value={formData.yearBuilt} onChange={(e) => handleChange("yearBuilt", e.target.value)} required />
                      <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600" value={formData.currentHeating} onChange={(e) => handleChange("currentHeating", e.target.value)}>
                        {currentHeatingOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600" value={formData.roofType} onChange={(e) => handleChange("roofType", e.target.value)}>
                        {roofTypes.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-blue-600" placeholder="Stromverbrauch pro Jahr (kWh)" value={formData.electricityConsumption} onChange={(e) => handleChange("electricityConsumption", e.target.value)} required />
                      <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-blue-600" placeholder="Telefonnummer" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
                      <input type="email" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-blue-600" placeholder="E-Mail" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required />
                    </div>
                    <textarea
                      className="mt-4 min-h-[140px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
                      placeholder="Zusätzliche Informationen zum Objekt oder Wunschsystem"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                    <label className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={formData.privacyAccepted}
                        onChange={(e) => handleChange("privacyAccepted", e.target.checked)}
                        className="mt-1 h-5 w-5"
                      />
                      <span>
                        Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage gemäß DSGVO zu. Eine Datenschutzerklärung und ein Impressum müssen im Live-Betrieb ergänzt werden.
                      </span>
                    </label>
                    {error && <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-6 inline-flex items-center justify-center rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                    >
                      {submitting ? "Wird gesendet…" : "Anfrage absenden"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl">
                <div className="flex items-center gap-3 text-green-300">
                  <BadgeEuro className="h-6 w-6" />
                  <span className="text-sm font-medium uppercase tracking-wide">Orientierungspreis</span>
                </div>
                <div className="mt-4 text-4xl font-bold">
                  {estimate > 0 ? `${estimate.toLocaleString("de-DE")} €` : "Individuell"}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Geschätzter Startpreis basierend auf Ihrer Auswahl. Finale Preise richten sich nach Objekt, Hydraulik, Montageaufwand und Förderfähigkeit.
                </p>
                <div className="mt-6 space-y-3 rounded-3xl bg-white/5 p-5 text-sm text-slate-200">
                  <div className="flex justify-between gap-4"><span>Systemtyp</span><span className="font-semibold">{formData.systemType}</span></div>
                  <div className="flex justify-between gap-4"><span>Leistung</span><span className="font-semibold">{formData.powerSize}</span></div>
                  <div className="flex justify-between gap-4"><span>Montage</span><span className="font-semibold">{formData.installation}</span></div>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">Warum AO Heizung Sanitär?</h3>
                <div className="mt-5 space-y-4">
                  {[
                    "Fokus auf Wärmepumpen, Heizungsmodernisierung und Solar-Kombinationen",
                    "Digitale Anfrageerfassung für schnelle und qualifizierte Leads",
                    "Mobile-first gestaltet für hohe Conversion auf Smartphone und Desktop",
                    "SEO-freundliche Struktur für Suchanfragen in Deutschland",
                  ].map((point) => (
                    <div key={point} className="flex gap-3 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-blue-50 to-green-50 p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">Technische Umsetzung</h3>
                <div className="mt-5 space-y-3 text-slate-700">
                  <div>• API-Endpunkt für E-Mail-Benachrichtigung an das Unternehmen</div>
                  <div>• Automatische Bestätigungs-E-Mail an den Kunden</div>
                  <div>• Google Maps Einbindung auf der Kontaktseite</div>
                  <div>• DSGVO-Hinweis, spätere Ergänzung von Impressum & Datenschutzerklärung</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="foerderung" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Finanzierung & Förderung"
              title="Förderung für Wärmepumpen und energetische Modernisierung"
              text="Diese Website enthält eine Fördersektion für Eigentümer in Deutschland. Inhalte sollten regelmäßig an die aktuellen BAFA- und KfW-Richtlinien angepasst werden."
              center
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "BAFA / KfW Überblick",
                  text: "Transparente Hinweise zu förderfähigen Maßnahmen, Voraussetzungen und möglichen Zuschüssen.",
                },
                {
                  title: "Fördercheck im Anfrageprozess",
                  text: "Die Hausdaten im Formular erleichtern die erste Einschätzung zur technischen Eignung und Förderung.",
                },
                {
                  title: "Finanzierungsberatung",
                  text: "Ideal für Eigentümer, die Wärmepumpe, PV und Modernisierung in einem Projekt kombinieren möchten.",
                },
              ].map((card) => (
                <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ueber-uns" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Über AO Heizung Sanitär"
                title="Vertrauenswürdig, modern und auf die Energiewende ausgerichtet"
                text="AO Heizung Sanitär positioniert sich als zuverlässiger Partner für Hausbesitzer, die ihre Heiztechnik erneuern, Energiekosten senken und auf nachhaltige Systeme umsteigen möchten."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Erfahrung", "Fokus auf moderne Heiz- und Sanitärtechnik"],
                  ["Qualität", "Saubere Ausführung und transparente Kommunikation"],
                  ["Energiewende", "Zukunftsfähige Systeme mit hoher Effizienz"],
                  ["Komplettservice", "Beratung, Planung, Montage und Betreuung"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 p-5">
                    <div className="font-semibold text-slate-900">{title}</div>
                    <div className="mt-2 text-sm text-slate-600">{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-800 to-green-700 p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold">Für deutsche Hausbesitzer optimiert</h3>
              <p className="mt-4 text-blue-50 leading-8">
                Die Struktur, Texte und Conversion-Elemente sind auf Anfragen aus Deutschland ausgerichtet: Wärmepumpe kaufen, Wärmepumpe mit Installation, Heizung modernisieren, Photovoltaik mit Speicher und staatliche Förderung.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["SEO-optimierte Seitenstruktur", "Lead-Formular mit Objektangaben", "Vertrauensaufbau durch Referenzen", "Klare CTA für Angebot & Kontakt"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Bewertungen"
              title="Das schafft Vertrauen bei neuen Kunden"
              text="Die Website enthält eine moderne Review-Sektion für Social Proof und lokale Glaubwürdigkeit."
              center
            />
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="mb-4 flex text-yellow-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="leading-7 text-slate-200">“{review.text}”</p>
                  <div className="mt-5 font-semibold">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionTitle
                eyebrow="Kontakt"
                title="Direkt erreichbar für Beratung und Angebote"
                text="Die Kontaktseite kombiniert klassische Kontaktinformationen mit Karte, Anfrageweg und mobilen Call-to-Actions."
              />
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
                  <Phone className="mt-1 h-5 w-5 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">Telefon</div>
                    <div className="text-slate-600">{COMPANY.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
                  <Mail className="mt-1 h-5 w-5 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">E-Mail</div>
                    <div className="text-slate-600">{COMPANY.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
                  <MapPin className="mt-1 h-5 w-5 text-blue-700" />
                  <div>
                    <div className="font-semibold text-slate-900">Standort</div>
                    <div className="text-slate-600">{COMPANY.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-slate-200 shadow-sm">
              <iframe
                title="Google Maps Standort"
                src={COMPANY.mapsEmbed}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="text-lg font-bold text-slate-900">AO Heizung Sanitär</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Moderne Website und Webshop-Konzept für Wärmepumpen, Heizungsmodernisierung, Solar & Sanitär – optimiert für qualifizierte Leads in Deutschland.
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Leistungen</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Wärmepumpe</li>
              <li>Heizungsmodernisierung</li>
              <li>Photovoltaik</li>
              <li>Sanitärinstallation</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Wichtige Seiten</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Über uns</li>
              <li>Förderung</li>
              <li>Kontakt</li>
              <li>Anfrageformular</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Hinweise</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Impressum ergänzen</li>
              <li>Datenschutzerklärung ergänzen</li>
              <li>E-Mail-Backend verbinden</li>
              <li>Google Maps mit echtem Standort pflegen</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
