# ATS Scan AI

> Get real ATS feedback on your resume. Know where you stand.

## The Problem

Most job seekers don't know why their resumes get rejected. Applicant Tracking Systems (ATS) filter out 75% of resumes before they reach human eyes. Traditional resume builders and generic tips don't tell you what's actually wrong with your specific resume for your target job.

## The Solution

ATS Scan AI provides real, actionable feedback on how your resume performs against actual ATS criteria.

**How it works:**
1. Upload your CV/resume
2. Enter the company name
3. Paste the job description  
4. Get your position/role
5. Let the magic happen

**You'll receive:**
- Overall ATS compatibility score (0-100)
- Category breakdowns: Tone & Style, Content, Structure, Skills
- Specific, actionable improvement suggestions
- Visual scoring with progress indicators

## Features

- **AI-Powered Analysis** - Real ATS scoring based on actual hiring criteria
- **Detailed Scoring** - Category-by-category breakdown of your resume performance
- **Resume Management** - Track and compare multiple resume submissions
- **Beautiful UI** - Modern, responsive design with smooth animations
- **Secure & Private** - Your data stays yours, no selling or data mining

## Tech Stack

**Frontend**
- React 18 - UI library
- TypeScript - Type-safe JavaScript
- Vite - Fast build tool
- TailwindCSS - Utility-first styling
- React Router - Client-side routing

**Backend & Infrastructure**
- Puter.js - Cloud OS acting as containerized environment for AI agents
  - File system management
  - Authentication
  - Data persistence
  - AI agent orchestration

**AI & Analysis**
- Claude AI via Anthropic API
- Custom ATS scoring algorithms
- Real-time resume parsing

## Getting Started

### Prerequisites
- Node.js 18+
- Puter.js account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ats-scan-ai.git
cd ats-scan-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Puter.js credentials to .env

# Run development server
npm run dev

# Open http://localhost:5173
```

### Environment Variables

```env
VITE_PUTER_APP_ID=your_app_id
VITE_PUTER_API_KEY=your_api_key
```

## Project Structure

```
ats-scan-ai/
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utilities and Puter.js integration
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Route pages
│   ├── types/          # TypeScript definitions
│   ├── app.css         # Global styles
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── package.json
```

## Design

The application uses an elegant Navy & Gold color scheme:
- Deep navy backgrounds for professionalism
- Gold accents for premium feel
- Smooth transitions and animations
- Mobile-first responsive design

## Contributing

Contributions are welcome! 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Puter.js for cloud OS platform
- Anthropic for Claude AI
- The open source community

---

Made with ❤️ for job seekers everywhere
