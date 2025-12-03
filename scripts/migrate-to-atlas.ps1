# MongoDB Migration Script
# This script dumps data from the local MongoDB instance and restores it to MongoDB Atlas.

# Configuration
$LocalUri = "mongodb://localhost:27017/campus-bite"
$AtlasUri = "mongodb+srv://vasuk:SfgqOS2etf4DYyQK@cluster0.ima13pi.mongodb.net/campus-bite?appName=Cluster0&connectTimeoutMS=60000"
$DumpDir = "dump"

# Check if tools are installed
if (-not (Get-Command "mongodump" -ErrorAction SilentlyContinue)) {
    Write-Error "mongodump is not installed. Please install MongoDB Database Tools: https://www.mongodb.com/try/download/database-tools"
    exit 1
}
if (-not (Get-Command "mongorestore" -ErrorAction SilentlyContinue)) {
    Write-Error "mongorestore is not installed. Please install MongoDB Database Tools: https://www.mongodb.com/try/download/database-tools"
    exit 1
}

Write-Host "Starting migration..."
Write-Host "1. Dumping data from local MongoDB ($LocalUri)..."

# Dump local data
# Note: --forceTableScan might be needed if you don't have permissions to list collections, but usually not for local.
mongodump --uri="$LocalUri" --out="$DumpDir"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to dump data from local MongoDB."
    exit 1
}

Write-Host "Data dumped successfully to ./$DumpDir"
Write-Host "2. Restoring data to MongoDB Atlas ($AtlasUri)..."

# Restore to Atlas
# We point to the specific database dump directory
mongorestore --uri="$AtlasUri" --drop "$DumpDir/campus-bite"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to restore data to MongoDB Atlas."
    exit 1
}

Write-Host "Migration completed successfully!"
Write-Host "You can now verify the data in MongoDB Atlas."
