import { Character, Category } from './types';

export const categoryNames: Record<Category, string> = {
  'all': '🎲 Todas (Random)',
  'deportistas': '⚽ Deportistas',
  'musicos': '🎵 Músicos',
  'actores': '🎬 Actores',
  'historicos': '📜 Históricos',
  'animados': '🎮 Animados/Ficción',
  'politicos': '🏛️ Políticos',
  'empresarios': '💼 Empresarios/Tech'
};

export const characters: Character[] = [
  // HISTÓRICOS
  { name: 'Albert Einstein', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg', category: 'historicos' },
  { name: 'Frida Kahlo', image: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg', category: 'historicos' },
  { name: 'Leonardo da Vinci', image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg', category: 'historicos' },
  { name: 'Marie Curie', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg', category: 'historicos' },
  { name: 'Nelson Mandela', image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg', category: 'historicos' },
  { name: 'Cleopatra', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Cleopatra_VII_statue_fragment%2C_69-30_BC_-_Royal_Ontario_Museum_-_DSC09761.JPG', category: 'historicos' },
  { name: 'Abraham Lincoln', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg', category: 'historicos' },
  { name: 'Gandhi', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg', category: 'historicos' },
  { name: 'William Shakespeare', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg', category: 'historicos' },
  { name: 'Pablo Picasso', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Portrait_de_Picasso%2C_1908.jpg', category: 'historicos' },
  { name: 'Mozart', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg', category: 'historicos' },
  { name: 'Beethoven', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg', category: 'historicos' },
  { name: 'Walt Disney', image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Walt_Disney_1946.JPG', category: 'historicos' },
  { name: 'Adolf Hitler', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Hitler_portrait_crop.jpg', category: 'historicos' },

  // DEPORTISTAS
  { name: 'Michael Jordan', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Michael_Jordan_in_2014.jpg', category: 'deportistas' },
  { name: 'Pelé', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Pel%C3%A9_2011_%282%29_%28cropped%29.jpg', category: 'deportistas' },
  { name: 'Muhammad Ali', image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Muhammad_Ali_NYWTS.jpg', category: 'deportistas' },
  { name: 'Serena Williams', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Serena_Williams_at_2013_US_Open.jpg', category: 'deportistas' },
  { name: 'Cristiano Ronaldo', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg', category: 'deportistas' },
  { name: 'Lionel Messi', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg', category: 'deportistas' },
  { name: 'Sergio Ramos', image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sergio_Ramos_Euro_2012_vs_France_01.jpg', category: 'deportistas' },
  { name: 'Checo Pérez', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/2019_Formula_One_tests_Barcelona%2C_P%C3%A9rez_%2847200017422%29.jpg', category: 'deportistas' },
  { name: 'Max Verstappen', image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Max_Verstappen_2017_Malaysia_3.jpg', category: 'deportistas' },
  { name: 'LeBron James', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg', category: 'deportistas' },
  { name: 'Canelo Álvarez', image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Sa%C3%BAl_%C3%81lvarez.png', category: 'deportistas' },
  { name: 'Tom Brady', image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Tom_Brady_2019.jpg', category: 'deportistas' },
  { name: 'Kobe Bryant', image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Kobe_Bryant_8.jpg', category: 'deportistas' },
  { name: 'Zinedine Zidane', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg', category: 'deportistas' },
  { name: 'Rafael Nadal', image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Rafael_Nadal_en_2024_%28cropped%29.jpg', category: 'deportistas' },
  { name: 'Novak Djokovic', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Novak_Djokovic_2024_Paris_Olympics.jpg', category: 'deportistas' },
  { name: 'Shohei Ohtani', image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Shohei_Ohtani_on_April_23%2C_2024_%282%29_53677091634.jpg', category: 'deportistas' },

  // MÚSICOS
  { name: 'The Beatles', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Beatles_ad_1965_just_the_beatles_crop.jpg', category: 'musicos' },
  { name: 'Elvis Presley', image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg', category: 'musicos' },
  { name: 'Maluma', image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Maluma_-_Espa%C3%A7o_das_Am%C3%A9ricas_2017_%28cropped%29.JPG', category: 'musicos' },
  { name: 'Bad Bunny', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg', category: 'musicos' },
  { name: 'Shakira', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Shakira_2014.jpg', category: 'musicos' },
  { name: 'Ariana Grande', image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Ariana_Grande_promoting_Wicked_4.jpg', category: 'musicos' },
  { name: 'Michael Jackson', image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg', category: 'musicos' },
  { name: 'Ed Sheeran', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg', category: 'musicos' },
  { name: 'Christian Nodal', image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Christian_Nodal_Regional_Mexicano.jpg', category: 'musicos' },
  { name: 'Rihanna', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Rihanna_Fenty_2018.png', category: 'musicos' },
  { name: 'Luis Miguel', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Luis_Miguel_%283x4_cropped%29.jpg', category: 'musicos' },
  { name: 'Taylor Swift', image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Taylor_Swift_at_the_Golden_Globes_2024_%28Enhanced%2C_cropped%29_1.jpg', category: 'musicos' },
  { name: 'Lady Gaga', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Lady_Gaga_at_the_White_House_in_2023_%283%29.jpg', category: 'musicos' },
  { name: 'Flavor Flav', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Public_Enemy_2008.05.29_002.jpg', category: 'musicos' },

  // ACTORES
  { name: 'Salma Hayek', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Salma_Hayek_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg', category: 'actores' },
  { name: 'Chespirito', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Roberto_G%C3%B3mez_Bola%C3%B1os_Premios_Fama_2008.jpg', category: 'actores' },
  { name: 'Cantinflas', image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Mario_Moreno_-_Cantinflas-2.jpg', category: 'actores' },
  { name: 'Dwayne "The Rock" Johnson', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Dwayne_Johnson_2%2C_2013.jpg', category: 'actores' },
  { name: 'Eugenio Derbez', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Eugenio_Derbez.png', category: 'actores' },
  { name: 'Scarlett Johansson', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg', category: 'actores' },
  { name: 'Chris Hemsworth', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg', category: 'actores' },
  { name: 'Ryan Reynolds', image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg', category: 'actores' },
  { name: 'Pedro Pascal', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Pedro_Pascal_by_Gage_Skidmore.jpg', category: 'actores' },
  { name: 'Angelina Jolie', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg', category: 'actores' },
  { name: 'Will Smith', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg', category: 'actores' },
  { name: 'Sofía Vergara', image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sof%C3%ADa_Vergara_2019_by_Glenn_Francis.jpg', category: 'actores' },
  { name: 'Morgan Freeman', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Morgan_Freeman_Deauville_2018.jpg', category: 'actores' },
  { name: 'Jim Carrey', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Jim_Carrey_2008.jpg', category: 'actores' },
  { name: 'Leonardo DiCaprio', image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg', category: 'actores' },
  { name: 'Anne Hathaway', image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Anne_Hathaway-68408.jpg', category: 'actores' },

  // ANIMADOS / FICCIÓN
  { name: 'Harry Potter', image: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg', category: 'animados' },
  { name: 'Spider-Man', image: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png', category: 'animados' },
  { name: 'Batman', image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Batman_in_Justice_League_TV_series.png', category: 'animados' },
  { name: 'Superman', image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png', category: 'animados' },
  { name: 'Mickey Mouse', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Mickey_Mouse.svg', category: 'animados' },
  { name: 'Mario Bros', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Wikia-Gamescom-2017-Tuesday-039_%2836689998936%29.jpg', category: 'animados' },
  { name: 'Pikachu', image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png', category: 'animados' },
  { name: 'Sonic', image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/WW_Chicago_2011_-_Sonic_the_Hedgehog_%288168360292%29.jpg', category: 'animados' },
  { name: 'Hey Arnold', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f8332eae-b09b-489e-b514-3e5ffbc461b2/dzdxz8-dd63dff6-cae9-4746-99a5-edb3c3835316.jpg/v1/fit/w_587,h_782,q_70,strp/hey_arnold_by_lightingboy_dzdxz8-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzgyIiwicGF0aCI6Ii9mL2Y4MzMyZWFlLWIwOWItNDg5ZS1iNTE0LTNlNWZmYmM0NjFiMi9kemR4ejgtZGQ2M2RmZjYtY2FlOS00NzQ2LTk5YTUtZWRiM2MzODM1MzE2LmpwZyIsIndpZHRoIjoiPD01ODcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.56Ql38F9MuXUcx694A67ejLLPJhx6IW0mq9Uv-y2u_4', category: 'animados' },
  { name: 'Helga G. Pataki', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ed426b1b-f529-48e0-a0b7-30eacfad7263/d6tst56-449b732e-2173-4386-ad9e-767f12ba7926.jpg/v1/fit/w_600,h_600,q_70,strp/helga_g__pataki_by_mylastfantasy_d6tst56-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6Ii9mL2VkNDI2YjFiLWY1MjktNDhlMC1hMGI3LTMwZWFjZmFkNzI2My9kNnRzdDU2LTQ0OWI3MzJlLTIxNzMtNDM4Ni1hZDllLTc2N2YxMmJhNzkyNi5qcGciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.4PGhbrHkhTdLadySssSagEO25dVxaULrCu0mzODOY8s', category: 'animados' },
  { name: 'Buzz Lightyear', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Buzz_lightyear_%26_LilBuzz.jpg', category: 'animados' },
  { name: 'Woody', image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Woody_at_Toy_Story_Land%2C_Hong_Kong.jpg', category: 'animados' },
  { name: 'Mary Poppins', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Mary_Poppins5.jpg', category: 'animados' },
  { name: 'El Chapulin Colorado', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/El_Chapul%C3%ADn_colorado.jpg', category: 'animados' },
  { name: 'Captain Jack Sparrow', image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Johnny_Depp_as_Captain_Jack_Sparrow_in_Queensland%2C_Australia.jpg', category: 'animados' },
  { name: 'Luigi', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Luigi_-_mural_w_Toruniu.jpg', category: 'animados' },
  { name: 'Forrest Gump', image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/TomHanksForrestGump94.jpg', category: 'animados' },
  { name: 'Timmy Turner', image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Timmy_Turner.png', category: 'animados' },
  { name: 'Bugs Bunny', image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FB-111_Bugs_Bunny_Nose_Art.jpeg', category: 'animados' },
  { name: 'Bob Esponja', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/SpongeBob_character.svg', category: 'animados' },
  { name: 'Homero Simpson', image: 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png', category: 'animados' },
  { name: 'Darth Vader', image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Star_Wars_-_Darth_Vader.jpg', category: 'animados' },
  { name: 'Ratatouille', image: 'https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg', category: 'animados' },
  { name: 'Rocky Balboa', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Rocky-Ad-Santa-Ana-Orange-County-Register-Apr%2C01-1977-p-102_%28cropped%29.jpg', category: 'animados' },
  { name: 'El Grinch', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/The_Grinch_Merry_Christmas_-By_LOPDesigns.png', category: 'animados' },

  // POLÍTICOS
  { name: 'Donald Trump', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg', category: 'politicos' },
  { name: 'Barack Obama', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg', category: 'politicos' },
  { name: 'Enrique Peña Nieto', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Enrique_Pe%C3%B1a_Nieto%2C_June_2017.jpg', category: 'politicos' },
  { name: 'Carlos Salinas de Gortari', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Carlos_Salinas_de_Gortari_official_portrait.jpg', category: 'politicos' },

  // EMPRESARIOS / TECH
  { name: 'Steve Jobs', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg', category: 'empresarios' },
  { name: 'Bill Gates', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg', category: 'empresarios' },
  { name: 'Elon Musk', image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg', category: 'empresarios' },
  { name: 'Mark Zuckerberg', image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg', category: 'empresarios' },
  { name: 'Jeff Bezos', image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg', category: 'empresarios' },
  { name: 'Tim Cook', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Visit_of_Tim_Cook_to_the_European_Commission_-_P061904-946789.jpg', category: 'empresarios' },
];

// Función para obtener personajes filtrados por categoría
export const getCharactersByCategory = (category: Category): Character[] => {
  if (category === 'all') {
    return characters;
  }
  return characters.filter(char => char.category === category);
};

// Obtener todas las categorías disponibles
export const availableCategories: Category[] = [
  'all',
  'deportistas',
  'musicos',
  'actores',
  'historicos',
  'animados',
  'politicos',
  'empresarios'
];