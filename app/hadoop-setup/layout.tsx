import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hadoop Setup Script | Mohit Paddhariya",
  description: "A beautiful and automated installer for Apache Hadoop on macOS. One-line installation with proper configuration for HDFS, YARN, and MapReduce.",
  keywords: [
    "hadoop", 
    "apache hadoop", 
    "macos", 
    "installer", 
    "automation", 
    "hdfs", 
    "yarn", 
    "mapreduce", 
    "big data", 
    "mohit paddhariya"
  ],
  openGraph: {
    title: "Hadoop Setup Script | Mohit Paddhariya",
    description: "A beautiful and automated installer for Apache Hadoop on macOS. One-line installation with proper configuration.",
    type: "website",
    url: "https://mohitp.me/hadoop-setup",
    images: [
      {
        url: "https://mohitp.me/og_image.jpeg",
        width: 1200,
        height: 630,
        alt: "Hadoop Setup Script by Mohit Paddhariya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hadoop Setup Script | Mohit Paddhariya",
    description: "A beautiful and automated installer for Apache Hadoop on macOS. One-line installation with proper configuration.",
    images: ["https://mohitp.me/og_image.jpeg"],
  },
  alternates: {
    canonical: "https://mohitp.me/hadoop-setup",
  },
};

export default function HadoopSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
