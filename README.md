# warmup-challenge_Promptwars

## CookPlan Daily - Setup Instructions

### Prerequisites
- Node.js 18+
- Supabase CLI installed (`npm install -g supabase`)
- Gemini API Key (Gemini 2.0 Flash)

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize and Push Database
```bash
npx supabase init
npx supabase start
npx supabase db push
```

### 3. Set Edge Function Secrets
```bash
npx supabase secrets set GEMINI_API_KEY=your_gemini_api_key
```

### 4. Deploy Edge Functions
Deploy all three edge functions to your Supabase project:
```bash
npx supabase functions deploy generate-meal-plan
npx supabase functions deploy generate-grocery-list
npx supabase functions deploy get-substitutes
```

### 5. Local Environment Variables
Create a `.env.local` file in the root of the project (you can copy `.env.example`) and add your Supabase project credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 6. Run the App Locally
```bash
npm run dev
```
