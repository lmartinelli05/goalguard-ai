# 🛡️ GoalGuard AI - Performance Intelligence for Goalkeepers

**GoalGuard AI** is a high-end, professional AI-powered analysis platform designed specifically for football goalkeepers and their coaches. Unlike traditional video analysis, GoalGuard AI focuses on **Biomechanical Performance Intelligence**, comparing a goalkeeper's real-time movements against a "Technical Blueprint" defined by the coach.

---

## 🚀 Key Features

### 🧠 Technical Blueprint
Allow coaches to define the "Gold Standard" for every intervention. Set ideal values and tolerances for:
- **Positioning:** Alignment relative to the goal line and ball.
- **Torso:** Angle of inclination for explosive movements.
- **Hands:** Optimal waiting position for reaction.
- **Footwork:** Efficiency of adjustment steps.

### 🧬 Biomechanical Analysis
Real-time AI overlay using Pose Estimation to evaluate technique:
- $\color{green}{\text{Green (Correct)}}$: Movement aligns with the Blueprint.
- $\color{yellow}{\text{Yellow (Warning)}}$: Acceptable, but room for improvement.
- $\color{red}{\text{Red (Error)}}$: Technical failure requiring correction.

### 📊 Performance Reporting
Automated generation of comprehensive technical reports:
- **Statistical Dashboard:** Percentage of correct, warning, and error executions.
- **Top 3 Analysis:** Automatic identification of the top 3 strengths and top 3 critical errors.
- **Training Bridge:** Direct mapping of technical errors to specific training drills.

### ✂️ Smart Reel Curator
Automatic video clipping based on AI analysis:
- **Excellence Reel:** A compilation of perfectly executed saves.
- **Error Reel:** A concentrated video of technical failures for review and correction.

### 🌐 Ecosystem Integration
Seamless connection with professional recording hardware:
- **Auto-Ingest:** Integration with `Veo`, `Hudl`, and `Pixellot` for cloud-to-cloud video synchronization.
- **Metadata Sync:** Importing existing event tags to accelerate AI analysis.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)
- **AI Pipeline (Planned):** YOLOv11, MediaPipe, and OpenSportsLib.

---

## 📦 Installation & Setup

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/goalguard-ai.git
   cd goalguard-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment to Vercel

This project is optimized for Vercel. To deploy:

1. Push your code to a **GitHub** repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New"** $\rightarrow$ **"Project"**.
4. Import your  repository.
5. Click **"Deploy"**.

Your site will be live at `https://goalguard-ai.vercel.app` (or your custom domain).

---

## 🤝 Contributing
This project is in active development. Contributions to the biomechanical logic or UI are welcome!
