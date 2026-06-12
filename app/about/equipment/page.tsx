import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { DataTable } from '@/components/ui/DataTable'
import { equipment } from '@/content/equipment'

export const metadata: Metadata = {
  title: 'Equipment & Accessories',
  description: "BD Buildcon's inventory of construction equipment and accessories — vibrators, dewatering pumps, scaffolding, welding sets, testing equipment and safety gear.",
}

export default function EquipmentPage() {
  return (
    <>
      <PageTitleBand
        title="Equipments and Accessories"
        breadcrumbs={[{ label: 'About Us' }, { label: 'Equipment & Accessories' }]}
        description="Supporting equipment and accessories for quality construction — all owned and maintained in-house."
      />

      <section className="section-pad bg-white">
        <div className="container-max">
          <DataTable data={equipment} caption="Equipment and Accessories Inventory" />
        </div>
      </section>

      <CTABand />
    </>
  )
}
