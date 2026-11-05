# Hvordan kan min organisasjon bli verifisert?

I Atmosphere velger hver enkelt app hvilke verifikatorer man stoler
på, og vi har lagd en verifikator som flere apper som
[Mu](https://mu.social/) og [Sifa](https://sifa.id/) har valgt å stole
på.

Den er basert på virksomhetsopplysningene i enhetsregisteret til
[Brønnøysundregistrene](https://www.brreg.no/). Vi bruker hjemmesiden
og virksomhetens navn til dette.

## Dette må du gjøre for å bli verifisert av oss

1. Du må [bruke virksomhetens domene](brukedomene.md) som handle,
   og det må være samsvar mellom domenet og nettsiden som er registrert i
   Enhetsregisteret. For eksempel er Stortingets nettside registrert
   som `www.stortinget.no`. Vi sjekker derfor først om dette domenet brukes
   som handle i Atmosphere. Vi sjekker også `@stortinget.no`, som er en
   langt vanligere variant. Hvis vi finner et samsvar, har virksomheten
   bestått den første kontrollen.
1. Det må også være samsvar med virksomhetens navn slik det er i
   Enhetsregisteret og slik det er på profilen. Her gjør vi noen
   sjekker:
   1. Vi godkjenner variasjoner i mellomrom og store og små bokstaver.
   1. Vi fjerner "AS" fra slutten.
   1. Hvis flere organisasjoner bruker samme hjemmeside, må
      profilnavnet samsvare nøyaktig med bare en organisasjon.
1. Sett deg tilbake og vent en stund. Prosessen er helt automatisk –
   vi trenger ikke å gjøre noe manuelt. Verifiseringen vil dukke opp i
   f.eks. Mu som et lite rosa merke etter profilnavnet.
   

## Hvorfor så streng navnesjekk?

Vi vurderer det som mer skadelig om vi verifiserer noen som ikke er ekte
enn om vi utelater noen som skulle vært verifisert. 

Det er ganske vanlig at det er flere underenheter som bruker
hjemmesiden til den høyere enheten i registeret, og må være sikre på at
vi ikke bruker feil enhet.

Etterhvert som vi lærer mer om hvor vi ikke trenger å være så strenge,
vil vi løse opp, men vi mener det er riktig å være forsiktige 
nå mens systemet er helt nytt.
