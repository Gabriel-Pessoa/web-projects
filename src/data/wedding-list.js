const weddingList = [
    {
        id: 1,
        image_url: "https://www.casasbahia-imagens.com.br/Eletroportateis/EspremedoresdeFrutas/410915/5463688/extrator-de-frutas-mondial-premium-turbo-e-10-250w-bivolt-preto-410915.jpg",
        name: 'Espremedor de Fruta Mondial',
        quota: 0, // Não mexer
        qtdQuota: 1,
        fullAmount: 130.00,
        finalPrice: 0
    },
    {
        id: 2,
        image_url: "https://a-static.mlcdn.com.br/618x463/ferro-de-passar-roupa-a-vapor-e-a-seco-black-decker-fx3060-branco-e-azul/magazineluiza/021934300/0532cae4566f57400738f59ceccca9d0.jpg",
        name: 'Ferro de Passar Roupa a Seco e a Vapor Black+Decker',
        quota: 0,
        qtdQuota: 1,
        fullAmount: 119.00,
        finalPrice: 0
    },
    {
        id: 3,
        image_url: "https://www.casasbahia-imagens.com.br/Eletroportateis/LiquidificadoreseAcessorios/Liquidificadores/3230331/45383912/liquidificador-mondial-eletronic-filter-premium-com-10-velocidades-funcao-pulsar-e-filtro-700w-l-66-inox-pret-3230331.jpg",
        name: 'Liquidificador Eletronic Mondial',
        quota: 0,
        qtdQuota: 1, // ytallo define
        fullAmount: 109.90, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 4,
        image_url: "https://www.casasbahia-imagens.com.br/Eletroportateis/GrilleSanduicheiras/sanduicheiragrill/195967/4161317/sanduicheira-e-grill-mondial-premium-s-07-195967.jpg",
        name: 'Sanduicheira e Grill Mondial',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 98.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 5,
        image_url: "https://www.casasbahia-imagens.com.br/Eletroportateis/Torradeiras/50001131/1145955314/torradeira-easyline-tmb21-electrolux-com-6-niveis-de-tostagem-preto-50001131.jpg",
        name: 'Torradeira Electrolux',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 129.90, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 6,
        image_url: "https://a-static.mlcdn.com.br/618x463/grill-mondial-premium-g-03-2-em-1-redondo-1200w/magazineluiza/020805300/cda8d57e13e5a35036e2d19a03ece209.jpg",
        name: 'Grill Mondial Premium',
        quota: 0, // Não mexer
        qtdQuota: 2, // ytallo define
        fullAmount: 210.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 7,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/item/121171/0/121171009SZ.jpg",
        name: 'Ventilador Turbo Action',
        quota: 0, // Não mexer
        qtdQuota: 2, // ytallo define
        fullAmount: 249.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    }
    ,
    {
        id: 8,
        image_url: "https://www.extra-imagens.com.br/UtilidadesDomesticas/Panelas/PanelasdePressao/431476/4590323/panela-de-pressao-76l-rochedo-turbo-top-com-fechamento-externo-em-aluminio-polido-e-tecnologia-turbo-maior-economia-431476.jpg",
        name: 'Panela de Pressão 7,6L Rochedo',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 189.90, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 9,
        image_url: "http://philco.vteximg.com.br/arquivos/ids/176122/Fritadeira-Air-Fry-Oven-PFR2000P-vista1_053801045.jpg?v=637124397961530000",
        name: 'Fritadeira Philco 2 em 1 Air Fry',
        quota: 0, // Não mexer
        qtdQuota: 3, // ytallo define
        fullAmount: 729.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 10,
        image_url: "https://a-static.mlcdn.com.br/618x463/faqueiro-inox-malibu-85-pecas-tramontina/efacil/3021458/6e6269b30ea412f844b31ddf8c9ded12.jpg",
        name: 'Faqueiro Inox Malibu',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 150.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 11,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/img/1677373/5/1677373546_1SZ.jpg",
        name: 'Kit 7 Utensílios de Silicone',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 150.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 12,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/img/1513970/0/1513970045_1SZ.jpg",
        name: 'Garrafa Térmica Inox Lúmina 1.8L ',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 95.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 13,
        image_url: "https://dular.vteximg.com.br/arquivos/ids/4676388-1000-1000/image-b14128b976f5442a866bd1a12803dd8f.jpg?v=637213618939200000",
        name: 'CONJUNTO DE CAFÉ 3 PEÇAS - SOLEIL',
        quota: 0, // Não mexer
        qtdQuota: 2, // ytallo define
        fullAmount: 260.90, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 14,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/img7/01/00/item/125908/9/125908952SZ.jpg",
        name: 'Forno Tostador Oster',
        quota: 0, // Não mexer
        qtdQuota: 2, // ytallo define
        fullAmount: 229.99, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 15,
        image_url: "https://www.extra-imagens.com.br/UtilidadesDomesticas/lavanderiaebanheiro/tabuadepassar/31415/242821720/tabua-de-passar-tramontina-classic-dobravel-31415.jpg",
        name: 'Tábua de Passar Roupa',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 75.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 16,
        image_url: "https://www.casasbahia-imagens.com.br/Eletrodomesticos/LavadorasLavaeSeca/50005021/1178632895/lava-e-seca-lg-vivace-vc4-com-inteligencia-artificial-ai-dd-cv5011ts4-aco-escovado-11kg-7kg-50005020.jpg",
        name: 'Lava e Seca LG Vivace VC4',
        quota: 0, // Não mexer
        qtdQuota: 5, // ytallo define
        fullAmount: 3599.10, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 17,
        image_url: "https://a-static.mlcdn.com.br/618x463/ar-condicionado-split-samsung-digital-inverter-9-000-btu-h-frio/friopecas/115134/3e10360d4526ce9dc569c60f0b542082.jpg",
        name: 'Ar Condicionado Split Samsung ',
        quota: 0, // Não mexer
        qtdQuota: 3, // ytallo define
        fullAmount: 1439.34, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 18,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/img/26947/9/26947999_1SZ.jpg",
        name: 'Jogo de Talheres Tramontina',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 89.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 19,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/img/102637/7/102637724_1SZ.jpg",
        name: 'Jogo de Taças para Vinho em Vidro',
        quota: 0, // Não mexer
        qtdQuota: 1, // ytallo define
        fullAmount: 110.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 20,
        image_url: "https://images-americanas.b2w.io/produtos/01/00/img/134524/2/134524264_1SZ.jpg",
        name: 'Jogo de Panelas Antiaderente Poá ',
        quota: 0, // Não mexer
        qtdQuota: 2, // ytallo define
        fullAmount: 249.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 21,
        image_url: "https://staticmobly.akamaized.net/p/Imcal-Rack-Classic-II-3-GV-Off-White-com-FreijC3B3-Touch-218-cm-0796-030445-1-zoom.jpg",
        name: 'Rack Classic II 3 GV Off White  ',
        quota: 0, // Não mexer
        qtdQuota: 3, // ytallo define
        fullAmount: 710.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 22,
        image_url: "https://www.casasbahia-imagens.com.br/tv-video/Televisores/TV4K/55006494/1305222913/smart-tv-led-50-uhd-4k-samsung-50tu8000-crystal-uhd-borda-infinita-alexa-built-in-visual-livre-de-cabos-modo-ambiente-foto-controle-unico-2020-55006494.jpg",
        name: 'Smart TV LED 50" UHD 4K Samsung ',
        quota: 0, // Não mexer
        qtdQuota: 5, // ytallo define
        fullAmount: 2549.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 23,
        image_url: "https://i2marabraz-a.akamaihd.net/1800x1800/59/00196470002__1_A_ND.jpg",
        name: 'GUARDA-ROUPA CASAL 3 PORTAS C/ ESPELHO',
        quota: 0, // Não mexer
        qtdQuota: 3, // ytallo define
        fullAmount: 1539.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 24,
        image_url: "https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/3541e153ef6ead3044d72626c3847968/j/o/jogo-de-cama-queen-percal-100--algodao-12622818_foto1_frontal.jpg",
        name: 'Jogo de Cama Percal 100% Algodão',
        quota: 0, // Não mexer
        qtdQuota: 2, // ytallo define
        fullAmount: 180.00, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    },
    {
        id: 25,
        image_url: "//images.madeiramadeira.com.br/product/images/42875391-sofa-retratil-e-reclinavel-com-molas-ensacadas-cama-inbox-gold-2-32m-tecido-suede-velusoft-7908277212467-1_zoom-600x600.jpg",
        name: 'Sofá Retrátil e Reclinável ',
        quota: 0, // Não mexer
        qtdQuota: 3, // ytallo define
        fullAmount: 1899.90, // o valor total do produto (Ytallo define)
        finalPrice: 0 // Não mexer
    }
    
];

module.exports = weddingList;


