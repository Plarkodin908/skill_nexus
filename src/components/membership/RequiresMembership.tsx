
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, MembershipType } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Lock, CreditCard } from 'lucide-react';

interface RequiresMembershipProps {
  children: ReactNode;
  requiredMembership: MembershipType;
  fallbackText?: string;
}

const RequiresMembership = ({ 
  children, 
  requiredMembership, 
  fallbackText = "This feature requires a premium membership"
}: RequiresMembershipProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Function to check if user's membership meets the required level
  const hasRequiredMembership = () => {
    if (!user) return false;
    
    const membershipLevels: Record<MembershipType, number> = {
      'Free': 0,
      'Lite': 1,
      'Pro Learner': 2,
      'Educator': 3
    };
    
    return membershipLevels[user.membership] >= membershipLevels[requiredMembership];
  };
  
  // If the user has the required membership, show the children
  if (hasRequiredMembership()) {
    return <>{children}</>;
  }
  
  // If not, show a fallback UI with upgrade options
  return (
    <div className="border border-mint/20 rounded-lg p-6 bg-forest-light text-center">
      <div className="mx-auto w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mb-4">
        <Lock className="h-8 w-8 text-mint" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Premium Feature</h3>
      <p className="text-white/70 mb-6">
        {fallbackText}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
          onClick={() => navigate('/pricing')}
        >
          <CreditCard className="h-4 w-4" />
          Upgrade Now
        </Button>
        <Button 
          variant="outline" 
          className="border-mint/20 text-white hover:bg-mint/10"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default RequiresMembership;
