# SmartDNA Platform - CorePersonaDNA

## What We're Building
Multi-tenant SaaS platform for personality assessment based on DNA mapping across 6 business hubs.

## Tech Stack
- Frontend: Next.js with TypeScript
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Styling: Tailwind CSS + shadcn/ui
- Deployment: Docker

## Current Status
Starting fresh build - Hour 1
I'll be your coding assistant! Let me break this down into simple, copy-paste steps. Think of me as your technical translator - I'll tell you exactly what to do.

## 📁 FOLDER STRUCTURE TO CREATE

First, let's create your project structure. Here's what you need to create:

```
SmartDNA/
├── frontend/                 # Your website (what users see)
│   ├── app/                 # Pages of your website
│   ├── components/          # Reusable parts (like LEGO blocks)
│   ├── lib/                 # Helper code
│   └── public/              # Images, logos, etc.
├── backend/                 # Your server (the brain)
│   ├── api/                 # Endpoints (like doors to your data)
│   ├── models/              # Database blueprints
│   ├── services/            # Business logic
│   └── utils/               # Helper functions
├── database/                # Where all data lives
│   └── migrations/          # Database change history
└── docker/                  # Container setup files
```

**TO CREATE THIS:**
1. Right-click on your Desktop
2. Create new folder called "SmartDNA"
3. Open it and create each subfolder by right-clicking → New Folder

## 🗄️ DATABASE DESIGN (In Simple Terms)

Think of your database like a filing cabinet with these drawers:

```
COMPANIES (Tenants)
- Like apartment buildings - each company gets their own space
- Stores: company name, subscription plan, settings

USERS
- People who use the system
- Stores: name, email, password, which company they belong to

ASSESSMENTS
- The actual tests people take
- Stores: questions, type (voice/text), status

RESPONSES
- User's answers to questions
- Stores: the answer, timestamp, which question

DNA_PROFILES
- The calculated personality profile
- Stores: scores for each hub, strengths, recommendations

HUB_SCORES
- Detailed scores for each of the 6 hubs
- Stores: StartHub score, ProfitHub score, etc.
```

## 🚀 FEATURES WE'LL BUILD

1. **User Features:**
   - Sign up/Login
   - Take assessment (text or voice)
   - View DNA profile results
   - Download PDF report
   - Dashboard with insights

2. **Company Admin Features:**
   - Invite team members
   - View team DNA profiles
   - Analytics dashboard
   - Export data

3. **Super Admin Features:**
   - Manage all companies
   - Billing management
   - System settings

## 🛠️ STEP-BY-STEP SETUP COMMANDS

### Step 1: Install Required Software
First, you need these tools (like a carpenter needs a hammer):

**For Mac:**
```bash
# Copy and paste each line into Terminal, press Enter after each
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
brew install python
brew install postgresql
brew install --cask docker
```

**For Windows:**
1. Download and install from these websites:
   - Node.js: https://nodejs.org/
   - Python: https://python.org/
   - PostgreSQL: https://postgresql.org/
   - Docker Desktop: https://docker.com/

### Step 2: Initialize Your Project
Open Terminal/Command Prompt, navigate to your SmartDNA folder:

```bash
# Navigate to your project (adjust path if needed)
cd ~/Desktop/SmartDNA

# Create frontend (Next.js)
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir
# When prompted, just press Enter to accept defaults

# Create backend structure
mkdir backend
cd backend
python -m venv venv
# Activate virtual environment
# Mac/Linux: source venv/bin/activate
# Windows: venv\Scripts\activate

# Create requirements.txt file
echo "fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-jose==3.3.0
passlib==1.7.4
python-multipart==0.0.6
pydantic==2.5.0" > requirements.txt

# Install Python packages
pip install -r requirements.txt

# Go back to main folder
cd ..
```

### Step 3: Create Configuration Files

**Create `.env` file in your SmartDNA folder:**
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/smartdna

# JWT Secret (for security)
SECRET_KEY=your-super-secret-key-change-this

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Backend URL
BACKEND_URL=http://localhost:8000
```

**Create `docker-compose.yml` in your SmartDNA folder:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: smartdna
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🎯 WHAT EACH HUB MEANS

Simple explanation of what makes someone suited for each hub:

1. **StartHub** (Entrepreneur Score)
   - High: Risk-taker, innovative, independent
   - Low: Prefers stability, follows procedures

2. **ProfitHub** (Business Acumen)
   - High: Numbers-focused, ROI-driven, analytical
   - Low: People-focused, mission-driven

3. **TalentHub** (People Skills)
   - High: Great communicator, empathetic, team builder
   - Low: Task-focused, prefers solo work

4. **GrowthHub** (Learning Ability)
   - High: Curious, adaptable, loves challenges
   - Low: Prefers mastery, depth over breadth

5. **ValueHub** (Ethics & Culture)
   - High: Values-driven, integrity-focused
   - Low: Results-focused, pragmatic

6. **TechHub** (Digital Aptitude)
   - High: Tech-savvy, early adopter, digital native
   - Low: Traditional methods, proven tools

## 🚦 NEXT STEPS

1. **Complete the folder structure** - Create all the folders I listed
2. **Run the setup commands** - Copy-paste each command
3. **Create the config files** - Copy the `.env` and `docker-compose.yml`
4. **Start your database** - Run: `docker-compose up -d`

Once you've done these steps, come back and I'll give you the exact code for:
- Your first web page
- Your first API endpoint
- The assessment engine
- The scoring algorithm

**Remember:** You're just following instructions like a recipe. Don't worry about understanding everything - just copy, paste, and run!

Ready to move to the next step? Let me know when you've completed the setup!