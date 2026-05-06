"use client";

import Navbar from "./Navbar";
import HomeHero from "./HomeHero";
import FeatureStats from "./FeatureStats";
import PopularApis from "./PopularApis";
import DatabaseSection from "./DatabaseSection";
import ChatBox from "./ChatBox";
import { providers } from "@/data/providers";
import { useState } from "react";
import Footer from "./Footer";
export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar />

      <HomeHero search={search} onSearchChange={setSearch} />

      <FeatureStats />

      <PopularApis providers={providers} />

      <DatabaseSection />

      <ChatBox />
      <Footer />
    </div>
  );
}