export interface MissionContract {
  id: string;
  name: string;
  codename: string;
  badge: string;
  category: 'AI/ML & Ethics' | 'Multi-Agent Ocean AI' | 'Autonomous Agents' | 'Travel Tech' | 'Defense & Geospatial';
  shortDesc: string;
  liveUrl: string;
  githubUrl?: string;
  tags: string[];
  status: string;
  securityClearance: 'PUBLIC ACCESS' | 'TOP SECRET' | 'RESTRICTED';
  accentColor: string;
  glowColor: string;
  // 13-Point Architectural Case Study Schema
  problemStatement: string;
  intendedUsers: string;
  goalsAndConstraints: string;
  roleAndContribution: string;
  architectureDataFlow: string;
  techChoicesAndRationale: { tech: string; rationale: string }[];
  mainFeatures: string[];
  designDecisions: string;
  challengesAndSolutions: { challenge: string; solution: string }[];
  testingAndValidation: string;
  evidenceBackedResults: string[];
  futureImprovements: string;
}

export interface CyberdeckSkill {
  id: string;
  code: string;
  name: string;
  domain: 'AI/ML & Agents' | 'Programming Languages' | 'Frontend Engineering' | 'Backend Systems' | 'Databases & Spatial' | 'Tools & Infra';
  proficiency: 'Experienced With' | 'Working Knowledge' | 'Currently Learning';
  levelTier: 'CORE CHROME' | 'HIGH PROTOCOL' | 'SYNAPTIC EXPERIMENT';
  accentColor: string;
  description: string;
  evidenceProject: string;
  iconName: string;
}

export interface ChronicleNode {
  id: string;
  period: string;
  title: string;
  subheading: string;
  category: 'FOUNDATIONS' | 'FULL-STACK' | 'HACKATHONS' | 'GLOBAL HONOR' | 'CURRENT FOCUS';
  summary: string;
  details: string;
  tags: string[];
  verifiedProof: string;
  accentColor: string;
}

export interface ReputationEntry {
  id: string;
  title: string;
  subtitle: string;
  classification: 'Global Finalist (Competition)' | 'Hackathon Award' | 'Collegiate Selection' | 'Student Leadership' | 'Club Technical Member' | 'Student Chapter Member' | 'Student Project Member' | 'Virtual Internship & Coursework';
  tier: 'LEGENDARY' | 'HIGH HONOR' | 'LEADERSHIP' | 'ENGINEER' | 'CREDENTIAL';
  organization: string;
  year: string;
  verificationDetails: string;
  projectLink?: string;
  accentColor: string;
}

export interface NeuralResearchQuest {
  id: string;
  title: string;
  type: 'VERIFIED MILESTONE' | 'ACTIVE LAB RESEARCH';
  description: string;
  status: 'Deployed Demo' | 'Active Development' | 'Research Prototype' | 'Experimental' | 'Archived';
  date?: string;
  evidenceText?: string;
  evidenceUrl?: string;
  verificationBadge: string;
}

export const OPERATOR_PROFILE = {
  name: 'Om Vyas',
  handle: '@DevWithOm',
  netrunnerHandle: 'V_OM_21',
  role: 'AI/ML Engineer // Systems Builder // Full-Stack Developer',
  education: 'B.Tech CSE (Artificial Intelligence & Machine Learning), 2nd Year',
  institution: 'MIT Academy of Engineering, Pune',
  tagline: 'Building real-world AI systems, full-stack platforms, and multi-agent solutions at the edge of technology.',
  osVersion: 'PORTFOLIO_OS v2.0 // NIGHT_CITY_NET',
  avatarImage: '/assets/cyber_netrunner_avatar.svg',
  kpis: [
    { label: 'Major Honors', value: '3' },
    { label: 'Flagship Projects', value: '6' },
    { label: 'Reputation Archive', value: '7' },
    { label: 'Google SC (Global)', value: 'Top 106' }
  ],
  links: {
    github: 'https://github.com/DevWithOm',
    linkedin: 'https://www.linkedin.com/in/om-vyas-546b9a3a5',
    leetcode: 'https://leetcode.com/u/om_vyas_21',
    codechef: 'https://www.codechef.com/users/om_vyas_21',
    resume: 'https://drive.google.com/file/d/1brpMbX1RFPulYGVYMBrwezfXINYwC6V1/view?usp=sharing',
    email: 'mailto:vyasom2006@gmail.com'
  }
};

export const MISSION_CONTRACTS: MissionContract[] = [
  {
    id: 'fairlens',
    name: 'FairLens',
    codename: 'OP_FAIRLENS_ETHICS',
    badge: 'Top 106 Globally • Google Solution Challenge',
    category: 'AI/ML & Ethics',
    shortDesc: 'Automated AI bias detection and remediation platform with ensemble audits, demographic parity metrics, and Gemini-assisted compliance reporting.',
    liveUrl: 'https://fairlens-f1922.web.app',
    githubUrl: 'https://github.com/DevWithOm',
    tags: ['Gemini API', 'Ensemble ML', 'Fairness Metrics', 'FastAPI', 'React'],
    status: 'Flagship System • Top 106 Global Finalist',
    securityClearance: 'PUBLIC ACCESS',
    accentColor: '#FCEE0A',
    glowColor: 'rgba(252, 238, 10, 0.4)',
    problemStatement: 'Machine learning classifiers in credit underwriting, hiring screenings, and criminal justice risk scoring frequently encode historic systemic prejudices. Engineers lack accessible, automated tools to audit models for intersectional disparities across sensitive demographic attributes.',
    intendedUsers: 'ML Engineers, AI Ethics Auditors, Data Scientists, and Regulatory Compliance Officers.',
    goalsAndConstraints: 'Detect disparate impact and unequal opportunity across multi-class demographic subsets without requiring source training re-runs. Must handle sparse datasets without producing volatile small-sample statistical artifacts.',
    roleAndContribution: 'Co-architect and Frontend Lead. Engineered the FastAPI evaluation microservice, implemented demographic slice disparity metrics (TPR/FPR matrices), and designed the interactive React audit dashboard.',
    architectureDataFlow: 'User Upload (CSV/Model Probabilities) -> FastAPI Ingestion -> Slice Evaluator (TPR/FPR/Disparate Impact) -> Gemini 1.5 Pro Remediation Synthesizer -> Interactive React Dashboard.',
    techChoicesAndRationale: [
      { tech: 'FastAPI & Python', rationale: 'Vectorized evaluation with Pandas and Scikit-Learn for sub-second disparity calculation across thousands of records.' },
      { tech: 'React & Vite', rationale: 'Instant client-side state reactivity and dynamic visualization of demographic fairness curves.' },
      { tech: 'Google Gemini API', rationale: 'Automated synthesis of structured, plain-language executive compliance reports from numerical disparity tensors.' }
    ],
    mainFeatures: [
      'Multi-group Demographic Parity & Equalized Odds auditing',
      'Intersectional subgroup disparity matrix visualization',
      'Automated Gemini-assisted bias remediation roadmap',
      'One-click PDF/CSV executive compliance export'
    ],
    designDecisions: 'High-contrast signal status indicators to immediately flag non-compliant fairness thresholds (< 0.80 four-fifths rule).',
    challengesAndSolutions: [
      { challenge: 'Subgroup sample starvation in multi-attribute intersections.', solution: 'Implemented Wilson score interval confidence bounds to flag statistical uncertainty on small sample sizes.' },
      { challenge: 'Structuring dynamic LLM output into deterministic compliance advice.', solution: 'Engineered strict Pydantic JSON schemas enforced during Gemini function calling.' }
    ],
    testingAndValidation: 'Validated against standard benchmark fairness datasets (Adult Census Income, COMPAS recidivism) confirming exact parity with Fairlearn reference metrics.',
    evidenceBackedResults: [
      'Ranked in the Top 106 Globally out of 6,700+ worldwide teams in Google Solution Challenge 2026.',
      'Audits 10,000+ tabular records in under 1.2 seconds.'
    ],
    futureImprovements: 'Integration of adversarial debiasing layers directly within model inference pipelines.'
  },
  {
    id: 'nautilus',
    name: 'NautilusAI',
    codename: 'OP_NAUTILUS_SPATIAL',
    badge: '2nd Runner-up • Nirmaan 4.0 National Hackathon',
    category: 'Multi-Agent Ocean AI',
    shortDesc: 'Multi-agent ocean intelligence platform integrating LangGraph, Gemini, PostGIS spatial queries, ChromaDB and TimescaleDB.',
    liveUrl: 'https://nautilus-ai.vercel.app',
    githubUrl: 'https://github.com/DevWithOm',
    tags: ['LangGraph', 'Gemini', 'PostGIS', 'ChromaDB', 'TimescaleDB', 'FastAPI'],
    status: 'Award-Winning Build • 2nd Runner-up',
    securityClearance: 'PUBLIC ACCESS',
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    problemStatement: 'Marine researchers, port authorities, and coast guard operators struggle to cross-correlate disparate oceanic sensory feeds: real-time AIS vessel coordinates, bathymetric sonar readings, and unstructured oceanographic research papers.',
    intendedUsers: 'Maritime Intelligence Analysts, Marine Ecologists, and Port Logistics Teams.',
    goalsAndConstraints: 'Enable conversational queries over complex spatial-temporal oceanic databases with sub-2 second query resolution across PostGIS and ChromaDB.',
    roleAndContribution: 'Multi-Agent Systems Engineer. Designed the LangGraph agent coordination workflow, configured PostGIS spatial schema indexes for vessel trajectories, and integrated ChromaDB vector retrieval.',
    architectureDataFlow: 'User Natural Query -> LangGraph Supervisor Agent -> Specialized Query Routing: [PostGIS Spatial Worker | TimescaleDB Sensor Worker | ChromaDB Research Worker] -> Gemini Synthesis -> Reactive Mapbox/DeckGL Visualization.',
    techChoicesAndRationale: [
      { tech: 'LangGraph', rationale: 'Enables cyclical state machines with error recovery rather than brittle sequential chains.' },
      { tech: 'PostGIS', rationale: 'Industry-standard R-Tree spatial indexing for high-speed polygon, radius, and vessel trajectory queries.' },
      { tech: 'ChromaDB', rationale: 'Local vector storage for fast contextual retrieval of oceanographic research papers and bathymetric specs.' }
    ],
    mainFeatures: [
      'Multi-agent query decomposition into SQL and vector filters',
      'Real-time vessel trajectory tracking and bounding-box anomaly alerts',
      'Integrated maritime research knowledge base',
      'Interactive bathymetric depth gradient map layer'
    ],
    designDecisions: 'Dark oceanic aesthetic with tactical cyan accents to minimize eye strain during nocturnal surveillance simulations.',
    challengesAndSolutions: [
      { challenge: 'Ambiguous spatial language (e.g., "near Mumbai coast") failing in strict SQL.', solution: 'Pre-agent geocoding resolution pass translating colloquial coastline names into bounding-box coordinates.' },
      { challenge: 'State bloat across multi-turn agent iterations.', solution: 'Designed strict state trimming pruning historical raw tool returns before feeding back to supervisor.' }
    ],
    testingAndValidation: 'Evaluated on historical AIS vessel telemetry datasets with simulated anomalous trajectory deviations.',
    evidenceBackedResults: [
      'Awarded 2nd Runner-up at the Nirmaan 4.0 National Hackathon against top collegiate engineering teams.',
      'Demonstrated multi-database query synthesis across PostGIS, ChromaDB, and TimescaleDB.'
    ],
    futureImprovements: 'Offline maritime deployment using local quantized small language models (SLMs).'
  },
  {
    id: 'agentica',
    name: 'Agentica',
    codename: 'OP_AGENTICA_AUTONOMOUS',
    badge: 'Flagship Autonomous Runtime',
    category: 'Autonomous Agents',
    shortDesc: 'End-to-end autonomous agent workflow architecture engineered for intelligent tool introspection and robust synthesis loops.',
    liveUrl: 'https://agentica-two.vercel.app',
    githubUrl: 'https://github.com/DevWithOm',
    tags: ['Autonomous AI', 'React', 'Tool Use', 'Modern Agentic Loop', 'Groq'],
    status: 'Active Flagship System • Production',
    securityClearance: 'PUBLIC ACCESS',
    accentColor: '#FF2E88',
    glowColor: 'rgba(255, 46, 136, 0.4)',
    problemStatement: 'Autonomous LLM agent scripts frequently encounter infinite loops, unhandled tool execution exceptions, and hallucinations when coordinating multi-step software tasks.',
    intendedUsers: 'Developers and researchers building reliable agentic loops and autonomous developer workflows.',
    goalsAndConstraints: 'Deterministic tool validation, structured JSON schema enforcement, and reactive client-side execution feedback under 100ms UI latency.',
    roleAndContribution: 'Sole Author and Lead Engineer. Engineered the entire frontend and agentic orchestration runtime.',
    architectureDataFlow: 'Task Prompt -> Agentic Loop Dispatcher -> Tool Argument Validator (Pydantic/Zod) -> Tool Execution Sandbox -> Memory State Update -> User Reflection.',
    techChoicesAndRationale: [
      { tech: 'React 19 & TypeScript', rationale: 'Absolute type safety across tool invocation contracts and immediate reactive state reflection.' },
      { tech: 'Groq & LPU Inference', rationale: 'Sub-second token throughput for low-latency decision loops during complex tool chaining.' }
    ],
    mainFeatures: [
      'Dynamic tool discovery and schema introspection',
      'Step-by-step execution timeline with rollback capability',
      'Deterministic loop guards preventing repetitive calls',
      'Interactive tool sandbox testing console'
    ],
    designDecisions: 'Terminal-inspired visual monitors with collapsible stack traces for transparent debugging.',
    challengesAndSolutions: [
      { challenge: 'Agent drifting into repetitive invalid tool calls.', solution: 'Added maximum repetition heuristic triggers that force a reflection prompt when identical parameters occur twice.' }
    ],
    testingAndValidation: 'Automated unit suites asserting tool argument sanitization against edge-case string payloads.',
    evidenceBackedResults: [
      'Om Vyas’s proudest end-to-end autonomous build, demonstrating robust tool-calling architecture.'
    ],
    futureImprovements: 'Multi-agent peer negotiation protocols and persistent vector scratchpads.'
  },
  {
    id: 'travelsphere',
    name: 'TravelSphere',
    codename: 'OP_TRAVELSPHERE_PLANNER',
    badge: 'Dynamic AI Itinerary Companion',
    category: 'Travel Tech',
    shortDesc: 'AI-driven dynamic itinerary generation and intelligent travel logistics companion with geocoded schedule clusters.',
    liveUrl: 'https://travelsphere-phi.vercel.app',
    githubUrl: 'https://github.com/DevWithOm',
    tags: ['Generative AI', 'React', 'Tailwind', 'Maps API', 'FastAPI'],
    status: 'Live Web Companion • Deployed',
    securityClearance: 'PUBLIC ACCESS',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    problemStatement: 'Planning multi-destination travel requires cross-referencing activity hours, geographical clusters, and personal budget constraints across disparate sites.',
    intendedUsers: 'Independent travelers, backpackers, and family vacation planners.',
    goalsAndConstraints: 'Generate geographically feasible, timed daily itineraries within 3 seconds with zero manual distance calculations.',
    roleAndContribution: 'Full-Stack Developer. Designed the frontend application, dynamic schedule boards, and prompt synthesis templates.',
    architectureDataFlow: 'Travel Preferences -> Prompt Synthesizer -> LLM Engine -> Structured JSON Daily Schedules -> Geocoded Schedule Board.',
    techChoicesAndRationale: [
      { tech: 'React & Tailwind', rationale: 'Rapid responsive layout assembly with fluid mobile drag-and-drop schedule cards.' },
      { tech: 'Maps API Geocoding', rationale: 'Translates itinerary destinations into coordinates for geographical transit clustering.' }
    ],
    mainFeatures: [
      'Budget-aware daily itinerary synthesis',
      'Proximity clustering minimizing transit fatigue',
      'Interactive schedule card reordering',
      'Offline-ready itinerary export'
    ],
    designDecisions: 'Clean, high-visibility schedule cards with clear time-budget badges and transit estimates.',
    challengesAndSolutions: [
      { challenge: 'Hallucinated travel times between distant attractions.', solution: 'Implemented bounding-box clustering to group attractions by district before scheduling.' }
    ],
    testingAndValidation: 'User-tested across 15 international travel scenarios with verified transit feasibility.',
    evidenceBackedResults: [
      'Live public deployment with fast client responsiveness.'
    ],
    futureImprovements: 'Integration with live transit APIs for real-time delay updates and weather warnings.'
  },
  {
    id: 'oceanembed',
    name: 'OceanEmbed-X',
    codename: 'OP_OCEANEMBED_GEOSPATIAL',
    badge: 'Smart India Hackathon (SIH 2026)',
    category: 'Defense & Geospatial',
    shortDesc: 'Geospatial and bathymetric ocean embedding models built for national maritime challenges.',
    liveUrl: 'https://ocean-embed-ten.vercel.app',
    githubUrl: 'https://github.com/DevWithOm',
    tags: ['Geospatial', 'SIH 2026', 'Data Pipelines', 'PostGIS'],
    status: 'SIH Internal Winner (SIH26066)',
    securityClearance: 'RESTRICTED',
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    problemStatement: 'National maritime agencies require efficient vector indexing and similarity retrieval across vast multidimensional bathymetric soundings and seabed sensor arrays.',
    intendedUsers: 'Defense Hydrographers and Oceanic Research Vessels.',
    goalsAndConstraints: 'Index multi-scale depth vectors for high-speed spatial similarity queries.',
    roleAndContribution: 'Core Team Developer. Designed the coordinate normalization pipelines and spatial vector ingestion scripts.',
    architectureDataFlow: 'Raw Bathymetric Coordinates -> Spatial Normalizer -> Dimensional Vector Embedding -> Vector Index.',
    techChoicesAndRationale: [
      { tech: 'Python & PostGIS', rationale: 'Mathematical coordinate transformations and spatial indexing.' }
    ],
    mainFeatures: [
      'Coordinate normalization preserving spatial topological continuity',
      'Multi-scale depth gradient representations'
    ],
    designDecisions: 'Minimalist data-pipeline console emphasizing ingestion throughput metrics.',
    challengesAndSolutions: [
      { challenge: 'Spatial distortion near latitude boundary extremes.', solution: 'Projected coordinate transformation using local UTM spatial reference systems.' }
    ],
    testingAndValidation: 'Validated against synthetic bathymetric grid points.',
    evidenceBackedResults: [
      'Selected as internal collegiate winner for problem statement SIH26066 at MIT Academy of Engineering.'
    ],
    futureImprovements: 'Hardware-accelerated GPU spatial indexing.'
  },
  {
    id: 'netra',
    name: 'NETRA',
    codename: 'OP_NETRA_SURVEILLANCE',
    badge: 'Smart India Hackathon (SIH 2026)',
    category: 'Defense & Geospatial',
    shortDesc: 'Edge surveillance and sensor parsing prototype with transparent implementation boundaries.',
    liveUrl: 'https://netra-ebon.vercel.app',
    githubUrl: 'https://github.com/DevWithOm',
    tags: ['Surveillance Prototype', 'Computer Vision', 'SIH 2026'],
    status: 'SIH Internal Winner Prototype (SIH26189)',
    securityClearance: 'TOP SECRET',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    problemStatement: 'Real-time sensor feed parsing and object bounding-box flagging for edge security operations.',
    intendedUsers: 'Edge surveillance operators and security research testbeds.',
    goalsAndConstraints: 'Lightweight frame ingestion and boundary alert generation on standard edge compute.',
    roleAndContribution: 'Pipeline Prototyping Developer. Built sensor ingestion scripts and video frame pre-processing routines.',
    architectureDataFlow: 'Camera Feed -> Frame Buffer -> Baseline CV Pre-processing -> Event Logger & Alert Dispatch.',
    techChoicesAndRationale: [
      { tech: 'Python & OpenCV', rationale: 'Lightweight baseline image manipulation and contour tracking.' }
    ],
    mainFeatures: [
      'Video stream ingestion and frame downsampling',
      'Motion delta bounding-box detection',
      'Event logging pipeline'
    ],
    designDecisions: 'High-contrast tactical alert console with explicit prototype status badges.',
    challengesAndSolutions: [
      { challenge: 'Transparent Boundary', solution: 'Graph link prediction and deep automated anomaly classifiers remain in prototype stage and are not claimed as production ready.' }
    ],
    testingAndValidation: 'Evaluated on prerecorded perimeter security video feeds.',
    evidenceBackedResults: [
      'Selected in MITAOE internal round for SIH26189.'
    ],
    futureImprovements: 'Edge TPU model quantization and robust night-vision filtering.'
  }
];

export const CYBERDECK_SKILLS: CyberdeckSkill[] = [
  // Programming Languages
  {
    id: 'skill-python',
    code: 'SEC_PY_01',
    name: 'Python',
    domain: 'Programming Languages',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#FCEE0A',
    description: 'Primary language for ML modeling, data pipelines, LangGraph agents, and FastAPI microservices.',
    evidenceProject: 'FairLens & NautilusAI',
    iconName: 'Terminal'
  },
  {
    id: 'skill-cpp',
    code: 'SEC_CPP_02',
    name: 'C++',
    domain: 'Programming Languages',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#00E5FF',
    description: 'High-speed algorithmic problem solving, STL, memory optimization, and competitive coding.',
    evidenceProject: 'LeetCode & CodeChef',
    iconName: 'Cpu'
  },
  {
    id: 'skill-java',
    code: 'SEC_JAVA_03',
    name: 'Java',
    domain: 'Programming Languages',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#FF2E88',
    description: 'Object-oriented application architecture, interface contracts, and core enterprise foundations.',
    evidenceProject: 'Academic Foundations',
    iconName: 'Code'
  },
  {
    id: 'skill-c',
    code: 'SEC_C_04',
    name: 'C',
    domain: 'Programming Languages',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#94A3B8',
    description: 'Low-level systems programming, pointer mechanics, manual memory, and computer architecture.',
    evidenceProject: 'Systems Coursework',
    iconName: 'Wrench'
  },

  // Frontend Engineering
  {
    id: 'skill-react',
    code: 'NET_REACT_05',
    name: 'React 19',
    domain: 'Frontend Engineering',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#00E5FF',
    description: 'Component-driven reactive interfaces, complex state management, custom hooks, and HUD dashboards.',
    evidenceProject: 'FairLens, NautilusAI & Agentica',
    iconName: 'Layout'
  },
  {
    id: 'skill-vite',
    code: 'NET_VITE_06',
    name: 'Vite',
    domain: 'Frontend Engineering',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#FCEE0A',
    description: 'Modern ESM development tooling, lightning-fast HMR, and optimized production chunk bundling.',
    evidenceProject: 'Cyberpunk Portfolio',
    iconName: 'Zap'
  },
  {
    id: 'skill-htmlcss',
    code: 'NET_CSS_07',
    name: 'HTML5 & Modern CSS',
    domain: 'Frontend Engineering',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#10B981',
    description: 'Responsive layouts, Tailwind CSS utility styling, chamfered geometry, and canvas integration.',
    evidenceProject: 'All Web Builds',
    iconName: 'Palette'
  },

  // Backend Systems
  {
    id: 'skill-fastapi',
    code: 'SRV_FASTAPI_08',
    name: 'FastAPI',
    domain: 'Backend Systems',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#10B981',
    description: 'High-throughput async Python backends, Pydantic type validation, and OpenAPI documentation.',
    evidenceProject: 'FairLens & NautilusAI',
    iconName: 'Server'
  },

  // AI/ML & Agents
  {
    id: 'skill-langgraph',
    code: 'NEU_GRAPH_09',
    name: 'LangGraph',
    domain: 'AI/ML & Agents',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#FF2E88',
    description: 'Multi-agent orchestration, stateful cyclical agent graphs, and coordinated tool execution loops.',
    evidenceProject: 'NautilusAI',
    iconName: 'Network'
  },
  {
    id: 'skill-gemini',
    code: 'NEU_GEMINI_10',
    name: 'Gemini API',
    domain: 'AI/ML & Agents',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#00E5FF',
    description: 'Multimodal reasoning, function/tool calling integration, and structured compliance synthesis.',
    evidenceProject: 'FairLens & NautilusAI',
    iconName: 'Sparkles'
  },
  {
    id: 'skill-groq',
    code: 'NEU_GROQ_11',
    name: 'Groq',
    domain: 'AI/ML & Agents',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#FCEE0A',
    description: 'LPU-accelerated low-latency inference pipelines for real-time agent decision loops.',
    evidenceProject: 'Agentica',
    iconName: 'Zap'
  },
  {
    id: 'skill-xgboost',
    code: 'NEU_XGB_12',
    name: 'XGBoost',
    domain: 'AI/ML & Agents',
    proficiency: 'Currently Learning',
    levelTier: 'SYNAPTIC EXPERIMENT',
    accentColor: '#F59E0B',
    description: 'Gradient-boosted decision tree modeling, cross-validation, and tabular performance tuning.',
    evidenceProject: 'Fairness Audits',
    iconName: 'TrendingUp'
  },
  {
    id: 'skill-shap',
    code: 'NEU_SHAP_13',
    name: 'SHAP',
    domain: 'AI/ML & Agents',
    proficiency: 'Currently Learning',
    levelTier: 'SYNAPTIC EXPERIMENT',
    accentColor: '#FF2E88',
    description: 'Shapley Additive exPlanations for feature attribution, model interpretability, and bias root causes.',
    evidenceProject: 'FairLens Research',
    iconName: 'Search'
  },
  {
    id: 'skill-rf',
    code: 'NEU_RF_14',
    name: 'Random Forest',
    domain: 'AI/ML & Agents',
    proficiency: 'Currently Learning',
    levelTier: 'SYNAPTIC EXPERIMENT',
    accentColor: '#10B981',
    description: 'Ensemble bagging classification, feature importance analysis, and baseline tabular predictions.',
    evidenceProject: 'AI/ML Coursework',
    iconName: 'Layers'
  },

  // Databases & Spatial
  {
    id: 'skill-postgres',
    code: 'DAT_POSTGRES_15',
    name: 'PostgreSQL',
    domain: 'Databases & Spatial',
    proficiency: 'Working Knowledge',
    levelTier: 'CORE CHROME',
    accentColor: '#00E5FF',
    description: 'Relational data modeling, ACID transactions, complex indexing, and join optimization.',
    evidenceProject: 'Production Backends',
    iconName: 'Database'
  },
  {
    id: 'skill-postgis',
    code: 'DAT_POSTGIS_16',
    name: 'PostGIS',
    domain: 'Databases & Spatial',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#00E5FF',
    description: 'Geospatial indexing (R-Tree), spatial polygon queries, and maritime coordinate calculations.',
    evidenceProject: 'NautilusAI & OceanEmbed-X',
    iconName: 'Map'
  },
  {
    id: 'skill-supabase',
    code: 'DAT_SUPABASE_17',
    name: 'Supabase',
    domain: 'Databases & Spatial',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#10B981',
    description: 'PostgreSQL Backend-as-a-Service, Row-Level Security (RLS) policies, and real-time subscriptions.',
    evidenceProject: 'Full-Stack Apps',
    iconName: 'Shield'
  },
  {
    id: 'skill-mongo',
    code: 'DAT_MONGO_18',
    name: 'MongoDB',
    domain: 'Databases & Spatial',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#10B981',
    description: 'NoSQL document schema design, aggregation pipelines, and JSON document persistence.',
    evidenceProject: 'Web Applications',
    iconName: 'HardDrive'
  },
  {
    id: 'skill-redis',
    code: 'DAT_REDIS_19',
    name: 'Redis',
    domain: 'Databases & Spatial',
    proficiency: 'Working Knowledge',
    levelTier: 'HIGH PROTOCOL',
    accentColor: '#FF4B4B',
    description: 'In-memory key-value caching, pub-sub messaging, session state, and rate limiting.',
    evidenceProject: 'High-Speed Caching',
    iconName: 'Activity'
  },

  // Tools & Infra
  {
    id: 'skill-git',
    code: 'SYS_GIT_20',
    name: 'Git & GitHub',
    domain: 'Tools & Infra',
    proficiency: 'Experienced With',
    levelTier: 'CORE CHROME',
    accentColor: '#FCEE0A',
    description: 'Version control workflows, branch protection, collaborative PR reviews, and CI/CD basics.',
    evidenceProject: 'All Engineering Repos',
    iconName: 'GitBranch'
  },
  {
    id: 'skill-powerbi',
    code: 'SYS_POWERBI_21',
    name: 'Power BI',
    domain: 'Tools & Infra',
    proficiency: 'Currently Learning',
    levelTier: 'SYNAPTIC EXPERIMENT',
    accentColor: '#F59E0B',
    description: 'Data visualization modeling, interactive KPI dashboards, and business intelligence reporting.',
    evidenceProject: 'Data Analysis Track',
    iconName: 'BarChart'
  }
];

export const CHRONICLE_TIMELINE: ChronicleNode[] = [
  {
    id: 'chron-2024',
    period: '2024',
    title: 'Foundations & Academic Progression',
    subheading: 'Enrolled in B.Tech CSE (AI/ML) at MIT Academy of Engineering, Pune',
    category: 'FOUNDATIONS',
    summary: 'Commenced undergraduate studies specializing in Artificial Intelligence & Machine Learning. Built core competencies in Python, C++, and standard data structures.',
    details: 'Focused on object-oriented system design, memory management, and computational problem solving. Commenced active algorithmic practice on LeetCode and CodeChef.',
    tags: ['C++', 'Python', 'Data Structures', 'MITAOE'],
    verifiedProof: 'MIT Academy of Engineering Enrollment Records',
    accentColor: '#10B981'
  },
  {
    id: 'chron-2025',
    period: '2025',
    title: 'Full-Stack Systems & Cisco Virtual Internship',
    subheading: 'Broadened technical exploration into reactive web systems & networking',
    category: 'FULL-STACK',
    summary: 'Built responsive interfaces with React & Vite, developed backend APIs using FastAPI, and explored relational data management with PostgreSQL and Supabase.',
    details: 'Completed structured coursework in computer networking and basic cybersecurity through the Cisco Networking Academy. Joined ASTRA (collegiate robotics club) as a technical team member and participated in AMIEE student chapter technical seminars.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Cisco Academy', 'ASTRA', 'AMIEE'],
    verifiedProof: 'Cisco Virtual Internship Coursework & Student Club Membership',
    accentColor: '#00E5FF'
  },
  {
    id: 'chron-2026-hackathons',
    period: 'Early 2026',
    title: 'Competitive Hackathons & Flagship Projects',
    subheading: 'Nirmaan 4.0 2nd Runner-up & Smart India Hackathon (SIH 2026) Selection',
    category: 'HACKATHONS',
    summary: 'Co-developed FairLens and NautilusAI. Won SIH internal round at MITAOE for SIH26066 and SIH26189. Won 2nd Runner-up at Nirmaan 4.0 Hackathon.',
    details: 'Engineered multi-agent spatial coordination using LangGraph, PostGIS, and ChromaDB for NautilusAI. Designed geospatial bathymetric embedding pipelines for OceanEmbed-X and baseline edge surveillance ingestion for NETRA.',
    tags: ['FairLens', 'NautilusAI', 'SIH 2026 Selection', 'Nirmaan 4.0 2nd Runner-up', 'LangGraph'],
    verifiedProof: 'Nirmaan 4.0 Hackathon Certificate & MITAOE SIH Internal Selection Registry',
    accentColor: '#F59E0B'
  },
  {
    id: 'chron-2026-global',
    period: '2026 (Global Honor)',
    title: 'Google Solution Challenge Top 106 Globally',
    subheading: 'Selected among Top 106 projects globally out of 6,700+ worldwide submissions',
    category: 'GLOBAL HONOR',
    summary: 'FairLens achieved international recognition in the Google Solution Challenge 2026 for automated AI bias detection and Gemini-assisted compliance reporting.',
    details: 'Evaluated against 6,700+ international project entries and selected into the global Top 106 finalists for its automated ensemble disparity evaluation engine and structured executive remediation guidelines.',
    tags: ['Google Solution Challenge', 'Global Top 106', 'Gemini API', 'Fairness Metrics', 'React'],
    verifiedProof: 'Google Developer Student Clubs Global Solution Challenge 2026 Finalist Registry',
    accentColor: '#FCEE0A'
  },
  {
    id: 'chron-current',
    period: 'Current Focus',
    title: 'Multi-Agent Systems & Continuous Learning',
    subheading: 'Engineering autonomous agent loops and explainable AI architectures',
    category: 'CURRENT FOCUS',
    summary: 'Exploring stateful cyclical agent graphs with LangGraph, studying explainable AI tools (SHAP feature importance), and building functional web applications (Agentica).',
    details: 'Dedicated to building production-grade, dependable autonomous agent loops with deterministic tool schema verification and robust fallback handling.',
    tags: ['LangGraph', 'Agentica', 'SHAP', 'XGBoost', 'Continuous Learning'],
    verifiedProof: 'Active GitHub Repositories & Live Web Demos',
    accentColor: '#FF2E88'
  }
];

export const REPUTATION_ARCHIVE: ReputationEntry[] = [
  {
    id: 'rep-gsc2026',
    title: 'Google Solution Challenge 2026',
    subtitle: 'Top 106 Globally out of 6,700+ international submissions with FairLens',
    classification: 'Global Finalist (Competition)',
    tier: 'LEGENDARY',
    organization: 'Google Developer Student Clubs Global',
    year: '2026',
    verificationDetails: 'Selected into the Top 106 global finalists among 6,700+ worldwide project entries for FairLens, an automated AI bias detection platform.',
    projectLink: 'https://fairlens-f1922.web.app',
    accentColor: '#FCEE0A'
  },
  {
    id: 'rep-nirmaan4',
    title: 'Nirmaan 4.0 National Hackathon',
    subtitle: 'Second Runner-up with NautilusAI multi-agent ocean platform',
    classification: 'Hackathon Award',
    tier: 'HIGH HONOR',
    organization: 'Nirmaan Innovation Council',
    year: '2026',
    verificationDetails: 'Awarded 2nd Runner-up for co-developing NautilusAI, an autonomous multi-agent ocean intelligence platform integrating LangGraph, PostGIS, and TimescaleDB.',
    projectLink: 'https://nautilus-ai.vercel.app',
    accentColor: '#00E5FF'
  },
  {
    id: 'rep-sih2026',
    title: 'Smart India Hackathon (SIH 2026)',
    subtitle: 'Internal Round Winner for Problem Statements SIH26066 & SIH26189',
    classification: 'Collegiate Selection',
    tier: 'HIGH HONOR',
    organization: 'Ministry of Education & MITAOE',
    year: '2026',
    verificationDetails: 'Selected as top internal collegiate nominee at MIT Academy of Engineering for problem statements SIH26066 (OceanEmbed-X) and SIH26189 (NETRA defense tech). College-level selection round winner, not national grand finale winner.',
    accentColor: '#F59E0B'
  },
  {
    id: 'rep-vajra',
    title: 'VAJRA-X21 Systems Development',
    subtitle: 'Systems development & architecture contributor',
    classification: 'Student Project Member',
    tier: 'ENGINEER',
    organization: 'Collegiate Student Engineering Group',
    year: '2025–Present',
    verificationDetails: 'Student collegiate engineering project focused on system architecture, modular backend code, and collaborative version control workflows.',
    accentColor: '#FF2E88'
  },
  {
    id: 'rep-astra',
    title: 'ASTRA Robotics & Tech Club',
    subtitle: 'Technical team member contributing to club software initiatives',
    classification: 'Club Technical Member',
    tier: 'ENGINEER',
    organization: 'ASTRA Robotics & Tech Club, MITAOE',
    year: '2025–Present',
    verificationDetails: 'Active student technical member contributing to software tasks and collegiate robotics initiatives.',
    accentColor: '#00E5FF'
  },
  {
    id: 'rep-amiee',
    title: 'AMIEE Student Chapter',
    subtitle: 'Active student member participating in chapter technical activities',
    classification: 'Student Chapter Member',
    tier: 'CREDENTIAL',
    organization: 'AMIEE Student Society, MITAOE',
    year: '2025–Present',
    verificationDetails: 'Active student chapter participant in workshops, technical seminars, and peer study groups.',
    accentColor: '#10B981'
  },
  {
    id: 'rep-cisco',
    title: 'Cisco Networking Academy',
    subtitle: 'Completed structured coursework in networking topologies & security',
    classification: 'Virtual Internship & Coursework',
    tier: 'CREDENTIAL',
    organization: 'Cisco Networking Academy',
    year: '2025',
    verificationDetails: 'Successfully completed structured virtual coursework and lab simulations covering computer networking fundamentals, IP routing, and security protocols.',
    accentColor: '#94A3B8'
  }
];

export const NEURAL_RESEARCH_QUESTS: NeuralResearchQuest[] = [
  {
    id: 'res-gsc2026',
    title: 'FairLens: Intersectional Demographic Parity Engine',
    type: 'VERIFIED MILESTONE',
    description: 'Engineered automated multi-class disparity calculations and Gemini-assisted compliance reporting, securing Top 106 Globally.',
    status: 'Deployed Demo',
    date: '2026',
    evidenceText: 'Ranked Top 106 Globally • Google Solution Challenge',
    evidenceUrl: 'https://fairlens-f1922.web.app',
    verificationBadge: 'Google Solution Challenge Global Top 106 Finalist'
  },
  {
    id: 'res-nirmaan',
    title: 'NautilusAI: Cyclical Multi-Agent Ocean Intelligence',
    type: 'VERIFIED MILESTONE',
    description: 'Designed LangGraph supervisor routing between PostGIS spatial workers, TimescaleDB telemetry, and ChromaDB vector embeddings.',
    status: 'Deployed Demo',
    date: '2026',
    evidenceText: '2nd Runner-up Honor • Nirmaan 4.0',
    evidenceUrl: 'https://nautilus-ai.vercel.app',
    verificationBadge: 'Nirmaan 4.0 National Hackathon 2nd Runner-up'
  },
  {
    id: 'res-langgraph',
    title: 'Advanced Cyclical Agent State Graphs',
    type: 'ACTIVE LAB RESEARCH',
    description: 'Engineering fault-tolerant recovery loops, dynamic tool reflection, and execution sandboxes in LangGraph.',
    status: 'Active Development',
    verificationBadge: 'Autonomous Agent Architecture Investigation'
  },
  {
    id: 'res-shap',
    title: 'Explainable AI & Counterfactual Bias Remediation',
    type: 'ACTIVE LAB RESEARCH',
    description: 'Deepening study of Shapley values (SHAP), disparate impact remediation, and feature attribution across tabular pipelines.',
    status: 'Research Prototype',
    verificationBadge: 'Algorithmic Fairness Research Testbed'
  },
  {
    id: 'res-dsa',
    title: 'Algorithmic Problem Solving & Competitive Systems',
    type: 'ACTIVE LAB RESEARCH',
    description: 'Active C++ practice across LeetCode & CodeChef covering graph traversal, dynamic programming, and data structures.',
    status: 'Active Development',
    evidenceUrl: 'https://leetcode.com/u/om_vyas_21',
    verificationBadge: 'Verified LeetCode Profile & Algorithmic Problem Solving'
  }
];

