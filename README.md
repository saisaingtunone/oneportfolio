# One — Design Portfolio

This GitHub Pages edition includes the homepage, 25 project pages, galleries, competition video, and contact links.

## Publish on GitHub Pages

1. Create an empty public GitHub repository named `portfolio`. Extract the ZIP and open Terminal in the `one-portfolio` folder. Replace `YOUR-USERNAME` with your GitHub username.

   ```bash
   git init -b main
   git add .
   git commit -m "Add portfolio"
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```

2. Open the repository on GitHub. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Actions → Publish portfolio** and choose **Run workflow** on `main`. When the run succeeds, **Settings → Pages** shows your published link.

The workflow builds the site when you push to `main`. It reads the Pages base path automatically, so it also works if you choose a different repository name or an account site named `YOUR-USERNAME.github.io`.

[GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Add or update a project

- Edit the `projects` list in `src/content.ts`. Choose a unique, lowercase `id` with hyphens for the project URL.
- Place the cover image and gallery images in `public/assets`. The `image` field uses the path under that folder without the `.webp` extension.
- Use `ui`, `poster`, `logo`, or `work` for the category. Add your contribution, outcome, and any live site or prototype links.
- Update contact or CV links in the `profile` object at the top of `src/content.ts`.

For example, add an entry like this inside `projects` and add its cover as `public/assets/new-project.webp`.

```ts
{
  id: 'new-project',
  title: 'New Project',
  category: 'ui',
  image: 'new-project',
  imageAlt: 'The project’s desktop and mobile screens',
  summary: 'A short introduction to the project.',
  role: 'UI/UX Designer',
  sections: [
    ['Overview', 'What the project needed.'],
    ['My contribution', 'What I designed and built.'],
    ['Outcome', 'What the team delivered.'],
  ],
},
```

Commit and push your changes to `main` to publish the update at the same GitHub Pages URL.

## Preview on your computer

Use Node.js 24. Run these commands in the repository folder.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. `npm run typecheck` checks TypeScript, and `npm run build` generates the static site in `dist`.

