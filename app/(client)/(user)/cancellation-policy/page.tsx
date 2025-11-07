import React from 'react'

export default function page() {
  return (
       <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Widerrufsbelehrung
        </h1>
        <h2 className="pt-2 text-lg font-semibold">
          der YILDIZ Commercial GmbH
          <br />
          für den Internetshop „Betprint“
        </h2>

        <section className="space-y-4">
          <h3 className="pt-4 text-xl font-semibold">Widerrufsrecht</h3>
          <p>
            Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen
            Vertrag zu widerrufen.
          </p>
          <p>Die Widerrufsfrist beträgt 14 Tage ab dem Tag,</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              an dem Sie oder ein von Ihnen benannter Dritter, der nicht der
              Beförderer ist, die Waren in Besitz genommen haben, oder
            </li>
            <li>
              im Falle einer einheitlichen Bestellung, die in mehreren
              Teilsendungen oder Stücken geliefert wird, ab dem Tag, an dem Sie
              oder ein von Ihnen benannter Dritter die letzte Teilsendung oder
              das letzte Stück in Besitz genommen haben.
            </li>
          </ul>
          <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns,</p>
          <div className="rounded border bg-muted p-4">
            <strong>YILDIZ Commercial GmbH</strong>
            <br />
            Geschäftsführer: Özcan YILDIZ
            <br />
            Albinistraße 9
            <br />
            35576 Wetzlar
            <br />
            Deutschland
            <br />
            Tel.: +49 (0) 6441 5643606
            <br />
            E-Mail: info@betprint.de
          </div>
          <p>
            mittels einer eindeutigen Erklärung (z. B. per Post, Telefax oder
            E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
            informieren.
          </p>
          <p>
            Sie können dafür unser Muster-Widerrufsformular verwenden, das
            jedoch nicht vorgeschrieben ist. Wenn Sie das Formular oder eine
            andere eindeutige Erklärung elektronisch über unsere Website
            übermitteln, werden wir Ihnen unverzüglich (z. B. per E-Mail) eine
            Bestätigung über den Eingang des Widerrufs zukommen lassen.
          </p>
          <p>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
            Mitteilung über die Ausübung des Widerrufs vor Ablauf der
            Widerrufsfrist absenden.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="pt-4 text-xl font-semibold">Folgen des Widerrufs</h3>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
            die wir von Ihnen erhalten haben – einschließlich der Lieferkosten
            (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass
            Sie eine andere Art der Lieferung als die von uns angebotene,
            günstigste Standardlieferung gewählt haben) – unverzüglich und
            spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die
            Mitteilung über Ihren Widerruf bei uns eingegangen ist.
          </p>
          <p>
            Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie
            bei der ursprünglichen Transaktion eingesetzt haben, es sei denn,
            mit Ihnen wurde ausdrücklich etwas anderes vereinbart. In keinem
            Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p>
            Wir können die Rückzahlung verweigern, bis wir die Waren wieder
            zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass
            Sie die Waren zurückgesandt haben – je nachdem, welches der frühere
            Zeitpunkt ist.
          </p>
          <p>
            Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen
            14 Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses
            Vertrages informieren, an uns zurückzusenden oder zu übergeben. Die
            Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von 14
            Tagen absenden.
          </p>
          <p>Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
          <p>
            Für einen etwaigen Wertverlust der Waren müssen Sie nur aufkommen,
            wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
            Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang
            mit ihnen zurückzuführen ist.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="pt-4 text-xl font-semibold">
            Ausschluss des Widerrufsrechts
          </h3>
          <p>
            Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von
            Waren, die:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              nicht vorgefertigt sind und für deren Herstellung eine
              individuelle Auswahl oder Bestimmung durch den Verbraucher
              maßgeblich ist, oder
            </li>
            <li>
              eindeutig auf die persönlichen Bedürfnisse des Verbrauchers
              zugeschnitten sind.
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
