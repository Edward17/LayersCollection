# Beschreibung

[LayersCollection](http://edward17.github.io/LayersCollection/) ist eine Versammlung von raster OpenStreetMap-basierenden Layers und Layers, die man zur Editierung von OSM benutzen darf. Dazu gehören Luftbilder und GPS Tracks.

Es gibt auch Layers, die den Relief darstellen, und Karte von [Mapillary](http://www.mapillary.com/) Panoramen.

# Ziel

Dieser Projekt ist geschafft, um:

* den Leuten zu zeigen, wozu OpenStreetMap fähig ist
* das Leben von OSM-Teilnehmer bequemer zu machen
* die Suche und Einbau von OpenStreetMap-basierendem Layer zu erleichtern

# Funktionen

## Layers

Es gibt zwei Layersarten:

* Baselayer - Layer, der im Kartehintergrund liegt; Layer, über dem alles anderes aufgestapelt wird
* Overlay - Layer mit transparentem Hintergrund, der über Baselayer aufgestapelt werden kann. Gleichzeitige Vorführung von mehreren Overlays ist möglich. Sie werden in der Reihenfolge gezeigt, in der sie eingeschaltet wurden

Auch kann man den Hintergrund schwarz ("Set black background" Taste) oder grau ("Set gray background" Taste) machen.

Wenn viele Overlays gezeigt werden und alle zusammen verstecket werden müssen, kann man, statt lange die Liste scrollen und Checkboxe ausschalten, kann man einfach "Remove all overlays" Taste drücken.

### Vorführung des letztes Baselayers

Wenn man einen Platz auf der Karte in verschiedenen Layers vergleichen will (z. B. OpenStreetMap und Luftbilder), muss man folgendes machen:

1. Die Karte zu diesem Platz hineinzoomen
2. Ersten Baselayer einschalten
3. Zweiten Baselayer einschalten
4. Den Mauskursor auf die Taste "Show previous baselayer" stellen 
5. Jedes Mal, wenn man den Baselayer ändern will, die Taste drucken

Bemerken Sie: Die Geschichte der allen angezeigten Baselayers wird **nicht** gespeichert.

### Kategorien

Kategorie ist Layers unter einer Überschrift (bis zum nächsten Überschrift). Alle Layers in einer Kategorie gehören zum desselben Thema. Zum Beispiel, Layers in der "General" Kategorie sind ohne Spezialisierung (sie zeigen alles sofort). In der "Public Transport" Kategorie sind Layers, die Linien von öffentlichen Verkehrsmitteln darstellen, versammelt.

Kategorie kann verbergt werden, damit Layersliste kürzer wird, und Zeit von Listescrolling - kleiner. Dafür muss man die Checkbox links von dem Layername drucken.

## Link für Koordinaten und Layers

Es besteht die Möglichkeit, einen Link für den Platz auf die Karte und gewählten Layer (oder Layers, wenn mindestens ein Overlay gezeigt wird) zu erstellen. Dafür muss man den Link "Permalink" links oben drucken und die Adresse aus der Adresszeile von Browser kopieren. Auch kann man einfach die Adresse von Link kopieren. Koordinaten und gewählte Layers werden bei ihrer Änderung automatisch aktualisiert.

Daten über Koordinaten und gewählte Layer (Layers) werden in Hash gespeichert. Das ist Teil des URLs nach dem `#`-Zeichen.

Format von dem Hash - wie in [http://www.openstreetmap.org/](http://www.openstreetmap.org/): `#map={zoom}/{Breite (latitude)}/{Länge (longitude)}&layers={Liste der Layers im Format "Baselayer [,Overlay 1] [,Overlay 2]..."}`

Die Website unterstützt (d. h. versteht) folgende Hashformaten:

* Beschreibt oben. Wird benutzt z. B. in http://www.openstreetmap.org/ und http://www.openstreetmap.ru/
* `#zoom={zoom}&lat={Breite (latitude)}&lon={Länge (longitude)}`. Wird benutzt z. B. in [http://pavlo-dudka.github.io/](http://pavlo-dudka.github.io/osm-pg-tests/test.html?map?dead.nodes#zoom=6&lat=49&lon=31)
* `#{zoom}/{Breite (latitude)}/{Länge (longitude)}`. Wird benutzt z. B. in [http://resultmaps.neis-one.org/osm-changesets](http://resultmaps.neis-one.org/osm-changesets?comment=mapping_party#18/44.51155/11.33740)

Dadurch kann man leicht von einem Webseite nach diesem gehen und dabei derselbe Platz sehen. Zum Beispiel, Sie haben einen Fehler im Validator http://pavlo-dudka.github.io/ gefunden, und wollen sehen, wie dieser Platz auf Luftbilder aussieht. Dafür müssen Sie folgendes machen:

1. Den Link für diesen Platz in jenem Webseite kopieren
2. Den Link in die Adresszeile einsetzen
3. Nur den Hash bleiben lassen, alles anderes wegnehmen
4. Den Hash kopieren
5. In der Adresszeile `http://edward17.github.io/LayersCollection/` schreiben und am Ende den Hash einsetzen
6. Die Karte wird in diesem Platz geöffnet. Nun kann man andere Layer einschalten.

Im Hash von http://www.openstreetmap.org/ Webseite werden nicht nur Koordinaten, sondern auch gewählte Layer gespeichert. Wenn man solchen Hash einsetzt, wird diese Layer automatisch gezeigt.

Man kann auch diese Webseite als Konverter von Koordinaten aus verschiedenen Formaten in Format von http://www.openstreetmap.org/ benutzen.

## Filters

Momentan sind auf dieser Webseite viele verschiedene Layers versammelt. Um die Suche des Layers nach bestimmten Kriterien zu erleichtern, kann man Filter benutzen:

* Language (Sprachcode mit grünem Hintergrund) - Sprache der Aufschriften
* Show outdated layers (rot "old") - zeigen Layers, die lange Zeit nicht erneut wurden
* Show Ukraine-only layers (gelb "ua") - zeigen Layers, die nur die Ukraine bedecken. Dieses Filter ist aktuell für Bewohner von anderen Ländern, die in diesen Layers nichts Interessantes finden können
* Show only black/white layers (braun "b/w") - zeigen **nur** schwarzweiße Layers. Sie können z. B. für Druck benutzt werden
* Show only 3D-buildings layers (violett "3D") - zeigen **nur** Layers, die in höhen Zoomen die Gebäuden in 3D darstellen
* Show only Retina layers (orange "rtn") - zeigen **nur** Layers für Retina-Displays
* Show only no-labels layers (dunkelblau "nl") - zeigen **nur** Layers, die keine Aufschriften haben. Sie können z. B. als Hintergrund für Karte mit eigenen Aufschriften benutzt werden

Gleichzeitige Aktivierung von mehreren Filtern ist möglich.

Jeder Filter hat auch seine eingene "Etikette" (in der Liste oben sind sie in Klamern beschreibt). Wenn ein Layer unter dem Filter kommt, wird Etikette von diesem Filter rechts von Layername gezeigt.

## Eigener Layer

Es besteht die Möglichkeit, seinen eigenen Tilelayer oder WMS-Layer zu zeigen. Dafür drucken Sie "Add custom layer" (oder "Add custom WMS layer") Taste und füllen die Felder im offenen Form. Notwendige Felder sind mit `*` gekennzeichnet. Danach drucken Sie die "Show this layer" (oder "Show this WMS layer") Taste.

Eigener Layer wird über dem jetzt gewählten Layer gezeigt. Wenn seiner eigener Layer transparenten Hintergrund hat, aber Sie wollen ihn ohne Baselayer sehen, drucken Sie die "Set gray background" Taste.

Gleichzeitige Darstellung von Tile- sowie WMS-Layer ist möglich.

Bemerken Sie:

1. Daten von diesem Layer (Adresse, Autor, maximal Zoom) werden nicht gespeichert und werden bei der Auffrischung von Seite verloren
2. Mithilfe von diesem Instrument kann man nicht den Autor (mich) bitten, einen neuen Layer in Versammlung einzufügen. Dafür muss man mir schreiben, siehe [Kontakten](https://github.com/Edward17/LayersCollection/blob/gh-pages/README.DE.md#Kontakten) Abschnitt

## Export von Layerdaten

Es besteht die Möglichkeit, Daten von Layer (Adresse, maximal Zoom) zu exportieren, um in folgenden Software zu benutzen:

* [Leaflet](http://leafletjs.com/) Bibliothek - dafür wird die komplete JavaScript-Code gezeigt, die nur in die Code von Webseite eingefügt werden muss
* iD Editor - dafür wird die Adresse, die man bei Wahl von eigenen Layer angeben muss, gezeigt
* JOSM Editor - dafür wird die Adresse und maximal Zoom (für TMS layer) oder die Adresse, Layersliste und Format (für WMS layer) gezeigt
* SAS.Planet - dafür wird das Text von drei Files gezeigt, die in Separatfolder in Direktory `SAS.Planet/Maps/.../` ähnlich der anderen Layers erstellt werden müssen (nur Tilelayers sind unterstützt)

Um Layerdaten zu exportieren, muss man folgendes machen:

1. Den Checkbox "Show layer data by doubleclick on layer name" einschalten
2. Zweimal das Layer**name** clicken
3. Neues Tab wird geöffnet, dort kann man den Ergebnis kopieren

## Einbau der Mini-Karte in Website

Es besteht die Möglichkeit, in eigene Webseite eine Mini-Karte mit gewählten Layers (Baselayer und beliebig viele Overlays) und bestimmter Startposition mithilfe des `<iframe>`. Dafür muss man:

1. Benötigte Platz an der Karte öffnen
2. Benötigte Layers in benötigter Reihenfolge einschalten
3. Den Link "Frame export" klicken
4. Code kopieren und in HTML-Code von eigener Webseite einsetzen

## Speicherung von Sitezustand

Siteinterface kann modifiziert werden. Einige Einstellungen werden nur im Browser gespeichert, andere - im Browser und im Link. Hier gilt: Einstellungen im Link haben immer größer Priorität, als Einstellungen im Browser.

Folgende Einstellungen werden nur im Browser gespeichert:

* Ob das linke Panel gezeigt wird? (Dort sind Filters, Layersliste und alles andere)
* Ob die Filter gezeigt werden?
* Ob jeder Filter aktiviert ist?
* Ob jede Kategorie gezeigt wird?

Nächste Einstellungen werden sowohl im Browser als such im Link gespeichert:

* Koordinaten (Breite, Länge, Zoom)
* Gezeigte Layers

# Lizenz

Siehe [LICENSE.md](https://github.com/Edward17/LayersCollection/blob/gh-pages/LICENSE.md)

# Kontakten

Sie haben Fragen, Vorschläge oder Wünsche? Schreiben Sie mir im [privaten Nachricht am OSM](https://www.openstreetmap.org/message/new/edward17) oder per e-mail: edward17 [at] mail [dot] ua.

P. S. Deutsch ist nicht meine Muttersprache. Deshalb, wenn Sie einen grammatischen gefunden haben, können Sie mir gerne darüber schreiben!