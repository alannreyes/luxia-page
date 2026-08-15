import type { CaseDoc } from './types'

// English versions of the 9 case documents. Same anonymization rule:
// capability + sector, never the brand.

export const casesEn: CaseDoc[] = [
  // ============================================================
  // 1 · SEMANTIC SEARCH
  // ============================================================
  {
    slug: 'semantic-search-retail',
    industry: 'Retail · Industrial',
    tagline: 'Search that understands context, not just words',
    cardProblem:
      'Catalogs with 200,000+ SKUs where exact-word search fails to find what the user actually needs.',
    cardResult:
      'The right product is the first result in 65% of searches and in the top three in 90% — even when the user writes another term or another language.',
    techTerms: ['Embeddings', 'Qdrant', 'pgvector', 'PostgreSQL'],
    infraTerms: ['Daily sync', 'Scalability'],

    kicker: 'Semantic search · Retail & industry',
    title: 'Semantic search for industrial catalogs: 200,000+ SKUs found by meaning',
    seoTitle: 'Semantic search for industrial catalogs: a real 200K+ SKU case',
    seoDescription:
      'How we built a semantic search engine for an industrial catalog of over 200,000 SKUs: embeddings, hybrid search, data curation and validation. A real production case, explained step by step.',
    lede:
      'An industrial distributor with more than 200,000 SKUs had the problem the whole sector knows: the search box only found what was typed exactly as it appeared in the product master. We built a search engine that understands what the user means — and shipped it to production: today the right product appears as the first result in 65% of searches, and within the top three in 90%, even when the customer uses another term, another language, or simply describes what the product is for.',
    context: [
      'In an industrial catalog, product descriptions are not written by marketing: they are written by whoever registers the product. Abbreviations, manufacturer codes, sizes glued to the text, trade jargon. The result is that a search for "gloves for chemicals" does not find "NITRILE GLOVE GREEN S-9" — even though it is exactly what the customer needs.',
      'The cost of that is silent but enormous: searches ending in "no results," customers depending on the veteran salesperson who knows the catalog by heart, and sales lost because the product did exist — but nobody found it. With over 200,000 SKUs, no human being can be the index.',
    ],
    solutionIntro: [
      'The solution was to stop searching for words and start searching for meaning. Every product in the catalog becomes a vector — an embedding — that captures what it is about: material, use, category, technical synonyms. The user query becomes another vector, and the system finds the closest products by meaning, even when they share not a single word. And when the exact product does not exist in the catalog, that same meaning space proposes the closest substitutes — the other half of a sales counter’s real work.',
      'But the embedding is not computed on the raw description. It is cleaned and enriched first: abbreviations normalized, jargon expanded, brand, category and attributes structured. That text curation proved as decisive as the embedding model itself — half the project was data engineering, not AI.',
    ],
    decisions: [
      {
        title: 'Hybrid search, not vectors alone',
        body: 'Vectors find by meaning, but an exact part number is found better by traditional search. We combined both: keywords for the literal (codes, brands, measurements) and semantics for intent. The final ranking blends the two signals.',
      },
      {
        title: 'Curate the text before embedding',
        body: 'We normalized abbreviations ("S-9" → "size 9"), expanded trade jargon and structured attributes. An embedding computed on dirty text returns dirty results: search quality is decided before you ever touch the model.',
      },
      {
        title: 'The catalog changes every day',
        body: 'Additions, removals and price changes sync automatically, and the vector index updates without maintenance windows. A search engine that shows discontinued products destroys in a week the trust it earned in months.',
      },
    ],
    stack: [
      { name: 'Multilingual embeddings', role: 'Turn products and queries into meaning vectors' },
      { name: 'Qdrant / pgvector', role: 'Vector index for similarity search at scale' },
      { name: 'PostgreSQL', role: 'Product master and structured attributes' },
      { name: 'Curation pipeline', role: 'Normalizes abbreviations and jargon before embedding' },
      { name: 'Hybrid search API', role: 'Blends semantic and literal signals into one ranking' },
      { name: 'Docker on Linux', role: 'Reproducible deployment, automatic backups' },
    ],
    businessIntro:
      'The deep benefit is not "a better search box": it is that the expert salesperson’s knowledge stops being the only path into the catalog. Anyone — a new customer, a junior rep, a procurement team — finds what they need by describing it in their own words.',
    outcomes: [
      '65% of searches return the exact product as the first result, and 90% within the top three — measured on real searches.',
      'Fewer "no results" searches: when the exact product is missing, the system proposes the closest substitutes.',
      'The entire catalog becomes sellable, not just the part the team knows by heart.',
      'The same semantic foundation is ready for quoting engines and AI agents over the catalog.',
    ],
    applications: [
      { sector: 'Industrial distributors', use: 'Technical catalogs with tens of thousands of SKUs and cryptic descriptions.' },
      { sector: 'B2B e-commerce', use: 'Search that converts: the customer describes, the system finds.' },
      { sector: 'Spare parts & automotive', use: 'Find the part by function and equipment, not just by code.' },
      { sector: 'Pharma & laboratory', use: 'Supplies with technical nomenclature and multiple synonyms.' },
    ],
    faq: [
      {
        q: 'Do I need to replace my ERP or online store to get semantic search?',
        a: 'No. The search engine integrates as an API: your platform sends the query and receives ranked results. The product master keeps living where it lives today; the system syncs with it.',
      },
      {
        q: 'Does it work with Spanish descriptions, abbreviations and jargon?',
        a: 'Yes — that was exactly this case: cryptic descriptions, sizes glued to the text and trade jargon. Part of the work is building the normalization dictionary specific to your catalog.',
      },
      {
        q: 'How long does it take to put semantic search in production?',
        a: 'It depends on the state of your data, but the pattern is proven: a first useful version ships to production in weeks and is then tuned with your users’ real searches.',
      },
      {
        q: 'What happens with new or discontinued products?',
        a: 'Synchronization is automatic: additions, removals and price changes flow into the index every day without manual intervention.',
      },
    ],
    related: ['ai-quoting-engine', 'realtime-sales-copilot'],
  },

  // ============================================================
  // 2 · INSURTECH DOCUMENT VALIDATION
  // ============================================================
  {
    slug: 'document-validation-insurtech',
    industry: 'Insurtech · Legal (USA)',
    tagline: 'Automated analysis of complex documents, with verifiable citations',
    cardProblem:
      'Claims and legal professionals spend hours reviewing long documents to extract critical information and assess risk.',
    cardResult:
      'AI does the first read with verifiable citations: 98% agreement with human analysts, measured over two weeks of side-by-side evaluation.',
    techTerms: ['Claude', 'GPT', 'OCR', 'Prompt engineering'],
    infraTerms: ['Encryption', 'Model failover'],

    kicker: 'Generative AI · Insurtech & legal',
    title: 'Document validation with generative AI for claims and legal teams',
    seoTitle: 'Generative AI for document validation in insurance: an insurtech case',
    seoDescription:
      'How we automated the analysis of complex documents for a US insurtech: extraction with verifiable citations, dual models with failover, and data security. A real production case.',
    lede:
      'The claims and legal teams of a US insurtech spent hours reading long documents to extract critical data and assess risk. We built a system that does the first read for them — with verifiable citations to the original document, not summaries you have to take on faith.',
    context: [
      'Policies, endorsements, demand letters, expert reports: long documents, inconsistent formats, often scanned. The critical information — coverages, exclusions, dates, amounts — is in there, but buried. And the person digging for it is a professional whose time is expensive.',
      'The risk is not just the cost of those hours: it is what slips through. One unseen exclusion or one misread date can change the outcome of an entire case. The manual process was not just slow — it was hard to audit.',
    ],
    solutionIntro: [
      'The system receives the document, digitizes it if needed (OCR) and runs it through language models with specialized instructions per document type. The output is not a summary: it is a structured extraction — every field with its value and, crucially, the exact reference to the passage where the document says it.',
      'The hard part in this kind of system is not summarizing: it is not making things up. The entire architecture is designed around verifiability — the AI proposes, points to where it read it, and the professional confirms in one click. The machine does the first read; the human signs. And the final test was not a demo: the system ran for two weeks in parallel with the analysts, answering the same cases, and reached 98% agreement with the human answers before taking over the work.',
    ],
    decisions: [
      {
        title: 'Citations, not blind trust',
        body: 'Every extracted data point links to the original passage. The professional does not have to re-read everything to trust the output: they verify exactly what was flagged. That traceability turns AI into an auditable tool, not a black box.',
      },
      {
        title: 'More than one model, with failover',
        body: 'We use Claude and GPT depending on the task, with automatic fallback if a provider fails or degrades. A production system processing real cases cannot depend on a single vendor’s availability.',
      },
      {
        title: 'Security before speed',
        body: 'Legal and insurance documents are sensitive data: encryption in transit and at rest, role-based access controls, and one hard rule — client data is never used to train models.',
      },
    ],
    stack: [
      { name: 'Claude & GPT via API', role: 'Reading and extraction, each where it performs best' },
      { name: 'OCR', role: 'Digitizes scanned documents and photos' },
      { name: 'Prompts per document type', role: 'Specialized instructions: a policy is not read like a letter' },
      { name: 'Structured extraction', role: 'Output as verifiable fields, not prose' },
      { name: 'End-to-end encryption', role: 'Sensitive data protected in transit and at rest' },
      { name: 'Automatic reports', role: 'Results arrive decision-ready' },
    ],
    businessIntro:
      'The operational shift is direct: the expert stops reading entire documents and starts validating flagged findings. Their judgment — the truly expensive part — concentrates where it matters.',
    outcomes: [
      '98% agreement with human analysts’ answers — two weeks of side-by-side evaluation before going to production.',
      'Drastic reduction in analysis time per document: from hours to minutes.',
      'Lower omission risk: the machine does not get tired on page 40.',
      'Scales through volume peaks without hiring or sacrificing quality.',
      'Every data point traces to its source: the entire process is auditable.',
    ],
    applications: [
      { sector: 'Insurance', use: 'Claims, underwriting, and analysis of policies and endorsements.' },
      { sector: 'Legal', use: 'Contract review, due diligence, document discovery.' },
      { sector: 'Banking', use: 'KYC, credit file and collateral analysis.' },
      { sector: 'Audit & compliance', use: 'Mass document verification with traceability.' },
    ],
    faq: [
      {
        q: 'How do you prevent the AI from inventing data that is not in the document?',
        a: 'Every extracted field comes with a citation to the original passage, and the workflow requires human validation before any decision. If the model cannot find a data point, the system says so — it does not fill it in.',
      },
      {
        q: 'Does it work with scanned documents or photos?',
        a: 'Yes. The pipeline includes OCR to digitize scans and photographs before analysis. Original quality matters, but the system is designed for the real world, not for perfect PDFs.',
      },
      {
        q: 'What about document confidentiality?',
        a: 'Encryption in transit and at rest, role-based access, and client data is never used to train models. The system was designed for a regulated US industry from day one.',
      },
      {
        q: 'Does it handle documents in Spanish?',
        a: 'Yes. Current language models work equally well in Spanish and English; the per-document-type instructions adapt to the local jurisdiction and format.',
      },
    ],
    related: ['lead-generation-insurtech', 'ai-recruiting-ats'],
  },

  // ============================================================
  // 3 · AI + WEATHER LEADS
  // ============================================================
  {
    slug: 'lead-generation-insurtech',
    industry: 'Insurtech (USA)',
    tagline: 'Business opportunities detected from real weather events',
    cardProblem:
      'Identifying properties with potential weather damage by hand arrives late: by the time the sales team reacts, the opportunity has passed.',
    cardResult:
      'Leads generated in real time by crossing weather events with geospatial property data. Today it covers three US states.',
    techTerms: ['LLMs', 'Weather APIs', 'PostGIS', 'Firebase'],
    infraTerms: ['Multi-tenant', 'High availability'],

    kicker: 'AI + weather data · Insurtech (USA)',
    title: 'Lead generation for insurers with AI and real-time weather data',
    seoTitle: 'AI + weather data leads for insurers: a real case',
    seoDescription:
      'A platform that crosses weather events (hail, wind, storms) with geospatial property data to generate leads in real time. Multi-tenant, in production in the USA.',
    lede:
      'When a storm hits an area, some property owners have just become potential customers — and there is a short window to get there first. We built a platform that crosses real weather events with geospatial property data to identify those opportunities while they are still opportunities.',
    context: [
      'In insurance and property services, timing is everything: a lead is worth more in the hours after the event than a week later. The manual process — watching the weather, guessing areas, cold calling — is systematically late and wastes the sales team on areas where nothing happened.',
      'The data existed: weather services report hail, wind and severe storms with area-level precision. What was missing was the automatic cross between "where it hit" and "which properties are there" — and turning that cross into actionable work for a salesperson.',
    ],
    solutionIntro: [
      'The platform monitors 100% of the weather stations in its territory — today, three US states — and, when it detects a severe event, runs the geospatial cross: which properties in the client’s territory fall inside the affected area. Then the AI layer kicks in: prioritizing, filtering and writing the context of each opportunity so the sales team receives a workable lead, not a coordinate.',
      'The whole system is multi-tenant and self-serve, with an integrated payment gateway: each company subscribes, defines its territory and sees only its data, on shared infrastructure. And since value decays by the hour, the architecture is built for low end-to-end latency — from weather event to lead on screen.',
    ],
    decisions: [
      {
        title: 'Geospatial first, AI second',
        body: 'The spatial cross (PostGIS) does the heavy filtering: it is exact, cheap and fast. The language model comes in afterwards, where it adds value: prioritizing opportunities and writing the context. Using AI for what a spatial query solves better would mean paying more for less precision.',
      },
      {
        title: 'Multi-tenant from day one',
        body: 'The platform serves multiple companies with strict per-tenant data isolation. Designing it later is a painful migration; designing it first is an architecture decision.',
      },
      {
        title: 'Actually real time',
        body: 'A storm lead is worth hours, not days. The full pipeline — event ingestion, cross, prioritization, notification — is measured and optimized so the sales team can act the same day.',
      },
    ],
    stack: [
      { name: 'Weather APIs', role: 'Severe events (hail, wind, storm) in real time' },
      { name: 'PostGIS', role: 'Geospatial cross between event and properties' },
      { name: 'LLMs', role: 'Prioritization and context writing for each lead' },
      { name: 'Firebase', role: 'Authentication and real-time data to the frontend' },
      { name: 'Multi-tenant architecture', role: 'Multiple companies, strictly isolated data' },
      { name: 'High availability', role: 'Weather gives no notice: the platform cannot sleep' },
    ],
    businessIntro:
      'The sales team stops chasing cold lists and starts the day with opportunities qualified by a real event: they know where, they know why, and they arrive before the competition.',
    outcomes: [
      'Proactive leads based on real events, not purchased lists.',
      'Territory is worked when it is worth it: hours after the event.',
      'Less sales burnout in areas with no damage.',
      'Multi-tenant with an integrated payment gateway: each company subscribes and operates its territory with isolated data.',
    ],
    applications: [
      { sector: 'Insurers & brokers', use: 'Proactive post-event contact across their book and territory.' },
      { sector: 'Property restoration', use: 'Arriving first where damage just occurred.' },
      { sector: 'Energy & telecom', use: 'Prioritizing infrastructure inspection after severe events.' },
      { sector: 'Agriculture', use: 'Triggering parametric policies and assessing damage by area.' },
    ],
    faq: [
      {
        q: 'Where does the weather data come from?',
        a: 'From professional weather services covering the client’s territory, consumed via API in real time. The platform is provider-agnostic: we pick the best available data for each geography.',
      },
      {
        q: 'Does this respect property owners’ privacy?',
        a: 'The platform works with property data from public sources and the client’s own data, within the legal framework of its territory. It does not track people: it crosses weather events with locations.',
      },
      {
        q: 'Does it integrate with our CRM?',
        a: 'Yes. Leads are delivered via API or direct integration, with the event context included, so they enter your existing sales workflow.',
      },
      {
        q: 'Does it work outside the United States?',
        a: 'The architecture does; coverage depends on the quality of weather and property data available in each country. It is the first question we evaluate in a new territory.',
      },
    ],
    related: ['document-validation-insurtech', 'industrial-alerts-iot'],
  },

  // ============================================================
  // 4 · GEO-MARKETING
  // ============================================================
  {
    slug: 'geo-marketing-retail',
    stage: 'pilot',
    industry: 'Retail · Commerce',
    tagline: 'Marketing that reaches only those nearby',
    cardProblem:
      'Businesses waste budget on mass advertising that reaches people outside their real service area.',
    cardResult:
      'Proximity campaigns with measurable ROI: you only pay for real, location-based reach.',
    techTerms: ['Location APIs', 'Next.js', 'Socket.io', 'TypeScript'],
    infraTerms: ['Prometheus', 'Grafana', 'Observability'],

    kicker: 'AI + geolocation · Retail',
    title: 'Geolocated marketing: advertising that only reaches people near your business',
    seoTitle: 'Geolocated marketing with AI for local businesses: a real case',
    seoDescription:
      'A real-time proximity marketing platform: campaigns that reach only people inside a business’s service area, with measurable ROI and full observability. A production case.',
    lede:
      'For a restaurant, a pharmacy or a neighborhood store, an ad seen twenty kilometers away is money thrown away. We built a proximity marketing platform: campaigns reach only people inside the business’s real service area, at the moment they are nearby.',
    context: [
      'Mass digital advertising is sold by impressions, and for a local business most of those impressions can never become a sale: the person is simply too far away. Small businesses end up subsidizing reach that does not serve them.',
      'The obvious alternative — targeting by city or district — is still too coarse: a business’s real service area is a radius of blocks, not an entire district. And the moment matters: the person nearby today at lunchtime is worth more than the same person on a Sunday across town.',
    ],
    solutionIntro: [
      'The platform manages proximity-radius campaigns in real time: the business defines its offer and its zone, and the system delivers the message only to users inside that area, with live bidirectional communication (WebSockets) so the offer appears and expires at the right moment.',
      'The other half of the system is honest measurement: every campaign reports real reach by location, not abstract impressions. The business sees exactly how many people inside its zone received the offer, and the entire infrastructure is instrumented to detect problems before the user does.',
    ],
    decisions: [
      {
        title: 'Pay for real reach, not impressions',
        body: 'The model was designed as the inverse of mass advertising: the unit of value is a person inside the service area. That aligns the platform’s incentive with the business’s — and makes ROI measurable without leaps of faith.',
      },
      {
        title: 'Real time with WebSockets',
        body: 'A proximity offer is perishable: it is worth something while the person is nearby. Delivery uses Socket.io for live bidirectional communication, instead of deferred notifications that arrive after the moment has passed.',
      },
      {
        title: 'Observability by design',
        body: 'Prometheus and Grafana instrument the platform from the first deployment: delivery latency, active campaigns, health of every service. In a real-time system, learning about problems from the customer means being late twice.',
      },
    ],
    stack: [
      { name: 'Location APIs', role: 'Determine proximity to the service area, with user consent' },
      { name: 'Socket.io', role: 'Bidirectional real-time delivery' },
      { name: 'Next.js + TypeScript', role: 'Fast, end-to-end typed web application' },
      { name: 'Prometheus', role: 'Metrics across the platform' },
      { name: 'Grafana', role: 'Live health and business dashboards' },
    ],
    businessIntro:
      'For the local business, the marketing budget stops buying smoke: every unit spent buys reach inside the zone where a sale is physically possible.',
    outcomes: [
      'Zero spend on audiences outside the service area.',
      'Measurable ROI per campaign: real reach, in the real zone.',
      'Offers that arrive at the right moment, not hours later.',
      'Instrumented platform: problems are detected before the user notices.',
    ],
    applications: [
      { sector: 'Restaurants & cafés', use: 'Off-peak offers to people blocks away.' },
      { sector: 'Chains with locations', use: 'Per-store campaigns, each with its real radius.' },
      { sector: 'Delivery & dark stores', use: 'Directed demand inside the delivery zone.' },
      { sector: 'Events & entertainment', use: 'Filling capacity with an audience that can arrive today.' },
    ],
    faq: [
      {
        q: 'How is user location privacy handled?',
        a: 'Location is used with explicit consent and only to decide whether an offer applies; no movement histories are built. Proximity is evaluated in the moment — the person is not surveilled.',
      },
      {
        q: 'How is this different from social media targeted ads?',
        a: 'Granularity and the billing model: here the zone is your business’s real radius — blocks, not districts — and you pay for reach inside that zone, not for impressions anywhere.',
      },
      {
        q: 'Can a small business use it, or is it only for chains?',
        a: 'It was designed precisely so an individual business can define its offer and radius in minutes. Chains use it the same way, with one radius per location.',
      },
      {
        q: 'How do I know a campaign worked?',
        a: 'Every campaign reports real reach by location and moment. The dashboard shows how many people inside your zone received the offer — no metrics inflated by useless reach.',
      },
    ],
    related: ['industrial-alerts-iot', 'semantic-search-retail'],
  },

  // ============================================================
  // 5 · LOGISTICS DIMENSIONING
  // ============================================================
  {
    slug: 'logistics-dimensioning',
    stage: 'pilot',
    industry: 'Logistics · Courier',
    tagline: 'Instant quotes comparing multiple carriers',
    cardProblem:
      'Calculating volumetric weight by hand is slow and error-prone — and every carrier uses a different dimensional factor.',
    cardResult:
      'Dimensions by computer vision and instant quotes comparing national and international carriers.',
    techTerms: ['Vision AI', 'Carrier APIs', 'Next.js', 'Python'],
    infraTerms: ['ERP integration', 'CI/CD'],

    kicker: 'Computer vision · Logistics',
    title: 'Volumetric dimensioning with computer vision for courier and logistics',
    seoTitle: 'Volumetric weight with computer vision: multi-carrier quoting',
    seoDescription:
      'How we automated volumetric weight calculation with computer vision and a multi-carrier rate engine: from a photo of the package to a compared quote in seconds. In production.',
    lede:
      'In courier operations, measurement errors cost you twice: under-declare and the carrier back-charges you; over-declare and you lose the customer on price. We built a system that estimates package dimensions with computer vision and quotes instantly against multiple carriers — each with its own volumetric factor.',
    context: [
      'Volumetric weight — the formula that turns box size into billable kilos — governs the price of every non-dense shipment. Measuring it by hand with a tape is slow, interrupts the operation, and produces errors that cost money in both directions.',
      'To make it worse, every carrier uses its own dimensional factor and rounding rules. Comparing prices across three or four carriers for every package is work nobody does well by hand — so most operations quote with a single carrier out of inertia and leave money on the table.',
    ],
    solutionIntro: [
      'The flow starts at the camera: the operator captures the package and computer vision estimates its dimensions. With the measurements and the actual weight, the rate engine applies each configured carrier’s dimensional factor and rules — national and international — and returns the price comparison instantly.',
      'The second half of the value is integration: the result does not live in a separate app — it flows into the operation’s management system (ERP), so that quoting well does not add a step to the process; it replaces one.',
    ],
    decisions: [
      {
        title: 'The camera as a measuring instrument',
        body: 'Computer vision turns a phone or a fixed camera into a dimensioner. It does not match the precision of an industrial scanner costing thousands of dollars, but it eliminates the gross error and the friction of the manual process — which is where the money is lost.',
      },
      {
        title: 'A rules engine per carrier, not one formula',
        body: 'Every carrier has its factor, its rounding, its exceptions. We modeled the rules as per-carrier configuration instead of hard-coding them: adding a new carrier is a configuration entry, not a development project.',
      },
      {
        title: 'Integrated into the flow, not another screen',
        body: 'The quote is injected into the system the operation already uses. A tool that forces switching apps in the middle of dispatch ends up unused, no matter how good it is.',
      },
    ],
    stack: [
      { name: 'Computer vision', role: 'Estimates package dimensions from the image' },
      { name: 'Multi-carrier rate engine', role: 'Dimensional factor and rules per carrier, configurable' },
      { name: 'Carrier APIs', role: 'National and international rates and services' },
      { name: 'Next.js', role: 'Fast operations interface' },
      { name: 'Python', role: 'Image processing and calculation logic' },
      { name: 'ERP integration', role: 'Results flow into the existing management system' },
    ],
    businessIntro:
      'The operation wins on both ends: it stops giving away kilos through bad measurement, and stops losing customers by quoting high with the wrong carrier.',
    outcomes: [
      'Compared quotes across carriers in seconds — no calls, no spreadsheets.',
      'Fewer carrier back-charges for misdeclared dimensions.',
      'The best available price for each package, not the default carrier’s.',
      'Dispatch speeds up: measuring stops being a bottleneck.',
    ],
    applications: [
      { sector: 'Couriers & last mile', use: 'Dimension and quote at the receiving point.' },
      { sector: 'E-commerce', use: 'Exact shipping cost before committing a price to the customer.' },
      { sector: 'Warehouses & fulfillment', use: 'Volumetric verification in the outbound flow.' },
      { sector: 'Exporters', use: 'Comparing international carriers with different rules per destination.' },
    ],
    faq: [
      {
        q: 'How precise is camera-based measurement?',
        a: 'Precise enough to eliminate the gross error of the manual process, which is where money is lost. For loads where a centimeter changes the rate, the system lets the operator adjust the measurement before quoting — vision proposes, the operator confirms.',
      },
      {
        q: 'How many carriers can be compared?',
        a: 'As many as the operation needs: each carrier’s rules are configuration, not code. Adding a new one does not require a development project.',
      },
      {
        q: 'Does it integrate with our management system?',
        a: 'Yes — that is the design: the quote flows into your ERP or operating system via API, so the team does not switch screens in the middle of the operation.',
      },
      {
        q: 'Do I need special hardware?',
        a: 'Not to start: vision works with standard cameras. An industrial dimensional scanner is only justified at volumes where a centimeter is money — and the system can coexist with one.',
      },
    ],
    related: ['ai-quoting-engine', 'semantic-search-retail'],
  },

  // ============================================================
  // 6 · GEOLOCATED ALERTS + IOT
  // ============================================================
  {
    slug: 'industrial-alerts-iot',
    stage: 'pilot',
    industry: 'Industrial · Mining · Oil & Gas',
    tagline: 'Knowing when to seek shelter',
    cardProblem:
      'Personnel in critical operations cannot tell whether a risk event — lightning storm, incident — actually affects them.',
    cardResult:
      'Zone-based alerts that ring with the app closed and the phone locked. Designed for privacy.',
    techTerms: ['IoT', 'Weather APIs', 'Model failover'],
    infraTerms: ['High availability', '24/7', 'Docker', 'Linux'],

    kicker: 'IoT + geolocation · Mining & industry',
    title: 'Geolocated alerts for critical operations: warnings that arrive with the phone locked',
    seoTitle: 'Geolocated IoT alerts for mining and industry: a real case',
    seoDescription:
      'A zone-based early warning system for critical operations: weather and IoT events, notifications that break through silent mode, and privacy by design. In production 24/7.',
    lede:
      'In a mining or hydrocarbons operation, a risk event — a lightning storm, an incident — affects one zone, not the whole operation. The question that saves lives is individual: is it me who needs to seek shelter? We built an alert system that answers that question and gets through even when the phone is locked.',
    context: [
      'The usual channels — group chat, email, radio — have two failures in an emergency: they cannot tell who it applies to (everyone receives everything, and excess warnings train people to ignore them), and they do not break through a silenced phone inside a pocket.',
      'Moreover, the obvious solution — tracking every worker’s location — collides with something legitimate: nobody wants to be surveilled. The system had to resolve the tension between alerting by location and becoming a surveillance tool.',
    ],
    solutionIntro: [
      'The platform receives events from professional weather sources and IoT sensors in the field, decides which zones are at risk, and fires critical notifications — the kind that ring with the app closed and the phone locked or silenced — only to the people whose zone is affected.',
      'Privacy is by design, not by policy: location is used solely to decide whether the alert applies to you, and no movement histories are built. The system knows who to alert without becoming a tracker.',
    ],
    decisions: [
      {
        title: 'Critical alerts, not just more notifications',
        body: 'We use the phone operating system’s critical alert channels — the same ones used by emergency alerts — so the warning rings with the device locked or silenced. A safety alert that depends on the user having the app open is not an alert.',
      },
      {
        title: 'Privacy as an engineering requirement',
        body: 'Location decides the alert and nothing else: no histories, no surveillance. That decision is not just ethical — it is what makes workers willing to carry the system, and without adoption there is no safety.',
      },
      {
        title: 'Failover in everything that can fail',
        body: 'Redundant data sources, automatic fallback between AI models, and infrastructure built to run 24/7. A safety system has a different contract from any other application: it cannot have a bad day.',
      },
    ],
    stack: [
      { name: 'Professional weather APIs', role: 'Severe events with zone-level precision' },
      { name: 'IoT field sensors', role: 'Local signal the satellite cannot see' },
      { name: 'Risk-zone engine', role: 'Decides who to alert — and who not to' },
      { name: 'Critical notifications', role: 'Break through silent mode and the locked phone' },
      { name: 'Model failover', role: 'No AI provider is a single point of failure' },
      { name: 'Docker on Linux, 24/7', role: 'Continuous operation with backups and monitoring' },
    ],
    businessIntro:
      'For an operation with field personnel, this turns reactive safety into anticipation: the right person gets the right warning with minutes of advantage — and those not at risk receive no noise training them to ignore the next alert.',
    outcomes: [
      'The warning arrives even with the phone locked, silenced, or the app closed.',
      'Only people in the affected zone are alerted: zero alarm fatigue.',
      'Privacy by design: location-based alerts without surveilling people.',
      'Continuous 24/7 operation with redundancy in data, models and infrastructure.',
    ],
    applications: [
      { sector: 'Mining', use: 'Lightning storms, heavy equipment traffic, zone evacuations.' },
      { sector: 'Oil & Gas', use: 'Incidents at facilities with distributed personnel.' },
      { sector: 'Construction', use: 'Weather risks across large sites.' },
      { sector: 'Agroindustry', use: 'Field personnel facing severe weather events.' },
    ],
    faq: [
      {
        q: 'Does the alert really ring with the phone on silent?',
        a: 'Yes — it uses the operating system’s critical notification channels, the same as emergency alerts. That was a design requirement from day one: a closed app and a locked phone are the normal case, not the exception.',
      },
      {
        q: 'Does the system track workers?',
        a: 'No. Location is used only to decide whether an alert applies, and no movement histories are stored. The design separates "knowing who to alert" from "knowing where everyone has been" — it only does the former.',
      },
      {
        q: 'What if the data source or the AI provider fails?',
        a: 'There is redundancy at all three layers: alternative data sources, automatic model failover, and infrastructure monitored 24/7. A safety system is designed assuming its parts will fail.',
      },
      {
        q: 'Does it work in operations without full cellular coverage?',
        a: 'The system combines channels: where there is data coverage it reaches the phone, and it can integrate with the operation’s local means (sirens, radio) for uncovered zones. The zone architecture is the same.',
      },
    ],
    related: ['lead-generation-insurtech', 'realtime-sales-copilot'],
  },

  // ============================================================
  // 7 · REAL-TIME SALES COPILOT (NEW)
  // ============================================================
  {
    slug: 'realtime-sales-copilot',
    stage: 'pilot',
    industry: 'B2B Sales · Ambient agent',
    tagline: 'AI that assists the salesperson during the video call, live',
    cardProblem:
      'Technical salespeople need specs, prices and account history while they talk — and searching mid-call breaks the conversation.',
    cardResult:
      'A copilot that listens to the call and whispers the right fact or question on screen, visible only to the salesperson.',
    techTerms: ['Streaming STT', 'Two-tier LLMs', 'Private vector base'],
    infraTerms: ['Native app', 'Invisible overlay', 'Dual audio'],

    kicker: 'Ambient agent · B2B sales',
    title: 'Real-time sales copilot: AI that assists the salesperson during the video call',
    seoTitle: 'Real-time AI sales copilot: how we built it',
    seoDescription:
      'An AI sales assistant that listens to the video call and shows the salesperson — only them — the right fact or question at the exact moment, from a private knowledge base. Here is how we built it.',
    lede:
      'Our newest system: a copilot that listens to the salesperson’s video call and shows them — only them — the fact, the number or the right question at the exact moment. It does not dictate scripts: it whispers glanceable cues, fed by the company’s own knowledge.',
    context: [
      'In a technical sale, the salesperson converses while juggling memory: specifications, prices, account history, the objection this client raised three months ago. Stopping to search breaks the rhythm of the conversation; not searching means answering halfway and ending with "I’ll confirm and get back to you."',
      'The knowledge that wins those conversations exists — in product sheets, in battle cards against competitors, in each account’s history — but it lives scattered across documents and, above all, in the heads of the two or three experts who cannot join every call.',
    ],
    solutionIntro: [
      'The copilot captures audio on two channels — the microphone is the salesperson, the system audio is the other party — and transcribes in streaming while the conversation flows. On top of that transcript, a two-tier judge decides at every moment one of three things: search, suggest, or stay quiet. When it acts, the result appears as a glanceable card — a verb and a few words — on an overlay the other party never sees, even during screen sharing.',
      'The difference from a generic assistant is where the answers come from: before touching the web, the copilot consults three drawers of private knowledge — the live facts of the domain, the product sheets and battle cards, and the account file with its history. The web only complements. A copilot that answers with what anyone can google is not a competitive advantage.',
    ],
    decisions: [
      {
        title: 'Intentions, not scripts',
        body: 'The copilot suggests "→ ask about last season’s losses," never the verbatim phrase to read. A salesperson reading sounds like a robot; a salesperson reminded of the right point sounds like an expert. The rule came from testing both: scripts show.',
      },
      {
        title: 'Two model tiers, conversation-grade latency',
        body: 'A fast model acts as gatekeeper — is it worth intervening right now? — and only when the answer is yes does a more capable model write the cue. The system operates at the pace of human conversation, not of a chatbot that thinks for five seconds.',
      },
      {
        title: 'Staying quiet is a feature, not a failure',
        body: 'The worst copilot is the one that interrupts constantly. Success is measured in trigger precision — the right card, on time, without spam — and the salesperson trains the system with one click: useful, give me another, or remove. That feedback tunes when to speak and when not to.',
      },
      {
        title: 'Invisible on the shared screen',
        body: 'The overlay is excluded from screen capture at the operating system level: the salesperson can share their full screen and the copilot remains theirs alone. Without that, the tool would die in its first client demo.',
      },
    ],
    stack: [
      { name: 'Streaming transcription (STT)', role: 'Live text at conversation latency' },
      { name: 'Dual audio capture', role: 'Microphone = salesperson, system = other party: roles without guessing' },
      { name: 'Two-tier LLMs', role: 'Fast gatekeeper + capable writer, via API' },
      { name: 'Vector knowledge base', role: 'Three private drawers: domain, product, account' },
      { name: 'Native desktop app', role: 'Overlay excluded from screen capture' },
      { name: 'Automatic minutes', role: 'Meeting notes with commitments on hang-up, no extra work' },
    ],
    businessIntro:
      'Every salesperson joins the call with the memory of the whole company: the specs, the account history and the best salesperson’s arguments, available the second they are needed.',
    outcomes: [
      'Cues arrive in ~3 seconds when the fact lives in the private knowledge base — conversation speed, not chatbot speed.',
      'The salesperson answers in the moment — no more "I’ll confirm later."',
      'The expert’s knowledge scales to the entire sales team.',
      'Sales onboarding shortens: the copilot rides along from the first call.',
      'Minutes and commitments are ready on hang-up, audio included.',
    ],
    applications: [
      { sector: 'Technical B2B sales', use: 'Products with complex specs, regulations and comparisons.' },
      { sector: 'Brokers & advisors', use: 'Insurance and finance: precise data with the client on the line.' },
      { sector: 'Customer support', use: 'Support that answers with the knowledge base in its ear.' },
      { sector: 'Recruiting', use: 'Interviews with the candidate’s file and the right questions in sight.' },
    ],
    faq: [
      {
        q: 'Does the client notice the salesperson is using a copilot?',
        a: 'No. The overlay is invisible in screen sharing — excluded from capture at the operating system level — and the cues are so brief they are read at a glance, without breaking eye contact or the rhythm of the conversation.',
      },
      {
        q: 'Does this record the calls?',
        a: 'The copilot transcribes to assist live and to generate the minutes at the end. What is kept and for how long is defined by each company’s policy, including whatever consent its legal framework requires.',
      },
      {
        q: 'Where do the answers come from?',
        a: 'First from your own knowledge — product sheets, battle cards, account history — loaded into a private vector base. The web only complements. That is the difference from a generic assistant: it answers with what only your company knows.',
      },
      {
        q: 'Does it work in Spanish?',
        a: 'Yes — it was born in Spanish, industry vocabulary included. The transcription engine and the models also handle English and mixed conversations.',
      },
    ],
    related: ['semantic-search-retail', 'ai-recruiting-ats'],
  },

  // ============================================================
  // 8 · AI RECRUITING ATS (NEW)
  // ============================================================
  {
    slug: 'ai-recruiting-ats',
    stage: 'pilot',
    industry: 'HR · Recruiting',
    tagline: 'Read every CV and rank with judgment, not keywords',
    cardProblem:
      'Hundreds of CVs per opening: keyword filters discard good candidates who described the same experience in different words.',
    cardResult:
      'Every CV read and structured by AI, and an explained ranking: why each candidate stands where they stand.',
    techTerms: ['LLMs', 'Structured extraction', 'Embeddings'],
    infraTerms: ['Explainable ranking', 'Multi-format'],

    kicker: 'Generative AI · Human Resources',
    title: 'AI-powered ATS: read every CV and rank candidates with judgment, not keywords',
    seoTitle: 'AI ATS: CV parsing and explainable candidate ranking',
    seoDescription:
      'A recruiting system where AI reads CVs in any format, extracts the real profile and ranks candidates against the role with auditable explanations. A production case.',
    lede:
      'An attractive opening receives hundreds of CVs, and the classic keyword filter discards valuable people over a wording detail. We built a recruiting system where AI reads every CV in full, understands the experience even when described in different words, and delivers a ranking with the reasons in plain sight.',
    context: [
      'The traditional recruiting funnel has a known defect: nobody can read five hundred CVs, so they filter by keywords — and the candidate who wrote "built interfaces with React" passes, while the one who wrote "developed the platform’s frontend" is lost, even if they are better.',
      'The result is two invisible costs: good candidates discarded over wording, and recruiter hours spent reading CVs a better filter would have sorted. In markets where talent is scarce, the first cost is the expensive one.',
    ],
    solutionIntro: [
      'The system receives CVs in any format — PDF, Word, scans — and turns them into structured profiles: real experience, technologies, achievements, trajectory. It does not look for words: it understands descriptions. Experience with a technology counts even if the CV never uses its exact name.',
      'Against the role description, the engine combines semantic understanding with the explicit requirements and produces a ranking where every position is argued: what this candidate has, what they lack, where their CV says it. The recruiter does not receive a score — they receive a case.',
    ],
    decisions: [
      {
        title: 'Explained ranking, not a black box',
        body: 'Every score comes with its reasons, citing the CV. In a decision that affects people, a number without an argument is not acceptable — not for the candidate, and not for the recruiter who has to defend their shortlist.',
      },
      {
        title: 'Semantics over keywords',
        body: 'Experience described in different words counts the same. Matching combines embeddings — closeness of meaning — with the role’s hard requirements, instead of counting literal matches.',
      },
      {
        title: 'AI sorts; the human decides',
        body: 'The system never discards anyone on its own: it prioritizes and argues. The decision to advance a candidate or not belongs to the recruiter — with better information, in a fraction of the time.',
      },
    ],
    stack: [
      { name: 'LLMs', role: 'Reading and understanding each full CV' },
      { name: 'Structured extraction', role: 'From free-form document to comparable profile' },
      { name: 'Embeddings', role: 'Semantic matching between experience and role' },
      { name: 'Ranking engine', role: 'Combines semantics and hard requirements, with explanations' },
      { name: 'Web application', role: 'The recruiter’s full workflow in one place' },
    ],
    businessIntro:
      'The change is not just speed: the shortlist becomes defensible. Every candidate who advances — and every one who does not — has documented reasons.',
    outcomes: [
      'From hundreds of CVs to an argued shortlist in minutes.',
      'Fewer false discards: wording stops eliminating good candidates.',
      'Auditable process: every decision has its reasons in writing.',
      'Recruiters spend their time interviewing, not filtering.',
    ],
    applications: [
      { sector: 'Corporate HR', use: 'High-volume openings with hundreds of applicants.' },
      { sector: 'Headhunters & staffing', use: 'More simultaneous searches with the same team.' },
      { sector: 'Technology', use: 'Technical profiles where keywords mislead the most.' },
      { sector: 'Universities & programs', use: 'Scholarship and admissions selection with traceable criteria.' },
    ],
    faq: [
      {
        q: 'How do you handle bias risk in selection?',
        a: 'Three safeguards: the role’s criteria are explicit and configurable, every score comes with an auditable explanation citing the CV, and the system never discards on its own — the final decision is always human.',
      },
      {
        q: 'What CV formats does it accept?',
        a: 'PDF, Word, plain text and scanned documents. The pipeline includes OCR, and the model understands diverse structures: candidates do not have to adapt their CV to the system.',
      },
      {
        q: 'Does it replace our current ATS or complement it?',
        a: 'Both paths work: it can operate as a complete system or integrate into your current flow, contributing the reading and ranking layer. It depends on how much you want to change at once.',
      },
      {
        q: 'Does it work with CVs in Spanish and English?',
        a: 'Yes, and with mixed batches — common in technical searches in Latin America where CVs arrive in both languages.',
      },
    ],
    related: ['document-validation-insurtech', 'realtime-sales-copilot'],
  },

  // ============================================================
  // 9 · AI QUOTING ENGINE (NEW)
  // ============================================================
  {
    slug: 'ai-quoting-engine',
    industry: 'B2B Procurement · Distribution',
    tagline: 'From a pasted free-text list to a formal quotation',
    cardProblem:
      'Quoting a purchase list takes hours: interpreting what the customer wrote, finding each item, comparing prices and building the document.',
    cardResult:
      'The customer pastes their list in natural language and receives a formal quotation with market prices in seconds.',
    techTerms: ['LLMs', 'Qdrant', 'Next.js', 'PostgreSQL', 'Redis'],
    infraTerms: ['LLM validation', 'Formal document'],

    kicker: 'AI + semantic search · B2B procurement',
    title: 'Intelligent quoting engine: from a pasted free-text list to a formal quotation in seconds',
    seoTitle: 'AI quoting engine: from free text to a formal quotation',
    seoDescription:
      'How we built an AI quoting engine: natural-language order parsing, semantic matching against hundreds of thousands of products, LLM validation and a formal output document. A real case.',
    lede:
      '"2 hammer drills 1/2, electrical tape x10 and a white helmet size M" — that is how a real customer writes, and that is how this system takes it: paste the list in free text and out comes a formal quotation with real market prices. No templates, no codes, no salesperson spending hours searching item by item.',
    context: [
      'In B2B distribution, quoting is the silent bottleneck: the order arrives by email or chat, written in the customer’s language — quantities in words, half-remembered brands, approximate sizes — and someone has to interpret it, find each product, compare prices and build a presentable document. Hours per quote, while the customer compares against whoever answered first.',
      'The hard part is not finding a product: it is understanding an order. "A desk and a chair with wheels" means an office chair, not a wheelchair. That class of ambiguity, obvious to a human, is where traditional search engines fail.',
    ],
    solutionIntro: [
      'The flow has three AI stages. First, a language model parses the complete order — splits items, interprets quantities written in words, preserves brand and size, and uses the context of the whole order to resolve ambiguities. Second, each item is searched by meaning against a semantic index of hundreds of thousands of products with market prices.',
      'Third — and this stage is what separates a demo from a trustworthy system — another model validates every match: is this THE product that was requested? Cooking oil is not motor oil, and it is not a deep fryer either. If there is a single valid candidate, it auto-selects the best price; if genuinely different products compete, the system asks with simple options; and if something was not found, it says so — it does not sneak in a substitute. The output is a formal quotation document: itemized table, taxes, terms, ready to print or send.',
    ],
    decisions: [
      {
        title: 'Ask only on real ambiguity',
        body: 'The same product in several stores is not ambiguity — pick the best price and move on. The system only interrupts when genuinely different products are at stake (brand, tier, type). Every unnecessary question is friction sending the customer back to their spreadsheet.',
      },
      {
        title: 'Honest outputs',
        body: 'If an item has no reliable match, the quotation says so and offers to rewrite or remove it. A quoting engine that pads with similar-looking substitutes generates returns and distrust — the cost shows up later, multiplied.',
      },
      {
        title: 'The LLM validates what embeddings bring close',
        body: 'Semantic search retrieves candidates close in meaning; a language model confirms which ones are actually the requested product, with a strict category rule and a flexible size rule: if there is no 1-liter presentation, the 900 ml one is a valid answer — a deep fryer never is.',
      },
    ],
    stack: [
      { name: 'LLMs for parsing', role: 'Understand the natural-language order, with full context' },
      { name: 'Embeddings + Qdrant', role: 'Meaning-based search over hundreds of thousands of products' },
      { name: 'Validator LLM', role: 'Confirms every match is the right product' },
      { name: 'Next.js', role: 'Quoting interface and final document' },
      { name: 'PostgreSQL + Redis', role: 'Quotation records and query speed' },
      { name: 'Price pipeline', role: 'Market index kept current, per source' },
    ],
    businessIntro:
      'It is a new sales channel, not an upgrade to the existing one. In traditional e-commerce the customer browses the virtual aisles; here they hand over their entire shopping list and the system identifies in your stock exactly what they want, in their own jargon: "that white tape for joining threads," "that liquid for cleaning rust." Quoting stops being a chore and becomes an answer.',
    outcomes: [
      'From hours per quotation to seconds, formal document included.',
      'Answering first: the cheapest commercial advantage there is.',
      'Every quotation is recorded: price history and traceability.',
      'The sales team quotes volume without growing headcount.',
    ],
    applications: [
      { sector: 'Distributors & wholesalers', use: 'Customer purchase lists turned into instant quotations.' },
      { sector: 'Purchasing organizations', use: 'Comparing the market for every line of the requirement.' },
      { sector: 'Industrial hardware', use: 'Orders written "the way the foreman talks."' },
      { sector: 'Corporate procurement', use: 'Budgeting internal requirements without an email chain.' },
    ],
    faq: [
      {
        q: 'Where do the prices come from?',
        a: 'From a market index built according to the industry: public catalogs, the business’s own price lists, or both. The index updates continuously and every price keeps its source.',
      },
      {
        q: 'What if the customer writes with typos or ambiguously?',
        a: 'The parser is built for real language: quantities in words, half-remembered brands, typos. And when ambiguity is genuine — different products that fit — the system asks with simple options instead of guessing.',
      },
      {
        q: 'Does the quotation come out in a presentable format?',
        a: 'Yes: a formal document with an itemized table, taxes, totals and terms, ready to print, save as PDF or send. Every quotation is recorded for follow-up.',
      },
      {
        q: 'Can it quote against our own catalog instead of the market?',
        a: 'Yes — the semantic index is built from whatever sources you define: your catalog, the market, or both compared. It is the same engine as the semantic search, pointed at the source that serves you.',
      },
    ],
    related: ['semantic-search-retail', 'logistics-dimensioning'],
  },
]
