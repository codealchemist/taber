# Taber

Your goto app for creating guitar tabs!

<img width="587" height="756" alt="Screenshot 2025-09-21 at 10 26 15" src="https://github.com/user-attachments/assets/e082b35f-6a45-4ec9-9dd8-5b3a3d5c8459" />

## Start

`npm run dev`

## Live app

https://taber.netlify.app

## Features status

- [x] Quick tab
- [ ] Tab collections

## Known issues

- If we remove a tab that's not the last one the next tab number will be `lastNum - 1`. Which will duplicate the last used number. To get the right finger positions we need to add tabs in the right sequence for now.
