import type { Metadata } from 'next'
import BlogPost from '../components/BlogPost'

export const metadata: Metadata = {
  title: 'How to Reschedule Your AIMA Appointment: A Complete Guide',
  description: 'Step-by-step guide on rescheduling AIMA appointments, including when to reschedule, how to do it properly, and what to do if you miss your appointment.',
  openGraph: {
    title: 'How to Reschedule Your AIMA Appointment: A Complete Guide',
    description: 'Step-by-step guide on rescheduling AIMA appointments, including when to reschedule, how to do it properly, and what to do if you miss your appointment.',
    type: 'article',
    publishedTime: '2024-02-04T00:00:00.000Z',
    authors: ['Miguel Pires'],
  },
}

export default function ReschedulingGuide() {
  const content = (
    <>
      <h2>When to Consider Rescheduling</h2>
      <p>
        There are several valid reasons to reschedule your AIMA appointment. Understanding 
        when it's appropriate can help you make the right decision for your situation.
      </p>

      <h3>Valid Reasons for Rescheduling</h3>
      <ul>
        <li><strong>Medical Emergencies:</strong> Illness or medical procedures</li>
        <li><strong>Travel Conflicts:</strong> Pre-booked essential travel</li>
        <li><strong>Document Issues:</strong> Missing required documents</li>
        <li><strong>Work Commitments:</strong> Critical work obligations</li>
        <li><strong>Family Emergencies:</strong> Urgent family matters</li>
      </ul>

      <h2>How to Reschedule Your Appointment</h2>
      <p>
        Follow these steps to properly reschedule your AIMA appointment:
      </p>
      <ol>
        <li><strong>Check Rescheduling Window:</strong>
          <ul>
            <li>Minimum 48 hours before appointment</li>
            <li>Maximum 2 weeks before appointment</li>
            <li>Check specific rules for your appointment type</li>
          </ul>
        </li>
        <li><strong>Gather Required Information:</strong>
          <ul>
            <li>Original appointment reference number</li>
            <li>Personal identification details</li>
            <li>Reason for rescheduling</li>
          </ul>
        </li>
        <li><strong>Submit Rescheduling Request:</strong>
          <ul>
            <li>Online through AIMA portal</li>
            <li>Email request with documentation</li>
            <li>Phone call with reference number</li>
          </ul>
        </li>
      </ol>

      <h2>Common Rescheduling Mistakes to Avoid</h2>
      <ul>
        <li>Waiting until the last minute to reschedule</li>
        <li>Not providing proper documentation</li>
        <li>Missing the rescheduling window</li>
        <li>Not confirming the new appointment</li>
        <li>Failing to notify AIMA of changes</li>
      </ul>

      <h2>What to Do If You Miss Your Appointment</h2>
      <p>
        If you miss your appointment, take these immediate steps:
      </p>
      <ol>
        <li>Contact AIMA as soon as possible</li>
        <li>Provide documentation for the absence</li>
        <li>Request a new appointment</li>
        <li>Follow up regularly</li>
      </ol>

      <h2>FAQs About Rescheduling</h2>
      <div className="space-y-4">
        <div>
          <h3>How many times can I reschedule?</h3>
          <p>
            Typically, you can reschedule up to 2 times within a 6-month period. 
            Additional reschedules may require special approval.
          </p>
        </div>
        
        <div>
          <h3>What if I need to reschedule last minute?</h3>
          <p>
            For last-minute emergencies, contact AIMA immediately and provide 
            documentation of the emergency situation.
          </p>
        </div>
        
        <div>
          <h3>Will rescheduling affect my application?</h3>
          <p>
            Properly rescheduled appointments won't negatively impact your application, 
            but frequent rescheduling might raise concerns.
          </p>
        </div>
      </div>

      <h2>Tips for Successful Rescheduling</h2>
      <ul>
        <li>Plan ahead and reschedule early when possible</li>
        <li>Keep all communication records</li>
        <li>Confirm new appointment details</li>
        <li>Set reminders for the new appointment</li>
        <li>Prepare all required documents in advance</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        While rescheduling AIMA appointments should be avoided when possible, 
        understanding the proper process can help you handle necessary changes 
        smoothly. Always maintain clear communication with AIMA and keep detailed 
        records of all interactions.
      </p>
    </>
  )

  return (
    <BlogPost
      title="How to Reschedule Your AIMA Appointment: A Complete Guide"
      description="Step-by-step guide on rescheduling AIMA appointments, including when to reschedule, how to do it properly, and what to do if you miss your appointment."
      date="2024-02-04"
      author="Miguel Pires"
      content={content}
      category="Immigration"
      estimatedReadTime={10}
      image={{
        src: "/bg3.jpg",
        alt: "AIMA appointment calendar and documents"
      }}
    />
  )
} 