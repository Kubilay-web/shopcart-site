"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/images/logo.png";
import banner from "@/images/banner.jpeg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <main className="w-full space-y-4 pb-5">
      {/* Hero Section */}
      <div className="flex items-center bg-secondary h-[85vh] mx-6 rounded-lg overflow-hidden">
        {/* Left side */}
        <div className="space-y-7 p-6 pt-0 text-left md:w-1/2">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={Logo}
              alt="Bet Print logo"
              width={80}
              height={80}
              priority
            />
            <span className="sr-only">Bet Print</span>
          </Link>

          <h1 className="text-xl font-medium lg:text-xl text-center">
            Thermorollen für Wettbüros – zuverlässig, nachhaltig,
          </h1>

          <p className="!mt-2 text-sm lg:text-lg leading-relaxed">
            <span className="block text-md lg:text-md text-center font-bold mb-3">
              Made in Germany
            </span>
            Als spezialisierter Partner für Wettbüros in Deutschland liefern wir
            Thermorollen, die präzise auf die Bondrucker und Terminals aller
            lizenzierten Wettanbieter abgestimmt sind. Ob Quittungen, Wettscheine
            oder Belege – unsere Produkte stehen für Zuverlässigkeit, Langlebigkeit
            und ein hohes Maß an Umweltbewusstsein.
            <br />
            Unsere Thermorollen werden ausschließlich in Deutschland produziert –
            nach strengen Umwelt- und Qualitätsstandards. Sie sind frei von
            Bisphenolen (BPA, BPS, BPF) sowie phenolhaltigen Farbentwicklern und
            bieten damit eine sichere und nachhaltige Lösung für den täglichen
            Betrieb.
            <br />
            Ihr Vorteil: Thermorollen, die exakt auf die Bedürfnisse von Wettshops
            zugeschnitten sind – nachhaltig, sicher und sofort einsatzbereit.
          </p>

          <Button asChild>
            <Link href="/shop" className="inline-flex items-center">
              Jetzt einkaufen <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>

        {/* Right side */}
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="Bet Print Shop banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
