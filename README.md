# ChukkVS — Your Blog

A real, database-backed blog site with an admin editor. Only you can publish.

Built with Next.js, Supabase (database + login), and Vercel (free hosting).

---

## TABLE OF CONTENTS

1. [What You're About To Do](#1-what-youre-about-to-do)
2. [One-Time Windows Setup](#2-one-time-windows-setup)
3. [Step 1 — Run The Project Locally](#step-1--run-the-project-locally)
4. [Step 2 — Set Up Supabase](#step-2--set-up-supabase-database--login)
5. [Step 3 — Connect The Project To Supabase](#step-3--connect-the-project-to-supabase)
6. [Step 4 — Create Your Editor Account](#step-4--create-your-editor-account)
7. [Step 5 — Test It Locally](#step-5--test-it-locally)
8. [Step 6 — Put It On GitHub](#step-6--put-it-on-github)
9. [Step 7 — Deploy To Vercel (Go Live!)](#step-7--deploy-to-vercel-go-live)
10. [How To Write Posts](#how-to-write-posts)
11. [Troubleshooting](#troubleshooting)

---

## 1. WHAT YOU'RE ABOUT TO DO

You're going to:
1. Install two programs on Windows (Node.js + Git). One-time thing.
2. Make three free accounts (GitHub, Supabase, Vercel).
3. Run a few commands to test the site on your laptop.
4. Push the code to GitHub, then connect Vercel so it goes live on the internet.

**Time: about 45 minutes the first time.** After that, publishing new posts takes 30 seconds.

**Cost: $0.** You only pay if you want a custom domain name later (~$12/year).

---

## 2. ONE-TIME WINDOWS SETUP

### 2a. Install Node.js

1. Go to https://nodejs.org
2. Click the big green **LTS** button to download
3. Run the installer. Click Next through everything (defaults are fine)
4. Open **Command Prompt** (press Windows key, type "cmd", hit enter)
5. Type this and press enter:
   ```
   node --version
   ```
   If you see a version number like `v20.18.0`, it worked.

### 2b. Install Git

1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Click Next through everything (defaults are fine)
4. In Command Prompt, type:
   ```
   git --version
   ```
   If you see a version number, you're good.

### 2c. Install VS Code (recommended — it's a code editor)

1. Go to https://code.visualstudio.com
2. Download and install. This is what you'll use to look at and edit your project.

---

## STEP 1 — RUN THE PROJECT LOCALLY

1. **Unzip the project folder** somewhere easy like your Desktop. You should have a folder called `chukkvs`.

2. **Open Command Prompt** (Windows key → type "cmd" → enter).

3. **Navigate into the project folder.** If it's on your Desktop:
   ```
   cd Desktop\chukkvs
   ```

4. **Install dependencies.** This downloads all the code libraries the project needs. Takes 1-2 minutes:
   ```
   npm install
   ```
   You'll see a lot of text scroll. Wait until you get your prompt back.

5. Don't try to run the site yet — it needs Supabase credentials first (next step).

---

## STEP 2 — SET UP SUPABASE (DATABASE + LOGIN)

Supabase is where your posts live and where your login is handled. It's free.

1. Go to https://supabase.com and click **Start your project**.
2. Sign up (use GitHub to sign up if you want — easiest).
3. Click **New Project**. Fill in:
   - **Name:** ChukkVS (or whatever)
   - **Database password:** make a strong password. **WRITE IT DOWN somewhere safe.** You won't need it often, but you can't recover it.
   - **Region:** pick one close to you (East US, probably)
   - Click **Create new project**.
4. Wait 1-2 minutes while it provisions.

### Run the database setup SQL

1. In the left sidebar of Supabase, click the **SQL Editor** icon (looks like `>_`).
2. Click **New query**.
3. Open the file `database/setup.sql` in your project folder (use Notepad or VS Code).
4. **Copy the entire contents** of that file.
5. Paste it into the Supabase SQL editor.
6. Click **Run** (bottom right).
7. You should see "Success. No rows returned." — that means your database table is created.

### Grab your project keys

1. In the Supabase left sidebar, click the **gear icon** (Project Settings) at the bottom.
2. Click **API** in the left panel.
3. You'll see two things you need:
   - **Project URL** (something like `https://abcdefgh.supabase.co`)
   - **anon public key** (a long string starting with `eyJ...`)
4. Keep this tab open — you'll copy these in the next step.

---

## STEP 3 — CONNECT THE PROJECT TO SUPABASE

1. In your project folder, find the file `.env.example`.
2. **Make a copy of it** in the same folder and rename the copy to exactly `.env.local`
   - (On Windows: right-click → Copy → right-click in folder → Paste → rename)
   - If Windows hides the `.env` extension, you may need to enable "File name extensions" under View in File Explorer.
3. Open `.env.local` in Notepad or VS Code.
4. Replace the placeholders with the values from the Supabase settings page:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your-long-key-here
   ```
5. Save the file.

---

## STEP 4 — CREATE YOUR EDITOR ACCOUNT

This is the login that lets you publish posts.

1. In Supabase, click **Authentication** in the left sidebar.
2. Click the **Users** tab.
3. Click **Add user → Create new user**.
4. Enter:
   - Your email
   - A strong password (write it down)
   - Check **Auto Confirm User** so you don't have to verify an email
5. Click **Create user**.

That's your editor account. This is the ONLY account that will ever be able to publish, because you'll never give the signup form to anyone else.

### Disable public signups (important!)

1. Still in Authentication, click **Providers** in the left panel.
2. Click **Email** to expand it.
3. Turn OFF **Enable Sign Ups** (so nobody can create new accounts).
4. Click **Save**.

Now only the account you just created can log in.

---

## STEP 5 — TEST IT LOCALLY

1. Back in Command Prompt (still in your project folder), run:
   ```
   npm run dev
   ```
2. Wait until you see `Ready in X.Xs` and a URL like `http://localhost:3000`.
3. Open that URL in Chrome. You should see your ChukkVS empty state.
4. Go to `http://localhost:3000/login`, sign in with your editor email and password.
5. You'll land on `/admin`. Click **+ New Case** and write a test post.
6. Hit **Publish** — then go back to `/` and you should see it listed!

When you're done testing, go back to Command Prompt and press `Ctrl + C` to stop the server.

---

## STEP 6 — PUT IT ON GITHUB

GitHub is where your code lives so Vercel can deploy it.

1. Go to https://github.com and sign up (free).
2. Click the **+** in the top right → **New repository**.
3. Name it `chukkvs`. Leave everything else default. **Make it Private** if you don't want strangers reading your source code.
4. Click **Create repository**.
5. You'll see a page with instructions. **Don't follow them directly** — do this instead. Open Command Prompt in your project folder and run these, one at a time:

   ```
   git init
   ```
   ```
   git add .
   ```
   ```
   git commit -m "First commit"
   ```
   ```
   git branch -M main
   ```
   ```
   git remote add origin https://github.com/YOUR-USERNAME/chukkvs.git
   ```
   (replace `YOUR-USERNAME` with your actual GitHub username)
   ```
   git push -u origin main
   ```

6. Git might ask you to sign in — a browser window pops up, sign in with GitHub.
7. Refresh your GitHub repo page. You should see all your files.

---

## STEP 7 — DEPLOY TO VERCEL (GO LIVE!)

1. Go to https://vercel.com and click **Sign Up**. Sign up with **Continue with GitHub** (easiest).
2. Once in, click **Add New... → Project**.
3. Find your `chukkvs` repo in the list and click **Import**.
4. **Important:** before clicking Deploy, expand the **Environment Variables** section and add BOTH of these (same as your `.env.local`):
   - Name: `NEXT_PUBLIC_SUPABASE_URL` — Value: your Supabase URL
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Value: your Supabase anon key
5. Click **Deploy**. Wait 2-3 minutes.
6. When it's done, you'll get a URL like `chukkvs.vercel.app`.
7. Click it. That's your real, live, on-the-internet blog. 🎉

From now on, **every time you push code to GitHub, Vercel redeploys automatically.**

### Go to your live site and log in

Visit `https://YOUR-SITE.vercel.app/login`, sign in with your editor email, and publish away.

---

## HOW TO WRITE POSTS

1. Go to `https://YOUR-SITE.vercel.app/login`
2. Sign in.
3. Click **+ New Case**.
4. Fill in:
   - **Case Number** — auto-fills with the next number
   - **Title** — the big headline. Tip: if you type "VS" anywhere in the title, it'll render in red italic automatically. Example: `ChukkVS The Housing Crisis` → `Chukk` in cream, `VS` in red italic, then the rest.
   - **URL Slug** — auto-fills from the title. Leave it or edit it.
   - **Category** — pick from the dropdown
   - **Excerpt** — 2-3 sentences shown on the front page
   - **Body** — write in markdown:
     - `# Big heading` / `## Smaller heading`
     - `**bold**` and `*italic*`
     - `> This is a quote`
     - `- Bullet` `- Points`
     - `[Link text](https://example.com)`
5. Click **Save as Draft** to work on it later, or **Publish** to make it live.
6. Edit or delete from the admin dashboard any time.

### Writing posts somewhere else first

You can write your post in any markdown editor (Obsidian, Notion, plain Notepad, etc.) and then just paste the markdown into the Body field. That's the "write somewhere else and upload" flow you wanted.

---

## TROUBLESHOOTING

### "npm is not recognized"
Node.js didn't install properly. Re-run the Node installer and restart Command Prompt.

### "git is not recognized"
Same thing — re-run the Git installer and restart Command Prompt.

### Login says "Invalid login credentials"
Check the email/password you made in Supabase Authentication → Users. You can reset the password there.

### Deployed site shows an error
Most common cause: you forgot to add environment variables in Vercel. Go to your project → Settings → Environment Variables and add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Then go to Deployments and redeploy the latest one.

### I changed something locally, how do I deploy the update?
Open Command Prompt in your project folder:
```
git add .
git commit -m "describe what you changed"
git push
```
Vercel auto-deploys. Takes 1-2 minutes.

### Something broke and I don't know how to fix it
Paste the error message back into Claude and it can diagnose.

---

## PROJECT STRUCTURE (for curious learning)

```
chukkvs/
├── app/
│   ├── layout.tsx          Root layout (header, footer, admin bar)
│   ├── page.tsx            Homepage — lists all published posts
│   ├── globals.css         All the styles
│   ├── login/              Login page
│   ├── admin/              Dashboard, new post, edit post (auth-protected)
│   ├── post/[slug]/        Individual post pages
│   ├── about/              About page
│   └── api/auth/signout/   Sign-out handler
├── components/
│   ├── SiteHeader.tsx      Header with logo, nav, ticker, dateline
│   ├── SiteFooter.tsx      Footer
│   ├── AdminBar.tsx        Top bar shown only when logged in
│   └── PostEditor.tsx      The write/edit form
├── lib/
│   ├── supabase-browser.ts For client components
│   └── supabase-server.ts  For server components
├── database/
│   └── setup.sql           What you ran in Supabase
├── middleware.ts           Refreshes auth sessions
├── .env.example            Template for your secrets
└── package.json            Project dependencies
```

---

Built for Chuckkys. Go file some cases.
