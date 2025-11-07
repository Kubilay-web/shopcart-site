const PrivacyPage = () => {
  return (
    // <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    //   <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    //   <div className="space-y-4">
    //     <section>
    //       <h2 className="text-xl font-semibold mb-2">
    //         1. Information Collection
    //       </h2>
    //       <p>
    //         We collect information you provide directly to us when using our
    //         services, as well as information about your use of our services.
    //       </p>
    //     </section>
    //     <section>
    //       <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
    //       <p>
    //         We use the information we collect to provide, maintain, and improve
    //         our services, as well as to communicate with you.
    //       </p>
    //     </section>
    //     <section>
    //       <h2 className="text-xl font-semibold mb-2">3. Information Sharing</h2>
    //       <p>
    //         We do not share your personal information with third parties except
    //         as described in this Privacy Policy or with your consent.
    //       </p>
    //     </section>
    //     <section>
    //       <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
    //       <p>
    //         We take reasonable measures to help protect your personal
    //         information from loss, theft, misuse, and unauthorized access.
    //       </p>
    //     </section>
    //     <section>
    //       <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
    //       <p>
    //         You have the right to access, correct, or delete your personal
    //         information. Please contact us for assistance with these requests.
    //       </p>
    //     </section>
    //   </div>
    // </div>

    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Datenschutzerklärung
        </h1>

        <section className="space-y-4">
          <h2 className="pt-4 text-xl font-semibold">
            1. Name und Kontaktdaten des Verantwortlichen
          </h2>
          <p>
            Diese Datenschutz-Information gilt für die Datenverarbeitung durch:
          </p>
          <div className="rounded border bg-muted p-4">
            <p className="font-semibold">Verantwortlicher:</p>
            <address className="not-italic">
              Betprint – eine Marke der Yildiz Commercial GmbH
              <br />
              Geschäftsführer: Özcan YILDIZ
              <br />
              Albinistraße 9
              <br />
              35576 Wetzlar
              <br />
              Deutschland
              <br />
              Tel.: +49 (0) 6441 – 5643606
              <br />
              E-Mail: info@betprint.de
            </address>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="pt-4 text-xl font-semibold">
            2. Erhebung und Speicherung personenbezogener Daten sowie Art und
            Zweck der Verwendung
          </h2>
          <h3 className="font-semibold">a) Beim Besuch unserer Website</h3>
          <p>
            Beim Aufrufen unserer Website www.betprint.de werden durch den
            Browser Ihres Endgeräts automatisch Informationen an den Server
            unserer Website gesendet. Diese Informationen werden temporär in
            einem sog. Logfile gespeichert. Erfasst werden dabei u. a.:
          </p>
          <ul className="list-disc pl-6">
            <li>IP-Adresse des anfragenden Rechners</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Website, von der der Zugriff erfolgt (Referrer-URL)</li>
            <li>
              verwendeter Browser, ggf. Betriebssystem Ihres Rechners sowie der
              Name Ihres Access- Providers
            </li>
          </ul>
          <p>Diese Daten werden zu folgenden Zwecken verarbeitet:</p>
          <ul className="list-disc pl-6">
            <li>
              Sicherstellung eines reibungslosen Verbindungsaufbaus der Website
            </li>
            <li>Sicherstellung einer komfortablen Nutzung</li>
            <li>Auswertung der Systemsicherheit und -stabilität</li>
            <li>weitere administrative Zwecke</li>
          </ul>
          <p>
            Darüber hinaus verarbeiten wir Vertrags- und Zahlungsdaten zur
            Erbringung vertraglicher Leistungen, Kundenpflege, Marketing und
            Marktforschung.
          </p>
          <h3 className="font-semibold">
            b) Bei Nutzung unseres Kontaktformulars
          </h3>
          <p>
            Wenn Sie unser Kontaktformular nutzen, ist die Angabe einer gültigen
            E-Mail-Adresse erforderlich. Weitere Angaben können freiwillig
            erfolgen. Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. a DSGVO. Nach
            Erledigung Ihrer Anfrage werden die erhobenen Daten automatisch
            gelöscht.
          </p>
        </section>

        {[
          "3. Weitergabe von Daten",
          "4. Cookies",
          "5. Onlineshop",
          "6. SSL-Verschlüsselung",
          "7. Usercentrics Consent Management Platform",
          "8. Datenschutzerklärung für die Nutzung von Facebook-Plugins",
          "9. Datenschutzerklärung für die Nutzung von Google Analytics",
          "9.b Datenschutzerklärung für die Nutzung von Microsoft",
          "10. Datenschutzerklärung für die Nutzung von Twitter",
          "11. YouTube",
          "12. Xing",
          "13. Uptain",
          "14. Newsletter",
          "15. Externe Zahlungsdienstleister",
          "16. Betroffenenrechte",
          "17. Widerspruchsrecht",
          "18. Datensicherheit",
        ].map((title) => (
          <section key={title} className="space-y-4">
            <h2 className="pt-4 text-xl font-semibold">{title}</h2>
            <p>
              Der vollständige Text dieses Abschnitts entspricht der auf
              www.betprint.de veröffentlichten Datenschutzerklärung.
            </p>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="pt-4 text-xl font-semibold">
            19. Aktualität und Änderung dieser Datenschutzerklärung
          </h2>
          <p>
            Der vollständige Text dieses Abschnitts entspricht der auf
            www.betprint.de veröffentlichten Datenschutzerklärung.
          </p>
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
            September 2025. Die jeweils aktuelle Version finden Sie jederzeit
            unter www.betprint.de/datenschutz.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPage;
