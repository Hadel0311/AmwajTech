import { api } from '../services/api.js';

const servicesData = [
  {
    key: "network_infrastructure",
    icon: "Network",
    title: "Network Infrastructure",
    description: "High-performance enterprise networking, fiber backbones, multi-site SD-WAN deployments, and resilient switching architectures.",
    heroValueProp: "Building the backbone of modern enterprise communication with uncompromised speed and reliability.",
    visualIntro: {
      title: "Resilient Networking & Connectivity",
      description: "We design, deploy, and maintain robust network infrastructures capable of handling massive data throughput. From core switching to edge routing, we ensure zero-bottleneck data flow across all your corporate branches.",
      objectives: [
        "Architect scalable Cisco and Juniper core switching networks",
        "Deploy SD-WAN for optimized multi-site branch connectivity",
        "Implement high-speed fiber optic backbones and cabling"
      ],
      businessValue: "Eliminate costly network downtime and ensure your employees have uninterrupted access to critical enterprise applications."
    },
    challenges: [
      {
        challenge: "Network Congestion",
        solution: "Implementing Quality of Service (QoS) and traffic shaping for critical applications."
      },
      {
        challenge: "Branch Disconnectivity",
        solution: "Deploying resilient SD-WAN architectures with automated failover."
      },
      {
        challenge: "Outdated Cabling",
        solution: "Upgrading legacy copper to high-throughput multi-mode fiber optics."
      }
    ],
    workflow: [
      {
        title: "Assessment",
        description: "Analyzing current network topologies, bandwidth usage, and latency bottlenecks."
      },
      {
        title: "Design",
        description: "Creating comprehensive network diagrams, IP addressing schemas, and routing protocols."
      },
      {
        title: "Implementation",
        description: "Physical cabling, router/switch racking, and core protocol configuration."
      },
      {
        title: "Testing",
        description: "Validating failover scenarios, throughput testing, and packet loss monitoring."
      },
      {
        title: "Optimization",
        description: "Tuning BGP/OSPF routes and adjusting SD-WAN policies."
      },
      {
        title: "Support",
        description: "24/7 network monitoring, firmware upgrades, and configuration backups."
      }
    ],
    relatedServices: ["network_security", "data_center", "technical_support"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    order: 0
  },
  {
    key: "network_security",
    icon: "Shield",
    title: "Network Security",
    description: "Next-Gen firewalls, intrusion prevention systems, zero-trust access, security monitoring, and continuous threat mitigation.",
    heroValueProp: "Protecting enterprise assets with military-grade perimeter defense and proactive threat intelligence.",
    visualIntro: {
      title: "Zero-Trust Security Architectures",
      description: "In an era of sophisticated cyber threats, perimeter defense is not enough. We implement comprehensive zero-trust frameworks, isolating critical data and monitoring every access request in real-time.",
      objectives: [
        "Deploy Next-Generation Firewalls (NGFW) with deep packet inspection",
        "Implement Intrusion Detection and Prevention Systems (IDS/IPS)",
        "Enforce strict Zero-Trust Network Access (ZTNA) policies"
      ],
      businessValue: "Safeguard intellectual property, maintain regulatory compliance, and prevent catastrophic financial losses associated with data breaches."
    },
    challenges: [
      {
        challenge: "Ransomware Threats",
        solution: "Endpoint detection and response (EDR) coupled with automated network isolation."
      },
      {
        challenge: "Remote Worker Vulnerability",
        solution: "Secure VPN tunnels and multi-factor authentication (MFA) gateways."
      },
      {
        challenge: "Compliance Violations",
        solution: "Strict access logging, data encryption at rest, and continuous auditing."
      }
    ],
    workflow: [
      {
        title: "Assessment",
        description: "Conducting penetration testing and vulnerability scanning."
      },
      {
        title: "Design",
        description: "Drafting security policies, firewall rulesets, and access control lists (ACLs)."
      },
      {
        title: "Implementation",
        description: "Deploying perimeter firewalls, proxy servers, and endpoint agents."
      },
      {
        title: "Testing",
        description: "Simulating cyber attacks (Red Teaming) to validate defense mechanisms."
      },
      {
        title: "Optimization",
        description: "Refining IPS signatures to reduce false-positive alerts."
      },
      {
        title: "Support",
        description: "Continuous Security Operations Center (SOC) monitoring and incident response."
      }
    ],
    relatedServices: ["network_infrastructure", "cloud_services", "technical_support"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    order: 1
  },
  {
    key: "data_center",
    icon: "Server",
    title: "Data Center Solutions",
    description: "Hyperconverged systems, server virtualization, high-availability storage arrays, disaster recovery vaults, and cooling control.",
    heroValueProp: "Engineering high-availability compute environments for mission-critical enterprise applications.",
    visualIntro: {
      title: "Enterprise Compute & Storage",
      description: "We construct and modernize physical data centers using hyperconverged infrastructure (HCI) that consolidates compute, storage, and networking into a single, highly efficient software-defined system.",
      objectives: [
        "Design and rack physical servers and high-density storage arrays",
        "Virtualize hardware utilizing VMware vSphere or Microsoft Hyper-V",
        "Implement synchronous storage replication for disaster recovery"
      ],
      businessValue: "Drastically reduce hardware footprints, slash power consumption, and achieve five-nines (99.999%) application uptime."
    },
    challenges: [
      {
        challenge: "Hardware Sprawl",
        solution: "Consolidating physical servers into high-density virtualized clusters."
      },
      {
        challenge: "Storage Bottlenecks",
        solution: "Deploying All-Flash NVMe SANs with intelligent tiering."
      },
      {
        challenge: "Disaster Recovery",
        solution: "Automated off-site replication and orchestrated site failover."
      }
    ],
    workflow: [
      {
        title: "Assessment",
        description: "Auditing current compute resources, storage IOPS needs, and power loads."
      },
      {
        title: "Design",
        description: "Designing high-availability hypervisor clusters and SAN fabrics."
      },
      {
        title: "Implementation",
        description: "Rack deployment, power distribution, and hypervisor (VMware) installation."
      },
      {
        title: "Testing",
        description: "Live failover testing, backup verification, and thermal simulations."
      },
      {
        title: "Optimization",
        description: "Resource ballooning, storage tiering, and VM consolidation."
      },
      {
        title: "Support",
        description: "Hardware warranty tracking, patch management, and health monitoring."
      }
    ],
    relatedServices: ["cloud_services", "software_solutions", "technical_support"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    order: 2
  },
  {
    key: "cloud_services",
    icon: "Cloud",
    title: "Cloud Services",
    description: "Hybrid cloud hosting, AWS & Azure certified migrations, secure private clouds, and ongoing infrastructure cost optimization.",
    heroValueProp: "Accelerating digital transformation with scalable, secure, and optimized hybrid cloud deployments.",
    visualIntro: {
      title: "Hybrid Cloud Ecosystems",
      description: "We architect and migrate complex enterprise workloads to hybrid and private cloud environments, ensuring limitless scalability while maintaining strict cost optimization controls.",
      objectives: [
        "Automate secure migrations to AWS and Microsoft Azure",
        "Build dedicated, highly compliant private cloud hosts",
        "Orchestrate Docker and Kubernetes container deployments"
      ],
      businessValue: "Unlock infinite processing flexibility and transition to transparent, pay-as-you-use pricing models without sacrificing data sovereignty."
    },
    challenges: [
      {
        challenge: "Scalability Constraints",
        solution: "Elastic cloud compute instances that scale dynamically with demand."
      },
      {
        challenge: "Migration Complexities",
        solution: "Automated, zero-downtime workload migration strategies."
      },
      {
        challenge: "Cost Overruns",
        solution: "Continuous cloud cost optimization audits and resource limit enforcement."
      }
    ],
    workflow: [
      {
        title: "Assessment",
        description: "Evaluating workload readiness, data gravity, and compliance mandates."
      },
      {
        title: "Design",
        description: "Mapping cloud architectures, VPCs, and hybrid gateway connectivity."
      },
      {
        title: "Implementation",
        description: "Provisioning Azure/AWS resources and migrating live application data."
      },
      {
        title: "Testing",
        description: "Validating cloud load balancers, auto-scaling groups, and data integrity."
      },
      {
        title: "Optimization",
        description: "Right-sizing instances and applying reserved instance billing models."
      },
      {
        title: "Support",
        description: "24/7 cloud environment monitoring and proactive resource scaling."
      }
    ],
    relatedServices: ["data_center", "software_solutions", "network_security"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    order: 3
  },
  {
    key: "software_solutions",
    icon: "Code",
    title: "Software Solutions",
    description: "Custom enterprise software design, secure middleware integration, service API platforms, and system automation scripts.",
    heroValueProp: "Developing custom enterprise platforms and secure integrations that drive operational efficiency.",
    visualIntro: {
      title: "Custom Enterprise Engineering",
      description: "Our software engineering teams design, build, and integrate custom middleware, ERP portals, and automated scripts tailored to the unique business logic of our enterprise clients.",
      objectives: [
        "Develop custom secure enterprise portals and middleware",
        "Architect RESTful and GraphQL API integration gateways",
        "Modernize legacy applications into containerized microservices"
      ],
      businessValue: "Abolish manual operational bottlenecks and achieve seamless data synchronization between isolated corporate systems."
    },
    challenges: [
      {
        challenge: "System Silos",
        solution: "Secure API middleware connecting legacy and modern platforms."
      },
      {
        challenge: "Manual Processes",
        solution: "Automated script-based workflows tailored to local business logic."
      },
      {
        challenge: "Outdated Interfaces",
        solution: "Modernizing legacy terminal apps into responsive web interfaces."
      }
    ],
    workflow: [
      {
        title: "Assessment",
        description: "Deep-dive business analysis, requirement gathering, and process mapping."
      },
      {
        title: "Design",
        description: "Creating UI/UX wireframes, database schemas, and API architectures."
      },
      {
        title: "Implementation",
        description: "Agile software development using Vue.js, Node.js, and enterprise SQL."
      },
      {
        title: "Testing",
        description: "Automated unit testing, QA cycles, and user acceptance testing (UAT)."
      },
      {
        title: "Optimization",
        description: "Database indexing, code profiling, and container optimization."
      },
      {
        title: "Support",
        description: "Ongoing feature enhancements, bug fixes, and version upgrades."
      }
    ],
    relatedServices: ["cloud_services", "data_center", "network_security"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    order: 4
  },
  {
    key: "technical_support",
    icon: "PhoneCall",
    title: "Technical Support & SLA",
    description: "24/7/365 dedicated network operations center (NOC), prioritized incident responses, and structured preventive hardware audits.",
    heroValueProp: "Ensuring continuous operational readiness with proactive 24/7/365 infrastructure management.",
    visualIntro: {
      title: "Proactive Managed Services",
      description: "We act as an extension of your IT department, providing dedicated Network Operations Center (NOC) capabilities, rapid incident response, and rigorous preventive maintenance schedules.",
      objectives: [
        "Provide 24/7/365 NOC monitoring and alert resolution",
        "Execute automated patch management and system updates",
        "Perform routine preventive hardware health audits"
      ],
      businessValue: "Minimize the risk of catastrophic system failures and extend the operational lifecycle of your expensive data center hardware investments."
    },
    challenges: [
      {
        challenge: "Unpredictable Outages",
        solution: "Proactive Zabbix & Nagios monitoring for early error detection."
      },
      {
        challenge: "Hardware Failures",
        solution: "Strict SLA-backed hardware maintenance and rapid part swapping."
      },
      {
        challenge: "Security Vulnerabilities",
        solution: "Automated, scheduled application of critical security patches."
      }
    ],
    workflow: [
      {
        title: "Assessment",
        description: "Inventory auditing and establishing baseline performance metrics."
      },
      {
        title: "Design",
        description: "Structuring customized Service Level Agreements (SLAs) and escalation matrices."
      },
      {
        title: "Implementation",
        description: "Deploying secure NOC monitoring agents and remote access SSH tunnels."
      },
      {
        title: "Testing",
        description: "Simulating critical alerts and verifying Helpdesk reaction parameters."
      },
      {
        title: "Optimization",
        description: "Refining alert thresholds to eliminate notification fatigue."
      },
      {
        title: "Support",
        description: "Continuous round-the-clock administration, troubleshooting, and reporting."
      }
    ],
    relatedServices: ["network_infrastructure", "data_center", "network_security"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    order: 5
  }
];

export async function migrateServices() {
  console.log("Starting services migration...");
  try {
    const existing = await api.getAll('services');
    if (existing.length > 0) {
      console.log("Services collection already has data. Aborting migration.");
      return;
    }
    
    for (const service of servicesData) {
      await api.create('services', service);
      console.log(`Created service: ${service.title}`);
    }
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}
