import UserDashboard from '@/components/user/UserDashboard';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function DashboardPage() {
  return (
    <HOMELayouts isUserPage backgroundColor="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
      <UserDashboard />
    </HOMELayouts>
  );
}
