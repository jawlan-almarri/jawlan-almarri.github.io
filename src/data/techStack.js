/**
 * Tech-stack logos shown in the marquee strip below the hero.
 * Each entry is { name, icon } where `icon` is an imported SVG asset.
 * Order is intentional; edit/extend this single list to change the marquee.
 */
import python from "@/assets/tech/python.svg";
import sap from "@/assets/tech/sap.svg";
import googlecloud from "@/assets/tech/googlecloud.svg";
import react from "@/assets/tech/react.svg";
import nextjs from "@/assets/tech/nextjs.svg";
import docker from "@/assets/tech/docker.svg";
import postgresql from "@/assets/tech/postgresql.svg";
import vscode from "@/assets/tech/vscode.svg";
import frappe from "@/assets/tech/frappe.svg";
import csharp from "@/assets/tech/csharp.svg";
import dotnet from "@/assets/tech/dotnet.svg";
import kalilinux from "@/assets/tech/kalilinux.svg";

export const TECH_STACK = [
  { name: "Python", icon: python },
  { name: "SAP", icon: sap },
  { name: "Google Cloud", icon: googlecloud },
  { name: "React", icon: react },
  { name: "Next.js", icon: nextjs },
  { name: "Docker", icon: docker },
  { name: "PostgreSQL", icon: postgresql },
  { name: "VS Code", icon: vscode },
  { name: "Frappe", icon: frappe },
  { name: "C#", icon: csharp },
  { name: ".NET", icon: dotnet },
  { name: "Kali Linux", icon: kalilinux },
];
