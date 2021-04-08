
# Sääasema

## Mikä IoT?

IoT, internet of things eli Asioiden internet. Internetin kaikki jo nykyään tietää, mutta onko termi IoT tuttu?  Vastaan itse; ei ainakaan kaikille. Asioiden internetissä voidaan laittaa erilaiset laitteistot tuottamaan dataa verkkoon ja jopa keskustelemaan keskenään ilman ihmisolennon puuttumista asiaan. Kotisovelluksista esimerkkinä vaikkapa ilmanvaihtojärjestelmät. Rakennetaan lämpötila-anturille mahdollisuus lähettää saamansa lämpötila datana verkkoon. Verkkoa seuraa ilmalämpöpumppu jolle on ohjelmoitu käsky reagoida mikäli asetetut raja-arvot ylittyvät. Samaa dataa voi asukas itse seurata verkosta joko tietokoneella tai mobiililaitteella. Sanalla tavalla teollisuudessa voidaan vaikka laitoksen polttoöljysäiliö asettaa lähettämään datana verkkoon polttoaineen määrä. Tällöin valvomosta nähdää tilanne reaaliaikaisena ja voidaan reagoida ja tarvittaessa tilata lisää polttoainetta ilman että kenenkään tarvitsee käydä fyysisesti paikalla säiliön luona. Niin ikään terveydenhuollossa ja -hoivassa on useita käyttökohteita potilasasiakkaiden terveydentilan seurannasta ruokakaapin sisällön valvontaan.

 Listaa voisi toki jatkaa loputtomiin erilaisten mahdollisten käyttökohteiden osalta mutta määritelmänä IoT on siis järjestelmä joka perustuu teknisten laiteiden suorittamaan automaattiseen tiedonsiirtoon, niiden etäseurantaan ja ohjaukseen. (Yritysjohdon opas IoT:n ja teollisen internetin hyödyntämiseen Quva Oy & Elisa Oyj. Viitattu 23.3.2021).

## Sääasemajärjestelmän toimintakaavio


![kaavio](/WeatherStationFormulaPic.JPG)


### - Laitteistot

Sääaseman älynä toimii Particlen Photon- IoT kehityskortti. Se on WiFi yhteydellä toimiva kortti jossa on 120Mhz kellotaajuudella toimiva ARM Cortex M3 prosessori, jossa on 128KB käyttömuistia ja 1MB flashmuisti. Ohessa Kuva photonin kytkentänavoista ja linkki lähteeseen.

![alt text](/PhotonPinnit.JPG)

https://www.electronicwings.com/particle/particle-photon-board



### - Komponentit



Piirilevynä projektia opetellessa on toiminut ProjetBoard harjoituspiirilevy. Tässä on liitettynä Particlen IoT-Photoni ja Lämpötilaa ja ilmankosteutta mittaa DHT11 anturi joka siirtää datan photonille edellen lähetettäväksi verkkoon. Anturi on tarkoitettu sisätilojen ilmankosteuden ja lämpötilan mittaukseen ja sillä pystyy mittaamaan Ilmankosteuksia 20-80% skaalalla ja Lämpötiloja 0-50°C skaalalla. DHT11 on tyypiltään tunteva anturi.

![DHT11](/DHT11.JPG)

Järjestelmään olisi mahdollista asentaa useita muitakin antureita tarpeiden mukaan. Kuulevaa anturia voisi käyttää tunnistamaan aanen voimakkuutta ja taajutta esimerkiksi lasin rikkoutumisen tunnistamiseksi. Haistavaa anturia pystyisi hyödyntämään vaikkapa savukaasujen tai joidenkin kemikaalien havaitsemiseksi. Myös kamera on eräänlainen anturi. Näkevää anturia yleensä hyödynnetään tilojen valvonnassa. 





###  - Palvelut

Sääasema käyttää MS Azure pilvipalveluita. Pilvipalveluiden helppoutena on valmiit ja toimivat palvelut, eikä tarvitse perustaa omaa palvelinta tälle projektille. Isojen palveluntarjoajien kanssa on kuitenkin syytä muistaa että kaikki tiedot ovat teknisesti palvelustarjoajan käytössä. Luonnollisesti he eivät niitä saisi käyttää, mutta asia on hyvä tiedostaa vaikka mahdollisen tietomurron varalta.

### - Ohjelmointi

Ohjelmointi kieliä on projektissa käytetty useita. Photonin koodaukseen on käyttetty kieli on C++. Tässä photoni on ohjelmoitu huolimaan dataa DHT11 anturista määrätyin väliajoin ja lähettämään sitä WiFin yli particlen consoleen.

![phc++1](/Photonc++1.JPG)
![phc++2](/photonc++2.JPG)

Seuravaksi on koodattu HTTP trigger CSharpilla:lla joka tallentaa anturin datan tietovarastoon microsoft Azuren pilveen.

![triggerkoodi1](/HTC#1.JPG)

![triggerkoodi2](/HTC#2.JPG)


Loppukäyttäjää varten on koodattu Käyttöliittymä Reactilla joka yhdistää HTML:n, CSS:n sekä javaSkriptin. Käyttöliittymään piirrtään kaaviot jotka muotoutuu Azuren lähettämästä Json datasta.

![Reactkoodi1](/React1.JPG)
![Reactkoodi2](/React2.JPG)
![Reactkoodi3](/React3.JPG)

Käyttöliittymää varten Ohjelmoidaan jälleen trigger joka rakentaa tietovaraston datasta rajapinnan käyttöliittymän käyttöön.


![triggerkoodi3](/HTC#3.JPG)

![triggerkoodi4](/HTC#4.JPG)



 

### - Toiminta

Harjoituspiirilevyssä oleva DHT11 anturi mittaa lämmön ja ilmankosteuden. Data siirtyy samassa piirilevyssä olevalle photonille, johon on koodattu käsky lähettää data particlen consoleen. Consolista data ja laitteen id siirtyy MS Azurelle. Samalla lähtee Webhook kutsu Azurelle koodatulle triggerille aina kun uusi mittaustulos saadaan. Trigger tallentaa tulleen datan pilvipalvelun Table storageen. Loppukäyttäjän Käyttöliittymä kutsuu samaisella Azurella toista triggeriä joka rakentaa Table storageen tallennetusta datasta JSON muotoisen rajapinnan ja lähettää datan trigger kutsun ULR:ssa. Käyttöliittymään on koodattu Googlen charts palvelusta taulukot joissa anturin mittaama data näkyy diagrammeissa ihmiselle ymmärrettävässä muodossa. Järjestelmän versionhallinta on toteutettu GitHub palvelussa. palvelussa on rakennettu ci/cd (=continuous integration / continuous deployment) pipeline pilvipalvelu Azureen, jossa käyttöliittymä on julkaistuStatic Web App palveluna. Näin kaikki versiomuutokset päivittyy automaattisesti palvelimelle.


## Käytetyt kehitysympäristöt

-particle console
  Consolessa koodattiin photonin käyttämä koodi ja se ylläpitää sääaseman yhteyttä edelleen kohti Azurea.
-Repl.it
  Täällä koodattiin kayttöliittymä ja tarvittavat triggerit.
-GitHub
  Toimii versionhallintana.
-Microsoft Azure
  Maksullinen pilvipalvelu johon on luotu kyky käyttää, tallentaa ja siirtää dataa em. palveluihin. 

## Termihakemisto

IoT: 
Asioiden internet. Laitteet ovat keskenään yhteydessä verkon             välityksellä.

IIoT: 
Teollinen asioiden internet.

Particle Photon: 
Particle yhtymän ohjelmoitava IoT-kehityskortti. Pieni                   prosessori joka koodatan suorittamaan annettuja                          tehtäviä ja lähettämään tehtävän tuoma data verkkoon.

DHT11: 
Lämpötilaa ja ilmankosteutta mittaava anturi.

WEbhook: 
Koodi jolla data lähetetään automaattisesti eteenpäin                    välitömästi mittaustapahtuman jälkeen 
(viitattu 7.4.2021)

REST API:
Infratsuktuuri joka rakentaa rajapinnan käyttöliittymän käytettävksi
(viitattu 7.4.2021)




## Viitteet

Yritysjohdon opas IoT:n ja teollisen internetin hyödyntämiseen Quva Oy & Elisa Oyj: https://quva.fi/site/attachments/yritysjohdon_opas_IoT_ja_teollisen_internetin_hyodyntamiseen.pdf

Digia API:t ovat modernin integraatio srategian ydin:
https://blog.digia.com/rest-api#ce37a412

Wikopedia, Webhook.
https://en.wikipedia.org/wiki/Webhook






