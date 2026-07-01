export const servicesList = [
  {
    key: 'network_infrastructure',
    title: 'Network Infrastructure',
    icon: 'Network',
    description: 'High-performance enterprise networking, fiber backbones, multi-site SD-WAN deployments, and resilient switching architectures.',
    image: '/images/services/network-infrastructure-hero.jpg',
    heroValueProp: 'Protecting and connecting critical enterprise infrastructure through advanced high-performance networking architectures.',
    visualIntro: {
      title: 'Enterprise Networking Solutions',
      description: 'Our network infrastructure solutions form the robust backbone of modern enterprise operations, ensuring secure, high-speed, and reliable data flow across diverse regional environments.',
      objectives: [
        'Deploy resilient fiber backbones and switching architectures',
        'Orchestrate multi-site SD-WAN for optimized global routing',
        'Implement high-density wireless environments for large campuses'
      ],
      businessValue: 'Eliminate communication bottlenecks and reduce network downtime, ensuring your workforce and applications remain connected at sub-millisecond latency.'
    },
    challenges: [
      { challenge: 'Network Downtime & Outages', solution: 'High Availability Core Architectures with automatic failover.' },
      { challenge: 'Multi-site Management', solution: 'Enterprise SD-WAN providing centralized orchestration and optimization.' },
      { challenge: 'Legacy Bottlenecks', solution: 'High-throughput fiber ring layouts and modern Cisco/Dell switching.' }
    ],
    workflow: [
      { title: 'Assessment', description: 'Thorough analysis of existing traffic loads, physical cabling, and future scalability requirements.' },
      { title: 'Design', description: 'Engineering redundant core, distribution, and access layer topologies.' },
      { title: 'Implementation', description: 'Deployment of structured cabling, active switching components, and wireless access points.' },
      { title: 'Testing', description: 'Rigorous failover simulations, throughput testing, and latency verification.' },
      { title: 'Optimization', description: 'Fine-tuning Quality of Service (QoS) and traffic prioritization rules.' },
      { title: 'Support', description: '24/7/365 proactive monitoring and configuration management.' }
    ],
    relatedServices: ['network_security', 'data_center', 'technical_support'],
    order: 1
  },
  {
    key: 'network_security',
    title: 'Network Security',
    icon: 'ShieldCheck',
    description: 'Next-Gen firewalls, intrusion prevention systems, zero-trust access, security monitoring, and continuous threat mitigation.',
    image: '/images/services/network-security-hero.jpg',
    heroValueProp: 'Safeguarding corporate perimeters with Next-Gen threat mitigation and zero-trust architectures.',
    visualIntro: {
      title: 'Advanced Threat Defense',
      description: 'In an era of sophisticated cyber threats, we deploy comprehensive security fabrics that protect sensitive corporate assets without compromising operational agility.',
      objectives: [
        'Enforce Zero-Trust Network Access (ZTNA) policies',
        'Deploy and configure Next-Generation Firewalls (NGFW)',
        'Establish continuous Security Event Monitoring (SIEM)'
      ],
      businessValue: 'Protect your organization\'s reputation and intellectual property by maintaining strict adherence to banking, healthcare, and government security mandates.'
    },
    challenges: [
      { challenge: 'Advanced Cyber Threats', solution: 'Intrusion Prevention Systems (IPS) with AI-driven threat intelligence.' },
      { challenge: 'Remote Workforce Vulnerabilities', solution: 'Zero-Trust architectures and secure IPsec/SSL VPN tunnels.' },
      { challenge: 'Compliance Requirements', solution: 'Strict adherence to PCI-DSS, HIPAA, and ISO 27001 standards.' }
    ],
    workflow: [
      { title: 'Assessment', description: 'Comprehensive vulnerability scanning and penetration testing of existing perimeters.' },
      { title: 'Design', description: 'Architecting defense-in-depth frameworks and strict segmentation zones.' },
      { title: 'Implementation', description: 'Deploying Fortinet, Palo Alto Networks, or Hillstone NGFW appliances.' },
      { title: 'Testing', description: 'Simulating intrusion attempts and verifying zero-trust policy enforcement.' },
      { title: 'Optimization', description: 'Tuning firewall rules, web filters, and application control heuristics.' },
      { title: 'Support', description: 'Continuous threat hunting, signature updates, and security patching.' }
    ],
    relatedServices: ['network_infrastructure', 'cloud_services', 'technical_support'],
    order: 2
  },
  {
    key: 'data_center',
    title: 'Data Center Solutions',
    icon: 'Database',
    description: 'Hyperconverged systems, server virtualization, high-availability storage arrays, disaster recovery vaults, and cooling control.',
    image: '/images/services/data-center-hero.jpg',
    heroValueProp: 'Engineering hyperconverged environments and robust storage systems for mission-critical applications.',
    visualIntro: {
      title: 'Modern Data Center Engineering',
      description: 'We build highly available, scalable, and secure data center infrastructures utilizing the latest in server virtualization, high-capacity storage arrays, and disaster recovery orchestration.',
      objectives: [
        'Deploy Hyperconverged Infrastructure (HCI) clusters',
        'Configure high-availability Storage Area Networks (SAN)',
        'Implement active-active disaster recovery vaults'
      ],
      businessValue: 'Achieve absolute business continuity with near-zero Recovery Time Objectives (RTO) and lower your physical data center footprint.'
    },
    challenges: [
      { challenge: 'Hardware Sprawl', solution: 'Server Virtualization and Hyperconverged Infrastructure (HCI).' },
      { challenge: 'Data Loss Risks', solution: 'Automated Veeam backups and off-site Disaster Recovery Replication.' },
      { challenge: 'Application Latency', solution: 'High-IOPS Enterprise Storage arrays from Dell and Lenovo.' }
    ],
    workflow: [
      { title: 'Assessment', description: 'Auditing current compute resources, storage IOPS needs, and power loads.' },
      { title: 'Design', description: 'Designing high-availability hypervisor clusters and SAN fabrics.' },
      { title: 'Implementation', description: 'Rack deployment, power distribution, and hypervisor (VMware) installation.' },
      { title: 'Testing', description: 'Live failover testing, backup verification, and thermal simulations.' },
      { title: 'Optimization', description: 'Resource ballooning, storage tiering, and VM consolidation.' },
      { title: 'Support', description: 'Hardware warranty tracking, patch management, and health monitoring.' }
    ],
    relatedServices: ['cloud_services', 'software_solutions', 'technical_support'],
    order: 3
  },
  {
    key: 'cloud_services',
    title: 'Cloud Services',
    icon: 'Cloud',
    description: 'Hybrid cloud hosting, AWS & Azure certified migrations, secure private clouds, and ongoing infrastructure cost optimization.',
    image: '/images/services/cloud-services-hero.jpg',
    heroValueProp: 'Accelerating digital transformation with scalable, secure, and optimized hybrid cloud deployments.',
    visualIntro: {
      title: 'Hybrid Cloud Ecosystems',
      description: 'We architect and migrate complex enterprise workloads to hybrid and private cloud environments, ensuring limitless scalability while maintaining strict cost optimization controls.',
      objectives: [
        'Automate secure migrations to AWS and Microsoft Azure',
        'Build dedicated, highly compliant private cloud hosts',
        'Orchestrate Docker and Kubernetes container deployments'
      ],
      businessValue: 'Unlock infinite processing flexibility and transition to transparent, pay-as-you-use pricing models without sacrificing data sovereignty.'
    },
    challenges: [
      { challenge: 'Scalability Constraints', solution: 'Elastic cloud compute instances that scale dynamically with demand.' },
      { challenge: 'Migration Complexities', solution: 'Automated, zero-downtime workload migration strategies.' },
      { challenge: 'Cost Overruns', solution: 'Continuous cloud cost optimization audits and resource limit enforcement.' }
    ],
    workflow: [
      { title: 'Assessment', description: 'Evaluating workload readiness, data gravity, and compliance mandates.' },
      { title: 'Design', description: 'Mapping cloud architectures, VPCs, and hybrid gateway connectivity.' },
      { title: 'Implementation', description: 'Provisioning Azure/AWS resources and migrating live application data.' },
      { title: 'Testing', description: 'Validating cloud load balancers, auto-scaling groups, and data integrity.' },
      { title: 'Optimization', description: 'Right-sizing instances and applying reserved instance billing models.' },
      { title: 'Support', description: '24/7 cloud environment monitoring and proactive resource scaling.' }
    ],
    relatedServices: ['data_center', 'software_solutions', 'network_security'],
    order: 4
  },
  {
    key: 'software_solutions',
    title: 'Software Solutions',
    icon: 'Code',
    description: 'Custom enterprise software design, secure middleware integration, service API platforms, and system automation scripts.',
    image: '/images/services/software-solutions-hero.jpg',
    heroValueProp: 'Developing custom enterprise platforms and secure integrations that drive operational efficiency.',
    visualIntro: {
      title: 'Custom Enterprise Engineering',
      description: 'Our software engineering teams design, build, and integrate custom middleware, ERP portals, and automated scripts tailored to the unique business logic of our enterprise clients.',
      objectives: [
        'Develop custom secure enterprise portals and middleware',
        'Architect RESTful and GraphQL API integration gateways',
        'Modernize legacy applications into containerized microservices'
      ],
      businessValue: 'Abolish manual operational bottlenecks and achieve seamless data synchronization between isolated corporate systems.'
    },
    challenges: [
      { challenge: 'System Silos', solution: 'Secure API middleware connecting legacy and modern platforms.' },
      { challenge: 'Manual Processes', solution: 'Automated script-based workflows tailored to local business logic.' },
      { challenge: 'Outdated Interfaces', solution: 'Modernizing legacy terminal apps into responsive web interfaces.' }
    ],
    workflow: [
      { title: 'Assessment', description: 'Deep-dive business analysis, requirement gathering, and process mapping.' },
      { title: 'Design', description: 'Creating UI/UX wireframes, database schemas, and API architectures.' },
      { title: 'Implementation', description: 'Agile software development using Vue.js, Node.js, and enterprise SQL.' },
      { title: 'Testing', description: 'Automated unit testing, QA cycles, and user acceptance testing (UAT).' },
      { title: 'Optimization', description: 'Database indexing, code profiling, and container optimization.' },
      { title: 'Support', description: 'Ongoing feature enhancements, bug fixes, and version upgrades.' }
    ],
    relatedServices: ['cloud_services', 'data_center', 'network_security'],
    order: 5
  },
  {
    key: 'technical_support',
    title: 'Technical Support & SLA',
    icon: 'Headset',
    description: '24/7/365 dedicated network operations center (NOC), prioritized incident responses, and structured preventive hardware audits.',
    image: '/images/services/technical-support-hero.jpg',
    heroValueProp: 'Ensuring continuous operational readiness with proactive 24/7/365 infrastructure management.',
    visualIntro: {
      title: 'Proactive Managed Services',
      description: 'We act as an extension of your IT department, providing dedicated Network Operations Center (NOC) capabilities, rapid incident response, and rigorous preventive maintenance schedules.',
      objectives: [
        'Provide 24/7/365 NOC monitoring and alert resolution',
        'Execute automated patch management and system updates',
        'Perform routine preventive hardware health audits'
      ],
      businessValue: 'Minimize the risk of catastrophic system failures and extend the operational lifecycle of your expensive data center hardware investments.'
    },
    challenges: [
      { challenge: 'Unpredictable Outages', solution: 'Proactive Zabbix & Nagios monitoring for early error detection.' },
      { challenge: 'Hardware Failures', solution: 'Strict SLA-backed hardware maintenance and rapid part swapping.' },
      { challenge: 'Security Vulnerabilities', solution: 'Automated, scheduled application of critical security patches.' }
    ],
    workflow: [
      { title: 'Assessment', description: 'Inventory auditing and establishing baseline performance metrics.' },
      { title: 'Design', description: 'Structuring customized Service Level Agreements (SLAs) and escalation matrices.' },
      { title: 'Implementation', description: 'Deploying secure NOC monitoring agents and remote access SSH tunnels.' },
      { title: 'Testing', description: 'Simulating critical alerts and verifying Helpdesk reaction parameters.' },
      { title: 'Optimization', description: 'Refining alert thresholds to eliminate notification fatigue.' },
      { title: 'Support', description: 'Continuous round-the-clock administration, troubleshooting, and reporting.' }
    ],
    relatedServices: ['network_infrastructure', 'data_center', 'network_security'],
    order: 6
  }
];
