/**
 * DATA.JS - PLANET MISSION LAB
 * Kumpulan data terstruktur untuk materi pembelajaran, filter lab, misi interaktif, kuis, dan data pengembang.
 */

const PLANET_DATA = {
  // INFO PENGEMBANG & MEDIA
  mediaInfo: {
    title: "PLANET MISSION LAB",
    subtitle: "Media Pembelajaran Interaktif Tata Surya",
    developers: [
      { name: "Shol", role: "Pengembang Konten & Desain Visual" },
      { name: "Fadhilah", role: "Pengembang Materi & Kurikulum" },
      { name: "Najwa", role: "Pengembang Evaluasi & Media Interaktif" },
      { name: "Tasya", role: "Pengembang Desain UI/UX & Pengujian" }
    ],
    objectives: [
      "Menjelaskan pengertian tata surya dan planet.",
      "Menyebutkan anggota tata surya secara lengkap.",
      "Mengurutkan planet berdasarkan jarak dari Matahari.",
      "Mengidentifikasi karakteristik spesifik setiap planet.",
      "Mengelompokkan planet luar dan dalam yang dibatasi sabuk asteroid."
    ]
  },

  // PENGANTAR TATA SURYA (SLIDE 3)
  overview: {
    title: "PENGERTIAN TATA SURYA",
    paragraphs: [
      "Tata Surya adalah kumpulan benda langit yang terdiri atas sebuah bintang induk yang disebut Matahari dan semua objek langit yang terikat oleh gaya gravitasinya.",
      "Planet adalah benda langit yang mengorbit Matahari, memiliki massa yang cukup besar untuk membentuk gaya gravitasi sendiri sehingga berbentuk bulat, dan telah membersihkan lingkungan di sekitar orbitnya dari objek-objek kecil lainnya.",
      "Tata Surya kita memiliki delapan planet utama yang terbagi secara harmonis yaitu Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus."
    ]
  },

  // ANGGOTA TATA SURYA LENGKAP (SLIDE 4)
  bodies: [
    {
      id: "matahari",
      number: 0,
      name: "Matahari",
      title: "MATAHARI",
      tagline: "Pusat Tata Surya & Bintang Induk",
      summary: "Merupakan sumber kehidupan bagi setiap makhluk hidup terutama manusia yang membutuhkan kehangatan dan energi.",
      description: "Matahari memiliki ukuran sebesar 332.830 kali massa bumi. Ukuran massa yang raksasa ini menimbulkan kepadatan dan tekanan inti yang sangat tinggi, memungkinkan reaksi fusi nuklir hidrogen menjadi helium secara berkelanjutan dan menghasilkan pancaran energi dahsyat ke antariksa.",
      type: "Bintang Induk",
      diameter: "1.392.700 km",
      surfaceTemp: "5.500 °C",
      coreTemp: "15.000.000 °C",
      rotation: "25 - 35 hari",
      composition: "73% Hidrogen, 25% Helium",
      image: "assets/Matahari.png"
    },
    {
      id: "merkurius",
      number: 1,
      name: "Merkurius",
      title: "MERKURIUS",
      tagline: "Planet Terkecil & Terdekat ke Matahari",
      summary: "Merkurius merupakan planet terkecil di antara 8 planet dalam tata surya.",
      description: "Planet Merkurius berjarak sekitar 58 juta kilometer dari Matahari. Merkurius dapat diamati sesaat sebelum fajar atau setelah senja. Planet ini bergerak mengelilingi Matahari paling cepat dengan kala revolusi hanya 88 hari dan kala rotasi 59 hari. Merkurius tidak memiliki satelit alami dan gravitasinya sekitar sepertiga gravitasi Bumi.",
      group: "Planet Dalam",
      distance: "58 juta km",
      revolution: "88 hari",
      rotation: "59 hari",
      satellites: 0,
      satelliteList: "Tidak memiliki satelit",
      rings: false,
      sizeCategory: "Kecil",
      image: "assets/Merkurius.png"
    },
    {
      id: "venus",
      number: 2,
      name: "Venus",
      title: "VENUS",
      tagline: "Bintang Kejora & Planet Terpanas",
      summary: "Planet kedua dari Matahari dengan atmosfer tebal efek rumah kaca ekstrem.",
      description: "Planet Venus berjarak sekitar 108 juta kilometer dari Matahari. Permukaannya terselubung awan tebal gas karbon dioksida (>96%) yang memerangkap panas sehingga suhu permukaannya mencapai 450°C. Venus mengitari Matahari dalam waktu 225 hari dengan kala rotasi 243 hari dan berotasi secara berlawanan arah jarum jam (retrograde). Venus juga tidak memiliki satelit.",
      group: "Planet Dalam",
      distance: "108 juta km",
      revolution: "225 hari",
      rotation: "243 hari (Retrograde)",
      satellites: 0,
      satelliteList: "Tidak memiliki satelit",
      rings: false,
      sizeCategory: "Sedang",
      image: "assets/Venus.png"
    },
    {
      id: "bumi",
      number: 3,
      name: "Bumi",
      title: "BUMI",
      tagline: "Planet Biru Rumah Kehidupan",
      summary: "Satu-satunya planet dalam tata surya yang diketahui mendukung kehidupan.",
      description: "Bumi adalah planet ketiga dalam urutan tata surya dengan jarak rata-rata 150 juta kilometer dari Matahari. Bumi memiliki lapisan atmosfer pelindung kaya nitrogen dan oksigen, serta air dalam bentuk cair. Bumi berevolusi selama 365,25 hari (1 tahun) dan berotasi selama 24 jam (1 hari), didampingi oleh 1 satelit alami yaitu Bulan.",
      group: "Planet Dalam",
      distance: "150 juta km",
      revolution: "365,25 hari (1 tahun)",
      rotation: "24 jam (1 hari)",
      satellites: 1,
      satelliteList: "Bulan (Moon)",
      rings: false,
      sizeCategory: "Sedang",
      image: "assets/Bumi.png"
    },
    {
      id: "mars",
      number: 4,
      name: "Mars",
      title: "MARS",
      tagline: "Planet Merah Penuh Misteri",
      summary: "Planet keempat berwarna kemerahan akibat kandungan oksida besi (karat).",
      description: "Planet Mars berdiameter sekitar 6.800 km dengan jarak ke Matahari sekitar 228 juta km. Mars memerlukan waktu revolusi selama 687 hari dan periode rotasi sekitar 24,6 jam (mirip dengan Bumi). Mars memiliki atmosfer tipis karbon dioksida dan dikelilingi oleh dua satelit alami berukuran kecil yaitu Phobos dan Deimos.",
      group: "Planet Dalam",
      distance: "228 juta km",
      revolution: "687 hari",
      rotation: "24,6 jam",
      satellites: 2,
      satelliteList: "Phobos, Deimos",
      rings: false,
      sizeCategory: "Sedang",
      image: "assets/Mars.png"
    },
    {
      id: "sabuk-asteroid",
      number: 4.5,
      name: "Sabuk Asteroid",
      title: "SABUK ASTEROID",
      tagline: "Batas Pemisah Alami Planet Dalam & Luar",
      summary: "Wilayah di Tata Surya antara orbit Mars dan Jupiter dipenuhi jutaan batuan antariksa.",
      description: "Sabuk Asteroid terletak di antara orbit planet Mars dan Jupiter. Wilayah ini dipenuhi jutaan batuan antariksa dan planet kerdil (seperti Ceres) yang membatasi kelompok Planet Dalam berbatu dengan kelompok Planet Luar raksasa gas.",
      group: "Pembatas Orbit",
      distance: "329 - 478 juta km",
      satellites: 0,
      rings: false,
      sizeCategory: "Batuan Kerdil",
      image: "assets/sabuk%20asteroid.jpg"
    },
    {
      id: "jupiter",
      number: 5,
      name: "Jupiter",
      title: "JUPITER",
      tagline: "Planet Terbesar Raksasa Gas",
      summary: "Planet kelima sekaligus planet paling besar dalam seluruh tata surya.",
      description: "Jupiter merupakan planet raksasa gas berdiameter sekitar 142.860 km. Berjarak sekitar 778 juta km dari Matahari dengan kala revolusi sekitar 12 tahun. Periode rotasinya sangat cepat, hanya 9,8 jam. Memiliki atmosfer tebal hidrogen dan helium dengan bintik merah raksasa, serta memiliki 79 satelit alami (Io, Europa, Ganymede, Callisto, dll).",
      group: "Planet Luar",
      distance: "778 juta km",
      revolution: "11,86 tahun (~12 tahun)",
      rotation: "9,8 jam",
      satellites: 79,
      satelliteList: "Io, Europa, Ganymede, Callisto, dkk (79 satelit)",
      rings: false,
      sizeCategory: "Besar",
      image: "assets/Jupiter.png"
    },
    {
      id: "saturnus",
      number: 6,
      name: "Saturnus",
      title: "SATURNUS",
      tagline: "Permata Tata Surya dengan Cincin Spektakuler",
      summary: "Planet keenam yang terkenal dengan sistem cincin es dan batu yang memukau.",
      description: "Saturnus dikenal memiliki sistem cincin megah yang tersusun atas miliaran partikel es, batuan, dan debu angkasa. Saturnus memiliki periode revolusi 29,5 tahun dan periode rotasi 10,6 jam. Kerapatan massanya sangat rendah (lebih ringan dari air) dan dikelilingi oleh 82 satelit alami, dengan yang terbesar bernama Titan.",
      group: "Planet Luar",
      distance: "1.427 juta km",
      revolution: "29,5 tahun",
      rotation: "10,6 jam",
      satellites: 82,
      satelliteList: "Titan, Enceladus, Mimas, dkk (82 satelit)",
      rings: true,
      sizeCategory: "Besar",
      image: "assets/Saturnus.png"
    },
    {
      id: "uranus",
      number: 7,
      name: "Uranus",
      title: "URANUS",
      tagline: "Raksasa Es Berotasi Menyamping",
      summary: "Planet ketujuh dengan kemiringan rotasi ekstrem 98 derajat.",
      description: "Uranus adalah raksasa es berjarak 2.870 juta km dari Matahari dengan diameter 50.100 km. Keunikan utamanya adalah poros rotasinya miring hingga 98 derajat, sehingga seolah menggelinding menyamping. Memiliki periode revolusi 84 tahun, kala rotasi 11-17 jam, serta memiliki 27 satelit alami (Titania, Oberon, Ariel, Umbriel, Miranda) dan cincin tipis.",
      group: "Planet Luar",
      distance: "2.870 juta km",
      revolution: "84 tahun",
      rotation: "11-17 jam (Menyamping)",
      satellites: 27,
      satelliteList: "Titania, Oberon, Ariel, Umbriel, Miranda (27 satelit)",
      rings: true,
      sizeCategory: "Sedang",
      image: "assets/Uranus.png"
    },
    {
      id: "neptunus",
      number: 8,
      name: "Neptunus",
      title: "NEPTUNUS",
      tagline: "Planet Biru Paling Dingin & Berangin",
      summary: "Planet kedelapan terjauh dengan badai supersonik dahsyat.",
      description: "Neptunus adalah planet terluar dengan jarak sekitar 4.500 juta km dari Matahari. Dikenal sebagai planet paling berangin dengan kecepatan badai mencapai 2.000 km/jam. Memerlukan waktu revolusi 165 tahun dan kala rotasi 16 jam. Memiliki 14 satelit alami dengan satelit utama bernama Triton.",
      group: "Planet Luar",
      distance: "4.500 juta km",
      revolution: "165 tahun",
      rotation: "16 jam",
      satellites: 14,
      satelliteList: "Triton, Proteus, Nereid, dkk (14 satelit)",
      rings: false,
      sizeCategory: "Sedang",
      image: "assets/Neptunus.png"
    }
  ],

  // DATA KLASIFIKASI PLANET DALAM VS LUAR
  classification: {
    title: "PLANET DALAM DAN LUAR",
    description: "Planet-planet di Tata Surya kita dibagi menjadi dua kelompok besar, yaitu kelompok Planet Dalam dan kelompok Planet Luar yang dipisahkan oleh Sabuk Asteroid.",
    innerPlanets: {
      name: "Planet Dalam (Terestrial)",
      members: ["Merkurius", "Venus", "Bumi", "Mars"],
      characteristics: [
        "Letaknya paling dekat dengan Matahari (di dalam orbit Sabuk Asteroid)",
        "Tersusun dari batuan padat dan mineral logam",
        "Ukuran relatif lebih kecil dan bermassa jenis tinggi",
        "Memiliki sedikit satelit atau tidak punya sama sekali",
        "Tidak memiliki sistem cincin"
      ]
    },
    outerPlanets: {
      name: "Planet Luar (Jovian / Gas Raksasa)",
      members: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
      characteristics: [
        "Letaknya jauh dari Matahari (di luar orbit Sabuk Asteroid)",
        "Tersusun dari gas hidrogen, helium, serta es metana & amonia",
        "Ukuran sangat besar (raksasa gas & es) dan bermassa jenis rendah",
        "Memiliki banyak satelit alami",
        "Dikelilingi oleh sistem cincin"
      ]
    }
  },

  // DATABASE FILTER UNTUK PLANET LAB (SLIDE 5)
  labPlanets: [
    {
      name: "Merkurius",
      size: "Kecil",
      satellites: "Tidak punya",
      rings: "Tidak",
      group: "Dalam",
      distance: "Dekat",
      image: "assets/Merkurius.png",
      badge: "Planet Terkecil"
    },
    {
      name: "Venus",
      size: "Kecil",
      sizeAlt: "Sedang",
      satellites: "Tidak punya",
      rings: "Tidak",
      group: "Dalam",
      distance: "Dekat",
      image: "assets/Venus.png",
      badge: "Planet Terpanas"
    },
    {
      name: "Bumi",
      size: "Sedang",
      satellites: "Sedikit",
      rings: "Tidak",
      group: "Dalam",
      distance: "Dekat",
      image: "assets/Bumi.png",
      badge: "Planet Kehidupan"
    },
    {
      name: "Mars",
      size: "Sedang",
      satellites: "Sedikit",
      rings: "Tidak",
      group: "Dalam",
      distance: "Dekat",
      image: "assets/Mars.png",
      badge: "Planet Merah"
    },
    {
      name: "Jupiter",
      size: "Besar",
      satellites: "Banyak",
      rings: "Tidak",
      group: "Luar",
      distance: "Jauh",
      image: "assets/Jupiter.png",
      badge: "Planet Terbesar"
    },
    {
      name: "Saturnus",
      size: "Besar",
      satellites: "Banyak",
      rings: "Ada",
      group: "Luar",
      distance: "Jauh",
      image: "assets/Saturnus.png",
      badge: "Planet Bercincin"
    },
    {
      name: "Uranus",
      size: "Sedang",
      satellites: "Banyak",
      rings: "Ada",
      group: "Luar",
      distance: "Jauh",
      image: "assets/Uranus.png",
      badge: "Rotasi Menyamping"
    },
    {
      name: "Neptunus",
      size: "Sedang",
      satellites: "Banyak",
      rings: "Tidak",
      group: "Luar",
      distance: "Jauh",
      image: "assets/Neptunus.png",
      badge: "Planet Paling Berangin"
    }
  ],

  // DATA MISSION ROOM (SLIDE 6 & 7)
  missions: {
    mission1: {
      title: "MISSION ROOM 1",
      instruction: "Susunlah planet-planet sesuai dengan urutannya dari Matahari!",
      correctOrder: [
        { id: "matahari", name: "Matahari", image: "assets/Matahari.png", isSun: true },
        { id: "merkurius", name: "Merkurius", image: "assets/Merkurius.png" },
        { id: "venus", name: "Venus", image: "assets/Venus.png" },
        { id: "bumi", name: "Bumi", image: "assets/Bumi.png" },
        { id: "mars", name: "Mars", image: "assets/Mars.png" },
        { id: "jupiter", name: "Jupiter", image: "assets/Jupiter.png" },
        { id: "saturnus", name: "Saturnus", image: "assets/Saturnus.png" },
        { id: "uranus", name: "Uranus", image: "assets/Uranus.png" },
        { id: "neptunus", name: "Neptunus", image: "assets/Neptunus.png" }
      ]
    },
    mission2Rounds: [
      {
        round: 1,
        title: "MISSION ROOM 2",
        instruction: "Pilih planet yg sesuai dengan karakteristik berikut:",
        clues: [
          "Mempunyai 27 satelit alami",
          "Termasuk kelompok planet luar",
          "Kala revolusi 84 tahun",
          "Arah rotasinya menyamping"
        ],
        options: [
          { name: "Neptunus", image: "assets/Neptunus.png", isCorrect: false },
          { name: "Uranus", image: "assets/Uranus.png", isCorrect: true },
          { name: "Venus", image: "assets/Venus.png", isCorrect: false }
        ]
      },
      {
        round: 2,
        title: "MISSION ROOM 2",
        instruction: "Pilih planet yg sesuai dengan karakteristik berikut:",
        clues: [
          "Planet terbesar kedua di tata surya",
          "Mempunyai 82 satelit alami",
          "Termasuk kelompok planet luar",
          "Kala revolusi 29,5 tahun",
          "Mempunyai sistem cincin spektakuler"
        ],
        options: [
          { name: "Bumi", image: "assets/Bumi.png", isCorrect: false },
          { name: "Merkurius", image: "assets/Merkurius.png", isCorrect: false },
          { name: "Saturnus", image: "assets/Saturnus.png", isCorrect: true }
        ]
      },
      {
        round: 3,
        title: "MISSION ROOM 2",
        instruction: "Pilih planet yg sesuai dengan karakteristik berikut:",
        clues: [
          "Planet terbesar di tata surya",
          "Mempunyai 79 satelit alami",
          "Termasuk kelompok planet luar",
          "Kala revolusi sekitar 12 tahun"
        ],
        options: [
          { name: "Jupiter", image: "assets/Jupiter.png", isCorrect: true },
          { name: "Uranus", image: "assets/Uranus.png", isCorrect: false },
          { name: "Mars", image: "assets/Mars.png", isCorrect: false }
        ]
      }
    ]
  },

  // BANK SOAL KUIS KLASIKAL (SLIDE 8 - 30 SOAL LENGKAP & PEMBAHASAN EDUKATIF)
  quizQuestions: [
    {
      id: 1,
      question: "Apa definisi dari sebuah planet?",
      options: [
        "a. Benda langit yang dapat memancarkan cahaya sendiri",
        "b. Benda langit yang tidak dapat memancarkan cahaya sendiri",
        "c. Bola gas panas yang menjadi pusat tata surya",
        "d. Benda langit yang selalu memiliki satelit alami"
      ],
      correctIndex: 1,
      explanation: "Planet adalah benda langit yang tidak memancarkan cahaya sendiri, melainkan memantulkan cahaya dari bintang induknya (Matahari). Benda yang memancarkan cahaya sendiri disebut Bintang."
    },
    {
      id: 2,
      question: "Planet mana saja yang termasuk dalam kelompok planet dalam?",
      options: [
        "a. Jupiter, Saturnus, Uranus, Neptunus",
        "b. Mars, Jupiter, Saturnus, Uranus",
        "c. Merkurius, Venus, Bumi, Mars",
        "d. Venus, Bumi, Jupiter, Saturnus"
      ],
      correctIndex: 2,
      explanation: "Planet dalam berada di antara Matahari dan Sabuk Asteroid, yaitu Merkurius, Venus, Bumi, dan Mars. Karakteristik utamanya berpermukaan padat berbatu."
    },
    {
      id: 3,
      question: "Planet apa yang mendapat julukan sebagai \"Planet Merah\"?",
      options: [
        "a. Venus",
        "b. Mars",
        "c. Saturnus",
        "d. Jupiter"
      ],
      correctIndex: 1,
      explanation: "Mars dijuluki 'Planet Merah' karena tanah dan bebatuannya kaya akan mineral oksida besi (karat) yang memberikan kenampakan warna merah jingga khas."
    },
    {
      id: 4,
      question: "Berapa jumlah satelit alami yang dimiliki oleh planet Bumi?",
      options: [
        "a. Tidak punya satelit",
        "b. Satu satelit",
        "c. Lebih dari lima satelit",
        "d. Dua satelit"
      ],
      correctIndex: 1,
      explanation: "Bumi hanya memiliki satu-satunya satelit alami yaitu Bulan (Moon) yang mengitari Bumi secara teratur setiap 27,3 hari."
    },
    {
      id: 5,
      question: "Planet terbesar di dalam tata surya kita yang berada di luar sabuk asteroid adalah ...",
      options: [
        "a. Saturnus",
        "b. Uranus",
        "c. Jupiter",
        "d. Neptunus"
      ],
      correctIndex: 2,
      explanation: "Jupiter adalah planet terbesar di tata surya dengan diameter lebih dari 142.000 km dan memiliki massa lebih besar daripada gabungan seluruh planet lainnya."
    },
    {
      id: 6,
      question: "Planet manakah yang terkenal dengan sebutan planet terindah di tata surya karena dikelilingi oleh banyak cincin tipis dari batuan dan es?",
      options: [
        "a. Saturnus",
        "b. Uranus",
        "c. Jupiter",
        "d. Neptunus"
      ],
      correctIndex: 0,
      explanation: "Saturnus memiliki cincin spektakuler yang paling indah dan jelas diamati dari Bumi, tersusun dari miliaran bongkahan es dan batuan antariksa."
    },
    {
      id: 7,
      question: "Planet manakah yang memiliki waktu revolusi (mengelilingi Matahari) paling cepat di antara seluruh planet, yaitu hanya 88 hari?",
      options: [
        "a. Saturnus",
        "b. Uranus",
        "c. Merkurius",
        "d. Venus"
      ],
      correctIndex: 2,
      explanation: "Karena jaraknya paling dekat ke Matahari (sekitar 58 juta km), Merkurius menempuh lintasan orbit terpendek sehingga hanya membutuhkan 88 hari untuk satu kali revolusi."
    },
    {
      id: 8,
      question: "Venus sering dijuluki sebagai planet terpanas di tata surya. Apa penyebab utama fenomena ini?",
      options: [
        "a. Venus memiliki ukuran yang jauh lebih besar daripada Merkurius sehingga menyerap lebih banyak panas.",
        "b. Lapisan karbondioksida yang sangat tebal (± 96%) di atmosfer Venus menjebak panas seperti efek rumah kaca.",
        "c. Arah rotasi Venus yang searah jarum jam mempercepat penyerapan sinar matahari.",
        "d. Venus memiliki jarak paling dekat dengan Matahari di antara semua planet."
      ],
      correctIndex: 1,
      explanation: "Efek rumah kaca ekstrem yang dipicu oleh lapisan atmosfer karbon dioksida (>96%) yang sangat tebal memerangkap energi panas Matahari secara permanen."
    },
    {
      id: 9,
      question: "Planet yang memiliki sumbu rotasi menyamping (98 derajat) sehingga tampak menggelinding dan berwarna hijau-biru akibat gas metana adalah ...",
      options: [
        "a. Saturnus",
        "b. Uranus",
        "c. Merkurius",
        "d. Neptunus"
      ],
      correctIndex: 1,
      explanation: "Uranus memiliki sumbu rotasi yang sangat miring (98 derajat) sehingga tampak menggelinding menyamping, serta kaya akan gas metana yang memberikan warna hijau kebiruan."
    },
    {
      id: 10,
      question: "Pernyataan manakah yang paling tepat menggambarkan perbedaan mendasar antara Planet Dalam dan Planet Luar?",
      options: [
        "a. Planet dalam berukuran besar dan tersusun dari gas, sedangkan planet luar berukuran kecil dan tersusun dari bebatuan.",
        "b. Planet dalam berukuran relatif kecil dan tersusun dari bebatuan, sedangkan planet luar berukuran relatif besar dan tersusun dari gas.",
        "c. Planet dalam tidak memiliki satelit sama sekali, sedangkan seluruh planet luar pasti memiliki cincin.",
        "d. Planet dalam mengelilingi Matahari lebih lambat dari planet luar."
      ],
      correctIndex: 1,
      explanation: "Planet Dalam (Merkurius, Venus, Bumi, Mars) bersifat terestrial padat berbatu dan berukuran kecil. Sedangkan Planet Luar (Jupiter, Saturnus, Uranus, Neptunus) adalah raksasa gas/es berukuran masif."
    },
    {
      id: 11,
      question: "Sabuk asteroid yang berada di antara orbit Mars dan Jupiter menjadi salah satu batas pemisah antara ....",
      options: [
        "a. Planet dalam dan planet luar",
        "b. Planet terdekat dan terjauh",
        "c. Planet bercincin dan tidak bercincin",
        "d. Planet berbatu dan satelit alami"
      ],
      correctIndex: 0,
      explanation: "Sabuk Asteroid terletak di antara orbit Mars dan Jupiter, membentuk batas alami yang memisahkan kelompok Planet Dalam (terestrial berbatu) dengan kelompok Planet Luar (raksasa gas dan es)."
    },
    {
      id: 12,
      question: "Kelompok planet yang termasuk planet luar adalah ....",
      options: [
        "a. Merkurius, Venus, Bumi, dan Mars",
        "b. Venus, Bumi, Mars, dan Jupiter",
        "c. Bumi, Mars, Jupiter, dan Saturnus",
        "d. Jupiter, Saturnus, Uranus, dan Neptunus"
      ],
      correctIndex: 3,
      explanation: "Planet luar adalah planet yang berada di luar Sabuk Asteroid, terdiri dari Jupiter, Saturnus, Uranus, dan Neptunus. Keempatnya berukuran besar dan didominasi oleh gas atau es."
    },
    {
      id: 13,
      question: "Pernyataan yang tepat mengenai perbedaan planet dalam dan planet luar adalah ....",
      options: [
        "a. Planet dalam berukuran relatif kecil dan tersusun dari batuan, sedangkan planet luar umumnya lebih besar dan didominasi gas atau es.",
        "b. Planet dalam selalu memiliki cincin, sedangkan planet luar tidak memiliki cincin.",
        "c. Planet dalam tidak mengelilingi Matahari, sedangkan planet luar mengelilingi Matahari.",
        "d. Planet dalam selalu memiliki lebih banyak satelit daripada planet luar."
      ],
      correctIndex: 0,
      explanation: "Planet dalam (Merkurius, Venus, Bumi, Mars) tersusun dari batuan padat dan berukuran relatif kecil. Sementara planet luar (Jupiter, Saturnus, Uranus, Neptunus) berukuran jauh lebih besar dan didominasi gas hidrogen, helium, atau es."
    },
    {
      id: 14,
      question: "Planet yang dikenal dengan julukan Planet Merah karena penampakan permukaannya adalah ....",
      options: [
        "a. Venus",
        "b. Mars",
        "c. Jupiter",
        "d. Saturnus"
      ],
      correctIndex: 1,
      explanation: "Mars mendapat julukan 'Planet Merah' karena permukaannya dipenuhi debu dan batuan yang kaya oksida besi (besi berkarat) sehingga tampak berwarna merah dari jarak jauh."
    },
    {
      id: 15,
      question: "Planet terbesar dalam sistem tata surya adalah ....",
      options: [
        "a. Saturnus",
        "b. Uranus",
        "c. Jupiter",
        "d. Neptunus"
      ],
      correctIndex: 2,
      explanation: "Jupiter adalah planet terbesar dengan diameter sekitar 142.860 km, lebih besar dari seluruh planet lainnya. Massanya bahkan melebihi gabungan massa semua planet di tata surya."
    },
    {
      id: 16,
      question: "Planet yang terkenal dengan sistem cincin indah yang tersusun dari partikel es dan batuan adalah ....",
      options: [
        "a. Merkurius",
        "b. Mars",
        "c. Venus",
        "d. Saturnus"
      ],
      correctIndex: 3,
      explanation: "Saturnus memiliki sistem cincin yang paling spektakuler dan terkenal di tata surya, terdiri dari miliaran partikel es, debu, dan batuan yang mengelilingi planet dengan indah."
    },
    {
      id: 17,
      question: "Planet yang memiliki dua satelit alami bernama Phobos dan Deimos adalah ....",
      options: [
        "a. Mars",
        "b. Bumi",
        "c. Venus",
        "d. Merkurius"
      ],
      correctIndex: 0,
      explanation: "Mars memiliki dua satelit alami yaitu Phobos dan Deimos. Keduanya berukuran kecil dan tidak beraturan, berbeda dengan Bulan milik Bumi yang jauh lebih besar."
    },
    {
      id: 18,
      question: "Planet yang memiliki satu satelit alami bernama Bulan adalah ....",
      options: [
        "a. Venus",
        "b. Bumi",
        "c. Uranus",
        "d. Neptunus"
      ],
      correctIndex: 1,
      explanation: "Bumi memiliki satu satelit alami yaitu Bulan (Moon). Bulan merupakan benda langit terbesar kedua setelah Matahari yang terlihat dari Bumi dan berperan penting dalam siklus pasang surut air laut."
    },
    {
      id: 19,
      question: "Planet yang tidak memiliki satelit alami adalah ....",
      options: [
        "a. Jupiter dan Saturnus",
        "b. Bumi dan Mars",
        "c. Venus dan Merkurius",
        "d. Uranus dan Neptunus"
      ],
      correctIndex: 2,
      explanation: "Venus dan Merkurius adalah satu-satunya planet dalam tata surya yang tidak memiliki satelit alami. Semua planet lain memiliki setidaknya satu satelit alami."
    },
    {
      id: 20,
      question: "Venus dikenal sebagai planet terpanas di tata surya. Penyebab utama kondisi tersebut adalah ....",
      options: [
        "a. Venus merupakan planet terbesar dalam tata surya.",
        "b. Venus memiliki jarak paling dekat dengan Matahari.",
        "c. Venus memiliki banyak satelit alami yang menghasilkan panas.",
        "d. Atmosfer Venus yang kaya karbon dioksida memerangkap panas melalui efek rumah kaca."
      ],
      correctIndex: 3,
      explanation: "Meskipun Merkurius lebih dekat ke Matahari, Venus justru lebih panas karena atmosfernya yang didominasi karbon dioksida (>96%) menciptakan efek rumah kaca ekstrem yang memerangkap panas."
    },
    {
      id: 21,
      question: "Planet yang memiliki arah rotasi menyamping sehingga sumbu rotasinya sangat miring adalah ....",
      options: [
        "a. Uranus",
        "b. Jupiter",
        "c. Mars",
        "d. Neptunus"
      ],
      correctIndex: 0,
      explanation: "Uranus memiliki sumbu rotasi yang miring hingga 98 derajat terhadap bidang orbitnya, sehingga planet ini tampak seperti menggelinding menyamping saat mengelilingi Matahari."
    },
    {
      id: 22,
      question: "Planet yang memiliki kala revolusi paling singkat, yaitu sekitar 88 hari, adalah ....",
      options: [
        "a. Venus",
        "b. Merkurius",
        "c. Bumi",
        "d. Mars"
      ],
      correctIndex: 1,
      explanation: "Merkurius memiliki kala revolusi paling singkat (88 hari) karena jaraknya paling dekat ke Matahari (sekitar 58 juta km) sehingga lintasan orbitnya lebih pendek dari planet lain."
    },
    {
      id: 23,
      question: "Planet yang memiliki warna biru kehijauan akibat keberadaan gas metana di atmosfernya adalah ....",
      options: [
        "a. Saturnus",
        "b. Jupiter",
        "c. Uranus",
        "d. Merkurius"
      ],
      correctIndex: 2,
      explanation: "Uranus tampak berwarna biru kehijauan karena gas metana di atmosfernya menyerap cahaya merah dari Matahari dan memantulkan cahaya biru-hijau. Neptunus juga berwarna biru karena alasan serupa."
    },
    {
      id: 24,
      question: "Peristiwa berputarnya planet pada porosnya sendiri disebut ....",
      options: [
        "a. Revolusi",
        "b. Rotasi",
        "c. Gravitasi",
        "d. Orbit"
      ],
      correctIndex: 1,
      explanation: "Rotasi adalah gerakan berputar benda langit pada porosnya sendiri. Contohnya Bumi berotasi selama 24 jam sehingga menyebabkan pergantian siang dan malam."
    },
    {
      id: 25,
      question: "Waktu yang dibutuhkan sebuah planet untuk menyelesaikan satu kali putaran pada porosnya disebut ....",
      options: [
        "a. Kala revolusi",
        "b. Kala rotasi",
        "c. Periode orbit",
        "d. Tahun kabisat"
      ],
      correctIndex: 1,
      explanation: "Kala rotasi adalah waktu yang diperlukan suatu planet untuk melakukan satu putaran penuh pada porosnya. Kala rotasi Bumi adalah sekitar 24 jam atau satu hari."
    },
    {
      id: 26,
      question: "Gerakan planet mengelilingi Matahari pada lintasan orbitnya disebut ....",
      options: [
        "a. Rotasi",
        "b. Gravitasi",
        "c. Revolusi",
        "d. Evolusi"
      ],
      correctIndex: 2,
      explanation: "Revolusi adalah gerakan planet mengelilingi Matahari pada lintasan orbitnya. Waktu yang dibutuhkan Bumi untuk satu kali revolusi adalah 365,25 hari atau satu tahun."
    },
    {
      id: 27,
      question: "Akibat dari gerakan revolusi Bumi mengelilingi Matahari bersama kemiringan sumbu Bumi adalah ....",
      options: [
        "a. Terjadinya pergantian musim",
        "b. Terjadinya siang dan malam",
        "c. Terjadinya gerhana Bulan setiap hari",
        "d. Perubahan bentuk permukaan Bumi"
      ],
      correctIndex: 0,
      explanation: "Revolusi Bumi dikombinasikan dengan kemiringan sumbu Bumi sebesar 23,5 derajat menyebabkan terjadinya empat musim (semi, panas, gugur, dingin) di belahan Bumi utara dan selatan."
    },
    {
      id: 28,
      question: "Mengapa planet-planet tetap bergerak mengelilingi Matahari pada orbitnya?",
      options: [
        "a. Karena planet menghasilkan cahaya sendiri.",
        "b. Karena adanya gaya gravitasi Matahari yang memengaruhi gerak planet.",
        "c. Karena planet tidak memiliki massa.",
        "d. Karena planet selalu bergerak menjauhi Matahari."
      ],
      correctIndex: 1,
      explanation: "Gaya gravitasi Matahari yang sangat besar menarik planet-planet dan mempertahankan mereka tetap pada lintasan orbitnya. Tanpa gravitasi Matahari, planet-planet akan bergerak lurus keluar dari tata surya."
    },
    {
      id: 29,
      question: "Matahari disebut sebagai bintang karena ....",
      options: [
        "a. Mengelilingi planet-planet",
        "b. Memiliki permukaan berbatu",
        "c. Dapat memancarkan cahaya dan energinya sendiri",
        "d. Tidak memiliki gaya gravitasi"
      ],
      correctIndex: 2,
      explanation: "Matahari disebut bintang karena mampu memancarkan cahaya dan energi panas dari dirinya sendiri melalui reaksi fusi nuklir hidrogen menjadi helium di intinya yang bersuhu 15 juta derajat Celsius."
    },
    {
      id: 30,
      question: "Perhatikan pernyataan berikut!\n1) Matahari merupakan pusat tata surya.\n2) Planet bergerak mengelilingi Matahari.\n3) Bulan merupakan sumber cahaya utama bagi tata surya.\n4) Setiap planet memiliki jumlah satelit yang sama.\nPernyataan yang benar ditunjukkan oleh nomor ....",
      options: [
        "a. 1 dan 2",
        "b. 1 dan 3",
        "c. 2 dan 4",
        "d. 3 dan 4"
      ],
      correctIndex: 0,
      explanation: "Pernyataan 1 (Matahari sebagai pusat tata surya) dan 2 (planet mengelilingi Matahari) adalah benar. Pernyataan 3 salah karena Bulan hanya memantulkan cahaya Matahari. Pernyataan 4 salah karena setiap planet memiliki jumlah satelit yang berbeda."
    }
  ]
};

// Global export
window.PLANET_DATA = PLANET_DATA;
