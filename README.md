# ✈️ SkyTrace

A real-time aircraft radar and flight telemetry web application built with **React**, **Leaflet**, and the **OpenSky Network API**.

---

## 📖 Table of Contents
- [Features](#-features)
- [Architecture & Design Docs](#-architecture--design-docs)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)

---

## ✨ Features
* **Live Radar View:** Renders real-time aircraft markers on a dark-mode interactive map.
* **Heading Alignment:** Calculates dynamic rotation ($\theta$) to align airplane icons with true compass headings.
* **Telemetry Inspection:** Displays aircraft callsigns, converted altitude (ft), speed (knots), and position on marker click.
* **Auto-Polling Radar:** Refreshes live airspace vectors every 15–30 seconds automatically.

---

## 📐 Architecture & Design Docs
This application was architected from the ground up prior to implementation. 

* 📄 **[Read the Full Technical Design Document (TDD)](docs/TDD.md)** — Includes Lucidchart sequence diagrams, state breakdown, utility algorithms, and testing strategies.

---

## 🛠️ Tech Stack
* **Frontend:** React (Vite), JavaScript (ES6+)
* **Mapping Engine:** Leaflet, React-Leaflet
* **Styling & Icons:** Lucide-React, Custom CSS3 Transforms
* **Data Layer:** Axios, OpenSky REST API

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **npm**

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/skytrace.git](https://github.com/YOUR_USERNAME/skytrace.git)
   cd skytrace
