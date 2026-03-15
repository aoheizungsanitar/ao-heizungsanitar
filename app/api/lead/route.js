import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const { company, configuration, customer, requestDate } = data;

    const companyEmail = "mustafaomid8@gmail.com"; // change to your real inbox

    const adminResult = await resend.emails.send({
console.log("Admin email result:", adminResult);
      from: "AO Heizung Sanitär <onboarding@resend.dev>",
      to: [companyEmail],
      subject: `Neue Anfrage – ${configuration.systemType} / ${configuration.powerSize}`,
      html: `
        <div style="margin:0;padding:0;background:#eef3f8;font-family:Arial,sans-serif;color:#1e293b;">
          <div style="max-width:760px;margin:30px auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
            
            <div style="background:linear-gradient(135deg,#0f3d91 0%, #16a34a 100%);padding:32px 36px;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">AO Heizung Sanitär</div>
              <h1 style="margin:10px 0 6px;font-size:30px;line-height:1.2;">Neue Angebotsanfrage</h1>
              <p style="margin:0;font-size:15px;opacity:.95;">
                Es wurde eine neue Anfrage über das Website-Formular gesendet.
              </p>
            </div>

            <div style="padding:34px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                    <div style="font-size:13px;color:#64748b;">Eingangsdatum</div>
                    <div style="margin-top:4px;font-size:16px;font-weight:700;color:#0f172a;">${requestDate}</div>
                  </td>
                </tr>
              </table>

              <div style="margin:0 0 22px;padding:20px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;">
                <h2 style="margin:0 0 14px;font-size:19px;color:#0f172a;">System-Auswahl</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;">
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Systemtyp:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.systemType}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Leistung:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.powerSize}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Installation:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.installation}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Orientierungspreis:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;font-weight:700;">${configuration.estimatedStartingPrice}</td>
                  </tr>
                </table>
              </div>

              <div style="margin:0 0 22px;padding:20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;">
                <h2 style="margin:0 0 14px;font-size:19px;color:#0f172a;">Solar-Optionen</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;">
                  <tr>
                    <td style="padding:8px 0;color:#475569;">Solarmodule</td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.solarOptions?.solarPanels ? "Ja" : "Nein"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;">Wechselrichter</td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.solarOptions?.inverter ? "Ja" : "Nein"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;">Batteriespeicher</td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.solarOptions?.battery ? "Ja" : "Nein"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;">Dachmontage</td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.solarOptions?.roofInstallation ? "Ja" : "Nein"}</td>
                  </tr>
                </table>
              </div>

              <div style="margin:0 0 22px;padding:20px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;">
                <h2 style="margin:0 0 14px;font-size:19px;color:#0f172a;">Kundendaten</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;">
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Adresse:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.address}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Hausgröße:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.houseSize} m²</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Baujahr:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.yearBuilt}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Aktuelle Heizung:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.currentHeating}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Dachtyp:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.roofType}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Stromverbrauch:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.electricityConsumption} kWh</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>Telefon:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#475569;"><strong>E-Mail:</strong></td>
                    <td style="padding:8px 0;text-align:right;color:#0f172a;">${customer.email}</td>
                  </tr>
                </table>
              </div>

              <div style="margin:0 0 22px;padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                <h2 style="margin:0 0 12px;font-size:19px;color:#0f172a;">Nachricht des Kunden</h2>
                <div style="font-size:15px;line-height:1.7;color:#334155;white-space:pre-line;">
                  ${customer.message || "Keine zusätzliche Nachricht angegeben."}
                </div>
              </div>

              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;text-align:center;font-size:13px;color:#64748b;">
                Diese Anfrage wurde automatisch über die Website von <strong>AO Heizung Sanitär</strong> übermittelt.
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (customer.email) {
      const customerResult = await resend.emails.send({
console.log("Customer email result:", customerResult);
        from: "AO Heizung Sanitär <onboarding@resend.dev>",
        to: [customer.email],
        subject: "Vielen Dank für Ihre Anfrage bei AO Heizung Sanitär",
        html: `
          <div style="margin:0;padding:0;background:#eef3f8;font-family:Arial,sans-serif;color:#1e293b;">
            <div style="max-width:720px;margin:30px auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
              
              <div style="background:linear-gradient(135deg,#0f3d91 0%, #16a34a 100%);padding:32px 36px;color:#ffffff;">
                <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">AO Heizung Sanitär</div>
                <h1 style="margin:10px 0 6px;font-size:30px;line-height:1.2;">Vielen Dank für Ihre Anfrage</h1>
                <p style="margin:0;font-size:15px;opacity:.95;">
                  Wir haben Ihre Angaben erfolgreich erhalten.
                </p>
              </div>

              <div style="padding:34px 36px;">
                <p style="margin-top:0;font-size:15px;line-height:1.7;">
                  Sehr geehrte Damen und Herren,
                </p>

                <p style="font-size:15px;line-height:1.7;">
                  vielen Dank für Ihr Interesse an unseren Leistungen. Ihre Anfrage wurde erfolgreich an
                  <strong> AO Heizung Sanitär</strong> übermittelt.
                </p>

                <div style="margin:22px 0;padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                  <h2 style="margin:0 0 14px;font-size:19px;color:#0f172a;">Ihre Auswahl im Überblick</h2>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;">
                    <tr>
                      <td style="padding:8px 0;color:#475569;"><strong>Systemtyp:</strong></td>
                      <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.systemType}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#475569;"><strong>Leistung:</strong></td>
                      <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.powerSize}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#475569;"><strong>Installation:</strong></td>
                      <td style="padding:8px 0;text-align:right;color:#0f172a;">${configuration.installation}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#475569;"><strong>Orientierungspreis:</strong></td>
                      <td style="padding:8px 0;text-align:right;color:#0f172a;font-weight:700;">${configuration.estimatedStartingPrice}</td>
                    </tr>
                  </table>
                </div>

                <p style="font-size:15px;line-height:1.7;">
                  Unser Team wird Ihre Angaben prüfen und sich schnellstmöglich bei Ihnen melden, um die Details zu besprechen und ein passendes Angebot zu erstellen.
                </p>

                <div style="margin:22px 0;padding:18px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;">
                  <p style="margin:0;font-size:15px;line-height:1.7;">
                    Bei dringenden Fragen können Sie uns auch direkt per E-Mail oder Telefon kontaktieren.
                  </p>
                </div>

                <p style="margin:26px 0 0;font-size:15px;line-height:1.7;">
                  Mit freundlichen Grüßen<br />
                  <strong>AO Heizung Sanitär</strong>
                </p>
              </div>
            </div>
          </div>
        `,
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return Response.json(
      { ok: false, error: error?.message || "E-Mail konnte nicht gesendet werden." },
      { status: 500 }
    );
  }
}