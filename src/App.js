import './App.css';
import 'semantic-ui-css/semantic.min.css'
import MySidebar from './sidebar';

var allData = [
  {
      done: false,
      type: "audio",
      origin: "Dragon Ball Z",
      id: "pYnLO7MVKno",
      title: "Cha La Head Cha La",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Pokemon",
      id: "JuYeHPFR3f0",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Code Lyoko",
      id: "GvY-yWWlpgw",
      title: "Un Monde Sans Danger",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Totally Spies",
      id: "7-h8CEZPvBM",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Olive et Tom",
      id: "D9vEj5z_hD4",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Titeuf",
      id: "LRwA3Y5xiRU",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Marcelino Pan Y Vino",
      id: "_Pi8vDNpeRY",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Titi et Grosminet menent l'enquete",
      id: "iteNiJUYhvg",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Les Ratz",
      id: "sBfimllcI7Q",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Oggy et les Cafards",
      id: "2apJXX46ce0",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Bonne Nuit Les Petits",
      id: "4UNkj-AsZRs",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Les Aventures de Tintin",
      id: "zb-9TIr31i0",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Priscilla",
      done: false,
      type: "audio",
      origin: "Kim Possible",
      id: "9zru1EMVLKI",
      title: "Mission Kim Possible",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Les Nouvelles Aventures de Lucky Luke",
      id: "pxH9ejIYAlg",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "La Panthere Rose",
      id: "9OPc7MRm4Y8",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Avatar le Dernier Maitre de l'Air",
      id: "BGycFj-V3x4",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Franklin",
      id: "nlqyE-lWqCE",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Princesse Sarah",
      id: "IVpcoJxOBIc",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Les Mysterieuses Cites d'Or",
      id: "9w_zn3uRwPU",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Capitaine Flam",
      id: "m4-89PqmsOU",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Jayce et les Conquerants de la Lumiere",
      id: "l-2nVUzNdRQ",
      time: 60,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Il etait une fois... L'Homme",
      id: "7QmtVq1FLlw",
      title: "Toccata and Fugue",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Les Razmokets",
      id: "DUBudt7vQFc",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Teletubbies",
      id: "5ZCgbGgA-_8",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Power Rangers",
      id: "9-bqOz9WriQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Beyblade",
      id: "N74cnBa_Bmc",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Marsupilami",
      id: "xQ7MoJG8GJQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Saint Seiya",
      id: "ofwE8oaS5QY",
      title: "Pegasus Fantasy",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Naruto",
      id: "y2juBsz78gw",
      title: "Kanashimi Wo Yasashisa Ni",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "The All-American Rejects",
      done: false,
      type: "audio",
      id: "uxUATkpMQ8A",
      title: "Gives You Hell",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Britney Spears",
      done: false,
      type: "audio",
      id: "LOZuxwVk7TU",
      title: "Toxic",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Coolio",
      done: false,
      type: "audio",
      id: "fPO76Jlnz6c",
      title: "Gangsta's Paradise",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Adele",
      done: false,
      type: "audio",
      id: "rYEDA3JcQqw",
      title: "Rolling in the Deep",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Miley Cyrus",
      done: false,
      type: "audio",
      id: "M11SvDtPBhA",
      title: "Party In The U.S.A",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Basshunter",
      done: false,
      type: "audio",
      id: "IgFwiCApH7E",
      title: "Now You're Gone",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Taio Cruz",
      done: false,
      type: "audio",
      id: "Vysgv7qVYTo",
      title: "Dynamite",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Bon Jovi",
      done: false,
      type: "audio",
      id: "vx2u5uUu3DE",
      title: "It's My Life",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Europe",
      done: false,
      type: "audio",
      id: "9jK-NcRmVcw",
      title: "The Final Countdown",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "AC/DC",
      done: false,
      type: "audio",
      id: "l482T0yNkeo",
      title: "Highway To Hell",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Hoobastank",
      done: false,
      type: "audio",
      id: "fV4DiAyExN0",
      title: "The Reason",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Queen",
      done: false,
      type: "audio",
      id: "t99KH0TR-J4",
      title: "The Show Must Go On",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Joan Jett and The Blackhearts",
      done: false,
      type: "audio",
      id: "xL5spALs-eA",
      title: "I Love Rock n' Roll",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Twisted Sister",
      done: false,
      type: "audio",
      id: "SRwrg0db_zY",
      title: "I wanna Rock",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "KISS",
      done: false,
      type: "audio",
      id: "zlSFmotba2I",
      title: "I Was Made For Loving You",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Deep Purple",
      done: false,
      type: "audio",
      id: "zUwEIt9ez7M",
      title: "Smoke On The Water",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "John Newman",
      done: false,
      type: "audio",
      id: "CfihYWRWRTQ",
      title: "Love Me Again",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Calvin Harris",
      done: false,
      type: "audio",
      id: "ebXbLfLACGM",
      title: "Summer",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Snoop Dogg ft. the Doors",
      done: false,
      type: "audio",
      id: "y_z-adsJjmE",
      title: "Riders On The Storm",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Bonnie Tyler",
      done: false,
      type: "audio",
      id: "OBwS66EBUcY",
      title: "I Need A Hero",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Joe Esposito",
      done: false,
      type: "audio",
      id: "3jYcW1nEsGk",
      title: "You're The Best Around",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Kim Wilde",
      done: false,
      type: "audio",
      id: "r_GH6M7cUq4",
      title: "Kids In America",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "U2",
      done: false,
      type: "audio",
      id: "ftjEcrrf7r0",
      title: "One",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "I'm So Excited",
      done: false,
      type: "audio",
      id: "rQqwG_rQx7A",
      title: "The Pointer Sisters",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "50 Cent",
      done: false,
      type: "audio",
      id: "5qm8PH4xAss",
      title: "In Da Club",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Maroon 5",
      done: false,
      type: "audio",
      id: "iEPTlhBmwRg",
      title: "Moves Like Jagger",
      time: 90,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Pitbull ft. Chris Brown",
      done: false,
      type: "audio",
      id: "CdXesX6mYUE",
      title: "International Love",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Inna",
      done: false,
      type: "audio",
      id: "YjSUSPzJiAU",
      title: "Sun is Up",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "K'NAAN",
      done: false,
      type: "audio",
      id: "WTJSt4wP2ME",
      title: "Wavin' Flag",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Indianna Jones",
      id: "-bTpp8PQSog",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Rocky",
      id: "I33u_EHLI3w",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Austin Powers",
      id: "90h2gLgTz5g",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Castlevania 2",
      id: "e2oZtvjg5oA",
      title: "Bloody Tears",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Final Fantasy VI",
      id: "jjgwVSDAmP4",
      title: "Terra",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "The Legend of Zelda",
      id: "cGufy1PAeTU",
      title: "Main Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Super Metroid",
      id: "6o4N-vNt1MQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Sonic",
      id: "y-78CMKME4o",
      title: "Green Hill Zone",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Mario Kart 64",
      id: "G2vA6Dngzhs",
      title: "Rainbow Road",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Super Mario Galaxy",
      id: "49pOiyZYWBQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Portal",
      id: "Y6ljFaKRTrI",
      title: "Still Alive",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Super Street Fighter 2",
      id: "jLJLyneZGKc",
      title: "Guile's Stage",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "GTA : Vice City",
      id: "F2_pg8xd1To",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Goldeneye 007",
      id: "OQ0nDBHPUfQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Mortal Kombat",
      id: "EAwWPadFsOA",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Star Fox 64",
      id: "-GjdmkjOI7w",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Final Fantasy VII",
      id: "t7wJ8pE2qKU",
      title: "One Winged Angel",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Final Fantasy X",
      id: "CVfLTGgDem0",
      title: "Otherworld",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Okami",
      id: "ya3yxTbkh5s",
      title: "The Sun Rises",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Tetris",
      id: "9Fv5cuYZFC0",
      title: "Type A",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Street of Rage",
      link: "Empty",
      title: "Stage 1",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "F-Zero",
      id: "XBuXfcFKAlo",
      title: "Mute City",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Doom",
      id: "j05hzwQf8pA",
      title: "At Doom's Gate",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Wathammer 40k : Dawn of War",
      id: "BG42F-5AVOE",
      title: "Space Marine Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Hearthstone",
      id: "yF7gWy4N54E",
      title: "Duel Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Super Meat Boy",
      id: "6aZSwE3_vz0",
      title: "Hospital Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Tomb Raider",
      id: "QWQ4U3vG7n8",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Need for Speed : Underground 2",
      id: "0VAF-4Er7_A",
      title: "Riders on the Storm",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "American Beauty",
      id: "al21Vtlsg4A",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Luz Casal",
      done: false,
      type: "audio",
      origin: "Talons Aiguilles",
      id: "8qcSJcvKrxc",
      title: "Piensa en me",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      done: false,
      type: "audio",
      origin: "Les Demoiselles De Rochefort",
      id: "uopjMuYY3F8&list=PL75CED282AF0B14EA",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Trust",
      done: false,
      type: "audio",
      id: "WfD8Dnh2xho",
      title: "Antisocial",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Notre Dame de Paris",
      done: false,
      type: "audio",
      id: "-XB7aftz6zY",
      title: "Belle",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Debut de Soiree",
      done: false,
      type: "audio",
      id: "JLNb0JthJ6Q",
      title: "Nuit de Folie",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Francky Vincent",
      done: false,
      type: "audio",
      id: "E9xE7UfYeac",
      title: "Alice ca Glisse",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Khaled",
      done: false,
      type: "audio",
      id: "5dWeeUIZFgA",
      title: "C'est La Vie",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Yelle",
      done: false,
      type: "audio",
      id: "Y99UqvgCmE8",
      title: "Je Veux Te Voir",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Lagaf'",
      done: false,
      type: "audio",
      id: "mKSk-3yiVx0",
      title: "Bo le Lavabo",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "IAM",
      done: false,
      type: "audio",
      id: "7ceNf9qJjgc",
      title: "Je Danse Le Mia",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Alizee",
      done: false,
      type: "audio",
      id: "P3uhPQZpjFg",
      title: "Moi Lolita",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Chimene Badi",
      done: false,
      type: "audio",
      id: "-kDSn9-1GDw",
      title: "Je Viens Du Sud",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "LAAM",
      done: false,
      type: "audio",
      id: "qyTZLkDsFpY",
      title: "Je Veux Chanter Pour Ceux",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Johnny Hallyday",
      done: false,
      type: "audio",
      id: "s3O1Xro7oAI",
      title: "Allumer le Feu",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Sheryfa Luna",
      done: false,
      type: "audio",
      id: "vGxOs9OrLYk",
      title: "Il Avait Les Mots",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Jena Lee",
      done: false,
      type: "audio",
      id: "_T2cU0TA9hE",
      title: "J'aimerais Tellement",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "BB Brunes",
      done: false,
      type: "audio",
      id: "X3VNRVo7irM",
      title: "Dis-Moi",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Zazie",
      done: false,
      type: "audio",
      id: "tB-zasOL29Y",
      title: "Je Suis un Homme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Mickey 3D",
      done: false,
      type: "audio",
      id: "Iwb6u1Jo1Mc",
      title: "Respire",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Casseurs Flowters",
      done: false,
      type: "audio",
      id: "yBwtAySu7Mg",
      title: "Des Histoires A Raconter",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Renaud",
      done: false,
      type: "audio",
      id: "uv37yxc51bE",
      title: "Toujours Debout",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Jacques Dutronc",
      done: false,
      type: "audio",
      id: "L_ADZYCUkDA",
      title: "L'Opportuniste",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Garou - Celine Dion",
      done: false,
      type: "audio",
      id: "PCuJguybz5Y",
      title: "Sous le vent",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Vanessa Paradis",
      done: false,
      type: "audio",
      id: "9Z-NbQvhzKM",
      title: "La Seine",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Liza Monet",
      done: false,
      type: "audio",
      id: "qUXaUtYrDpE",
      title: "My Best Plan",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Helene Segara",
      done: false,
      type: "audio",
      id: "6Pes0BQgQNY",
      title: "On n'oublie jamais rien, on vit avec",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Niagara",
      done: false,
      type: "audio",
      id: "lSQ-6xU8mPA",
      title: "Je dois m'en aller",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Francis Cabrel",
      done: false,
      type: "audio",
      id: "m1ET6SEtwbc",
      title: "La corrida",
      time: 30,
      from: 0,
      answerTime: 30
  }
]

function App() {
  return (
    <div className="App">
      <MySidebar allData={allData}></MySidebar>
    </div>
  );
}

export default App;
