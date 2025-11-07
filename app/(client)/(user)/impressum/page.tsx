import React from 'react'

export default function page() {
  return (
       <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Impressum
        </h1>

        <p className="text-muted-foreground">Betprint ist eine Marke der YILDIZ Commercial GmbH</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Gesetzlich vorgeschriebene Angaben gemäß § 5 TMG</h2>
          <address className="not-italic">
            YILDIZ Commercial GmbH
            <br />
            Marke: Betprint
            <br />
            Geschäftsführer: Özcan Yildiz
            <br />
            Albinistraße 9
            <br />
            35576 Wetzlar
            <br />
            Deutschland
          </address>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p>
            <strong>Telefon:</strong>{" "}
            <a href="tel:+4964415643606" className="text-primary hover:underline">
              +49 (0) 6441 5643606
            </a>
            <br />
            <strong>E-Mail:</strong>{" "}
            <a href="mailto:info@betprint.de" className="text-primary hover:underline">
              info@betprint.de
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Registereintrag</h2>
          <p>Handelsregister: Amtsgericht Wetzlar, HRB 7333</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Umsatzsteuer-ID</h2>
          <p>USt-ID gemäß § 27a Umsatzsteuergesetz: DE313887067</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <address className="not-italic">
            Özcan Yildiz
            <br />
            Albinistraße 9
            <br />
            35576 Wetzlar
            <br />
            Deutschland
          </address>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
      </div>
    </main>
  )
}
