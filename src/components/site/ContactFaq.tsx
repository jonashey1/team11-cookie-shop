
import Link from 'next/link'
import { ChevronDown, HelpCircle, Mail } from 'lucide-react'


const faqSections = [
  {
    title: 'Our Cookies',
    questions: [
      {
        question: 'What is Cookie Shop?',
        answer:
          'Cookie Shop is a fictional online cookie store created by Team 11 at Ghent University as part of a web development project.',
      },
      {
        question: 'What types of cookies can I discover?',
        answer:
          'You can explore our cookie selection and discover different flavours on the Our Cookies page.',
      },
      {
        question: 'Where can I find more information about a cookie?',
        answer:
          'Visit the Our Cookies page to browse the available information about our cookies.',
      },
      {
        question: 'Can I compare cookies before choosing?',
        answer:
          'Yes. On the Our Cookies page, choose Compare cookies to jump to the comparison section and review the available cookies side by side.',
      },
    ],
  },
  {
    title: 'Ingredients & Allergens',
    questions: [
      {
        question: 'Do your cookies contain allergens?',
        answer:
          'Cookies may contain common allergens such as wheat, milk, eggs, nuts or soy. Always check the available ingredient information. This educational website does not guarantee that any product is allergen-free.',
      },
      {
        question: 'Are vegan or gluten-free cookies available?',
        answer:
          'Availability depends on the cookies listed on our website. We do not currently guarantee vegan or gluten-free options.',
      },
      {
        question: 'Where do your ingredients come from?',
        answer:
           'We believe that exceptional cookies start with exceptional ingredients. Our chocolate is inspired by the rich tradition of Belgian chocolate-making, known worldwide for its smooth texture and refined flavour. Sugar comes from sugar cane or sugar beets, while our flour is made from carefully selected wheat. Every ingredient plays an important role in creating the perfect balance of flavour, texture and indulgence.',
},
    ],
  },
  {
    title: 'Ordering',
    questions: [
      {
        question: 'Can I order cookies online?',
        answer:
          'You can place a fictional test order on the Order Cookies page. No payment is accepted and no products are shipped.',
      },
      {
        question: 'Can I pay for cookies through the website?',
        answer:
          'Cookie Shop is a fictional educational project. The website does not currently offer real commercial purchases or payments.',
      },
      {
        question: 'Can I change or cancel an order?',
        answer:
          'Real customer orders are not currently supported. Any ordering functionality is intended for demonstration and testing as part of the project.',
      },
    ],
  },
  {
    title: 'About the Project',
    questions: [
      {
        question: 'Who created this website?',
        answer:
          'Cookie Shop was developed by Team 11, a group of students at Ghent University.',
      },
      {
        question: 'Why was this website created?',
        answer:
          'This website was created to practise web development, user experience, accessibility and teamwork.',
      },
    ],
  },
]

export function ContactFaq() {
  return (
    <div className="py-section">
      <div className="mx-auto max-w-4xl">
        <div className="boutique-page-title mb-section border-y border-line p-6 sm:p-block">
          <div className="mb-5 inline-flex items-center gap-2 boutique-kicker">
            <HelpCircle aria-hidden="true" className="size-5" />
            We&apos;re here to help
          </div>

          <h2 className="mb-5 text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl text-lg text-ink-soft">
            Curious about our cookies or our website?
            Find answers to the most common questions below.
          </p>
        </div>

        <div className="space-y-section">
          {faqSections.map((section) => (
            <section key={section.title}>
              <h3 className="mb-5 text-2xl">
                {section.title}
              </h3>

              <div className="space-y-4">
                {section.questions.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-frame border border-line bg-canvas transition-colors open:border-ink open:bg-blue-tint"
                  >
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-frame px-5 py-4 font-bold text-ink hover:bg-yellow-wash [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>

                      <ChevronDown
                        aria-hidden="true"
                        className="size-5 shrink-0 transition-transform group-open:rotate-180"
                      />
                    </summary>

                    <div className="border-t border-line px-5 py-5 text-ink-soft">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-section rounded-panel border border-line bg-yellow-wash p-6 text-center md:p-block">
          <Mail
            aria-hidden="true"
            className="mx-auto mb-4 size-8 text-ink"
          />

          <h3 className="mb-3 text-2xl">
            Still have a question?
          </h3>

          <p className="mb-6 text-ink-soft">
            Didn&apos;t find the answer you were looking for?
            Visit our contact page.
          </p>

          <Link
            href="#get-in-touch"
            className="inline-flex min-h-11 items-center justify-center rounded-control border-2 border-ink bg-canvas px-6 py-3 font-bold text-ink no-underline hover:bg-yellow-tint"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  )
}
