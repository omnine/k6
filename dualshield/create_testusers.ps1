#create mailbox
$total=20
$start=10000
$index = 1

Write-Host "creating a csv file using add content method"
$location="testusers.csv"
Add-Content -Path $location   -Value '"username","deviceId"'

Do
{
#username format L10000.T10000
    $firstname="L$start"
    $lastname="T$start"

   
    $guid = [guid]::NewGuid().ToString().ToUpperInvariant();
    
    $wl = "$firstname.$lastname@$domain, $guid"
    
    Add-Content -Path  $location -Value $wl

    $start++
	$index++
}
While ($index -le $total)
Write-Host "Csv file is created at the location : $($location)" -ForegroundColor Green