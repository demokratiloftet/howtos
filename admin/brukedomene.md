# Hvordan bruker jeg mitt domene?

[TL;DR](https://bsky.social/about/blog/4-28-2023-domain-handle-tutorial)

## Du er uavhengig

I Atmosphere er ikke brukerne dine bundet til domenet til appen. La
meg ta vår sponsor Fritt ord som eksempel. Fritt ord registrerte seg
først på Bluesky og ble da `@frittord.bsky.app`. På nett er de
forøvrig kjent under sitt domene `frittord.no`, og det kan de også
være kjent som i Atmosphere.

Dette er fint fordi din identitet er uavhengig av en bestemt app, men
det er ikke nødvendig for å bruke andre apper i Atmosphere. Vi
anbefaler likevel alle som kan å sikre sin uavhengighet på denne
måten.

Det gjelder enten du som administrator forvalter kontoene til dine
brukere, eller at du selv er administrator for ditt eget domene.

## "Handle" i Atmosphere

Kombinasjonen av brukernavn og domene kalles "handle" i Atmosphere, og
du bruker det over alt, og det synes gjerne også overalt. Når du kan
velge det nokså fritt er det lurt å få seg noe du kjenner at
representerer *deg*. 

I tillegg til en handle du kan sette ganske fritt, har du også et
internt brukernavn, det som kalles en DID, som forblir fast og som
identifiserer deg i de fleste tekniske sammenhenger.

## Bytte handle

Foreløpig er det best å gjøre det ved å bruke Bluesky:
[Bluesky](https://bsky.social/about/blog/4-28-2023-domain-handle-tutorial). 

1. Logg deg inn med identiteten du vil endre.
1. Trykk på "Settings"
1. Trykk på "Handle"
1. Trykk på "I have my own domain"

Nå begynner det vanskelige, for nå skal du bevise at du kontrollerer
ditt domene overfor alle som spør. Det er to måter å gjøre det på: Den
ene er å lage en spesiell tekstfil på web-tjeneren, den andre er å
legge det inn i navnesystemet (DNS) for domenet. Begge deler skjer på
måter som er avhengig av hva slags systemer du som admin bruker, så
det er ikke mulig å gi presise instruksjoner for alle.

Se så i Bluesky-grensesnittet, her står det "DNS Panel" som gir deg
detaljene hvis du skal bruke navnesystemet, eller "No DNS Panel" hvis
du skal lage en tekstfil. Følg instruksjonene der, og trykk på
"Verify ...". 

Da skal du ha endret handle.

## Lage flere brukere på domenet

Det gir mening at organisasjoner bruker sitt domene for sin offisielle
kommunikasjon, slik at `@frittord.no` blir noe man følger for
kommunikasjon fra Fritt ord. Men man kan ta et steg til: At de ansatte
får sitt brukernavn under samme domene, `@brukernavn.frittord.no',
omtrent som e-post. 

Dette gjøres på samme måte. For store organisasjoner gjenstår det å
automatisere en slik prosess, men for små organisasjoner kan man gjøre
det manuelt slik som over. Det er litt plagsomt at man må enten ha en
web-tjener for hver bruker, slik at det er best å gå veien gjennom
navnesystemet DNS.


