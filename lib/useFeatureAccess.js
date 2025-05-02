import { useUser } from './../app/_Context/UserContext';
export const useFeatureAccess = () => {
    const { plan } = useUser();
  
    const checkFeatureAccess = (featureIndex) => {
      if (plan === "Enterprise") return true;
      if (plan === "Professional") return featureIndex < 5;
      if (plan === "Basic") return featureIndex < 4;
      return false; // Guest or no plan
    };
  
    return { checkFeatureAccess };
  };
  