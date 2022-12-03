import os
"""
Script pour convertir l'extension pour firefox
"""

# Forme du quadruplet : (
# arg1: fichier à modifier,
# arg2: ligne à modifier (* pour toutes les lignes),
# arg3: string pour chrome,
# arg4: string pour firefox
# )
changements = (
    ("manifest.json", 2, "3", "2"),
    ("manifest.json", 22, '"service_worker": "background/background.js"', '"scripts": ["background/background.js"]'),
    ("background/background.js", "*", "chrome", "browser"),
    ("content_scripts/app.js", "*", "chrome", "browser"),
)


def adapter_pour(navigateur: str):
    """
    :param str navigateur: "firefox" ou "chrome"
    """
    print("[!] Début de la conversion")
    for i in range(len(changements)):
        fin = open(os.path.join(os.path.dirname(__file__), changements[i][0]), "rt")
        if changements[i][1] != "*":
            lignes = fin.readlines()
            lignes[changements[i][1]-1] = lignes[changements[i][1]-1].replace(changements[i][2] if navigateur == "firefox" else changements[i][3], changements[i][3] if navigateur == "firefox" else changements[i][2])
            fin.close()
            fin = open(os.path.join(os.path.dirname(__file__), changements[i][0]), "wt")
            fin.write("".join(lignes))
            fin.close()
        else:
            data = fin.read().replace(changements[i][2] if navigateur == "firefox" else changements[i][3], changements[i][3] if navigateur == "firefox" else changements[i][2])
            fin.close()
            fin = open(os.path.join(os.path.dirname(__file__), changements[i][0]), "wt")
            fin.write(data)
            fin.close()
        print(f"[*] {int(((i+1)*100)/(len(changements)))}%")
    print("[!] Conversion terminée")

conversion = False
while not conversion:
    choix = input("""
🔃 Conversion de l'extension vers :

1. Firefox 🦊
2. Chrome 💫
""")
    if choix == "1":
        adapter_pour("firefox")
        conversion = True
    elif choix == "2":
        adapter_pour("chrome")
        conversion = True