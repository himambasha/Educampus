# Run this INSIDE your cloned Educampus repo folder
# Usage (PowerShell):
#   git clone https://github.com/himambasha/Educampus.git
#   cd Educampus
#   .\create-structure.ps1
#   git add .
#   git commit -m "Add account module folder structure"
#   git push origin main
#
# If script execution is blocked, first run:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Helper function: creates folder (if needed) and empty file
function New-File {
    param([string]$Path)
    $dir = Split-Path $Path -Parent
    if ($dir -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    if (-not (Test-Path $Path)) {
        New-Item -ItemType File -Path $Path -Force | Out-Null
    }
}

# ---------- src/config ----------
New-File "src/config/db.config.js"
New-File "src/config/otp.config.js"
New-File "src/config/mail.config.js"
New-File "src/config/storage.config.js"

# ---------- src/modules/auth ----------
New-File "src/modules/auth/auth.controller.js"
New-File "src/modules/auth/auth.routes.js"
New-File "src/modules/auth/auth.service.js"
New-File "src/modules/auth/auth.validation.js"
New-File "src/modules/auth/auth.model.js"

# ---------- src/modules/user ----------
New-File "src/modules/user/user.controller.js"
New-File "src/modules/user/user.routes.js"
New-File "src/modules/user/user.service.js"
New-File "src/modules/user/user.model.js"
New-File "src/modules/user/user.validation.js"

# ---------- src/modules/cms ----------
New-File "src/modules/cms/cms.controller.js"
New-File "src/modules/cms/cms.routes.js"
New-File "src/modules/cms/cms.service.js"
New-File "src/modules/cms/cms.model.js"

# ---------- src/modules/subscription ----------
New-File "src/modules/subscription/subscription.controller.js"
New-File "src/modules/subscription/subscription.routes.js"
New-File "src/modules/subscription/subscription.service.js"
New-File "src/modules/subscription/subscription.model.js"
New-File "src/modules/subscription/userSubscription.model.js"

# ---------- src/modules/feedback ----------
New-File "src/modules/feedback/feedback.controller.js"
New-File "src/modules/feedback/feedback.routes.js"
New-File "src/modules/feedback/feedback.service.js"
New-File "src/modules/feedback/feedback.model.js"
New-File "src/modules/feedback/feedback.validation.js"

# ---------- src/modules/exam ----------
New-File "src/modules/exam/exam.controller.js"
New-File "src/modules/exam/exam.routes.js"
New-File "src/modules/exam/exam.service.js"
New-File "src/modules/exam/exam.model.js"
New-File "src/modules/exam/examAttempt.model.js"

# ---------- src/middlewares ----------
New-File "src/middlewares/auth.middleware.js"
New-File "src/middlewares/subscription.middleware.js"
New-File "src/middlewares/upload.middleware.js"
New-File "src/middlewares/error.middleware.js"
New-File "src/middlewares/validate.middleware.js"

# ---------- src/utils ----------
New-File "src/utils/otpGenerator.js"
New-File "src/utils/jwt.util.js"
New-File "src/utils/response.util.js"
New-File "src/utils/logger.js"
New-File "src/utils/dateTime.util.js"

# ---------- src/admin ----------
New-File "src/admin/subscription/adminSubscription.controller.js"
New-File "src/admin/subscription/adminSubscription.routes.js"

New-File "src/admin/cms/adminCms.controller.js"
New-File "src/admin/cms/adminCms.routes.js"

New-File "src/admin/exam/adminExam.controller.js"
New-File "src/admin/exam/adminExam.routes.js"

# ---------- src/database ----------
New-File "src/database/migrations/.gitkeep"
New-File "src/database/seeders/cmsPages.seeder.js"
New-File "src/database/seeders/subscriptionPlans.seeder.js"

# ---------- src root files ----------
New-File "src/app.js"
New-File "src/server.js"

# ---------- uploads ----------
New-File "uploads/profile-pictures/.gitkeep"

# ---------- tests ----------
New-File "tests/auth.test.js"
New-File "tests/user.test.js"
New-File "tests/subscription.test.js"
New-File "tests/feedback.test.js"
New-File "tests/exam.test.js"

# ---------- root files ----------
New-File ".env"
New-File ".gitignore"
New-File "package.json"
New-File "README.md"

Write-Host "Folder structure created successfully!" -ForegroundColor Green
Write-Host "Now run:"
Write-Host "  git add ."
Write-Host "  git commit -m 'Add account module folder structure'"
Write-Host "  git push origin main"
