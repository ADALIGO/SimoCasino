#!/usr/bin/env python3
import re

# Casino names to extract (from the file content)
casino_list = """
Gamblezen
Tsars
National
Bizzo
ivibet
GoldBet
Golden Crown
CatCasino
Winnerz
HellSpin
RetroBet
Casino Extreme
20Bet
Lucky Hunter
Golden Star
Casoo
WinSpirit
Betandyou
daddy
Betroom24
ThorCasino
Trickz
Blaze Spins
Lucky Kong
CasinoStars
Wazbee
Hype Kasino
Stake
Highway
SpinBetter
DolfWin
Casino Orca
Bulletz
Win A Day
Slotland
Springbok
BitStarz
Casino Brango
22Bet
Lucky Tiger
Shazam
NV
Amonbet
Liberty Slots
Miami Club
Lincoln
Omni Slots
Red Stag
Bet It All
Rich Palms
Sol
Jet
ComicPlay
Fresh
BOHO
Limitless
WinPort
Bitsler
White Rabbit
MrO
Eternal Slots
Slotexo
Betzard
Casino Classic
Yabby
TrustDice
Tusk
Galaxy.bet
Slots Gallery
BDM BET
Goat Spins
RX
Bitcoin Sportsbook
11croco
Voltage Bet
HeroSpin
DaVinci's Gold
Sloto'Cash
IceCasino
Uptown Aces
Megapari
NineCasino
IZZI
MOSTBET
Kryptosino
VAVADA
Wild.io
Verde
Weiss
ZipCasino
Spinaro
Del Oro
CryptoWins
Sushi
Pacific Spins
HunnyPlay
GoldSpin
BetOspin
Oscarspin
Lucky Bonanza
Fair Go
Vulkan Vegas
Uptown Pokies
Lord Of The Spins
CryptoSlots
PlayCroco
Rolletto
Pledoo
AMPM
Royal Stars
Cashwin
Decode
RitzSlots
GreatSpin
Merlin
Hit'n'Spin
Zodiac
Free Spin
Exclusive
CasinoCasino
Jackpot Wheel
Play Fortuna
Casilando
Fruits4Real
Booi
Vegaz
Winz
Whamoo
Vegadream
Spinnalot
BC.Game
FreshBet
Slotilda World
PowerUp
Lucky7even
Royspins
Jozz
Milky Way
FortunePlay
GGbet
Staxino
Niyvi
Xyes
Metawin
Jackpotter
Slotoro
Omni
Cherry Gold
EnergyCasino
Golden Lion
Platin
LOKI
BetWinner
Slots Empire
Wolfy
SuperBoss
Everygame Classic
Blizz
BetPlays
Legzo
Wins Royal
DRIP
America777
Simsinos
LEX
BetWhale
Europa777
Orbit Spins
Irwin
BetElite
MonsterWin
CasinOK
Detective Slots
Ronin Slots
Hercules
3Dice
Dublinbet
Slots Capital
EmuCasino
Casino Sieger
Thunderbolt
Supernova
Betreels
Casino Max
Viggoslots
Zet
Red Dog
Aussieplay
FatBoss
Primaplay
El Royale
Banzai Slots
NewVegas
Slotsroom
Casombie
Chipstars
neospin
sultanbet
Candyland
Woopwin
JeetCity
Winning
Crypto Loko
Starda
Canada777
Bonus Blitz
Casino Infinity
Sportbet.one
Rox
Wintopia
Monro
Lukki
Wild7
Royal Reels
LuckyVibe
Spinly
Menace
KingPalace
BitGuruz
Slotpal
iNetBet
Golden Tiger
Paradise 8
Villento
Jackpot Capital
Unibet
888
Rembrandt
CasinoExtra
Lucky31
b-Bets
Casino Adrenaline
Jumba Bet
Eclipse
House of Jack
Spinfinity
JVspinbet
Wolf.Bet
Gamdom
arcanebet
Everygame
Slots Ninja
Rajabets
Casinozer
FairSpin
GREATwin
Cazimbo
betsAMIGO
Sportuna
Slots Safari
Yallabet
Spinch
Flappy
Spinarium
SlotLux
Rooster.bet
Velobet
FlukyOne
Anarchy
Luna
Flush
Trino
Maxxwin
X7
Cashed
Gamix
Playbet
JacksClub
RakeBit
Casinova
Slotuna
allStarz
Hit Me Bet
Satoshi Hero
Spinoloco
Fansport
Gransino
Lucky Circus
Opabet
SevenPlay
Wikibet
Spins of Glory
Coin
Cleobetra
RainBet
ZeusWin
Placebet.io
Sloto Tribe
Beef
HugoBets
Tenex
Bet25
Spinmills
Great Slots
BiggerZ
Asgard Slots
SlotStake
BetfourU
William Hill
BlackJack Ballroom
Yukon Gold
Casino Action
Slotastic
No Bonus
PlayGrand
Kajot
Yeti
BetRebels
Campeonbet
Roaring 21
EvoBet
LibraBet
Scatters
Will's
Haz
Las Atlantis
Lucky Bull
North
Oh My Spins
TripleSeven
Boomerang
bets.io
Ripper
GalacticWins
SlotsPalace
Lemon
Eddy Vegas
Fatbet
Tournaverse
HotSlots
1Red
Gomblingo
RedAxePlay
DepositWin
Quickwin
Onluck
Wintomato
Polestar
Coinplay
PUB
Voltslot
Yugibet
BetFury
Gamegram
Kirgo
Kingmaker
CoinKings
Crypto Games
Luckiest
SirWin
HugeWin
Megadice
Spinrollz
Monkey Tilt
Rollblock
Royal Game
WinWin.Bet
Slotsite.com
Hexabet
AllSpins
CrownPlay
24Casino
Vegasino
RockstarWin
Casinoly
Betsixty
PlayMojo
Grand Club
Fullhouse
Spinight
Instant
MrPunter
ReefSpins
LuckyHour
Win
Rollero
Impressario
Richville
Kinbet
StoneVegas
Mega.Bet
Flagman
Casino Night
Supabet
BeOnBet
OSH
Qbet.com
CasinoAndYou
Winbay
Jetton
PartySpins
LuckyGem
Pan
Martin
MadCasino
Betblast
Betwarts
Roby
Cazeus
Magius
Fonbet
VegasHero
2UP.io
Housebets
SlotRush
Turbo Wins
Minebit
CasinoBet
Dreamplay
Spinoli
Dream Royale
Wyns
Mafia
BetPari
Brasil777
The Stake House
Spinational
Bloody Slots
Patang
30Bet.com
BlockSpins
ViciBet
Aerobet
Betory
Welle
WilderBet
Holyluck
Rollchain
Zenobet
FUGU
Spinorhino
Spinhub
Velwins
VOX
BetRepublic
Lucky.fun
MonoPlay
GladiatorsBet
Colosseum
Grand Hotel
Lucky Emperor
Nostalgia
Rich Reels
Grande Vegas
Luxury
10bet
RedStar
18bet
HippoZino
Casino Estrella
21Prive
Kudos
SpinStation
Cherry Jackpot
Dream Vegas
Dreamz
Bspin
Swift
TrueFortune
Casino Days
Casino Rocket
5Gringos
Winota
Gudar
LadyLuck
Sportaza
Slotgard
Highbet
Blue Chip
Justbit
MyEmpire
CasinoVibes
Novajackpot
Joker8
Brutal
Luckyblock
Slotified
HashLucky
Wikiluck
Spinsy
Nextbet
Chancer
Ninlay
TikiTaka
Spellwin
CryptoCasino
Rise of Bets
Booms.Bet
BetterWin
Fast Slots
WeezyBet.com
SpinMillion
HighFlyBet
TheSlotz
Locasbet
Wishwin
AquaWin
Winningz
Casino Prestige
Bookmaker.XYZ
Slots Hammer
BitcoinVIP
FTVClub
7Oasis
Slotage
Kitty Cat
Rockstar
Thrill
MD88
CryptoRoyal
SpinDragons
Lizaro
Spininio
Jurassic Slots
Spinathlon
Aztec Riches
Vegas Slot
Virtual City
Grand Mondial
Music Hall
La Riviera
1bet100.com
Golden Euro
Slots Magic
Conquer
Vegas Paradise
Dazzle
G'Day
MobileWins
Spin Genie
MaxiPlay
24Bettle
21
Betfinal
Casino And Friends
PlayOJO
Mr SuperPlay
Spinland
Big5
Fun
Spin Rider
Casinia
CampoBet
Svenbet
Cloudbet
Hyper
Silver Sands Casino EURO
Casinobit.io
Great Britain
DBbet
ShangriLa Live
Roobet
Ozwin
Horus
7Signs
Rabona
SpinAway
Spin Samurai
Frumzi
Sapphirebet
Betinia
PlayToro
MrMega
Skol
ExciteWin
888STARZ
Leon
Slotbox
Lucky Dreams
Dolly
Spinzwin
Zinkra
Buran
JeffBet
31bet
wallacebet
SpinsBro
21bit
Q88Bets
JustCasino
Let's Lucky
BK8
Revolution
Betarno
Stupid
888Arabic
TombRiches
EmirBet
IntellectBet
WinCraft
Spinit
BetAlice
Betsio.com
Bluffbet
Riviera
Wageon
Betmode
BETGOAT
Scarawins
Betico
Nords
StakeMania
Free Spinza
BetBona
Osombet
Bet105
Whale.io
SlotyStake
Captain Cooks
Prime
Cocoa
This Is Vegas
Casino Kingdom
Challenge
Casino Mate
EU
Dafabet
Casino RedKings
PlayMillion
BetVoyager
LSbet
Joy
DrueckGlueck
777
1XBET
Slots.com
Bitcoin.com Games
Casimba
GoldenBahis
Cadoola
Casimpo
Duelz
Hotline
Jazzy Spins
Slotnite
Jackpot Village
Justspin
RioBet
Brazino777
PlayJango
AmunRa
Ovitoons
CosmicSlot
TornadoBet
Lucky Vegas
Rocketpot
iBet
GentingCasino
LTC
Spin Dimension
21 BETS
Royale500
BB
Goldenbet
Crashino
WinLegends
0xBET
Dachbet
OlympusBet
SG
SmokAce
GGPoker
The Godbunny
Windetta
Pribet
Silverplay
KnightSlots
Betssen
Lunubet
JustCasino Crypto
Gangsta
Casinado
Lucky Owl Club
BankonBet
SlotsParadise
Dukes
Coolzino
Wonaco
Wildsino
Bassbet
BettyWins
AnonymousCasino
OceanSpin
Sunny Spins
Pistolo
Caspero
Cybet
Cactus
God Of
WonderLuck
Tedbet
Rollify
Midarion
BetNjet
Casino-X
Magic Red
Jackpot Paradise
Power Slots
Lucky Niki
Ace Lucky
Slot Planet
FortuneJack
Azur
mr.play
Alf
AHTI Games
ReloadBet
Wazamba
MELBET
CrazePlay
Nomini
WatchMySpin
Svenplay
SlottoJam
Rocket.run
Paripesa
Thunderpick
OhMyZino
21LuckyBet
Metaspins
Jupi
Slotimo
BetNeptune
Spin Galaxy
MrPacho
rollino
KikoBet
Jackpotstar
TouchCasino
Spinanga
24Slots
Bombastic
VegasAces
Razed
DEDPRZ
Lekkerbets
MasterPlay
Shiny Wilds
BillyBets
FunBetCasino
Regal
UBET
Allyspin
MrFortune
ETH
Spinstar
TelBet
Slotier
Black Chip Poker
BetKudos
PuppyBet
WildRobin
Megarich
Viking Luck
FeliceBet
MAXiBET
Spinbara
WinOlot
OptimBet
TenoBet
EgoGames
AfricaSports
Duelbits
GrandWin
StakeClub
Boomerang Bet
Win Rolla
Acebet
All Slots
Vegas Country
7 Sultans
Quatro
Vegas2Web
PrimeSlots
Pinnacle Sports
ExclusiveBet
Mr Mobi
SimbaGames
TigerGaming
Dragonara
Diamond7
EuroMania
White Lotus
12BET
MrJackVegas
1xSlots
1xBit
Boo
Apollo Slots
Jackpot Cash
EarnBet
Stelario
Neon54
LegendPlay
Coins.Game
Horse Racing Betting
betstro
Divas Luck
BetMaximus
dbosses
BluVegas
Citobet
BetChip
Ramenbet
DaVegas
Seven
Cosmobet
Celsius
Talismania
RoyalsCasino
TikTok
MrWest
Moana
Mad
Tip-top.bet
SatoSpins
Fairpari
SpinGreen
HotLoot
PartySpinz
BoaBet
Wettson
All Jackpots
Spin Palace
Royal Vegas
Players Palace
Golden Reef
Betway
Euro Palace
BetOnline
Maria
Casino Midas
Goldfishka
Stake7
Casino Kings
Royal Swipe
Bonanza Game
Sportsbet.io
bCasino
Vortex
SpinSamba
ZenBetting
BacanaPlay
CashiMashi
Eldoah
MyStake
GoldWin
Slottica
CryptoLeo
Jackbit
Lucy's
FoggyBet
Harry's
4Kasino
The Red Lion
BetliveCasino
96.com
Intobet
Lamabet
Viu Viu
ACR
Love2Play
True Poker
Candy
CipherWins
Rizzio
Ruby Fortune
Platinum Play
EuroKing
VegasWinner
CasinoJEFE
GTbets
Casinohuone
Matchbook
BoaBoa
LuckyLouis
Gate777
Top Tally
ZenCasino
Playfast
Slotstoto
Coinbets777
Forvetbet
Bets Bunny
Jackpot City
Mummys Gold
Vegas Palms
Club USA
BitCasino.io
Spinson
GoodDayForPlay (GDF Play)
JackMillion
Bookmaker
Anonymous
Casinoin
Casino Napoli
"""

# Extract unique casinos
casinos = [line.strip() for line in casino_list.strip().split('\n') if line.strip()]
unique_casinos = sorted(set(casinos))

# Save to file
with open('unique_casinos_list.txt', 'w') as f:
    f.write('\n'.join(unique_casinos))

print(f"✓ Extracted {len(unique_casinos)} unique casino names")
print(f"✓ Saved to: unique_casinos_list.txt\n")
print("First 20 casinos:")
for casino in unique_casinos[:20]:
    print(f"  {casino}")
print("  ...")
print(f"Last 5 casinos:")
for casino in unique_casinos[-5:]:
    print(f"  {casino}")
