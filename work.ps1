# Ajout du chemin pour le dossier only-conv
$dossierOnlyConv = "$dossierImages\only-conv"
if (!(Test-Path -Path $dossierOnlyConv)) {
    New-Item -ItemType Directory -Path $dossierOnlyConv | Out-Null
}

# Modification de la boucle principale
Get-ChildItem -Path "$dossierImages\*" -Include $extensionsImages -File | Where-Object { $_.DirectoryName -ne $dossierDone } | ForEach-Object {
    Write-Host "Traitement de l'image : $($_.Name)"
    $fichierImage = $_.FullName
    $fichierSortie = Join-Path $dossierReady ($_.BaseName + ".webp")

    # Vérification si le fichier est dans le dossier only-conv
    if ($_.DirectoryName -eq $dossierOnlyConv) {
        # Commande pour uniquement convertir en WebP sans redimensionnement
        $commande = "magick `"$fichierImage`" -quality 100 `"$fichierSortie`""
    } else {
        # Commande avec redimensionnement pour les autres dossiers
        $commande = "magick `"$fichierImage`" -background none -resize $($tailleCible)^ -gravity center -extent $tailleCible -quality 100 `"$fichierSortie`""
    }

    # ... existing code ...
} 