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
    <div className="w-full max-w-7xl mx-auto px-4 py-12 animate-pulse min-h-[60vh]">
      {/* Skeleton Header */}
      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
      
      {/* Skeleton Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="h-56 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mt-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
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
