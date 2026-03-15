import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      company,
      configuration,
      customer,
      requestDate,
    } = data;

    const companyEmail = "aoheizungsanitar@gmail.com"; // change this to your real email

    await resend.emails.send({
      from: "AO Heizung Sanitär <onboarding@resend.dev>",
      to: [companyEmail],
      subject: `Neue Anfrage: ${configuration.systemType} / ${configuration.powerSize}`,
      html: `
        <h2>Neue Website-Anfrage</h2>
        <p><strong>Datum:</strong> ${requestDate}</p>

        <h3>Konfiguration</h3>
        <p><strong>Systemtyp:</strong> ${configuration.systemType}</p>
        <p><strong>Leistung:</strong> ${configuration.powerSize}</p>
        <p><strong>Installation:</strong> ${configuration.installation}</p>
        <p><strong>Preis ab:</strong> ${configuration.estimatedStartingPrice}</p>

        <h3>Kundendaten</h3>
        <p><strong>Adresse:</strong> ${customer.address}</p>
        <p><strong>Hausgröße:</strong> ${customer.houseSize} m²</p>
        <p><strong>Baujahr:</strong> ${customer.yearBuilt}</p>
        <p><strong>Aktuelle Heizung:</strong> ${customer.currentHeating}</p>
        <p><strong>Dachtyp:</strong> ${customer.roofType}</p>
        <p><strong>Stromverbrauch:</strong> ${customer.electricityConsumption}</p>
        <p><strong>Telefon:</strong> ${customer.phone}</p>
        <p><strong>E-Mail:</strong> ${customer.email}</p>
        <p><strong>Nachricht:</strong> ${customer.message || "-"}</p>

        <h3>Solar-Optionen</h3>
        <pre>${JSON.stringify(configuration.solarOptions, null, 2)}</pre>
      `,
    });

    if (customer.email) {
      await resend.emails.send({
        from: "AO Heizung Sanitär <onboarding@resend.dev>",
        to: [customer.email],
        subject: "Ihre Anfrage bei AO Heizung Sanitär",
        html: `
          <h2>Vielen Dank für Ihre Anfrage</h2>
          <p>Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.</p>
          <p><strong>System:</strong> ${configuration.systemType}</p>
          <p><strong>Leistung:</strong> ${configuration.powerSize}</p>
          <p><strong>Installation:</strong> ${configuration.installation}</p>
          <p>Mit freundlichen Grüßen<br />AO Heizung Sanitär</p>
        `,
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return Response.json({ ok: false, error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
  }
}