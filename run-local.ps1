# PrepSpace Local Automation Boot Script

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "          Starting PrepSpace SaaS            " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Ensure Portable Maven is Available
$mavenDir = Join-Path $PSScriptRoot ".maven"
$extractedMaven = Get-ChildItem -Path $mavenDir -Filter "apache-maven-*" | Select-Object -First 1
if (!$extractedMaven -or !(Test-Path (Join-Path $extractedMaven.FullName "bin/mvn.cmd"))) {
    Write-Host "[1/4] Portable Maven not found or incomplete. Setting up Apache Maven 3.9.6..." -ForegroundColor Green
    if (Test-Path $mavenDir) { Remove-Item $mavenDir -Recurse -Force | Out-Null }
    New-Item -ItemType Directory -Force -Path $mavenDir | Out-Null
    
    $zipPath = Join-Path $mavenDir "maven.zip"
    $mavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
    
    # Download with progress bar disabled for high performance speed
    Write-Host "Downloading Maven from archive..." -ForegroundColor Green
    $ProgressPreference = 'SilentlyContinue'
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $mavenUrl -OutFile $zipPath
    
    Write-Host "Extracting Maven package..." -ForegroundColor Green
    Expand-Archive -Path $zipPath -DestinationPath $mavenDir
    Remove-Item $zipPath
    $extractedMaven = Get-ChildItem -Path $mavenDir -Filter "apache-maven-*" | Select-Object -First 1
}
$mvnCmd = Join-Path $extractedMaven.FullName "bin/mvn.cmd"
Write-Host "Using Maven at: $mvnCmd" -ForegroundColor Gray

# 2. Setup MySQL Database
Write-Host "[2/4] Testing local MySQL Server connection..." -ForegroundColor Green
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
if (!(Test-Path $mysqlPath)) {
    Write-Host "MySQL Server not found at standard path: $mysqlPath" -ForegroundColor Yellow
    Write-Host "Looking for mysql.exe in PATH..." -ForegroundColor Gray
    $mysqlPath = Get-Command mysql.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
}

$dbPass = "root"
$useH2 = $false

if ($mysqlPath) {
    # Check 1: root/root
    $testConn = & $mysqlPath -u root -proot -e "SELECT 1" 2>$null
    if ($lastExitCode -ne 0) {
        # Check 2: empty password
        $testConn = & $mysqlPath -u root -e "SELECT 1" 2>$null
        if ($lastExitCode -eq 0) {
            $dbPass = ""
        } else {
            # Check 3: root/password
            $testConn = & $mysqlPath -u root -ppassword -e "SELECT 1" 2>$null
            if ($lastExitCode -eq 0) {
                $dbPass = "password"
            } else {
                $useH2 = $true
            }
        }
    }
} else {
    $useH2 = $true
}

if (!$useH2) {
    Write-Host "Connected to local MySQL successfully using password: '$dbPass'" -ForegroundColor Cyan
    if ($dbPass -ne "") {
        & $mysqlPath -u root -p"$dbPass" -e "CREATE DATABASE IF NOT EXISTS interview_tracker;" 2>$null
        cmd.exe /c "`"$mysqlPath`" -u root -p`"$dbPass`" interview_tracker < database/schema.sql" 2>$null
        cmd.exe /c "`"$mysqlPath`" -u root -p`"$dbPass`" interview_tracker < database/data.sql" 2>$null
    } else {
        & $mysqlPath -u root -e "CREATE DATABASE IF NOT EXISTS interview_tracker;" 2>$null
        cmd.exe /c "`"$mysqlPath`" -u root interview_tracker < database/schema.sql" 2>$null
        cmd.exe /c "`"$mysqlPath`" -u root interview_tracker < database/data.sql" 2>$null
    }
    
    if ($lastExitCode -ne 0) {
        Write-Host "MySQL database seeding failed. Switching to H2 Fallback." -ForegroundColor Yellow
        $useH2 = $true
    } else {
        Write-Host "Database successfully created and seeded on local MySQL server!" -ForegroundColor Cyan
    }
} else {
    Write-Host "Could not connect to local MySQL. Falling back to local in-memory H2 database (Zero-Configuration Demo Mode)..." -ForegroundColor Cyan
}

# 3. Compile Project
Write-Host "[3/4] Compiling and packaging Java application..." -ForegroundColor Green
& $mvnCmd clean package -DskipTests

if ($lastExitCode -ne 0) {
    Write-Host "Compilation failed! Check code or pom.xml errors." -ForegroundColor Red
    exit 1
}

# 4. Start Application
Write-Host "[4/4] Starting PrepSpace Service on http://localhost:8080 ..." -ForegroundColor Green
$jarFile = Get-ChildItem -Path "target" -Filter "InterviewPreparationTracker-*.jar" | Select-Object -First 1

if (!$jarFile) {
    Write-Host "Compiled JAR file not found in target directory." -ForegroundColor Red
    exit 1
}

# Set database environment variables for Spring Boot process
if ($useH2) {
    $javaArgs = @(
        "-jar", $jarFile.FullName,
        "--spring.datasource.url=jdbc:h2:mem:interview_tracker;MODE=MySQL;DB_CLOSE_DELAY=-1",
        "--spring.datasource.driver-class-name=org.h2.Driver",
        "--spring.datasource.username=sa",
        "--spring.datasource.password=",
        "--spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "--spring.sql.init.mode=always",
        "--spring.sql.init.schema-locations=file:database/schema.sql",
        "--spring.sql.init.data-locations=file:database/data.sql"
    )
} else {
    $env:DB_HOST = "localhost"
    $env:DB_PORT = "3306"
    $env:DB_NAME = "interview_tracker"
    $env:DB_USER = "root"
    $env:DB_PASSWORD = $dbPass
    $javaArgs = @("-jar", $jarFile.FullName, "--spring.datasource.password=$dbPass")
}

# Run Frontend statically by launching browser
Write-Host "Launching Frontend application in browser..." -ForegroundColor Cyan
Start-Process "frontend/index.html"

java @javaArgs
