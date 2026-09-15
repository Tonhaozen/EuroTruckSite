/**
 * company-data.js
 * Dados centralizados da Eurotruck — Implementos Rodoviários
 * Fonte: escaneamento do site atual (eurotruck.ind.br)
 *
 * Como usar:
 *   <script src="js/company-data.js" defer></script>
 *   Acesse via window.EUROTRUCK ou desestruture: const { company, services } = EUROTRUCK;
 */

const EUROTRUCK = {

  /* ─── IDENTIDADE ─────────────────────────────────────────── */
  company: {
    name:        "Eurotruck",
    fullName:    "Eurotruck — Implementos Rodoviários",
    founded:     2004,
    description: "Fabricação, transformação e locação de unidades móveis para todo o Brasil.",
    tagline:     "Uma empresa inovadora no segmento de unidades móveis, oferecendo soluções inteligentes para o seu negócio.",
    about:
      "Surgimos em 2004, primeiramente no segmento de unidades móveis, e nos desenvolvemos " +
      "ao longo destes anos como uma empresa referência em qualidade e inovação. Nossa equipe " +
      "é formada por profissionais capacitados a atender às mais diversas demandas, entregando " +
      "unidades móveis voltadas a diferentes finalidades, como realização de eventos, instalações " +
      "em feiras, unidades médicas, salas de treinamento, food trucks, entre outros.",
  },

  /* ─── CONTATO ─────────────────────────────────────────────── */
  contact: {
    email:     "comercial@eurotruck.ind.br",
    phone:     "(41) 3656-6193",
    phoneTel:  "tel:4136566193",       // para href em <a>
    address: {
      street:  "Rod. Antonio Gasparin, 5800",
      district:"Bacaetava",
      city:    "Colombo",
      state:   "PR",
      full:    "Rod. Antonio Gasparin, 5800 — Bacaetava, Colombo, PR",
      mapsUrl: "https://www.google.com/maps/place/Rod.+Antonio+Gasparin,+5800+-+Bacaetava,+Colombo+-+PR",
    },
  },

  /* ─── REDES SOCIAIS ────────────────────────────────────────── */
  social: [
    { name: "Facebook",  url: "#", label: "Eurotruck no Facebook"  },
    { name: "Instagram", url: "#", label: "Eurotruck no Instagram" },
  ],

  /* ─── SERVIÇOS / CATEGORIAS ────────────────────────────────── */
  services: [
    {
      id:          "unidade-movel",
      title:       "Unidade Móvel",
      description:
        "Com uma equipe de engenheiros focada em inovação e sustentabilidade, a Eurotruck " +
        "fabrica unidades móveis versáteis e altamente tecnológicas, transformando veículos " +
        "como trailers, caminhões, semirreboques e vans em unidades exclusivas de diversos setores.",
      url:         "/unidade-movel/",
    },
    {
      id:          "castramovel",
      title:       "Castramóvel",
      description:
        "Trailer veterinário utilizado para castração de animais de pequeno porte, levando " +
        "o serviço diretamente às comunidades que precisam.",
      url:         "/castramovel/",
    },
    {
      id:          "motorhome-cavalos",
      title:       "Motorhome Cavalos",
      description:
        "Veículos especializados para transporte equino integrados a motor home, " +
        "combinando funcionalidade e conforto para cavaleiros e animais.",
      url:         "/motorhome-cavalos/",
    },
    {
      id:          "foodtrucks",
      title:       "Foodtrucks",
      description:
        "Restaurantes sobre rodas instalados em locais de grande potencial, como praças, " +
        "parques, universidades e pontos turísticos, com praticidade e criatividade gastronômica.",
      url:         "/foodtrucks/",
    },
    {
      id:          "camarim-movel",
      title:       "Camarim Móvel",
      description:
        "Veículos amplos e bem estruturados usados como instrumento de mobile marketing " +
        "e gravações. Comodidade e rapidez para ações comerciais ou institucionais em qualquer lugar.",
      url:         "/camarim-movel/",
    },
  ],

  /* ─── DIFERENCIAIS ─────────────────────────────────────────── */
  differentials: [
    {
      id:          "qualidade",
      title:       "Qualidade",
      description:
        "Da matéria-prima ao acabamento, garantimos a utilização de materiais da melhor " +
        "qualidade disponível no mercado, entregando projetos eficazes e duradouros.",
    },
    {
      id:          "personalizacao",
      title:       "Personalização",
      description:
        "Projetos personalizados junto ao cliente para que representem o negócio com " +
        "fidelidade, sendo imediatamente identificados pelo público.",
    },
    {
      id:          "inovacao",
      title:       "Inovação",
      description:
        "Estamos sempre desenvolvendo novas propostas e alimentando novas ideias, " +
        "com as ferramentas necessárias para fazer a inovação acontecer.",
    },
    {
      id:          "sem-fronteiras",
      title:       "Sem Fronteiras",
      description:
        "Com sede no Paraná, a Eurotruck atende do mesmo modo em todo o território " +
        "nacional e está sempre pronta para novos desafios.",
    },
  ],

  /* ─── CLIENTES / PROJETOS ──────────────────────────────────── */
  clients: [
    { name: "Volvo"                              },
    { name: "Eckisil"                            },
    { name: "Bunge (Escola Móvel)"               },
    { name: "Branco"                             },
    { name: "Caixa"                              },
    { name: "SESC PR (Unidade Odontológica)"     },
    { name: "Guarda Municipal de São José dos Pinhais" },
    { name: "Defensoria Pública do Estado de Alagoas" },
    { name: "Prefeitura de Tibagi (Castramóvel)" },
    { name: "Food Truck El Negro"                },
    { name: "Food Truck Brahma Brasil"           },
    { name: "Food Truck Del Valle"               },
    { name: "Cabanha Solo Fino"                  },
  ],

  /* ─── SEO / META ───────────────────────────────────────────── */
  seo: {
    titleTemplate: "%s | Eurotruck — Implementos Rodoviários",
    defaultTitle:  "Eurotruck — Implementos Rodoviários",
    description:
      "Trabalhamos com fabricação, transformação e locação de unidades móveis para " +
      "todo o Brasil desde 2004. Conheça a Eurotruck.",
    keywords:
      "unidade móvel, implementos rodoviários, food truck, castramóvel, camarim móvel, " +
      "motorhome cavalos, Colombo PR, Paraná",
    locale:   "pt_BR",
    siteUrl:  "https://www.eurotruck.ind.br",
  },

};

// Exporta para uso em módulos ES (Next.js, Vite, etc.)
// Comente a linha abaixo se usar só com <script> simples
// export default EUROTRUCK;
