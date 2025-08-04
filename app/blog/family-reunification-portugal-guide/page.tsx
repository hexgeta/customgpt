import { Metadata } from 'next'
import BlogPost from '../components/BlogPost'

export const metadata: Metadata = {
  title: 'Family Reunification in Portugal: A Comprehensive Guide to Immigration Procedures',
  description: 'Expert advice on Portuguese immigration law, with a step-by-step guide to AIMA procedures for family reunification in Portugal.',
  openGraph: {
    title: 'Family Reunification in Portugal: A Comprehensive Guide to Immigration Procedures',
    description: 'Expert advice on Portuguese immigration law, with a step-by-step guide to AIMA procedures for family reunification in Portugal.',
  }
}

export default function FamilyReunificationPortugalGuide() {
  const tableOfContents = [
    {
        "title": "Introduction",
        "id": "intro"
    },
    {
        "title": "Family Reunification Laws in Portugal",
        "id": "laws"
    },
    {
        "title": "Eligibility for Family Reunification",
        "id": "eligibility"
    },
    {
        "title": "AIMA Procedures for Family Reunification",
        "id": "aima"
    },
    {
        "title": "Documents Required",
        "id": "docs"
    },
    {
        "title": "Processing Time and Aftermath",
        "id": "process"
    }
]

  return (
    <BlogPost
      title="Family Reunification in Portugal: A Comprehensive Guide to Immigration Procedures"
      description="Expert advice on Portuguese immigration law, with a step-by-step guide to AIMA procedures for family reunification in Portugal."
      date="2025-08-04"
      author="Miguel Pires"
      category="Family Visa"
      estimatedReadTime={10}
      tableOfContents={tableOfContents}
      content={
        <>
          <h1>Family Reunification in Portugal: A Comprehensive Guide to Immigration Procedures</h1><p>Portugal, known for its warm climate, rich culture, and friendly populace, is a popular destination for immigrants from around the globe. If you're seeking to bring your loved ones to join you in Portugal, you're in the right place. This guide will take you through the process of family reunification under Portuguese immigration law and AIMA procedures step by step.</p><h2 id='intro'>Introduction</h2><p>Family reunification in Portugal is governed by the Immigration Act and the regulatory decree of the Immigration Act. The authority responsible for immigration matters is the Immigration and Borders Service (SEF), under the Ministry of Internal Administration (AIMA).</p><h2 id='laws'>Family Reunification Laws in Portugal</h2><p>Under Portuguese law, family reunification is a right granted to legal residents. This includes holders of a residence permit, long-term residents, and beneficiaries of subsidiary protection.</p><h2 id='eligibility'>Eligibility for Family Reunification</h2><p>Family members eligible for reunification include spouses, underage or dependent children, dependent parents, and underage siblings under the legal guardianship of the resident.</p><h2 id='aima'>AIMA Procedures for Family Reunification</h2><p>Family reunification applications must be submitted to the SEF. The application process involves several stages, including an initial application, submission of necessary documentation, evidence of suitable accommodation, and evidence of means of subsistence.</p><h2 id='docs'>Documents Required</h2><p>The required documents include a valid passport, proof of legal residence, evidence of family relationship, housing conditions report, and proof of means of subsistence. The specific documents required may vary depending on the applicant's situation.</p><h2 id='process'>Processing Time and Aftermath</h2><p>Applications are typically processed within three months, but this can vary. Once the application is approved, family members can enter Portugal within four months. They will be granted a residence permit and will have the same rights and obligations as the resident who applied for reunification.</p>
        </>
      }
    />
  )
}