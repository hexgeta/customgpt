import type { Metadata } from 'next'
import BlogPost from '../components/BlogPost'

export const metadata: Metadata = {
  title: 'AIMA Family Reunification: Complete Guide to Bringing Your Family to Portugal',
  description: 'Step-by-step guide to the AIMA family reunification process, including eligibility requirements, required documents, and timeline expectations.',
  openGraph: {
    title: 'AIMA Family Reunification: Complete Guide to Bringing Your Family to Portugal',
    description: 'Step-by-step guide to the AIMA family reunification process, including eligibility requirements, required documents, and timeline expectations.',
    type: 'article',
    publishedTime: '2024-02-04T00:00:00.000Z',
    authors: ['Miguel Pires'],
  },
}

export default function FamilyReunificationGuide() {
  const content = (
    <>
      <h2>Understanding Family Reunification in Portugal</h2>
      <p>
        Family reunification allows legal residents in Portugal to bring their 
        immediate family members to live with them. This comprehensive guide explains 
        the process, requirements, and steps involved.
      </p>

      <h2>Eligibility Requirements</h2>
      <p>
        To qualify for family reunification, you must meet these criteria:
      </p>
      <ul>
        <li><strong>Legal Residence:</strong> Valid residence permit in Portugal</li>
        <li><strong>Stable Income:</strong> Sufficient financial means to support family</li>
        <li><strong>Adequate Housing:</strong> Suitable accommodation for family size</li>
        <li><strong>Clean Record:</strong> No criminal convictions</li>
      </ul>

      <h2>Eligible Family Members</h2>
      <p>
        You can apply to bring these family members:
      </p>
      <ul>
        <li><strong>Spouse/Partner:</strong> Married or in a registered partnership</li>
        <li><strong>Children:</strong> Under 18 or dependent</li>
        <li><strong>Parents:</strong> If dependent on you</li>
        <li><strong>Minor Siblings:</strong> Under your legal guardianship</li>
      </ul>

      <h2>Required Documents</h2>
      <p>
        Prepare these essential documents:
      </p>
      <ol>
        <li><strong>Sponsor's Documents:</strong>
          <ul>
            <li>Valid residence permit</li>
            <li>Proof of income</li>
            <li>Housing documentation</li>
            <li>Criminal record certificate</li>
          </ul>
        </li>
        <li><strong>Family Member's Documents:</strong>
          <ul>
            <li>Valid passports</li>
            <li>Birth certificates</li>
            <li>Marriage certificate (if applicable)</li>
            <li>Medical certificates</li>
          </ul>
        </li>
      </ol>

      <h2>Application Process</h2>
      <p>
        Follow these steps to apply for family reunification:
      </p>
      <ol>
        <li>Gather all required documents</li>
        <li>Schedule AIMA appointment</li>
        <li>Submit application and pay fees</li>
        <li>Wait for processing</li>
        <li>Receive decision</li>
        <li>Apply for family member's residence permit</li>
      </ol>

      <h2>Processing Times and Fees</h2>
      <div className="space-y-4">
        <div>
          <h3>Processing Duration</h3>
          <p>
            Average processing time is 3-6 months, depending on case complexity and 
            AIMA workload.
          </p>
        </div>
        
        <div>
          <h3>Application Fees</h3>
          <p>
            Current fees include:
          </p>
          <ul>
            <li>Application fee: €83 per family member</li>
            <li>Residence permit fee: €72 per person</li>
            <li>Document legalization costs</li>
          </ul>
        </div>
      </div>

      <h2>Common Challenges and Solutions</h2>
      <ul>
        <li><strong>Document Issues:</strong>
          <ul>
            <li>Ensure all documents are properly legalized</li>
            <li>Use certified translations</li>
            <li>Check document validity periods</li>
          </ul>
        </li>
        <li><strong>Financial Requirements:</strong>
          <ul>
            <li>Maintain consistent income</li>
            <li>Keep updated bank statements</li>
            <li>Document all financial resources</li>
          </ul>
        </li>
      </ul>

      <h2>After Approval</h2>
      <p>
        Once approved, follow these steps:
      </p>
      <ol>
        <li>Family members enter Portugal with appropriate visa</li>
        <li>Schedule SEF appointment for residence permit</li>
        <li>Register with local authorities</li>
        <li>Apply for NIF and Social Security numbers</li>
        <li>Enroll in healthcare system</li>
      </ol>

      <h2>FAQs About Family Reunification</h2>
      <div className="space-y-4">
        <div>
          <h3>Can I work while waiting for reunification?</h3>
          <p>
            Yes, you can continue working as long as your residence permit is valid.
          </p>
        </div>
        
        <div>
          <h3>What if my application is denied?</h3>
          <p>
            You can appeal the decision within 15 days or reapply with additional 
            documentation.
          </p>
        </div>
        
        <div>
          <h3>Can family members work in Portugal?</h3>
          <p>
            Yes, once they receive their residence permit, they can work without 
            restrictions.
          </p>
        </div>
      </div>

      <h2>Tips for Success</h2>
      <ul>
        <li>Start gathering documents early</li>
        <li>Maintain clear communication with AIMA</li>
        <li>Keep copies of all submissions</li>
        <li>Follow up regularly on application status</li>
        <li>Consider legal assistance for complex cases</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        While the family reunification process can be complex, proper preparation 
        and understanding of the requirements can lead to a successful outcome. 
        Stay organized, be patient, and don't hesitate to seek professional help 
        if needed.
      </p>
    </>
  )

  return (
    <BlogPost
      title="AIMA Family Reunification: Complete Guide to Bringing Your Family to Portugal"
      description="Step-by-step guide to the AIMA family reunification process, including eligibility requirements, required documents, and timeline expectations."
      date="2024-02-04"
      author="Miguel Pires"
      content={content}
      category="Immigration"
      estimatedReadTime={15}
      image={{
        src: "/bg5.jpg",
        alt: "Family at Portuguese immigration office"
      }}
    />
  )
} 