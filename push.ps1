# PrepSpace Git Push Helper Script
Write-Host "Resetting Git remote URL to standard public link..." -ForegroundColor Cyan
git remote set-url origin https://github.com/nageshmethre/Interview-preparation-tracker.git

Write-Host "Pushing committed files to GitHub remote (main branch)..." -ForegroundColor Green
git push -u origin main

if ($lastExitCode -eq 0) {
    Write-Host "Project successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Push failed. If you use SSH keys, run: git remote set-url origin git@github.com:nageshmethre/Interview-preparation-tracker.git" -ForegroundColor Yellow
}
