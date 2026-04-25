import { SectionWrapper } from '@/components/ui/Container';
import { PageHero } from '@/components/PageHero';
import { useSEO } from '@/utils/seo';

export function FileGuidePage() {
  useSEO({
    title: 'File Preparation Guide',
    description: 'Guide for preparing print-ready files for Printaze.',
  });

  return (
    <div>
      <PageHero
        title="File Preparation Guide"
        subtitle="How to prepare your design files for printing."
        bgColor="gradient"
        compact
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto prose">
          <h2 className="text-xl font-bold font-display text-text mb-4">Supported File Formats</h2>
          <ul className="list-disc pl-5 text-text-secondary space-y-2">
            <li>PDF (preferred for print-ready files)</li>
            <li>AI (Adobe Illustrator)</li>
            <li>PSD (Adobe Photoshop)</li>
            <li>PNG/JPEG (minimum 300 DPI for print)</li>
            <li>SVG (for vector logos)</li>
          </ul>

          <h2 className="text-xl font-bold font-display text-text mt-8 mb-4">General Guidelines</h2>
          <ul className="list-disc pl-5 text-text-secondary space-y-2">
            <li>Use CMYK color mode for best print results</li>
            <li>Minimum resolution: 300 DPI</li>
            <li>Include 3mm bleed on all sides</li>
            <li>Convert text to outlines/curves if embedding fonts</li>
            <li>Keep important content away from edges (safe zone)</li>
          </ul>

          <h2 className="text-xl font-bold font-display text-text mt-8 mb-4">Need Help?</h2>
          <p className="text-text-secondary">
            Don't worry if you're not sure about file preparation. Our team can help! Just share
            your files on WhatsApp and we'll check everything and guide you through any adjustments needed.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
