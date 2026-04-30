import React, { useState } from "react";
import { MdArrowOutward, MdKeyboardArrowDown } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/Hook/useAuth";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [message, setMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();
  const { handleSendMessage } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const success = handleSendMessage({
      message,
      email,
      fullname,
      orderNumber,
    });
    if (success) {
      setMessage("");
      setEmail("");
      setFullname("");
      setOrderNumber("");
    }
  }

  const faqs = [
    {
      id: 1,
      num: "01",
      question: "What is your return policy?",
      answer:
        "We accept returns within 14 days of delivery for unworn items in their original packaging with all tags attached.",
    },
    {
      id: 2,
      num: "02",
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express delivery is available at checkout for next-day arrival.",
    },
    {
      id: 3,
      num: "03",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship globally. International shipping rates and times vary depending on the destination.",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen overflow-hidden selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 w-full px-6 md:px-12 py-4 flex justify-between items-center bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <FiArrowLeft size={18} /> Back
        </button>
        <div className="hidden md:block">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
            Customer Support
          </span>
        </div>
      </div>

      {/* Header Section */}
      <div className="w-full pt-16 md:pt-24 pb-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--border-color)]">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-secondary)] mb-4">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 md:mb-0">
            Contact Us.
          </h1>
        </div>
        <div className="max-w-xs text-left md:text-right">
          <p className="text-sm font-medium tracking-wide text-[var(--text-secondary)]">
            We are here to help. Reach out to us for any questions regarding
            your orders, returns, or our products.
          </p>
        </div>
      </div>

      {/* Main Layout Split */}
      <div className="w-full px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-20 max-w-[1600px] mx-auto">
        {/* LEFT: Contact Form */}
        <div className="w-full lg:w-7/12 flex flex-col gap-10">
          <div className="flex items-center justify-between border-b-2 border-[var(--text-primary)] pb-4 mb-4">
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Send a Message
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] hidden sm:block">
              We typically reply within 24 hours
            </span>
          </div>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-500">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full bg-transparent py-4 text-xl md:text-2xl font-light outline-none placeholder:text-[var(--text-secondary)]/40 tracking-wide peer"
                placeholder="Full Name *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-700 ease-out"></div>
            </div>

            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-500">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-4 text-xl md:text-2xl font-light outline-none placeholder:text-[var(--text-secondary)]/40 tracking-wide peer"
                placeholder="Email Address *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-700 ease-out"></div>
            </div>

            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-500">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full bg-transparent py-4 text-xl md:text-2xl font-light outline-none placeholder:text-[var(--text-secondary)]/40 tracking-wide peer"
                placeholder="Order Number (Optional)"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-700 ease-out"></div>
            </div>

            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-500 mt-4">
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent py-4 text-xl md:text-2xl font-light outline-none placeholder:text-[var(--text-secondary)]/40 tracking-wide resize-none peer"
                placeholder="How can we help you? *"
                required
              ></textarea>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-700 ease-out"></div>
            </div>

            <button className="group relative w-full md:w-auto bg-[var(--text-primary)] text-[var(--bg-primary)] px-12 py-5 overflow-hidden mt-6 flex items-center justify-between md:justify-center gap-6 border border-[var(--text-primary)]">
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest group-hover:text-[var(--text-primary)] transition-colors duration-500">
                Send Message
              </span>
              <MdArrowOutward className="relative z-10 text-xl group-hover:text-[var(--text-primary)] group-hover:rotate-45 transition-all duration-500" />
              <div className="absolute inset-0 bg-[var(--bg-primary)] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>
            </button>
          </form>
        </div>

        {/* RIGHT: Contact Info & FAQ */}
        <div className="w-full lg:w-5/12 flex flex-col gap-16 lg:pt-16">
          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Email Us
              </h3>
              <p className="text-lg font-medium tracking-wide cursor-pointer hover:underline underline-offset-4">
                support@snitch.com
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Call Us
              </h3>
              <p className="text-lg font-medium tracking-wide cursor-pointer hover:underline underline-offset-4">
                +91 98765 43210
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-6 border-b border-[var(--border-color)] pb-4">
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border-b border-[var(--border-color)] group"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-6 flex justify-between items-center focus:outline-none"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold text-[var(--text-secondary)] opacity-50 font-mono">
                        {faq.num}
                      </span>
                      <span
                        className={`text-base font-medium tracking-wide text-left transition-colors ${openFaq === faq.id ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`transform transition-transform duration-500 ${openFaq === faq.id ? "rotate-180" : "rotate-0"}`}
                    >
                      <MdKeyboardArrowDown className="text-2xl text-[var(--text-secondary)]" />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
                      openFaq === faq.id
                        ? "max-h-40 opacity-100 pb-8"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed pl-12 pr-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
