
# Sääasema

## Mikä IoT?

IoT, internet of things eli Asioiden internet. Internetin kaikki jo nykyään tietää, mutta onko termi IoT tuttu?  Vastaan itse; ei ainakaan kaikille. Asioiden internetissä voidaan laittaa erilaiset laitteistot tuottamaan dataa verkkoon ja jopa keskustelemaan keskenään ilman ihmisolennon puuttumista asiaan. Kotisovelluksista esimerkkinä vaikkapa ilmanvaihtojärjestelmät. Rakennetaan lämpötila-anturille mahdollisuus lähettää saamansa lämpötila datana verkkoon. Verkkoa seuraa ilmalämpöpumppu jolle on ohjelmoitu käsky reagoida mikäli asetetut raja-arvot ylittyvät. Samaa dataa voi asukas itse seurata verkosta joko tietokoneella tai mobiililaitteella. Sanalla tavalla teollisuudessa voidaan vaikka laitoksen polttoöljysäiliö asettaa lähettämään datana verkkoon polttoaineen määrä. Tällöin valvomosta nähdää tilanne reaaliaikaisena ja voidaan reagoida ja tarvittaessa tilata lisää polttoainetta ilman että kenenkään tarvitsee käydä fyysisesti paikalla säiliön luona. Niin ikään terveydenhuollossa ja -hoivassa on useita käyttökohteita potilasasiakkaiden terveydentilan seurannasta ruokakaapin sisällön valvontaan.

 Listaa voisi toki jatkaa loputtomiin erilaisten mahdollisten käyttökohteiden osalta mutta määritelmänä IoT on siis järjestelmä joka perustuu teknisten laiteiden suorittamaan automaattiseen tiedonsiirtoon, niiden etäseurantaan ja ohjaukseen. (Yritysjohdon opas IoT:n ja teollisen internetin hyödyntämiseen Quva Oy & Elisa Oyj. Viitattu 23.3.2021).

## Sääasemajärjestelmän toimintakaavio





### - Laitteistot



### - Komponentit

Piirilevynä projektia opetellessa on toiminut ProjetBoard harjoituspiirilevy. Tähän on liitettynä Particlen IoT-Photoni jossa wifi toiminto ja laitteen äly. Lämpötilaa ja ilmankosteutta mittaa DHT11 anturi joka siirtää datan photonille edellen lähetettäväksi verkkoon.

###  - Palvelut

-Particle console
-MS Azure

### - Ohjelmointi

Ohjelmointi kieliä on projektissa käytetty useita. Photonin koodaukseen on käyttetty kieli on C++. Käyttöliittymä on koodattu Reactilla joka yhdistää HTML:n, CSS:n sekä javaSkriptin. Lisäksi Triggerit on koodattu CSharpilla. 

### - Toiminta

DHT11 anturi mittaa lämmön ja ilmankosteuden. Tuo sen samassa piirilevyssä olevalle photonille joka on yhteydessä particlen consoliin. Consoli vie datan Azurelle johon on koodattu tietovarasto josta se lähetetään edellen kyttöliittymälle johon on koodattu HTML sivu mikä palvelee loppukäytäjää luettavana tietona anturin lähettämästä datasta.

## Käytetyt kehitysympäristöt

-Repl.it
-GitHub
-React

## Termihakemisto



## Viitteet

Yritysjohdon opas IoT:n ja teollisen internetin hyödyntämiseen Quva Oy & Elisa Oyj






