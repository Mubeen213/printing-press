import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'

/* Lazy-loaded pages for code splitting */
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const CategoryPage = lazy(() => import('@/pages/CategoryPage').then(m => ({ default: m.CategoryPage })))
const ProductPage = lazy(() => import('@/pages/ProductPage').then(m => ({ default: m.ProductPage })))
const CartPage = lazy(() => import('@/pages/CartPage').then(m => ({ default: m.CartPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const GetQuotePage = lazy(() => import('@/pages/GetQuotePage').then(m => ({ default: m.GetQuotePage })))
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })))
const BlogListPage = lazy(() => import('@/pages/BlogListPage').then(m => ({ default: m.BlogListPage })))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })))
const TurnaroundPage = lazy(() => import('@/pages/TurnaroundPage').then(m => ({ default: m.TurnaroundPage })))
const FileGuidePage = lazy(() => import('@/pages/FileGuidePage').then(m => ({ default: m.FileGuidePage })))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-quote" element={<GetQuotePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/turnaround-info" element={<TurnaroundPage />} />
          <Route path="/file-preparation-guide" element={<FileGuidePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
