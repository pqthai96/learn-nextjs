import * as React from "react";
import {MainLayout} from "@/components/layout";

export interface AboutPageProps {
}

export default function AboutPage(props: AboutPageProps) {
  return (
      <h1 className="text-5xl">About Page</h1>
  )
}

AboutPage.Layout = MainLayout;