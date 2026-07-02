"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Rocket, Calendar, CheckCircle2, MessageSquare, Phone, Mail, Globe, Cloud, 
  Brain, FileText, Loader2, UploadCloud, AlertCircle,
  MapPin, Clock, MessageCircle
} from "lucide-react";

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
import { submitContactForm } from "@/actions/contact";

const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  industry: z.string().min(1, "Please select an industry"),
  budget: z.string().min(1, "Please select an estimated budget"),
  timeline: z.string().min(1, "Please select an expected timeline"),
  description: z.string().min(20, "Please provide a detailed description (minimum 20 characters)"),
  consent: z.literal(true, {
    message: "You must agree to the privacy policy"
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();
      formData.append("firstName", data.fullName.split(" ")[0]);
      formData.append("lastName", data.fullName.split(" ").slice(1).join(" "));
      formData.append("email", data.email);
      
      const detailedMessage = `
Company: ${data.companyName || "N/A"}
Phone: ${data.phone}
Service: ${data.service}
Industry: ${data.industry}
Budget: ${data.budget}
Timeline: ${data.timeline}

Description:
${data.description}
      `;
      formData.append("message", detailedMessage);

      const result = await submitContactForm(formData);

      if (result?.error) {
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="bg-[#030712] min-h-screen text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00E5FF]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#8B5CF6]/10 blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 pt-32 pb-24 relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* LEFT SIDE - HERO */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full lg:w-1/2 pt-10">
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-space-grotesk font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 leading-tight">
            Let's Build the <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">Future Together</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-6 leading-relaxed">
            Whether you're looking to build an AI-powered application, automate business workflows, develop a modern web platform, or transform your ideas into intelligent digital solutions, our team is ready to help.
          </motion.p>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 mb-10 leading-relaxed">
            Tell us about your project, and our experts will get back to you with the best solution tailored to your business goals.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-10">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] text-white font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2">
              <Rocket size={20} /> Start Your Project
            </button>
            <button className="px-8 py-4 rounded-xl glass border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Calendar size={20} /> Schedule a Free Consultation
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
            {[
              "Free Consultation", "Quick Response", "Custom AI Solutions", "Enterprise-Ready Development"
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={18} className="text-[#00E5FF]" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </motion.div>

          {/* Interactive 3D Contact Illustration (CSS Based) */}
          <motion.div variants={fadeInUp} className="relative w-full h-64 mt-16 perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div animate={{ rotateY: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-40 h-40 transform-style-3d">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#8B5CF6]/20 rounded-full blur-xl" />
                <Brain className="w-full h-full text-[#00E5FF] opacity-80" />
                
                {/* Floating Elements */}
                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-10 -left-10 p-3 glass rounded-2xl border border-white/10 text-[#00E5FF]">
                  <MessageSquare size={24} />
                </motion.div>
                <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-10 -right-10 p-3 glass rounded-2xl border border-white/10 text-[#8B5CF6]">
                  <Globe size={24} />
                </motion.div>
                <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-1/2 -right-16 p-3 glass rounded-2xl border border-white/10 text-[#2563EB]">
                  <Cloud size={24} />
                </motion.div>
                
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] border-2 border-dashed border-[#00E5FF]/30 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[-70px] border border-white/10 rounded-full" />
              </motion.div>
            </div>
          </motion.div>

          {/* NEW SECTION: CONTACT INFORMATION */}
          <motion.div variants={fadeInUp} className="mt-24">
            <div className="mb-10">
              <h2 className="text-3xl font-space-grotesk font-bold mb-3">Get in Touch</h2>
              <p className="text-gray-400">
                Have questions or want to discuss your next AI project? Reach out to us through any of the following channels. We'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Card 1: Email */}
              <div className="glass p-6 rounded-[20px] border border-white/10 hover:border-[#00E5FF]/50 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-sm text-gray-400 mb-3">Send us your inquiries anytime.</p>
                    <p className="font-medium text-[#00E5FF] mb-4">hello@darkcodexai.com</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("hello@darkcodexai.com");
                        showToast("Email address copied to clipboard!");
                      }}
                      className="text-xs font-semibold px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                    >
                      Copy Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Phone */}
              <div className="glass p-6 rounded-[20px] border border-white/10 hover:border-[#2563EB]/50 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-sm text-gray-400 mb-3">Speak directly with our team during business hours.</p>
                    <p className="font-medium text-[#2563EB] mb-4">+91 XXXXX XXXXX</p>
                    <a 
                      href="tel:+910000000000"
                      className="text-xs font-semibold px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 inline-block"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Office */}
              <div className="glass p-6 rounded-[20px] border border-white/10 hover:border-[#8B5CF6]/50 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Office Location</h3>
                    <p className="text-sm text-gray-400 mb-3">DarkCode X AI</p>
                    <p className="font-medium text-[#8B5CF6] mb-4">Coimbatore, Tamil Nadu, India</p>
                    <a 
                      href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu,India" target="_blank" rel="noreferrer"
                      className="text-xs font-semibold px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 inline-block"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Business Hours */}
              <div className="glass p-6 rounded-[20px] border border-white/10 hover:border-white/30 transition-colors group relative overflow-hidden">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Clock size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-4">Business Hours</h3>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between"><span>Monday – Friday</span><span className="text-white">9:00 AM – 6:00 PM (IST)</span></div>
                      <div className="flex justify-between"><span>Saturday</span><span className="text-white">10:00 AM – 2:00 PM</span></div>
                      <div className="flex justify-between"><span>Sunday</span><span className="text-red-400">Closed</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Connect With Us */}
              <div className="glass p-6 rounded-[20px] border border-white/10 hover:border-white/30 transition-colors group relative overflow-hidden">
                <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <LinkedinIcon />, link: "#", name: "LinkedIn" },
                    { icon: <GithubIcon />, link: "#", name: "GitHub" },
                    { icon: <InstagramIcon />, link: "#", name: "Instagram" },
                    { icon: <FacebookIcon />, link: "#", name: "Facebook" },
                    { icon: <TwitterIcon />, link: "#", name: "X (Twitter)" },
                    { icon: <MessageCircle size={20} />, link: "https://wa.me/910000000000", name: "WhatsApp" },
                  ].map((social, i) => (
                    <a 
                      key={i} href={social.link} target="_blank" rel="noreferrer" title={social.name}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_-3px_rgba(0,229,255,0.4)] transition-all hover:-translate-y-1"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - SMART CONTACT FORM */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full lg:w-1/2">
          <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-[0_0_50px_-20px_rgba(139,92,246,0.15)] group hover:border-[#8B5CF6]/30 transition-colors">
            
            <div className="mb-10">
              <h2 className="text-3xl font-space-grotesk font-bold mb-3">Tell Us About Your Project</h2>
              <p className="text-gray-400">Fill out the form below and our team will contact you within 24 hours.</p>
            </div>

            {submitStatus === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 glass bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl text-center">
                <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                <p className="text-gray-300">Your inquiry has been submitted successfully. Our team will contact you within 24 hours.</p>
                <button onClick={() => setSubmitStatus("idle")} className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors">
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* SECTION 1 - Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-[#00E5FF] font-medium text-sm tracking-wider uppercase border-b border-white/10 pb-2">1. Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input type="text" placeholder="Full Name *" className={`w-full bg-white/5 border ${errors.fullName ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] transition-colors`} {...register("fullName")} />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <input type="text" placeholder="Company Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] transition-colors" {...register("companyName")} />
                    </div>
                    <div>
                      <input type="email" placeholder="Email Address *" className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] transition-colors`} {...register("email")} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input type="tel" placeholder="Phone Number *" className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] transition-colors`} {...register("phone")} />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* SECTION 2 - Project Details */}
                <div className="space-y-4">
                  <h3 className="text-[#00E5FF] font-medium text-sm tracking-wider uppercase border-b border-white/10 pb-2">2. Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <select className={`w-full bg-[#0a0f1c] border ${errors.service ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors appearance-none`} {...register("service")}>
                        <option value="">Service Required *</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="AI Chatbots">AI Chatbots</option>
                        <option value="AI Agents">AI Agents</option>
                        <option value="Business Automation">Business Automation</option>
                        <option value="Website Development">Website Development</option>
                        <option value="SaaS Development">SaaS Development</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Computer Vision">Computer Vision</option>
                        <option value="Cloud Solutions">Cloud Solutions</option>
                        <option value="Custom Software">Custom Software</option>
                      </select>
                      {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
                    </div>
                    <div>
                      <select className={`w-full bg-[#0a0f1c] border ${errors.industry ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors appearance-none`} {...register("industry")}>
                        <option value="">Industry *</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Startup">Startup</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
                    </div>
                    <div>
                      <select className={`w-full bg-[#0a0f1c] border ${errors.budget ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors appearance-none`} {...register("budget")}>
                        <option value="">Estimated Budget *</option>
                        <option value="<50k">Less than ₹50,000</option>
                        <option value="50k-200k">₹50,000 – ₹2,00,000</option>
                        <option value="200k-500k">₹2,00,000 – ₹5,00,000</option>
                        <option value=">500k">₹5,00,000+</option>
                      </select>
                      {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
                    </div>
                    <div>
                      <select className={`w-full bg-[#0a0f1c] border ${errors.timeline ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors appearance-none`} {...register("timeline")}>
                        <option value="">Expected Timeline *</option>
                        <option value="Immediately">Immediately</option>
                        <option value="1 Month">Within 1 Month</option>
                        <option value="1-3 Months">1–3 Months</option>
                        <option value="3-6 Months">3–6 Months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                      {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline.message}</p>}
                    </div>
                  </div>
                </div>

                {/* SECTION 3 - Project Description */}
                <div className="space-y-4">
                  <h3 className="text-[#00E5FF] font-medium text-sm tracking-wider uppercase border-b border-white/10 pb-2">3. Project Description</h3>
                  <div>
                    <textarea 
                      placeholder="Describe your project, business goals, required features, target audience, or any specific requirements. *" 
                      className={`w-full bg-white/5 border ${errors.description ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] transition-colors resize-none min-h-[200px]`}
                      {...register("description")}
                    ></textarea>
                    {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                  </div>
                </div>

                {/* SECTION 4 - File Upload */}
                <div className="space-y-4">
                  <h3 className="text-[#00E5FF] font-medium text-sm tracking-wider uppercase border-b border-white/10 pb-2">4. File Upload (Optional)</h3>
                  <div className="border-2 border-dashed border-white/10 hover:border-[#8B5CF6]/50 rounded-xl p-8 text-center transition-colors relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    <UploadCloud className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-300 font-medium mb-1">{selectedFile ? selectedFile.name : "Click or drag to upload files"}</p>
                    <p className="text-gray-500 text-xs">PDF, DOCX, Images up to 10MB</p>
                  </div>
                </div>

                {/* SECTION 5 - Consent */}
                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex items-start pt-1">
                      <input type="checkbox" className="w-5 h-5 rounded bg-white/5 border-white/10 text-[#00E5FF] focus:ring-[#00E5FF] cursor-pointer" {...register("consent")} />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 text-sm font-medium block mb-1">I agree to be contacted by DarkCode X AI regarding my inquiry. *</span>
                      <span className="text-gray-500 text-xs">We respect your privacy. Your information will only be used to respond to your inquiry and will never be shared with third parties.</span>
                      {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent.message}</p>}
                    </div>
                  </label>
                </div>

                {/* Submit Error Indicator */}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                    <AlertCircle size={20} className="shrink-0" />
                    <p>There was a problem submitting your inquiry. Please check your connection and try again.</p>
                  </div>
                )}

                {/* SECTION 6 - Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] text-white font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" size={20} /> Sending Inquiry...</>
                  ) : (
                    <><Rocket size={20} /> Send Project Inquiry</>
                  )}
                </button>

              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 glass bg-white/10 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-xl"
          >
            <CheckCircle2 className="text-[#00E5FF] w-5 h-5" />
            <span className="text-white font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
