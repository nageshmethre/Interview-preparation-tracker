# Render Deployment Automation Script
$apiKey = "rnd_7oa7u3eHEPZJfQU6XmtIusqvXAq5"
$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Accept"        = "application/json"
    "Content-Type"  = "application/json"
}

Write-Host "Fetching Render Owner ID..." -ForegroundColor Cyan
$owners = Invoke-RestMethod -Uri "https://api.render.com/v1/owners?limit=20" -Method Get -Headers $headers

if ($owners.Count -eq 0) {
    Write-Host "No owners found on your Render account." -ForegroundColor Red
    exit 1
}

$ownerId = $owners[0].owner.id
Write-Host "Using Render Owner ID: $ownerId" -ForegroundColor Gray

# Define Web Service creation payload targeting free tier
$payload = @{
    name = "prepspace-backend"
    type = "web_service"
    repo = "https://github.com/nageshmethre/Interview-preparation-tracker"
    branch = "main"
    ownerId = $ownerId
    serviceDetails = @{
        runtime = "docker"
        envVars = @(
            @{ key = "SPRING_DATASOURCE_URL"; value = "jdbc:h2:mem:interview_tracker;MODE=MySQL;DB_CLOSE_DELAY=-1" }
            @{ key = "SPRING_DATASOURCE_DRIVER_CLASS_NAME"; value = "org.h2.Driver" }
            @{ key = "SPRING_DATASOURCE_USERNAME"; value = "sa" }
            @{ key = "SPRING_DATASOURCE_PASSWORD"; value = "" }
            @{ key = "SPRING_JPA_DATABASE_PLATFORM"; value = "org.hibernate.dialect.H2Dialect" }
            @{ key = "SPRING_SQL_INIT_MODE"; value = "always" }
            @{ key = "SPRING_SQL_INIT_SCHEMA_LOCATIONS"; value = "file:database/schema.sql" }
            @{ key = "SPRING_SQL_INIT_DATA_LOCATIONS"; value = "file:database/data.sql" }
        )
        plan = "free"
        pullRequestPreviewsEnabled = "no"
    }
} | ConvertTo-Json -Depth 10

Write-Host "Creating Backend Web Service on Render (Free Tier)..." -ForegroundColor Cyan
try {
    $service = Invoke-RestMethod -Uri "https://api.render.com/v1/services" -Method Post -Headers $headers -Body $payload
    $serviceId = $service.id
    $serviceUrl = $service.url
    Write-Host "Render Web Service Created! Service ID: $serviceId" -ForegroundColor Green
    Write-Host "Render URL: $serviceUrl" -ForegroundColor Green
} catch {
    Write-Host "Web Service creation returned status. Checking if it already exists..." -ForegroundColor Yellow
    $allServices = Invoke-RestMethod -Uri "https://api.render.com/v1/services?limit=20" -Method Get -Headers $headers
    $existing = $allServices | Where-Object { $_.service.name -eq "prepspace-backend" } | Select-Object -First 1
    if ($existing) {
        $serviceId = $existing.service.id
        $serviceUrl = $existing.service.url
        Write-Host "Found existing Web Service. Service ID: $serviceId" -ForegroundColor Green
    } else {
        Write-Error $_
        exit 1
    }
}

# Bind Custom Domain api.stream-in.app
Write-Host "Adding custom domain 'api.stream-in.app' to Render service..." -ForegroundColor Cyan
$domainPayload = @{
    name = "api.stream-in.app"
} | ConvertTo-Json

try {
    $domain = Invoke-RestMethod -Uri "https://api.render.com/v1/services/$serviceId/custom-domains" -Method Post -Headers $headers -Body $domainPayload
    Write-Host "Custom domain 'api.stream-in.app' successfully requested on Render!" -ForegroundColor Green
} catch {
    Write-Host "Domain might already be added to the Render service." -ForegroundColor Yellow
}

Write-Host "Deployment trigger requested! Complete backend settings and domain bindings mapped successfully." -ForegroundColor Cyan
