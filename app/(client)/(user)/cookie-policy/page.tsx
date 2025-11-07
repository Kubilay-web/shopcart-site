import React from 'react'

export default function page() {
  return (
        <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Cookie Richtlinie
        </h1>

        <p>
          Diese Website verwendet Cookies, um dir das bestmögliche
          Online-Erlebnis zu geben. Lass uns bitte wissen, dass du damit
          einverstanden bist, indem du weiter unten auf die Option “Akzeptieren”
          klickst. Falls du mehr über die von uns verwendeten Cookies
          herausfinden und eigene Cookie-Einstellungen verwenden möchtest, schau
          dir bitte unsere Cookie Richtlinie an.
        </p>

        <section className="space-y-2 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            Unbedingt erforderlich (Strictly necessary)
          </h2>
          <p>
            Unbedingt erforderliche Cookies ermöglichen grundlegende Funktionen
            und sind für die einwandfreie Funktion der Website erforderlich.
            Daher kann man sie nicht deaktivieren. Diese Art von Cookies wird
            ausschließlich von dem Betreiber der Website verwendet
            (First-Party-Cookie) und sämtliche Informationen, die in den Cookies
            gespeichert sind, werden nur an diese Website gesendet.
          </p>
          <p className="pt-2 text-sm text-muted-foreground">
            (Keine Cookies in dieser Kategorie)
          </p>
        </section>

        <section className="space-y-2 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Funktionell (Functional)</h2>
          <p>
            Funktionelle Cookies ermöglichen dieser Website, bestimmte
            Funktionen zur Verfügung zu stellen und Informationen zu speichern,
            die vom Nutzer eingegeben wurden – beispielsweise bereits
            registrierte Namen oder die Sprachauswahl. Damit werden verbesserte
            und personalisierte Funktionen gewährleistet.
          </p>
          <p className="pt-2 text-sm text-muted-foreground">
            (Keine Cookies in dieser Kategorie)
          </p>
        </section>

        <section className="space-y-2 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            Marketing / Drittanbieter (Marketing / Third Party)
          </h2>
          <p>
            Marketing- / Third Party-Cookies stammen unter anderem von externen
            Werbeunternehmen und werden verwendet, um Informationen über die vom
            Nutzer besuchten Websites zu sammeln, um z. B. zielgruppenorientierte
            Werbung für den Benutzer zu erstellen.
          </p>
          <p className="pt-2 text-sm text-muted-foreground">
            (Keine Cookies in dieser Kategorie)
          </p>
        </section>

        <section className="space-y-2 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Leistung (Performance)</h2>
          <p>
            Die Performance-Cookies sammeln Informationen darüber, wie diese
            Website genutzt wird. Der Betreiber der Website nutzt diese Cookies
            um die Attraktivität, den Inhalt und die Funktionalität der Website
            zu verbessern.
          </p>
        </section>
      </div>
    </main>
  )
}
