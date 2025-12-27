import { DashboardLayout } from "@/ui/components/layouts/DashboardLayout";

interface PlaceholderPageProps {
  title: string;
  breadcrumbs: string[];
}

export const PlaceholderPage = ({
  title,
  breadcrumbs,
}: PlaceholderPageProps) => {
  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">Halaman dalam pengembangan</p>
        </div>
      </div>
    </DashboardLayout>
  );
};
