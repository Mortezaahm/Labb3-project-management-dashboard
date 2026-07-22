'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQProps {
    question: string
    answer: string
    id: number
}

const faqs = [
    {
        question: 'What is TaskFlow?',
        answer: 'TaskFlow is a project management tool that helps you organize your projects and deadlines in one place.'
    },
    {
        question: 'Is TaskFlow free?',
        answer: 'TaskFlow is free to use, and will always remain free.'
    },
    {
        question: 'How does TaskFlow work? ',
        answer: 'TaskFlow does not require any setup or configuration. Just sign up with your free account and start managing your projects in no time.'
    }
]

export function FAQ({ question, answer, id }: FAQProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const answerId = `faq-answer-${id}`

    return (
        <div className="border border-gray-300 rounded-lg p-4 my-2 shadow-md">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="flex items-center justify-between w-full cursor-pointer overflow-hidden"
            >
                <span className="font-bold text-left">{question}</span>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            {isOpen && (
                <p
                    id={answerId}
                    className="text-gray-600 mt-3 dark:text-gray-300 break-words"
                >
                    {answer}
                </p>
            )}
        </div>
    )
}

export function FAQSection() {
    return (
        <section className="container mx-auto px-4 py-24 max-w-3xl">
            <h3 className="flex font-bold text-3xl mb-6 text-blue-900 items-center justify-center dark:text-white">
                Frequently asked questions
            </h3>
            {faqs.map((faq, index) => (
                <FAQ
                    key={index}
                    id={index}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </section>
    )
}
