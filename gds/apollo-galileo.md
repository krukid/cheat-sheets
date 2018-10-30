# Apollo Galileo GDS System

## Links

- [Airport and airline code lookup](https://www.iata.org/publications/Pages/code-search.aspx)
- [Travelport smartpoint reference](https://support.travelport.com/webhelp/Smartpoint1G1V/Default.htm#Use_Cases/RefGuide/APACRefGuide.htm%3FTocPath%3DReference%2520Guide%7C_____0)

## Help

    /HELP
    -H
    /H

## First things first

Ignore current session data (reset):

    I

## Querying flights

    A[<query-mod>]<depart-date><from><to><options>[++<return-date>[<from><to>]<options>]
    CDDMMMXXXYYY*ZZ
    CDDMMMXXXYYY@2Q/BT.D++15FEB/EK

### Legend

**<depart-date> - departure date**

`23NOV`, `05OCT`

**<from>, <to> - departure/arrival airport code**

`RIX`, `DXB`, `KHI`

**<carrier> - airline carrier**

`EK`, `BT`

## Selecting specific flight from list

    A@#_

**param 1 - number**

## Selecting specific seating

    N_L_

**param 1 - number of passengers**

`N1`, `N2`

**param 2 - seat class(?)**

`L1`, `L2`

## Create a booking (after flight/seat selection)

1. `N.BASHIR/HARISMR` - name field, or:<br>
   `N.2BARTON/ANSREWMR/CHRISTYMRS`
2. `P.P* 0503060868 *` - pax contacts line (pax = passenger)
3. `T.T* *` - ticketing modifier
4. `P.T* SHJ GLOBALWIDE INT` - agency info line (telephone??)
5. `R.H *` - receiving com(mand?)
6. `ER` - end and retrieve PNR (displays prompt)
7. `IR` - ignore and retrieve (final booking, only on ended/completed PNRs), or:<br>
   `XI` - cancel itinerary

## Additional queries (maybe)

Last Air, Shopping, Hotels, FS + Hotels, Cars

## Flight info

|num |from|stops  |to |mod|dep |mod|arr |flight|seat_classes                                               | aircraft_type | flags |
|---:|----|-------|---|---|----|---|----|------|-----------------------------------------------------------|-----|----|
| 1  |DXB |1      |KHI|1/ |0105|#  |0405|EK 604|J7 C7 I7 O7 PC Y9 E9 R9 W9 M9<br>U9 K9 H9 Q9 L9 T9 V9 GC X9|     |  C*E|
|    |    |       |SYD|2/ |0510|#  |0135|@QF8006|F9 A7 PC J9 CL DL IL UC WL<br>RL TL ZC Y9 B9 H9 K9 M9 L9<br>VC SC NC QC OC GL XC EL|388|C*E|

See: https://support.travelport.com/webhelp/Smartpoint1G1V/Content/Air/AirAvailability/Default_Availability_Results.htm

### date modifiers

If a flight arrives 1 day after original departure with one segment:

1. `<segment_number>/` appended to date
2. `#` inserted between times if there is a 1 day difference<br>
   `*` inserted between times if there is a 2 day difference

### flight

`@` symbol denotes "coach flight".

### seat classes

`BL`, `A5`, `H0`, `JC`, `XA`, `GR`

**parameter 1 - booking code**

**parameter 2 - availability code**

- A - available
- R - seats on request
- L - available to wait list
- C - wait list closed
- 0 - zero seats available
- NUMBER - number of seats available

## Examples

**Querying all flights**

    A23NOVDXBKHI*EK
    A10NOVRIXVRN*BT

**Querying round trip flights**

Same routing:

    A23NOVBCNMAD++15FEB

Different routing:

    A23NOVBCNMAD*AF++15FEB*EK

**Querying for specific passenger numbers and booking codes**

Query for 1 passenger with booking code C (round trip) with AA airline:

    A07SEPNYCRIO@1C/AA++15SEPRIONYC@1C/AA

**Selecting specific flight from list**

    A@#1
    A@#2

**Selecting specific seating**

    N1L1
