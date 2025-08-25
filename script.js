// Dados das empresas sustentáveis brasileiras
const companies = [
    {
        name: "Natura",
        category: "bcorp",
        description: "Empresa de cosméticos com foco em sustentabilidade e comércio justo.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjtu2nsQfzDztGbA_YnCSKth_yLFod9VoUTAEttFB-UNFu6EGP5Rucflhn&s=10",
        link: "https://www.natura.com.br",
        certified: true
    },
    {
        name: "O Boticário",
        category: "bcorp",
        description: "Empresa de cosméticos com iniciativas de reciclagem e redução de impacto ambiental.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQfq11C93mHEVHRJzbp0IaJBEPmN36YLeEw&usqp=CAU",
        link: "https://www.boticario.com.br",
        certified: true
    },
    {
        name: "Cemig",
        category: "energia",
        description: "Companhia Energética de Minas Gerais, com investimentos em energias renováveis.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGY-LliYphkkCa5F9TUuWfdvAgnmQBTZCiPAibZXI9TVWpBFuiHliCs0&s=10",
        link: "https://www.cemig.com.br",
        certified: true
    },
    {
        name: "Fazenda Futuro",
        category: "alimentos",
        description: "Startup de alimentos plant-based com foco em sustentabilidade.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-STlpr_Jb3XDqvr0wWgN7jm_DkUFLQQhTQIIlv-gF_2ZaXIfIc6a7JwBf&s=10&",
        link: "https://fazendafuturo.io",
        certified: true
    },
    {
        name: "Malwee",
        category: "moda",
        description: "Marca de moda com iniciativas de sustentabilidade e reaproveitamento de materiais.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89GFzfEPChn4GuIG0zx6RdmwuYaJZ2Y7gctWvRFtuuCd1H9RlJt7fqik&s=10",
        link: "https://www.malwee.com.br",
        certified: true
    },
    {
        name: "Braskem",
        category: "bcorp",
        description: "Empresa de químicos e plásticos com foco em soluções sustentáveis.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5uY8V5S19N9NUY7vrC7CdptDhQrb9UFXFhoI1GMYQfy_Z2IIKhIMMzdp&s=10",
        link: "https://www.braskem.com.br",
        certified: true
    },
    {
        name: "Cacau Show",
        category: "alimentos",
        description: "Empresa de chocolates com iniciativas de sustentabilidade na cadeia produtiva.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_Cacau_Show.png",
        link: "https://www.cacaushow.com.br",
        certified: false
    },
    {
        name: "Renova Energia",
        category: "energia",
        description: "Empresa especializada em energia renovável, principalmente eólica e solar.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        link: "https://www.renovaenergia.com.br",
        certified: true
    }
];

// Inicialização quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar relógio de Brasília
    updateBrasiliaTime();
    setInterval(updateBrasiliaTime, 1000);
    
    // Carregar empresas
    renderCompanies('all');
    
    // Configurar filtros de empresas
    setupCompanyFilters();
    
    // Configurar calculadora
    setupCalculator();
    
    // Inicializar mapa
    initMap();
    
    // Configurar menu mobile
    setupMobileMenu();
});

// Atualizar relógio de Brasília
function updateBrasiliaTime() {
    const options = { 
        timeZone: 'America/Sao_Paulo', 
        hour12: false, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    const parts = formatter.formatToParts(new Date());
    
    let date = {}, time = {};
    for (const part of parts) {
        if (part.type === 'year') date.year = part.value;
        if (part.type === 'month') date.month = part.value;
        if (part.type === 'day') date.day = part.value;
        if (part.type === 'hour') time.hour = part.value;
        if (part.type === 'minute') time.minute = part.value;
        if (part.type === 'second') time.second = part.value;
    }
    
    const clockElement = document.getElementById('brasilia-clock');
    clockElement.innerHTML = `
        <div>${time.hour}:${time.minute}:${time.second}</div>
        <div style="font-size: 1rem; margin-top: 0.5rem;">${date.day}/${date.month}/${date.year}</div>
    `;
}

// Renderizar empresas com base no filtro
function renderCompanies(filter) {
    const companiesGrid = document.querySelector('.companies-grid');
    companiesGrid.innerHTML = '';
    
    const filteredCompanies = filter === 'all' 
        ? companies 
        : companies.filter(company => company.category === filter);
    
    filteredCompanies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.className = 'company-card';
        companyCard.innerHTML = `
            <div class="company-image">
                <img src="${company.image}" alt="${company.name}">
            </div>
            <div class="company-info">
                <h3>${company.name}</h3>
                <p>${company.description}</p>
                ${company.certified ? '<span class="certified-badge">Certificada</span>' : ''}
                <a href="${company.link}" target="_blank" class="company-link">Visitar Site</a>
            </div>
        `;
        companiesGrid.appendChild(companyCard);
    });
}

// Configurar filtros de empresas
function setupCompanyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar empresas
            const filter = this.getAttribute('data-filter');
            renderCompanies(filter);
        });
    });
}

// Configurar calculadora de investimentos
function setupCalculator() {
    const investmentSlider = document.getElementById('investment');
    const investmentValue = document.getElementById('investment-value');
    const periodSlider = document.getElementById('period');
    const periodValue = document.getElementById('period-value');
    const returnSlider = document.getElementById('return');
    const returnValue = document.getElementById('return-value');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Atualizar valores exibidos
    investmentSlider.addEventListener('input', function() {
        investmentValue.textContent = formatCurrency(this.value);
    });
    
    periodSlider.addEventListener('input', function() {
        periodValue.textContent = `${this.value} anos`;
    });
    
    returnSlider.addEventListener('input', function() {
        returnValue.textContent = `${this.value}%`;
    });
    
    // Calcular investimento
    calculateBtn.addEventListener('click', calculateInvestment);
    
    // Calcular inicialmente
    calculateInvestment();
}

// Calcular resultado do investimento
function calculateInvestment() {
    const investment = parseFloat(document.getElementById('investment').value);
    const period = parseInt(document.getElementById('period').value);
    const returnRate = parseFloat(document.getElementById('return').value) / 100;
    
    // Cálculo de juros compostos
    const finalAmount = investment * Math.pow(1 + returnRate, period);
    const returnAmount = finalAmount - investment;
    
    // Estimativa de impacto ambiental (exemplo: toneladas de CO2 evitadas)
    const environmentalImpact = (investment / 1000) * period * 0.5;
    
    // Atualizar resultados
    document.getElementById('invested-amount').textContent = formatCurrency(investment);
    document.getElementById('final-amount').textContent = formatCurrency(finalAmount);
    document.getElementById('return-amount').textContent = formatCurrency(returnAmount);
    document.getElementById('environmental-impact').textContent = `${environmentalImpact.toFixed(2)} ton CO₂ evitadas`;
}

// Formatador de moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Inicializar mapa
// Substitua a função initMap por esta versão atualizada
function initMap() {
    // Coordenadas iniciais (Brasília)
    const initialCoords = [-15.7942, -47.8822];
    
    // Criar mapa
    const map = L.map('map-container').setView(initialCoords, 13);
    
    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Adicionar camada de satélite (opcional)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
    
    // Adicionar camada de controle
    const baseMaps = {
        "Mapa": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}/.png'),
        "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
    };
    L.control.layers(baseMaps).addTo(map);
    
    // Configurar busca no mapa
    const searchInput = document.getElementById('map-search-input');
    const searchButton = document.getElementById('map-search-btn');
    
    // Função para buscar empresas sustentáveis
    function searchSustainableBusinesses(lat, lng, radius = 5000) {
        // Limpar marcadores anteriores
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        
        // Categorias de negócios sustentáveis para buscar
        const sustainableCategories = [
            'organic', 'farm', 'health_food', 'vegan', 'vegetarian',
            'recycling', 'second_hand', 'fair_trade', 'environmental',
            'solar', 'wind', 'renewable_energy', 'bicycle'
        ];
        
        // Buscar para cada categoria
        sustainableCategories.forEach(category => {
            const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${lat},${lng})["shop"]["organic"="yes"];out;`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.elements && data.elements.length > 0) {
                        data.elements.forEach(element => {
                            if (element.tags && element.tags.name) {
                                const marker = L.marker([element.lat, element.lon])
                                    .addTo(map)
                                    .bindPopup(`
                                        <strong>${element.tags.name}</strong><br>
                                        ${element.tags['addr:street'] || ''} ${element.tags['addr:housenumber'] || ''}<br>
                                        ${element.tags['addr:city'] || ''}<br>
                                        <i>${element.tags.shop || 'Estabelecimento'} orgânico/sustentável</i>
                                    `);
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar estabelecimentos:', error);
                });
        });
        
        // Buscar feiras orgânicas e mercados sustentáveis
        const organicQuery = `[out:json];node(around:${radius},${lat},${lng})["organic"="yes"];out;`;
        fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(organicQuery)}`)
            .then(response => response.json())
            .then(data => {
                if (data.elements && data.elements.length > 0) {
                    data.elements.forEach(element => {
                        if (element.tags && element.tags.name) {
                            const marker = L.marker([element.lat, element.lon])
                                .addTo(map)
                                .bindPopup(`
                                    <strong>${element.tags.name}</strong><br>
                                    ${element.tags['addr:street'] || ''} ${element.tags['addr:housenumber'] || ''}<br>
                                    ${element.tags['addr:city'] || ''}<br>
                                    <i>Estabelecimento orgânico/sustentável</i>
                                `);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao buscar estabelecimentos orgânicos:', error);
            });
    }
    
    // Buscar empresas sustentáveis na localização inicial (Brasília)
    searchSustainableBusinesses(initialCoords[0], initialCoords[1]);
    
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchLocation(query, map);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchLocation(query, map);
            }
        }
    });
    
    // Adicionar botão para buscar empresas sustentáveis na área visível do mapa
    const searchVisibleButton = L.control({position: 'topright'});
    searchVisibleButton.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'search-visible-button');
        div.innerHTML = '<button>Buscar sustentáveis aqui</button>';
        div.onclick = function() {
            const bounds = map.getBounds();
            const center = bounds.getCenter();
            const radius = Math.min(5000, center.distanceTo(bounds.getNorthEast()));
            searchSustainableBusinesses(center.lat, center.lng, radius);
        };
        return div;
    };
    searchVisibleButton.addTo(map);
}

// Atualizar a função searchLocation para também buscar empresas sustentáveis
function searchLocation(query, map) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);
                
                // Atualizar visualização do mapa
                map.setView([lat, lon], 13);
                
                // Buscar empresas sustentáveis na área
                searchSustainableBusinesses(lat, lon);
                
                // Adicionar marcador
                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(result.display_name)
                    .openPopup();
            } else {
                alert('Localização não encontrada. Tente outro termo de busca.');
            }
        })
        .catch(error => {
            console.error('Erro na busca de localização:', error);
            alert('Erro ao buscar localização. Tente novamente.');
        });
}

// Configurar menu mobile
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}