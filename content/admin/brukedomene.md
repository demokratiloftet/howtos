# Hvordan bruker jeg mitt domene?

## Du er uavhengig

I Atmosphere er ikke brukerne dine bundet til appens domene. La
meg ta stiftelsen Fritt ord som eksempel. Fritt ord registrerte seg
først på Bluesky og ble da `@frittord.bsky.app`. På nett er de
for øvrig kjent under sitt domene `frittord.no`, og det kan de også
være kjent som i Atmosphere.

Ved å bruke ditt eget domene som brukernavn gjør du identiteten din 
uavhengig av en bestemt app. Du trenger ikke å gjøre dette for å bruke 
andre apper i Atmosphere, men vi anbefaler det likevel til alle som har mulighet.

Dette gjelder enten du er administrator og forvalter kontoer 
på vegne av andre brukere, eller administrerer ditt eget domene.

## "Handle" i Atmosphere

Kombinasjonen av brukernavn og domene kalles *handle* i Atmosphere, og
du bruker det overalt, og det synes gjerne også overalt. Når du kan
velge det nokså fritt, er det lurt å velge noe du føler representerer *deg*. 

I tillegg til en *handle* du kan sette ganske fritt, har du også et
internt brukernavn, det som kalles en DID, som forblir fast og som
identifiserer deg i de fleste tekniske sammenhenger.

## Bytte handle

Foreløpig er det best å gjøre det ved å bruke [Bluesky](https://bsky.social/about/blog/4-28-2023-domain-handle-tutorial): 

1. Logg deg inn med identiteten du vil endre.
1. Trykk på "Settings"
1. Trykk på "Handle"
1. Trykk på "I have my own domain"

Nå begynner det vanskelige, for nå skal du bevise at du kontrollerer
ditt domene overfor alle som spør. Det er to måter å gjøre det på: Den
ene er å lage en spesiell tekstfil på web-tjeneren, den andre er å
legge det inn i navnesystemet (DNS) for domenet. Begge deler skjer på
måter som er avhengige av hva slags systemer du som admin bruker, så
det er ikke mulig å gi presise instruksjoner for alle.

Se så i Bluesky-grensesnittet, her står det "DNS Panel" som gir deg
detaljene hvis du skal bruke navnesystemet, eller "No DNS Panel" hvis
du skal lage en tekstfil. Følg instruksjonene der, og trykk på
"Verify ...". 

Da skal du ha endret handle.

## Lage flere brukere på domenet

Det gir mening at organisasjoner bruker sitt domene for sin offisielle
kommunikasjon, slik at `@frittord.no` blir noe man følger for
kommunikasjon fra Fritt ord. Men man kan ta et steg til: at de ansatte
får sitt brukernavn under samme domene, `@brukernavn.frittord.no`,
omtrent som e-post.

Fremgangsmåten er den samme i begge tilfeller. For store organisasjoner 
er det fortsatt behov for å automatisere prosessen, men for mindre organisasjoner 
kan dette gjøres manuelt, slik vi har vist over. Siden bruk av en webtjener krever 
eget oppsett for hver bruker, er det som regel enklere å 
gjøre dette gjennom domenenavnsystemet (DNS).


