import type { Metadata } from 'next'
import BlogPost from '../components/BlogPost'

export const metadata: Metadata = {
  title: 'AIMA Document Checklist: Everything You Need for Your Appointment',
  description: 'Comprehensive checklist of all required documents for AIMA appointments, including visa applications, residence permits, and family reunification processes.',
  openGraph: {
    title: 'AIMA Document Checklist: Everything You Need for Your Appointment',
    description: 'Comprehensive checklist of all required documents for AIMA appointments, including visa applications, residence permits, and family reunification processes.',
    type: 'article',
    publishedTime: '2024-02-04T00:00:00.000Z',
    authors: ['Miguel Pires'],
  },
}

export default function DocumentChecklist() {
  const content = (
    <>
      <h2>Essential Documents for All AIMA Appointments</h2>
      <p>
        These documents are required for all types of AIMA appointments:
      </p>
      <ul>
        <li><strong>Valid Passport:</strong> With at least 6 months validity</li>
        <li><strong>Current Visa/Residence Permit:</strong> If applicable</li>
        <li><strong>Proof of Address:</strong> Recent utility bill or rental contract</li>
        <li><strong>Passport Photos:</strong> Recent, color, 35x45mm</li>
        <li><strong>Appointment Confirmation:</strong> Printout or digital copy</li>
      </ul>

      <h2>Work Visa Documents</h2>
      <p>
        Additional documents required for work visa applications:
      </p>
      <ul>
        <li><strong>Employment Contract:</strong> Signed by both parties</li>
        <li><strong>Company Registration:</strong> Employer's business documents</li>
        <li><strong>Qualifications:</strong> Professional certificates or diplomas</li>
        <li><strong>Tax Number:</strong> Portuguese NIF</li>
        <li><strong>Social Security Number:</strong> If already obtained</li>
      </ul>

      <h2>Family Reunification Documents</h2>
      <p>
        Required documents for family reunification applications:
      </p>
      <ul>
        <li><strong>Marriage Certificate:</strong> Legalized and translated</li>
        <li><strong>Birth Certificates:</strong> For all family members</li>
        <li><strong>Proof of Relationship:</strong> Photos, communication records</li>
        <li><strong>Financial Support:</strong> Bank statements, employment proof</li>
        <li><strong>Accommodation Proof:</strong> Rental contract or property deed</li>
      </ul>

      <h2>Student Visa Documents</h2>
      <p>
        Documents needed for student visa applications:
      </p>
      <ul>
        <li><strong>Acceptance Letter:</strong> From Portuguese educational institution</li>
        <li><strong>Proof of Enrollment:</strong> Current semester registration</li>
        <li><strong>Financial Means:</strong> Bank statements or scholarship proof</li>
        <li><strong>Health Insurance:</strong> Valid for Portugal</li>
        <li><strong>Academic Records:</strong> Previous education certificates</li>
      </ul>

      <h2>Document Preparation Tips</h2>
      <ol>
        <li><strong>Translation Requirements:</strong>
          <ul>
            <li>All documents must be in Portuguese or English</li>
            <li>Use certified translators when required</li>
            <li>Keep original documents and translations together</li>
          </ul>
        </li>
        <li><strong>Legalization Process:</strong>
          <ul>
            <li>Check if documents need apostille</li>
            <li>Verify embassy legalization requirements</li>
            <li>Allow sufficient time for legalization</li>
          </ul>
        </li>
        <li><strong>Organization:</strong>
          <ul>
            <li>Create separate folders for each document type</li>
            <li>Make copies of all documents</li>
            <li>Keep digital backups</li>
          </ul>
        </li>
      </ol>

      <h2>Common Document Mistakes to Avoid</h2>
      <ul>
        <li>Expired documents or insufficient validity</li>
        <li>Missing translations or legalizations</li>
        <li>Incomplete document sets</li>
        <li>Poor quality photocopies</li>
        <li>Outdated information</li>
      </ul>

      <h2>FAQs About AIMA Documents</h2>
      <div className="space-y-4">
        <div>
          <h3>How recent should my documents be?</h3>
          <p>
            Most documents should be less than 3 months old, with some exceptions 
            for permanent records like birth certificates.
          </p>
        </div>
        
        <div>
          <h3>What if I'm missing a document?</h3>
          <p>
            Contact AIMA immediately to discuss alternatives or request an extension. 
            Some documents might be replaceable with equivalent documentation.
          </p>
        </div>
        
        <div>
          <h3>Do I need to bring original documents?</h3>
          <p>
            Yes, always bring original documents along with copies. AIMA may need to 
            verify the originals.
          </p>
        </div>
      </div>

      <h2>Last-Minute Checklist</h2>
      <p>
        Before your appointment, verify:
      </p>
      <ul>
        <li>All documents are properly organized</li>
        <li>Originals and copies are separated</li>
        <li>Translations are attached to originals</li>
        <li>Documents are in chronological order</li>
        <li>You have extra copies of everything</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Proper document preparation is crucial for a successful AIMA appointment. 
        Take time to gather and organize all required documents well in advance, 
        and don't hesitate to seek professional help if you're unsure about any 
        requirements.
      </p>
    </>
  )

  return (
    <BlogPost
      title="AIMA Document Checklist: Everything You Need for Your Appointment"
      description="Comprehensive checklist of all required documents for AIMA appointments, including visa applications, residence permits, and family reunification processes."
      date="2024-02-04"
      author="Miguel Pires"
      content={content}
      category="Document Checklist"
      estimatedReadTime={12}
      image={{
        src: "/bg4.jpg",
        alt: "Organized immigration documents and checklist"
      }}
    />
  )
} 